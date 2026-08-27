import { useEffect, useState } from "react";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";

export default function AdminHodApprovalsPage() {
  const [approvals, setApprovals] = useState(null);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [reasonDrafts, setReasonDrafts] = useState({});

  function load() {
    api
      .get("/admin/approvals/hod/pending")
      .then((res) => setApprovals(Array.isArray(res.data) ? res.data : []))
      .catch((err) => setError(apiErrorMessage(err, "Could not load pending HOD approval requests.")));
  }

  useEffect(load, []);

  async function decide(id, approve) {
    setError("");
    setProcessingId(id);
    try {
      const reason = reasonDrafts[id] || "";
      await api.post(
        `/admin/approvals/hod/${id}/decision?approve=${approve}&reason=${encodeURIComponent(reason)}`
      );
      setApprovals((list) => list.filter((a) => a.id !== id));
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          `Could not ${approve ? "approve" : "reject"} this faculty HOD registration.`
        )
      );
    } finally {
      setProcessingId(null);
    }
  }

  if (error && !approvals) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-bold text-gov-navy">Faculty HOD Approvals</h1>
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!approvals) {
    return <GovLoader label="Loading pending faculty HOD registration queue…" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gov-border pb-3">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gov-navy">
            Faculty HOD Registration Approvals
          </h1>
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {approvals.length} Pending
          </span>
        </div>
        <p className="text-xs md:text-sm text-gov-slate mt-0.5">
          Verify department head appointments, institution affiliations, and credentials before granting department administrator privileges.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-3.5 py-2.5 rounded-sm">
          {error}
        </div>
      )}

      {approvals.length === 0 ? (
        <div className="gov-card p-12 text-center text-sm text-gov-slate">
          <p className="font-semibold text-gov-navy mb-1">No Pending Faculty Approvals</p>
          <p className="text-xs">All submitted HOD registration applications have been verified and processed.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {approvals.map((a) => (
            <div key={a.id} className="gov-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-gov-navy">
                    {a.hod?.fullName || "Faculty Applicant"}
                  </h3>
                  {a.hod?.employeeId && (
                    <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-gov-slate">
                      ID: {a.hod.employeeId}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gov-slate">
                  Email: <span className="font-mono text-gov-ink">{a.hod?.email}</span> &bull; Phone:{" "}
                  <span className="font-mono text-gov-ink">{a.hod?.phoneNumber || "N/A"}</span>
                </p>

                <p className="text-xs text-gov-slate">
                  Department: <strong>{a.branch?.name || a.branchCode}</strong> &bull; Institution:{" "}
                  <strong>{a.college?.name || a.collegeCode}</strong>
                </p>

                {(a.hod?.qualification || a.hod?.experienceYears != null) && (
                  <p className="text-[11px] text-gov-muted">
                    Qualification: {a.hod?.qualification || "N/A"} &bull; Experience:{" "}
                    {a.hod?.experienceYears != null ? `${a.hod.experienceYears} Years` : "N/A"}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <input
                  className="gov-input text-xs sm:w-48"
                  placeholder="Decision reason (optional)"
                  value={reasonDrafts[a.id] || ""}
                  onChange={(e) =>
                    setReasonDrafts((d) => ({ ...d, [a.id]: e.target.value }))
                  }
                />
                <div className="flex gap-2">
                  <button
                    className="gov-btn bg-gov-sage hover:bg-green-800 text-white text-xs font-bold px-4 py-2"
                    disabled={processingId === a.id}
                    onClick={() => decide(a.id, true)}
                  >
                    {processingId === a.id ? "…" : "Approve HOD"}
                  </button>
                  <button
                    className="gov-btn-danger text-xs font-bold px-3 py-2"
                    disabled={processingId === a.id}
                    onClick={() => decide(a.id, false)}
                  >
                    {processingId === a.id ? "…" : "Reject"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
