// import { useEffect, useState, useRef } from "react";
// import api, { apiErrorMessage } from "../../api/client";
// import GovLoader from "../../components/GovLoader";

// const QUICK_SUGGESTIONS = [
//   {
//     title: "Binary Search in C",
//     subject: "CS-204",
//     name: "Data Structures",
//     topic: "Searching Algorithms",
//     q: "Explain the Binary Search algorithm in C language with time complexity and step-by-step dry run on an array.",
//   },
//   {
//     title: "Thevenin's Theorem",
//     subject: "EE-104",
//     name: "Basic Electrical",
//     topic: "Circuit Analysis",
//     q: "State and prove Thevenin's Theorem with a step-by-step example of finding Vth and Rth in a DC circuit.",
//   },
//   {
//     title: "Otto vs Diesel Cycle",
//     subject: "ME-302",
//     name: "Thermal Engineering",
//     topic: "Thermodynamic Cycles",
//     q: "Compare the Otto Cycle and Diesel Cycle with P-V and T-S diagrams and efficiency formulas.",
//   },
//   {
//     title: "RCC Beam Design",
//     subject: "CE-401",
//     name: "Design of Structures",
//     topic: "Flexure in Beams",
//     q: "Explain the design steps for a singly reinforced rectangular RCC beam under limit state method.",
//   },
// ];

// function renderInlineText(line, keyPrefix) {
//   const tokens = [];
//   const regex = /(\*\*(.+?)\*\*|`(.+?)`)/g;
//   let lastIndex = 0;
//   let match;
//   let idx = 0;
//   while ((match = regex.exec(line)) !== null) {
//     if (match.index > lastIndex) tokens.push(line.slice(lastIndex, match.index));
//     if (match[2] !== undefined) {
//       tokens.push(
//         <strong key={`${keyPrefix}-b-${idx++}`} className="font-semibold text-gray-900">
//           {match[2]}
//         </strong>
//       );
//     } else if (match[3] !== undefined) {
//       tokens.push(
//         <code key={`${keyPrefix}-c-${idx++}`} className="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded text-[0.85em] font-mono border border-gray-200">
//           {match[3]}
//         </code>
//       );
//     }
//     lastIndex = regex.lastIndex;
//   }
//   if (lastIndex < line.length) tokens.push(line.slice(lastIndex));
//   return tokens;
// }

// /** Minimal markdown renderer for AI answers: headers, bold/code, lists, tables, code fences, blockquotes. */
// function MarkdownLite({ text }) {
//   if (!text) return null;
//   const lines = text.replace(/\r\n/g, "\n").split("\n");
//   const blocks = [];
//   let i = 0;
//   let key = 0;

//   const isBlockStart = (l) =>
//     l.trim() === "" ||
//     l.trim().startsWith("```") ||
//     /^#{1,6}\s+/.test(l) ||
//     /^(-{3,}|\*{3,})$/.test(l.trim()) ||
//     l.trim().startsWith("|") ||
//     l.trim().startsWith(">") ||
//     /^[-*]\s+/.test(l.trim()) ||
//     /^\d+\.\s+/.test(l.trim());

//   while (i < lines.length) {
//     const line = lines[i];

//     if (line.trim() === "") {
//       i++;
//       continue;
//     }

//     // fenced code block
//     if (line.trim().startsWith("```")) {
//       const codeLines = [];
//       i++;
//       while (i < lines.length && !lines[i].trim().startsWith("```")) {
//         codeLines.push(lines[i]);
//         i++;
//       }
//       i++;
//       blocks.push(
//         <pre key={key++} className="bg-gray-50 border border-gray-300 rounded-lg p-3 overflow-x-auto text-[12px] leading-relaxed my-2">
//           <code className="font-mono text-emerald-700 whitespace-pre">{codeLines.join("\n")}</code>
//         </pre>
//       );
//       continue;
//     }

//     // horizontal rule
//     if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
//       blocks.push(<hr key={key++} className="border-gray-300 my-4" />);
//       i++;
//       continue;
//     }

//     // headers
//     const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
//     if (headerMatch) {
//       const level = headerMatch[1].length;
//       const sizeClass = level <= 2 ? "text-base" : level === 3 ? "text-sm" : "text-xs";
//       blocks.push(
//         <div key={key++} className={`${sizeClass} font-bold text-gov-navy mt-4 mb-1.5 first:mt-0`}>
//           {renderInlineText(headerMatch[2], `h${key}`)}
//         </div>
//       );
//       i++;
//       continue;
//     }

//     // table
//     if (line.trim().startsWith("|")) {
//       const tableLines = [];
//       while (i < lines.length && lines[i].trim().startsWith("|")) {
//         tableLines.push(lines[i]);
//         i++;
//       }
//       const rows = tableLines.map((l) =>
//         l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim())
//       );
//       const headerRow = rows[0];
//       let bodyRows = rows.slice(1);
//       if (bodyRows.length && /^[-:\s]+$/.test(bodyRows[0].join(""))) {
//         bodyRows = bodyRows.slice(1);
//       }
//       blocks.push(
//         <div key={key++} className="overflow-x-auto my-3 rounded-lg border border-gray-300">
//           <table className="w-full text-[12px] border-collapse">
//             <thead>
//               <tr>
//                 {headerRow.map((c, ci) => (
//                   <th key={ci} className="text-left font-semibold text-gray-700 bg-gray-100 px-2.5 py-1.5 border-b border-gray-300">
//                     {renderInlineText(c, `th${ci}`)}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {bodyRows.map((r, ri) => (
//                 <tr key={ri} className={ri % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                   {r.map((c, ci) => (
//                     <td key={ci} className="text-gray-700 px-2.5 py-1.5 align-top border-b border-gray-200">
//                       {renderInlineText(c, `td${ri}-${ci}`)}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//       continue;
//     }

