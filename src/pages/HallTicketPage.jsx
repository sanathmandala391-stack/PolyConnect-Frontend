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

  // Fetch exam months from backend endpoint
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
    <div className="min-h-screen bg-[#f8f9fa] text-[#333333] flex flex-col font-sans w-full">
      {/* Top Gray Sub-header Bar */}
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
      <main className="flex-1 w-full max-w-[1240px] mx-auto py-1 sm:py-3">
        {/* Form Card */}
        <div
          className="bg-white border border-[#e2e4e7] rounded-[4px] p-4 sm:p-6 md:p-7 max-w-[1240px] mx-auto shadow-sm no-print"
          style={{ fontFamily: "'Mulish', sans-serif" }}
        >
          <form onSubmit={handleViewHallticket} noValidate>
            <div className="flex flex-col md:flex-row md:items-end md:flex-wrap gap-3.5 md:gap-4">
              {/* PIN */}
              <div className="w-full md:flex-1 md:min-w-[150px]">
                <label htmlFor="pin-input" className="block text-[13px] text-[#2b2b2b] font-bold mb-1.5 whitespace-nowrap">
                  PIN :
                </label>
                <input
                  type="text"
                  id="pin-input"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter Pin Number"
                  className="w-full h-[36px] px-3 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white text-[#333] outline-none placeholder:text-[#9ca3af]"
                />
              </div>

              {/* Exam Type */}
              <div className="w-full md:flex-1 md:min-w-[150px]">
                <label htmlFor="exam-type-select" className="block text-[13px] text-[#4b5563] font-medium mb-1.5 whitespace-nowrap">
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
              <div className="w-full md:flex-1 md:min-w-[180px]">
                <label htmlFor="exam-month-year-select" className="block text-[13px] text-[#4b5563] font-medium mb-1.5 whitespace-nowrap">
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
              <div className="w-full md:flex-1 md:min-w-[140px]">
                <label htmlFor="captcha-input" className="block text-[13px] text-[#4b5563] font-medium mb-1.5 whitespace-nowrap">
                  Enter Captcha :
                </label>
                <input
                  type="text"
                  id="captcha-input"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter Captcha"
                  className="w-full h-[36px] px-3 text-[13px] border border-[#d1d5db] rounded-[4px] bg-white text-[#333] outline-none placeholder:text-[#9ca3af]"
                />
              </div>

              {/* Captcha Canvas */}
              <div className="flex items-center gap-2 h-[36px] mt-1 md:mt-0">
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

              {/* Submit button */}
              <div className="w-full md:w-auto mt-2 md:mt-0">
                <button
                  type="submit"
                  disabled={loading}
                  id="view-hall-ticket-btn"
                  className="w-full md:w-auto h-[36px] px-6 bg-[#73b32d] hover:bg-[#65a024] active:bg-[#578c1f] text-white text-[13px] font-medium rounded-[2px] transition-colors flex items-center justify-center whitespace-nowrap disabled:opacity-75 cursor-pointer"
                  style={{ fontFamily: "'Mulish', sans-serif" }}
                >
                  {loading ? "Loading..." : "View Hall Ticket"}
                </button>
              </div>
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
            className="bg-white border border-[#b8b8b8] p-4 sm:p-6 md:p-8 max-w-[1240px] mx-auto shadow-sm mt-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pb-4 border-b border-gray-200 text-center">
              <img
                src="https://www.sbtet.telangana.gov.in/assets/img/custom/sb-1.jpg"
                alt="SBTET Emblem"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23008080' stroke='%23d4af37' stroke-width='3'/><circle cx='50' cy='50' r='40' fill='%23ffffff'/><circle cx='50' cy='50' r='36' fill='%230b5394'/><text x='50' y='46' font-size='8' font-weight='bold' fill='%23ffffff' text-anchor='middle' font-family='sans-serif'>SBTET</text><text x='50' y='58' font-size='6' font-weight='bold' fill='%23d4af37' text-anchor='middle' font-family='sans-serif'>TELANGANA</text></svg>";
                }}
              />
              <div className="px-2 sm:px-4">
                <h2 className="text-[14px] sm:text-[18px] md:text-[19px] font-bold text-[#111111] leading-tight uppercase">
                  STATE BOARD OF TECHNICAL EDUCATION AND TRAINING - TELANGANA
                </h2>
                <h3 className="text-[12.5px] sm:text-[15px] font-bold text-[#111111] mt-1">
                  HALL TICKET - DIPLOMA EXAMINATIONS - {hallticket.student.ExamMonthYear || ""}
                </h3>
              </div>
            </div>

            {/* Student details table */}
            <div className="w-full overflow-x-auto mt-4">
              <table id="student-info-table" className="w-full text-[12.5px] sm:text-[13px] border border-[#b8b8b8] border-collapse bg-white">
                <tbody>
                  <tr className="border-b border-[#b8b8b8]">
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] w-[120px] text-[#222]">PIN</td>
                    <td className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal w-[260px] font-mono">{hallticket.student.Pin}</td>
                    <td className="bg-[#f2f2f2] font-normal px-3 py-1.5 border-r border-[#b8b8b8] w-[120px] text-[#222]">Scheme</td>
                    <td className="px-3 py-1.5 border-r border-[#b8b8b8] text-[#555] font-normal">{hallticket.student.Scheme}</td>
                    <td rowSpan={7} className="border-l border-[#b8b8b8] p-2 text-center align-middle w-[135px] max-w-[135px] bg-white">
                      <div className="w-[115px] h-[145px] mx-auto border border-[#b8b8b8] overflow-hidden bg-[#eef2f5] flex items-center justify-center">
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
              <table id="subjects-table" className="w-full text-[12.5px] sm:text-[13px] border border-[#b8b8b8] border-collapse bg-white text-center">
                <thead className="bg-[#f2f2f2] text-[#222]">
                  <tr className="border-b border-[#b8b8b8]">
                    <th className="border-r border-[#b8b8b8] px-2 py-2 font-semibold w-[50px]">S No</th>
                    <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[80px]">Year/Sem</th>
                    <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[110px]">Subject Code</th>
                    <th className="border-r border-[#b8b8b8] px-4 py-2 font-semibold text-center">Name of the Subject</th>
                    <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[120px]">Exam Date</th>
                    <th className="border-r border-[#b8b8b8] px-3 py-2 font-semibold w-[160px]">Exam Time</th>
                    <th className="px-3 py-2 font-semibold w-[120px]">Invigilator Sign</th>
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
            <div className="mt-4 text-[12.5px] text-[#222] leading-relaxed">
              Certified that Sri/Kum/Smt <strong className="font-bold text-[#111]">{hallticket.student.Name}</strong> S/o D/o{" "}
              <strong className="font-bold text-[#111]">{hallticket.student.FatherName}</strong> is candidate for the above mentioned examination. Marks of Identification: (As per SSC)
              <div className="mt-1">1)</div>
              <div>2)</div>
            </div>

            {/* Signatures */}
            <div className="flex justify-between items-center mt-5 text-[12.5px] text-[#222]">
              <span className="font-normal">Signature of the Candidate</span>
              <span className="font-normal">Signature of the Head Of Section</span>
            </div>

            {/* Instructions */}
            <div id="instructions-container" className="mt-4 border border-[#b8b8b8] rounded-[2px] p-3.5 sm:p-4 text-[12px] leading-snug bg-white">
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
          #printable-hall-ticket .p-4,
          #printable-hall-ticket .sm\\:p-6,
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