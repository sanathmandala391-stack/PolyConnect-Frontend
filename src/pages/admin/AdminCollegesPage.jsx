import { useEffect, useState, useMemo } from "react";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState(null);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({ code: "", name: "", location: "", district: "" });
  const [selectedBranches, setSelectedBranches] = useState([]);

  function load() {
    Promise.all([api.get("/colleges/public"), api.get("/branches/public")])
      .then(([collegesRes, branchesRes]) => {
        setColleges(Array.isArray(collegesRes.data) ? collegesRes.data : []);
        setBranches(Array.isArray(branchesRes.data) ? branchesRes.data : []);
      })
      .catch((err) => setError(apiErrorMessage(err, "Could not load colleges directory.")));
  }

  useEffect(load, []);

  function toggleBranch(code) {
    setSelectedBranches((list) =>
      list.includes(code) ? list.filter((c) => c !== code) : [...list, code]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    if (selectedBranches.length === 0) {
      setSubmitError("Please select at least one branch that this institution offers.");
      return;
    }
    setSubmitting(true);
    try {
      const params = new URLSearchParams();
      selectedBranches.forEach((code) => params.append("branchCodes", code));
      await api.post(`/admin/colleges?${params.toString()}`, {
        code: form.code.trim(),
        name: form.name.trim(),
        location: form.location.trim(),
        district: form.district.trim(),
        active: true,
      });
      setForm({ code: "", name: "", location: "", district: "" });
      setSelectedBranches([]);
      load();
    } catch (err) {
      setSubmitError(
        apiErrorMessage(
          err,
          "Could not register college. Verify that the 3-digit code is unique and not already registered."
        )
      );
    } finally {
      setSubmitting(false);
    }
  }

  const filtered = useMemo(() => {
    if (!colleges) return [];
    const q = search.trim().toLowerCase();
    if (!q) return colleges;
    return colleges.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.code && c.code.toLowerCase().includes(q)) ||
        (c.district && c.district.toLowerCase().includes(q))
    );
  }, [colleges, search]);

  if (error && !colleges) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-bold text-gov-navy">Colleges Directory</h1>
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!colleges) {
    return <GovLoader label="Loading registered colleges and branch offerings…" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gov-border pb-3">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gov-navy">
            Polytechnic Colleges Management
          </h1>
          <span className="bg-blue-100 text-gov-blueDark text-xs font-bold px-2.5 py-0.5 rounded-full">
            {colleges.length} Institutions
          </span>
        </div>
        <p className="text-xs md:text-sm text-gov-slate mt-0.5">
          Manage affiliated Telangana government and private polytechnic institutions and branch configurations.
        </p>
      </div>

      {/* Register New College Form */}
      <div className="gov-card overflow-hidden border-2 border-gov-navy/20">
        <div className="gov-title-bar" style={{backgroundColor: "#35a5f1"}}>
          <span>Register New Polytechnic Institution</span>
          <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded">
            Admin 
          </span>
        </div>

        <form onSubmit={handleSubmit} className="gov-form-box space-y-4">
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-3.5 py-2.5 rounded-sm">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="gov-label">College Code</label>
              <input
                className="gov-input font-mono"
                required
                maxLength={3}
                pattern="\d{3}"
                title="Must be exactly 3 digits, e.g. 047"
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                placeholder="e.g. 047"
              />
            </div>

            <div>
              <label className="gov-label">College Name</label>
              <input
                className="gov-input"
                required
                placeholder="e.g. Government Polytechnic, Masab Tank"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="gov-label">College Location</label>
              <input
                className="gov-input"
                placeholder="e.g.Abdullapurmet"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
            </div>

            <div>
              <label className="gov-label">District</label>
              <input
                className="gov-input"
                placeholder="e.g.Rangareddy"
                value={form.district}
                onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="gov-label">Branches Offered by the College</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto border border-gov-border rounded-sm p-3 bg-white">
              {branches.map((b) => (
                <label key={b.code} className="flex items-center gap-2 text-xs text-gov-ink cursor-pointer hover:text-gov-blue select-none">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded text-gov-blue focus:ring-gov-blue"
                    checked={selectedBranches.includes(b.code)}
                    onChange={() => toggleBranch(b.code)}
                  />
                  <span className="font-mono font-semibold">{b.code}</span>
                  <span className="text-[11px] text-gov-slate truncate">({b.name})</span>
                </label>
              ))}
            </div>
          </div>

          <button className="gov-btn-primary w-full py-2.5" disabled={submitting}>
            {submitting ? "Registering Institution…" : "Register College in System"}
          </button>
        </form>
      </div>

      {/* Registered Colleges List */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-gov-border rounded-sm">
          <h2 className="font-display font-bold text-sm text-gov-navy uppercase tracking-wider">
            Registered Institutions Directory
          </h2>
          <div className="w-full sm:w-72">
            <input
              className="gov-input text-xs"
              placeholder="Search by code, college name, or district…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="gov-card overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th className="w-16">Code</th>
                <th>College Name</th>
                <th>District</th>
                <th>Location</th>
                <th>Branches Offered</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-xs text-gov-slate">
                    No colleges match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.code}>
                    <td className="font-mono font-bold text-xs text-gov-navy">{c.code}</td>
                    <td className="font-medium text-xs text-gov-ink">{c.name}</td>
                    <td className="text-xs text-gov-slate">{c.district || "—"}</td>
                    <td className="text-xs text-gov-slate">{c.location || "—"}</td>
                    <td className="text-xs">
                      <div className="flex flex-wrap gap-1">
                        {(c.branchCodes || []).map((code) => (
                          <span key={code} className="bg-slate-100 text-gov-navy font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {code}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
