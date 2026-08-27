// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth, apiErrorMessage } from "../context/AuthContext";

// export default function LoginPage() {
//   const { login, user } = useAuth();
//   const navigate = useNavigate();
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user) {
//       const dest =
//         user.role === "STUDENT"
//           ? "/student/dashboard"
//           : user.role === "HOD"
//           ? "/hod/dashboard"
//           : "/admin/dashboard";
//       navigate(dest, { replace: true });
//     }
//   }, [user, navigate]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const loggedInUser = await login(identifier.trim(), password);
//       const dest =
//         loggedInUser.role === "STUDENT"
//           ? "/student/dashboard"
//           : loggedInUser.role === "HOD"
//           ? "/hod/dashboard"
//           : "/admin/dashboard";
//       navigate(dest, { replace: true });
//     } catch (err) {
//       setError(
//         apiErrorMessage(
//           err,
//           "Sign in failed. Please verify your credentials, or ensure your account has been approved by your HOD / Admin."
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto my-8">
//       <div className="gov-card overflow-hidden border-2 border-gov-navy/20">
//         {/* Title bar */}
//         <div className="gov-title-bar">
//           <span className="flex items-center gap-2">
//             <svg className="w-5 h-5 text-gov-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             PolyConnect Single Sign-In
//           </span>
//           <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded">
//             Portal Access
//           </span>
//         </div>

//         <form onSubmit={handleSubmit} className="gov-form-box space-y-4">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-3.5 py-2.5 rounded-sm flex items-start gap-2">
//               <svg className="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span>{error}</span>
//             </div>
//           )}

//           <div>
//             <label className="gov-label">Student PIN / Employee ID / Email</label>
//             <input
//               className="gov-input"
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//               placeholder="e.g. 24047-CS-023 or email@example.com"
//               required
//               autoFocus
//             />
//             <p className="text-[11px] text-gov-slate mt-1">
//               Students enter their official PIN. HODs enter their registered Email or Employee ID.
//             </p>
//           </div>

//           <div>
//             <label className="gov-label">Password</label>
//             <input
//               type="password"
//               className="gov-input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button className="gov-btn-primary w-full py-2.5" disabled={loading}>
//             {loading ? "Authenticating session…" : "Sign In to Portal"}
//           </button>

//           <div className="text-[11px] text-gov-slate text-center bg-white p-2.5 rounded border border-gov-border">
//             <strong>Note on Pending Accounts:</strong> Newly registered students and HODs must be approved by their respective department authority before signing in.
//           </div>

//           <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-gov-border text-xs">
//             <Link to="/register/student" className="text-gov-blue font-bold hover:underline">
//               New Student? Register here &rarr;
//             </Link>
//             <Link to="/register/hod" className="text-gov-navy font-semibold hover:underline">
//               HOD Registration &rarr;
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

















import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, apiErrorMessage } from "../context/AuthContext";

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCaptcha = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (user) {
      const dest =
        user.role === "STUDENT"
          ? "/student/dashboard"
          : user.role === "HOD"
            ? "/hod/dashboard"
            : "/admin/dashboard";
      navigate(dest, { replace: true });
    }
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (captchaInput.trim() !== captchaCode) {
      setError("Invalid Captcha code. Please try again.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    setLoading(true);
    try {
      const loggedInUser = await login(identifier.trim(), password);
      const dest =
        loggedInUser.role === "STUDENT"
          ? "/student/dashboard"
          : loggedInUser.role === "HOD"
            ? "/hod/dashboard"
            : "/admin/dashboard";
      navigate(dest, { replace: true });
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          "Sign in failed. Please verify your credentials, or ensure your account has been approved by your HOD / Admin."
        )
      );
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Font import — Poppins */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Page wrapper — card is horizontally centered, sits near the top */}
      <div
        className="w-full min-h-screen bg-gray-10 flex justify-center pt-10 pb-10 px-4"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Glow wrapper — exact box size */}
        {/* <div
          style={{
            width: "480px",
            // maxWidth: "100%",
            height:"620px",
            borderRadius: "26px",
            // boxShadow: "0 0 45px 12px rgba(108, 92, 231, 0.45)",
            boxShadow: `
  0 0 6px rgba(108, 92, 231, 0.75),
  0 0 14px rgba(108, 92, 231, 0.85),
  0 0 25px rgba(108, 92, 231, 0.98),
  0 0 40px rgba(108, 92, 231, 0.18
  )
`,
          }}
        > */}
        <div
          className="w-full max-w-[480px]"
          style={{
            borderRadius: "26px",
            boxShadow: `
0 0 6px rgba(108, 92, 231, 0.75),
0 0 14px rgba(108, 92, 231, 0.85),
0 0 25px rgba(108, 92, 231, 0.98),
0 0 40px rgba(108, 92, 231, 0.18)
`,
          }}
        >
          {/* White Card */}
          <div
            className="w-full bg-white flex flex-col items-center px-6 sm:px-10 pt-8 sm:pt-10 pb-6 sm:pb-8"
            style={{ borderRadius: "26px" }}
          >
            {/* Lock Icon */}
            <div className="mb-5">
              <svg
                width="72"
                height="88"
                viewBox="0 0 100 120"
                fill="none"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Shackle */}
                <path d="M27 48 V33 A23 23 0 0 1 73 33 V48" />
                {/* Body */}
                <rect x="16" y="48" width="68" height="52" rx="12" />
                {/* Inner keyhole */}
                <ellipse cx="50" cy="73" rx="6.5" ry="10" strokeWidth="4" />
              </svg>
            </div>

            {/* Titles */}
            {/* <h2 className="text-gray-800 font-semibold tracking-wide text-xs uppercase mb-1">
              SOFTWARE SUITE
            </h2> */}
            <h2
              className="text-gray-800 font-normal uppercase mb-1"
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "25px",
                letterSpacing: "0.5px",
              }}
            >
              SOFTWARE SUITE
            </h2>
            {/* <h1 className="text-[#6C5CE7] font-medium text-2xl text-center leading-snug mb-8">
              Board / College<br />Login
            </h1> */}
            <h1
              className="text-[#6C5CE7] font-normal text-2xl text-center leading-snug mb-8"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Board / College<br />Login
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-7 flex flex-col items-center">
              {error && (
                <div className="w-full max-w-[280px] bg-red-50 border border-red-200 text-red-600 text-xs p-2.5 rounded text-center">
                  {error}
                </div>
              )}

              {/* Username Input */}
              <div className="w-full max-w-[280px]">
                <input
                  type="text"
                  className="w-full pb-1.5 text text-sm border-b border-gray-300 focus:border-[#6C5CE7] focus:outline-none placeholder-gray-400"
                  placeholder="Username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="w-full max-w-[280px]">
                <input
                  type="password"
                  className="w-full pb-1.5 text text-sm border-b border-gray-300 focus:border-[#6C5CE7] focus:outline-none placeholder-gray-400"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Captcha Display */}
              <div className="flex items-center justify-center gap-6">
                {/* <span className="font-serif italic text-3xl tracking-widest font-bold text-gray-800 select-none line-through decoration-wavy">
                  {captchaCode}
                </span> */}
                {/* <span 
  className="font- text-3xl tracking-widest font-semibold text-black select-none line-through decoration-solid"
  style={{ textDecorationThickness: "1px", textDecorationColor: "#555" }}
>
  {captchaCode}
</span> */}
                <span
                  className="text-3xl tracking-widest text-black select-none line-through decoration-solid"
                  style={{
                    fontFamily: "'Rye', serif",
                    fontWeight: 400,
                    textDecorationThickness: "1px",
                    textDecorationColor: "#555",
                  }}
                >
                  {captchaCode}
                </span>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-gray-600 hover:text-black transition-colors"
                  title="Refresh Captcha"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Captcha Input */}
              <div className="w-full max-w-[180px]">
                <input
                  type="text"
                  className="w-full px-3 py-2 text-center text-sm border border-gray-300 rounded focus:border-[#6C5CE7] focus:outline-none placeholder-gray-400"
                  placeholder="Enter Captcha"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="w-full max-w-[220px] pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-[#1B51E5] hover:bg-blue-700 text-white font-semibold text-sm tracking-wider rounded-full transition-all disabled:opacity-50"
                >
                  {loading ? "LOGGING IN..." : "LOGIN"}
                </button>
              </div>

              {/* Bottom Links */}
              <div className="text-center text-sm space-y-2">
                <div>
                  <a href="#forgot" className="text-[#6C5CE7] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-500">
                  <Link to="/register/student" className="hover:text-[#6C5CE7] hover:underline">
                    New Student?
                  </Link>
                  <span>|</span>
                  <Link to="/register/hod" className="hover:text-[#6C5CE7] hover:underline">
                    HOD Registration
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}