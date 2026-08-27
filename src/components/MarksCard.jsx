import React from "react";
import { Printer } from "lucide-react";
import sbtetLogoImg from "../images/sb.png";
export default function MarksCard({ result, examTypeId }) {
  if (!result) return null;

  const isSemester = Number(examTypeId) === 5;

  const info = result.studentInfo || {};
  const subjects = result.studentWiseReport || [];
  const sgpaCgpa = result.studentSGPACGPAInfo || null;
  const subjectTotal = result.studentSubjectTotal || null;

  function handlePrint() {
    window.print();
  }

  // -----------------------------------------
  // HEADER DATA
  // -----------------------------------------

  const sessionLabel =
    info.ExamMonthYear ||
    subjectTotal?.AcadamicYear ||
    "DEC-2024";

  const schemeLabel =
    info.BranchCode
      ? `C24-${sessionLabel}`
      : sessionLabel;

  // -----------------------------------------
  // STUDENT DATA
  // -----------------------------------------

  const pin = info.Pin || "—";

  const studentName =
    info.StudentName ||
    info.Name ||
    "—";

  const branch =
    info.BranchCode ||
    info.BranchName ||
    "—";

  const sem =
    info.Sem ||
    info.SemYear ||
    "—";

  const examMonthYear =
    info.ExamMonthYear ||
    sessionLabel ||
    "—";

  const examName = isSemester
    ? "Semester"
    : info.ExamType ||
      (Number(examTypeId) === 2 ? "Mid-2" : "Mid-1");

  const collegeCode =
    info.CollegeCode ||
    "—";

  const collegeName =
    info.CollegeName ||
    "GOVERNMENT POLYTECHNIC";

  return (
    <div
      className="
        w-full
        max-w-6xl
        mx-auto
        px-4
        sm:px-8
        py-6
        text-[#1a1a1a]
        marks-card-container
      "
    >

      {/* =====================================================
          PRINT BUTTON
      ====================================================== */}

      <div className="flex justify-end mb-3 no-print">
        <button
          id="print-marks-card-btn"
          onClick={handlePrint}
          type="button"
          className="
            inline-flex
            items-center
            gap-1.5
            bg-[#1d72b8]
            hover:bg-[#155b94]
            text-white
            text-sm
            font-semibold
            px-4
            py-1.5
            rounded
            shadow-xs
            transition-colors
            cursor-pointer
          "
        >
          <span>Print</span>
          <Printer className="w-4 h-4" />
        </button>
      </div>


      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="relative mb-6 pt-1">

        {/* SBTET LOGO */}
{/* SBTET LOGO */}
<div
  className="
    sm:absolute
    sm:left-4
    sm:top-0
    flex
    justify-center
    sm:block
    mb-3
    sm:mb-0
  "
>
  <img 
    src={sbtetLogoImg} 
    alt="SBTET Logo" 
    className="h-[88px] w-auto object-contain" 
  />
</div>


        {/* BOARD NAME + TITLE */}

        <div className="text-center px-4 sm:px-24">

          <h1
            id="board-title"
            className="
              text-lg
              sm:text-xl
              md:text-2xl
              font-bold
              tracking-tight
              text-[#1a202c]
              uppercase
              leading-snug
            "
          style={{
    fontFamily: "Roboto, sans-serif",
    fontWeight: 10
  }}> 
           STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA
          </h1>

          <h2
            id="document-title"
            className="
              text-xl
              sm:text-2xl
              font-medium
              tracking-wide
              text-[#3f8876]
              mt-2
              uppercase
            "
          >
            {isSemester
              ? `MARKS CARD ${schemeLabel}`
              : "MARKS CARD"}
          </h2>

        </div>
      </div>


      {/* =====================================================
          TABLE 1 — STUDENT INFORMATION
      ====================================================== */}

      <div
        id="student-info-table-container"
        className="overflow-x-auto mb-3"
      >

        <table
          id="student-info-table"
          className="
            w-full
            border-collapse
            border
            border-black
            text-xs
            sm:text-sm
          "
        >

          <thead>

            <tr className="bg-[#ecf2f7] text-[#111827]">

              <th className="border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[18%]" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                PIN
              </th>

              <th className="border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[28%]" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                NAME
              </th>

              <th className="border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[12%]" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                BRANCH
              </th>

              <th className="border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[10%]" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                SEM
              </th>

              <th className="border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[20%]" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                EXAM MONTH YEAR
              </th>

              <th className="border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[12%]" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                EXAM
              </th>

            </tr>

          </thead>


          <tbody>

            <tr className="text-center bg-white">

             <td
  className="border border-black text-center"
style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}
>
  {pin}
</td>

              <td className="border border-black py-1.5 px-3 font-medium uppercase"   style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                {studentName}
              </td>

              <td className="border border-black py-1.5 px-3 font-medium"   style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                {branch}
              </td>

              <td className="border border-black py-1.5 px-3 font-medium"   style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                {sem}
              </td>

              <td className="border border-black py-1.5 px-3 font-medium uppercase"   style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                {examMonthYear}
              </td>

              <td className="border border-black py-1.5 px-3 font-medium"   style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                {examName}
              </td>

            </tr>

          </tbody>

        </table>

      </div>


      {/* =====================================================
          TABLE 2 — COLLEGE INFORMATION
      ====================================================== */}

      <div
        id="college-info-table-container"
        className="overflow-x-auto mb-3"
      >

        <table
          id="college-info-table"
          className="
            w-full
            border-collapse
            border
            border-black
            text-xs
            sm:text-sm
          "
        >

          <thead>

            <tr className="bg-[#ecf2f7] text-[#111827]">

              <th className="border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[22%]" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                COLLEGE CODE
              </th>

              <th className="border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[78%]" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                COLLEGE NAME
              </th>

            </tr>

          </thead>


          <tbody>

            <tr className="text-center bg-white">

              <td className="border border-black py-1.5 px-3 font-medium font-mono"   style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                {collegeCode}
              </td>

              <td className="border border-black py-1.5 px-3 font-medium uppercase"   style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                {collegeName}
              </td>

            </tr>

          </tbody>

        </table>

      </div>


      {/* =====================================================
          TABLE 3 — SUBJECT MARKS
      ====================================================== */}

      <div
        id="subject-marks-table-container"
        className="overflow-x-auto mb-5"
      >

        {isSemester ? (

          /* =================================================
             SEMESTER MARKS TABLE
          ================================================= */

          <table
            id="subject-marks-table"
            className="
              w-full
              border-collapse
              border
              border-black
              text-xs
              sm:text-sm
            "
          >

            <thead>

              <tr className="bg-[#ecf2f7] text-[#111827]">

                <th className="border border-black py-1.5 px-1.5 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  SUBJECT CODE
                </th>

                <th className="border border-black py-1.5 px-2 font-bold text-left" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  SUBJECT NAME
                </th>

                <th className="border border-black py-1.5 px-1 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  COURSE CREDITS
                </th>

                <th className="border border-black py-1.5 px-1 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  MID SEM1 (20)
                </th>

                <th className="border border-black py-1.5 px-1 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  MID SEM2 (20)
                </th>

                <th className="border border-black py-1.5 px-1 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  INTERNAL (20)
                </th>

                <th className="border border-black py-1.5 px-1 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  END SEM (40)
                </th>

                <th className="border border-black py-1.5 px-1 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  SUBJECT TOTAL (100)
                </th>

                <th className="border border-black py-1.5 px-1 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  GRADE
                </th>

                <th className="border border-black py-1.5 px-1 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  GRADE POINTS EQUIV
                </th>

                <th className="border border-black py-1.5 px-1 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  CREDITS EARNED
                </th>

                <th className="border border-black py-1.5 px-1 font-bold text-center" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  TOTAL GRADE POINTS
                </th>

              </tr>

            </thead>


            <tbody>

              {subjects.map((s, idx) => (

                <tr
                  key={idx}
                  className="bg-white hover:bg-slate-50/50"
                >

                  <td className="border border-black py-1 px-1 text-center font-mono text-[11px] font-bold" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.Subject_Code || "—"}
                  </td>

                  <td className="border border-black py-1 px-2 text-left text-[11px] font-medium" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.SubjectName || "—"}
                  </td>

                  <td className="border border-black py-1 px-1 text-center font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.MaxCredits ?? "—"}
                  </td>

                  <td className="border border-black py-1 px-1 text-center font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.MID1_MARKS ?? "—"}
                  </td>

                  <td className="border border-black py-1 px-1 text-center font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.MID2_MARKS ?? "—"}
                  </td>

                  <td className="border border-black py-1 px-1 text-center font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.Internal_MARKS ?? "—"}
                  </td>

                  <td className="border border-black py-1 px-1 text-center font-mono font-semibold" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.EndSemMarks ?? "—"}
                  </td>

                  <td className="border border-black py-1 px-1 text-center font-mono font-bold" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.SubjectTotal ?? "—"}
                  </td>

                  <td className="border border-black py-1 px-1 text-center font-bold" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.HybridGrade ?? "—"}
                  </td>

                  <td className="border border-black py-1 px-1 text-center font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.GradePoint ?? "—"}
                  </td>

                  <td className="border border-black py-1 px-1 text-center font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.CreditsGained != null
                      ? Number(s.CreditsGained).toFixed(2)
                      : "—"}
                  </td>

                  <td className="border border-black py-1 px-1 text-center font-mono font-bold" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.TotalGradePoints != null
                      ? Number(s.TotalGradePoints).toFixed(2)
                      : "—"}
                  </td>

                </tr>

              ))}


              {/* SEMESTER TOTAL */}

              <tr className="bg-[#ecf2f7] font-bold text-gray-800">

                <td
                  colSpan={2}
                  className="border border-black py-1.5 px-3 text-right"
                >
                  Semester Total:
                </td>

                <td className="border border-black py-1.5 px-1 text-center font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                  {sgpaCgpa?.SgpaTotalCredits ?? "—"}
                </td>

                <td
                  colSpan={7}
                  className="border border-black py-1.5 px-1 bg-white"
                />

                <td className="border border-black py-1.5 px-1 text-center font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                  {sgpaCgpa?.SgpaTotalCredits ?? "—"}
                </td>

                <td className="border border-black py-1.5 px-1 text-center font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                  {sgpaCgpa?.SgpaTotalPoints ?? "—"}
                </td>

              </tr>


              {/* COURSE TOTAL */}

              <tr className="bg-[#ecf2f7] font-bold text-gray-800">

                <td
                  colSpan={2}
                  className="border border-black py-1.5 px-3 text-right"
                >
                  Course Total:
                </td>

                <td className="border border-black py-1.5 px-1 text-center font-mono">
                  {sgpaCgpa?.CgpaTotalCredits ?? "—"}
                </td>

                <td
                  colSpan={7}
                  className="border border-black py-1.5 px-1 bg-white"
                />

                <td className="border border-black py-1.5 px-1 text-center font-mono">
                  {sgpaCgpa?.CgpaTotalCredits ?? "—"}
                </td>

                <td className="border border-black py-1.5 px-1 text-center font-mono">
                  {sgpaCgpa?.CgpaTotalPoints ?? "—"}
                </td>

              </tr>


              {/* SGPA */}

              <tr className="font-bold">

                <td
                  colSpan={11}
                  className="
                    border
                    border-black
                    py-1.5
                    px-3
                    text-center
                    bg-[#ecf2f7]
                  "
                >
                  Semester Grade Point Average(SGPA){" "}
                  (
                  {sgpaCgpa?.SgpaTotalPoints || "—"}
                  /
                  {sgpaCgpa?.SgpaTotalCredits || "—"}
                  )
                </td>

                <td className="border border-black py-1.5 px-1 text-center font-mono text-sm font-bold">
                  {sgpaCgpa?.SGPA ?? "—"}
                </td>

              </tr>


              {/* RESULT */}

              <tr className="font-bold">

                <td
                  colSpan={11}
                  className="
                    border
                    border-black
                    py-1.5
                    px-3
                    text-center
                    bg-[#ecf2f7]
                  "
                >
                  Result
                </td>

                <td
                  className={`
                    border
                    border-black
                    py-1.5
                    px-1
                    text-center
                    text-sm
                    ${
                      subjectTotal?.Result?.toUpperCase() === "FAIL"
                        ? "text-red-600"
                        : "text-emerald-700"
                    }
                  `}
                >
                  {subjectTotal?.Result || "Pass"}
                </td>

              </tr>

            </tbody>

          </table>

        ) : (

          /* =================================================
             MID EXAM MARKS TABLE
          ================================================= */

          <table
            id="subject-marks-table"
            className="
              w-full
              border-collapse
              border
              border-black
              text-xs
              sm:text-sm
            "
          >

            <thead>

              <tr className="bg-[#ecf2f7] text-[#111827]">

                <th
                  className="
                    border
                    border-black
                    py-1.5
                    px-3
                    font-bold
                    text-center
                    tracking-wider
                    w-[20%]
                  "
                style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  SUBJECT CODE
                </th>

                <th
                  className="
                    border
                    border-black
                    py-1.5
                    px-3
                    font-bold
                    text-center
                    tracking-wider
                    w-[65%]
                  "
                style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                  SUBJECT NAME
                </th>

                <th
                  className="
                    border
                    border-black
                    py-1
                    px-3
                    font-bold
                    text-center
                    tracking-wider
                    w-[15%]
                  "
                >

                  <div style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                    {Number(examTypeId) === 2
                      ? "MID SEM2"
                      : "MID SEM1"}
                  </div>

                  <div className="text-[11px] sm:text-xs font-semibold" style={{
  fontFamily: "'Mulish', sans-serif",
  fontSize: "13px",
  fontWeight: 700,
 
}}>
                    (20)
                  </div>

                </th>

              </tr>

            </thead>


            <tbody>

              {subjects.map((s, index) => (

                <tr
                  key={index}
                  id={`subject-row-${(
                    s.Subject_Code || index
                  ).toString().toLowerCase()}`}
                  className="bg-white hover:bg-slate-50/50"
                >

                  <td className="border border-black py-1.5 px-3 text-center font-medium font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.Subject_Code || "—"}
                  </td>

                  <td className="border border-black py-1.5 px-4 text-left font-medium" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>
                    {s.SubjectName || "—"}
                  </td>

                  <td className="border border-black py-1.5 px-3 text-center font-medium font-mono" style={{
    fontFamily: "'Mulish', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555"
  }}>

                    {Number(examTypeId) === 2
                      ? (
                          s.MID2_MARKS ??
                          s.Marks ??
                          "—"
                        )
                      : (
                          s.MID1_MARKS ??
                          s.Marks ??
                          "—"
                        )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>


      {/* =====================================================
          ABBREVIATIONS
      ====================================================== */}

      <div
        id="abbreviations-section"
        className="
          text-xs
          sm:text-sm
          text-[#111827]
          mt-3
        "
      >

        <h3
          className="
            font-bold
            text-[#111827]
            mb-2
            text-sm
          "
        >
          Abbreviations
        </h3>


        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-4
            gap-y-1.5
            gap-x-4
          "
        >

          <div className="font-medium">
            <span className="font-bold">R</span> - Regular Exam
          </div>

          <div className="font-medium">
            <span className="font-bold">S</span> - Supplementary Exam
          </div>

          <div className="font-medium">
            <span className="font-bold">P</span> - Pass
          </div>

          <div className="font-medium">
            <span className="font-bold">F</span> - Fail
          </div>

          <div className="font-medium">
            <span className="font-bold">MP</span> - MalPractice
          </div>

          <div className="font-medium">
            <span className="font-bold">W</span> - Wanting
          </div>

          <div className="font-medium col-span-2">
            <span className="font-bold">UE</span> - Under Evaluation
          </div>

        </div>

      </div>

    </div>
  );
}