//     // blockquote
//     if (line.trim().startsWith(">")) {
//       const quoteLines = [];
//       while (i < lines.length && lines[i].trim().startsWith(">")) {
//         quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
//         i++;
//       }
//       blocks.push(
//         <blockquote key={key++} className="border-l-2 border-blue-400 pl-3 my-2 text-gray-600 italic text-[13px]">
//           {quoteLines.map((q, qi) => (
//             <div key={qi}>{renderInlineText(q, `q${qi}`)}</div>
//           ))}
//         </blockquote>
//       );
//       continue;
//     }

//     // unordered list
//     if (/^[-*]\s+/.test(line.trim())) {
//       const items = [];
//       while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
//         items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
//         i++;
//       }
//       blocks.push(
//         <ul key={key++} className="list-disc list-outside pl-5 space-y-1 my-2 text-gray-700 text-[13px]">
//           {items.map((it, ii) => (
//             <li key={ii}>{renderInlineText(it, `ul${ii}`)}</li>
//           ))}
//         </ul>
//       );
//       continue;
//     }

//     // ordered list
//     if (/^\d+\.\s+/.test(line.trim())) {
//       const items = [];
//       while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
//         items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
//         i++;
//       }
//       blocks.push(
//         <ol key={key++} className="list-decimal list-outside pl-5 space-y-1 my-2 text-gray-700 text-[13px]">
//           {items.map((it, ii) => (
//             <li key={ii}>{renderInlineText(it, `ol${ii}`)}</li>
//           ))}
//         </ol>
//       );
//       continue;
//     }

//     // paragraph — gather consecutive plain lines
//     const paraLines = [];
//     while (i < lines.length && !isBlockStart(lines[i])) {
//       paraLines.push(lines[i]);
//       i++;
//     }
//     blocks.push(
//       <p key={key++} className="text-gray-700 text-[13px] leading-relaxed my-1.5">
//         {paraLines.map((l, li) => (
//           <span key={li}>
//             {renderInlineText(l, `p${li}`)}
//             {li < paraLines.length - 1 && <br />}
//           </span>
//         ))}
//       </p>
//     );
//   }

//   return <div>{blocks}</div>;
// }

// export default function DoubtsPage() {
//   const [doubts, setDoubts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [searchHistory, setSearchHistory] = useState("");

//   const [activeDoubt, setActiveDoubt] = useState(null);

//   // Form inputs
//   const [subjectCode, setSubjectCode] = useState("CS-304");
//   const [subjectName, setSubjectName] = useState("Core Diploma Subject");
//   const [topic, setTopic] = useState("");
//   const [questionText, setQuestionText] = useState("");

//   // Attachments (Image and PDF)
//   const [attachedFile, setAttachedFile] = useState(null);
//   const [imageUrlInput, setImageUrlInput] = useState("");
//   const [showAttachModal, setShowAttachModal] = useState(false);
//   const [copiedId, setCopiedId] = useState(null);

//   const chatEndRef = useRef(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     let isMounted = true;
//     api
//       .get("/doubts/my")
//       .then((res) => {
//         if (!isMounted) return;
//         const list = Array.isArray(res.data) ? res.data : [];
//         setDoubts(list);
//         if (list.length > 0) {
//           setActiveDoubt(list[0]);
//         }
//       })
//       .catch((err) => {
//         if (isMounted) setError(apiErrorMessage(err, "Could not load doubt history."));
//       })
//       .finally(() => {
//         if (isMounted) setLoading(false);
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeDoubt, submitting]);

//   function handleFileUpload(e) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
//     const isImage = file.type.startsWith("image/");

//     const reader = new FileReader();
//     reader.onload = (uploadEvent) => {
//       setAttachedFile({
//         name: file.name,
//         size: (file.size / 1024).toFixed(1) + " KB",
//         type: file.type,
//         dataUrl: uploadEvent.target?.result,
//         isPdf,
//         isImage,
//       });
//       setImageUrlInput(isImage ? String(uploadEvent.target?.result) : `[Attached Document: ${file.name}]`);
//       setShowAttachModal(false);
//     };
//     reader.readAsDataURL(file);
//   }

//   function applySuggestion(sug) {
//     setSubjectCode(sug.subject);
//     setSubjectName(sug.name);
//     setTopic(sug.topic);
//     setQuestionText(sug.q);
//     setActiveDoubt(null);
//   }

//   async function handleSend(e) {
//     if (e) e.preventDefault();
//     if (!questionText.trim()) return;

//     setSubmitting(true);
//     setError("");

//     const payload = {
//       subjectCode: subjectCode.trim() || "DIPLOMA",
//       subjectName: subjectName.trim() || "Engineering Subject",
//       topic: topic.trim() || "General Technical Doubt",
//       questionText: questionText.trim(),
//       imageUrl: imageUrlInput.trim() || (attachedFile?.isPdf ? `[Attached PDF: ${attachedFile.name}]` : ""),
//     };

//     const tempDoubt = {
//       id: Date.now(),
//       ...payload,
//       createdAt: new Date().toISOString(),
//       aiSolution: null,
//       attachedFilePreview: attachedFile,
//     };
//     setActiveDoubt(tempDoubt);

