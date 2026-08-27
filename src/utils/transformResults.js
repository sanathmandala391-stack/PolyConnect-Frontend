function normalizeRS(wholeOrSupply) {
  return wholeOrSupply === "S" ? "S" : "R";
}

function computeSgpa(totalGradePoints, credits) {
  if (!credits) return "0.00";
  return (totalGradePoints / credits).toFixed(2);
}

// Returns the first defined, non-null value among the given keys of obj.
function pick(obj, keys, fallback = undefined) {
  for (const k of keys) {
    if (obj?.[k] !== undefined && obj?.[k] !== null) return obj[k];
  }
  return fallback;
}

/**
 * Handles the ACTUAL shape your Spring Boot endpoint returns:
 *   {
 *     success: true,
 *     studentInfo: { pin, name, branch, scheme, centerCode, ... },
 *     cgpaInfo: { cgpa, creditsGained, totalCredits, totalGainedPoints },
 *     reportList: [ { semId, examMonthYear, result, gradePoint, creditsGained, ... }, ... ],
 *     semesterBreakdown: [ { semId, ... }, ... ]
 *   }
 * Field names inside reportList/semesterBreakdown are guessed with fallbacks
 * since the console only showed a partial object — if some columns render
 * blank, log `rawResData.reportList[0]` in full and send it over so the
 * pick() lists below can be tightened.
 */
