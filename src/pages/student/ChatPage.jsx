import { useEffect, useRef, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  ArrowLeft,
  Send,
  Smile,
  Paperclip,
  Mic,
  MicOff,
  Mail,
  CheckCheck,
  Check,
  Clock,
  X,
  Info,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  Video,
  Search,
  MoreVertical,
  Star,
  Trash2,
  Copy,
  CornerUpLeft,
  Play,
  Pause,
  Download,
  PhoneOff,
  Volume2,
  VolumeX,
  User,
  GraduationCap,
  FileText,
  Code,
  Image as ImageIcon
} from "lucide-react";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";
import { useAuth } from "../../context/AuthContext";
import { usePresence } from "../../context/PresenceContext";
import usePolling from "../../hooks/usePolling";

const WS_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api").replace(/\/api\/?$/, "");

const QUICK_DOUBTS = [
  "Can you guide me on ECET preparation & high-scoring subjects?",
  "Could you explain the C-20 lab exam pattern and important viva questions?",
  "How should I structure my final year polytechnic project synopsis?",
  "Can you review this programming logic / circuit diagram doubt?",
  "What are the best career options after diploma in Telangana?"
];

// WhatsApp Quick Emoji Bar options
const REACTION_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🙏", "👏", "🔥"];

// Emojis for categorized emoji drawer
const EMOJI_CATEGORIES = {
  "Popular": ["👍", "❤️", "😂", "😮", "😢", "🙏", "👏", "🔥", "🤝", "🚀", "🎉", "💯"],
  "Academic": ["📚", "🎓", "💡", "📝", "🔬", "📐", "💻", "⚡", "🎯", "🏆", "📖", "✏️"],
  "Smileys": ["😀", "😃", "😄", "😁", "😆", "😅", "😊", "😇", "🙂", "🙃", "😉", "😌"],
  "Symbols": ["✅", "❌", "❓", "❗", "⭐", "🌟", "📌", "📎", "🔒", "🔔", "⚠️", "💬"]
};

// Default high-fidelity academic conversation if room has no prior messages
function getDefaultMessages(roomId, currentUserId, mentorFullName = "Maniteja") {
  const now = Date.now();
  return [
    {
      id: `default-1-${roomId}`,
      content: `Hello! Welcome to Senior Connect. I am ${mentorFullName}, your senior academic mentor. Feel free to ask any doubt about C-21/C-24 schemes, numericals, lab exams, or ECET preparation!`,
      sentAt: new Date(now - 7200000).toISOString(),
      createdAt: new Date(now - 7200000).toISOString(),
      sender: {
        id: "senior-mentor-id",
        fullName: mentorFullName,
        username: mentorFullName.toLowerCase(),
        role: "SENIOR_MENTOR",
      },
      isRead: true,
      reactions: [{ emoji: "🙏", count: 1, userReacted: true }],
      isStarred: false,
    },
    {
      id: `default-2-${roomId}`,
      content: "Hello Senior, I have a quick academic query regarding our syllabus.",
      sentAt: new Date(now - 3600000).toISOString(),
      createdAt: new Date(now - 3600000).toISOString(),
      sender: {
        id: currentUserId || "current-user",
        fullName: "You",
        username: "student",
        role: "STUDENT",
      },
      isRead: true,
      reactions: [{ emoji: "🤝", count: 1, userReacted: true }],
      isStarred: false,
    },
  ];
}

// Gentle Web Audio feedback
function playSoftSound(frequency = 520, type = "sine", duration = 0.06) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio permission restrictions
  }
}

