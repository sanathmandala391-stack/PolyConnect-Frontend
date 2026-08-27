// import { useEffect, useState, useRef } from "react";

// // CAPTCHA code generator
// function generateCaptchaCode(length = 6) {
//   const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
//   let code = "";
//   for (let i = 0; i < length; i++) {
//     code += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return code;
// }

// // Custom Canvas to render 3D-embossed serif hollow glyphs matching the screenshot exactly
// function CaptchaCanvas({ code }) {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     const width = canvas.width;
//     const height = canvas.height;

//     ctx.clearRect(0, 0, width, height);

//     // Render characters with embossed serif outline style matching the image
//     const chars = code.split("");
//     const charSpacing = width / (chars.length + 0.4);

//     chars.forEach((char, index) => {
//       ctx.save();
//       const x = 8 + index * charSpacing;
//       const y = height / 2 + 5;

//       ctx.translate(x, y);
//       ctx.font = 'bold 22px "Times New Roman", Times, "Cinzel", serif';
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";

//       // 3D Shadow extrusion
//       ctx.fillStyle = "#888888";
//       ctx.fillText(char, 1, 1);

//       // White fill
//       ctx.fillStyle = "#ffffff";
//       ctx.fillText(char, 0, 0);

//       // Dark distinct outline
//       ctx.strokeStyle = "#2b2b2b";
//       ctx.lineWidth = 1.3;
//       ctx.strokeText(char, 0, 0);

//       ctx.restore();
//     });
//   }, [code]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={115}
//       height={30}
//       className="h-[30px] w-[115px] block object-contain select-none"
//     />
//   );
// }

// export default function HallTicketPage() {
//   const [pin, setPin] = useState("");
//   const [examType, setExamType] = useState("");
//   const [examMonths, setExamMonths] = useState([]);
//   const [selectedEmyr, setSelectedEmyr] = useState("");
//   const [captchaCode, setCaptchaCode] = useState("nmcbMV");
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [hallticket, setHallticket] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Direct fetch for exam months without external config / api client
//   useEffect(() => {
//     fetch("/hallticket/exam-months?studentTypeId=1", {
//       headers: { Accept: "application/json" },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         const months = data?.Table1 || [];
//         setExamMonths(months);
//         if (months.length > 0) setSelectedEmyr(months[0].Id);
//       })
//       .catch(() => {
//         // Handled silently
//       });
//   }, []);

//   function refreshCaptcha() {
//     setCaptchaCode(generateCaptchaCode());
//     setCaptchaInput("");
//   }

//   // Direct fetch for hall ticket data on submit
//   function handleViewHallticket(e) {
//     if (e) e.preventDefault();
//     setError("");

//     if (!pin.trim()) {
//       setError("Please enter your PIN Number.");
//       return;
//     }

//     if (!examType) {
//       setError("Please select Exam Type.");
//       return;
//     }

//     if (!selectedEmyr) {
//       setError("Please select Exam Month Year.");
//       return;
//     }

//     if (!captchaInput.trim()) {
//       setError("Please enter Captcha.");
//       return;
//     }

//     if (captchaInput.trim() !== captchaCode) {
//       setError("Incorrect captcha. Please try again.");
//       refreshCaptcha();
//       return;
//     }

//     setLoading(true);
//     fetch(
//       `/hallticket/view?pin=${encodeURIComponent(
//         pin.trim()
//       )}&emyr=${encodeURIComponent(selectedEmyr)}&studentTypeId=1`,
//       {
//         headers: { Accept: "application/json" },
//       }
//     )
//       .then((res) => {
//         if (!res.ok) throw new Error("Could not fetch hall ticket");
//         return res.json();
//       })
//       .then((data) => {
//         const table1 = data?.Table1?.[0];
//         const table2 = data?.Table2 || [];
//         if (!table1) {
//           setError("No hall ticket found for this PIN/Exam.");
//           return;
//         }
//         setHallticket({ student: table1, subjects: table2 });
//       })
//       .catch(() => {
//         setError("Could not fetch hall ticket. Check PIN or connection.");
//       })
//       .finally(() => {
//         setLoading(false);
//         refreshCaptcha();
//       });
//   }

//   return (
//     <div className="min-h-screen bg-white text-[#333333] flex flex-col font-sans">
//       {/* Top Blue Stripe */}
//       <div className="w-full h-[5px] bg-[#1ea1f2] shrink-0" />

//       {/* Gray Sub-header Bar */}
//       <div className="w-full bg-[#d8dadc] border-b border-[#c8cacd] py-1.5 px-4 sm:px-12 md:px-24">
//         <h1 className="text-[14px] sm:text-[14.5px] font-semibold text-[#212529]">
//           Download Hall Ticket
//         </h1>
//       </div>

//       {/* Main Container */}
//       <main className="flex-1 px-4 sm:px-8 md:px-14 py-8 md:py-12 max-w-[1240px] w-full mx-auto">
//         {/* Form Card Container matching the exact screenshot */}
//         <div className="bg-white border border-[#e2e4e7] rounded-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 sm:p-7 md:p-8 max-w-[1100px] mx-auto">
//           <form onSubmit={handleViewHallticket} noValidate>
//             <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-3.5 xl:gap-4.5">
              
//               {/* PIN Field */}
//               <div className="flex-1 min-w-[140px]">
//                 <label
//                   htmlFor="pin-input"
//                   className="block text-[13px] text-[#333333] font-normal mb-1 whitespace-nowrap"
//                 >
//                   PIN :
//                 </label>
//                 <input
//                   type="text"
//                   id="pin-input"
//                   value={pin}
//                   onChange={(e) => setPin(e.target.value)}
//                   placeholder="Enter Pin Number"
//                   className="w-full h-[35px] px-2.5 text-[13px] border border-[#3b82f6] rounded-[3px] bg-white outline-none focus:ring-1 focus:ring-[#3b82f6] placeholder:text-gray-400 placeholder:text-[12.5px]"
//                 />
//               </div>

//               {/* Exam Type Field */}
//               <div className="flex-1 min-w-[145px]">
//                 <label
//                   htmlFor="exam-type-select"
//                   className="block text-[13px] text-[#333333] font-normal mb-1 whitespace-nowrap"
//                 >
//                   Exam Type:
//                 </label>
//                 <select
//                   id="exam-type-select"
//                   value={examType}
//                   onChange={(e) => setExamType(e.target.value)}
//                   className="w-full h-[35px] px-2 text-[13px] border border-[#cccccc] focus:border-[#4d90fe] focus:ring-1 focus:ring-[#4d90fe] rounded-[3px] bg-white outline-none cursor-pointer text-gray-700"
//                 >
//                   <option value="">Select Exam Type</option>
//                   <option value="Regular">Regular</option>
//                   <option value="Supplementary">Supplementary</option>
//                 </select>
//               </div>

//               {/* Exam Month Year Field */}
//               <div className="flex-1 min-w-[165px]">
//                 <label
//                   htmlFor="exam-month-year-select"
//                   className="block text-[13px] text-[#333333] font-normal mb-1 whitespace-nowrap"
//                 >
//                   Exam Month Year:
//                 </label>
//                 <select
//                   id="exam-month-year-select"
//                   value={selectedEmyr}
//                   onChange={(e) => setSelectedEmyr(e.target.value)}
//                   className="w-full h-[35px] px-2 text-[13px] border border-[#cccccc] focus:border-[#4d90fe] focus:ring-1 focus:ring-[#4d90fe] rounded-[3px] bg-white outline-none cursor-pointer text-gray-700"
//                 >
//                   <option value="">Select Exam Month Year</option>
//                   {examMonths.map((m) => (
//                     <option key={m.Id} value={m.Id}>
//                       {m.ExamYearMonth}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Captcha Display positioned below the center inputs matching image */}
//                 <div className="mt-3 flex items-center justify-center gap-1.5">
//                   <div
//                     className="cursor-pointer"
//                     onClick={refreshCaptcha}
//                     title="Click to refresh captcha"
//                   >
//                     <CaptchaCanvas code={captchaCode} />
//                   </div>
//                   <button
//                     type="button"
//                     onClick={refreshCaptcha}
//                     title="Refresh Captcha"
//                     aria-label="Refresh Captcha"
//                     className="text-[#333333] hover:text-[#000000] p-1 text-[17px] leading-none transition-colors"
//                   >
//                     &#x21bb;
//                   </button>
//                 </div>
//               </div>

//               {/* Enter Captcha Field */}
//               <div className="flex-1 min-w-[155px]">
//                 <label
//                   htmlFor="captcha-input"
//                   className="block text-[13px] text-[#333333] font-normal mb-1 whitespace-nowrap"
//                 >
//                   Enter Captcha :
//                 </label>
//                 <input
//                   type="text"
//                   id="captcha-input"
//                   value={captchaInput}
//                   onChange={(e) => setCaptchaInput(e.target.value)}
//                   placeholder="Enter Captcha"
//                   className="w-full h-[35px] px-2.5 text-[13px] border border-[#cccccc] focus:border-[#4d90fe] focus:ring-1 focus:ring-[#4d90fe] rounded-[3px] bg-white outline-none placeholder:text-gray-400 placeholder:text-[12.5px]"
//                 />
//               </div>