function transformShapedResponse(data) {
  const studentRow = data.studentInfo;
  if (!studentRow) return null;

  const studentInfo = {
    pin: pick(studentRow, ["pin", "Pin"], "-"),
    name: pick(studentRow, ["name", "studentName", "StudentName"], "-"),
    branch: pick(studentRow, ["branch", "branchCode", "BranchCode"], "-"),
    scheme: pick(studentRow, ["scheme", "Scheme"], "-"),
  };

  const cgpaRow = data.cgpaInfo || {};
  const creditsGainedTotal = pick(cgpaRow, ["creditsGained", "CreditsGained"], 0);
  const totalGainedPoints = pick(cgpaRow, ["totalGainedPoints", "CgpaTotalGained"], 0);
  const cgpaInfo = {
    cgpa: Number(pick(cgpaRow, ["cgpa", "CGPA"], 0)).toFixed(2),
    cgpaFormula: `${totalGainedPoints}/${creditsGainedTotal}`,
    totalCredits: String(pick(cgpaRow, ["totalCredits", "TotalMaxCredits"], 0)),
    creditsGained: String(creditsGainedTotal),
    totalGainedPoints: String(totalGainedPoints),
  };

  const reportList = data.reportList || [];

  const semMap = new Map();
  reportList.forEach((row) => {
    const semId = pick(row, ["semId", "SemId"]);
    if (!semMap.has(semId)) semMap.set(semId, []);
    semMap.get(semId).push(row);
  });

  const semesterBreakdown = data.semesterBreakdown || [];

  const semesters = Array.from(semMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([semId, rows]) => {
      const sorted = [...rows].sort(
        (a, b) =>
          (pick(a, ["subjectOrder", "SubjectOrder"], 0) || 0) -
          (pick(b, ["subjectOrder", "SubjectOrder"], 0) || 0)
      );
      const semName =
        pick(sorted[0], ["semester", "Semester"]) || `${semId}SEM`;

      const subjects = sorted.map((r) => {
        const creditsEarnedVal = Number(
          pick(r, ["creditsGained", "CreditsGained", "creditsEarned"], 0)
        );
        const gradePointVal = Number(
          pick(r, ["gradePoint", "GradePoint", "gradePoints"], 0)
        );
        // maxCredits usually equals creditsGained in this scheme when the
        // backend doesn't send it separately — use it as a safe fallback.
        const maxCreditsRaw = pick(r, ["maxCredits", "MaxCredits"], null);
        const maxCreditsVal =
          maxCreditsRaw != null ? Number(maxCreditsRaw) : creditsEarnedVal;
        // Per-subject totalGradePoints, when absent, is just gradePoint * credits.
        const totalGradePointsRaw = pick(
          r,
          ["totalGradePoints", "TotalGradePoints"],
          null
        );
        const totalGradePointsVal =
          totalGradePointsRaw != null
            ? Number(totalGradePointsRaw)
            : gradePointVal * creditsEarnedVal;

        return {
          code: pick(r, ["subjectCode", "Subject_Code", "code"], "-"),
          name: pick(r, ["subjectName", "SubjectName", "name"], "-"),
          maxCredits: maxCreditsVal.toFixed(2),
          mid1: String(
            pick(r, ["mid1Marks", "Mid1Marks", "mid1", "midSem1", "midSem1Marks"], "0")
          ),
          mid2: String(
            pick(r, ["mid2Marks", "Mid2Marks", "mid2", "midSem2", "midSem2Marks"], "0")
          ),
          internal: String(
            pick(r, ["internalMarks", "InternalMarks", "internal", "internalMark"], "0")
          ),
          endSem: String(
            pick(r, ["endExamMarks", "EndExamMarks", "endSem", "endSemMarks"], "0")
          ),
          total: String(pick(r, ["subjectTotal", "SubjectTotal", "total"], "0")),
          grade: pick(r, ["hybridGrade", "HybridGrade", "grade"], "-"),
          gradePoints: String(gradePointVal),
          creditsEarned: creditsEarnedVal.toFixed(2),
          totalGradePoints: totalGradePointsVal.toFixed(2),
          rs: normalizeRS(pick(r, ["wholeOrSupply", "WholeOrSupply", "rs"])),
          examMonthYear: pick(r, ["examMonthYear", "ExamMonthYear"], "-"),
          examStatus: pick(r, ["result", "examStatus", "ExamStatus"], "-"),
        };
      });

      const maxCreditsSum = subjects.reduce((s, sub) => s + Number(sub.maxCredits), 0);
      const creditsEarnedSum = subjects.reduce((s, sub) => s + Number(sub.creditsEarned), 0);
      const totalGradePointsSum = subjects.reduce(
        (s, sub) => s + Number(sub.totalGradePoints),
        0
      );

      // Always compute SGPA from our own (now-correct) subject totals rather
      // than trusting the backend's semesterBreakdown.sgpa, which can come
      // back as a broken "NaN" when the server divides by zero.
      const sgpaValue = computeSgpa(totalGradePointsSum, creditsEarnedSum);

      return {
        semName,
        subjects,
        rubrics: {
          maxCredits: maxCreditsSum.toFixed(2),
          creditsEarned: creditsEarnedSum.toFixed(2),
        },
        semesterTotal: {
          maxCredits: maxCreditsSum.toFixed(2),
          creditsEarned: creditsEarnedSum.toFixed(2),
          totalGradePoints: totalGradePointsSum.toFixed(2),
        },
        sgpa: `Semester Grade Point Average(SGPA) (${totalGradePointsSum.toFixed(2)}/${creditsEarnedSum.toFixed(2)}) = ${sgpaValue}`,
      };
    });

  return { studentInfo, cgpaInfo, semesters };
}

/**
 * Handles the RAW upstream SBTET payload — either a JSON string like:
 *   "{\"Table\":[...],\"Table1\":[...],\"Table2\":[...],\"Table3\":[...]}"
 * or an already-parsed object with the same shape.
 */
