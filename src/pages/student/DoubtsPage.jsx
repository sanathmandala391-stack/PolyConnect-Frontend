import { useEffect, useState, useRef } from "react";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";
import katex from "katex";
import "katex/dist/katex.min.css";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Candidate models for highest availability
const CANDIDATE_MODELS = [
  "gemini-3.6-flash",
  "gemini-flash-latest",
  "gemini-3.5-flash-lite",
];

const QUICK_SUGGESTIONS = [
  {
    title: "Binary Search in C",
    name: "Data Structures & Algorithms",
    q: "Explain the Binary Search algorithm in C language with time complexity, algorithm steps, and a step-by-step dry run on an array.",
  },
  {
    title: "Thevenin's Theorem",
    name: "Basic Electrical Engineering",
    q: "State and prove Thevenin's Theorem with circuit reduction steps and a worked numerical example finding Vth and Rth.",
  },
  {
    title: "Otto vs Diesel Cycle",
    name: "Thermal Engineering",
    q: "Compare the Otto Cycle and Diesel Cycle with P-V and T-S diagrams, air standard efficiency derivations, and key differences.",
  },
  {
    title: "RCC Beam Design",
    name: "Design of Structures",
    q: "Explain the step-by-step design procedure for a singly reinforced rectangular RCC beam using the Limit State Method according to IS 456.",
  },
  {
    title: "Op-Amp Inverting Amplifier",
    name: "Analog Electronics",
    q: "Derive the closed-loop voltage gain expression for an inverting operational amplifier using virtual ground concept.",
  },
  {
    title: "Coulomb's Law & Gauss Law",
    name: "Engineering Physics",
    q: "State Coulomb's Law and Gauss's Law in electrostatics with equations, SI units, and applications.",
  },
];