//               {/* View Hall Ticket Button */}
//               <div className="lg:pt-[24px] shrink-0">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   id="view-hall-ticket-btn"
//                   className="w-full lg:w-auto h-[35px] px-5 bg-[#70a82b] hover:bg-[#629724] active:bg-[#57851e] text-white text-[13.5px] font-medium rounded-[3px] shadow-xs transition-colors flex items-center justify-center whitespace-nowrap disabled:opacity-75 cursor-pointer"
//                 >
//                   {loading ? "Loading..." : "View Hall Ticket"}
//                 </button>
//               </div>
//             </div>

//             {error && (
//               <p className="text-red-600 text-xs sm:text-sm mt-3 font-medium">
//                 {error}
//               </p>
//             )}
//           </form>
//         </div>

//         {/* Real Dynamic Hall Ticket Results View */}
//         {hallticket && (
//           <div
//             id="printable-hall-ticket"
//             className="mt-8 bg-white border border-gray-300 rounded-[3px] p-6 shadow-sm max-w-[1100px] mx-auto"
//           >
//             <div className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-200">
//               {hallticket.student.Photo && (
//                 <img
//                   src={hallticket.student.Photo}
//                   alt="Student"
//                   className="w-32 h-40 object-cover border border-gray-300 rounded-sm shrink-0"
//                 />
//               )}
//               <div className="text-sm space-y-1.5 text-gray-800">
//                 <p>
//                   <strong className="text-gray-900">PIN:</strong> {hallticket.student.Pin}
//                 </p>
//                 <p>
//                   <strong className="text-gray-900">Name:</strong> {hallticket.student.Name}
//                 </p>
//                 <p>
//                   <strong className="text-gray-900">Father's Name:</strong> {hallticket.student.FatherName}
//                 </p>
//                 <p>
//                   <strong className="text-gray-900">Scheme:</strong> {hallticket.student.Scheme}
//                 </p>
//                 <p>
//                   <strong className="text-gray-900">Branch:</strong> {hallticket.student.Branch}
//                 </p>
//                 <p>
//                   <strong className="text-gray-900">Exam Center:</strong> {hallticket.student.ExaminationCenter}
//                 </p>
//                 {hallticket.student.Attendance !== undefined && (
//                   <p>
//                     <strong className="text-gray-900">Attendance:</strong> {hallticket.student.Attendance}%
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Subjects Table */}
//             <div className="overflow-x-auto mt-6">
//               <table className="w-full text-left text-xs sm:text-sm border border-gray-300">
//                 <thead className="bg-gray-100 text-gray-800 font-semibold border-b border-gray-300">
//                   <tr>
//                     <th className="border-r border-gray-300 px-3 py-2">Subject Code</th>
//                     <th className="border-r border-gray-300 px-3 py-2">Subject Name</th>
//                     <th className="border-r border-gray-300 px-3 py-2">Exam Date</th>
//                     <th className="px-3 py-2">Exam Time</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {hallticket.subjects.map((s, idx) => (
//                     <tr key={s.SubjectCode || idx} className="hover:bg-gray-50">
//                       <td className="border-r border-gray-200 px-3 py-2 font-mono font-medium">
//                         {s.SubjectCode}
//                       </td>
//                       <td className="border-r border-gray-200 px-3 py-2">{s.SubjectName}</td>
//                       <td className="border-r border-gray-200 px-3 py-2">{s.ExamDate || "-"}</td>
//                       <td className="px-3 py-2">{s.ExamTime || "-"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex justify-end mt-5 no-print">
//               <button
//                 type="button"
//                 onClick={() => window.print()}
//                 className="bg-[#2196f3] hover:bg-[#1e88e5] text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-[3px] shadow-xs cursor-pointer"
//               >
//                 Print
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }














// import { useEffect, useState, useRef } from "react";
// import api from "../api/client";

// // CAPTCHA code generator
// function generateCaptchaCode(length = 6) {
//   const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
//   let code = "";
//   for (let i = 0; i < length; i++) {
//     code += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return code;
// }

// // Custom Canvas to render 3D-embossed serif hollow glyphs matching the screenshot exactly
// function CaptchaCanvas({ code }) {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     const width = canvas.width;
//     const height = canvas.height;

//     ctx.clearRect(0, 0, width, height);

//     // Render characters with embossed serif outline style matching the image
//     const chars = code.split("");
//     const charSpacing = width / (chars.length + 0.4);

//     chars.forEach((char, index) => {
//       ctx.save();
//       const x = 8 + index * charSpacing;
//       const y = height / 2 + 5;

//       ctx.translate(x, y);
//       ctx.font = 'bold 22px "Times New Roman", Times, "Cinzel", serif';
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";

//       // 3D Shadow extrusion
//       ctx.fillStyle = "#888888";
//       ctx.fillText(char, 1, 1);

//       // White fill
//       ctx.fillStyle = "#ffffff";
//       ctx.fillText(char, 0, 0);

//       // Dark distinct outline
//       ctx.strokeStyle = "#2b2b2b";
//       ctx.lineWidth = 1.3;
//       ctx.strokeText(char, 0, 0);

//       ctx.restore();
//     });
//   }, [code]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={115}
//       height={30}
//       className="h-[30px] w-[115px] block object-contain select-none"
//     />
//   );
// }

// export default function HallTicketPage() {
//   const [pin, setPin] = useState("");
//   const [examType, setExamType] = useState("");
//   const [examMonths, setExamMonths] = useState([]);
//   const [selectedEmyr, setSelectedEmyr] = useState("");
//   const [captchaCode, setCaptchaCode] = useState("nmcbMV");
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [hallticket, setHallticket] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

// useEffect(() => {
//   api
//     .get("/hallticket/exam-months?studentTypeId=1")
//     .then((res) => {
//       const months = res.data?.Table1 || [];
//       setExamMonths(months);
//       if (months.length > 0) setSelectedEmyr(months[0].Id);
//     })
//     .catch(() => {
//       // Handled silently
//     });
// }, []);

//   function refreshCaptcha() {
//     setCaptchaCode(generateCaptchaCode());
//     setCaptchaInput("");
//   }

//   // Direct fetch for hall ticket data on submit
//   function handleViewHallticket(e) {
//     if (e) e.preventDefault();
//     setError("");

//     if (!pin.trim()) {
//       setError("Please enter your PIN Number.");
//       return;
//     }

//     if (!examType) {
//       setError("Please select Exam Type.");
//       return;
//     }

//     if (!selectedEmyr) {
//       setError("Please select Exam Month Year.");
//       return;
//     }

//     if (!captchaInput.trim()) {
//       setError("Please enter Captcha.");
//       return;
//     }

//     if (captchaInput.trim() !== captchaCode) {
//       setError("Incorrect captcha. Please try again.");
//       refreshCaptcha();
//       return;
//     }

//     // setLoading(true);
//     // fetch(
//     //   `/hallticket/view?pin=${encodeURIComponent(
//     //     pin.trim()
//     //   )}&emyr=${encodeURIComponent(selectedEmyr)}&studentTypeId=1`,
//     //   {
//     //     headers: { Accept: "application/json" },
//     //   }
//     // )
//     //   .then((res) => {
//     //     if (!res.ok) throw new Error("Could not fetch hall ticket");
//     //     return res.json();
//     //   })
//     //   .then((data) => {
//     //     const table1 = data?.Table1?.[0];
//     //     const table2 = data?.Table2 || [];
//     //     if (!table1) {
//     //       setError("No hall ticket found for this PIN/Exam.");
//     //       return;
//     //     }
//     //     setHallticket({ student: table1, subjects: table2 });
//     //   })
//     //   .catch(() => {
//     //     setError("Could not fetch hall ticket. Check PIN or connection.");
//     //   })
//     //   .finally(() => {
//     //     setLoading(false);
//     //     refreshCaptcha();
//     //   });
//     setLoading(true);
// api
//   .get(
//     `/hallticket/view?pin=${encodeURIComponent(pin.trim())}&emyr=${encodeURIComponent(selectedEmyr)}&studentTypeId=1`
//   )
//   .then((res) => {
//     const table1 = res.data?.Table1?.[0];
//     const table2 = res.data?.Table2 || [];
//     if (!table1) {
//       setError("No hall ticket found for this PIN/Exam.");
//       return;
//     }
//     setHallticket({ student: table1, subjects: table2 });
//   })
//   .catch(() => {
//     setError("Could not fetch hall ticket. Check PIN or connection.");
//   })
//   .finally(() => {
//     setLoading(false);
//     refreshCaptcha();
//   });
//   }

// return (
//   <div className="min-h-screen bg-[#f8f9fa] text-[#333333] flex flex-col font-sans" style={{marginTop: "-20px"}}>
    
//  {/* Gray Sub-header Bar */}
// {/* <div
//   className="w-[calc(100%+400px)] -ml-[200px] bg-[#d8dadc] border-b border-[#c8cacd] px-4 sm:px-12 md:px-24 flex items-center"
//   style={{
//     height: "30px",
//     boxSizing: "border-box",
//   }}
// >
// <h1 
//   className="m-0 text-[14px] sm:text-[12.5px] text-[#212529] leading-none" 
//   style={{
//     marginLeft: "109px", 
//     fontFamily: "'Mulish', sans-serif",
//     fontWeight: 700
//   }}
// >
//   Download Hall Ticket
// </h1>
// </div> */}
// <div
//   className="w-[calc(100%+400px)] -ml-[200px] bg-[#d8dadc] px-4 sm:px-12 md:px-24 flex items-center"
//   style={{
//     height: "30px",
//     boxSizing: "border-box",
//   }}
// >
//   <h1 
//     className="m-0 text-[14px] sm:text-[12.5px] text-[#212529] leading-none" 
//     style={{
//       marginLeft: "109px", 
//       fontFamily: "'Mulish', sans-serif",
//       fontWeight: 700
//     }}
//   >
//     Download Hall Ticket
//   </h1>
// </div>
//     {/* Main Content Area */}
//     <main className="flex-1 px-4 sm:px-8 md:px-12 py-10 w-full mx-auto" style={{marginLeft: "-25px",width: "calc(100% + 50px)"}}>
      
