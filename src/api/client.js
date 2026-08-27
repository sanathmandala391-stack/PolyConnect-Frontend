import axios from "axios";

// PolyConnect's own backend only. This app never calls SBTET's site directly —
// every SBTET-derived value (results, attendance, circulars) comes through /api/sbtet/* and
// /api/student/attendance*, which the Spring Boot backend proxies server-side.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("pc_token");
      localStorage.removeItem("pc_user");
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export function apiErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  return err?.response?.data?.message || err?.response?.data?.error || err?.message || fallback;
}

/**
 * Fetch Consolidated Results for a given PIN.
 * Endpoint: GET /api/sbtet/consolidated-results?pin={pin}
 */
export const getConsolidatedResults = async (pin) => {
  const response = await api.get("/sbtet/consolidated-results", {
    params: { pin },
  });
  return response.data;
};

/**
 * Fetch Exam Month/Year list based on Fee Type ("Regular" or "Backlog").
 * Endpoint: GET /api/sbtet/fee/exam-month-year?feeType={feeType}
 */
export const getExamMonthYear = async (feeType = "Regular") => {
  const response = await api.get("/sbtet/fee/exam-month-year", {
    params: { feeType },
  });
  return response.data;
};

/**
 * Fetch Challan Numbers for a given ExamMonthYearID and PIN.
 * Endpoint: GET /api/sbtet/fee/challan-numbers?examMonthYearId={id}&pin={pin}
 */
export const getChallanNumbers = async (examMonthYearId, pin) => {
  const response = await api.get("/sbtet/fee/challan-numbers", {
    params: { examMonthYearId, pin },
  });
  return response.data;
};

/**
 * Fetch Challan Details by Challan Number.
 * Endpoint: GET /api/sbtet/fee/challan-details?chalanaNo={chalanaNo}
 */
export const getChallanDetails = async (chalanaNo) => {
  const response = await api.get("/sbtet/fee/challan-details", {
    params: { chalanaNo },
  });
  return response.data;
};




export const getAllCourses = async () => {
  const res = await api.get("/courses");
  return res.data; // [{courseId, branchCode, branchName, courseName, active}, ...]
};
 
export const getCurrentAcademicYear = async () => {
  const res = await api.get("/courses/academic-year");
  return res.data.academicYear; // "2026-27"
};
 
export const getCollegesForBranch = async (branchCode) => {
  const res = await api.get(`/courses/${branchCode}/colleges`);
  return res.data; // [{collegeCode, collegeName, courseName, branchCode, intake, academicYear}, ...]
};
 
export const getCoursesForCollege = async (collegeCode) => {
  const res = await api.get(`/courses/colleges/${collegeCode}`);
  return res.data;
};


export const getCollegeSummary = async () => {
  const res = await api.get("/courses/college-summary");
  return res.data; // [{typeName, collegeCount, totalIntake}, ..., {typeName: "Total", ...}]
};




export default api;