//     try {
//       const res = await api.post("/doubts/ask", payload);
//       const solvedDoubt = { ...res.data, attachedFilePreview: attachedFile };
//       setDoubts((prev) => [solvedDoubt, ...(prev || [])]);
//       setActiveDoubt(solvedDoubt);
//       setQuestionText("");
//       setAttachedFile(null);
//       setImageUrlInput("");
//     } catch (err) {
//       setError(apiErrorMessage(err, "AI Subject Mentor could not generate an answer right now. Please try again."));
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   function handleCopy(text, id) {
//     navigator.clipboard.writeText(text);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 2000);
//   }

//   const filteredHistory = doubts.filter(
//     (d) =>
//       !searchHistory.trim() ||
//       (d.questionText && d.questionText.toLowerCase().includes(searchHistory.toLowerCase())) ||
//       (d.subjectCode && d.subjectCode.toLowerCase().includes(searchHistory.toLowerCase())) ||
//       (d.subjectName && d.subjectName.toLowerCase().includes(searchHistory.toLowerCase()))
//   );

//   if (loading) {
//     return (
//       <div className="my-2 h-[calc(100vh-140px)] min-h-[580px] flex items-center justify-center bg-white border border-gray-300 rounded-xl">
//         <GovLoader size={60} />
//       </div>
//     );
//   }

//   return (
//     <div className="my-2 h-[calc(100vh-140px)] min-h-[580px] flex flex-col md:flex-row bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden text-gray-800">
//       {/* 1. Left History Sidebar */}
//       <div className="w-full md:w-72 bg-gray-50 border-r border-gray-300 flex flex-col justify-between shrink-0">
//         {/* Top: New Chat + Search */}
//         <div className="p-3 border-b border-gray-300 space-y-2">
//           <button
//             onClick={() => {
//               setActiveDoubt(null);
//               setQuestionText("");
//               setAttachedFile(null);
//               setImageUrlInput("");
//             }}
//             className="w-full bg-gov-navy hover:bg-[#0b3b60] text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
//           >
//             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//             </svg>
//             New Doubt Session
//           </button>

//           <input
//             className="w-full bg-white border border-gray-300 focus:border-blue-500 outline-none text-gray-800 placeholder-gray-400 text-xs py-1.5 px-2.5 rounded-lg"
//             placeholder="Search past doubts…"
//             value={searchHistory}
//             onChange={(e) => setSearchHistory(e.target.value)}
//           />
//         </div>

//         {/* History List */}
//         <div className="flex-1 overflow-y-auto p-2 space-y-1">
//           <div className="text-[10px] uppercase font-bold text-gray-500 px-2 py-1 tracking-wider">
//             Doubt History ({doubts.length})
//           </div>

//           {filteredHistory.length === 0 ? (
//             <div className="text-center py-8 text-xs text-gray-500 px-3">
//               No doubt queries found. Start a new session!
//             </div>
//           ) : (
//             filteredHistory.map((d) => {
//               const isSelected = activeDoubt?.id === d.id;
//               return (
//                 <button
//                   key={d.id}
//                   onClick={() => setActiveDoubt(d)}
//                   className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex flex-col gap-1 border ${
//                     isSelected
//                       ? "bg-blue-50 border-blue-300 text-gray-900"
//                       : "border-transparent hover:bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-mono font-bold text-[10px] text-blue-700">
//                       {d.subjectCode || "POLY"}
//                     </span>
//                     <span className="text-[9px] text-gray-400">
//                       {d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ""}
//                     </span>
//                   </div>
//                   <p className="line-clamp-2 text-[11px] leading-tight">
//                     {d.questionText}
//                   </p>
//                 </button>
//               );
//             })
//           )}
//         </div>

//         {/* Bottom Sidebar Info */}
//         <div className="p-3 border-t border-gray-300 bg-gray-50 text-[10px] text-gray-500">
//           <div className="font-bold text-gray-700">PolyConnect AI Doubt Solver</div>
//           <div>Supports Text, Images and PDF queries</div>
//         </div>
//       </div>

//       {/* 2. Central Conversation & Answering Area */}
//       <div className="flex-1 flex flex-col justify-between bg-white relative">
//         {/* Top Chat Subject Header Bar */}
//         <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-300 flex flex-wrap items-center justify-between gap-3 text-xs">
//           <div className="flex items-center gap-2">
//             <span className="font-mono font-bold bg-gov-navy text-white px-2 py-0.5 rounded-md text-[11px]">
//               {subjectCode || "SUBJECT"}
//             </span>
//             <span className="font-semibold text-gray-700">
//               {topic ? `${topic} • ` : ""}
//               {subjectName}
//             </span>
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
//               AI Mentor Ready
//             </span>
//           </div>
//         </div>

//         {/* Conversation Stream */}
//         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white">
//           {!activeDoubt ? (
//             /* Welcome Empty State — centered */
//             <div className="h-full flex flex-col items-center justify-center text-center px-4">
//               <div className="relative max-w-2xl mx-auto space-y-8">
//                 <div className="relative space-y-3">
//                   <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-gov-navy mx-auto flex items-center justify-center">
//                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                     </svg>
//                   </div>
//                   <h2 className="font-bold text-2xl sm:text-3xl text-gov-navy tracking-tight">
//                     What's on your mind today?
//                   </h2>
//                   <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
//                     Ask any diploma subject query below. Attach circuit diagrams, question papers, notes,
//                     or full PDFs for instant step-by-step solutions.
//                   </p>
//                 </div>

//                 {/* Suggestion Chips */}
//                 <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
//                   {QUICK_SUGGESTIONS.map((sug, i) => (
//                     <button
//                       key={i}
//                       onClick={() => applySuggestion(sug)}
//                       className="p-3.5 bg-white border border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all text-xs group flex flex-col justify-between shadow-sm"
//                     >
//                       <div className="font-bold text-gray-800 group-hover:text-blue-700 flex items-center justify-between mb-1">
//                         <span>{sug.title}</span>
//                         <span className="text-[10px] font-mono text-gray-400">{sug.subject}</span>
//                       </div>
//                       <p className="text-[11px] text-gray-500 line-clamp-2">{sug.q}</p>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             /* Active Doubt Q&A Thread */
//             <div className="max-w-3xl mx-auto space-y-6">
//               {/* User Question Bubble */}
//               <div className="flex items-start justify-end gap-3">
//                 <div className="bg-gov-navy text-white p-4 rounded-2xl rounded-tr-sm max-w-[85%] text-xs md:text-sm leading-relaxed shadow-sm">
//                   <div className="flex items-center gap-2 mb-1.5 opacity-80 text-[10px] font-mono">
//                     <span className="font-bold">{activeDoubt.subjectCode}</span>
//                     <span>•</span>
//                     <span>{activeDoubt.topic || activeDoubt.subjectName}</span>
//                   </div>
//                   <p className="whitespace-pre-wrap font-medium">{activeDoubt.questionText}</p>

//                   {/* Attached Image or PDF Preview */}
//                   {activeDoubt.imageUrl && (
//                     <div className="mt-3 pt-2 border-t border-white/20">
//                       {activeDoubt.imageUrl.startsWith("data:image") ||
//                       activeDoubt.imageUrl.startsWith("http") ? (
//                         <div className="space-y-1">
//                           <span className="text-[10px] opacity-80 block">Attached Image:</span>
//                           <img
//                             src={activeDoubt.imageUrl}
//                             alt="Attached question reference"
//                             className="max-h-48 rounded-lg border border-white/30 bg-black/10 object-contain"
//                           />
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg text-[11px]">
//                           <svg className="w-4 h-4 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
//                           </svg>
//                           <span className="font-mono truncate">{activeDoubt.imageUrl}</span>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 text-gray-600 flex items-center justify-center font-bold text-xs shrink-0">
//                   U
//                 </div>
//               </div>

//               {/* AI Assistant Answer Bubble */}
//               <div className="flex items-start gap-3">
//                 <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
//                   AI
//                 </div>

//                 <div className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl rounded-tl-sm p-5 text-xs md:text-sm leading-relaxed space-y-3">
//                   <div className="flex items-center justify-between border-b border-gray-300 pb-2">
//                     <span className="font-bold text-xs text-gray-600 uppercase tracking-wider">
//                       Detailed Solution & Concept Explanation
//                     </span>

//                     {activeDoubt.aiSolution && (
//                       <button
//                         onClick={() => handleCopy(activeDoubt.aiSolution, activeDoubt.id)}
//                         className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 hover:underline flex items-center gap-1"
//                       >
//                         {copiedId === activeDoubt.id ? "Copied" : "Copy Solution"}
//                       </button>
//                     )}
//                   </div>

//                   {submitting && !activeDoubt.aiSolution ? (
//                     <div className="py-6 flex flex-col items-center justify-center gap-2 text-xs text-gray-500">
//                       <GovLoader size={42} label="" />
//                       <span>Generating step-by-step answer…</span>
//                     </div>
//                   ) : activeDoubt.aiSolution ? (
//                     <div className="font-sans">
//                       <MarkdownLite text={activeDoubt.aiSolution} />
//                     </div>
//                   ) : (
//                     <div className="text-xs text-gray-500">
//                       No solution received for this query yet.
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//           <div ref={chatEndRef} />
//         </div>

//         {/* 3. Bottom Prompt Input Bar */}
//         <div className="p-3 bg-gray-50 border-t border-gray-300">
//           {error && (
//             <div className="bg-red-50 border border-red-300 text-red-700 text-xs p-2.5 rounded-lg mb-2">
//               {error}
//             </div>
//           )}

//           {/* Attachment Preview Chip */}
//           {attachedFile && (
//             <div className="flex items-center gap-2 bg-blue-50 border border-blue-300 px-3 py-1.5 rounded-lg text-xs text-blue-800 mb-2 w-max">
//               <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
//               </svg>
//               <span className="font-semibold truncate max-w-xs">{attachedFile.name}</span>
//               <span className="text-[10px] text-blue-600/70">({attachedFile.size})</span>
//               <button
//                 onClick={() => {
//                   setAttachedFile(null);
//                   setImageUrlInput("");
//                 }}
//                 className="text-red-600 font-bold hover:text-red-700 ml-2"
//                 title="Remove attachment"
//               >
//                 &times;
//               </button>
//             </div>
//           )}

//           <form onSubmit={handleSend} className="space-y-2 max-w-3xl mx-auto w-full">
//             {/* Quick Subject row */}
//             <div className="flex flex-wrap items-center gap-2 text-xs">
//               <input
//                 className="bg-white border border-gray-300 focus:border-blue-500 outline-none text-gray-800 placeholder-gray-400 w-28 text-xs py-1.5 px-2.5 font-mono uppercase rounded-lg"
//                 placeholder="Code (CS-304)"
//                 value={subjectCode}
//                 onChange={(e) => setSubjectCode(e.target.value.toUpperCase())}
//                 required
//               />
//               <input
//                 className="bg-white border border-gray-300 focus:border-blue-500 outline-none text-gray-800 placeholder-gray-400 flex-1 min-w-[140px] text-xs py-1.5 px-2.5 rounded-lg"
//                 placeholder="Subject Name (e.g. Microprocessors)"
//                 value={subjectName}
//                 onChange={(e) => setSubjectName(e.target.value)}
//                 required
//               />
//               <input
//                 className="bg-white border border-gray-300 focus:border-blue-500 outline-none text-gray-800 placeholder-gray-400 flex-1 min-w-[120px] text-xs py-1.5 px-2.5 rounded-lg"
//                 placeholder="Topic / Unit (Optional)"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//               />
//             </div>

//             {/* Input Pill with Attachment Button and Send Icon */}
//             <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-3xl px-2 py-1.5 focus-within:border-blue-500 transition-colors">
//               {/* Paperclip Attachment Button */}
//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 title="Attach Image or PDF document"
//                 className="w-9 h-9 shrink-0 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//                 </svg>
//               </button>

//               {/* Hidden File Input for Image & PDF */}
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileUpload}
//                 accept="image/*,application/pdf"
//                 className="hidden"
//               />