//       {/* Form Card Container matching target screenshot */}
//       {/* Form Card Container matching 1st Image exactly */}
// {/* Form Card Container matching 1st Image Layout */}
// <div 
//   className="bg-white border border-[#e2e4e7] rounded-[4px] p-6 sm:p-8 max-w-[1240px] mx-auto"
//   style={{
//     fontFamily: "'Mulish', sans-serif",
//     boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)"
//   }}
// >
//   <form onSubmit={handleViewHallticket} noValidate>
//     {/* Explicit Flex Grid for Exact Alignment */}
//     <div className="flex flex-col lg:flex-row lg:items-end gap-3.5 xl:gap-4">
      
//       {/* 1. PIN Field */}
//       <div className="w-full lg:w-[170px] shrink-0">
//         <label
//           htmlFor="pin-input"
//           className="block text-[13px] text-[#2b2b2b] font-bold mb-2.5 whitespace-nowrap"
//         >
//           PIN :
//         </label>
//         <input
//           type="text"
//           id="pin-input"
//           value={pin}
//           onChange={(e) => setPin(e.target.value)}
//           placeholder="Enter Pin Number"
//           className="w-full h-[36px] px-3 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white text-[#333] outline-none placeholder:text-[#9ca3af] placeholder:text-[13px]"
//         />
//       </div>

//       {/* 2. Exam Type Field */}
//       <div className="w-full lg:w-[185px] shrink-0">
//         <label
//           htmlFor="exam-type-select"
//           className="block text-[13px] text-[#4b5563] font-medium mb-2.5 whitespace-nowrap"
//         >
//           Exam Type:
//         </label>
//         <select
//           id="exam-type-select"
//           value={examType}
//           onChange={(e) => setExamType(e.target.value)}
//           className="w-full h-[36px] px-2.5 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white outline-none cursor-pointer text-[#4b5563]"
//         >
//           <option value="">Select Exam Type</option>
//           <option value="Regular">Regular</option>
//           <option value="Supplementary">Supplementary</option>
//         </select>
//       </div>

//       {/* 3. Exam Month Year Field + Captcha Image Stack */}
//      {/* 3. Exam Month Year Field */}
// <div className="w-full lg:w-[210px] shrink-0">
//   <label htmlFor="exam-month-year-select" className="block text-[13px] text-[#4b5563] font-medium mb-2.5 whitespace-nowrap">
//     Exam Month Year:
//   </label>
//   <select
//     id="exam-month-year-select"
//     value={selectedEmyr}
//     onChange={(e) => setSelectedEmyr(e.target.value)}
//     className="w-full h-[36px] px-2 text-[12.5px] border border-[#d1d5db] rounded-[4px] bg-white outline-none cursor-pointer text-[#4b5563]"
//   >
//     <option value="">Select Exam Month Year</option>
//     {examMonths.map((m) => (
//       <option key={m.Id} value={m.Id}>
//         {m.ExamYearMonth}
//       </option>
//     ))}
//   </select>
// </div>

//       {/* 4. Enter Captcha Field */}
//       <div className="w-full lg:w-[220px] shrink-0">
//         <label
//           htmlFor="captcha-input"
//           className="block text-[13px] text-[#4b5563] font-medium mb-2.5 whitespace-nowrap"
//         >
//           Enter Captcha :
//         </label>
//         <input
//           type="text"
//           id="captcha-input"
//           value={captchaInput}
//           onChange={(e) => setCaptchaInput(e.target.value)}
//           placeholder="Enter Captcha"
//           className="w-full h-[36px] px-3 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white text-[#333] outline-none placeholder:text-[#9ca3af] placeholder:text-[13px]"
//         />
//       </div>

//       {/* 5. View Hall Ticket Button */}
//       <div className="shrink-0 lg:ml-auto" style={{marginLeft: "20px"}}>
//         <button
//           type="submit"
//           disabled={loading}
//           id="view-hall-ticket-btn"
//           className="w-full h-[36px] px-5 bg-[#73b32d] hover:bg-[#65a024] active:bg-[#578c1f] text-white text-[13px] font-medium rounded-[0px] transition-colors flex items-center justify-center whitespace-nowrap disabled:opacity-75 cursor-pointer "style={{ fontFamily: "'Mulish', sans-serif",marginLeft: "10px" }} 
//         >
//           {loading ? "Loading..." : "View Hall Ticket"}
//         </button>
//       </div>

//     </div>


//     {/* Captcha row — separate line below all fields */}
//     <div className="mt-4 flex items-center gap-2" style={{marginLeft: "390px"}}>
//       <div className="cursor-pointer" onClick={refreshCaptcha} title="Click to refresh captcha">
//         <CaptchaCanvas code={captchaCode} />
//       </div>
//       <button
//         type="button"
//         onClick={refreshCaptcha}
//         title="Refresh Captcha"
//         aria-label="Refresh Captcha"
//         className="text-[#4a4a4a] p-1 text-[14px] leading-none transition-colors" style={{ marginTop: "8px", marginLeft: "8px"}}
//       >
//         {/* &#x21bb; */}
//         <i className="fa-solid fa-rotate"></i>
//       </button>
//     </div>

    

//     {error && (
//       <p className="text-red-600 text-xs sm:text-sm mt-3 font-medium">
//         {error}
//       </p>
//     )}
//   </form>
// </div>

//       {/* Hall Ticket Output Section */}
//       {/* {hallticket && (
//         <div
//           id="printable-hall-ticket"
//           className="mt-8 bg-white border border-gray-300 rounded-[3px] p-6 shadow-sm max-w-[1200px] mx-auto"
//         >
//           <div className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-200">
//             {hallticket.student.Photo && (
//               <img
//                 src={hallticket.student.Photo}
//                 alt="Student"
//                 className="w-32 h-40 object-cover border border-gray-300 rounded-sm shrink-0"
//               />
//             )}
//             <div className="text-sm space-y-1.5 text-gray-800">
//               <p>
//                 <strong className="text-gray-900">PIN:</strong> {hallticket.student.Pin}
//               </p>
//               <p>
//                 <strong className="text-gray-900">Name:</strong> {hallticket.student.Name}
//               </p>
//               <p>
//                 <strong className="text-gray-900">Father's Name:</strong> {hallticket.student.FatherName}
//               </p>
//               <p>
//                 <strong className="text-gray-900">Scheme:</strong> {hallticket.student.Scheme}
//               </p>
//               <p>
//                 <strong className="text-gray-900">Branch:</strong> {hallticket.student.Branch}
//               </p>
//               <p>
//                 <strong className="text-gray-900">Exam Center:</strong> {hallticket.student.ExaminationCenter}
//               </p>
//               {hallticket.student.Attendance !== undefined && (
//                 <p>
//                   <strong className="text-gray-900">Attendance:</strong> {hallticket.student.Attendance}%
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="overflow-x-auto mt-6">
//             <table className="w-full text-left text-xs sm:text-sm border border-gray-300">
//               <thead className="bg-gray-100 text-gray-800 font-semibold border-b border-gray-300">
//                 <tr>
//                   <th className="border-r border-gray-300 px-3 py-2">Subject Code</th>
//                   <th className="border-r border-gray-300 px-3 py-2">Subject Name</th>
//                   <th className="border-r border-gray-300 px-3 py-2">Exam Date</th>
//                   <th className="px-3 py-2">Exam Time</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {hallticket.subjects.map((s, idx) => (
//                   <tr key={s.SubjectCode || idx} className="hover:bg-gray-50">
//                     <td className="border-r border-gray-200 px-3 py-2 font-mono font-medium">
//                       {s.SubjectCode}
//                     </td>
//                     <td className="border-r border-gray-200 px-3 py-2">{s.SubjectName}</td>
//                     <td className="border-r border-gray-200 px-3 py-2">{s.ExamDate || "-"}</td>
//                     <td className="px-3 py-2">{s.ExamTime || "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex justify-end mt-5 no-print">
//             <button
//               type="button"
//               onClick={() => window.print()}
//               className="bg-[#2196f3] hover:bg-[#1e88e5] text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-[3px] shadow-xs cursor-pointer"
//             >
//               Print
//             </button>
//           </div>
//         </div>
//       )} */}
//       {hallticket && (
//   <div
//     id="printable-hall-ticket"
//     className="mt-8 bg-white border border-gray-300 rounded-[3px] p-6 sm:p-8 shadow-sm max-w-[1100px] mx-auto"
//   >
//     {/* Header: logo + title */}
//     <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
//       <img
//         src="https://www.sbtet.telangana.gov.in/assets/img/custom/sb-1.jpg"
//         alt="SBTET Logo"
//         className="w-[80px] h-[80px] object-contain shrink-0"
//       />
//       <div className="flex-1 text-center">
//         <h2 className="text-[18px] sm:text-[20px] font-bold text-black leading-snug">
//           STATE BOARD OF TECHNICAL EDUCATION AND TRAINING - TELANGANA
//         </h2>
//         <h3 className="text-[15px] sm:text-[17px] font-bold text-black mt-1">
//           HALL TICKET - DIPLOMA EXAMINATIONS - {hallticket.student.ExamMonthYear || ""}
//         </h3>
//       </div>
//     </div>

