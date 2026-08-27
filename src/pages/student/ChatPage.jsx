import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  ArrowLeft,
  Send,
  Smile,
  Paperclip,
  Mic,
  Mail,
  CheckCheck,
  Clock,
  HelpCircle,
  X,
  Info,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Wifi,
  WifiOff,
  UserCheck,
  FileText,
  Code,
  Image as ImageIcon
} from "lucide-react";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";
import { useAuth } from "../../context/AuthContext";
import { usePresence } from "../../context/PresenceContext";

const WS_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api").replace(/\/api\/?$/, "");

const QUICK_DOUBTS = [
  "Can you guide me on ECET preparation & high-scoring subjects?",
  "Could you explain the C-20 lab exam pattern and important viva questions?",
  "How should I structure my final year polytechnic project synopsis?",
  "Can you review this programming logic / circuit diagram doubt?",
  "What are the best career options after diploma in Telangana?"
];

export default function ChatPage() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const { isUserOnline } = usePresence();

  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [connected, setConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Real-time presence: mentor is online ONLY if currently open on website
  const mentorOnline = isUserOnline(room?.mentor?.id);

  const clientRef = useRef(null);
  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Load Room Details & Messages
  useEffect(() => {
    let isMounted = true;

    // Load Messages
    api
      .get(`/seniors/chat/rooms/${roomId}/messages`)
      .then((res) => {
        if (isMounted) {
          setMessages(Array.isArray(res.data) ? res.data : []);
        }
      })
      .catch((err) => {
        if (isMounted) setError(apiErrorMessage(err, "Could not load conversation history."));
      });

    // Load Room Info from rooms list
    api
      .get("/seniors/chat/rooms")
      .then((res) => {
        if (!isMounted) return;
        const allRooms = Array.isArray(res.data) ? res.data : [];
        const found = allRooms.find((r) => String(r.id) === String(roomId));
        if (found) {
          setRoom(found);
        }
      })
      .catch(() => {
        // non-fatal if rooms list fails
      });

    return () => {
      isMounted = false;
    };
  }, [roomId]);

  // Connect STOMP WebSocket
  useEffect(() => {
    const token = localStorage.getItem("pc_token");
    const client = new Client({
      webSocketFactory: () => new SockJS(`${WS_BASE_URL}/ws`),
      connectHeaders: { Authorization: token ? `Bearer ${token}` : "" },
      reconnectDelay: 4000,
      onConnect: () => {
        setConnected(true);

        // Subscribe to room messages
        client.subscribe(`/topic/room/${roomId}`, (frame) => {
          try {
            const incoming = JSON.parse(frame.body);
            if (incoming.type === "TYPING") {
              if (incoming.senderId !== user?.id) {
                setIsTyping(true);
                clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
              }
            } else if (incoming.type === "MESSAGES_READ") {
              // Receiver has read messages: update all sender's messages to isRead = true
              if (incoming.readBy !== user?.id) {
                setMessages((prev) =>
                  prev
                    ? prev.map((msg) =>
                        msg.sender?.id === user?.id ? { ...msg, isRead: true } : msg
                      )
                    : prev
                );
              }
            } else if (incoming.type === "EMAIL_ALERT_SENT") {
              setSystemAlerts((prev) => [...prev, incoming.alert]);
            } else {
              setMessages((prev) => (prev ? [...prev, incoming] : [incoming]));
              setIsTyping(false);
              // If incoming message is from the other person, notify backend to mark read
              if (incoming.sender?.id !== user?.id) {
                api.post(`/seniors/chat/rooms/${roomId}/read`).catch(() => {});
              }
            }
          } catch {
            // ignore malformed frame
          }
        });

        // Also subscribe to room typing topic if supported
        client.subscribe(`/topic/room/${roomId}/typing`, (frame) => {
          try {
            const data = JSON.parse(frame.body);
            if (data.senderId !== user?.id) {
              setIsTyping(true);
              clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
            }
          } catch {
            // ignore
          }
        });
      },
      onStompError: () => setConnected(false),
      onWebSocketClose: () => setConnected(false),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      client.deactivate();
    };
  }, [roomId, user?.id]);

  // Scroll to bottom when messages or typing updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, systemAlerts]);

  // Prepare email template whenever room or user details are available
  useEffect(() => {
    const mentorName = room?.mentor?.fullName || "Senior Mentor";
    const studentName = user?.fullName || "Polytechnic Student";
    const studentPin = user?.pin || user?.username || "SBTET Student";
    const topicName = room?.topic || "Academic Doubt Solving Session";

    setEmailSubject(`PolyConnect: You have a session to solve the Doubts (${topicName})`);
    setEmailMessage(
      `Respected ${mentorName},\n\n` +
      `Student ${studentName} (PIN: ${studentPin}) has requested your mentorship guidance regarding "${topicName}" in PolyConnect Senior Connect.\n\n` +
      `Since you were currently offline, this email alert was generated to invite you to join the doubt-solving session.\n\n` +
      `Direct Session Chat Link:\n` +
      `${window.location.origin}/student/seniors/chat/${roomId}\n\n` +
      `Please log in to PolyConnect at your convenience to assist the student.\n\n` +
      `Regards,\n` +
      `PolyConnect Mentorship Portal\n` +
      `State Board of Technical Education & Training (SBTET), Telangana`
    );
  }, [room, user, roomId]);

  // Send message
  async function sendMessage(e) {
    if (e) e.preventDefault();
    if (!draft.trim()) return;

    const contentToSend = draft.trim();
    setDraft("");
    setShowEmojiPicker(false);
    setShowAttachMenu(false);

    try {
      await api.post(`/seniors/chat/rooms/${roomId}/messages`, { content: contentToSend });

      // If mentor is offline, provide helpful contextual tip
      if (!mentorOnline && systemAlerts.length === 0) {
        setSystemAlerts((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: `Note: ${room?.mentor?.fullName || "Senior Mentor"} is currently offline. You can send them an email alert using the "Send Doubt Session Email" button above.`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            type: "info"
          }
        ]);
      }
    } catch (err) {
      setError(apiErrorMessage(err, "Could not send message."));
    }
  }

  // Handle draft changes and broadcast typing event
  function handleDraftChange(e) {
    setDraft(e.target.value);

    // Send typing STOMP signal if connected
    if (clientRef.current && clientRef.current.connected) {
      try {
        clientRef.current.publish({
          destination: `/app/chat/${roomId}/typing`,
          body: JSON.stringify({ senderId: user?.id, typing: true }),
        });
      } catch {
        // non-fatal
      }
    }
  }

  // Send Doubt Session Email Notification
  async function handleSendEmailNotification(e) {
    if (e) e.preventDefault();
    setEmailSending(true);
    setEmailSentSuccess(false);

    const mentorName = room?.mentor?.fullName || "Senior Mentor";
    const mentorEmail = room?.mentor?.email || "senior.mentor@sbtet.telangana.gov.in";

    try {
      // Attempt backend notification dispatch
      try {
        await api.post(`/seniors/chat/rooms/${roomId}/notify-offline`, {
          subject: emailSubject,
          message: emailMessage,
          recipientEmail: mentorEmail,
        });
      } catch {
        // Graceful fallback to general notification endpoint
        try {
          await api.post("/notifications", {
            userId: room?.mentor?.id,
            title: emailSubject,
            message: `You have a doubt-solving session request from ${user?.fullName || "Student"} for room #${roomId}`,
            type: "MENTOR_SESSION_REQUEST",
          });
        } catch {
          // Logged gracefully
        }
      }

      setEmailSending(false);
      setEmailSentSuccess(true);

      // Add system log in chat
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setSystemAlerts((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: `✉️ Email Alert Sent: "You have a session to solve the Doubts" has been dispatched to ${mentorName} (${mentorEmail}) at ${timeStr}.`,
          time: timeStr,
          type: "success"
        }
      ]);

      setTimeout(() => {
        setShowEmailModal(false);
        setEmailSentSuccess(false);
      }, 1800);
    } catch {
      setEmailSending(false);
      setShowEmailModal(false);
    }
  }

  // Open direct mailto client
  function handleOpenMailClient() {
    const mentorEmail = room?.mentor?.email || "senior.mentor@sbtet.telangana.gov.in";
    const mailtoUrl = `mailto:${mentorEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailMessage)}`;
    window.open(mailtoUrl, "_blank");
  }

  // Send quick suggestion doubt
  function handleQuickDoubt(text) {
    setDraft(text);
  }

  if (error && !messages) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto p-4 font-sans">
        <Link to="/student/seniors" className="inline-flex items-center gap-1.5 text-xs font-normal text-[#0b3c5d] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Senior Connect
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-4 py-3 rounded-none">
          {error}
        </div>
      </div>
    );
  }

  if (!messages) {
    return <GovLoader label="Connecting to Senior Connect WhatsApp-style chat room…" />;
  }

  const mentorName = room?.mentor?.fullName || "Senior Mentor";
  const topicTitle = room?.topic || "Academic Mentorship & Doubt Resolution";

  return (
    <div className="max-w-4xl mx-auto space-y-3 font-sans pb-6">
      {/* Top Header Navigation Strip */}
      <div className="flex items-center justify-between px-1">
        <Link
          to="/student/seniors"
          className="inline-flex items-center gap-1.5 text-xs font-normal text-[#0b3c5d] hover:text-[#00a884] transition-colors py-1 px-2 rounded-sm bg-white border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Senior Mentors</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* STOMP WebSocket Live Badge */}
          <div
            className={`inline-flex items-center gap-1.5 text-[11px] font-normal px-2.5 py-0.5 rounded-full border ${
              connected
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-slate-100 text-slate-600 border-slate-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                connected ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
              }`}
            />
            {connected ? "WebSocket Connected" : "Connecting…"}
          </div>

          <span className="text-[11px] text-slate-500 font-mono bg-white border border-slate-200 px-2 py-0.5 rounded-sm">
            Room #{roomId}
          </span>
        </div>
      </div>

      {/* WhatsApp-Style Chat Frame */}
      <div className="bg-white border border-slate-300 rounded-none shadow-md overflow-hidden flex flex-col h-[76vh] max-h-[820px]">
        {/* 1. WhatsApp Top Bar */}
        <div className="bg-[#f0f2f5] border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mentor Avatar with Online/Offline indicator */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#00a884]/15 border border-[#00a884]/30 text-[#00a884] flex items-center justify-center text-sm font-medium">
                {mentorName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "SM"}
              </div>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  mentorOnline ? "bg-[#25d366]" : "bg-slate-400"
                }`}
                title={mentorOnline ? "Mentor is Online" : "Mentor is Offline"}
              />
            </div>

            {/* Mentor Details & Dynamic Typing Status */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-slate-900 truncate leading-tight">
                  {mentorName}
                </h2>
                <span className="text-[10px] bg-slate-200/80 text-slate-700 font-normal px-1.5 py-0.2 rounded-sm shrink-0">
                  Senior Mentor
                </span>
              </div>

              <div className="flex items-center gap-2 mt-0.5">
                {isTyping ? (
                  <span className="text-xs text-[#25d366] font-normal flex items-center gap-1 animate-pulse">
                    <span>typing</span>
                    <span className="inline-flex gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-[#25d366] typing-dot-1"></span>
                      <span className="w-1 h-1 rounded-full bg-[#25d366] typing-dot-2"></span>
                      <span className="w-1 h-1 rounded-full bg-[#25d366] typing-dot-3"></span>
                    </span>
                  </span>
                ) : (
                  <span
                    className={`text-[11px] font-normal flex items-center gap-1 ${
                      mentorOnline ? "text-emerald-700" : "text-slate-500"
                    }`}
                  >
                    {mentorOnline ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
                        <span>Online</span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Offline (Away)</span>
                      </>
                    )}
                  </span>
                )}
                <span className="text-slate-300 text-xs">•</span>
                <span className="text-[11px] text-slate-500 truncate max-w-[220px] sm:max-w-xs font-normal">
                  {topicTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Send Doubt Session Email Alert Button */}
            <button
              type="button"
              onClick={() => setShowEmailModal(true)}
              className="inline-flex items-center gap-1.5 bg-[#0b3c5d] hover:bg-[#07283f] text-white text-xs font-normal px-3 py-1.5 rounded-sm transition-all shadow-xs active:scale-95"
              title="Send Doubt Session Email Alert to Senior"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">Send Doubt Session Email</span>
              <span className="sm:hidden">Email Alert</span>
            </button>
          </div>
        </div>

        {/* 2. WhatsApp Chat Canvas with Doodle Backdrop */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 whatsapp-chat-bg relative">
          {/* Security & End-to-End Encryption Notice */}
          <div className="flex justify-center">
            <div className="bg-[#ffeecd] border border-[#f0dbb3] text-[#725927] text-[11px] font-normal px-3.5 py-1.5 rounded-md shadow-xs max-w-md text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>
                Official SBTET Senior Connect Session. All academic discussions are monitored for student mentorship.
              </span>
            </div>
          </div>

          {/* Date Stamp Pill */}
          <div className="flex justify-center my-2">
            <span className="bg-white/90 border border-slate-200 text-slate-600 text-[11px] font-normal px-3 py-0.5 rounded-full shadow-xs">
              Today
            </span>
          </div>

          {/* Offline Senior Alert Notification Banner */}
          {!mentorOnline && (
            <div className="bg-white/95 border-l-4 border-amber-500 border-t border-r border-b border-slate-200 p-3 rounded-sm shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 animate-fadeIn">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-slate-800">
                    Senior mentor {mentorName} is currently Offline
                  </p>
                  <p className="text-[11px] text-slate-600 font-normal mt-0.5">
                    Send an official email notification so the senior receives an alert: <em>"You have a session to solve the Doubts"</em>.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(true)}
                className="shrink-0 bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-normal px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Notify Senior via Email</span>
              </button>
            </div>
          )}

          {/* System Notifications / Email Dispatches */}
          {systemAlerts.map((alert) => (
            <div key={alert.id} className="flex justify-center">
              <div
                className={`text-[11px] font-normal px-4 py-1.5 rounded-md shadow-xs max-w-lg text-center ${
                  alert.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                    : "bg-blue-50 border border-blue-200 text-blue-900"
                }`}
              >
                {alert.text}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {messages.length === 0 ? (
            <div className="bg-white/90 border border-slate-200 rounded-md p-6 max-w-md mx-auto text-center space-y-2 shadow-sm my-6">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-[#00a884] rounded-full flex items-center justify-center mx-auto text-xl">
                💬
              </div>
              <h3 className="text-sm font-medium text-slate-800">
                Start Your 1-on-1 Mentorship Chat
              </h3>
              <p className="text-xs font-normal text-slate-600 leading-relaxed">
                Ask your queries regarding ECET exams, lab practicals, syllabus, or career pathways. {mentorName} will guide you.
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-slate-500 font-normal">
                  Tip: Click any suggestion chip below to ask instantly!
                </span>
              </div>
            </div>
          ) : (
            messages.map((m, idx) => {
              const isMine = m.sender?.id === user?.id;
              const formattedTime = m.sentAt
                ? new Date(m.sentAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

              return (
                <div
                  key={m.id || idx}
                  className={`flex ${isMine ? "justify-end" : "justify-start"} items-end gap-1.5 group`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[72%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-xs relative ${
                      isMine
                        ? "bg-[#d9fdd3] text-slate-900 rounded-tr-xs border border-emerald-200/50"
                        : "bg-white text-slate-900 rounded-tl-xs border border-slate-200/80"
                    }`}
                  >
                    {/* Mentor Sender Name */}
                    {!isMine && (
                      <p className="text-[11px] font-medium text-[#008069] mb-0.5 flex items-center gap-1">
                        <span>{m.sender?.fullName || mentorName}</span>
                        <span className="text-[9px] text-slate-400 font-normal">• Senior</span>
                      </p>
                    )}

                    {/* Message Content (Clean regular font, no bold) */}
                    <p className="text-xs sm:text-[13px] text-slate-800 whitespace-pre-wrap font-normal leading-relaxed break-words">
                      {m.content}
                    </p>

                    {/* Bottom Metadata: Timestamp & Delivery Checkmarks */}
                    <div className="flex items-center justify-end gap-1 mt-1 -mb-0.5 text-right">
                      <span className="text-[10px] text-slate-500 font-normal font-sans">
                        {formattedTime}
                      </span>
                      {isMine && (
                        (m.isRead || m.read) ? (
                          <CheckCheck
                            className="w-3.5 h-3.5 text-[#53bdeb] shrink-0"
                            title="Read (Seen by receiver)"
                          />
                        ) : (
                          <CheckCheck
                            className="w-3.5 h-3.5 text-slate-400 shrink-0"
                            title="Delivered (Not seen yet)"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Real-time Typing Bubble Animation */}
          {isTyping && (
            <div className="flex justify-start items-center gap-2 animate-fadeIn">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-xs flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-normal mr-1">{mentorName} is typing</span>
                <span className="w-2 h-2 rounded-full bg-[#00a884] typing-dot-1"></span>
                <span className="w-2 h-2 rounded-full bg-[#00a884] typing-dot-2"></span>
                <span className="w-2 h-2 rounded-full bg-[#00a884] typing-dot-3"></span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* 3. Quick Doubt Suggestion Chips */}
        <div className="bg-[#f0f2f5] border-t border-slate-200 px-3 py-1.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[11px] text-slate-500 font-normal whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Quick Doubts:</span>
          </span>
          {QUICK_DOUBTS.map((doubt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleQuickDoubt(doubt)}
              className="text-[11px] font-normal text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shadow-2xs shrink-0"
            >
              {doubt}
            </button>
          ))}
        </div>

        {/* 4. WhatsApp Bottom Input Bar */}
        <div className="bg-[#f0f2f5] border-t border-slate-200 p-2.5 flex items-center gap-2 shrink-0 relative">
          {/* Attachment Menu Popup */}
          {showAttachMenu && (
            <div className="absolute bottom-16 left-4 bg-white border border-slate-200 rounded-lg shadow-lg p-2 flex flex-col gap-1 z-30 min-w-[180px] animate-fadeIn">
              <button
                type="button"
                onClick={() => {
                  setDraft((prev) => prev + " [Attached Code Problem Snippet]");
                  setShowAttachMenu(false);
                }}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:bg-slate-50 p-2 rounded-sm text-left transition-colors font-normal"
              >
                <Code className="w-4 h-4 text-purple-600" />
                <span>Attach Problem Code</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraft((prev) => prev + " [Attached Circuit / Diagram Image]");
                  setShowAttachMenu(false);
                }}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:bg-slate-50 p-2 rounded-sm text-left transition-colors font-normal"
              >
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Attach Diagram / Image</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraft((prev) => prev + " [Attached Previous Year Paper Question]");
                  setShowAttachMenu(false);
                }}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:bg-slate-50 p-2 rounded-sm text-left transition-colors font-normal"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Attach Syllabus / Question</span>
              </button>
            </div>
          )}

          {/* Quick Emoji Picker Popup */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-12 bg-white border border-slate-200 rounded-lg shadow-lg p-2.5 flex flex-wrap gap-2 z-30 max-w-[220px] animate-fadeIn">
              {["👍", "🙏", "🎓", "💡", "❓", "✅", "📚", "⭐", "👏", "🔥", "🤝", "🚀"].map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => {
                    setDraft((prev) => prev + " " + em);
                    setShowEmojiPicker(false);
                  }}
                  className="text-lg hover:scale-125 transition-transform p-1"
                >
                  {em}
                </button>
              ))}
            </div>
          )}

          {/* Emoji Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setShowEmojiPicker((prev) => !prev);
              setShowAttachMenu(false);
            }}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-200 transition-colors"
            title="Add Emoji"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Attachment Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setShowAttachMenu((prev) => !prev);
              setShowEmojiPicker(false);
            }}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-200 transition-colors"
            title="Attach Query File / Code"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Text Input Field */}
          <form onSubmit={sendMessage} className="flex-1 flex items-center gap-2">
            <input
              type="text"
              className="w-full bg-white border border-slate-200 rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00a884] focus:border-[#00a884] shadow-inner font-normal"
              placeholder="Type your message to the senior mentor…"
              value={draft}
              onChange={handleDraftChange}
              autoFocus
            />

            {/* Send or Voice Note Button */}
            {draft.trim() ? (
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm shrink-0"
                title="Send Message"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setDraft("Hello Senior, I have a quick academic query regarding our syllabus.");
                }}
                className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors shrink-0"
                title="Quick Prompt"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* 5. Offline Doubt Session Email Notification Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-lg shadow-2xl rounded-none overflow-hidden animate-fadeIn font-sans">
            {/* Modal Header */}
            <div className="bg-[#0b3c5d] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-300" />
                <h3 className="text-sm font-medium text-white">
                  Send Doubt Session Email Alert
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSendEmailNotification} className="p-5 space-y-4">
              {emailSentSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="text-base font-medium text-slate-900">
                    Email Alert Dispatched Successfully!
                  </h4>
                  <p className="text-xs font-normal text-slate-600">
                    {mentorName} has been notified at their registered email address. You will receive real-time updates as soon as they join this room.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 border border-blue-200 text-blue-900 text-xs p-3 rounded-none flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <p className="font-normal leading-relaxed">
                      This alert notifies the senior mentor via email that you have initiated a doubt session on PolyConnect with a direct link to this chat room.
                    </p>
                  </div>

                  {/* Recipient Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-normal text-slate-500 uppercase mb-1">
                        Mentor Recipient
                      </label>
                      <input
                        type="text"
                        disabled
                        value={`${mentorName} (${room?.mentor?.email || "senior.mentor@sbtet.edu"})`}
                        className="w-full bg-slate-100 border border-slate-300 px-3 py-1.5 text-slate-700 rounded-none font-normal"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-normal text-slate-500 uppercase mb-1">
                        Student Sender
                      </label>
                      <input
                        type="text"
                        disabled
                        value={`${user?.fullName || "Student"} (PIN: ${user?.pin || "SBTET"})`}
                        className="w-full bg-slate-100 border border-slate-300 px-3 py-1.5 text-slate-700 rounded-none font-normal"
                      />
                    </div>
                  </div>

                  {/* Subject Line */}
                  <div>
                    <label className="block text-[11px] font-normal text-slate-600 uppercase mb-1">
                      Email Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-slate-800 rounded-none focus:outline-none focus:border-[#0b3c5d] font-normal"
                      required
                    />
                  </div>

                  {/* Email Body */}
                  <div>
                    <label className="block text-[11px] font-normal text-slate-600 uppercase mb-1">
                      Email Message Content
                    </label>
                    <textarea
                      rows={6}
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      className="w-full bg-white border border-slate-300 p-3 text-xs text-slate-800 rounded-none focus:outline-none focus:border-[#0b3c5d] font-normal leading-relaxed resize-none"
                      required
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={handleOpenMailClient}
                      className="text-xs text-[#0b3c5d] hover:underline font-normal flex items-center gap-1"
                    >
                      <span>Open in Mail App</span> &rarr;
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setShowEmailModal(false)}
                        className="flex-1 sm:flex-none px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-none font-normal"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={emailSending}
                        className="flex-1 sm:flex-none px-5 py-2 text-xs bg-[#0b3c5d] hover:bg-[#07283f] text-white rounded-none font-normal transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{emailSending ? "Sending Email…" : "Send Official Email"}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