//               {/* URL trigger */}
//               <button
//                 type="button"
//                 onClick={() => setShowAttachModal(!showAttachModal)}
//                 title="Paste image URL"
//                 className="text-[11px] font-bold text-blue-700 hover:text-blue-800 px-1 hidden sm:inline shrink-0"
//               >
//                 URL Link
//               </button>

//               {/* Text Input */}
//               <textarea
//                 className="flex-1 bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none resize-none min-h-[36px] max-h-32 py-2 leading-snug"
//                 rows={1}
//                 placeholder="Ask technical question or numerical problem… (Press Enter to Send)"
//                 value={questionText}
//                 onChange={(e) => setQuestionText(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && !e.shiftKey) {
//                     e.preventDefault();
//                     handleSend();
//                   }
//                 }}
//                 required
//               />

//               {/* Send Button */}
//               <button
//                 type="submit"
//                 disabled={submitting || !questionText.trim()}
//                 className="w-9 h-9 shrink-0 flex items-center justify-center bg-gov-navy hover:bg-[#0b3b60] disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-full transition-colors shadow-sm"
//                 title="Send doubt to AI Mentor"
//               >
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                 </svg>
//               </button>
//             </div>

//             {/* Modal for pasting direct image / doc URL */}
//             {showAttachModal && (
//               <div className="bg-white border border-gray-300 p-2.5 rounded-lg flex items-center gap-2 text-xs shadow-sm">
//                 <input
//                   className="flex-1 bg-gray-50 border border-gray-300 focus:border-blue-500 outline-none text-gray-800 placeholder-gray-400 text-xs py-1.5 px-2.5 rounded-lg"
//                   placeholder="Paste direct Image URL (e.g. https://example.com/circuit.png)"
//                   value={imageUrlInput}
//                   onChange={(e) => setImageUrlInput(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowAttachModal(false)}
//                   className="bg-gov-navy hover:bg-[#0b3b60] text-white text-xs py-1.5 px-3 rounded-lg font-semibold shrink-0"
//                 >
//                   Attach
//                 </button>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



















