//     {/* Student details table + photo */}
//     <div className="flex flex-col sm:flex-row gap-4 mt-5">
//       <table className="flex-1 text-[13px] border border-gray-300 border-collapse">
//         <tbody>
//           <tr className="border-b border-gray-300">
//             <td className="bg-gray-100 font-semibold px-3 py-2 border-r border-gray-300 w-[140px]">PIN</td>
//             <td className="px-3 py-2 border-r border-gray-300 text-blue-700">{hallticket.student.Pin}</td>
//             <td className="bg-gray-100 font-semibold px-3 py-2 border-r border-gray-300 w-[100px]">Scheme</td>
//             <td className="px-3 py-2 text-blue-700">{hallticket.student.Scheme}</td>
//           </tr>
//           <tr className="border-b border-gray-300 bg-gray-50">
//             <td className="bg-gray-100 font-semibold px-3 py-2 border-r border-gray-300">Name</td>
//             <td colSpan={3} className="px-3 py-2 text-blue-700">{hallticket.student.Name}</td>
//           </tr>
//           <tr className="border-b border-gray-300">
//             <td className="bg-gray-100 font-semibold px-3 py-2 border-r border-gray-300">Father Name</td>
//             <td colSpan={3} className="px-3 py-2 text-blue-700">{hallticket.student.FatherName}</td>
//           </tr>
//           <tr className="border-b border-gray-300 bg-gray-50">
//             <td className="bg-gray-100 font-semibold px-3 py-2 border-r border-gray-300">Branch</td>
//             <td colSpan={3} className="px-3 py-2 text-blue-700">{hallticket.student.Branch}</td>
//           </tr>
//           <tr className="border-b border-gray-300">
//             <td className="bg-gray-100 font-semibold px-3 py-2 border-r border-gray-300">Examination Center</td>
//             <td colSpan={3} className="px-3 py-2 text-blue-700">{hallticket.student.ExaminationCenter}</td>
//           </tr>
//           <tr className="border-b border-gray-300 bg-gray-50">
//             <td className="bg-gray-100 font-semibold px-3 py-2 border-r border-gray-300">Total Fee Paid</td>
//             <td className="px-3 py-2 border-r border-gray-300 text-blue-700">{hallticket.student.TotalFeePaid}</td>
//             <td className="bg-gray-100 font-semibold px-3 py-2 border-r border-gray-300">Actual Attendance %</td>
//             <td className="px-3 py-2 text-blue-700">{hallticket.student.Attendance}</td>
//           </tr>
//           <tr>
//             <td className="bg-gray-100 font-semibold px-3 py-2 border-r border-gray-300">Downloaded Date</td>
//             <td colSpan={3} className="px-3 py-2 text-blue-700">
//               {new Date().toLocaleString("en-GB")}
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {hallticket.student.Photo && (
//         <img
//           src={hallticket.student.Photo}
//           alt="Student"
//           className="w-[140px] h-[170px] object-cover border border-gray-300 shrink-0 self-start"
//         />
//       )}
//     </div>

//     {/* Subjects table */}
//     <div className="overflow-x-auto mt-6">
//       <table className="w-full text-center text-[13px] border border-gray-300 border-collapse">
//         <thead className="bg-gray-100 text-gray-800 font-semibold">
//           <tr>
//             <th className="border border-gray-300 px-2 py-2">S No</th>
//             <th className="border border-gray-300 px-2 py-2">Year/Sem</th>
//             <th className="border border-gray-300 px-2 py-2">Subject Code</th>
//             <th className="border border-gray-300 px-3 py-2 text-left">Name of the Subject</th>
//             <th className="border border-gray-300 px-2 py-2">Exam Date</th>
//             <th className="border border-gray-300 px-2 py-2">Exam Time</th>
//             <th className="border border-gray-300 px-2 py-2">Invigilator Sign</th>
//           </tr>
//         </thead>
//         <tbody>
//           {hallticket.subjects.map((s, idx) => (
//             <tr key={s.SubjectCode || idx} className={idx % 2 === 1 ? "bg-gray-50" : ""}>
//               <td className="border border-gray-300 px-2 py-1.5">{idx + 1}</td>
//               <td className="border border-gray-300 px-2 py-1.5">{s.YearSem || "4SEM"}</td>
//               <td className="border border-gray-300 px-2 py-1.5 text-blue-700 font-medium">{s.SubjectCode}</td>
//               <td className="border border-gray-300 px-3 py-1.5 text-left text-blue-700">{s.SubjectName}</td>
//               <td className="border border-gray-300 px-2 py-1.5 text-blue-700">{s.ExamDate || ""}</td>
//               <td className="border border-gray-300 px-2 py-1.5 text-blue-700">{s.ExamTime || ""}</td>
//               <td className="border border-gray-300 px-2 py-1.5"></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {/* Certification line */}
//     <div className="mt-5 text-[13px] text-gray-900">
//       Certified that Sri/Kum/Smt <strong>{hallticket.student.Name}</strong> S/o D/o{" "}
//       <strong>{hallticket.student.FatherName}</strong> is candidate for the above mentioned examination.
//       Marks of Identification: (As per SSC)
//       <div className="mt-1">1)</div>
//       <div>2)</div>
//     </div>

//     {/* Signatures */}
//     <div className="flex justify-between mt-6 text-[13px] font-semibold">
//       <span>Signature of the Candidate</span>
//       <span>Signature of the Head Of Section</span>
//     </div>

//     {/* Instructions box */}
//     <div className="mt-5 border border-gray-300 rounded-[3px] p-4 text-[12.5px] leading-relaxed">
//       <p className="font-bold mb-2">Instructions :</p>
//       <ol className="list-decimal list-inside space-y-1">
//         <li className="font-bold">Hall-ticket issued to you is an important document preserve carefully up to declaration of the final result. No candidate will be allowed to enter the examination hall without proper hall-ticket.</li>
//         <li className="font-bold">CANDIDATES ARE REQUESTED TO CROSSCHECK THE EXAMINATION DATES WITH TIME-TABLE DATES AND ATTEND EXAMINATION AS PER THE TIME TABLE.</li>
//         <li>Candidate shall arrive at the examination center at least 30 minutes before the commencement of the examination.</li>
//         <li className="font-bold">CANDIDATES WILL NOT BE ALLOWED IN EXAMINATION HALL AFTER COMMENCEMENT OF EXAMINATION UNDER ANY CIRCUMSTANCES.</li>
//         <li>No printed / written material, in any form, shall be taken inside the exam hall, other than hall ticket.</li>
//         <li>Every student shall cooperate while pockets are being checked.</li>
//         <li>Candidates will not be allowed to leave the examination hall till the examination is completed.</li>
//         <li>Candidates are advised to go through the instructions given on Answer Booklet or OMR Bar Code Sheet before starting answering.</li>
//         <li>Candidates should not write any matter inside the Answer Booklet which may lead to the identification of the Candidate or institution. If he/she do so, he/she will be booked under malpractice. No color sketch pens are to be used unless specified question.</li>
//         <li>Candidates should carry their own Scientific Calculators, Pens, Pencils and required drawing instruments.</li>
//         <li>Candidates will not be allowed with Cell Phones, Organizers, PDA's and palmtops or any other Electronic Gadgets, etc.</li>
//         <li>Every student shall follow the regulations during examinations, failing which he/she will be booked under malpractice case.</li>
//         <li>Candidates are advised to check all the pages in the '8/16/24-page Answer Booklet' supplied to him/her. All answers are to be written within the given booklet only.</li>
//         <li>No additional sheets will be supplied under any circumstances. Do Not write any matter on the Question Paper, to avoid malpractice.</li>
//       </ol>
//     </div>

//     {/* Print button */}
//     <div className="flex justify-end mt-6 no-print">
//       <button
//         type="button"
//         onClick={() => window.print()}
//         className="bg-[#26a0a3] hover:bg-[#1f8a8d] text-white text-sm font-medium px-5 py-2.5 rounded-[3px] shadow-sm flex items-center gap-2"
//       >
//         <i className="fa-solid fa-print"></i>
//         Print
//       </button>
//     </div>
//   </div>
// )}
//     </main>
//   </div>
// );
// }












import { useEffect, useState, useRef } from "react";
import api from "../api/client";

function generateCaptchaCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function CaptchaCanvas({ code }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const chars = code.split("");
    const charSpacing = width / (chars.length + 0.4);

    chars.forEach((char, index) => {
      ctx.save();
      const x = 8 + index * charSpacing;
      const y = height / 2 + 5;
      ctx.translate(x, y);
      ctx.font = 'bold 22px "Times New Roman", Times, "Cinzel", serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#888888";
      ctx.fillText(char, 1, 1);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(char, 0, 0);
      ctx.strokeStyle = "#2b2b2b";
      ctx.lineWidth = 1.3;
      ctx.strokeText(char, 0, 0);
      ctx.restore();
    });
  }, [code]);

  return (
    <canvas
      ref={canvasRef}
      width={115}
      height={30}
      className="h-[30px] w-[115px] block object-contain select-none"
    />
  );
}

