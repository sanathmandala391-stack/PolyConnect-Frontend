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
    <div className="courses-page-wrapper w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;600;700&display=swap');

        .courses-page-wrapper {
          font-family: 'Muli', sans-serif;
          color: #333333;
          min-height: 100vh;
          width: 100%;
        }

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
          padding: 8px 12px;
          text-align: left;
          font-size: 13.5px;
          line-height: 1.45;
        }

        .courses-table th {
          background-color: #ffffff;
          color: #212529;
          font-weight: bold;
        }

        .courses-table td.sno-col,
        .courses-table th.sno-col {
          width: 60px;
          min-width: 50px;
          text-align: center;
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
          padding: 24px;
          text-align: center;
          color: #666666;
          font-size: 14px;
        }

        .error-msg {
          padding: 16px;
          text-align: center;
          color: #d9534f;
          font-weight: bold;
          font-size: 14px;
        }
      `}</style>

      {/* Top Breadcrumb */}
      <div
        className="-mx-3 sm:-mx-4 md:-mx-6 bg-[#d8dadc] px-4 sm:px-8 py-2 flex items-center mb-4 text-[13px] sm:text-[14px]"
        style={{ boxSizing: "border-box", marginTop: "-16px" }}
      >
        <span
          className="font-bold text-[#0b3b60] hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </span>
        <span className="mx-2 text-gray-500">/</span>
        <span
          className="font-bold text-[#0b3b60] hover:underline cursor-pointer"
          onClick={() => navigate("/courses")}
        >
          Courses
        </span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-600 font-semibold">{branchCode}</span>
      </div>

      <div className="w-full max-w-[1100px] mx-auto px-1 sm:px-4 py-2 sm:py-4">
        <h1 className="text-lg sm:text-2xl font-bold mb-1 text-[#212529]">
          {branchCode} - {courseName}
        </h1>
        {academicYear && (
          <p className="text-xs sm:text-sm text-gray-600 mb-6 font-medium">
            Colleges offering this branch for Academic Year {academicYear}
          </p>
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
                    <td className="code-col font-mono font-medium">{c.collegeCode}</td>
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