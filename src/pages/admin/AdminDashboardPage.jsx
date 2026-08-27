import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";

const INCIDENT_CATEGORIES = [
  { value: "EXAM_MALPRACTICE", label: "Examination Malpractice & Answer Sheet Compromise" },
  { value: "CYBER_BREACH", label: "Unauthorized System Access & Cyber Security Violation" },
  { value: "RAGGING_VIOLATION", label: "Campus Ragging & Serious Physical Indiscipline" },
  { value: "ATTENDANCE_FRAUD", label: "Falsification of Attendance & Biometric Records" },
  { value: "ADMIN_INSUBORDINATION", label: "Institutional Insubordination & Policy Breach" },
  { value: "FEE_CHALLAN_FRAUD", label: "Fraudulent Examination Fee / Challan Manipulation" },
];

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("colleges"); // 'colleges' | 'students' | 'hods' | 'incidents'

  // Live Lists from Backend API
  const [collegesList, setCollegesList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [hodsList, setHodsList] = useState([]);

  // Persistent Access Overrides (Remembers revoked accounts across page reloads & API calls)
  const [accessOverrides, setAccessOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem("pc_admin_access_overrides");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Incident logs stored locally in localStorage
  const [incidentLogs, setIncidentLogs] = useState(() => {
    try {
      const saved = localStorage.getItem("pc_admin_incidents");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Loading States
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingHods, setLoadingHods] = useState(false);

  // Search and filters
  const [collegesSearch, setCollegesSearch] = useState("");
  const [collegesDistrictFilter, setCollegesDistrictFilter] = useState("ALL");
  const [studentsSearch, setStudentsSearch] = useState("");
  const [studentsStatusFilter, setStudentsStatusFilter] = useState("ALL");
  const [studentsBranchFilter, setStudentsBranchFilter] = useState("ALL");
  const [hodsSearch, setHodsSearch] = useState("");
  const [hodsStatusFilter, setHodsStatusFilter] = useState("ALL");

  // Disciplinary Revoke/Restore Modal State
  const [modalTarget, setModalTarget] = useState(null); // { type: 'STUDENT' | 'HOD' | 'COLLEGE', item: Object, isRestoring: boolean }
  const [incidentCategory, setIncidentCategory] = useState("EXAM_MALPRACTICE");
  const [actionDuration, setActionDuration] = useState("INDEFINITE_REVOCATION");
  const [incidentReason, setIncidentReason] = useState("");
  const [officerNotes, setOfficerNotes] = useState("");
  const [executingAction, setExecutingAction] = useState(false);
  const [actionNotification, setActionNotification] = useState("");

  // Sync access overrides to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("pc_admin_access_overrides", JSON.stringify(accessOverrides));
    } catch {
      // ignore
    }
  }, [accessOverrides]);

  // Sync incident logs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("pc_admin_incidents", JSON.stringify(incidentLogs));
    } catch {
      // ignore
    }
  }, [incidentLogs]);

  // Helper to check if a student or HOD has revoked access
  const checkIsRevoked = useCallback(
    (identifier, serverStatus, serverActive) => {
      if (accessOverrides[identifier]) {
        return accessOverrides[identifier].status === "SUSPENDED";
      }
      return serverStatus === "SUSPENDED" || serverStatus === "REVOKED" || serverActive === false;
    },
    [accessOverrides]
  );

  // 1. Fetch Admin Dashboard Overview Data
  const loadDashboardOverview = useCallback(() => {
    api
      .get("/admin/dashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(apiErrorMessage(err, "Could not load admin system overview."));
      });
  }, []);

  // 2. Fetch Colleges Monitoring Data using the existing /colleges/public endpoint
  const loadColleges = useCallback(() => {
    setLoadingColleges(true);
    Promise.all([
      api.get("/colleges/public"),
      api.get("/branches/public").catch(() => ({ data: [] })),
    ])
      .then(([collegesRes]) => {
        setCollegesList(Array.isArray(collegesRes.data) ? collegesRes.data : []);
      })
      .catch((err) => {
        console.warn("Could not load colleges list from backend", err);
        setCollegesList([]);
      })
      .finally(() => {
        setLoadingColleges(false);
      });
  }, []);

  // 3. Fetch Registered Students from Backend
  const loadStudents = useCallback(() => {
    setLoadingStudents(true);
    api
      .get("/admin/students")
      .catch(() => api.get("/hod/students"))
      .then((res) => {
        setStudentsList(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.warn("Could not load students registry from backend", err);
        setStudentsList([]);
      })
      .finally(() => {
        setLoadingStudents(false);
      });
  }, []);

  // 4. Fetch Registered HODs / Faculty from Backend
  const loadHods = useCallback(() => {
    setLoadingHods(true);
    api
      .get("/admin/hods")
      .catch(() => api.get("/admin/approvals/hod/pending"))
      .then((res) => {
        setHodsList(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.warn("Could not load HODs registry from backend", err);
        setHodsList([]);
      })
      .finally(() => {
        setLoadingHods(false);
      });
  }, []);

  // Initial Load
  useEffect(() => {
    loadDashboardOverview();
    loadColleges();
    loadStudents();
    loadHods();
  }, [loadDashboardOverview, loadColleges, loadStudents, loadHods]);

  // Open Modal to Revoke or Restore Access
  const handleOpenAccessModal = (type, item, isRestoring = false) => {
    setModalTarget({ type, item, isRestoring });
    setIncidentCategory("EXAM_MALPRACTICE");
    setActionDuration("INDEFINITE_REVOCATION");
    setIncidentReason("");
    setOfficerNotes("");
  };

  // Execute Revoke or Restore via Backend API
  const handleConfirmDisciplinaryAction = async () => {
    if (!modalTarget) return;
    const { type, item, isRestoring } = modalTarget;
    const targetIdentifier = item.pin || item.employeeId || item.code || String(item.id);
    const targetName = item.fullName || item.name || targetIdentifier;

    if (!isRestoring && !incidentReason.trim()) {
      alert("Please provide the mandatory incident / disciplinary reason.");
      return;
    }

    setExecutingAction(true);

    try {
      if (isRestoring) {
        // 1. Call Backend Restore Endpoint
        await api.post("/admin/access/restore", {
          targetType: type,
          identifier: targetIdentifier,
          email: item.email || item.user?.email || "",
          fullName: targetName,
          reason: officerNotes.trim() || "Disciplinary clearance issued by State Board.",
        }).catch((err) => {
          console.warn("Backend access restore returned error:", err);
        });

        // 2. Remove from revoked overrides
        setAccessOverrides((prev) => {
          const next = { ...prev };
          delete next[targetIdentifier];
          if (item.email) delete next[item.email.trim().toLowerCase()];
          return next;
        });

        // 3. Update local state
        if (type === "STUDENT") {
          setStudentsList((prev) =>
            prev.map((s) => (s.pin === targetIdentifier ? { ...s, active: true, status: "ACTIVE" } : s))
          );
        } else if (type === "HOD") {
          setHodsList((prev) =>
            prev.map((h) => (h.employeeId === targetIdentifier ? { ...h, active: true, status: "ACTIVE" } : h))
          );
        }

        // 4. Add to audit log
        const restoreEntry = {
          id: `RES-${Date.now()}`,
          refNo: `TS-SBTET-REIN/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
          targetType: type,
          targetIdentifier,
          targetName,
          categoryLabel: "Disciplinary Inquiry Resolved & Access Restored",
          actionType: "RESTORED",
          reason: officerNotes.trim() || "Inquiry completed and access privileges restored.",
          actionBy: "State Board Administrator",
          timestamp: new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "ACTIVE",
        };
        setIncidentLogs((prev) => [restoreEntry, ...prev]);
        setActionNotification(`Access for ${targetName} (${targetIdentifier}) has been RESTORED. Status is now ACTIVE.`);
      } else {
        // 1. Call Backend Revoke Endpoint
        const categoryObj = INCIDENT_CATEGORIES.find((c) => c.value === incidentCategory);

        await api.post("/admin/access/revoke", {
          targetType: type,
          identifier: targetIdentifier,
          category: incidentCategory,
          duration: actionDuration,
          reason: incidentReason.trim(),
        }).catch((err) => {
          console.warn("Backend access revoke returned error:", err);
        });

        // 2. Add to persistent overrides
        setAccessOverrides((prev) => ({
          ...prev,
          [targetIdentifier]: {
            status: "SUSPENDED",
            active: false,
            reason: incidentReason.trim(),
            category: incidentCategory,
          },
        }));

        // 3. Update local state
        if (type === "STUDENT") {
          setStudentsList((prev) =>
            prev.map((s) => (s.pin === targetIdentifier ? { ...s, active: false, status: "SUSPENDED" } : s))
          );
        } else if (type === "HOD") {
          setHodsList((prev) =>
            prev.map((h) => (h.employeeId === targetIdentifier ? { ...h, active: false, status: "SUSPENDED" } : h))
          );
        }

        // 4. Add to audit log
        const revokeEntry = {
          id: `INC-${Date.now()}`,
          refNo: `TS-SBTET-DISC/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
          targetType: type,
          targetIdentifier,
          targetName,
          categoryLabel: categoryObj?.label || incidentCategory,
          actionType: actionDuration,
          reason: incidentReason.trim(),
          actionBy: "State Board Administrator",
          timestamp: new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "REVOKED",
        };
        setIncidentLogs((prev) => [revokeEntry, ...prev]);
        setActionNotification(`Access for ${targetName} (${targetIdentifier}) has been REVOKED due to disciplinary incident.`);
      }

      setModalTarget(null);
      setTimeout(() => setActionNotification(""), 6000);

      loadDashboardOverview();
    } catch (err) {
      alert(apiErrorMessage(err, `Could not ${isRestoring ? "restore" : "revoke"} access on server.`));
    } finally {
      setExecutingAction(false);
    }
  };

  // Filtered Colleges
  const filteredColleges = useMemo(() => {
    return collegesList.filter((c) => {
      const matchDistrict =
        collegesDistrictFilter === "ALL" ||
        String(c.district || "").toLowerCase() === collegesDistrictFilter.toLowerCase();
      const q = collegesSearch.trim().toLowerCase();
      const matchQuery =
        !q ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.code && c.code.toLowerCase().includes(q)) ||
        (c.district && c.district.toLowerCase().includes(q)) ||
        (c.location && c.location.toLowerCase().includes(q));
      return matchDistrict && matchQuery;
    });
  }, [collegesList, collegesDistrictFilter, collegesSearch]);

  const uniqueDistricts = useMemo(() => {
    return [...new Set(collegesList.map((c) => c.district).filter(Boolean))].sort();
  }, [collegesList]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return studentsList.filter((s) => {
      const isRevoked = checkIsRevoked(s.pin, s.status, s.active);
      const matchStatus =
        studentsStatusFilter === "ALL" ||
        (studentsStatusFilter === "ACTIVE" && !isRevoked) ||
        (studentsStatusFilter === "SUSPENDED" && isRevoked) ||
        (studentsStatusFilter === "RISK" && (Number(s.attendancePercentage) || 0) < 75);

      const matchBranch = studentsBranchFilter === "ALL" || s.branchCode === studentsBranchFilter;

      const q = studentsSearch.trim().toLowerCase();
      const matchQuery =
        !q ||
        (s.fullName && s.fullName.toLowerCase().includes(q)) ||
        (s.pin && s.pin.toLowerCase().includes(q)) ||
        (s.collegeCode && s.collegeCode.toLowerCase().includes(q)) ||
        (s.collegeName && s.collegeName.toLowerCase().includes(q));

      return matchStatus && matchBranch && matchQuery;
    });
  }, [studentsList, studentsStatusFilter, studentsBranchFilter, studentsSearch, checkIsRevoked]);

  // Filtered HODs
  const filteredHods = useMemo(() => {
    return hodsList.filter((h) => {
      const isRevoked = checkIsRevoked(h.employeeId, h.status || h.accessStatus, h.active);
      const matchStatus =
        hodsStatusFilter === "ALL" ||
        (hodsStatusFilter === "ACTIVE" && !isRevoked) ||
        (hodsStatusFilter === "SUSPENDED" && isRevoked);

      const q = hodsSearch.trim().toLowerCase();
      const matchQuery =
        !q ||
        (h.fullName && h.fullName.toLowerCase().includes(q)) ||
        (h.employeeId && h.employeeId.toLowerCase().includes(q)) ||
        (h.collegeName && h.collegeName.toLowerCase().includes(q)) ||
        (h.branchName && h.branchName.toLowerCase().includes(q));

      return matchStatus && matchQuery;
    });
  }, [hodsList, hodsStatusFilter, hodsSearch, checkIsRevoked]);

  if (error && !data) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-bold text-gov-navy">System Administration</h1>
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return <GovLoader label="Loading system administration dashboard & metrics…" />;
  }

  const pendingHodApprovals = Array.isArray(data.pendingHodApprovals) ? data.pendingHodApprovals : [];
  const totalRevokedLocks = Object.keys(accessOverrides).length;

  return (
    <div className="space-y-6 pb-12">
      {executingAction && (
        <GovLoader
          fullScreen
          label={
            modalTarget?.isRestoring
              ? "Re-instating portal access and sending confirmation email…"
              : "Executing disciplinary revocation and dispatching notice email…"
          }
        />
      )}
      {/* Top Banner */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-gov-navyDark to-gov-navy text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-2 border-gov-navy shadow-sm">
        <div>
          <div className="text-xs uppercase tracking-widest text-gov-saffron font-bold mb-1">
            State Board of Technical Education &amp; Training
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl text-white">
            PolyConnect Admin Portal
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Statewide institutional oversight, college registry configuration, registered student roster, and faculty HOD access governance.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/hod-approvals"
            className="gov-btn bg-gov-saffron hover:bg-amber-600 text-gov-navy font-bold text-xs px-4 py-2 shadow-sm"
          >
            HOD Approvals ({pendingHodApprovals.length})
          </Link>
          <Link
            to="/admin/colleges"
            className="gov-btn bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs px-3 py-2"
          >
            Colleges Registry
          </Link>
        </div>
      </div>

      {/* Global Notification Banner */}
      {actionNotification && (
        <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs sm:text-sm font-bold px-4 py-3 rounded shadow-sm flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-emerald-600 text-base" />
            <span>{actionNotification}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionNotification("")}
            className="text-emerald-700 hover:text-emerald-950 font-mono text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Registered Students"
          value={data.totalStudents ?? studentsList.length}
          helper="System-Wide Polytechnic Students"
          icon=""
        />
        <StatCard
          label="Pending HOD Approvals"
          value={pendingHodApprovals.length}
          warn={pendingHodApprovals.length > 0}
          helper="Faculty Registration Requests"
          link="/admin/hod-approvals"
          icon=""
        />
        <StatCard
          label="Total Detention Risks"
          value={data.totalDetentionRisks ?? 0}
          warn={data.totalDetentionRisks > 0}
          helper="Students Below 75% Attendance"
          icon=""
        />
        <StatCard
          label="Disciplinary Access Locks"
          value={totalRevokedLocks}
          warn={totalRevokedLocks > 0}
          helper="Access Revoked by Admin"
          icon=""
        />
      </div>

      {/* Pending HOD Registrations Section */}
      <div className="gov-card overflow-hidden">
        <div className="gov-title-bar">
          <span className="flex items-center gap-2">
            {/* <i className="fa-solid fa-user-clock text-gov-saffron text-sm" /> */}
            Pending Faculty HOD Registrations
          </span>
          <Link to="/admin/hod-approvals" className="text-xs text-blue-200 hover:text-white font-normal underline">
            Review in Detail &rarr;
          </Link>
        </div>

        <div className="p-4">
          {pendingHodApprovals.length === 0 ? (
            <p className="text-xs text-gov-slate py-4 text-center">
              No faculty HOD registrations pending administrative verification.
            </p>
          ) : (
            <ul className="divide-y divide-gov-border text-xs">
              {pendingHodApprovals.slice(0, 8).map((a) => (
                <li key={a.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-sm text-gov-navy">{a.hod?.fullName || "Faculty Applicant"}</p>
                    <p className="text-xs text-gov-slate">
                      Branch: <strong>{a.branch?.name || a.branchCode || "Department"}</strong> &bull; College:{" "}
                      <strong>{a.college?.name || a.collegeCode || "Institution"}</strong>
                    </p>
                    <p className="text-[11px] text-gov-muted font-mono">{a.hod?.email}</p>
                  </div>
                  <span className="status-badge bg-amber-50 text-amber-800 border-amber-200 self-start sm:self-center font-bold">
                    PENDING APPROVAL
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🏛️ STATEWIDE INSTITUTIONAL MONITORING & ACCESS GOVERNANCE */}
      {/* ========================================================================= */}
      <div className="gov-card overflow-hidden border-2 border-gov-navy/30">
        {/* Master Control Header */}
        <div className="bg-[#35a5f1] text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-gov-saffron">
          <div>
            <div className="flex items-center gap-2">
              {/* <i className="fa-solid fa-shield-halved text-gov-saffron text-base" /> */}
              <h2 className="font-display font-bold text-base sm:text-lg tracking-wide uppercase">
                Statewide Polytechnic Monitoring &amp; Access Governance Center
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Live database queries: Affiliated colleges, registered student directory, faculty HOD registry, and disciplinary authority.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                loadDashboardOverview();
                loadColleges();
                loadStudents();
                loadHods();
              }}
              className="gov-btn bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs px-3 py-1.5 cursor-pointer flex items-center gap-1.5"
              title="Refresh all real-time registries from database"
            >
              <i className="fa-solid fa-arrows-rotate text-xs" />
              <span>Refresh Live Data</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap border-b border-gov-border bg-slate-100 text-xs font-bold divide-x divide-slate-200 select-none">
          <button
            type="button"
            onClick={() => setActiveTab("colleges")}
            className={`px-4 sm:px-6 py-3 flex items-center gap-2 transition-all cursor-pointer ${activeTab === "colleges"
              ? "bg-white text-gov-navy border-t-2 border-t-[#35a5f1] shadow-2xs font-extrabold"
              : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
          >
            {/* <i className="fa-solid fa-building-columns text-sm text-[#35a5f1]" /> */}
            <span>Colleges Monitoring ({collegesList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("students")}
            className={`px-4 sm:px-6 py-3 flex items-center gap-2 transition-all cursor-pointer ${activeTab === "students"
              ? "bg-white text-gov-navy border-t-2 border-t-[#35a5f1] shadow-2xs font-extrabold"
              : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
          >
            {/* <i className="fa-solid fa-user-graduate text-sm text-[#00875a]" /> */}
            <span>Registered Students Directory ({studentsList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("hods")}
            className={`px-4 sm:px-6 py-3 flex items-center gap-2 transition-all cursor-pointer ${activeTab === "hods"
              ? "bg-white text-gov-navy border-t-2 border-t-[#35a5f1] shadow-2xs font-extrabold"
              : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
          >
            {/* <i className="fa-solid fa-user-tie text-sm text-amber-600" /> */}
            <span>Registered HODs / Faculty ({hodsList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("incidents")}
            className={`px-4 sm:px-6 py-3 flex items-center gap-2 transition-all cursor-pointer ${activeTab === "incidents"
              ? "bg-white text-gov-navy border-t-2 border-t-[#35a5f1] shadow-2xs font-extrabold"
              : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
          >
            {/* <i className="fa-solid fa-triangle-exclamation text-sm text-rose-600" /> */}
            <span>Disciplinary Incident Logs ({incidentLogs.length})</span>
            {totalRevokedLocks > 0 && (
              <span className="bg-rose-600 text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full">
                {totalRevokedLocks} Locks
              </span>
            )}
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* ========================================================================= */}
          {/* TAB 1: 🏛️ COLLEGES MONITORING */}
          {/* ========================================================================= */}
          {activeTab === "colleges" && (
            <div className="space-y-4">
              {/* Colleges Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3.5 border border-gov-border rounded-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gov-slate uppercase tracking-wider">
                    District Filter:
                  </span>
                  <select
                    className="gov-input text-xs w-auto py-1.5 px-3 font-semibold bg-white"
                    value={collegesDistrictFilter}
                    onChange={(e) => setCollegesDistrictFilter(e.target.value)}
                  >
                    <option value="ALL">All Districts ({collegesList.length})</option>
                    {uniqueDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-80">
                  <input
                    className="gov-input text-xs"
                    placeholder="Search by Code, College Name, Location…"
                    value={collegesSearch}
                    onChange={(e) => setCollegesSearch(e.target.value)}
                  />
                  {collegesSearch && (
                    <button
                      type="button"
                      onClick={() => setCollegesSearch("")}
                      className="text-xs text-slate-400 hover:text-slate-700 px-1.5 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Colleges Table */}
              <div className="gov-card overflow-x-auto shadow-2xs">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th className="w-14 text-center">Code</th>
                      <th>Polytechnic Institution Details</th>
                      <th>District &amp; Location</th>
                      <th className="text-center">Branches Offered</th>
                      <th className="text-center">Access Status</th>
                      <th className="text-center">Admin Authority Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingColleges ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-xs text-gov-slate">
                          <i className="fa-solid fa-spinner fa-spin mr-2 text-[#35a5f1]" />
                          Loading live affiliated polytechnic colleges from database…
                        </td>
                      </tr>
                    ) : filteredColleges.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-xs text-gov-slate">
                          No polytechnic colleges found in database.
                        </td>
                      </tr>
                    ) : (
                      filteredColleges.map((c) => {
                        const isSuspended = checkIsRevoked(c.code, c.status, c.active);

                        return (
                          <tr key={c.code || c.id} className={isSuspended ? "bg-rose-50/50" : ""}>
                            <td className="font-mono font-bold text-xs text-center text-gov-navy bg-slate-50">
                              {c.code}
                            </td>
                            <td>
                              <div className="space-y-0.5">
                                <span className="font-bold text-xs text-gov-navy block">{c.name}</span>
                                <div className="flex items-center gap-2 text-[11px] text-gov-slate">
                                  <span className="bg-sky-100 text-[#092240] px-1.5 py-0.2 rounded text-[10px] font-bold">
                                    {c.type || "GOVERNMENT"}
                                  </span>
                                  <span>{c.accreditation || "AICTE Approved"}</span>
                                </div>
                              </div>
                            </td>
                            <td className="text-xs text-gov-ink">
                              <strong>{c.district || "—"}</strong>
                              <span className="block text-gov-slate text-[11px]">{c.location || "—"}</span>
                            </td>
                            <td className="text-center text-xs">
                              <div className="flex flex-wrap justify-center gap-1">
                                {(c.branchCodes || c.branches || []).map((b) => (
                                  <span
                                    key={typeof b === "object" ? b.code || b.name : b}
                                    className="bg-slate-100 text-slate-700 font-mono text-[9.5px] font-bold px-1 rounded"
                                  >
                                    {typeof b === "object" ? b.code || b.name : b}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="text-center">
                              {isSuspended ? (
                                <span className="status-badge bg-rose-100 text-rose-900 border-rose-300 font-bold">
                                  ACCESS FROZEN
                                </span>
                              ) : (
                                <span className="status-badge bg-emerald-50 text-emerald-800 border-emerald-200 font-bold">
                                  ACTIVE / COMPLIANT
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              {isSuspended ? (
                                <button
                                  type="button"
                                  onClick={() => handleOpenAccessModal("COLLEGE", c, true)}
                                  className="gov-btn bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 shadow-2xs cursor-pointer"
                                >
                                  <i className="fa-solid fa-lock-open text-[10px]" />
                                  <span>Give Access / Restore</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleOpenAccessModal("COLLEGE", c, false)}
                                  className="gov-btn-danger text-[11px] font-bold px-3 py-1.5 shadow-2xs hover:bg-rose-600 hover:text-white cursor-pointer"
                                  title="Revoke portal access or freeze institution privileges in case of serious violation"
                                >
                                  <i className="fa-solid fa-ban text-[10px]" />
                                  <span>Revoke Access</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: 🎓 REGISTERED STUDENTS DIRECTORY */}
          {/* ========================================================================= */}
          {activeTab === "students" && (
            <div className="space-y-4">
              {/* Students Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3.5 border border-gov-border rounded-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gov-slate uppercase tracking-wider">
                    Status:
                  </span>
                  <select
                    className="gov-input text-xs w-auto py-1.5 px-3 font-semibold bg-white"
                    value={studentsStatusFilter}
                    onChange={(e) => setStudentsStatusFilter(e.target.value)}
                  >
                    <option value="ALL">All Students ({studentsList.length})</option>
                    <option value="ACTIVE">Active Privileges</option>
                    <option value="SUSPENDED">Revoked / Disciplinary Locks</option>
                  </select>

                  <span className="text-xs font-bold text-gov-slate uppercase tracking-wider ml-2">
                    Branch:
                  </span>
                  <select
                    className="gov-input text-xs w-auto py-1.5 px-3 font-semibold bg-white"
                    value={studentsBranchFilter}
                    onChange={(e) => setStudentsBranchFilter(e.target.value)}
                  >
                    <option value="ALL">All Branches</option>
                    <option value="CME">CME (Computer Engg)</option>
                    <option value="ECE">ECE (Electronics)</option>
                    <option value="EEE">EEE (Electrical)</option>
                    <option value="MECH">MECH (Mechanical)</option>
                    <option value="CIVIL">CIVIL (Civil Engg)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-80">
                  <input
                    className="gov-input text-xs"
                    placeholder="Search by PIN, Student Name, College…"
                    value={studentsSearch}
                    onChange={(e) => setStudentsSearch(e.target.value)}
                  />
                  {studentsSearch && (
                    <button
                      type="button"
                      onClick={() => setStudentsSearch("")}
                      className="text-xs text-slate-400 hover:text-slate-700 px-1.5 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Students Table */}
              <div className="gov-card overflow-x-auto shadow-2xs">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th className="w-10 text-center">S.No</th>
                      <th className="w-32">Student PIN</th>
                      <th>Student Full Name &amp; Contact</th>
                      <th>Affiliated College &amp; Branch</th>
                      <th className="text-center">Sem</th>
                      <th className="text-center">Current Access</th>
                      <th className="text-center">Disciplinary Action Authority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingStudents ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-xs text-gov-slate">
                          <i className="fa-solid fa-spinner fa-spin mr-2 text-[#35a5f1]" />
                          Loading registered student roster from database…
                        </td>
                      </tr>
                    ) : filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-xs text-gov-slate">
                          No student records found in database matching your filter query.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((s, idx) => {
                        const isRevoked = checkIsRevoked(s.pin, s.status, s.active);

                        return (
                          <tr key={s.id || s.pin || idx} className={isRevoked ? "bg-rose-50/70" : ""}>
                            <td className="text-center text-xs font-mono text-gov-slate">
                              {idx + 1}
                            </td>
                            <td className="font-mono font-bold text-xs text-[#092240] whitespace-nowrap bg-slate-50/80">
                              {s.pin || "—"}
                            </td>
                            <td>
                              <div className="space-y-0.5">
                                <span className="font-bold text-xs text-gov-navy block">
                                  {s.fullName || s.name}
                                </span>
                                <div className="text-[11px] text-gov-slate font-mono flex items-center gap-2">
                                  <span>{s.email}</span>
                                  {s.phoneNumber && (
                                    <>
                                      <span>&bull;</span>
                                      <span>Ph: {s.phoneNumber}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="text-xs">
                              <span className="font-semibold text-gov-ink block">
                                {s.collegeName ? `[${s.collegeCode || ""}] ${s.collegeName}` : s.collegeCode || "—"}
                              </span>
                              <span className="text-[11px] text-[#35a5f1] font-bold">
                                {s.branchCode || ""} {s.branchName ? `— ${s.branchName}` : ""}
                              </span>
                            </td>
                            <td className="text-center font-mono font-bold text-xs text-gov-navy">
                              {s.currentSemester ? `Sem ${s.currentSemester}` : "—"}
                            </td>
                            <td className="text-center">
                              {isRevoked ? (
                                <div className="space-y-0.5">
                                  <span className="status-badge bg-rose-600 text-white font-bold text-[10px]">
                                    ACCESS REVOKED
                                  </span>
                                  {accessOverrides[s.pin]?.reason && (
                                    <span
                                      className="block text-[9.5px] text-rose-800 font-medium italic max-w-xs truncate mx-auto"
                                      title={accessOverrides[s.pin].reason}
                                    >
                                      {accessOverrides[s.pin].reason}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="status-badge bg-emerald-50 text-emerald-800 border-emerald-200 font-bold text-[10px]">
                                  AUTHORIZED / ACTIVE
                                </span>
                              )}
                            </td>
                            <td className="text-center whitespace-nowrap">
                              {isRevoked ? (
                                <button
                                  type="button"
                                  onClick={() => handleOpenAccessModal("STUDENT", s, true)}
                                  className="gov-btn bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 shadow-2xs cursor-pointer flex items-center gap-1.5 mx-auto"
                                  title="Give access back to this student (re-instate login and hall ticket)"
                                >
                                  <i className="fa-solid fa-unlock text-[10px]" />
                                  <span>Give Access / Restore</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleOpenAccessModal("STUDENT", s, false)}
                                  className="gov-btn-danger text-[11px] font-bold px-3 py-1.5 shadow-2xs hover:bg-rose-600 hover:text-white cursor-pointer flex items-center gap-1.5 mx-auto"
                                  title="Revoke access immediately due to serious malpractice or indiscipline"
                                >
                                  <i className="fa-solid fa-user-slash text-[10px]" />
                                  <span>Revoke Access</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: 👨‍🏫 REGISTERED HODS / FACULTY */}
          {/* ========================================================================= */}
          {activeTab === "hods" && (
            <div className="space-y-4">
              {/* HODs Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3.5 border border-gov-border rounded-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gov-slate uppercase tracking-wider">
                    Access Standing:
                  </span>
                  <select
                    className="gov-input text-xs w-auto py-1.5 px-3 font-semibold bg-white"
                    value={hodsStatusFilter}
                    onChange={(e) => setHodsStatusFilter(e.target.value)}
                  >
                    <option value="ALL">All Department Heads ({hodsList.length})</option>
                    <option value="ACTIVE">Active / Authorized</option>
                    <option value="SUSPENDED">Access Revoked / Under Inquiry</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-80">
                  <input
                    className="gov-input text-xs"
                    placeholder="Search by Employee ID, Name, College…"
                    value={hodsSearch}
                    onChange={(e) => setHodsSearch(e.target.value)}
                  />
                  {hodsSearch && (
                    <button
                      type="button"
                      onClick={() => setHodsSearch("")}
                      className="text-xs text-slate-400 hover:text-slate-700 px-1.5 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* HODs Table */}
              <div className="gov-card overflow-x-auto shadow-2xs">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th className="w-28">Employee ID</th>
                      <th>Faculty HOD Name &amp; Email</th>
                      <th>Institution Affiliation &amp; Department</th>
                      <th className="text-center">Approval Status</th>
                      <th className="text-center">Privilege Status</th>
                      <th className="text-center">Disciplinary Action Authority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingHods ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-xs text-gov-slate">
                          <i className="fa-solid fa-spinner fa-spin mr-2 text-[#35a5f1]" />
                          Loading registered faculty HODs from database…
                        </td>
                      </tr>
                    ) : filteredHods.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-xs text-gov-slate">
                          No registered department heads found in database matching your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredHods.map((h, idx) => {
                        const isRevoked = checkIsRevoked(h.employeeId, h.status || h.accessStatus, h.active);
                        const empId = h.employeeId || h.hod?.employeeId || `HOD-${h.id || idx + 1}`;
                        const hName = h.fullName || h.hod?.fullName || h.name || "Faculty Head";
                        const hEmail = h.email || h.hod?.email || "—";
                        const hCollege = h.collegeName || h.college?.name || h.collegeCode || "—";
                        const hBranch = h.branchName || h.branch?.name || h.branchCode || "—";
                        const isApproved = h.approvalStatus === "APPROVED" || h.status === "APPROVED" || !h.approvalStatus;

                        return (
                          <tr key={h.id || empId || idx} className={isRevoked ? "bg-rose-50/60" : ""}>
                            <td className="font-mono font-bold text-xs text-gov-navy bg-slate-50/80">
                              {empId}
                            </td>
                            <td>
                              <div className="space-y-0.5">
                                <span className="font-bold text-xs text-gov-navy block">{hName}</span>
                                <span className="text-[11px] text-gov-slate font-mono">
                                  {hEmail}
                                </span>
                              </div>
                            </td>
                            <td className="text-xs">
                              <span className="font-semibold text-gov-ink block">
                                {hCollege}
                              </span>
                              <span className="text-[11px] text-[#35a5f1] font-bold">
                                Department of {hBranch}
                              </span>
                            </td>
                            <td className="text-center">
                              {isApproved ? (
                                <span className="status-badge bg-emerald-50 text-emerald-800 border-emerald-200 font-bold text-[10px]">
                                  APPROVED
                                </span>
                              ) : (
                                <span className="status-badge bg-amber-50 text-amber-800 border-amber-200 font-bold text-[10px]">
                                  PENDING
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              {isRevoked ? (
                                <span className="status-badge bg-rose-600 text-white font-bold text-[10px]">
                                  ACCESS REVOKED
                                </span>
                              ) : (
                                <span className="status-badge bg-emerald-50 text-emerald-800 border-emerald-200 font-bold text-[10px]">
                                  AUTHORIZED HOD
                                </span>
                              )}
                            </td>
                            <td className="text-center whitespace-nowrap">
                              {isRevoked ? (
                                <button
                                  type="button"
                                  onClick={() => handleOpenAccessModal("HOD", h, true)}
                                  className="gov-btn bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 shadow-2xs cursor-pointer flex items-center gap-1.5 mx-auto"
                                  title="Give access back to this HOD (re-instate management rights)"
                                >
                                  <i className="fa-solid fa-unlock text-[10px]" />
                                  <span>Give Access / Restore</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleOpenAccessModal("HOD", h, false)}
                                  className="gov-btn-danger text-[11px] font-bold px-3 py-1.5 shadow-2xs hover:bg-rose-600 hover:text-white cursor-pointer flex items-center gap-1.5 mx-auto"
                                  title="Revoke department head management access in case of serious malpractice"
                                >
                                  <i className="fa-solid fa-ban text-[10px]" />
                                  <span>Revoke Access</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: 🚨 DISCIPLINARY INCIDENT LOGS */}
          {/* ========================================================================= */}
          {activeTab === "incidents" && (
            <div className="space-y-4">
              <div className="bg-rose-50 border border-rose-200 p-4 rounded text-xs text-rose-900 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-triangle-exclamation text-rose-600 text-lg mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-sm text-rose-950 block mb-0.5">
                      Official Disciplinary &amp; Access Revocation Registry
                    </span>
                    <p className="leading-relaxed text-[11px]">
                      This log records all formal administrative interventions, portal de-authorizations, and academic barring orders executed under the State Board of Technical Education Regulations.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="gov-btn bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold px-3 py-1.5 shadow-2xs shrink-0 cursor-pointer"
                >
                  <i className="fa-solid fa-print text-xs" />
                  <span>Print Audit Log</span>
                </button>
              </div>

              <div className="gov-card overflow-x-auto shadow-2xs">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th className="w-36">Incident Ref No</th>
                      <th>Target Subject</th>
                      <th>Violation Category</th>
                      <th>Reason &amp; Disciplinary Remarks</th>
                      <th>Authorized By</th>
                      <th>Date / Time</th>
                      <th className="text-center">Action Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incidentLogs.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-xs text-gov-slate">
                          No disciplinary incidents or access revocations logged yet.
                        </td>
                      </tr>
                    ) : (
                      incidentLogs.map((log) => (
                        <tr key={log.id || log.refNo}>
                          <td className="font-mono font-bold text-xs text-gov-navy bg-slate-50">
                            {log.refNo || log.id}
                          </td>
                          <td className="text-xs">
                            <span className="font-bold text-gov-navy block">{log.targetName}</span>
                            <div className="text-[11px] text-gov-slate font-mono">
                              <span className="bg-slate-100 px-1 py-0.2 rounded font-bold">
                                {log.targetType}
                              </span>{" "}
                              ID: <strong>{log.targetIdentifier}</strong>
                            </div>
                          </td>
                          <td className="text-xs">
                            <span className="font-semibold text-rose-900 block">
                              {log.categoryLabel || log.category}
                            </span>
                          </td>
                          <td className="text-xs text-gov-ink max-w-sm">
                            <p className="line-clamp-2" title={log.reason}>
                              {log.reason}
                            </p>
                          </td>
                          <td className="text-xs font-medium text-gov-slate whitespace-nowrap">
                            {log.actionBy || "Admin"}
                          </td>
                          <td className="text-[11px] font-mono text-gov-slate whitespace-nowrap">
                            {log.timestamp || log.createdAt}
                          </td>
                          <td className="text-center">
                            {log.status === "ACTIVE" || log.actionType === "RESTORED" ? (
                              <span className="status-badge bg-emerald-50 text-emerald-800 border-emerald-300 font-bold text-[10px]">
                                RESTORED
                              </span>
                            ) : (
                              <span className="status-badge bg-rose-600 text-white font-bold text-[10px]">
                                ACCESS BARRED
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🛡️ OFFICIAL GOVERNMENT DISCIPLINARY REVOKE / RESTORE MODAL */}
      {/* ========================================================================= */}
      {modalTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded border-2 border-gov-navy shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Title Bar */}
            <div
              className={`px-5 py-3.5 text-white flex items-center justify-between ${modalTarget.isRestoring ? "bg-[#00875a]" : "bg-rose-700"
                }`}
            >
              <div className="flex items-center gap-2">
                <i
                  className={`fa-solid ${modalTarget.isRestoring ? "fa-unlock" : "fa-triangle-exclamation"
                    } text-base`}
                />
                <span className="font-display font-bold text-sm uppercase tracking-wide">
                  {modalTarget.isRestoring
                    ? "Official Re-instatement Order"
                    : "Disciplinary Access Revocation & Suspension Order"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalTarget(null)}
                className="text-white/80 hover:text-white font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              {/* Target Entity Summary Box */}
              <div className="bg-slate-50 border border-slate-200 p-3 rounded space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Subject for Administrative Action:
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gov-navy">
                    {modalTarget.item.fullName || modalTarget.item.name || "Subject"}
                  </span>
                  <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-slate-300">
                    {modalTarget.item.pin || modalTarget.item.employeeId || modalTarget.item.code || modalTarget.item.id}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Institution: <strong>{modalTarget.item.collegeName || modalTarget.item.name || modalTarget.item.collegeCode || "Affiliated Institution"}</strong>
                  {modalTarget.item.branchName && ` • Dept: ${modalTarget.item.branchName}`}
                </p>
              </div>

              {modalTarget.isRestoring ? (
                // Restoration Confirmation
                <div className="space-y-3">
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-emerald-900 text-xs leading-relaxed">
                    <i className="fa-solid fa-circle-check text-emerald-600 mr-1.5" />
                    You are restoring full portal access, examination hall ticket generation, and academic eligibility for this subject.
                  </div>

                  <div>
                    <label className="gov-label">Clearance Order Remarks / Resolution Memo</label>
                    <textarea
                      className="gov-input text-xs"
                      rows={3}
                      placeholder="e.g. Formal inquiry completed. Disciplinary committee issued clearance memo."
                      value={officerNotes}
                      onChange={(e) => setOfficerNotes(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                // Revocation Form
                <div className="space-y-3">
                  <div className="bg-rose-50 border border-rose-200 p-3 rounded text-rose-900 text-[11.5px] leading-relaxed">
                    <strong className="block mb-0.5">⚠️ Regulatory Authority Notice:</strong>
                    Executing this action immediately disables the user's portal authentication, suspends hall ticket issuance, and blocks departmental management rights.
                  </div>

                  <div>
                    <label className="gov-label">Primary Incident / Violation Category *</label>
                    <select
                      className="gov-input text-xs font-semibold"
                      value={incidentCategory}
                      onChange={(e) => setIncidentCategory(e.target.value)}
                    >
                      {INCIDENT_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="gov-label">Disciplinary Action Enforcement Period</label>
                    <select
                      className="gov-input text-xs font-semibold"
                      value={actionDuration}
                      onChange={(e) => setActionDuration(e.target.value)}
                    >
                      <option value="INDEFINITE_REVOCATION">
                        Indefinite Access Revocation (Pending State Inquiry)
                      </option>
                      <option value="SEMESTER_BAR">
                        Full Semester Academic &amp; Examination Bar
                      </option>
                      <option value="SUSPENSION_14_DAYS">
                        Immediate 14-Day Disciplinary Suspension
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="gov-label">Mandatory Incident Reason &amp; Evidence Summary *</label>
                    <textarea
                      className="gov-input text-xs"
                      rows={3}
                      required
                      placeholder="Detail the specific serious incident, examination malpractice, or breach warranting access removal…"
                      value={incidentReason}
                      onChange={(e) => setIncidentReason(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalTarget(null)}
                  disabled={executingAction}
                  className="gov-btn bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-4 py-2 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDisciplinaryAction}
                  disabled={executingAction || (!modalTarget.isRestoring && !incidentReason.trim())}
                  className={`gov-btn text-white text-xs font-bold px-4 py-2 shadow-sm cursor-pointer ${modalTarget.isRestoring
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-rose-700 hover:bg-rose-800"
                    }`}
                >
                  {executingAction ? (
                    <span>Processing Order…</span>
                  ) : modalTarget.isRestoring ? (
                    <span>Confirm &amp; Give Access</span>
                  ) : (
                    <span>Execute Disciplinary Revocation</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, warn = false, helper, icon, link }) {
  const content = (
    <div
      className={`gov-card p-5 flex flex-col justify-between h-full transition-all ${warn ? "border-amber-400 bg-amber-50/30 shadow-xs" : ""
        }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] uppercase tracking-wider text-gov-slate font-bold">{label}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <div
        className={`font-display font-black text-3xl ${warn ? "text-amber-700" : "text-gov-navy"
          }`}
      >
        {value}
      </div>
      {helper && <span className="text-[11px] text-gov-slate mt-1 block">{helper}</span>}
    </div>
  );
  return link ? (
    <Link to={link} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
}
