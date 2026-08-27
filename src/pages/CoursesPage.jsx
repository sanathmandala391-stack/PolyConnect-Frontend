import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses, getCurrentAcademicYear,getCollegeSummary } from "../api/client";

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
        c.branchCode.toLowerCase().includes(q) ||
        c.branchName.toLowerCase().includes(q)
    );
  }, [courses, search]);

  return (
    <div className="courses-page-wrapper">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;600;700&display=swap');
        .courses-page-wrapper {
 font-family: 'Muli', sans-serif;
          color: #333333;
        //   background-color: #ffffff;
          min-height: 100vh;
          width: 100%;
        }

        /* Top Breadcrumb Bar */
        .breadcrumb-bar {
        //   background-color: rgb(230, 233, 237);
          padding: 12px 36px;
          width:2000px;
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

        /* Main Content Container */
        .courses-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 30px 24px 60px;
        }

        /* Academic Year Center Badge */
        .academic-year-badge-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .academic-year-badge {
          background-color: #337ab7;
          color: #ffffff;
          font-weight: bold;
          font-size: 15px;
          padding: 10px 24px;
          border-radius: 4px;
          letter-spacing: 0.2px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* Tab Bar */
        .tab-row {
          display: flex;
          border-bottom: 1px solid #dee2e6;
          margin-bottom: 22px;
          gap: 4px;
        }

        // .tab-item {
        //   padding: 10px 22px;
        //   font-size: 17px;
        //   font-weight: bold;
        //   cursor: pointer;
        //   border: 1px solid transparent;
        //   border-bottom: none;
        //   background: none;
        //   outline: none;
        //   transition: all 0.15s ease;
        // }

        // .tab-item.active {
        //   background-color: #ffffff;
        //   border: 1px solid #dee2e6;
        //   border-bottom: 1px solid #ffffff;
        //   margin-bottom: -1px;
        //   border-top-left-radius: 4px;
        //   border-top-right-radius: 4px;
        //    color:red;
        // }

        // .tab-item.inactive {
        //   color:red;
        // }

        // .tab-item.inactive:hover {
        //   color: #0056b3;
        //   text-decoration: underline;
        // }

        .tab-item {
  padding: 10px 22px;
  font-size: 17px;
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

        /* Search Section */
        .search-section {
          margin-bottom: 18px;
        }

        .search-section label {
          display: block;
          font-size: 14px;
          margin-bottom: 6px;
          color: #212529;
          font-weight: 500;
        }

        .search-section input {
          width: 300px;
          max-width: 100%;
          padding: 7px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
          color: #495057;
          background-color: #ffffff;
          outline: none;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .search-section input:focus {
          border-color: #80bdff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        /* Courses Table */
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
          padding: 8px 14px;
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
          width: 60px;
          min-width: 50px;
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

      <div className="courses-content mt-4">
        {/* Academic year badge */}
        {academicYear && (
          <div className="academic-year-badge-wrap">
            <div className="academic-year-badge" style={{backgroundColor: "#3c8dbc"}}>
              Data Shown for Current Academic Year : {academicYear}
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="tab-row">
          {/* <button
            type="button"
            className={`tab-item ${activeTab === "courses" ? "active" : "inactive"}`}
            onClick={() => setActiveTab("courses")}
           style={{color: "#555"}}>
            Diploma Courses
          </button>
          <button
            type="button"
            className={`tab-item ${activeTab === "colleges" ? "active" : "inactive"}`}
            onClick={() => setActiveTab("colleges")}
          style={{color: "#555"}}>
            Colleges
          </button> */}
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
              <label htmlFor="course-search" style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: 300 }}>Search</label>
              <input
                id="course-search"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)} style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: 400 }}
              />
            </div>

            {loading && <div className="status-msg">Loading courses...</div>}
            {error && <div className="error-msg">{error}</div>}

            {!loading && !error && (
              <div className="courses-table-container">
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th className="sno-col" style={{
  fontFamily: "Mulish, sans-serif",
  fontSize: "14px",
  fontWeight: 550
}}>S.No</th>

                      <th style={{
  fontFamily: "Mulish, sans-serif",
  fontSize: "14px",
  fontWeight: 550
}}>Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course, index) => {
                      const isSelected = selectedBranchCode === course.branchCode;
                      return (
                        <tr
                          key={course.courseId}
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
                              }} style={{fontFamily: "'Muli', sans-serif",fontSize: "12px",color: "#007bff"}}
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

      {/* {activeTab === "colleges" && (
  <>
    {summaryLoading && <div className="status-msg">Loading college summary...</div>}
    {summaryError && <div className="error-msg">{summaryError}</div>}

    {!summaryLoading && !summaryError && (
      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Colleges</th>
              <th>Intake</th>
            </tr>
          </thead>
          <tbody>
            {collegeSummary.map((row) => {
              const isTotal = row.typeName === "Total";
              return (
                <tr key={row.typeName} className={isTotal ? "summary-total-row" : ""}>
                  <td className={isTotal ? "summary-total-cell" : ""}>{row.typeName}</td>
                  <td className={isTotal ? "summary-total-cell summary-count-cell" : "summary-count-cell"}>
                    {row.collegeCount}
                  </td>
                  <td className={isTotal ? "summary-total-cell" : ""}>{row.totalIntake}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </>
)} */}

{activeTab === "colleges" && (
  <>
    {summaryLoading && (
      <div className="status-msg" style={{ padding: "16px", color: "#666666" }}>
        Loading college summary...
      </div>
    )}
    {summaryError && (
      <div className="error-msg" style={{ padding: "16px", color: "#dc3545" }}>
        {summaryError}
      </div>
    )}

    {!summaryLoading && !summaryError && (
      <div className="courses-table-container" style={{ width: "100%", maxWidth: "640px" }}>
        <table
          className="courses-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #000000",
            fontSize: "14px",
            backgroundColor: "#ffffff",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#ffffff" }}>
              <th style={{ border: "1px solid #000000", padding: "8px 12px", textAlign: "left", color: "#000000", width: "45%", fontFamily: "'Muli', sans-serif", fontSize: "13px", fontWeight: "600" }}>
                Type
              </th>
              <th style={{ border: "1px solid #000000", padding: "8px 12px", textAlign: "left", color: "#000000", width: "25%", fontFamily: "'Muli', sans-serif", fontSize: "13px", fontWeight: "600" }}>
                Colleges
              </th>
              <th style={{ border: "1px solid #000000", padding: "8px 12px", textAlign: "left", color: "#000000", width: "30%", fontFamily: "'Muli', sans-serif", fontSize: "13px", fontWeight: "600" }}>
                Intake
              </th>
            </tr>
          </thead>
          <tbody>
            {collegeSummary.map((row) => {
              const isTotal = row.typeName === "Total";
              return (
                <tr
                  key={row.typeName}
                  className={isTotal ? "summary-total-row" : ""}
                  style={{ backgroundColor: isTotal ? "#e5f3fa" : "#ffffff" }}
                >
                  <td
                    className={isTotal ? "summary-total-cell" : ""}
                    style={{ border: "1px solid #000000", padding: "8px 12px", fontWeight: isTotal ? "700" : "400", fontFamily: "'Muli', sans-serif", fontSize: "14px", color: isTotal ? "#555" : "#000000" }}
                  >
                    {row.typeName}
                  </td>
                  <td
                    className={isTotal ? "summary-total-cell summary-count-cell" : "summary-count-cell"}
                    style={{ border: "1px solid #000000", padding: "8px 12px", fontWeight: isTotal ? "700" : "500", color: "#007bff", cursor: "pointer" }}
                  >
                    {row.collegeCount}
                  </td>
                  <td
                    className={isTotal ? "summary-total-cell" : ""}
                    style={{ border: "1px solid #000000", padding: "8px 12px", fontWeight: isTotal ? "700" : "400", color: "#000000" }}
                  >
                    {row.totalIntake}
                  </td>
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