const THINKING_MESSAGES = [
  "Analyzing your academic query",
  "Formulating step-by-step solution",
  "Verifying engineering formulas",
  "Preparing comprehensive explanation",
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
    <div className="py-4 flex items-center justify-center gap-3">
      <div className="relative w-5 h-5 shrink-0">
        <div className="absolute inset-0 rounded-full border-2 border-emerald-200"></div>
        <div className="absolute inset-0 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin"></div>
      </div>
      <span className="text-xs font-semibold text-emerald-800 tracking-wide">
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

/** Rich markdown renderer for AI answers: headers, bold/code, lists, tables, code fences, blockquotes, KaTeX math. */
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
        <pre key={key++} className="bg-slate-900 text-slate-100 rounded-lg p-3.5 overflow-x-auto text-[12px] leading-relaxed my-3 font-mono">
          <code className="whitespace-pre">{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    const blockMathMatch = line.trim().match(/^\$\$(.+)\$\$$/);
    if (blockMathMatch) {
      blocks.push(
        <div
          key={key++}
          className="my-3 overflow-x-auto text-sm text-center py-2 bg-blue-50/40 rounded border border-blue-100"
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
      const sizeClass = level <= 2 ? "text-base font-bold text-[#003366]" : level === 3 ? "text-sm font-bold text-gray-800" : "text-xs font-bold text-gray-700";
      blocks.push(
        <div key={key++} className={`${sizeClass} mt-4 mb-2 first:mt-0`}>
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
        <div key={key++} className="overflow-x-auto my-3 rounded border border-gray-300">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800">
                {headerRow.map((c, ci) => (
                  <th key={ci} className="text-left font-semibold px-3 py-2 border-b border-gray-300">
                    {renderInlineText(c, `th${ci}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((r, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  {r.map((c, ci) => (
                    <td key={ci} className="text-gray-700 px-3 py-2 align-top border-b border-gray-200">
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
        <blockquote key={key++} className="border-l-4 border-emerald-500 bg-emerald-50/50 pl-3 py-1.5 my-2.5 text-gray-700 italic text-[13px] rounded-r">
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
        <ul key={key++} className="list-disc list-outside pl-5 space-y-1.5 my-2.5 text-gray-700 text-[13px]">
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
        <ol key={key++} className="list-decimal list-outside pl-5 space-y-1.5 my-2.5 text-gray-700 text-[13px]">
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
      <p key={key++} className="text-gray-800 text-[13.5px] leading-relaxed my-2">
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

// Call Gemini API directly for live student responses
async function callGeminiAcademicAI(question, attachedFile) {
  const parts = [];

  const systemPrompt =
    "You are the official State Board of Technical Education and Training (SBTET) Telangana AI Academic Mentor and Doubt Solver on the PolyConnect student portal. " +
    "Your objective is to provide high-quality, step-by-step, pedagogical, and syllabus-aligned explanations for diploma and polytechnic students across all engineering branches (CSE, Civil, ECE, EEE, Mechanical, Automobile, Pharmacy, AI & ML, etc.).\n\n" +
    "Guidelines:\n" +
    "1. **Direct & Accurate Answer**: Start with a concise explanation or answer to the question.\n" +
    "2. **Step-by-Step Concepts / Formulae**: Detail key equations, derivations, algorithm steps, or schematic principles with clear formatting.\n" +
    "3. **Code / Solved Numericals**: When applicable, provide well-commented code blocks (C, C++, Java, Python, HTML/CSS) or numerical calculations with proper units.\n" +
    "4. **Exam Relevance & Key Points**: Conclude with essential points for SBTET board examinations and viva.\n" +
    "5. Format using clean Markdown with bold headers, bullet points, and code fences.";

  if (attachedFile?.dataUrl) {
    const rawData = attachedFile.dataUrl.includes(",")
      ? attachedFile.dataUrl.split(",")[1]
      : attachedFile.dataUrl;

    parts.push({
      inlineData: {
        mimeType: attachedFile.type || (attachedFile.isPdf ? "application/pdf" : "image/jpeg"),
        data: rawData,
      },
    });
  }

  parts.push({
    text: `${systemPrompt}\n\nStudent Academic Question:\n${question}`,
  });

  let lastError = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 2500,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText) {
          return generatedText;
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        lastError = new Error(errData?.error?.message || `HTTP ${response.status}`);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("AI service is busy right now. Please retry shortly.");
}

export default function DoubtsPage() {
  const [doubts, setDoubts] = useState(() => {
    try {
      const cached = localStorage.getItem("pc_doubts_history");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [activeDoubt, setActiveDoubt] = useState(() => {
    try {
      const cached = localStorage.getItem("pc_doubts_history");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [questionText, setQuestionText] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sync with backend on mount
  useEffect(() => {
    let isMounted = true;
    api
      .get("/doubts/my")
      .then((res) => {
        if (!isMounted) return;
        if (Array.isArray(res.data)) {
          setDoubts(res.data);
          if (res.data.length > 0) {
            setActiveDoubt((curr) => {
              if (curr && res.data.some((d) => d.id === curr.id)) {
                return res.data.find((d) => d.id === curr.id);
              }
              return res.data[0];
            });
          }
        }
      })
      .catch((err) => {
        console.warn("Backend doubts load fallback:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("pc_doubts_history", JSON.stringify(doubts));
    } catch {
      // Storage quota
    }
  }, [doubts]);

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
    };
    reader.readAsDataURL(file);
  }

  function applySuggestion(sug) {
    setQuestionText(sug.q);
    setActiveDoubt(null);
  }

  async function handleSend(e) {
    if (e) e.preventDefault();
    const trimmedQuestion = questionText.trim();
    if (!trimmedQuestion || submitting) return;

    setError("");

    const tempId = Date.now();
    const currentAttachment = attachedFile;

    const tempDoubt = {
      id: tempId,
      questionText: trimmedQuestion,
      createdAt: new Date().toISOString(),
      aiSolution: null,
      pending: true,
      attachedFilePreview: currentAttachment,
    };

    setQuestionText("");
    setAttachedFile(null);
    setDoubts((prev) => [tempDoubt, ...(prev || [])]);
    setActiveDoubt(tempDoubt);
    setSubmitting(true);

    try {
      // 1. Call Gemini AI directly with student's doubt
      const aiResponse = await callGeminiAcademicAI(trimmedQuestion, currentAttachment);

      // 2. Prepare payload for Spring Boot backend
      const backendPayload = {
        subjectCode: "DIPLOMA",
        subjectName: "Polytechnic Academic Subject",
        topic: "Academic Doubt",
        questionText: trimmedQuestion,
        aiSolution: aiResponse,
        imageUrl: currentAttachment?.dataUrl
          ? currentAttachment.isImage
            ? currentAttachment.dataUrl
            : `[Attached Document: ${currentAttachment.name}]`
          : "",
      };

      let finalDoubt = {
        id: tempId,
        questionText: trimmedQuestion,
        createdAt: new Date().toISOString(),
        aiSolution: aiResponse,
        pending: false,
        attachedFilePreview: currentAttachment,
      };

      // 3. Store in Spring Boot backend database
      try {
        const res = await api.post("/doubts/ask", backendPayload);
        if (res?.data && res.data.id) {
          finalDoubt = {
            ...res.data,
            aiSolution: res.data.aiSolution || aiResponse,
            attachedFilePreview: currentAttachment,
            pending: false,
          };
        }
      } catch (backendError) {
        console.warn("Backend save notice:", backendError);
      }

      setDoubts((prev) => [
        finalDoubt,
        ...(prev || []).filter((d) => d.id !== tempId && d.id !== finalDoubt.id),
      ]);
      setActiveDoubt(finalDoubt);
    } catch (err) {
      console.error("AI Generation Error:", err);
      setError(
        err?.message ||
          "AI Academic Mentor is currently unavailable. Please check your connection and retry."
      );
      setDoubts((prev) => prev.map((d) => (d.id === tempId ? { ...d, pending: false } : d)));
      setActiveDoubt((curr) => (curr?.id === tempId ? { ...curr, pending: false } : curr));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteDoubt(e, doubt) {
    e.stopPropagation();
    const confirmed = window.confirm("Delete this doubt session?");
    if (!confirmed) return;

    setDeletingId(doubt.id);
    const wasActive = activeDoubt?.id === doubt.id;

    setDoubts((prev) => prev.filter((d) => d.id !== doubt.id));
    if (wasActive) {
      const remaining = doubts.filter((d) => d.id !== doubt.id);
      setActiveDoubt(remaining.length > 0 ? remaining[0] : null);
    }

    try {
      await api.delete(`/doubts/${doubt.id}`);
    } catch {
      // ignore
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
      (d.questionText && d.questionText.toLowerCase().includes(searchHistory.toLowerCase()))
  );

  if (loading) {
    return <GovLoader label="Loading AI Academic Mentor…" />;
  }

  return (
    <div
      style={{ fontFamily: "'Mulish', sans-serif" }}
      className="my-2 h-[calc(100vh-140px)] min-h-[580px] flex flex-col md:flex-row bg-white border border-gray-300 rounded-xl shadow-xs overflow-hidden text-gray-800 font-['Mulish',sans-serif]"
    >
      {/* 1. Left History Sidebar */}
      <div className="w-full md:w-72 bg-gray-50 border-r border-gray-300 flex flex-col justify-between shrink-0">
        <div className="p-3 border-b border-gray-300 space-y-2">
          <button
            type="button"
            onClick={() => {
              setActiveDoubt(null);
              setQuestionText("");
              setAttachedFile(null);
            }}
            className="w-full bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Doubt Session
          </button>

          <input
            className="w-full bg-white border border-gray-300 focus:border-[#2196f3] outline-none text-gray-800 placeholder-gray-400 text-xs py-1.5 px-2.5 rounded-lg"
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
              No previous doubts found. Ask any technical query below!
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
                  className={`group w-full text-left p-2.5 rounded-lg text-xs transition-all flex flex-col gap-1 border relative cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 border-blue-300 text-gray-900 font-medium"
                      : "border-transparent hover:bg-gray-100 text-gray-600"
                  } ${isDeleting ? "opacity-40" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-[11px] text-[#003366] truncate flex items-center gap-1">
                      <span>💡</span>
                      <span>Doubt #{String(d.id).slice(-4)}</span>
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] text-gray-400">
                        {d.pending ? "Solving…" : d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ""}
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleDeleteDoubt(e, d)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") handleDeleteDoubt(e, d);
                        }}
                        title="Delete this doubt"
                        className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-gray-400 hover:text-red-600 transition-opacity p-0.5 rounded cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-8 0v12a2 2 0 002 2h4a2 2 0 002-2V7H8z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <p className="line-clamp-2 text-[11.5px] leading-tight text-gray-700">
                    {d.questionText}
                  </p>
                </button>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-gray-300 bg-gray-50 text-[10px] text-gray-500">
          <div className="font-bold text-[#003366]">State Board AI Academic Mentor</div>
          <div>Official Government AI Doubt Solving Portal</div>
        </div>
      </div>

      {/* 2. Central Conversation & Answering Area */}
      <div className="flex-1 flex flex-col justify-between bg-white relative">
        {/* Top Header Bar */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-300 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32]"></span>
            <span className="font-bold text-[#003366] text-sm">
              SBTET AI Academic Mentor
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 hidden sm:inline text-xs">
              State Board of Technical Education and Training Telangana
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              AI Mentor Active
            </span>
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white">
          {!activeDoubt ? (
            /* Welcome Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="relative max-w-2xl mx-auto space-y-6">
                <div className="space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-[#003366] mx-auto flex items-center justify-center shadow-xs">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-2xl text-[#003366] tracking-tight">
                    Ask SBTET AI Academic Mentor
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
                    Get instant step-by-step solutions, mathematical derivations, circuit diagrams, and programming help for any diploma and polytechnic subject.
                  </p>
                </div>

                {/* Suggestion Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {QUICK_SUGGESTIONS.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => applySuggestion(sug)}
                      className="p-3 bg-white border border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all text-xs group flex flex-col justify-between shadow-2xs cursor-pointer"
                    >
                      <div className="font-bold text-gray-800 group-hover:text-[#003366] flex items-center justify-between mb-1">
                        <span>{sug.title}</span>
                        <span className="text-[10px] text-gray-400">{sug.name}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-snug">{sug.q}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Active Doubt Q&A Thread */
            <div className="max-w-3xl mx-auto space-y-6">
              {/* User Question Bubble */}
              <div className="flex items-start justify-end gap-3">
                <div className="bg-[#003366] text-white p-4 rounded-2xl rounded-tr-xs max-w-[85%] text-xs md:text-sm leading-relaxed shadow-sm">
                  <p className="whitespace-pre-wrap font-medium">{activeDoubt.questionText}</p>

                  {/* Attached Image or PDF Preview */}
                  {activeDoubt.attachedFilePreview && (
                    <div className="mt-3 pt-2 border-t border-white/20">
                      {activeDoubt.attachedFilePreview.isImage ? (
                        <div className="space-y-1">
                          <span className="text-[10px] opacity-80 block">Attached Document / Image:</span>
                          <img
                            src={activeDoubt.attachedFilePreview.dataUrl}
                            alt="Attached diagram"
                            className="max-h-48 rounded-lg border border-white/30 bg-black/10 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg text-[11px]">
                          <svg className="w-4 h-4 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                          </svg>
                          <span className="truncate">{activeDoubt.attachedFilePreview.name}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                  U
                </div>
              </div>

              {/* AI Assistant Answer Bubble */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  AI
                </div>

                <div className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl rounded-tl-xs p-5 text-xs md:text-sm leading-relaxed space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                    <span className="font-bold text-xs text-[#003366] uppercase tracking-wide flex items-center gap-1.5">
                      <span>📘</span>
                      <span>Detailed Solution & Concept Explanation</span>
                    </span>

                    {activeDoubt.aiSolution && (
                      <button
                        onClick={() => handleCopy(activeDoubt.aiSolution, activeDoubt.id)}
                        className="text-[11px] font-semibold text-[#003366] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === activeDoubt.id ? "Copied ✓" : "Copy Solution"}
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
                      No solution received for this query.
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
                type="button"
                onClick={() => setAttachedFile(null)}
                className="text-red-600 font-bold hover:text-red-700 ml-2 cursor-pointer"
                title="Remove attachment"
              >
                &times;
              </button>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-2 max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-3xl px-2 py-1.5 focus-within:border-[#2196f3] focus-within:ring-1 focus-within:ring-[#2196f3] transition-all">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach Image diagram or PDF document"
                className="w-9 h-9 shrink-0 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
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
                className="flex-1 bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none resize-none min-h-[36px] max-h-32 py-2 leading-snug font-['Mulish',sans-serif]"
                rows={1}
                placeholder="Ask any technical doubt, numerical question, or concept… (Press Enter to Send)"
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
                disabled={submitting || !questionText.trim()}
                className="w-9 h-9 shrink-0 flex items-center justify-center bg-[#003366] hover:bg-[#002244] disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-full transition-colors shadow-xs cursor-pointer"
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