import { useEffect, useState, useRef } from "react";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";
import katex from "katex";
import "katex/dist/katex.min.css";

const QUICK_SUGGESTIONS = [
  {
    title: "Binary Search in C",
    subject: "CS-204",
    name: "Data Structures",
    topic: "Searching Algorithms",
    q: "Explain the Binary Search algorithm in C language with time complexity and step-by-step dry run on an array.",
  },
  {
    title: "Thevenin's Theorem",
    subject: "EE-104",
    name: "Basic Electrical",
    topic: "Circuit Analysis",
    q: "State and prove Thevenin's Theorem with a step-by-step example of finding Vth and Rth in a DC circuit.",
  },
  {
    title: "Otto vs Diesel Cycle",
    subject: "ME-302",
    name: "Thermal Engineering",
    topic: "Thermodynamic Cycles",
    q: "Compare the Otto Cycle and Diesel Cycle with P-V and T-S diagrams and efficiency formulas.",
  },
  {
    title: "RCC Beam Design",
    subject: "CE-401",
    name: "Design of Structures",
    topic: "Flexure in Beams",
    q: "Explain the design steps for a singly reinforced rectangular RCC beam under limit state method.",
  },
];

const THINKING_MESSAGES = [
  "Reading your question",
  "Thinking it through",
  "Working out the steps",
  "Almost ready",
];

function ThinkingLoader() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % THINKING_MESSAGES.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-3 flex items-center justify-center gap-2.5">
      <div className="relative w-4 h-4 shrink-0">
        <div className="absolute inset-0 rounded-full border-2 border-emerald-200"></div>
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
      </div>
      <span className="text-xs font-medium text-gray-500 tracking-wide">
        {THINKING_MESSAGES[msgIndex]}
        <span className="inline-block w-4 text-left">
          <span className="animate-pulse">…</span>
        </span>
      </span>
    </div>
  );
}

function renderMath(expr, displayMode) {
  try {
    return katex.renderToString(expr, {
      throwOnError: false,
      displayMode,
    });
  } catch {
    return expr;
  }
}

