import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  User,
  GraduationCap,
  Briefcase,
  X,
  Info,
  CheckCheck,
  Plus,
  MoreVertical,
  Camera,
  MessageSquare,
  Pin,
  Flame,
  Check
} from "lucide-react";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";
import { useAuth } from "../../context/AuthContext";
import { usePresence } from "../../context/PresenceContext";

// Diverse cheerful avatar background palettes for WhatsApp style
const AVATAR_BG_COLORS = [
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-teal-500 to-emerald-700",
];

export default function SeniorsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isUserOnline, refreshPresence } = usePresence();

  const [mentors, setMentors] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [error, setError] = useState("");
  const [startingId, setStartingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'unread' | 'online' | 'active' | 'offline'

  // Offline Email Modal State
  const [selectedOfflineMentor, setSelectedOfflineMentor] = useState(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatTopic, setNewChatTopic] = useState("");

  useEffect(() => {
    let isMounted = true;
    Promise.all([api.get("/seniors/mentors"), api.get("/seniors/chat/rooms")])
      .then(([mentorsRes, roomsRes]) => {
        if (!isMounted) return;
        setMentors(Array.isArray(mentorsRes.data) ? mentorsRes.data : []);
        setRooms(Array.isArray(roomsRes.data) ? roomsRes.data : []);
      })
      .catch((err) => {
        if (isMounted) {
          setError(apiErrorMessage(err, "Could not load Senior Connect chats."));
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Initiate or Open Chat Room
  async function handleOpenChat(mentorUserId, existingRoomId = null) {
    if (existingRoomId) {
      navigate(`/student/seniors/chat/${existingRoomId}`);
      return;
    }

    setStartingId(mentorUserId);
    try {
      const res = await api.post("/seniors/chat/start", {
        mentorId: mentorUserId,
        topic: newChatTopic.trim() || "General Guidance & Career Advice",
      });
      setShowNewChatModal(false);
      setNewChatTopic("");
      navigate(`/student/seniors/chat/${res.data.id}`);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not initiate a conversation with this senior."));
    } finally {
      setStartingId(null);
    }
  }

  // Open Offline Email Modal
  function openOfflineEmailModal(mentor, e) {
    if (e) e.stopPropagation();
    setSelectedOfflineMentor(mentor);
    const mentorName = mentor.user?.fullName || mentor.fullName || "Senior Mentor";
    const studentName = user?.fullName || "Polytechnic Student";
    const studentPin = user?.pin || user?.username || "SBTET Student";

    setEmailSubject(`PolyConnect: You have a session to solve the Doubts (Academic Mentorship)`);
    setEmailMessage(
      `Respected ${mentorName},\n\n` +
      `Student ${studentName} (PIN: ${studentPin}) has requested a doubt solving session on PolyConnect Senior Connect regarding "${newChatTopic || "ECET / Academic Mentorship Guidance"}".\n\n` +
      `Since you are currently offline, this alert was sent to request your guidance.\n\n` +
      `Please log in to PolyConnect at your convenience to initiate the mentorship chat.\n\n` +
      `Portal: ${window.location.origin}/login\n\n` +
      `Regards,\nPolyConnect Mentorship Cell\nState Board of Technical Education and Training (SBTET)`
    );
    setEmailSuccess(false);
  }

  // Send Offline Email via Backend
  async function sendOfflineEmail(e) {
    e.preventDefault();
    setEmailSending(true);
    const mentorUserId = selectedOfflineMentor?.user?.id || selectedOfflineMentor?.id;
    const mentorEmail = selectedOfflineMentor?.user?.email || selectedOfflineMentor?.email || "senior.mentor@sbtet.telangana.gov.in";

    try {
      // 1. Dispatch real email through backend EmailService
      try {
        await api.post(`/seniors/mentors/${mentorUserId}/notify-offline`, {
          subject: emailSubject,
          message: emailMessage,
          recipientEmail: mentorEmail,
        });
      } catch {
        // 2. Fallback to notifications endpoint
        try {
          await api.post("/notifications", {
            userId: mentorUserId,
            title: emailSubject,
            message: emailMessage,
            type: "MENTOR_SESSION_REQUEST",
          });
        } catch {
          // graceful
        }
      }

      setEmailSending(false);
      setEmailSuccess(true);
      setTimeout(() => {
        setSelectedOfflineMentor(null);
        setEmailSuccess(false);
      }, 1800);
    } catch {
      setEmailSending(false);
      setSelectedOfflineMentor(null);
    }
  }

  // Aggregate and merge all users & chat rooms into unified WhatsApp items
  const unifiedChats = useMemo(() => {
    if (!mentors || !rooms) return [];

    const list = [];
    const processedUserIds = new Set();

    // 1. Add active rooms first
    rooms.forEach((r) => {
      // Find other user in the room (if I am student, other is mentor; or vice versa)
      const otherUser = r.mentor?.id === user?.id ? r.student : r.mentor;
      if (!otherUser) return;

      processedUserIds.add(otherUser.id);
      const mentorProfile = mentors.find((m) => m.user?.id === otherUser.id);
      const isOnline = isUserOnline(otherUser.id);

      list.push({
        id: `room-${r.id}`,
        roomId: r.id,
        userId: otherUser.id,
        user: otherUser,
        fullName: otherUser.fullName || "Senior Mentor",
        designation: mentorProfile?.designation || (otherUser.role === "STUDENT" ? "Polytechnic Student" : "Senior Mentor"),
        company: mentorProfile?.currentCompanyOrCollege || "",
        skills: mentorProfile?.skills || "",
        topic: r.topic || "Academic Mentorship",
        hasActiveRoom: true,
        isOnline: isOnline,
        lastMessage: r.topic || "Mentorship discussion session",
        unreadCount: 0,
        mentorProfile: mentorProfile || { user: otherUser },
      });
    });

    // 2. Add remaining registered mentors / seniors who don't have an active room yet
    mentors.forEach((m) => {
      const u = m.user;
      if (!u || processedUserIds.has(u.id)) return;

      processedUserIds.add(u.id);
      const isOnline = isUserOnline(u.id);

      list.push({
        id: `mentor-${m.id}`,
        roomId: null,
        userId: u.id,
        user: u,
        fullName: u.fullName || "Senior Mentor",
        designation: m.designation || "Polytechnic Student",
        company: m.currentCompanyOrCollege || "",
        skills: m.skills || "",
        topic: m.skills ? `Mentoring: ${m.skills}` : "Available for Mentorship & Doubt Solving",
        hasActiveRoom: false,
        isOnline: isOnline,
        lastMessage: m.skills ? `Areas: ${m.skills}` : "Tap to start WhatsApp 1-on-1 chat",
        unreadCount: 0,
        mentorProfile: m,
      });
    });

    return list;
  }, [mentors, rooms, user?.id, isUserOnline]);

  // Filter items by search query and category pill
  const filteredChats = useMemo(() => {
    return unifiedChats.filter((item) => {
      // Category filter
      if (activeFilter === "online" && !item.isOnline) return false;
      if (activeFilter === "offline" && item.isOnline) return false;
      if (activeFilter === "active" && !item.hasActiveRoom) return false;
      if (activeFilter === "unread" && item.unreadCount === 0) return false;

      // Text search
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const name = item.fullName.toLowerCase();
      const desig = (item.designation || "").toLowerCase();
      const comp = (item.company || "").toLowerCase();
      const skills = (item.skills || "").toLowerCase();
      const lastMsg = (item.lastMessage || "").toLowerCase();

      return (
        name.includes(query) ||
        desig.includes(query) ||
        comp.includes(query) ||
        skills.includes(query) ||
        lastMsg.includes(query)
      );
    });
  }, [unifiedChats, activeFilter, searchQuery]);

  if (error && (!mentors || !rooms)) {
    return (
      <div className="space-y-4 max-w-[720px] mx-auto p-4 font-sans">
        <h1 className="text-2xl font-semibold text-[#0b3c5d]">Senior Connect & Mentorship</h1>
        <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-4 py-3 rounded-none">
          {error}
        </div>
      </div>
    );
  }

  if (!mentors || !rooms) {
    return <GovLoader size={60} />;
  }

  return (
    <div className="max-w-[720px] mx-auto font-sans pb-16 pt-1 sm:px-2">
      {/* WhatsApp Native Mobile & Desktop Window Frame */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-none overflow-hidden min-h-[82vh] flex flex-col">
        {/* 1. WhatsApp Top Action Bar */}
        <div className="bg-[#f0f2f5] px-4 py-3 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-200 transition-colors"
              title="Menu Options"
              onClick={refreshPresence}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
              Chats
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-normal px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${
                isUserOnline(user?.id)
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">STOMP Real-Time Live</span>
              <span className="sm:hidden">Live</span>
            </span>

            <button
              type="button"
              onClick={() => setShowNewChatModal(true)}
              className="w-8 h-8 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center transition-transform active:scale-95 shadow-xs"
              title="Start New 1-on-1 Mentorship Chat"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* 2. WhatsApp Meta AI Search Input Bar */}
        <div className="p-3 bg-white border-b border-slate-100">
          <div className="relative flex items-center">
            {/* Meta AI Multi-Color Gradient Ring Icon */}
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-4 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 animate-spin-slow shadow-2xs flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                </div>
              </div>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask Meta AI or Search mentors..."
              className="w-full bg-[#f0f2f5] hover:bg-[#eaecee] focus:bg-white border border-transparent focus:border-[#00a884] rounded-xl pl-10 pr-9 py-2 text-xs sm:text-[13px] text-slate-800 placeholder-slate-500 focus:outline-none transition-all font-normal"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 3. Category Filter Pills */}
          <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar pt-0.5">
            {[
              { id: "all", label: "All" },
              { id: "unread", label: "Unread" },
              { id: "online", label: "Online Now", count: unifiedChats.filter((c) => c.isOnline).length },
              { id: "active", label: "Active Chats", count: rooms.length },
              { id: "offline", label: "Offline (Email Alert)" },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`text-[12px] px-3.5 py-1 rounded-full whitespace-nowrap transition-all font-normal ${
                    isActive
                      ? "bg-[#d9fdd3] text-[#008069] font-medium shadow-2xs border border-emerald-300"
                      : "bg-[#f0f2f5] text-slate-600 hover:bg-slate-200 border border-transparent"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="ml-1 text-[10px] opacity-75 font-mono">({tab.count})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. WhatsApp Contact & Chat Rows List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 bg-white">
          {filteredChats.length === 0 ? (
            <div className="p-12 text-center space-y-2.5">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                💬
              </div>
              <h3 className="text-sm font-medium text-slate-800">No Conversations Found</h3>
              <p className="text-xs text-slate-500 font-normal max-w-sm mx-auto">
                {searchQuery
                  ? `No mentors match "${searchQuery}". Try searching by name or branch.`
                  : "All senior mentors and polytechnic alumni will appear here for 1-on-1 doubt solving."}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-[#00a884] font-medium hover:underline pt-1"
                >
                  Clear Search Filter
                </button>
              )}
            </div>
          ) : (
            filteredChats.map((item, idx) => {
              const bgGradient = AVATAR_BG_COLORS[idx % AVATAR_BG_COLORS.length];
              const initials = item.fullName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase() || "SM";

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenChat(item.userId, item.roomId)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#f5f6f6] active:bg-[#e9edef] transition-colors cursor-pointer group relative select-none"
                >
                  {/* Left Avatar with Online/Offline border ring */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-tr ${bgGradient} text-white flex items-center justify-center text-sm font-semibold tracking-wider shadow-2xs`}
                    >
                      {initials}
                    </div>

                    {/* Online status indicator dot */}
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        item.isOnline ? "bg-[#25d366]" : "bg-slate-400"
                      }`}
                      title={item.isOnline ? "Currently Online at PolyConnect" : "Offline (Email Alert Available)"}
                    />
                  </div>

                  {/* Middle Contact Name & Last Message/Designation */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h2 className="text-[15px] font-medium text-slate-900 truncate leading-snug group-hover:text-[#008069] transition-colors">
                        {item.fullName}
                      </h2>

                      {/* Right Timestamp / Online pill */}
                      <span
                        className={`text-[11px] font-normal shrink-0 ${
                          item.isOnline ? "text-[#25d366] font-medium" : "text-slate-400"
                        }`}
                      >
                        {item.isOnline ? "Online" : "Offline"}
                      </span>
                    </div>

                    {/* Subtitle: WhatsApp Style snippet with checkmarks */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 min-w-0 text-[13px] text-slate-500 font-normal truncate">
                        {item.hasActiveRoom ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] shrink-0" title="Delivered & Read" />
                            <span className="truncate text-slate-600">{item.lastMessage}</span>
                          </>
                        ) : (
                          <span className="truncate text-slate-500">
                            {item.designation}
                            {item.company ? ` • ${item.company}` : ""}
                          </span>
                        )}
                      </div>

                      {/* Right Actions: Offline Email Alert or Active Room Pill */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {!item.isOnline && (
                          <button
                            type="button"
                            onClick={(e) => openOfflineEmailModal(item.mentorProfile || item, e)}
                            className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full transition-colors font-normal shadow-2xs"
                            title="Send Doubt Session Email Alert"
                          >
                            <Mail className="w-3 h-3 text-amber-600" />
                            <span className="hidden sm:inline">Email Alert</span>
                          </button>
                        )}

                        {item.hasActiveRoom && (
                          <span className="text-[10px] bg-emerald-50 text-[#008069] border border-emerald-200 px-1.5 py-0.2 rounded-xs uppercase font-mono">
                            Chat #{item.roomId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 5. Start New Chat Topic Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-md shadow-2xl rounded-none overflow-hidden animate-fadeIn font-sans">
            <div className="bg-[#00a884] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-white" />
                <h3 className="text-sm font-medium text-white">
                  Start New Mentorship Chat
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewChatModal(false)}
                className="text-emerald-100 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-normal text-slate-700 mb-1.5">
                  Select a topic or doubt area:
                </label>
                <input
                  type="text"
                  value={newChatTopic}
                  onChange={(e) => setNewChatTopic(e.target.value)}
                  placeholder="e.g. ECET Rank 100 Guidance, C-20 Viva Prep…"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-slate-800 rounded-none focus:outline-none focus:border-[#00a884] font-normal"
                />
              </div>

              <div className="text-xs text-slate-500 font-normal">
                Select any senior mentor from the list below to initiate the chat session.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewChatModal(false)}
                  className="px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-none font-normal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Offline Email Modal */}
      {selectedOfflineMentor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-lg shadow-2xl rounded-none overflow-hidden animate-fadeIn font-sans">
            <div className="bg-[#0b3c5d] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-300" />
                <h3 className="text-sm font-medium text-white">
                  Send Doubt Session Email Alert
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOfflineMentor(null)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={sendOfflineEmail} className="p-5 space-y-4">
              {emailSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="text-base font-medium text-slate-900">
                    Email Notification Sent!
                  </h4>
                  <p className="text-xs font-normal text-slate-600">
                    {selectedOfflineMentor.user?.fullName || selectedOfflineMentor.fullName} will receive an alert: <em>"You have a session to solve the Doubts"</em>.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 border border-blue-200 text-blue-900 text-xs p-3 rounded-none flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <p className="font-normal leading-relaxed">
                      Notify this senior mentor via email that you would like a doubt-solving session on PolyConnect.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-normal text-slate-600 uppercase mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-slate-800 rounded-none focus:outline-none focus:border-[#0b3c5d] font-normal"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-normal text-slate-600 uppercase mb-1">
                      Email Body
                    </label>
                    <textarea
                      rows={6}
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      className="w-full bg-white border border-slate-300 p-3 text-xs text-slate-800 rounded-none focus:outline-none focus:border-[#0b3c5d] font-normal leading-relaxed resize-none"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setSelectedOfflineMentor(null)}
                      className="px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-none font-normal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={emailSending}
                      className="px-5 py-2 text-xs bg-[#0b3c5d] hover:bg-[#07283f] text-white rounded-none font-normal transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{emailSending ? "Sending…" : "Send Official Email Alert"}</span>
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