export default function HallTicketPage() {
  const [pin, setPin] = useState("");
  const [examType, setExamType] = useState("");
  const [examMonths, setExamMonths] = useState([]);
  const [selectedEmyr, setSelectedEmyr] = useState("");
  const [captchaCode, setCaptchaCode] = useState("nmcbMV");
  const [captchaInput, setCaptchaInput] = useState("");
  const [hallticket, setHallticket] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch exam months from real backend endpoint
  useEffect(() => {
    api
      .get("/hallticket/exam-months?studentTypeId=1")
      .then((res) => {
        const months = res.data?.Table1 || [];
        setExamMonths(months);
        if (months.length > 0) setSelectedEmyr(months[0].Id);
      })
      .catch(() => {
        // Handled silently
      });
  }, []);

  function refreshCaptcha() {
    setCaptchaCode(generateCaptchaCode());
    setCaptchaInput("");
  }

  function handleViewHallticket(e) {
    if (e) e.preventDefault();
    setError("");

    if (!pin.trim()) {
      setError("Please enter your PIN Number.");
      return;
    }
    if (!examType) {
      setError("Please select Exam Type.");
      return;
    }
    if (!selectedEmyr) {
      setError("Please select Exam Month Year.");
      return;
    }
    if (!captchaInput.trim()) {
      setError("Please enter Captcha.");
      return;
    }
    if (captchaInput.trim() !== captchaCode) {
      setError("Incorrect captcha. Please try again.");
      refreshCaptcha();
      return;
    }

    setLoading(true);
    api
      .get(
        `/hallticket/view?pin=${encodeURIComponent(pin.trim())}&emyr=${encodeURIComponent(
          selectedEmyr
        )}&examType=${encodeURIComponent(examType)}&studentTypeId=1`
      )
      .then((res) => {
        const table1 = res.data?.Table1?.[0];
        const table2 = res.data?.Table2 || [];
        if (!table1) {
          setError("No hall ticket found for this PIN/Exam.");
          setHallticket(null);
          return;
        }
        setHallticket({ student: table1, subjects: table2 });
      })
      .catch(() => {
        setError("Could not fetch hall ticket. Check PIN or connection.");
        setHallticket(null);
      })
      .finally(() => {
        setLoading(false);
        refreshCaptcha();
      });
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#333333] flex flex-col font-sans">
      {/* Gray Sub-header Bar */}
      <div
        className="-mx-3 sm:-mx-4 md:-mx-6 bg-[#d8dadc] px-4 sm:px-8 py-2 flex items-center mb-4"
        style={{ boxSizing: "border-box", marginTop: "-16px" }}
      >
        <h1
          className="m-0 text-[13px] sm:text-[14px] text-[#212529] leading-none"
          style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 700 }}
        >
          Download Hall Ticket
        </h1>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto py-4 sm:py-6">
        {/* Form Card */}
        <div
          className="bg-white border border-[#e2e4e7] rounded-[4px] p-4 sm:p-6 md:p-8 max-w-[1240px] mx-auto"
          style={{
            fontFamily: "'Mulish', sans-serif",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
          }}
        >
          <form onSubmit={handleViewHallticket} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 xl:gap-4 items-end">
              {/* PIN */}
              <div className="w-full">
                <label htmlFor="pin-input" className="block text-[13px] text-[#2b2b2b] font-bold mb-2 whitespace-nowrap">
                  PIN :
                </label>
                <input
                  type="text"
                  id="pin-input"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter Pin Number"
                  className="w-full h-[36px] px-3 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white text-[#333] outline-none placeholder:text-[#9ca3af] placeholder:text-[13px]"
                />
              </div>

              {/* Exam Type */}
              <div className="w-full">
                <label htmlFor="exam-type-select" className="block text-[13px] text-[#4b5563] font-medium mb-2 whitespace-nowrap">
                  Exam Type:
                </label>
                <select
                  id="exam-type-select"
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full h-[36px] px-2.5 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white outline-none cursor-pointer text-[#4b5563]"
                >
                  <option value="">Select Exam Type</option>
                  <option value="Regular">Regular</option>
                  <option value="Supplementary">Supplementary</option>
                </select>
              </div>

              {/* Exam Month Year */}
              <div className="w-full">
                <label htmlFor="exam-month-year-select" className="block text-[13px] text-[#4b5563] font-medium mb-2 whitespace-nowrap">
                  Exam Month Year:
                </label>
                <select
                  id="exam-month-year-select"
                  value={selectedEmyr}
                  onChange={(e) => setSelectedEmyr(e.target.value)}
                  className="w-full h-[36px] px-2 text-[12.5px] border border-[#d1d5db] rounded-[4px] bg-white outline-none cursor-pointer text-[#4b5563]"
                >
                  <option value="">Select Exam Month Year</option>
                  {examMonths.map((m) => (
                    <option key={m.Id} value={m.Id}>
                      {m.ExamYearMonth}
                    </option>
                  ))}
                </select>
              </div>

              {/* Captcha input */}
              <div className="w-full">
                <label htmlFor="captcha-input" className="block text-[13px] text-[#4b5563] font-medium mb-2 whitespace-nowrap">
                  Enter Captcha :
                </label>
                <input
                  type="text"
                  id="captcha-input"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter Captcha"
                  className="w-full h-[36px] px-3 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white text-[#333] outline-none placeholder:text-[#9ca3af] placeholder:text-[13px]"
                />
              </div>

              {/* Submit button */}
              <div className="w-full">
                <button
                  type="submit"
                  disabled={loading}
                  id="view-hall-ticket-btn"
                  className="w-full h-[36px] px-5 bg-[#73b32d] hover:bg-[#65a024] active:bg-[#578c1f] text-white text-[13px] font-medium rounded-[2px] transition-colors flex items-center justify-center whitespace-nowrap disabled:opacity-75 cursor-pointer"
                  style={{ fontFamily: "'Mulish', sans-serif" }}
                >
                  {loading ? "Loading..." : "View Hall Ticket"}
                </button>
              </div>
            </div>

            {/* Captcha display row */}
            <div className="mt-4 flex items-center gap-2">
              <div className="cursor-pointer" onClick={refreshCaptcha} title="Click to refresh captcha">
                <CaptchaCanvas code={captchaCode} />
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                title="Refresh Captcha"
                aria-label="Refresh Captcha"
                className="text-[#4a4a4a] p-1 text-[14px] leading-none transition-colors"
              >
                <i className="fa-solid fa-rotate"></i>
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-xs sm:text-sm mt-3 font-medium">{error}</p>
            )}
          </form>
        </div>

        {/* Hall Ticket Result — real data from API */}
        {hallticket && (
          <div
            id="printable-hall-ticket"
            className="bg-white border border-[#b8b8b8] p-5 sm:p-7 md:p-8 max-w-[1240px] mx-auto shadow-sm mt-8"
          >
            {/* Header */}
            <div className="relative flex items-center justify-center pb-5 min-h-[90px]">
              <div className="absolute left-0 top-0 flex items-center">
                <img
                  src="https://www.sbtet.telangana.gov.in/assets/img/custom/sb-1.jpg"
                  alt="SBTET Emblem"
                  className="w-[84px] h-[84px] object-contain shrink-0" style={{width: "190px"}}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23008080' stroke='%23d4af37' stroke-width='3'/><circle cx='50' cy='50' r='40' fill='%23ffffff'/><circle cx='50' cy='50' r='36' fill='%230b5394'/><text x='50' y='46' font-size='8' font-weight='bold' fill='%23ffffff' text-anchor='middle' font-family='sans-serif'>SBTET</text><text x='50' y='58' font-size='6' font-weight='bold' fill='%23d4af37' text-anchor='middle' font-family='sans-serif'>TELANGANA</text></svg>";
                  }}
                />
              </div>
              <div className="text-center px-4 sm:px-24">
                <h2 className="text-[16px] sm:text-[19px] md:text-[20px] font-bold text-[#111111] leading-tight tracking-wide uppercase">
                  STATE BOARD OF TECHNICAL EDUCATION AND TRAINING - TELANGANA
                </h2>
                <h3 className="text-[14px] sm:text-[16px] md:text-[17px] font-bold text-[#111111] mt-1.5 tracking-normal">
                  HALL TICKET - DIPLOMA EXAMINATIONS - {hallticket.student.ExamMonthYear || ""}
                </h3>
              </div>
            </div>

            {/* Student details table */}
            <div className="w-full overflow-x-auto mt-2">
              <table id="student-info-table" className="w-full text-[13px] border border-[#b8b8b8] border-collapse bg-white">
                <tbody>
                  <tr className="border-b border-[#b8b8b8]">
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] w-[130px] text-[#222]">PIN</td>
                    <td className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal w-[280px]">{hallticket.student.Pin}</td>
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] w-[140px] text-[#222]">Scheme</td>
                    <td className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.Scheme}</td>
                    <td rowSpan={7} className="border-l border-[#b8b8b8] p-2 text-center align-middle w-[145px] max-w-[145px] bg-white">
                      <div className="w-[125px] h-[155px] mx-auto border border-[#b8b8b8] overflow-hidden bg-[#eef2f5] flex items-center justify-center">
                        <img
                          src={hallticket.student.Photo}
                          alt="Student Candidate Photo"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=280&auto=format&fit=crop&q=80";
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#b8b8b8]">
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Name</td>
                    <td colSpan={3} className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.Name}</td>
                  </tr>
                  <tr className="border-b border-[#b8b8b8]">
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Father Name</td>
                    <td colSpan={3} className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.FatherName}</td>
                  </tr>
                  <tr className="border-b border-[#b8b8b8]">
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Branch</td>
                    <td colSpan={3} className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.Branch}</td>
                  </tr>
                  <tr className="border-b border-[#b8b8b8]">
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Examination Center</td>
                    <td colSpan={3} className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.ExaminationCenter}</td>
                  </tr>
                  <tr className="border-b border-[#b8b8b8]">
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Total Fee Paid</td>
                    <td className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.TotalFeePaid}</td>
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Actual Attendance %</td>
                    <td className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.Attendance}</td>
                  </tr>
                  <tr>
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Downloaded Date</td>
                    <td colSpan={3} className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.DownloadedDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Subjects table */}
            <div className="overflow-x-auto mt-4">
              <table id="subjects-table" className="w-full text-[13px] border border-[#b8b8b8] border-collapse bg-white text-center">
                <thead className="bg-[#f2f2f2] text-[#222]">
                  <tr className="border-b border-[#b8b8b8]">
                    <th className="border-r border-[#b8b8b8] px-2 py-2 font-semibold w-[55px]">S No</th>
                    <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[85px]">Year/Sem</th>
                    <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[120px]">Subject Code</th>
                    <th className="border-r border-[#b8b8b8] px-4 py-2 font-semibold text-center">Name of the Subject</th>
                    <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[130px]">Exam Date</th>
                    <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[180px]">Exam Time</th>
                    <th className="px-3 py-2 font-semibold w-[130px]">Invigilator Sign</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#b8b8b8]">
                  {hallticket.subjects.map((s, idx) => (
                    <tr key={s.SubjectCode || idx} className="hover:bg-[#fafafa]">
                      <td className="border-r border-[#b8b8b8] px-2 py-1.5 text-[#555]">{s.SNo || idx + 1}</td>
                      <td className="border-r border-[#b8b8b8] px-3 py-1.5 text-[#555]">{s.Semester || ""}</td>
                      <td className="border-r border-[#b8b8b8] px-3 py-1.5 text-[#555] font-mono">{s.SubjectCode}</td>
                      <td className="border-r border-[#b8b8b8] px-4 py-1.5 text-left text-[#555]">{s.SubjectName}</td>
                      <td className="border-r border-[#b8b8b8] px-3 py-1.5 text-[#555]">{s.ExamDate || ""}</td>
                      <td className="border-r border-[#b8b8b8] px-3 py-1.5 text-[#555]">{s.ExamTime || ""}</td>
                      <td className="px-3 py-1.5 text-[#555]"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Certification */}
            <div className="mt-4 text-[13px] text-[#222] leading-relaxed">
              Certified that Sri/Kum/Smt <strong className="font-bold text-[#111]">{hallticket.student.Name}</strong> S/o D/o{" "}
              <strong className="font-bold text-[#111]">{hallticket.student.FatherName}</strong> is candidate for the above mentioned examination. Marks of Identification: (As per SSC)
              <div className="mt-1">1)</div>
              <div>2)</div>
            </div>

            {/* Signatures */}
            <div className="flex justify-between items-center mt-5 text-[13px] text-[#222]">
              <span className="font-normal">Signature of the Candidate</span>
              <span className="font-normal">Signature of the Head Of Section</span>
            </div>

            {/* Instructions */}
            <div id="instructions-container" className="mt-4 border border-[#b8b8b8] rounded-[2px] p-3.5 sm:p-4 text-[12.5px] leading-snug bg-white">
              <p className="font-bold text-[#111] mb-1.5">Instructions :</p>
              <ol className="list-decimal list-inside space-y-1 text-[#222]">
                <li className="font-bold text-[#111]">Hall-ticket issued to you is an important document preserve carefully up to declaration of the final result. No candidate will be allowed to enter the examination hall without proper hall-ticket.</li>
                <li className="font-bold text-[#111]">CANDIDATES ARE REQUESTED TO CROSSCHECK THE EXAMINATION DATES WITH TIME-TABLE DATES AND ATTEND EXAMINATION AS PER THE TIME TABLE.</li>
                <li>Candidate shall arrive at the examination center at least 30 minutes before the commencement of the examination.</li>
                <li className="font-bold text-[#111]">CANDIDATES WILL NOT BE ALLOWED IN EXAMINATION HALL AFTER COMMENCEMENT OF EXAMINATION UNDER ANY CIRCUMSTANCES.</li>
                <li>No printed / written material, in any form, shall be taken inside the exam hall, other than hall ticket.</li>
                <li>Every student shall cooperate while pockets are being checked.</li>
                <li>Candidates will not be allowed to leave the examination hall till the examination is completed.</li>
                <li>Candidates are advised to go through the instructions given on Answer Booklet or OMR Bar Code Sheet before starting answering.</li>
                <li>Candidates should not write any matter inside the Answer Booklet which may lead to the identification of the Candidate or institution. If he /she do so, he / she will be booked under malpractice. No color sketch pens are to be used unless specified question.</li>
                <li>Candidates should carry their own Scientific Calculators, Pens, Pencils and required drawing instruments.</li>
                <li>Candidates will not be allowed with Cell Phones, Organizers, PDA's and palmtops or any other Electronic Gadgets, etc.</li>
                <li>Every student shall follow the regulations during examinations, failing which he / she will be booked under malpractice case.</li>
                <li>Candidates are advised to check all the pages in the '8/16/24-page Answer Booklet' supplied to him / her. All answers are to be written within the given booklet only.</li>
                <li>No additional sheets will be supplied under any circumstances. Do Not write any matter on the Question Paper, to avoid malpractice.</li>
              </ol>
            </div>

            {/* Print button */}
            <div className="flex justify-end mt-6 no-print">
              <button
                type="button"
                id="print-hallticket-btn"
                onClick={() => window.print()}
                className="bg-[#17a2b8] hover:bg-[#138496] active:bg-[#117a8b] text-white text-[13.5px] font-medium px-4 py-2 rounded-[3px] shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
              >
                <i className="fa-solid fa-print"></i>
                Print
              </button>
            </div>

          </div>
        )}
      </main>