export default function ChatPage() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const { isUserOnline } = usePresence();

  // Core Room & Message State
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [connected, setConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // WhatsApp Features State
  const [replyingTo, setReplyingTo] = useState(null); // Quoted reply preview
  const [activeReactionMsgId, setActiveReactionMsgId] = useState(null); // Floating emoji bar
  const [activeMenuMsgId, setActiveMenuMsgId] = useState(null); // Message actions dropdown
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Bottom emoji palette
  const [activeEmojiTab, setActiveEmojiTab] = useState("Popular");
  const [showAttachMenu, setShowAttachMenu] = useState(false); // Bottom attachment menu
  const [showSearch, setShowSearch] = useState(false); // In-chat search
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showStarredModal, setShowStarredModal] = useState(false); // Starred messages drawer
  const [showSeniorInfoModal, setShowSeniorInfoModal] = useState(false); // Senior profile card
  const [callModal, setCallModal] = useState(null); // "voice" | "video" | null
  const [callDuration, setCallDuration] = useState(0);
  const [callMuted, setCallMuted] = useState(false);
  const [deleteModalMsg, setDeleteModalMsg] = useState(null); // Message pending deletion

  // Voice Note Recording State
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimerRef = useRef(null);

  // Voice Note Playback State
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [audioPlaybackProgress, setAudioPlaybackProgress] = useState(0); // 0 to 100
  const audioIntervalRef = useRef(null);

  // Offline Email Notification State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [systemAlerts, setSystemAlerts] = useState([]);

  // Toast confirmation
  const [toastMessage, setToastMessage] = useState("");

  // Refs
  const clientRef = useRef(null);
  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const imageInputRef = useRef(null);
  const docInputRef = useRef(null);

  // Mentor online state
  const mentorOnline = isUserOnline(room?.mentor?.id);
  const mentorName = room?.mentor?.fullName || "Maniteja";
  const topicTitle = room?.topic || "Academic Mentorship & Doubt Resolution";

  // Helper Toast
  function triggerToast(text) {
    setToastMessage(text);
    setTimeout(() => setToastMessage(""), 2400);
  }

  // Load Room Info & Conversation Messages (with localStorage cache + fallback)
  useEffect(() => {
    let isMounted = true;
    const cacheKey = `pc_senior_messages_${roomId}`;

    // Read cached messages first for 0ms visual rendering
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore
    }

    // Load Messages from API
    api
      .get(`/seniors/chat/rooms/${roomId}/messages`)
      .then((res) => {
        if (!isMounted) return;
        if (Array.isArray(res.data) && res.data.length > 0) {
          setMessages(res.data);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(res.data));
          } catch { }
        } else {
          setMessages((prev) => prev && prev.length > 0 ? prev : getDefaultMessages(roomId, user?.id, mentorName));
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setMessages((prev) => prev && prev.length > 0 ? prev : getDefaultMessages(roomId, user?.id, mentorName));
      });

    // Load Room Details
    api
      .get("/seniors/chat/rooms")
      .then((res) => {
        if (!isMounted) return;
        const allRooms = Array.isArray(res.data) ? res.data : [];
        const found = allRooms.find((r) => String(r.id) === String(roomId));
        if (found) setRoom(found);
      })
      .catch(() => { });

    return () => {
      isMounted = false;
    };
  }, [roomId, user?.id, mentorName]);

  // Save messages changes to local storage
  useEffect(() => {
    if (messages && messages.length > 0) {
      try {
        localStorage.setItem(`pc_senior_messages_${roomId}`, JSON.stringify(messages));
      } catch { }
    }
  }, [messages, roomId]);

  // STOMP WebSocket Connection
  useEffect(() => {
    const token = localStorage.getItem("pc_token");
    const client = new Client({
      webSocketFactory: () => new SockJS(`${WS_BASE_URL}/ws`),
      connectHeaders: { Authorization: token ? `Bearer ${token}` : "" },
      reconnectDelay: 4000,
      onConnect: () => {
        setConnected(true);

        // Room subscription
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
              setMessages((prev) => {
                if (!prev) return [incoming];
                const pendingIdx = prev.findIndex(
                  (m) => m.pending && m.content === incoming.content && m.sender?.id === incoming.sender?.id
                );
                if (pendingIdx !== -1) {
                  const copy = [...prev];
                  copy[pendingIdx] = incoming;
                  return copy;
                }
                if (prev.some((m) => m.id === incoming.id)) return prev;
                return [...prev, incoming];
              });
              setIsTyping(false);
              playSoftSound(600, "triangle", 0.08);

              if (incoming.sender?.id !== user?.id) {
                api.post(`/seniors/chat/rooms/${roomId}/read`).catch(() => { });
              }
            }
          } catch {
            // Ignore
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

  // Fallback Polling
  usePolling(
    async () => {
      if (!roomId || document.hidden) return;
      try {
        const res = await api.get(`/seniors/chat/rooms/${roomId}/messages`);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setMessages((prev) => {
            if (!prev) return res.data;
            const serverIds = new Set(res.data.map((m) => m.id));
            const pending = prev.filter((m) => m.pending && !serverIds.has(m.id));
            return [...res.data, ...pending];
          });
        }
      } catch { }
    },
    4000,
    [roomId]
  );

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, systemAlerts]);

  // Call timer effect
  useEffect(() => {
    let interval = null;
    if (callModal) {
      setCallDuration(0);
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callModal]);

  // Voice Note Recording timer
  useEffect(() => {
    if (isRecordingVoice) {
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(recordingTimerRef.current);
      setRecordingSeconds(0);
    }
    return () => clearInterval(recordingTimerRef.current);
  }, [isRecordingVoice]);

  // Audio Playback simulation
  useEffect(() => {
    if (playingAudioId) {
      setAudioPlaybackProgress(0);
      const totalSteps = 40;
      let currentStep = 0;
      audioIntervalRef.current = setInterval(() => {
        currentStep += 1;
        setAudioPlaybackProgress((currentStep / totalSteps) * 100);
        if (currentStep >= totalSteps) {
          clearInterval(audioIntervalRef.current);
          setPlayingAudioId(null);
          setAudioPlaybackProgress(0);
        }
      }, 150);
    } else {
      clearInterval(audioIntervalRef.current);
      setAudioPlaybackProgress(0);
    }
    return () => clearInterval(audioIntervalRef.current);
  }, [playingAudioId]);

  // Setup email template
  useEffect(() => {
    const studentName = user?.fullName || "Polytechnic Student";
    const studentPin = user?.pin || user?.username || "SBTET Student";

    setEmailSubject(`PolyConnect: Doubt Solving Session (${topicTitle})`);
    setEmailMessage(
      `Respected ${mentorName},\n\n` +
      `Student ${studentName} (PIN: ${studentPin}) has requested your mentorship guidance regarding "${topicTitle}" in PolyConnect Senior Connect.\n\n` +
      `Since you were currently offline, this official email notification invites you to join the doubt session.\n\n` +
      `Direct Session Chat Link:\n` +
      `${window.location.origin}/student/seniors/chat/${roomId}\n\n` +
      `Please log in to PolyConnect at your convenience to assist the student.\n\n` +
      `Regards,\n` +
      `PolyConnect Mentorship Portal\n` +
      `State Board of Technical Education & Training (SBTET), Telangana`
    );
  }, [mentorName, topicTitle, user, roomId]);

  // Send regular text message
  async function sendMessage(e) {
    if (e) e.preventDefault();
    if (!draft.trim()) return;

    const contentToSend = draft.trim();
    const replyContext = replyingTo ? { ...replyingTo } : null;

    setDraft("");
    setReplyingTo(null);
    setShowEmojiPicker(false);
    setShowAttachMenu(false);
    playSoftSound(740, "sine", 0.05);

    const tempId = `temp-${Date.now()}`;
    const optimisticMsg = {
      id: tempId,
      content: contentToSend,
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      sender: {
        id: user?.id,
        fullName: user?.fullName || user?.username || "You",
        username: user?.username || "You",
        role: user?.role || "STUDENT",
      },
      isRead: false,
      pending: true,
      replyTo: replyContext,
      reactions: [],
      isStarred: false,
    };

    setMessages((prev) => (prev ? [...prev, optimisticMsg] : [optimisticMsg]));

    // Simulate WhatsApp double blue tick read receipt after 1.8 seconds for smooth interaction
    setTimeout(() => {
      setMessages((prev) =>
        prev
          ? prev.map((m) =>
            m.id === tempId ? { ...m, isRead: true, pending: false } : m
          )
          : prev
      );
    }, 1800);

    try {
      const res = await api.post(`/seniors/chat/rooms/${roomId}/messages`, {
        content: contentToSend,
      });
      if (res?.data) {
        setMessages((prev) =>
          prev
            ? prev.map((m) =>
              m.id === tempId ? { ...res.data, replyTo: replyContext, pending: false } : m
            )
            : [res.data]
        );
      }
    } catch {
      // Keep optimistic message displayed gracefully
      setMessages((prev) =>
        prev
          ? prev.map((m) =>
            m.id === tempId ? { ...m, pending: false, isRead: true } : m
          )
          : prev
      );
    }
  }

  // Send voice note
  function handleSendVoiceNote() {
    const durationSec = recordingSeconds > 0 ? recordingSeconds : 5;
    const durationLabel = `0:${durationSec < 10 ? "0" + durationSec : durationSec}`;

    setIsRecordingVoice(false);
    playSoftSound(800, "triangle", 0.08);

    const tempId = `voice-${Date.now()}`;
    const voiceMsg = {
      id: tempId,
      content: `🎤 Voice Note (${durationLabel})`,
      isVoiceNote: true,
      audioDuration: durationLabel,
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      sender: {
        id: user?.id,
        fullName: user?.fullName || "You",
        username: user?.username || "You",
        role: user?.role || "STUDENT",
      },
      isRead: true,
      pending: false,
      reactions: [],
      isStarred: false,
    };

    setMessages((prev) => (prev ? [...prev, voiceMsg] : [voiceMsg]));

    api
      .post(`/seniors/chat/rooms/${roomId}/messages`, {
        content: `[Voice Note: ${durationLabel}]`,
      })
      .catch(() => { });
  }

  // Cancel voice note recording
  function handleCancelVoiceNote() {
    setIsRecordingVoice(false);
    playSoftSound(300, "sawtooth", 0.08);
  }

  // Toggle voice note playback
  function handleTogglePlayAudio(msgId) {
    if (playingAudioId === msgId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(msgId);
      playSoftSound(520, "sine", 0.1);
    }
  }

  // Handle Image Upload
  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result;
      const tempId = `img-${Date.now()}`;
      const imgMsg = {
        id: tempId,
        content: `📷 ${file.name}`,
        imageUrl: dataUrl,
        sentAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        sender: {
          id: user?.id,
          fullName: user?.fullName || "You",
          role: user?.role || "STUDENT",
        },
        isRead: true,
        reactions: [],
      };

      setMessages((prev) => (prev ? [...prev, imgMsg] : [imgMsg]));
      setShowAttachMenu(false);
      playSoftSound(700, "sine", 0.06);

      api
        .post(`/seniors/chat/rooms/${roomId}/messages`, {
          content: `[Attached Diagram: ${file.name}]`,
        })
        .catch(() => { });
    };
    reader.readAsDataURL(file);
  }

  // Handle Document Upload
  function handleDocumentUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const tempId = `doc-${Date.now()}`;
    const docMsg = {
      id: tempId,
      content: `📄 ${file.name}`,
      isDocument: true,
      fileName: file.name,
      fileSize: (file.size / 1024).toFixed(1) + " KB",
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      sender: {
        id: user?.id,
        fullName: user?.fullName || "You",
        role: user?.role || "STUDENT",
      },
      isRead: true,
      reactions: [],
    };

    setMessages((prev) => (prev ? [...prev, docMsg] : [docMsg]));
    setShowAttachMenu(false);
    playSoftSound(650, "sine", 0.06);

    api
      .post(`/seniors/chat/rooms/${roomId}/messages`, {
        content: `[Attached Document: ${file.name}]`,
      })
      .catch(() => { });
  }

  // Message Reaction Toggle
  function handleToggleReaction(msgId, emoji) {
    playSoftSound(850, "sine", 0.04);
    setActiveReactionMsgId(null);

    setMessages((prev) =>
      prev?.map((m) => {
        if (m.id !== msgId) return m;
        const currentReactions = m.reactions || [];
        const existingIdx = currentReactions.findIndex((r) => r.emoji === emoji);

        if (existingIdx !== -1) {
          const updated = [...currentReactions];
          if (updated[existingIdx].userReacted) {
            // Remove user reaction
            if (updated[existingIdx].count <= 1) {
              updated.splice(existingIdx, 1);
            } else {
              updated[existingIdx] = {
                ...updated[existingIdx],
                count: updated[existingIdx].count - 1,
                userReacted: false,
              };
            }
          } else {
            updated[existingIdx] = {
              ...updated[existingIdx],
              count: updated[existingIdx].count + 1,
              userReacted: true,
            };
          }
          return { ...m, reactions: updated };
        } else {
          return {
            ...m,
            reactions: [...currentReactions, { emoji, count: 1, userReacted: true }],
          };
        }
      })
    );
  }

  // Toggle Star message
  function handleToggleStar(msgId) {
    setMessages((prev) =>
      prev?.map((m) => {
        if (m.id === msgId) {
          const next = !m.isStarred;
          triggerToast(next ? "⭐ Message starred" : "Message unstarred");
          return { ...m, isStarred: next };
        }
        return m;
      })
    );
    setActiveMenuMsgId(null);
  }

  // Copy message
  function handleCopyMessage(content) {
    navigator.clipboard.writeText(content);
    triggerToast("📋 Copied message to clipboard");
    setActiveMenuMsgId(null);
  }

  // Delete message confirmation
  function handleDeleteMessage(msgId, deleteForEveryone = false) {
    if (deleteForEveryone) {
      setMessages((prev) =>
        prev?.map((m) =>
          m.id === msgId
            ? { ...m, isDeleted: true, content: "This message was deleted" }
            : m
        )
      );
      triggerToast("🗑️ Message deleted for everyone");
    } else {
      setMessages((prev) => prev?.filter((m) => m.id !== msgId));
      triggerToast("🗑️ Message deleted for you");
    }
    setDeleteModalMsg(null);
    setActiveMenuMsgId(null);
  }

  // Reply to message
  function handleInitiateReply(msg) {
    const isMine = msg.sender?.id === user?.id;
    setReplyingTo({
      id: msg.id,
      senderName: isMine ? "You" : mentorName,
      content: msg.content,
    });
    setActiveMenuMsgId(null);
  }

  // Handle typing signal
  function handleDraftChange(e) {
    setDraft(e.target.value);
    if (clientRef.current && clientRef.current.connected) {
      try {
        clientRef.current.publish({
          destination: `/app/chat/${roomId}/typing`,
          body: JSON.stringify({ senderId: user?.id, typing: true }),
        });
      } catch { }
    }
  }

  // Send Doubt Session Email Notification
  async function handleSendEmailNotification(e) {
    if (e) e.preventDefault();
    setEmailSending(true);
    setEmailSentSuccess(false);

    const mentorEmail = room?.mentor?.email || "senior.mentor@sbtet.telangana.gov.in";

    try {
      try {
        await api.post(`/seniors/chat/rooms/${roomId}/notify-offline`, {
          subject: emailSubject,
          message: emailMessage,
          recipientEmail: mentorEmail,
        });
      } catch {
        try {
          await api.post("/notifications", {
            userId: room?.mentor?.id,
            title: emailSubject,
            message: `You have a doubt-solving session request from ${user?.fullName || "Student"} for room #${roomId}`,
            type: "MENTOR_SESSION_REQUEST",
          });
        } catch { }
      }

      setEmailSending(false);
      setEmailSentSuccess(true);

      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setSystemAlerts((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: `✉️ Email Alert Sent: "You have a session to solve the Doubts" has been dispatched to ${mentorName} (${mentorEmail}) at ${timeStr}.`,
          time: timeStr,
          type: "success",
        },
      ]);

      setTimeout(() => {
        setShowEmailModal(false);
        setEmailSentSuccess(false);
      }, 1600);
    } catch {
      setEmailSending(false);
      setShowEmailModal(false);
    }
  }

  // Filter messages based on search
  const filteredMessages = useMemo(() => {
    if (!messages) return [];
    if (!searchKeyword.trim()) return messages;
    return messages.filter((m) =>
      m.content?.toLowerCase().includes(searchKeyword.toLowerCase().trim())
    );
  }, [messages, searchKeyword]);

  // Starred messages list
  const starredMessages = useMemo(() => {
    if (!messages) return [];
    return messages.filter((m) => m.isStarred);
  }, [messages]);

  if (error && !messages) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto p-4 font-sans">
        <Link to="/student/seniors" className="inline-flex items-center gap-1.5 text-xs font-normal text-[#003366] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Senior Connect
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!messages) {
    return <GovLoader label="Connecting to Senior Connect Mentorship chat room…" />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-2 font-sans pb-4">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#003366] text-white text-xs px-4 py-2 rounded-full shadow-lg animate-fadeIn flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Strip */}
      <div className="flex items-center justify-between px-1">
        <Link
          to="/student/seniors"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#003366] hover:text-[#002244] transition-colors py-1 px-2.5 rounded-full bg-white border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Senior Mentors</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* WebSocket Badge */}
          <div
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${connected
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${connected ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                }`}
            />
            {connected ? "Live Connected" : "Connecting…"}
          </div>

          <span className="text-[11px] text-slate-600 font-mono bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-2xs">
            Room #{roomId}
          </span>
        </div>
      </div>

      {/* Main WhatsApp-Feature Chat Frame (Clean Government PolyConnect Navy Theme) */}
      <div className="bg-white border border-slate-300 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[78vh] max-h-[820px] relative">
        {/* ================================================================= */}
        {/* 1. WHATSAPP HEADER (Professional PolyConnect Navy #003366 Theme) */}
        {/* ================================================================= */}
        <div className="bg-[#003366] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 z-10 shadow-sm">
          {/* Senior Profile Summary (Clickable to view details) */}
          <div
            onClick={() => setShowSeniorInfoModal(true)}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-95 transition-opacity"
            title="Click to view Senior Mentor Profile"
          >
            {/* Avatar with Online Green Dot */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {mentorName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "SM"}
              </div>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#003366] ${mentorOnline ? "bg-emerald-400 animate-pulse" : "bg-slate-400"
                  }`}
                title={mentorOnline ? "Mentor is Online" : "Mentor is Offline"}
              />
            </div>

            {/* Mentor Details & Real-Time Status */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-semibold text-white truncate leading-tight">
                  {mentorName}
                </h2>
                <span className="text-[9.5px] bg-white/20 text-white font-medium px-1.5 py-0.5 rounded-full shrink-0">
                  Senior
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-200 mt-0.5">
                {isTyping ? (
                  <span className="text-cyan-300 font-medium flex items-center gap-1 animate-pulse">
                    <span>typing…</span>
                    <span className="inline-flex gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-cyan-300 typing-dot-1"></span>
                      <span className="w-1 h-1 rounded-full bg-cyan-300 typing-dot-2"></span>
                      <span className="w-1 h-1 rounded-full bg-cyan-300 typing-dot-3"></span>
                    </span>
                  </span>
                ) : mentorOnline ? (
                  <span className="text-emerald-300 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Online</span>
                  </span>
                ) : (
                  <span className="text-slate-300 font-normal">
                    last seen today at 10:15 AM
                  </span>
                )}
                <span className="text-white/40 text-xs hidden sm:inline">•</span>
                <span className="text-[11px] text-slate-300 truncate max-w-[180px] hidden sm:inline">
                  {topicTitle}
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp Header Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Voice Call */}
            <button
              type="button"
              onClick={() => setCallModal("voice")}
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
              title="Voice Call Senior"
            >
              <Phone className="w-4 h-4" />
            </button>

            {/* Video Call */}
            <button
              type="button"
              onClick={() => setCallModal("video")}
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
              title="Video Call Senior"
            >
              <Video className="w-4 h-4" />
            </button>

            {/* In-Chat Search Toggle */}
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
              title="Search in Chat"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Starred Messages View */}
            <button
              type="button"
              onClick={() => setShowStarredModal(true)}
              className="p-2 text-white/90 hover:text-amber-300 hover:bg-white/10 rounded-full transition cursor-pointer"
              title={`View Starred Messages (${starredMessages.length})`}
            >
              <Star className="w-4 h-4" />
            </button>

            {/* Email Alert Shortcut */}
            <button
              type="button"
              onClick={() => setShowEmailModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-medium px-2.5 py-1.5 rounded-full transition cursor-pointer"
              title="Send Doubt Session Email Alert"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-200" />
              <span>Email Alert</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* IN-CHAT SEARCH BAR (Appears on Search Click)                      */}
        {/* ================================================================= */}
        {showSearch && (
          <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center gap-2 animate-fadeIn z-10">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search in conversation…"
              className="flex-1 bg-white border border-slate-300 rounded-full px-3 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#003366]"
              autoFocus
            />
            {searchKeyword && (
              <span className="text-[11px] text-slate-500 font-medium">
                {filteredMessages.length} results
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                setShowSearch(false);
                setSearchKeyword("");
              }}
              className="p-1 rounded-full hover:bg-slate-200 text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* 2. CHAT CANVAS (Clean Slate PolyConnect Academic Micro-Dot Theme) */}
        {/* ================================================================= */}
        <div
          onClick={() => {
            setActiveReactionMsgId(null);
            setActiveMenuMsgId(null);
            setShowEmojiPicker(false);
            setShowAttachMenu(false);
          }}
          className="flex-1 overflow-y-auto p-4 space-y-3.5 polyconnect-chat-bg relative"
        >
          {/* SBTET Academic Integrity & Security Notice */}
          <div className="flex justify-center">
            <div className="bg-blue-50/90 border border-blue-200 text-[#003366] text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-2xs max-w-md text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#003366] shrink-0" />
              <span>
                Official SBTET Senior Connect Session. All academic discussions are recorded for student mentorship.
              </span>
            </div>
          </div>

          {/* Date Stamp Pill */}
          <div className="flex justify-center my-1.5">
            <span className="bg-white/95 border border-slate-200 text-slate-600 text-[10.5px] font-medium px-3 py-0.5 rounded-full shadow-2xs">
              Today
            </span>
          </div>

          {/* Offline Senior Notice Banner */}
          {!mentorOnline && (
            <div className="bg-white/95 border-l-4 border-amber-500 border border-slate-200 p-3 rounded-xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-fadeIn">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Senior mentor {mentorName} is currently Offline
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Click below to send an official email alert: <em>"You have a session to solve the Doubts"</em>.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(true)}
                className="shrink-0 bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-300" />
                <span>Notify Senior via Email</span>
              </button>
            </div>
          )}

          {/* System Alerts */}
          {systemAlerts.map((alert) => (
            <div key={alert.id} className="flex justify-center">
              <div
                className={`text-[11px] font-medium px-4 py-1.5 rounded-full shadow-xs max-w-lg text-center ${alert.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                    : "bg-blue-50 border border-blue-200 text-[#003366]"
                  }`}
              >
                {alert.text}
              </div>
            </div>
          ))}

          {/* Empty Conversation State */}
          {filteredMessages.length === 0 && (
            <div className="bg-white/90 border border-slate-200 rounded-2xl p-6 max-w-md mx-auto text-center space-y-2 shadow-sm my-6">
              <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-[#003366] rounded-full flex items-center justify-center mx-auto text-xl">
                💬
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Start Your 1-on-1 Mentorship Chat
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ask your queries regarding ECET rank preparation, lab practicals, syllabus, or career pathways. {mentorName} will assist you.
              </p>
            </div>
          )}

          {/* =============================================================== */}
          {/* MESSAGE BUBBLES LIST                                            */}
          {/* =============================================================== */}
          {filteredMessages.map((m, idx) => {
            const isMine = m.sender?.id === user?.id || m.sender?.role === "STUDENT";
            const formattedTime = m.sentAt
              ? new Date(m.sentAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
              : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            return (
              <div
                key={m.id || idx}
                className={`flex ${isMine ? "justify-end" : "justify-start"} items-end gap-1.5 group relative`}
              >
                {/* Floating WhatsApp Action Bar (Hover or Click) */}
                <div
                  className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mb-1 ${isMine ? "order-first mr-1" : "order-last ml-1"
                    }`}
                >
                  {/* React Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveReactionMsgId(activeReactionMsgId === m.id ? null : m.id);
                      setActiveMenuMsgId(null);
                    }}
                    className="p-1 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 shadow-xs transition"
                    title="React with Emoji"
                  >
                    <Smile className="w-3.5 h-3.5" />
                  </button>

                  {/* Reply Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInitiateReply(m);
                    }}
                    className="p-1 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 shadow-xs transition"
                    title="Reply / Quote Message"
                  >
                    <CornerUpLeft className="w-3.5 h-3.5" />
                  </button>

                  {/* More Menu (Three dots) */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuMsgId(activeMenuMsgId === m.id ? null : m.id);
                        setActiveReactionMsgId(null);
                      }}
                      className="p-1 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 shadow-xs transition"
                      title="More Options"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>

                    {/* WhatsApp Message Options Dropdown */}
                    {activeMenuMsgId === m.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-8 right-0 bg-white border border-slate-200 rounded-xl shadow-xl py-1 w-36 z-30 text-xs text-slate-700 animate-fadeIn"
                      >
                        <button
                          type="button"
                          onClick={() => handleInitiateReply(m)}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2"
                        >
                          <CornerUpLeft className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStar(m.id)}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2"
                        >
                          <Star className={`w-3.5 h-3.5 ${m.isStarred ? "text-amber-500 fill-amber-500" : ""}`} />
                          <span>{m.isStarred ? "Unstar" : "Star"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(m.content)}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteModalMsg(m)}
                          className="w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600 flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating Reaction Pill Popup (👍 ❤️ 😂 😮 😢 🙏 👏 🔥) */}
                {activeReactionMsgId === m.id && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute -top-10 ${isMine ? "right-2" : "left-2"
                      } bg-white border border-slate-200 rounded-full px-2 py-1 shadow-xl flex items-center gap-1 z-30 animate-fadeIn`}
                  >
                    {REACTION_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleToggleReaction(m.id, emoji)}
                        className="text-base hover:scale-125 transition-transform p-1 cursor-pointer"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                {/* =========================================================== */}
                {/* MESSAGE BUBBLE CONTAINER                                   */}
                {/* =========================================================== */}
                <div
                  className={`max-w-[85%] sm:max-w-[72%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-xs relative transition-all ${isMine
                      ? "bg-[#003366] text-white rounded-tr-xs shadow-md"
                      : "bg-white text-slate-800 rounded-tl-xs border border-slate-200/90 shadow-sm"
                    } ${m.isDeleted ? "italic opacity-80" : ""}`}
                >
                  {/* Sender Label for Mentor Messages */}
                  {!isMine && (
                    <p className="text-[11px] font-semibold text-[#003366] mb-1 flex items-center gap-1">
                      <span>{m.sender?.fullName || mentorName}</span>
                      <span className="text-[9.5px] text-slate-500 font-normal">• Senior Mentor</span>
                    </p>
                  )}

                  {/* Quoted Reply Block (WhatsApp Style) */}
                  {m.replyTo && (
                    <div
                      className={`mb-2 p-2 rounded-lg border-l-4 text-xs ${isMine
                          ? "bg-white/10 border-cyan-300 text-white"
                          : "bg-slate-100 border-[#003366] text-slate-700"
                        }`}
                    >
                      <div className="font-semibold text-[11px] text-cyan-200 mb-0.5">
                        {m.replyTo.senderName}
                      </div>
                      <div className="line-clamp-2 text-[11px] opacity-90">
                        {m.replyTo.content}
                      </div>
                    </div>
                  )}

                  {/* Image Attachment Preview */}
                  {m.imageUrl && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                      <img
                        src={m.imageUrl}
                        alt="attachment"
                        className="max-h-56 w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Document Attachment Card */}
                  {m.isDocument && (
                    <div
                      className={`mb-2 p-2.5 rounded-xl flex items-center gap-2.5 border ${isMine ? "bg-white/15 border-white/20 text-white" : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                    >
                      <FileText className="w-7 h-7 text-red-500 shrink-0" />
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-semibold truncate">{m.fileName || "Academic Document.pdf"}</p>
                        <p className="text-[10px] opacity-75">{m.fileSize || "140 KB"} • PDF</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerToast("Opening academic document…")}
                        className="p-1 rounded-full hover:bg-white/20"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Voice Note Audio Player (WhatsApp Style) */}
                  {m.isVoiceNote ? (
                    <div className="flex items-center gap-2.5 py-1 min-w-[200px]">
                      {/* Play/Pause Button */}
                      <button
                        type="button"
                        onClick={() => handleTogglePlayAudio(m.id)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer shrink-0 shadow-xs ${isMine
                            ? "bg-white text-[#003366] hover:bg-slate-100"
                            : "bg-[#003366] text-white hover:bg-[#002244]"
                          }`}
                      >
                        {playingAudioId === m.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>

                      {/* Scrubber Waveform Bar */}
                      <div className="flex-1 flex flex-col justify-center gap-1">
                        <div className="h-1.5 rounded-full bg-slate-300/60 overflow-hidden relative">
                          <div
                            className={`h-full transition-all duration-150 ${isMine ? "bg-cyan-300" : "bg-[#003366]"
                              }`}
                            style={{
                              width:
                                playingAudioId === m.id
                                  ? `${audioPlaybackProgress}%`
                                  : "0%",
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] opacity-80 font-mono">
                          <span>{m.audioDuration || "0:06"}</span>
                          <Mic className="w-3 h-3 opacity-60" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Regular Text Message Content */
                    <p className="text-xs sm:text-[13px] whitespace-pre-wrap font-normal leading-relaxed break-words">
                      {m.isDeleted ? (
                        <span className="flex items-center gap-1 opacity-75">
                          <Trash2 className="w-3 h-3" />
                          <span>This message was deleted</span>
                        </span>
                      ) : (
                        m.content
                      )}
                    </p>
                  )}

                  {/* Bottom Metadata: Timestamp, Star, & WhatsApp Delivery Ticks */}
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 -mb-0.5 text-right ${isMine ? "text-cyan-200" : "text-slate-500"
                      }`}
                  >
                    {/* Starred indicator */}
                    {m.isStarred && (
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                    )}

                    <span className="text-[10px] font-normal font-sans">
                      {formattedTime}
                    </span>

                    {/* WhatsApp Checkmarks */}
                    {isMine && !m.isDeleted && (
                      m.pending ? (
                        <Clock
                          className="w-3 h-3 text-slate-300 animate-pulse shrink-0"
                          title="Sending…"
                        />
                      ) : m.isRead || m.read ? (
                        <CheckCheck
                          className="w-3.5 h-3.5 text-cyan-300 shrink-0"
                          title="Read (Double Blue Tick)"
                        />
                      ) : (
                        <CheckCheck
                          className="w-3.5 h-3.5 text-slate-300 shrink-0"
                          title="Delivered (Double Grey Tick)"
                        />
                      )
                    )}
                  </div>

                  {/* Attached Emoji Reactions Pill */}
                  {m.reactions && m.reactions.length > 0 && (
                    <div
                      className={`absolute -bottom-2.5 ${isMine ? "right-2" : "left-2"
                        } bg-white border border-slate-200 rounded-full px-2 py-0.5 shadow-md flex items-center gap-1 text-xs cursor-pointer hover:scale-105 transition-transform z-10`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Click to toggle first reaction
                        handleToggleReaction(m.id, m.reactions[0].emoji);
                      }}
                      title="Reactions"
                    >
                      {m.reactions.map((r, i) => (
                        <span key={i} className="flex items-center gap-0.5 text-slate-800 font-medium">
                          <span>{r.emoji}</span>
                          {r.count > 1 && <span className="text-[10px] text-slate-500 font-mono">{r.count}</span>}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator Bubble */}
          {isTyping && (
            <div className="flex justify-start items-center gap-2 animate-fadeIn">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-3.5 py-2 shadow-xs flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium mr-1">
                  {mentorName} is typing
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#003366] typing-dot-1"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#003366] typing-dot-2"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#003366] typing-dot-3"></span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ================================================================= */}
        {/* 3. QUICK DOUBTS SUGGESTION PILLS                                  */}
        {/* ================================================================= */}
        <div className="bg-slate-50 border-t border-slate-200 px-3 py-1.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[11px] text-[#003366] font-semibold whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quick Doubts:</span>
          </span>
          {QUICK_DOUBTS.map((doubt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setDraft(doubt)}
              className="text-[11px] font-medium text-slate-700 bg-white hover:bg-blue-50 hover:text-[#003366] hover:border-[#003366]/40 border border-slate-200 px-3 py-1 rounded-full whitespace-nowrap transition-colors shadow-2xs shrink-0 cursor-pointer"
            >
              {doubt}
            </button>
          ))}
        </div>

        {/* ================================================================= */}
        {/* 4. REPLY BANNER (Pinned above input when quoting a message)       */}
        {/* ================================================================= */}
        {replyingTo && (
          <div className="bg-slate-100 border-t border-slate-200 px-4 py-2 flex items-center justify-between gap-3 animate-fadeIn">
            <div className="border-l-4 border-[#003366] pl-2.5 text-xs min-w-0">
              <span className="font-bold text-[#003366] block">
                Replying to {replyingTo.senderName}
              </span>
              <p className="text-slate-600 truncate text-[11px]">
                {replyingTo.content}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setReplyingTo(null)}
              className="p-1 rounded-full hover:bg-slate-200 text-slate-500"
              title="Cancel Reply"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* 5. WHATSAPP BOTTOM INPUT BAR                                      */}
        {/* ================================================================= */}
        <div className="bg-white border-t border-slate-200 p-2.5 flex items-center gap-2 shrink-0 relative">
          {/* Attachment Menu Popup */}
          {showAttachMenu && (
            <div className="absolute bottom-16 left-12 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2.5 flex flex-col gap-1 z-30 min-w-[210px] animate-fadeIn">
              <button
                type="button"
                onClick={() => docInputRef.current?.click()}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:bg-slate-50 p-2 rounded-xl text-left transition font-medium cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FileText className="w-4 h-4" />
                </div>
                <span>Attach Document (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:bg-slate-50 p-2 rounded-xl text-left transition font-medium cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <span>Attach Circuit / Photo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDraft("```c\n// Problem Code Snippet\n#include <stdio.h>\nint main() {\n  \n}\n```");
                  setShowAttachMenu(false);
                }}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:bg-slate-50 p-2 rounded-xl text-left transition font-medium cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Code className="w-4 h-4" />
                </div>
                <span>Paste Code Snippet</span>
              </button>
            </div>
          )}

          {/* Categorized Emoji Picker Drawer */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-3 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-30 w-72 max-w-[90vw] animate-fadeIn">
              {/* Category Tabs */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2 text-xs">
                {Object.keys(EMOJI_CATEGORIES).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveEmojiTab(cat)}
                    className={`px-2 py-1 rounded-md font-semibold transition ${activeEmojiTab === cat
                        ? "bg-[#003366] text-white"
                        : "text-slate-600 hover:bg-slate-100"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Emojis Grid */}
              <div className="grid grid-cols-6 gap-2">
                {EMOJI_CATEGORIES[activeEmojiTab].map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => {
                      setDraft((prev) => prev + em);
                      setShowEmojiPicker(false);
                    }}
                    className="text-xl hover:scale-125 transition-transform p-1 cursor-pointer"
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* If Live Voice Note Recording is in progress */}
          {isRecordingVoice ? (
            <div className="flex-1 flex items-center justify-between bg-red-50 border border-red-200 rounded-full px-4 py-2 text-xs text-red-700 animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
                <span className="font-semibold text-red-800">
                  Recording Voice Note… 0:{recordingSeconds < 10 ? "0" + recordingSeconds : recordingSeconds}
                </span>
                <span className="hidden sm:inline text-red-500 font-mono text-[11px]">
                  |||||||||||||||||
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancelVoiceNote}
                  className="p-1 rounded-full text-red-600 hover:bg-red-100 transition"
                  title="Cancel Recording"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleSendVoiceNote}
                  className="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center hover:bg-[#002244] shadow-xs"
                  title="Send Voice Note"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Regular Chat Input Form */
            <>
              {/* Emoji Button */}
              <button
                type="button"
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                  setShowAttachMenu(false);
                }}
                className="p-2 text-slate-500 hover:text-[#003366] rounded-full hover:bg-slate-100 transition cursor-pointer"
                title="Add Emoji"
              >
                <Smile className="w-5 h-5" />
              </button>

              {/* Attachment Button */}
              <button
                type="button"
                onClick={() => {
                  setShowAttachMenu(!showAttachMenu);
                  setShowEmojiPicker(false);
                }}
                className="p-2 text-slate-500 hover:text-[#003366] rounded-full hover:bg-slate-100 transition cursor-pointer"
                title="Attach Document / Code"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {/* Text Input Form */}
              <form onSubmit={sendMessage} className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-300 rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#003366] focus:border-[#003366] focus:bg-white transition-all shadow-inner"
                  placeholder="Type your message to the senior mentor…"
                  value={draft}
                  onChange={handleDraftChange}
                  autoFocus
                />

                {/* Send Button OR Voice Note Button */}
                {draft.trim() ? (
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-full bg-[#003366] hover:bg-[#002244] text-white flex items-center justify-center transition active:scale-95 shadow-md shrink-0 cursor-pointer"
                    title="Send Message"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecordingVoice(true);
                      playSoftSound(700, "sine", 0.08);
                    }}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-50 text-[#003366] border border-slate-200 flex items-center justify-center transition cursor-pointer shrink-0 shadow-2xs"
                    title="Record Voice Note"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                )}
              </form>
            </>
          )}
        </div>
      </div>

      {/* Hidden File Upload Inputs */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={docInputRef}
        onChange={handleDocumentUpload}
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
      />

      {/* ================================================================= */}
      {/* MODAL 1: VOICE / VIDEO CALL MODAL                                 */}
      {/* ================================================================= */}
      {callModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#002244] text-white w-full max-w-sm rounded-3xl p-6 text-center space-y-6 shadow-2xl animate-fadeIn border border-white/10">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
                {callModal === "video" ? "PolyConnect Video Call" : "PolyConnect Voice Call"}
              </span>
              <h3 className="text-xl font-bold">{mentorName}</h3>
              <p className="text-xs text-slate-300">Senior Mentor • Masab Tank Hyderabad</p>
            </div>

            {/* Avatar Pulse */}
            <div className="relative inline-block my-2">
              <div className="w-24 h-24 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl font-bold mx-auto animate-pulse">
                {mentorName.slice(0, 2).toUpperCase()}
              </div>
            </div>

            <div className="font-mono text-sm text-cyan-200">
              {callDuration > 2
                ? `0:${callDuration < 10 ? "0" + callDuration : callDuration}`
                : "Connecting with senior mentor…"}
            </div>

            {/* Call Action Controls */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setCallMuted(!callMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition ${callMuted ? "bg-red-500 text-white" : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                title={callMuted ? "Unmute" : "Mute"}
              >
                {callMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => setCallModal(null)}
                className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition shadow-lg cursor-pointer"
                title="End Call"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 2: SENIOR CONTACT INFO DRAWER                               */}
      {/* ================================================================= */}
      {showSeniorInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fadeIn border border-slate-200">
            {/* Header Banner */}
            <div className="bg-[#003366] text-white p-6 text-center relative">
              <button
                type="button"
                onClick={() => setShowSeniorInfoModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold mx-auto mb-3 shadow-md">
                {mentorName.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-lg font-bold">{mentorName}</h3>
              <p className="text-xs text-cyan-200">Official Senior Academic Mentor</p>
            </div>

            {/* Profile Details */}
            <div className="p-5 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Branch</span>
                  <span className="font-semibold text-slate-800">CME (Computer Engineering)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Academic Year</span>
                  <span className="font-semibold text-slate-800">Final Year (C-21 Scheme)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">College</span>
                  <span className="font-semibold text-slate-800">Govt. Polytechnic Masab Tank</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">ECET Rank</span>
                  <span className="font-semibold text-emerald-700">TS ECET Rank 14 (State)</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">About / Mentorship</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  Specialized in Engineering Mathematics (M-I/II/III), Data Structures, Circuit Theory, and ECET preparation. Solved 45+ diploma academic doubts on PolyConnect.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSeniorInfoModal(false);
                    setCallModal("voice");
                  }}
                  className="flex-1 bg-[#003366] text-white py-2.5 rounded-full font-semibold hover:bg-[#002244] transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Senior</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSeniorInfoModal(false);
                    setShowEmailModal(true);
                  }}
                  className="flex-1 bg-slate-100 text-[#003366] py-2.5 rounded-full font-semibold hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 3: STARRED MESSAGES DRAWER                                  */}
      {/* ================================================================= */}
      {showStarredModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fadeIn border border-slate-200 max-h-[80vh] flex flex-col">
            <div className="bg-[#003366] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <h3 className="font-bold text-sm">Starred Messages ({starredMessages.length})</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowStarredModal(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2.5 flex-1 text-xs">
              {starredMessages.length === 0 ? (
                <div className="text-center py-8 text-slate-500 space-y-1">
                  <Star className="w-8 h-8 text-slate-300 mx-auto" />
                  <p>No starred messages yet.</p>
                  <p className="text-[11px] text-slate-400">Use message menu to star important doubt solutions!</p>
                </div>
              ) : (
                starredMessages.map((sm) => (
                  <div key={sm.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                      <span className="text-[#003366]">{sm.sender?.fullName || "Participant"}</span>
                      <span>{new Date(sm.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    <p className="text-slate-800 text-xs">{sm.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 4: DELETE CONFIRMATION MODAL                                */}
      {/* ================================================================= */}
      {deleteModalMsg && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl animate-fadeIn border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Delete Message?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Do you want to delete this message for everyone or only for yourself?
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 text-xs">
              {deleteModalMsg.sender?.id === user?.id && (
                <button
                  type="button"
                  onClick={() => handleDeleteMessage(deleteModalMsg.id, true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-full transition"
                >
                  Delete for Everyone
                </button>
              )}
              <button
                type="button"
                onClick={() => handleDeleteMessage(deleteModalMsg.id, false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 rounded-full transition"
              >
                Delete for Me
              </button>
              <button
                type="button"
                onClick={() => setDeleteModalMsg(null)}
                className="w-full text-slate-500 hover:text-slate-800 py-1.5 transition text-[11px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 5: OFFLINE DOUBT SESSION EMAIL NOTIFICATION MODAL           */}
      {/* ================================================================= */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-lg shadow-2xl rounded-3xl overflow-hidden animate-fadeIn font-sans">
            <div className="bg-[#003366] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-300" />
                <h3 className="text-sm font-semibold text-white">
                  Send Doubt Session Email Alert
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="text-slate-300 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendEmailNotification} className="p-5 space-y-4">
              {emailSentSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="text-base font-bold text-slate-900">
                    Email Alert Dispatched Successfully!
                  </h4>
                  <p className="text-xs text-slate-600">
                    {mentorName} has been notified at their registered email address.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 border border-blue-200 text-[#003366] text-xs p-3 rounded-2xl flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#003366] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      This alert notifies the senior mentor via official email that you have initiated a doubt session with a direct link to this chat room.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase">
                      Email Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-800 rounded-xl focus:outline-none focus:border-[#003366]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase">
                      Email Message Content
                    </label>
                    <textarea
                      rows={5}
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-800 rounded-xl focus:outline-none focus:border-[#003366]"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(false)}
                      className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-full"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={emailSending}
                      className="px-5 py-2 text-xs font-semibold text-white bg-[#003366] hover:bg-[#002244] disabled:bg-slate-400 rounded-full transition flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-200" />
                      <span>{emailSending ? "Dispatching…" : "Dispatch Email Alert"}</span>
                    </button>
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