function renderInlineText(line, keyPrefix) {
  const tokens = [];
  const regex = /(\*\*(.+?)\*\*|`(.+?)`|\$\$(.+?)\$\$|\$(.+?)\$)/g;
  let lastIndex = 0;
  let match;
  let idx = 0;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) tokens.push(line.slice(lastIndex, match.index));
    if (match[2] !== undefined) {
      tokens.push(
        <strong key={`${keyPrefix}-b-${idx++}`} className="font-semibold text-gray-900">
          {match[2]}
        </strong>
      );
    } else if (match[3] !== undefined) {
      tokens.push(
        <code key={`${keyPrefix}-c-${idx++}`} className="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded text-[0.85em] font-mono border border-gray-200">
          {match[3]}
        </code>
      );
    } else if (match[4] !== undefined) {
      tokens.push(
        <span
          key={`${keyPrefix}-m-${idx++}`}
          dangerouslySetInnerHTML={{ __html: renderMath(match[4], false) }}
        />
      );
    } else if (match[5] !== undefined) {
      tokens.push(
        <span
          key={`${keyPrefix}-m-${idx++}`}
          dangerouslySetInnerHTML={{ __html: renderMath(match[5], false) }}
        />
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < line.length) tokens.push(line.slice(lastIndex));
  return tokens;
}