<style>{`
  @media print {
    @page {
      size: A4;
      margin: 8mm;
    }
    body * {
      visibility: hidden;
    }
    #printable-hall-ticket, #printable-hall-ticket * {
      visibility: visible;
    }
    #printable-hall-ticket {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      margin: 0;
      padding: 0;
      box-shadow: none;
      border: none;
      font-family: 'Mulish', sans-serif;
      font-size: 9.5px;
      line-height: 1.25;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color-adjust: exact;
    }
    #printable-hall-ticket table {
      font-size: 9px;
    }
    #printable-hall-ticket th,
    #printable-hall-ticket td {
      padding: 2px 6px !important;
    }
    #printable-hall-ticket h2 {
      font-size: 13px !important;
    }
    #printable-hall-ticket h3 {
      font-size: 11px !important;
    }
    #printable-hall-ticket .p-5,
    #printable-hall-ticket .sm\\:p-7,
    #printable-hall-ticket .md\\:p-8 {
      padding: 8px !important;
    }
    #printable-hall-ticket ol {
      font-size: 8.5px !important;
    }
    .no-print {
      display: none !important;
    }
  }
`}</style>
    </div>
  );
}






// import { useEffect, useState, useRef } from "react";
// import api from "../api/client";

// function generateCaptchaCode(length = 6) {
//   const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
//   let code = "";
//   for (let i = 0; i < length; i++) {
//     code += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return code;
// }

// function CaptchaCanvas({ code }) {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     const width = canvas.width;
//     const height = canvas.height;
//     ctx.clearRect(0, 0, width, height);

//     const chars = code.split("");
//     const charSpacing = width / (chars.length + 0.4);

//     chars.forEach((char, index) => {
//       ctx.save();
//       const x = 8 + index * charSpacing;
//       const y = height / 2 + 5;
//       ctx.translate(x, y);
//       ctx.font = 'bold 22px "Times New Roman", Times, "Cinzel", serif';
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillStyle = "#888888";
//       ctx.fillText(char, 1, 1);
//       ctx.fillStyle = "#ffffff";
//       ctx.fillText(char, 0, 0);
//       ctx.strokeStyle = "#2b2b2b";
//       ctx.lineWidth = 1.3;
//       ctx.strokeText(char, 0, 0);
//       ctx.restore();
//     });
//   }, [code]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={115}
//       height={30}
//       className="h-[30px] w-[115px] block object-contain select-none"
//     />
//   );
// }

// export default function HallTicketPage() {
//   const [pin, setPin] = useState("");
//   const [examType, setExamType] = useState("");
//   const [examMonths, setExamMonths] = useState([]);
//   const [selectedEmyr, setSelectedEmyr] = useState("");
//   const [captchaCode, setCaptchaCode] = useState("nmcbMV");
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [hallticket, setHallticket] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch exam months from real backend endpoint
//   useEffect(() => {
//     api
//       .get("/hallticket/exam-months?studentTypeId=1")
//       .then((res) => {
//         const months = res.data?.Table1 || [];
//         setExamMonths(months);
//         if (months.length > 0) setSelectedEmyr(months[0].Id);
//       })
//       .catch(() => {
//         // Handled silently
//       });
//   }, []);

