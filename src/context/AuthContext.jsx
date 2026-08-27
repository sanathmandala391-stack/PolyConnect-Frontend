import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api, { apiErrorMessage } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("pc_user");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    const token = localStorage.getItem("pc_token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get("/auth/me");
      const currentUser = res.data?.user || res.data;

      // Check if user is suspended/disabled
      if (
        currentUser &&
        (currentUser.active === false ||
          currentUser.enabled === false ||
          currentUser.status === "SUSPENDED" ||
          currentUser.status === "REVOKED")
      ) {
        localStorage.removeItem("pc_token");
        localStorage.removeItem("pc_user");
        setUser(null);
      } else {
        setUser(currentUser);
        localStorage.setItem("pc_user", JSON.stringify(currentUser));
      }
    } catch {
      localStorage.removeItem("pc_token");
      localStorage.removeItem("pc_user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  async function login(identifier, password) {
    const res = await api.post("/auth/login", { identifier, password });
    const { token, user: loggedInUser } = res.data;

    // Check if returned user is deactivated
    if (
      loggedInUser &&
      (loggedInUser.active === false ||
        loggedInUser.enabled === false ||
        loggedInUser.status === "SUSPENDED" ||
        loggedInUser.status === "REVOKED")
    ) {
      localStorage.removeItem("pc_token");
      localStorage.removeItem("pc_user");
      setUser(null);
      const err = new Error("You are Denied from Portal. Please Contact Your HOD.");
      err.isDenied = true;
      throw err;
    }

    localStorage.setItem("pc_token", token);
    localStorage.setItem("pc_user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  }

  function logout() {
    localStorage.removeItem("pc_token");
    localStorage.removeItem("pc_user");
    setUser(null);
  }

  async function registerStudent(studentPayload, collegeCode, branchCode) {
    const res = await api.post(
      `/auth/register/student?collegeCode=${encodeURIComponent(collegeCode)}&branchCode=${encodeURIComponent(branchCode)}`,
      studentPayload
    );
    return res.data;
  }

  async function registerHod(hodPayload, collegeCode, branchCode) {
    const res = await api.post(
      `/auth/register/hod?collegeCode=${encodeURIComponent(collegeCode)}&branchCode=${encodeURIComponent(branchCode)}`,
      hodPayload
    );
    return res.data;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        registerStudent,
        registerHod,
        refreshMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { apiErrorMessage };
