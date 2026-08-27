import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses, getCurrentAcademicYear, getCollegeSummary } from "../api/client";

export default function CoursesPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("courses"); // "courses" | "colleges"
  const [courses, setCourses] = useState([]);
  const [academicYear, setAcademicYear] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBranchCode, setSelectedBranchCode] = useState(null);
  const [collegeSummary, setCollegeSummary] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [summaryLoaded, setSummaryLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const [courseList, year] = await Promise.all([
          getAllCourses(),
          getCurrentAcademicYear(),
        ]);
        setCourses(courseList);
        setAcademicYear(year);
      } catch (err) {
        setError("Failed to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (activeTab !== "colleges" || summaryLoaded) return;

    const loadSummary = async () => {
      try {
        setSummaryLoading(true);
        setSummaryError("");
        const data = await getCollegeSummary();
        setCollegeSummary(data);
        setSummaryLoaded(true);
      } catch (err) {
        setSummaryError("Failed to load college summary. Please try again.");
      } finally {
        setSummaryLoading(false);
      }
    };
    loadSummary();
  }, [activeTab, summaryLoaded]);

  const filteredCourses = useMemo(() => {
    if (!search.trim()) return courses;
    const q = search.trim().toLowerCase();
    return courses.filter(
      (c) =>
        c.branchCode?.toLowerCase().includes(q) ||
        c.branchName?.toLowerCase().includes(q)
    );
  }, [courses, search]);

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

        .academic-year-badge-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .academic-year-badge {
          background-color: #3c8dbc;
          color: #ffffff;
          font-weight: bold;
          font-size: 13px;
          padding: 8px 18px;
          border-radius: 4px;
          letter-spacing: 0.2px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .tab-row {
          display: flex;
          border-bottom: 1px solid #dee2e6;
          margin-bottom: 20px;
          gap: 4px;
        }

        .tab-item {
          padding: 8px 18px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          border: 1px solid transparent;
          border-bottom: none;
          background: none;
          outline: none;
          transition: all 0.15s ease;
        }

        .tab-item.active {
          background-color: #ffffff;
          border: 1px solid #dee2e6;
          border-bottom: 1px solid #ffffff;
          margin-bottom: -1px;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          color: #555555;
        }

        .tab-item.inactive {
          color: #007bff;
        }

        .tab-item.inactive:hover {
          color: #0056b3;
        }

        .search-section {
          margin-bottom: 18px;
        }

        .search-section label {
          display: block;
          font-size: 13px;
          margin-bottom: 6px;
          color: #212529;
          font-weight: 500;
        }

        .search-section input {
          width: 100%;
          max-width: 320px;
          padding: 7px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
          color: #495057;
          background-color: #ffffff;
          outline: none;
        }

        .search-section input:focus {
          border-color: #80bdff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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

        .courses-table tr:hover {
          background-color: #f3f8fd;
        }

        .courses-table tr.row-selected {
          background-color: #cce8ff !important;
        }

        .branch-link {
          font-family: 'Muli', sans-serif !important;
          color: #007bff;
          text-decoration: none;
          cursor: pointer;
          display: inline-block;
          font-weight: 500;
        }

        .branch-link:hover {
          text-decoration: underline;
          color: #0056b3;
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
        className="-mx-3 sm:-mx-4 md:-mx-6 bg-[#d8dadc] px-4 sm:px-8 py-2 flex items-center mb-4"
        style={{ boxSizing: "border-box", marginTop: "-16px" }}
      >
        <h1
          className="m-0 text-[13px] sm:text-[14px] text-[#212529] leading-none"
          style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 700 }}
        >
          Home / Courses
        </h1>
      </div>

      <div className="w-full max-w-[1100px] mx-auto px-1 sm:px-4 py-2 sm:py-4">
        {/* Academic year badge */}
        {academicYear && (
          <div className="academic-year-badge-wrap">
            <div className="academic-year-badge">
              Data Shown for Current Academic Year : {academicYear}
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="tab-row">
          <button
            type="button"
            className={`tab-item ${activeTab === "courses" ? "active" : "inactive"}`}
            onClick={() => setActiveTab("courses")}
          >
            Diploma Courses
          </button>
          <button
            type="button"
            className={`tab-item ${activeTab === "colleges" ? "active" : "inactive"}`}
            onClick={() => setActiveTab("colleges")}
          >
            Colleges
          </button>
        </div>

        {activeTab === "courses" && (
          <>
            <div className="search-section">
              <label htmlFor="course-search">Search</label>
              <input
                id="course-search"
                type="text"
                placeholder="Search by branch code or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {loading && <div className="status-msg">Loading courses...</div>}
            {error && <div className="error-msg">{error}</div>}

            {!loading && !error && (
              <div className="courses-table-container">
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th className="sno-col">S.No</th>
                      <th>Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course, index) => {
                      const isSelected = selectedBranchCode === course.branchCode;
                      return (
                        <tr
                          key={course.courseId || course.branchCode || index}
                          className={isSelected ? "row-selected" : ""}
                          onClick={() => setSelectedBranchCode(course.branchCode)}
                        >
                          <td className="sno-col">{index + 1}</td>
                          <td>
                            <span
                              className="branch-link"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/courses/${course.branchCode}`);
                              }}
                            >
                              {course.branchCode} - {course.branchName}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredCourses.length === 0 && (
                      <tr>
                        <td colSpan={2} className="status-msg">
                          No branches match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {activeTab === "colleges" && (
          <>
            {summaryLoading && <div className="status-msg">Loading college summary...</div>}
            {summaryError && <div className="error-msg">{summaryError}</div>}

            {!summaryLoading && !summaryError && (
              <div className="courses-table-container max-w-2xl">
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th className="w-1/2">Type</th>
                      <th className="w-1/4">Colleges</th>
                      <th className="w-1/4">Intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeSummary.map((row) => {
                      const isTotal = row.typeName === "Total";
                      return (
                        <tr
                          key={row.typeName}
                          style={{ backgroundColor: isTotal ? "#e5f3fa" : "#ffffff" }}
                        >
                          <td style={{ fontWeight: isTotal ? "700" : "400" }}>{row.typeName}</td>
                          <td style={{ fontWeight: isTotal ? "700" : "500", color: "#007bff" }}>
                            {row.collegeCount}
                          </td>
                          <td style={{ fontWeight: isTotal ? "700" : "400" }}>{row.totalIntake}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}