//   function refreshCaptcha() {
//     setCaptchaCode(generateCaptchaCode());
//     setCaptchaInput("");
//   }

//   function handleViewHallticket(e) {
//     if (e) e.preventDefault();
//     setError("");

//     if (!pin.trim()) {
//       setError("Please enter your PIN Number.");
//       return;
//     }
//     if (!examType) {
//       setError("Please select Exam Type.");
//       return;
//     }
//     if (!selectedEmyr) {
//       setError("Please select Exam Month Year.");
//       return;
//     }
//     if (!captchaInput.trim()) {
//       setError("Please enter Captcha.");
//       return;
//     }
//     if (captchaInput.trim() !== captchaCode) {
//       setError("Incorrect captcha. Please try again.");
//       refreshCaptcha();
//       return;
//     }

//     setLoading(true);
//     api
//       .get(
//         `/hallticket/view?pin=${encodeURIComponent(pin.trim())}&emyr=${encodeURIComponent(
//           selectedEmyr
//         )}&examType=${encodeURIComponent(examType)}&studentTypeId=1`
//       )
//       .then((res) => {
//         const table1 = res.data?.Table1?.[0];
//         const table2 = res.data?.Table2 || [];
//         if (!table1) {
//           setError("No hall ticket found for this PIN/Exam.");
//           setHallticket(null);
//           return;
//         }
//         setHallticket({ student: table1, subjects: table2 });
//       })
//       .catch(() => {
//         setError("Could not fetch hall ticket. Check PIN or connection.");
//         setHallticket(null);
//       })
//       .finally(() => {
//         setLoading(false);
//         refreshCaptcha();
//       });
//   }

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] text-[#333333] flex flex-col font-sans" style={{ marginTop: "-20px" }}>
//       {/* Gray Sub-header Bar */}
//       <div
//         className="w-[calc(100%+400px)] -ml-[200px] bg-[#d8dadc] px-4 sm:px-12 md:px-24 flex items-center"
//         style={{ height: "30px", boxSizing: "border-box" }}
//       >
//         <h1
//           className="m-0 text-[14px] sm:text-[12.5px] text-[#212529] leading-none"
//           style={{ marginLeft: "109px", fontFamily: "'Mulish', sans-serif", fontWeight: 700 }}
//         >
//           Download Hall Ticket
//         </h1>
//       </div>

//       {/* Main Content Area */}
//       <main
//         className="flex-1 px-4 sm:px-8 md:px-12 py-10 w-full mx-auto"
//         style={{ marginLeft: "-25px", width: "calc(100% + 50px)" }}
//       >
//         {/* Form Card */}
//         <div
//           className="bg-white border border-[#e2e4e7] rounded-[4px] p-6 sm:p-8 max-w-[1240px] mx-auto"
//           style={{
//             fontFamily: "'Mulish', sans-serif",
//             boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
//           }}
//         >
//           <form onSubmit={handleViewHallticket} noValidate>
//             <div className="flex flex-col lg:flex-row lg:items-end gap-3.5 xl:gap-4">
//               {/* PIN */}
//               <div className="w-full lg:w-[170px] shrink-0">
//                 <label htmlFor="pin-input" className="block text-[13px] text-[#2b2b2b] font-bold mb-2.5 whitespace-nowrap">
//                   PIN :
//                 </label>
//                 <input
//                   type="text"
//                   id="pin-input"
//                   value={pin}
//                   onChange={(e) => setPin(e.target.value)}
//                   placeholder="Enter Pin Number"
//                   className="w-full h-[36px] px-3 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white text-[#333] outline-none placeholder:text-[#9ca3af] placeholder:text-[13px]"
//                 />
//               </div>

//               {/* Exam Type */}
//               <div className="w-full lg:w-[185px] shrink-0">
//                 <label htmlFor="exam-type-select" className="block text-[13px] text-[#4b5563] font-medium mb-2.5 whitespace-nowrap">
//                   Exam Type:
//                 </label>
//                 <select
//                   id="exam-type-select"
//                   value={examType}
//                   onChange={(e) => setExamType(e.target.value)}
//                   className="w-full h-[36px] px-2.5 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white outline-none cursor-pointer text-[#4b5563]"
//                 >
//                   <option value="">Select Exam Type</option>
//                   <option value="Regular">Regular</option>
//                   <option value="Supplementary">Supplementary</option>
//                 </select>
//               </div>

//               {/* Exam Month Year */}
//               <div className="w-full lg:w-[210px] shrink-0">
//                 <label htmlFor="exam-month-year-select" className="block text-[13px] text-[#4b5563] font-medium mb-2.5 whitespace-nowrap">
//                   Exam Month Year:
//                 </label>
//                 <select
//                   id="exam-month-year-select"
//                   value={selectedEmyr}
//                   onChange={(e) => setSelectedEmyr(e.target.value)}
//                   className="w-full h-[36px] px-2 text-[12.5px] border border-[#d1d5db] rounded-[4px] bg-white outline-none cursor-pointer text-[#4b5563]"
//                 >
//                   <option value="">Select Exam Month Year</option>
//                   {examMonths.map((m) => (
//                     <option key={m.Id} value={m.Id}>
//                       {m.ExamYearMonth}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Captcha input */}
//               <div className="w-full lg:w-[220px] shrink-0">
//                 <label htmlFor="captcha-input" className="block text-[13px] text-[#4b5563] font-medium mb-2.5 whitespace-nowrap">
//                   Enter Captcha :
//                 </label>
//                 <input
//                   type="text"
//                   id="captcha-input"
//                   value={captchaInput}
//                   onChange={(e) => setCaptchaInput(e.target.value)}
//                   placeholder="Enter Captcha"
//                   className="w-full h-[36px] px-3 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white text-[#333] outline-none placeholder:text-[#9ca3af] placeholder:text-[13px]"
//                 />
//               </div>

//               {/* Submit button */}
//               <div className="shrink-0 lg:ml-auto" style={{ marginLeft: "20px" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   id="view-hall-ticket-btn"
//                   className="w-full h-[36px] px-5 bg-[#73b32d] hover:bg-[#65a024] active:bg-[#578c1f] text-white text-[13px] font-medium rounded-[0px] transition-colors flex items-center justify-center whitespace-nowrap disabled:opacity-75 cursor-pointer"
//                   style={{ fontFamily: "'Mulish', sans-serif", marginLeft: "10px" }}
//                 >
//                   {loading ? "Loading..." : "View Hall Ticket"}
//                 </button>
//               </div>
//             </div>

//             {/* Captcha display row */}
//             <div className="mt-4 flex items-center gap-2" style={{ marginLeft: "390px" }}>
//               <div className="cursor-pointer" onClick={refreshCaptcha} title="Click to refresh captcha">
//                 <CaptchaCanvas code={captchaCode} />
//               </div>
//               <button
//                 type="button"
//                 onClick={refreshCaptcha}
//                 title="Refresh Captcha"
//                 aria-label="Refresh Captcha"
//                 className="text-[#4a4a4a] p-1 text-[14px] leading-none transition-colors"
//                 style={{ marginTop: "8px", marginLeft: "8px" }}
//               >
//                 <i className="fa-solid fa-rotate"></i>
//               </button>
//             </div>

//             {error && (
//               <p className="text-red-600 text-xs sm:text-sm mt-3 font-medium">{error}</p>
//             )}
//           </form>
//         </div>

//         {/* Hall Ticket Result — real data from API */}
//         {hallticket && (
//           <div
//             id="printable-hall-ticket"
//             className="bg-white border border-[#b8b8b8] p-5 sm:p-7 md:p-8 max-w-[1240px] mx-auto shadow-sm mt-8"
//           >
//             {/* Header */}
//             <div className="relative flex items-center justify-center pb-5 min-h-[90px]">
//               <div className="absolute left-0 top-0 flex items-center">
//                 <img
//                   src="https://www.sbtet.telangana.gov.in/assets/img/custom/sb-1.jpg"
//                   alt="SBTET Emblem"
//                   className="w-[84px] h-[84px] object-contain shrink-0" style={{width: "190px"}}
//                   onError={(e) => {
//                     e.currentTarget.onerror = null;
//                     e.currentTarget.src =
//                       "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23008080' stroke='%23d4af37' stroke-width='3'/><circle cx='50' cy='50' r='40' fill='%23ffffff'/><circle cx='50' cy='50' r='36' fill='%230b5394'/><text x='50' y='46' font-size='8' font-weight='bold' fill='%23ffffff' text-anchor='middle' font-family='sans-serif'>SBTET</text><text x='50' y='58' font-size='6' font-weight='bold' fill='%23d4af37' text-anchor='middle' font-family='sans-serif'>TELANGANA</text></svg>";
//                   }}
//                 />
//               </div>
//               <div className="text-center px-4 sm:px-24">
//                 <h2 className="text-[16px] sm:text-[19px] md:text-[20px] font-bold text-[#111111] leading-tight tracking-wide uppercase">
//                   STATE BOARD OF TECHNICAL EDUCATION AND TRAINING - TELANGANA
//                 </h2>
//                 <h3 className="text-[14px] sm:text-[16px] md:text-[17px] font-bold text-[#111111] mt-1.5 tracking-normal">
//                   HALL TICKET - DIPLOMA EXAMINATIONS - {hallticket.student.ExamMonthYear || ""}
//                 </h3>
//               </div>
//             </div>

//             {/* Student details table */}
//             <div className="w-full overflow-x-auto mt-2">
//               <table id="student-info-table" className="w-full text-[13px] border border-[#b8b8b8] border-collapse bg-white">
//                 <tbody>
//                   <tr className="border-b border-[#b8b8b8]">
//                     <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] w-[130px] text-[#222]">PIN</td>
//                     <td className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal w-[280px]">{hallticket.student.Pin}</td>
//                     <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] w-[140px] text-[#222]">Scheme</td>
//                     <td className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.Scheme}</td>
//                     <td rowSpan={7} className="border-l border-[#b8b8b8] p-2 text-center align-middle w-[145px] max-w-[145px] bg-white">
//                       <div className="w-[125px] h-[155px] mx-auto border border-[#b8b8b8] overflow-hidden bg-[#eef2f5] flex items-center justify-center">
//                         <img
//                           src={hallticket.student.Photo}
//                           alt="Student Candidate Photo"
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.currentTarget.onerror = null;
//                             e.currentTarget.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=280&auto=format&fit=crop&q=80";
//                           }}
//                         />
//                       </div>
//                     </td>
//                   </tr>
//                   <tr className="border-b border-[#b8b8b8]">
//                     <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Name</td>
//                     <td colSpan={3} className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.Name}</td>
//                   </tr>
//                   <tr className="border-b border-[#b8b8b8]">
//                     <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Father Name</td>
//                     <td colSpan={3} className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.FatherName}</td>
//                   </tr>
//                   <tr className="border-b border-[#b8b8b8]">
//                     <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Branch</td>
//                     <td colSpan={3} className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.Branch}</td>
//                   </tr>
//                   <tr className="border-b border-[#b8b8b8]">
//                     <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Examination Center</td>
//                     <td colSpan={3} className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.ExaminationCenter}</td>
//                   </tr>
//                   <tr className="border-b border-[#b8b8b8]">
//                     <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Total Fee Paid</td>
//                     <td className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.TotalFeePaid}</td>
//                     <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Actual Attendance %</td>
//                     <td className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.Attendance}</td>
//                   </tr>
//                   <tr>
//                     <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] text-[#222]">Downloaded Date</td>
//                     <td colSpan={3} className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.DownloadedDate}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* Subjects table */}
//             <div className="overflow-x-auto mt-4">
//               <table id="subjects-table" className="w-full text-[13px] border border-[#b8b8b8] border-collapse bg-white text-center">
//                 <thead className="bg-[#f2f2f2] text-[#222]">
//                   <tr className="border-b border-[#b8b8b8]">
//                     <th className="border-r border-[#b8b8b8] px-2 py-2 font-semibold w-[55px]">S No</th>
//                     <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[85px]">Year/Sem</th>
//                     <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[120px]">Subject Code</th>
//                     <th className="border-r border-[#b8b8b8] px-4 py-2 font-semibold text-center">Name of the Subject</th>
//                     <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[130px]">Exam Date</th>
//                     <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[180px]">Exam Time</th>
//                     <th className="px-3 py-2 font-semibold w-[130px]">Invigilator Sign</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-[#b8b8b8]">
//                   {hallticket.subjects.map((s, idx) => (
//                     <tr key={s.SubjectCode || idx} className="hover:bg-[#fafafa]">
//                       <td className="border-r border-[#b8b8b8] px-2 py-1.5 text-[#555]">{s.SNo || idx + 1}</td>
//                       <td className="border-r border-[#b8b8b8] px-3 py-1.5 text-[#555]">{s.Semester || ""}</td>
//                       <td className="border-r border-[#b8b8b8] px-3 py-1.5 text-[#555] font-mono">{s.SubjectCode}</td>
//                       <td className="border-r border-[#b8b8b8] px-4 py-1.5 text-left text-[#555]">{s.SubjectName}</td>
//                       <td className="border-r border-[#b8b8b8] px-3 py-1.5 text-[#555]">{s.ExamDate || ""}</td>
//                       <td className="border-r border-[#b8b8b8] px-3 py-1.5 text-[#555]">{s.ExamTime || ""}</td>
//                       <td className="px-3 py-1.5 text-[#555]"></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Certification */}
//             <div className="mt-4 text-[13px] text-[#222] leading-relaxed">
//               Certified that Sri/Kum/Smt <strong className="font-bold text-[#111]">{hallticket.student.Name}</strong> S/o D/o{" "}
//               <strong className="font-bold text-[#111]">{hallticket.student.FatherName}</strong> is candidate for the above mentioned examination. Marks of Identification: (As per SSC)
//               <div className="mt-1">1)</div>
//               <div>2)</div>
//             </div>

//             {/* Signatures */}
//             <div className="flex justify-between items-center mt-5 text-[13px] text-[#222]">
//               <span className="font-normal">Signature of the Candidate</span>
//               <span className="font-normal">Signature of the Head Of Section</span>
//             </div>

//             {/* Instructions */}
//             <div id="instructions-container" className="mt-4 border border-[#b8b8b8] rounded-[2px] p-3.5 sm:p-4 text-[12.5px] leading-snug bg-white">
//               <p className="font-bold text-[#111] mb-1.5">Instructions :</p>
//               <ol className="list-decimal list-inside space-y-1 text-[#222]">
//                 <li className="font-bold text-[#111]">Hall-ticket issued to you is an important document preserve carefully up to declaration of the final result. No candidate will be allowed to enter the examination hall without proper hall-ticket.</li>
//                 <li className="font-bold text-[#111]">CANDIDATES ARE REQUESTED TO CROSSCHECK THE EXAMINATION DATES WITH TIME-TABLE DATES AND ATTEND EXAMINATION AS PER THE TIME TABLE.</li>
//                 <li>Candidate shall arrive at the examination center at least 30 minutes before the commencement of the examination.</li>
//                 <li className="font-bold text-[#111]">CANDIDATES WILL NOT BE ALLOWED IN EXAMINATION HALL AFTER COMMENCEMENT OF EXAMINATION UNDER ANY CIRCUMSTANCES.</li>
//                 <li>No printed / written material, in any form, shall be taken inside the exam hall, other than hall ticket.</li>
//                 <li>Every student shall cooperate while pockets are being checked.</li>
//                 <li>Candidates will not be allowed to leave the examination hall till the examination is completed.</li>
//                 <li>Candidates are advised to go through the instructions given on Answer Booklet or OMR Bar Code Sheet before starting answering.</li>
//                 <li>Candidates should not write any matter inside the Answer Booklet which may lead to the identification of the Candidate or institution. If he /she do so, he / she will be booked under malpractice. No color sketch pens are to be used unless specified question.</li>
//                 <li>Candidates should carry their own Scientific Calculators, Pens, Pencils and required drawing instruments.</li>
//                 <li>Candidates will not be allowed with Cell Phones, Organizers, PDA's and palmtops or any other Electronic Gadgets, etc.</li>
//                 <li>Every student shall follow the regulations during examinations, failing which he / she will be booked under malpractice case.</li>
//                 <li>Candidates are advised to check all the pages in the '8/16/24-page Answer Booklet' supplied to him / her. All answers are to be written within the given booklet only.</li>
//                 <li>No additional sheets will be supplied under any circumstances. Do Not write any matter on the Question Paper, to avoid malpractice.</li>
//               </ol>
//             </div>

//             {/* Print button */}
//             <div className="flex justify-end mt-6 no-print">
//               <button
//                 type="button"
//                 id="print-hallticket-btn"
//                 onClick={() => window.print()}
//                 className="bg-[#17a2b8] hover:bg-[#138496] active:bg-[#117a8b] text-white text-[13.5px] font-medium px-4 py-2 rounded-[3px] shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
//               >
//                 <i className="fa-solid fa-print"></i>
//                 Print
//               </button>
//             </div>

//           </div>
//         )}
//       </main>
      
//       <style>{`
//         @media print {
//           @page {
//             size: A4;
//             margin: 8mm;
//           }
//           body * {
//             visibility: hidden;
//           }
//           #printable-hall-ticket, #printable-hall-ticket * {
//             visibility: visible;
//           }
//           #printable-hall-ticket {
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 100%;
//             margin: 0;
//             padding: 0;
//             box-shadow: none;
//             border: none;
//             font-family: 'Mulish', sans-serif;
//             font-size: 9.5px;
//             line-height: 1.25;
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
//             color-adjust: exact;
//           }
//           #printable-hall-ticket table {
//             font-size: 9px;
//           }
//           #printable-hall-ticket th,
//           #printable-hall-ticket td {
//             padding: 2px 6px !important;
//           }
//           #printable-hall-ticket h2 {
//             font-size: 13px !important;
//           }
//           #printable-hall-ticket h3 {
//             font-size: 11px !important;
//           }
//           #printable-hall-ticket .p-5,
//           #printable-hall-ticket .sm\\:p-7,
//           #printable-hall-ticket .md\\:p-8 {
//             padding: 8px !important;
//           }
//           #printable-hall-ticket ol {
//             font-size: 8.5px !important;
//           }
//           .no-print {
//             display: none !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }