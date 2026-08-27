import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCollegesForBranch, getCurrentAcademicYear } from "../api/client";

export default function BranchCollegesPage() {
  const { branchCode } = useParams();
  const navigate = useNavigate();

  const [colleges, setColleges] = useState([]);
  const [academicYear, setAcademicYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const [collegeList, year] = await Promise.all([
          getCollegesForBranch(branchCode),
          getCurrentAcademicYear(),
        ]);
        setColleges(collegeList);
        setAcademicYear(year);
      } catch (err) {
        setError("Failed to load colleges for this branch.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [branchCode]);

  const courseName = colleges[0]?.courseName || branchCode;

  return (
    <div className="courses-page-wrapper">
      <style>{`
        .courses-page-wrapper {
          font-family: Arial, Helvetica, sans-serif;
          color: #333333;
          background-color: #ffffff;
          min-height: 100vh;
          width: 100%;
        }

        /* Top Breadcrumb Bar */
        .breadcrumb-bar {
          background-color: #ebf0f5;
          padding: 12px 36px;
          font-size: 15px;
          border-bottom: 1px solid #e0e5eb;
          display: flex;
          align-items: center;
        }

        .breadcrumb-bar .home-link {
          font-weight: bold;
          color: #0b3b60;
          text-decoration: none;
          cursor: pointer;
        }

        .breadcrumb-bar .home-link:hover {
          text-decoration: underline;
        }

        .breadcrumb-bar .sep {
          margin: 0 8px;
          color: #6c757d;
        }

        .breadcrumb-bar .current {
          color: #6c757d;
        }

        /* Main Content Area */
        .courses-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 36px 24px 60px;
        }

        .page-title {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 6px;
          color: #212529;
        }

        .page-subtitle {
          font-size: 14px;
          color: #555555;
          margin-bottom: 24px;
        }

        /* Table */
        .courses-table-container {
          width: 100%;
          overflow-x: auto;
        }

        .courses-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #212529;
          background-color: #ffffff;
        }

        .courses-table th,
        .courses-table td {
          border: 1px solid #212529;
          padding: 9px 14px;
          text-align: left;
          font-size: 14px;
          line-height: 1.45;
        }

        .courses-table th {
          background-color: #ffffff;
          color: #212529;
          font-weight: bold;
        }

        .courses-table td.sno-col,
        .courses-table th.sno-col {
          width: 70px;
          min-width: 50px;
        }

        .courses-table td.intake-col,
        .courses-table th.intake-col {
          width: 90px;
          min-width: 70px;
          text-align: left;
        }

        .courses-table td.code-col,
        .courses-table th.code-col {
          width: 120px;
          min-width: 90px;
        }

        .courses-table tr:hover {
          background-color: #f3f8fd;
        }

        .status-msg {
          padding: 30px;
          text-align: center;
          color: #666666;
          font-size: 15px;
        }

        .error-msg {
          padding: 20px;
          text-align: center;
          color: #d9534f;
          font-weight: bold;
          font-size: 15px;
        }
      `}</style>

      {/* Top Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="home-link" onClick={() => navigate("/")}>
          Home
        </span>
        <span className="sep">/</span>
        <span className="home-link" onClick={() => navigate("/courses")}>
          Courses
        </span>
        <span className="sep">/</span>
        <span className="current">{branchCode}</span>
      </div>

      <div className="courses-content">
        <div className="page-title">
          {branchCode} - {courseName}
        </div>
        {academicYear && (
          <div className="page-subtitle">
            Colleges offering this branch for Academic Year {academicYear}
          </div>
        )}

        {loading && <div className="status-msg">Loading colleges...</div>}
        {error && <div className="error-msg">{error}</div>}

        {!loading && !error && (
          <div className="courses-table-container">
            <table className="courses-table">
              <thead>
                <tr>
                  <th className="sno-col">S.No</th>
                  <th className="code-col">College Code</th>
                  <th>College Name</th>
                  <th className="intake-col">Intake</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((c, index) => (
                  <tr key={c.collegeCode + index}>
                    <td className="sno-col">{index + 1}</td>
                    <td className="code-col">{c.collegeCode}</td>
                    <td>{c.collegeName}</td>
                    <td className="intake-col">{c.intake}</td>
                  </tr>
                ))}
                {colleges.length === 0 && (
                  <tr>
                    <td colSpan={4} className="status-msg">
                      No colleges currently offer this branch.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}