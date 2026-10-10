import { useEffect, useState, useRef, useMemo } from "react";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import katex from "katex";
import "katex/dist/katex.min.css";
import {
  PenSquare,
  Search,
  Plus,
  Pin,
  MoreVertical,
  Menu,
  X,
  Mic,
  MicOff,
  Send,
  Square,
  ChevronDown,
  Copy,
  Check,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  ArrowUp,
  Clock,
  Code2,
  Calculator,
  Zap,
  GraduationCap
} from "lucide-react";
import sbtetEmblem from "../../images/sb.png";

// Greeting pattern to detect pleasantries and greetings
const GREETING_REGEX =
  /^(hi+|hello+|hey+|good\s*(morning|afternoon|evening)|namaste+|namaskar+|salam+|vanakkam|hola|howdy|what'?s\s*up|who\s*are\s*you|help)(\s*!|\.|\?)*$/i;

function isGreetingQuery(text) {
  if (!text) return false;
  return GREETING_REGEX.test(text.trim());
}

// Quick instant greeting - concise, direct, zero lecture filler
function generateInstantGreeting(userName = "") {
  return userName ? `Hello ${userName}! How can I help you today?` : "Hello! How can I help you today?";
}

// Direct exact answers for common straightforward queries
function getDirectPointAnswer(query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();

  // Python addition of 2 numbers
  if (
    /python.*add(ition)?.*(2|two)\s*num/i.test(q) ||
    /add(ition)?.*(2|two)\s*num.*python/i.test(q) ||
    /add.*(2|two)\s*num.*python/i.test(q) ||
    (/python/i.test(q) && /add(ition)?/i.test(q) && /(2|two)\s*num/i.test(q))
  ) {
    return `Here is a simple Python program to add two numbers.

Python Code

\`\`\`python
# Define two numbers
num1 = 10
num2 = 25

# Add the numbers
sum_result = num1 + num2

# Display the result
print(f"The sum of {num1} and {num2} is {sum_result}")
\`\`\``;
  }

  // CM of Telangana
  if (
    /cm\s*of\s*telangana/i.test(q) ||
    /chief\s*minister\s*of\s*telangana/i.test(q) ||
    /telangana\s*cm/i.test(q)
  ) {
    return `The Chief Minister of Telangana is **Anumula Revanth Reddy**.

He belongs to the Indian National Congress (INC) party and took office on December 7, 2023.`;
  }

  // PM of India
  if (
    /pm\s*of\s*india/i.test(q) ||
    /prime\s*minister\s*of\s*india/i.test(q) ||
    /india\s*pm/i.test(q)
  ) {
    return `The Prime Minister of India is **Narendra Modi**.

He has been serving as the 14th Prime Minister of India since May 26, 2014.`;
  }

  return null;
}

// Sanitizes AI solutions to keep only the direct, exact point answer
function cleanToPointAnswer(rawText) {
  if (!rawText) return "";
  let text = String(rawText).trim();

  // 1. Remove title banners (e.g. "Detailed Solution & Concept Explanation")
  text = text.replace(
    /^(#+\s*)?📘?\s*(Detailed\s+Solution(\s*&|\s+and)?\s*Concept\s*Explanation|Concept\s*Explanation(\s*&|\s+and)?\s*Detailed\s*Solution|Detailed\s+Solution|Concept\s+Explanation|Detailed\s+Answer|Solution\s*&?\s*Explanation|Academic\s+Mentor\s+Response)[^\n]*\n*/i,
    ""
  );

  // 2. Remove "Copy Solution"
  text = text.replace(/^Copy\s+Solution\s*\n*/i, "");

  // 3. Remove "Subject: ... Topic: ..." header lines
  text = text.replace(/^(Subject|Topic|Course|Branch|Scheme):\s*[^\n]+\n*/gim, "");

  // 4. Remove standard SBTET welcome/mentor introductions
  text = text.replace(
    /^(Hello!?\s*)?Welcome to PolyConnect[^\n]*\n*/i,
    ""
  );
  text = text.replace(
    /^I am here to assist you with your Diploma engineering coursework[^\n]*\n*/i,
    ""
  );
  text = text.replace(
    /^As an? (official\s+)?(SBTET|academic|polytechnic|diploma)\s+(AI\s+)?(mentor|assistant|tutor)[^,\n]*,\s*/i,
    ""
  );

  // 5. Remove "📚 How I Can Help You:" list block
  text = text.replace(
    /📚\s*How I Can Help You:[\s\S]*?(?=\n\n|\n[A-Z0-9#]|\n```|$)/i,
    ""
  );

  // 6. Remove "SBTET Exam Guidance:" list block & mark allocation blurbs
  text = text.replace(
    /SBTET Exam Guidance:[\s\S]*?(?=\n\n|\n[A-Z0-9#]|\n```|$)/i,
    ""
  );
  text = text.replace(
    /Mark allocation strategies[^\n]*\n*/i,
    ""
  );

  // 7. Remove conversational filler phrases at start
  text = text.replace(
    /^(Certainly!?|Sure thing!?|Sure!?|Of course!?|Definitely!?)\s*([,:]\s*)?/i,
    ""
  );

  // 8. Remove unwanted trailing exam/syllabus disclaimers at bottom
  text = text.replace(
    /\n+(Best of luck|All the best|Good luck)\s+(for|with)\s+(your\s+)?(SBTET|diploma|semester|exams)?[^\n]*$/i,
    ""
  );
  text = text.replace(
    /\n+Feel free to ask (more|any other|further) questions[^\n]*$/i,
    ""
  );
  text = text.replace(
    /\n+Hope this helps (you\s+)?with your (SBTET|diploma|engineering|exam|studies)?[^\n]*$/i,
    ""
  );

  return text.trim();
}

// KaTeX math renderer
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

// Inline Markdown renderer with high-contrast light theme KaTeX & code support
function renderInlineText(line, keyPrefix) {
  const tokens = [];
  const regex = /(\*\*(.+?)\*\*|`(.+?)`|\$\$(.+?)\$\$|\$(.+?)\$)/g;
  let lastIndex = 0;
  let match;
  let idx = 0;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(line.slice(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      tokens.push(
        <strong key={`${keyPrefix}-b-${idx++}`} className="font-semibold text-gray-900">
          {match[2]}
        </strong>
      );
    } else if (match[3] !== undefined) {
      tokens.push(
        <code
          key={`${keyPrefix}-c-${idx++}`}
          className="bg-slate-100 text-[#003366] px-1.5 py-0.5 rounded text-[0.88em] font-mono border border-slate-300 font-semibold"
        >
          {match[3]}
        </code>
      );
    } else if (match[4] !== undefined) {
      tokens.push(
        <span
          key={`${keyPrefix}-m-${idx++}`}
          className="inline-block"
          dangerouslySetInnerHTML={{
            __html: renderMath(match[4], false),
          }}
        />
      );
    } else if (match[5] !== undefined) {
      tokens.push(
        <span
          key={`${keyPrefix}-m-${idx++}`}
          className="inline-block"
          dangerouslySetInnerHTML={{
            __html: renderMath(match[5], false),
          }}
        />
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push(line.slice(lastIndex));
  }

  return tokens;
}

// Code Block with Copy button
function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-md text-left">
      <div className="bg-slate-800 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-slate-300 border-b border-slate-700 font-mono">
        <span className="font-semibold uppercase tracking-wider text-slate-200">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-white px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 transition cursor-pointer text-[10px]"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-slate-300" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-[12.5px] leading-relaxed font-mono text-slate-100">
        <code className="whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

// Markdown Lite Parser for AI messages
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

    // Code blocks
    if (line.trim().startsWith("```")) {
      const lang = line.trim().replace(/^```/, "").trim();
      const codeLines = [];
      i++;

      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;

      blocks.push(
        <CodeBlock
          key={key++}
          code={codeLines.join("\n")}
          language={lang || "code"}
        />
      );
      continue;
    }

    // Block math
    const blockMathMatch = line.trim().match(/^\$\$(.+)\$\$$/);
    if (blockMathMatch) {
      blocks.push(
        <div
          key={key++}
          className="my-3 overflow-x-auto text-sm text-center py-2.5 bg-blue-50/70 rounded-xl border border-blue-200 text-gray-900"
          dangerouslySetInnerHTML={{
            __html: renderMath(blockMathMatch[1], true),
          }}
        />
      );
      i++;
      continue;
    }

    // Horizontal line
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push(
        <hr key={key++} className="border-gray-200 my-4" />
      );
      i++;
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const sizeClass =
        level <= 2
          ? "text-base sm:text-lg font-bold text-[#003366] border-b border-gray-200 pb-1"
          : level === 3
          ? "text-sm sm:text-base font-semibold text-gray-800"
          : "text-xs sm:text-sm font-semibold text-gray-700";

      blocks.push(
        <div key={key++} className={`${sizeClass} mt-3.5 mb-2 first:mt-0`}>
          {renderInlineText(headerMatch[2], `h${key}`)}
        </div>
      );
      i++;
      continue;
    }

    // Tables
    if (line.trim().startsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      const rows = tableLines.map((l) =>
        l
          .trim()
          .replace(/^\||\|$/g, "")
          .split("|")
          .map((c) => c.trim())
      );

      const headerRow = rows[0];
      let bodyRows = rows.slice(1);
      if (bodyRows.length && /^[-:\s|]+$/.test(bodyRows[0].join(""))) {
        bodyRows = bodyRows.slice(1);
      }

      blocks.push(
        <div
          key={key++}
          className="overflow-x-auto my-3 rounded-xl border border-gray-200 shadow-2xs"
        >
          <table className="w-full text-[12.5px] border-collapse">
            <thead>
              <tr className="bg-[#003366] text-white">
                {headerRow.map((c, ci) => (
                  <th
                    key={ci}
                    className="text-left font-semibold px-3 py-2 border-b border-blue-900"
                  >
                    {renderInlineText(c, `th${ci}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((r, ri) => (
                <tr
                  key={ri}
                  className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  {r.map((c, ci) => (
                    <td
                      key={ci}
                      className="text-gray-700 px-3 py-2 align-top border-b border-gray-200"
                    >
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

    // Blockquote
    if (line.trim().startsWith(">")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }

      blocks.push(
        <blockquote
          key={key++}
          className="border-l-4 border-emerald-600 bg-emerald-50/70 pl-3.5 py-2 my-2.5 text-gray-800 text-[13px] rounded-r-lg"
        >
          {quoteLines.map((q, qi) => (
            <div key={qi}>{renderInlineText(q, `q${qi}`)}</div>
          ))}
        </blockquote>
      );
      continue;
    }

    // Bullet list
    if (/^[-*]\s+/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }

      blocks.push(
        <ul
          key={key++}
          className="list-disc list-outside pl-5 space-y-1 my-2 text-gray-800 text-[13.5px]"
        >
          {items.map((it, ii) => (
            <li key={ii}>{renderInlineText(it, `ul${ii}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s+/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }

      blocks.push(
        <ol
          key={key++}
          className="list-decimal list-outside pl-5 space-y-1 my-2 text-gray-800 text-[13.5px]"
        >
          {items.map((it, ii) => (
            <li key={ii}>{renderInlineText(it, `ol${ii}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
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

// Initial sample mock sessions matching official SBTET Polytechnic doubts
const INITIAL_SAMPLE_CHATS = [
  {
    id: "sample_1",
    title: "what is in that image..",
    pinned: true,
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    messages: [
      {
        id: "s1_m1",
        role: "user",
        content: "what is in that image",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "s1_m2",
        role: "assistant",
        content: "This diagram shows a singly reinforced rectangular RCC beam section as per IS 456 standards, detailing the tensile steel reinforcement bars and effective depth (d).",
        createdAt: new Date(Date.now() - 3550000).toISOString(),
      },
    ],
  },
  {
    id: "sample_2",
    title: "C program for addition of two numbers",
    pinned: true,
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    messages: [
      {
        id: "s2_m1",
        role: "user",
        content: "Hi could you explain C program for addition of two numbers",
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: "s2_m2",
        role: "assistant",
        content: "Here is the simple C program to add two numbers with comments:\n\n```c\n#include <stdio.h>\n\nint main() {\n    int a, b, sum;\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &a, &b);\n    sum = a + b;\n    printf(\"Sum = %d\\n\", sum);\n    return 0;\n}\n```",
        createdAt: new Date(Date.now() - 7150000).toISOString(),
      },
    ],
  },
  {
    id: "sample_3",
    title: "Python code addition of 2 numbers",
    pinned: false,
    updatedAt: new Date(Date.now() - 18000000).toISOString(),
    messages: [
      {
        id: "s3_m1",
        role: "user",
        content: "create a python code of addtion of 2 numbers",
        createdAt: new Date(Date.now() - 18000000).toISOString(),
      },
      {
        id: "s3_m2",
        role: "assistant",
        content:
          "Here is a simple Python program to add two numbers.\n\nPython Code\n\n```python\n# Define two numbers\nnum1 = 10\nnum2 = 25\n\n# Add the numbers\nsum_result = num1 + num2\n\n# Display the result\nprint(f\"The sum of {num1} and {num2} is {sum_result}\")\n```",
        createdAt: new Date(Date.now() - 17950000).toISOString(),
      },
    ],
  },
  {
    id: "sample_4",
    title: "Who is CM of Telangana",
    pinned: false,
    updatedAt: new Date(Date.now() - 36000000).toISOString(),
    messages: [
      {
        id: "s4_m1",
        role: "user",
        content: "who is CM of telangana",
        createdAt: new Date(Date.now() - 36000000).toISOString(),
      },
      {
        id: "s4_m2",
        role: "assistant",
        content:
          "The Chief Minister of Telangana is **Anumula Revanth Reddy**.\n\nHe belongs to the Indian National Congress (INC) party and took office on December 7, 2023.",
        createdAt: new Date(Date.now() - 35950000).toISOString(),
      },
    ],
  },
  {
    id: "sample_5",
    title: "Binary Search algorithm dry run in C",
    pinned: false,
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    messages: [],
  },
  {
    id: "sample_6",
    title: "Otto vs Diesel Cycle thermal efficiency",
    pinned: false,
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    messages: [],
  },
];

export default function DoubtsPage() {
  const { user } = useAuth();
  const userName = user?.name || "Sanath Mandala";

  // Multi-turn Chat Sessions State
  const [sessions, setSessions] = useState(() => {
    try {
      const cached = localStorage.getItem("pc_gemini_chats");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore
    }
    return INITIAL_SAMPLE_CHATS;
  });

  const [activeSessionId, setActiveSessionId] = useState(null);
  const [inputPrompt, setInputPrompt] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("SBTET Mentor AI");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const chatBottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const basePromptRef = useRef("");

  // Active chat session
  const activeSession = useMemo(() => {
    return sessions.find((s) => s.id === activeSessionId) || null;
  }, [sessions, activeSessionId]);

  // Persist sessions locally
  useEffect(() => {
    try {
      localStorage.setItem("pc_gemini_chats", JSON.stringify(sessions));
    } catch {
      // Ignore
    }
  }, [sessions]);

  // Sync past doubts from backend if available
  useEffect(() => {
    api
      .get("/doubts/my")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSessions((prev) => {
            const existingIds = new Set(prev.map((p) => String(p.id)));
            const newImports = [];

            res.data.forEach((d) => {
              const strId = `backend_${d.id}`;
              if (!existingIds.has(strId)) {
                newImports.push({
                  id: strId,
                  backendDoubtId: d.id,
                  title:
                    d.questionText?.length > 35
                      ? d.questionText.slice(0, 35) + "..."
                      : d.questionText || "Academic Doubt",
                  pinned: false,
                  updatedAt: d.createdAt || new Date().toISOString(),
                  messages: [
                    {
                      id: `bm_u_${d.id}`,
                      role: "user",
                      content: d.questionText?.replace(/\n\n\[Instruction:[\s\S]*?\]/gi, "").trim(),
                      createdAt: d.createdAt,
                    },
                    {
                      id: `bm_a_${d.id}`,
                      role: "assistant",
                      content: cleanToPointAnswer(d.aiSolution || "Solution was recorded."),
                      createdAt: d.createdAt,
                    },
                  ],
                });
              }
            });

            return newImports.length > 0 ? [...newImports, ...prev] : prev;
          });
        }
      })
      .catch(() => {});
  }, []);

  // Auto scroll down in active chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages, isGenerating]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  // Handle Speech Recognition voice input
  function handleToggleVoiceInput() {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore
        }
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice input is not supported in this browser. Please use Google Chrome, Microsoft Edge, or a browser with Web Speech API support."
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN"; // English (India) - captures local accents accurately

      basePromptRef.current = inputPrompt.trim() ? inputPrompt.trim() + " " : "";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let currentTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInputPrompt(basePromptRef.current + currentTranscript);
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          alert(
            "Microphone permission was denied. Please allow microphone access in your browser settings to use voice input."
          );
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Speech recognition start failed:", err);
      setIsListening(false);
    }
  }

  // Handle file attachment
  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setAttachedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.type,
        dataUrl: uploadEvent.target?.result,
        isImage: file.type.startsWith("image/"),
      });
    };
    reader.readAsDataURL(file);
  }

  // Create New Chat (Reset view to "Where should we start?")
  function handleStartNewChat() {
    setActiveSessionId(null);
    setInputPrompt("");
    setAttachedFile(null);
    setMobileDrawerOpen(false);
  }

  // Toggle Pin on session
  function handleTogglePin(e, sessionId) {
    e.stopPropagation();
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, pinned: !s.pinned } : s))
    );
  }

  // Delete a session
  function handleDeleteSession(e, sessionId) {
    e.stopPropagation();
    const confirmed = window.confirm("Delete this doubt session?");
    if (!confirmed) return;

    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
    }
  }

  // Copy message
  function handleCopyMessage(text, msgId) {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(msgId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  }

  // Multi-turn message send:
  // If activeSession exists, append to THAT session!
  // If no activeSession, create ONE session and stay inside it!
  async function handleSendMessage(overrideText = null) {
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
      setIsListening(false);
    }

    const query = (overrideText || inputPrompt).trim();
    if (!query || isGenerating) return;

    const currentAttachment = attachedFile;
    setInputPrompt("");
    setAttachedFile(null);

    let sessionToUse = activeSession;
    let isCreatingNew = false;

    if (!sessionToUse) {
      isCreatingNew = true;
      const newId = `chat_${Date.now()}`;
      sessionToUse = {
        id: newId,
        title: query.length > 36 ? query.slice(0, 36) + "..." : query,
        pinned: false,
        updatedAt: new Date().toISOString(),
        messages: [],
      };
    }

    const userMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      content: query,
      attachment: currentAttachment,
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [...sessionToUse.messages, userMessage];
    const updatedSession = {
      ...sessionToUse,
      messages: updatedMessages,
      updatedAt: new Date().toISOString(),
    };

    // Update session state
    setSessions((prev) => {
      if (isCreatingNew) {
        return [updatedSession, ...prev];
      }
      return prev.map((s) => (s.id === updatedSession.id ? updatedSession : s));
    });

    setActiveSessionId(updatedSession.id);
    setIsGenerating(true);

    // Fast Instant Greeting Response for "hi", "hello", etc.
    const isGreeting = isGreetingQuery(query);
    if (isGreeting) {
      setTimeout(() => {
        const aiGreeting = {
          id: `ai_${Date.now()}`,
          role: "assistant",
          content: generateInstantGreeting(userName),
          createdAt: new Date().toISOString(),
        };

        const finalSession = {
          ...updatedSession,
          messages: [...updatedMessages, aiGreeting],
        };

        setSessions((prev) =>
          prev.map((s) => (s.id === finalSession.id ? finalSession : s))
        );
        setIsGenerating(false);

        // Persist quietly in background to backend
        api
          .post("/doubts/ask", {
            subjectCode: "SBTET",
            subjectName: "Diploma Academic Subject",
            topic: "Greeting",
            questionText: query,
            imageUrl: "",
          })
          .catch(() => {});
      }, 150);
      return;
    }

    // Direct match for quick point answer
    const directAnswer = getDirectPointAnswer(query);
    if (directAnswer) {
      setTimeout(() => {
        const aiDirect = {
          id: `ai_${Date.now()}`,
          role: "assistant",
          content: directAnswer,
          createdAt: new Date().toISOString(),
        };

        const finalSession = {
          ...updatedSession,
          messages: [...updatedMessages, aiDirect],
        };

        setSessions((prev) =>
          prev.map((s) => (s.id === finalSession.id ? finalSession : s))
        );
        setIsGenerating(false);

        api
          .post("/doubts/ask", {
            subjectCode: "DIPLOMA",
            subjectName: "Polytechnic Subject",
            topic: "Direct Query",
            questionText: query,
            imageUrl: "",
          })
          .catch(() => {});
      }, 200);
      return;
    }

    // Call backend API for non-greeting doubts
    try {
      const backendPayload = {
        subjectCode: "DIPLOMA",
        subjectName: "Polytechnic Subject",
        topic: "Academic Doubt",
        questionText: `${query}\n\n[Instruction: Provide only a direct, concise, to-the-point answer. Do not include any introductory headings, greetings, SBTET lecture boilerplate, syllabus references, or unneeded filler. Give only the exact solution/code/answer.]`,
        imageUrl: currentAttachment?.dataUrl
          ? currentAttachment.isImage
            ? currentAttachment.dataUrl
            : `[Attached Document: ${currentAttachment.name}]`
          : "",
      };

      const res = await api.post("/doubts/ask", backendPayload);
      const rawAi =
        res?.data?.aiSolution ||
        "I have processed your query. Please let me know if you need further clarification on this topic!";
      const aiResponse = cleanToPointAnswer(rawAi);

      const aiMessage = {
        id: `ai_${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        createdAt: new Date().toISOString(),
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedMessages, aiMessage],
      };

      setSessions((prev) =>
        prev.map((s) => (s.id === finalSession.id ? finalSession : s))
      );
    } catch (err) {
      console.error("AI Error:", err);
      const errorResponse = {
        id: `ai_err_${Date.now()}`,
        role: "assistant",
        content:
          "I encountered a temporary connection issue. Please check your network and ask again.",
        createdAt: new Date().toISOString(),
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === updatedSession.id
            ? { ...s, messages: [...updatedMessages, errorResponse] }
            : s
        )
      );
    } finally {
      setIsGenerating(false);
    }
  }

  // Filtered recent chats
  const filteredRecentChats = useMemo(() => {
    return sessions.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sessions, searchQuery]);

  return (
    <div
      style={{
        fontFamily:
          "'Mulish', 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
      className="w-full h-[calc(100vh-125px)] min-h-[620px] bg-white text-gray-800 rounded-2xl overflow-hidden flex shadow-lg border border-gray-300 relative select-none"
    >
      {/* ============================================================== */}
      {/* 1. LEFT SIDEBAR (DESKTOP - Clean Government Slate Theme)      */}
      {/* ============================================================== */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-[#f8fafc] border-r border-gray-300 flex-col shrink-0 h-full p-3 select-none">
        {/* Top Controls */}
        <div className="flex flex-col gap-2 overflow-hidden flex-1">
          {/* Official Portal Header */}
          <div className="flex items-center gap-2.5 px-2 py-1.5 mb-1 border-b border-gray-200 pb-2">
            <div className="w-8 h-8 rounded-full bg-white border border-[#003366]/30 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
              <img
                src={sbtetEmblem}
                alt="SBTET"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs text-[#003366] tracking-wide truncate">
                SBTET PolyConnect AI
              </span>
              <span className="text-[9.5px] text-gray-500 font-medium truncate">
                Govt. of Telangana • Academic Mentor
              </span>
            </div>
          </div>

          {/* New Chat Button */}
          <button
            type="button"
            onClick={handleStartNewChat}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-gray-300 hover:border-[#003366] text-sm text-[#003366] font-semibold transition cursor-pointer shadow-2xs"
          >
            <PenSquare className="w-4 h-4 text-[#003366]" />
            <span>New chat</span>
          </button>

          {/* Search Chats */}
          <div className="pt-1">
            <div className="relative">
              <input
                id="search-input-box"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search past chats…"
                className="w-full bg-white border border-gray-300 focus:border-[#003366] focus:ring-1 focus:ring-[#003366] text-xs text-gray-800 placeholder-gray-400 pl-8 pr-2.5 py-1.5 rounded-lg outline-none"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
            </div>
          </div>

          {/* Recent Chats Section */}
          <div className="pt-3 flex-1 flex flex-col overflow-hidden border-t border-gray-200 mt-1">
            <div className="text-gray-500 px-2 py-1 uppercase text-[10.5px] font-bold tracking-wider">
              Recent Doubts
            </div>

            <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 no-scrollbar">
              {filteredRecentChats.map((chat) => {
                const isSelected = activeSessionId === chat.id;

                return (
                  <div
                    key={chat.id}
                    onClick={() => setActiveSessionId(chat.id)}
                    className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition ${
                      isSelected
                        ? "bg-blue-50 text-[#003366] font-semibold border border-blue-200 shadow-2xs"
                        : "hover:bg-slate-200/60 text-gray-700"
                    }`}
                  >
                    <span className="truncate flex-1 text-left">
                      {chat.title}
                    </span>

                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      {chat.pinned ? (
                        <Pin
                          onClick={(e) => handleTogglePin(e, chat.id)}
                          className="w-3 h-3 text-[#003366] hover:opacity-80"
                        />
                      ) : (
                        <button
                          onClick={(e) => handleTogglePin(e, chat.id)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-[#003366]"
                          title="Pin chat"
                        >
                          <Pin className="w-3 h-3 text-gray-400" />
                        </button>
                      )}

                      <button
                        onClick={(e) => handleDeleteSession(e, chat.id)}
                        className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-600"
                        title="Delete chat"
                      >
                        <Trash2 className="w-3 h-3 text-gray-400 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 2. MOBILE DRAWER SLIDE-OUT (Clean Light Government Theme)     */}
      {/* ============================================================== */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
          />

          {/* Drawer Container */}
          <div className="relative w-72 max-w-[85%] bg-white h-full flex flex-col p-3.5 z-10 shadow-2xl border-r border-gray-300 animate-in slide-in-from-left duration-200">
            <div className="flex flex-col gap-2 overflow-hidden flex-1">
              {/* Drawer Header: SBTET PolyConnect AI */}
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white border border-[#003366]/30 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                    <img
                      src={sbtetEmblem}
                      alt="SBTET"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-[#003366] tracking-tight leading-none">
                      SBTET PolyConnect AI
                    </span>
                    <span className="text-[9px] text-gray-500 font-medium leading-tight mt-0.5">
                      Government of Telangana
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* New chat */}
              <button
                type="button"
                onClick={handleStartNewChat}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-sm text-[#003366] font-semibold transition cursor-pointer border border-blue-200"
              >
                <PenSquare className="w-4 h-4 text-[#003366]" />
                <span>New chat</span>
              </button>

              {/* Search */}
              <div className="pt-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search past chats…"
                    className="w-full bg-slate-50 border border-gray-300 focus:border-[#003366] text-xs text-gray-800 placeholder-gray-400 pl-8 pr-2.5 py-1.5 rounded-lg outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
                </div>
              </div>

              {/* Recent chats */}
              <div className="pt-2 flex-1 flex flex-col overflow-hidden border-t border-gray-200 mt-1">
                <div className="text-gray-500 px-2 py-1 uppercase text-[10.5px] font-bold">
                  Recent Doubts
                </div>

                <div className="flex-1 overflow-y-auto space-y-0.5 no-scrollbar">
                  {filteredRecentChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setActiveSessionId(chat.id);
                        setMobileDrawerOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-gray-700 hover:bg-slate-100 cursor-pointer"
                    >
                      <span className="truncate flex-1 text-left">
                        {chat.title}
                      </span>
                      {chat.pinned ? (
                        <Pin className="w-3 h-3 text-[#003366]" />
                      ) : (
                        <MoreVertical className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. MAIN CHAT WORKSPACE (Clean Professional Light Layout)      */}
      {/* ============================================================== */}
      <main className="flex-1 flex flex-col justify-between h-full bg-white overflow-hidden relative">
        {/* Top Header Bar */}
        <header className="h-12 border-b border-gray-200 flex items-center justify-between px-3 sm:px-5 shrink-0 z-10 bg-white/95 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            {/* Hamburger on Mobile */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-1.5 rounded-full hover:bg-slate-100 text-gray-700 hover:text-black transition cursor-pointer"
              title="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Model Selector Pill Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[#003366] text-xs sm:text-sm font-semibold transition cursor-pointer border border-slate-200"
              >
                <span>{selectedModel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {showModelDropdown && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-300 rounded-xl shadow-xl py-1 text-xs z-30">
                  {[
                    "SBTET Mentor AI",
                    "Diploma Core AI (C-21/C-24)",
                    "Maths & Numerical Engine",
                    "Code & Lab Practical AI",
                  ].map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => {
                        setSelectedModel(model);
                        setShowModelDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between ${
                        selectedModel === model ? "text-[#003366] font-bold bg-blue-50/50" : "text-gray-700"
                      }`}
                    >
                      <span>{model}</span>
                      {selectedModel === model && <Check className="w-3.5 h-3.5 text-[#003366]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeSession && (
              <button
                type="button"
                onClick={handleStartNewChat}
                className="hidden sm:flex items-center gap-1.5 text-xs text-[#003366] font-semibold hover:bg-slate-100 px-3 py-1 rounded-full border border-gray-200 cursor-pointer transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New chat</span>
              </button>
            )}
          </div>
        </header>

        {/* ============================================================== */}
        {/* VIEW A: EMPTY STATE ("Where should we start?" - Light Theme)   */}
        {/* ============================================================== */}
        {!activeSession ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gradient-to-b from-slate-50/50 to-white">
            <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-7 my-auto">
              {/* Emblem icon */}
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 p-2 shadow-sm flex items-center justify-center">
                <img
                  src={sbtetEmblem}
                  alt="SBTET"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              {/* Center Title */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] tracking-tight">
                  Where should we start?
                </h1>
                <p className="text-xs text-gray-500">
                  Ask any diploma syllabus question, engineering derivation, or programming logic
                </p>
              </div>

              {/* Center Input Pill Bar */}
              <div className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="w-full bg-white border border-gray-300 rounded-full px-4 py-2.5 flex items-center gap-3 focus-within:border-[#003366] focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-md"
                >
                  {/* File attach + icon */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gray-500 hover:text-[#003366] p-1 rounded-full hover:bg-slate-100 transition cursor-pointer shrink-0"
                    title="Attach problem diagram or question photo"
                  >
                    <Plus className="w-5 h-5" />
                  </button>

                  <input
                    type="text"
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    placeholder={
                      isListening
                        ? "Listening... Speak your doubt now..."
                        : "Ask SBTET PolyConnect AI..."
                    }
                    className="flex-1 bg-transparent text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />

                  {/* Dropdown in Input bar */}
                  <div className="hidden sm:flex items-center gap-1 text-xs text-[#003366] font-semibold bg-slate-100 px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-200">
                    <span>{selectedModel}</span>
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  </div>

                  {/* Mic icon */}
                  <button
                    type="button"
                    onClick={handleToggleVoiceInput}
                    className={`p-1.5 rounded-full transition cursor-pointer shrink-0 ${
                      isListening
                        ? "text-red-600 bg-red-100 ring-2 ring-red-400 animate-pulse"
                        : "text-gray-500 hover:text-[#003366] hover:bg-slate-100"
                    }`}
                    title={
                      isListening
                        ? "Listening... Click to stop"
                        : "Voice input (Click to speak)"
                    }
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4 text-red-600" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>

                  {/* Send button */}
                  <button
                    type="submit"
                    disabled={!inputPrompt.trim() && !attachedFile}
                    className="w-8 h-8 rounded-full bg-[#003366] hover:bg-[#002244] text-white disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center transition cursor-pointer shrink-0 shadow-xs"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Academic Suggestions List */}
              <div className="w-full flex flex-col gap-2 max-w-xl text-left">
                <button
                  type="button"
                  onClick={() => handleSendMessage("Solve step-by-step: Find Eigenvalues and Eigenvectors of a 3x3 matrix")}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-blue-50/50 border border-gray-200 hover:border-blue-300 text-xs sm:text-sm text-gray-800 transition cursor-pointer shadow-2xs"
                >
                  <Calculator className="w-4 h-4 text-[#003366] shrink-0" />
                  <span>Solve Engineering Mathematics (M-I, M-II) Eigenvalues numerical</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage("State and prove Thevenin's Theorem with circuit reduction steps and a worked numerical example")}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-blue-50/50 border border-gray-200 hover:border-blue-300 text-xs sm:text-sm text-gray-800 transition cursor-pointer shadow-2xs"
                >
                  <Zap className="w-4 h-4 text-[#d97706] shrink-0" />
                  <span>Thevenin's Theorem circuit reduction & worked numerical</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage("Explain Binary Search algorithm in C with time complexity and step-by-step array dry run")}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-blue-50/50 border border-gray-200 hover:border-blue-300 text-xs sm:text-sm text-gray-800 transition cursor-pointer shadow-2xs"
                >
                  <Code2 className="w-4 h-4 text-[#2e7d32] shrink-0" />
                  <span>Binary Search algorithm in C language with dry run</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage("Explain SBTET C-21 scheme marking scheme: 3-mark short answers vs 8/10-mark essay presentation")}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-blue-50/50 border border-gray-200 hover:border-blue-300 text-xs sm:text-sm text-gray-800 transition cursor-pointer shadow-2xs"
                >
                  <GraduationCap className="w-4 h-4 text-[#003366] shrink-0" />
                  <span>SBTET board exam presentation strategy for maximum marks</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* VIEW B: ACTIVE MULTI-TURN CHAT (Light Theme Continuous Stream) */
          /* ============================================================== */
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
            {/* Conversation Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              <div className="max-w-3xl mx-auto space-y-6">
                {activeSession.messages.map((msg) => {
                  const isUser = msg.role === "user";

                  if (isUser) {
                    return (
                      /* USER MESSAGE BUBBLE */
                      <div
                        key={msg.id}
                        className="flex items-start justify-end"
                      >
                        <div className="bg-[#003366] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs max-w-[85%] text-sm sm:text-base leading-relaxed break-words shadow-xs">
                          <p className="whitespace-pre-wrap">{msg.content}</p>

                          {msg.attachment?.isImage && (
                            <img
                              src={msg.attachment.dataUrl}
                              alt="attachment"
                              className="mt-2 max-h-48 rounded-lg border border-white/20 object-contain"
                            />
                          )}
                        </div>
                      </div>
                    );
                  }

                  /* ASSISTANT MESSAGE BUBBLE */
                  return (
                    <div key={msg.id} className="flex items-start gap-3">
                      {/* SBTET Emblem Avatar */}
                      <div className="w-8 h-8 rounded-full bg-white border border-[#003366]/30 p-0.5 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <img
                          src={sbtetEmblem}
                          alt="SBTET"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 bg-white border border-gray-200 rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-xs text-gray-800 text-sm sm:text-[15px] leading-relaxed space-y-2">
                        <MarkdownLite text={msg.content} />

                        {/* Action buttons on hover */}
                        <div className="flex items-center gap-2 pt-2 text-xs text-gray-500 border-t border-gray-100 mt-2">
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg.content, msg.id)}
                            className="p-1 rounded hover:bg-slate-100 hover:text-[#003366] transition cursor-pointer flex items-center gap-1"
                            title="Copy response"
                          >
                            {copiedMessageId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            className="p-1 rounded hover:bg-slate-100 hover:text-emerald-700 transition cursor-pointer"
                            title="Helpful"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            className="p-1 rounded hover:bg-slate-100 hover:text-red-600 transition cursor-pointer"
                            title="Not helpful"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* THINKING STATE (3 pulsing dots) */}
                {isGenerating && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#003366]/30 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                      <img
                        src={sbtetEmblem}
                        alt="SBTET"
                        className="w-full h-full object-contain animate-pulse"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 py-2 px-1">
                      <span className="w-2 h-2 rounded-full bg-[#003366] animate-pulse"></span>
                      <span
                        className="w-2 h-2 rounded-full bg-[#003366] animate-pulse"
                        style={{ animationDelay: "200ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-[#003366] animate-pulse"
                        style={{ animationDelay: "400ms" }}
                      ></span>
                    </div>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>
            </div>

            {/* FLOATING BOTTOM CHATBAR */}
            <div className="p-3 sm:p-4 bg-white shrink-0 border-t border-gray-200">
              <div className="max-w-3xl mx-auto w-full">
                {/* Attached file chip */}
                {attachedFile && (
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs text-blue-800 mb-2 w-max shadow-2xs">
                    <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                    <span className="truncate max-w-xs">{attachedFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="text-red-500 hover:text-red-700 ml-1 font-bold"
                    >
                      &times;
                    </button>
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="bg-white border border-gray-300 rounded-full px-3.5 py-1.5 sm:py-2 flex items-center gap-2.5 focus-within:border-[#003366] focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gray-500 hover:text-[#003366] p-1 rounded-full hover:bg-slate-100 transition cursor-pointer shrink-0"
                    title="Attach problem diagram or textbook photo"
                  >
                    <Plus className="w-5 h-5" />
                  </button>

                  <input
                    type="text"
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    placeholder={
                      isListening
                        ? "Listening... Speak your doubt now..."
                        : "Ask SBTET PolyConnect AI..."
                    }
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  />

                  {/* Mic icon */}
                  <button
                    type="button"
                    onClick={handleToggleVoiceInput}
                    className={`p-1.5 rounded-full transition cursor-pointer shrink-0 ${
                      isListening
                        ? "text-red-600 bg-red-100 ring-2 ring-red-400 animate-pulse"
                        : "text-gray-500 hover:text-[#003366] hover:bg-slate-100"
                    }`}
                    title={
                      isListening
                        ? "Listening... Click to stop"
                        : "Voice input (Click to speak)"
                    }
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4 text-red-600" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>

                  {/* Send or Stop button */}
                  {isGenerating ? (
                    <button
                      type="button"
                      onClick={() => setIsGenerating(false)}
                      className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition cursor-pointer shrink-0"
                      title="Stop generation"
                    >
                      <Square className="w-3.5 h-3.5 fill-white" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!inputPrompt.trim() && !attachedFile}
                      className="w-8 h-8 rounded-full bg-[#003366] hover:bg-[#002244] disabled:bg-gray-200 disabled:text-gray-400 text-white flex items-center justify-center transition cursor-pointer shrink-0 shadow-xs"
                      title="Send question"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,application/pdf"
          className="hidden"
        />
      </main>
    </div>
  );
}