function transformRawTableResponse(data) {
  const studentRow = data.Table?.[0];
  if (!studentRow) return null; // no PIN found

  const cgpaRow = data.Table1?.[0] || {};
  const subjectRows = data.Table2 || [];
  const semSummaryRows = data.Table3 || [];

  const studentInfo = {
    pin: studentRow.Pin || "-",
    name: studentRow.StudentName || "-",
    branch: studentRow.BranchCode || "-",
    scheme: studentRow.Scheme || "-",
  };

  const cgpaInfo = {
    cgpa: cgpaRow.CGPA != null ? Number(cgpaRow.CGPA).toFixed(2) : "0.00",
    cgpaFormula: `${cgpaRow.CgpaTotalGained ?? 0}/${cgpaRow.CgpaTotalCredits ?? 0}`,
    totalCredits: String(cgpaRow.TotalMaxCredits ?? "0"),
    creditsGained: String(cgpaRow.CreditsGained ?? "0"),
    totalGainedPoints: String(cgpaRow.CgpaTotalGained ?? "0"),
  };

  const semMap = new Map();
  subjectRows.forEach((row) => {
    if (!semMap.has(row.SemId)) semMap.set(row.SemId, []);
    semMap.get(row.SemId).push(row);
  });

  const semesters = Array.from(semMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([semId, rows]) => {
      const sorted = [...rows].sort(
        (a, b) => (a.SubjectOrder ?? 0) - (b.SubjectOrder ?? 0)
      );
      const semName = sorted[0]?.Semester || `${semId}SEM`;

      const subjects = sorted.map((r) => ({
        code: r.Subject_Code,
        name: r.SubjectName,
        maxCredits: String(r.MaxCredits ?? "0"),
        mid1: String(r.Mid1Marks ?? "0"),
        mid2: String(r.Mid2Marks ?? "0"),
        internal: String(r.InternalMarks ?? "0"),
        endSem: String(r.EndExamMarks ?? "0"),
        total: String(r.SubjectTotal ?? "0"),
        grade: r.HybridGrade || "-",
        gradePoints: String(r.GradePoint ?? "0"),
        creditsEarned: String(r.CreditsGained ?? "0"),
        totalGradePoints: String(r.TotalGradePoints ?? "0"),
        rs: normalizeRS(r.WholeOrSupply),
        examMonthYear: r.ExamMonthYear || "-",
        examStatus: r.ExamStatus || "-",
      }));

      const maxCreditsSum = sorted.reduce((s, r) => s + Number(r.MaxCredits || 0), 0);
      const creditsEarnedSum = sorted.reduce((s, r) => s + Number(r.CreditsGained || 0), 0);
      const totalGradePointsSum = sorted.reduce((s, r) => s + Number(r.TotalGradePoints || 0), 0);

      const semSummary = semSummaryRows.find((s) => s.SemId === semId);
      const sgpaCredits = semSummary?.Credits ?? creditsEarnedSum;
      const sgpaPoints = semSummary?.TotalGradePoints ?? totalGradePointsSum;
      const sgpaValue =
        semSummary?.SGPA != null
          ? Number(semSummary.SGPA).toFixed(2)
          : computeSgpa(sgpaPoints, sgpaCredits);

      return {
        semName,
        subjects,
        rubrics: {
          maxCredits: maxCreditsSum.toFixed(2),
          creditsEarned: creditsEarnedSum.toFixed(2),
        },
        semesterTotal: {
          maxCredits: maxCreditsSum.toFixed(2),
          creditsEarned: creditsEarnedSum.toFixed(2),
          totalGradePoints: totalGradePointsSum.toFixed(2),
        },
        sgpa: `Semester Grade Point Average(SGPA) (${sgpaPoints}/${sgpaCredits}) = ${sgpaValue}`,
      };
    });

  return { studentInfo, cgpaInfo, semesters };
}

/**
 * Public entry point. Accepts whatever the backend hands back — a JSON
 * string, the already-shaped Spring Boot object (studentInfo/cgpaInfo/
 * reportList/semesterBreakdown), or the raw upstream SBTET Table/Table1/
 * Table2/Table3 object — and normalizes it to { studentInfo, cgpaInfo,
 * semesters }. Returns null if no student record was found.
 */
export function transformSbtetResponse(raw) {
  if (raw == null) return null;

  const data = typeof raw === "string" ? JSON.parse(raw) : raw;

  if (data.studentInfo) return transformShapedResponse(data);
  if (data.Table) return transformRawTableResponse(data);

  return null;
}