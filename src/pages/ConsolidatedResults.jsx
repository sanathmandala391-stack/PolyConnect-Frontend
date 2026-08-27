import React, { useState, useEffect, useRef } from "react";
import { AlertCircle, Printer } from "lucide-react";
import { getConsolidatedResults, apiErrorMessage } from "../api/client";
import { transformSbtetResponse } from "../utils/transformResults";
import sbtetImage from "../images/sb.png";

const SCHEMES = [
  "Select Scheme",
  "C26",
  "C24",
  "ER2020",
  "C21",
  "C18",
  "C09",
  "C08",
  "C05",
  "C16S",
  "C16",
  "C14",
];

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

export default function ConsolidatedResults() {
  const [selectedScheme, setSelectedScheme] = useState(SCHEMES[0]);
  const [pinNumber, setPinNumber] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);

  function refreshCaptcha() {
    setCaptchaCode(generateCaptchaCode());
    setCaptchaInput("");
  }

  useEffect(() => {
    refreshCaptcha();
  }, []);

  async function handleGetReport(e) {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedScheme || selectedScheme === "Select Scheme") {
      setErrorMessage("Please select a Scheme.");
      return;
    }
    if (!pinNumber.trim()) {
      setErrorMessage("Please enter a valid PIN.");
      return;
    }
    if (captchaInput.trim() !== captchaCode) {
      setErrorMessage("Incorrect captcha. Please try again.");
      refreshCaptcha();
      return;
    }

    setIsLoading(true);
    setData(null);

    try {
      const rawResData = await getConsolidatedResults(pinNumber.trim());
      const transformed = transformSbtetResponse(rawResData);

      if (transformed) {
        setData(transformed);
      } else {
        setErrorMessage("No records found for this PIN.");
      }
    } catch (err) {
      setErrorMessage(apiErrorMessage(err, "Failed to load consolidated results."));
    } finally {
      setIsLoading(false);
      refreshCaptcha();
    }
  }

  function handlePrint() {
    window.print();
  }

  const student = data?.studentInfo || {};
  const cgpa = data?.cgpaInfo || {};
  const semesters = data?.semesters || [];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-['Mulish',sans-serif] w-full">
      {/* Header Breadcrumb */}
      <div
        className="-mx-3 sm:-mx-4 md:-mx-6 bg-[#d8dadc] px-4 sm:px-8 py-2 flex items-center mb-4"
        style={{ boxSizing: "border-box", marginTop: "-16px" }}
      >
        <h1
          className="m-0 text-[13px] sm:text-[14px] text-[#212529] leading-none font-bold"
        >
          Diploma Results
        </h1>
      </div>

      <main className="flex-1 w-full max-w-[1240px] mx-auto py-1 sm:py-3">
        {/* Search Container */}
        <div className="w-full mb-4 no-print">
          <section
            id="exact-component-container"
            className="w-full bg-[#d7eff5] border border-[#bfe4ee] rounded-sm shadow-sm overflow-hidden"
          >
            <form
              onSubmit={handleGetReport}
              className="p-4 sm:p-5 md:px-6 md:py-4 flex flex-col md:flex-row md:items-end md:flex-wrap gap-3.5 md:gap-4"
            >
              {/* 1. Scheme Dropdown */}
              <div className="flex flex-col gap-1 w-full md:w-auto md:min-w-[140px]">
                <label
                  htmlFor="scheme-select"
                  className="text-[#007b99] font-medium text-[13.5px] tracking-wide select-none"
                >
                  Scheme :
                </label>
                <div className="relative">
                  <select
                    id="scheme-select"
                    value={selectedScheme}
                    onChange={(e) => setSelectedScheme(e.target.value)}
                    className="w-full bg-white text-slate-800 text-[13.5px] px-3 py-1.5 rounded-[3px] border border-[#b5c7cf] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-1 focus:ring-[#007b99] focus:border-[#007b99] cursor-pointer appearance-none pr-8 h-[36px]"
                  >
                    {SCHEMES.map((scheme) => (
                      <option key={scheme} value={scheme}>
                        {scheme}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 2. PIN Input */}
              <div className="flex flex-col gap-1 w-full md:w-auto md:min-w-[160px]">
                <label
                  htmlFor="pin-input"
                  className="text-[#007b99] font-medium text-[13.5px] tracking-wide select-none"
                >
                  PIN :
                </label>
                <input
                  id="pin-input"
                  type="text"
                  value={pinNumber}
                  onChange={(e) => setPinNumber(e.target.value.toUpperCase())}
                  placeholder="24047-CS-023"
                  className="w-full bg-white text-slate-800 text-[13.5px] px-3 py-1.5 rounded-[3px] border border-[#b5c7cf] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-1 focus:ring-[#007b99] focus:border-[#007b99] h-[36px]"
                />
              </div>

              {/* 3. Enter Captcha Input */}
              <div className="flex flex-col gap-1 w-full md:w-auto md:min-w-[140px]">
                <label
                  htmlFor="captcha-input"
                  className="text-[#007b99] font-medium text-[13.5px] tracking-wide select-none"
                >
                  Enter Captcha :
                </label>
                <input
                  id="captcha-input"
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter Captcha"
                  className="w-full bg-white text-slate-800 text-[13.5px] px-3 py-1.5 rounded-[3px] border border-[#b5c7cf] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-1 focus:ring-[#007b99] focus:border-[#007b99] h-[36px]"
                />
              </div>

              {/* Captcha Canvas */}
              <div className="flex items-center gap-2 mt-1 md:mt-0 h-[36px]">
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

              {/* Submit Button */}
              <div className="w-full md:w-auto mt-2 md:mt-0">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto px-6 h-[36px] bg-[#73b32d] hover:bg-[#65a024] text-white text-[13px] font-bold rounded-[2px] shadow-sm disabled:opacity-70 transition-colors flex items-center justify-center cursor-pointer"
                >
                  {isLoading ? "Loading..." : "Get Report"}
                </button>
              </div>
            </form>

            {/* Validation / Error banner */}
            {errorMessage && (
              <div className="bg-rose-50 border-t border-rose-200 px-6 py-2.5 flex items-center gap-2 text-rose-700 text-xs sm:text-sm font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}
          </section>

          {/* Print Button */}
          {data && (
            <div className="flex justify-end mt-4 mb-2">
              <button
                id="print-btn"
                onClick={handlePrint}
                className="h-[34px] px-4 bg-[#1e88e5] hover:bg-[#1976d2] active:bg-[#1565c0] text-white text-[13px] font-medium rounded-[4px] flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <span>Print</span>
                <Printer size={15} strokeWidth={2.4} />
              </button>
            </div>
          )}
        </div>

        {/* Marks Card */}
        {data && (
          <div
            id="results-history-marks-card"
            className="w-full bg-white border border-[#999999] rounded-[2px] p-4 sm:p-6 shadow-xs mb-8 print-container"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={sbtetImage}
                alt="sbtet"
                className="w-16 sm:w-20 object-contain shrink-0"
              />
              <div className="flex-1 text-center">
                <h2 className="text-[14px] sm:text-[16px] font-bold text-[#14532d] tracking-wide uppercase leading-snug">
                  STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA
                </h2>
                <h3 className="text-[13px] sm:text-[15px] font-bold text-[#0d7377] tracking-wider uppercase mt-1">
                  RESULTS HISTORY MARKS CARD
                </h3>
              </div>
            </div>

            {/* Student Info */}
            <div className="overflow-x-auto mb-3">
              <table
                id="student-info-table"
                className="w-full text-center border-collapse border border-[#808080] text-[11px] sm:text-[12px]"
              >
                <thead>
                  <tr className="bg-[#f9fafb] text-[#333333] font-bold">
                    <th className="border border-[#808080] py-1.5 px-2 w-1/4">PIN</th>
                    <th className="border border-[#808080] py-1.5 px-2 w-2/4">NAME</th>
                    <th className="border border-[#808080] py-1.5 px-2 w-1/8">BRANCH</th>
                    <th className="border border-[#808080] py-1.5 px-2 w-1/8">SCHEME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white font-medium text-[#222]">
                    <td className="border border-[#808080] py-1.5 px-2 font-mono">{student.pin}</td>
                    <td className="border border-[#808080] py-1.5 px-2 font-semibold">{student.name}</td>
                    <td className="border border-[#808080] py-1.5 px-2">{student.branch}</td>
                    <td className="border border-[#808080] py-1.5 px-2">{student.scheme}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Marks Table */}
            <div className="overflow-x-auto">
              <table
                id="marks-data-table"
                className="w-full text-center border-collapse border border-[#808080] text-[10px] sm:text-[11px] marks-table"
              >
                <thead>
                  <tr className="bg-[#f9fafb] text-[#222222] font-bold text-[10px] sm:text-[11px]">
                    <th className="border border-[#808080] py-2 px-1 text-center min-w-[70px]">SUBJECT CODE</th>
                    <th className="border border-[#808080] py-2 px-2 text-center min-w-[190px]">SUBJECT NAME</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">MAX CREDITS</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">MID SEM1 (20)</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">MID SEM2 (20)</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">INTERNAL (20)</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">END SEM (40)</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">SUBJECT TOTAL (100)</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">GRADE</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">GRADE POINTS</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">CREDITS EARNED</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">TOTAL GRADE POINTS</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">R/S</th>
                    <th className="border border-[#808080] py-2 px-1 text-center min-w-[90px]">EXAM MONTH YEAR</th>
                    <th className="border border-[#808080] py-2 px-1 text-center">EXAM STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {semesters.map((sem, semIdx) => (
                    <React.Fragment key={semIdx}>
                      <tr className="bg-[#f0f4f8] font-bold text-[#10385c]">
                        <td colSpan={15} className="border border-[#808080] py-1 text-center tracking-wider text-[11px] sm:text-[12px]">
                          {sem.semName}
                        </td>
                      </tr>

                      {sem.subjects?.map((sub, subIdx) => (
                        <tr key={subIdx} className="hover:bg-[#fbfcfd] bg-white transition-colors">
                          <td className="border border-[#808080] py-1 px-1 text-center font-mono">{sub.code}</td>
                          <td className="border border-[#808080] py-1 px-2 text-center">{sub.name}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sub.maxCredits}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sub.mid1}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sub.mid2}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sub.internal}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sub.endSem}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center font-semibold">{sub.total}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center font-medium">{sub.grade}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sub.gradePoints}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sub.creditsEarned}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sub.totalGradePoints}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sub.rs}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center text-[10px]">{sub.examMonthYear}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center font-bold text-[#14532d]">
                            {sub.examStatus}
                          </td>
                        </tr>
                      ))}

                      {sem.rubrics && (
                        <tr className="bg-white">
                          <td className="border border-[#808080] py-1 px-1 text-center font-medium">Rubrics</td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sem.rubrics.maxCredits}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">-</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">-</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">-</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">-</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">-</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">-</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">-</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sem.rubrics.creditsEarned}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">-</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">R</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">-</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">-</td>
                        </tr>
                      )}

                      {sem.semesterTotal && (
                        <tr className="bg-[#f9fafb] font-semibold text-[#222]">
                          <td className="border border-[#808080] py-1 px-1 text-center">Semester Total</td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sem.semesterTotal.maxCredits}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sem.semesterTotal.creditsEarned}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center">{sem.semesterTotal.totalGradePoints}</td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                          <td className="border border-[#808080] py-1 px-1 text-center"></td>
                        </tr>
                      )}

                      {sem.sgpa && (
                        <tr className="bg-white font-medium text-[#444]">
                          <td colSpan={15} className="border border-[#808080] py-1 text-center text-[10px] sm:text-[11px]">
                            {sem.sgpa}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}

                  <tr className="bg-[#f0f4f8] font-bold text-[#222]">
                    <td className="border border-[#808080] py-1 px-1 text-center">Course Total</td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                    <td className="border border-[#808080] py-1 px-1 text-center">{cgpa.totalCredits}</td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                    <td className="border border-[#808080] py-1 px-1 text-center">{cgpa.creditsGained}</td>
                    <td className="border border-[#808080] py-1 px-1 text-center">{cgpa.totalGainedPoints}</td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                    <td className="border border-[#808080] py-1 px-1 text-center"></td>
                  </tr>

                  <tr className="bg-white font-medium text-[#222]">
                    <td colSpan={11} className="border border-[#808080] py-1.5 px-2 text-right">
                      Cummulative Grade Point Average(CGPA) ({cgpa.cgpaFormula || "SGPA/Credits"})
                    </td>
                    <td className="border border-[#808080] py-1.5 px-2 text-center font-bold text-[#10385c]">
                      {cgpa.cgpa}
                    </td>
                    <td colSpan={3} className="border border-[#808080] py-1.5 px-2 text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Abbreviations */}
            <div className="mt-4 pt-2 text-[10px] sm:text-[11px] text-[#444] leading-relaxed border-t border-gray-200">
              <p className="font-bold text-[#222] mb-1">Abbreviations</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1">
                <div><strong>R</strong> - RegularExam</div>
                <div><strong>S</strong> - Supplementary Exam</div>
                <div><strong>P</strong> - Pass</div>
                <div><strong>F</strong> - Fail</div>
                <div><strong>MP</strong> - MalPractice</div>
                <div><strong>W</strong> - Wanting</div>
                <div><strong>UE</strong> - Under Evaluation</div>
              </div>
              <div className="mt-3 text-[10px] text-[#666]">
                {new Date().toString()}
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 8mm;
          }

          body * {
            visibility: hidden;
          }

          #results-history-marks-card, 
          #results-history-marks-card * {
            visibility: visible;
          }

          #results-history-marks-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .overflow-x-auto {
            overflow: visible !important;
          }

          #results-history-marks-card table {
            width: 100% !important;
            font-size: 8.5px !important;
            table-layout: auto !important;
          }

          #results-history-marks-card th,
          #results-history-marks-card td {
            padding: 2px 3px !important;
            min-width: auto !important;
            word-break: break-word;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}