/** Minimal markdown renderer for AI answers: headers, bold/code, lists, tables, code fences, blockquotes, KaTeX math. */
function MarkdownLite({ text }) {
  if (!text) return null;
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;
  let key = 0;

  const isBlockStart = (l) =>
    l.trim() === "" ||
    l.trim().startsWith("```") ||
    /^#{1,6}\s+/.test(l) ||
    /^(-{3,}|\*{3,})$/.test(l.trim()) ||
    /^\$\$(.+)\$\$$/.test(l.trim()) ||
    l.trim().startsWith("|") ||
    l.trim().startsWith(">") ||
    /^[-*]\s+/.test(l.trim()) ||
    /^\d+\.\s+/.test(l.trim());

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.trim().startsWith("```")) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre key={key++} className="bg-gray-50 border border-gray-300 rounded-lg p-3 overflow-x-auto text-[12px] leading-relaxed my-2">
          <code className="font-mono text-emerald-700 whitespace-pre">{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    const blockMathMatch = line.trim().match(/^\$\$(.+)\$\$$/);
    if (blockMathMatch) {
      blocks.push(
        <div
          key={key++}
          className="my-3 overflow-x-auto text-sm"
          dangerouslySetInnerHTML={{ __html: renderMath(blockMathMatch[1], true) }}
        />
      );
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push(<hr key={key++} className="border-gray-300 my-4" />);
      i++;
      continue;
    }

    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const sizeClass = level <= 2 ? "text-base" : level === 3 ? "text-sm" : "text-xs";
      blocks.push(
        <div key={key++} className={`${sizeClass} font-bold text-gov-navy mt-4 mb-1.5 first:mt-0`}>
          {renderInlineText(headerMatch[2], `h${key}`)}
        </div>
      );
      i++;
      continue;
    }

    if (line.trim().startsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.map((l) =>
        l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim())
      );
      const headerRow = rows[0];
      let bodyRows = rows.slice(1);
      if (bodyRows.length && /^[-:\s]+$/.test(bodyRows[0].join(""))) {
        bodyRows = bodyRows.slice(1);
      }
      blocks.push(
        <div key={key++} className="overflow-x-auto my-3 rounded-lg border border-gray-300">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr>
                {headerRow.map((c, ci) => (
                  <th key={ci} className="text-left font-semibold text-gray-700 bg-gray-100 px-2.5 py-1.5 border-b border-gray-300">
                    {renderInlineText(c, `th${ci}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((r, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  {r.map((c, ci) => (
                    <td key={ci} className="text-gray-700 px-2.5 py-1.5 align-top border-b border-gray-200">
                      {renderInlineText(c, `td${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.trim().startsWith(">")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="border-l-2 border-blue-400 pl-3 my-2 text-gray-600 italic text-[13px]">
          {quoteLines.map((q, qi) => (
            <div key={qi}>{renderInlineText(q, `q${qi}`)}</div>
          ))}
        </blockquote>
      );
      continue;
    }

    if (/^[-*]\s+/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc list-outside pl-5 space-y-1 my-2 text-gray-700 text-[13px]">
          {items.map((it, ii) => (
            <li key={ii}>{renderInlineText(it, `ul${ii}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="list-decimal list-outside pl-5 space-y-1 my-2 text-gray-700 text-[13px]">
          {items.map((it, ii) => (
            <li key={ii}>{renderInlineText(it, `ol${ii}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    const paraLines = [];
    while (i < lines.length && !isBlockStart(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="text-gray-700 text-[13px] leading-relaxed my-1.5">
        {paraLines.map((l, li) => (
          <span key={li}>
            {renderInlineText(l, `p${li}`)}
            {li < paraLines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  }

  return <div>{blocks}</div>;
}

export default function DoubtsPage() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [activeDoubt, setActiveDoubt] = useState(null);

  const [subjectCode, setSubjectCode] = useState("CS-304");
  const [subjectName, setSubjectName] = useState("Core Diploma Subject");
  const [topic, setTopic] = useState("");
  const [questionText, setQuestionText] = useState("");

  const [attachedFile, setAttachedFile] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/doubts/my")
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res.data) ? res.data : [];
        setDoubts(list);
        if (list.length > 0) {
          setActiveDoubt(list[0]);
        }
      })
      .catch((err) => {
        if (isMounted) setError(apiErrorMessage(err, "Could not load doubt history."));
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeDoubt, submitting]);

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
    const isImage = file.type.startsWith("image/");

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setAttachedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.type,
        dataUrl: uploadEvent.target?.result,
        isPdf,
        isImage,
      });
      setImageUrlInput(isImage ? String(uploadEvent.target?.result) : `[Attached Document: ${file.name}]`);
    };
    reader.readAsDataURL(file);
  }

  function applySuggestion(sug) {
    setSubjectCode(sug.subject);
    setSubjectName(sug.name);
    setTopic(sug.topic);
    setQuestionText(sug.q);
    setActiveDoubt(null);
  }

  async function handleSend(e) {
    if (e) e.preventDefault();
    const trimmedQuestion = questionText.trim();
    if (!trimmedQuestion) return;

    setError("");

    const payload = {
      subjectCode: subjectCode.trim() || "DIPLOMA",
      subjectName: subjectName.trim() || "Engineering Subject",
      topic: topic.trim() || "General Technical Doubt",
      questionText: trimmedQuestion,
      imageUrl: imageUrlInput.trim() || (attachedFile?.isPdf ? `[Attached PDF: ${attachedFile.name}]` : ""),
    };

    const tempId = Date.now();
    const tempDoubt = {
      id: tempId,
      ...payload,
      createdAt: new Date().toISOString(),
      aiSolution: null,
      pending: true,
      attachedFilePreview: attachedFile,
    };

    setQuestionText("");
    const clearedAttachment = attachedFile;
    setAttachedFile(null);
    setImageUrlInput("");
    setDoubts((prev) => [tempDoubt, ...(prev || [])]);
    setActiveDoubt(tempDoubt);
    setSubmitting(true);

    try {
      const res = await api.post("/doubts/ask", payload);
      const solvedDoubt = { ...res.data, attachedFilePreview: clearedAttachment, pending: false };
      setDoubts((prev) => prev.map((d) => (d.id === tempId ? solvedDoubt : d)));
      setActiveDoubt((current) => (current?.id === tempId ? solvedDoubt : current));
    } catch (err) {
      setError(apiErrorMessage(err, "AI Subject Mentor could not generate an answer right now. Please try again."));
      setDoubts((prev) => prev.map((d) => (d.id === tempId ? { ...d, pending: false } : d)));
      setActiveDoubt((current) => (current?.id === tempId ? { ...current, pending: false } : current));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteDoubt(e, doubt) {
    e.stopPropagation(); // don't also trigger selecting the item
    const confirmed = window.confirm("Delete this doubt? This can't be undone.");
    if (!confirmed) return;

    setDeletingId(doubt.id);
    const previousDoubts = doubts;
    const wasActive = activeDoubt?.id === doubt.id;

    // optimistic removal
    setDoubts((prev) => prev.filter((d) => d.id !== doubt.id));
    if (wasActive) setActiveDoubt(null);

    try {
      await api.delete(`/doubts/${doubt.id}`);
    } catch (err) {
      // rollback on failure
      setDoubts(previousDoubts);
      if (wasActive) setActiveDoubt(doubt);
      setError(apiErrorMessage(err, "Could not delete this doubt. Please try again."));
    } finally {
      setDeletingId(null);
    }
  }

  function handleCopy(text, id) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const filteredHistory = doubts.filter(
    (d) =>
      !searchHistory.trim() ||
      (d.questionText && d.questionText.toLowerCase().includes(searchHistory.toLowerCase())) ||
      (d.subjectCode && d.subjectCode.toLowerCase().includes(searchHistory.toLowerCase())) ||
      (d.subjectName && d.subjectName.toLowerCase().includes(searchHistory.toLowerCase()))
  );

  if (loading) {
    return <GovLoader size={60} />;
  }

  return (
    <div className="my-2 h-[calc(100vh-140px)] min-h-[580px] flex flex-col md:flex-row bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden text-gray-800">
      {/* 1. Left History Sidebar */}
      <div className="w-full md:w-72 bg-gray-50 border-r border-gray-300 flex flex-col justify-between shrink-0">
        <div className="p-3 border-b border-gray-300 space-y-2">
          <button
            onClick={() => {
              setActiveDoubt(null);
              setQuestionText("");
              setAttachedFile(null);
              setImageUrlInput("");
            }}
            className="w-full bg-gov-navy hover:bg-[#0b3b60] text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Doubt Session
          </button>

          <input
            className="w-full bg-white border border-gray-300 focus:border-blue-500 outline-none text-gray-800 placeholder-gray-400 text-xs py-1.5 px-2.5 rounded-lg"
            placeholder="Search past doubts…"
            value={searchHistory}
            onChange={(e) => setSearchHistory(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="text-[10px] uppercase font-bold text-gray-500 px-2 py-1 tracking-wider">
            Doubt History ({doubts.length})
          </div>

          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500 px-3">
              No doubt queries found. Start a new session!
            </div>
          ) : (
            filteredHistory.map((d) => {
              const isSelected = activeDoubt?.id === d.id;
              const isDeleting = deletingId === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDoubt(d)}
                  disabled={isDeleting}
                  className={`group w-full text-left p-2.5 rounded-lg text-xs transition-all flex flex-col gap-1 border relative ${
                    isSelected
                      ? "bg-blue-50 border-blue-300 text-gray-900"
                      : "border-transparent hover:bg-gray-100 text-gray-600"
                  } ${isDeleting ? "opacity-40" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-[10px] text-blue-700">
                      {d.subjectCode || "POLY"}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] text-gray-400">
                        {d.pending ? "Generating…" : d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ""}
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleDeleteDoubt(e, d)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") handleDeleteDoubt(e, d);
                        }}
                        title="Delete this doubt"
                        className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-gray-400 hover:text-red-600 transition-opacity p-0.5 rounded"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-8 0v12a2 2 0 002 2h4a2 2 0 002-2V7H8z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <p className="line-clamp-2 text-[11px] leading-tight">
                    {d.questionText}
                  </p>
                </button>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-gray-300 bg-gray-50 text-[10px] text-gray-500">
          <div className="font-bold text-gray-700">PolyConnect AI Doubt Solver</div>
          <div>Supports Text, Images and PDF queries</div>
        </div>
      </div>

      {/* 2. Central Conversation & Answering Area */}
      <div className="flex-1 flex flex-col justify-between bg-white relative">
        <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-300 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold bg-gov-navy text-white px-2 py-0.5 rounded-md text-[11px]">
              {subjectCode || "SUBJECT"}
            </span>
            <span className="font-semibold text-gray-700">
              {topic ? `${topic} • ` : ""}
              {subjectName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              AI Mentor Ready
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white">
          {!activeDoubt ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="relative max-w-2xl mx-auto space-y-8">
                <div className="relative space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-gov-navy mx-auto flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-2xl sm:text-3xl text-gov-navy tracking-tight">
                    What's on your mind today?
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                    Ask any diploma subject query below. Attach circuit diagrams, question papers, notes,
                    or full PDFs for instant step-by-step solutions.
                  </p>
                </div>

                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {QUICK_SUGGESTIONS.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => applySuggestion(sug)}
                      className="p-3.5 bg-white border border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all text-xs group flex flex-col justify-between shadow-sm"
                    >
                      <div className="font-bold text-gray-800 group-hover:text-blue-700 flex items-center justify-between mb-1">
                        <span>{sug.title}</span>
                        <span className="text-[10px] font-mono text-gray-400">{sug.subject}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-2">{sug.q}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-start justify-end gap-3">
                <div className="bg-gov-navy text-white p-4 rounded-2xl rounded-tr-sm max-w-[85%] text-xs md:text-sm leading-relaxed shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5 opacity-80 text-[10px] font-mono">
                    <span className="font-bold">{activeDoubt.subjectCode}</span>
                    <span>•</span>
                    <span>{activeDoubt.topic || activeDoubt.subjectName}</span>
                  </div>
                  <p className="whitespace-pre-wrap font-medium">{activeDoubt.questionText}</p>

                  {activeDoubt.imageUrl && (
                    <div className="mt-3 pt-2 border-t border-white/20">
                      {activeDoubt.imageUrl.startsWith("data:image") ||
                      activeDoubt.imageUrl.startsWith("http") ? (
                        <div className="space-y-1">
                          <span className="text-[10px] opacity-80 block">Attached Image:</span>
                          <img
                            src={activeDoubt.imageUrl}
                            alt="Attached question reference"
                            className="max-h-48 rounded-lg border border-white/30 bg-black/10 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg text-[11px]">
                          <svg className="w-4 h-4 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                          </svg>
                          <span className="font-mono truncate">{activeDoubt.imageUrl}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 text-gray-600 flex items-center justify-center font-bold text-xs shrink-0">
                  U
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  AI
                </div>

                <div className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl rounded-tl-sm p-5 text-xs md:text-sm leading-relaxed space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                    <span className="font-bold text-xs text-gray-600 uppercase tracking-wider">
                      Detailed Solution & Concept Explanation
                    </span>

                    {activeDoubt.aiSolution && (
                      <button
                        onClick={() => handleCopy(activeDoubt.aiSolution, activeDoubt.id)}
                        className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 hover:underline flex items-center gap-1"
                      >
                        {copiedId === activeDoubt.id ? "Copied" : "Copy Solution"}
                      </button>
                    )}
                  </div>

                  {activeDoubt.pending ? (
                    <ThinkingLoader />
                  ) : activeDoubt.aiSolution ? (
                    <div className="font-sans">
                      <MarkdownLite text={activeDoubt.aiSolution} />
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">
                      No solution received for this query yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* 3. Bottom Prompt Input Bar */}
        <div className="p-3 bg-gray-50 border-t border-gray-300">
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 text-xs p-2.5 rounded-lg mb-2">
              {error}
            </div>
          )}

          {attachedFile && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-300 px-3 py-1.5 rounded-lg text-xs text-blue-800 mb-2 w-max">
              <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
              <span className="font-semibold truncate max-w-xs">{attachedFile.name}</span>
              <span className="text-[10px] text-blue-600/70">({attachedFile.size})</span>
              <button
                onClick={() => {
                  setAttachedFile(null);
                  setImageUrlInput("");
                }}
                className="text-red-600 font-bold hover:text-red-700 ml-2"
                title="Remove attachment"
              >
                &times;
              </button>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-2 max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-3xl px-2 py-1.5 focus-within:border-blue-500 transition-colors">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach Image or PDF document"
                className="w-9 h-9 shrink-0 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*,application/pdf"
                className="hidden"
              />

              <textarea
                className="flex-1 bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none resize-none min-h-[36px] max-h-32 py-2 leading-snug"
                rows={1}
                placeholder="Ask technical question or numerical problem… (Press Enter to Send)"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                required
              />

              <button
                type="submit"
                disabled={!questionText.trim()}
                className="w-9 h-9 shrink-0 flex items-center justify-center bg-gov-navy hover:bg-[#0b3b60] disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-full transition-colors shadow-sm"
                title="Send doubt to AI Mentor"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}