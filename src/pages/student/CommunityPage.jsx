// import { useEffect, useState, useMemo, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import api, { apiErrorMessage } from "../../api/client";
// import GovLoader from "../../components/GovLoader";
// import { useAuth } from "../../context/AuthContext";

// const CATEGORIES = [
//   { value: "ALL", label: "All Topics" },
//   { value: "ACADEMIC", label: "Academic & Syllabus" },
//   { value: "EXAM_PREP", label: "Exam Prep & ECET"},
//   { value: "PROJECT", label: "Projects & Labs"},
//   { value: "CAMPUS_LIFE", label: "Campus Life & Events" },
//   { value: "GENERAL", label: "General Discussion" },
// ];

// // Helper: Extract comments array from any API payload structure
// function parseCommentsList(resData) {
//   if (!resData) return [];
//   if (Array.isArray(resData)) return resData;
//   if (Array.isArray(resData.comments)) return resData.comments;
//   if (Array.isArray(resData.data)) return resData.data;
//   if (Array.isArray(resData.replies)) return resData.replies;
//   if (Array.isArray(resData.commentList)) return resData.commentList;
//   if (Array.isArray(resData.results)) return resData.results;
//   return [];
// }

// // Helper: Format Relative Time
// function timeAgo(dateString) {
//   if (!dateString) return "Just now";
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) return "Just now";
//   const now = new Date();
//   const seconds = Math.floor((now - date) / 1000);

//   if (seconds < 60) return "Just now";
//   const minutes = Math.floor(seconds / 60);
//   if (minutes < 60) return `${minutes}m ago`;
//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours}h ago`;
//   const days = Math.floor(hours / 24);
//   if (days < 7) return `${days}d ago`;

//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// // Helper: Avatar Initials
// function getInitials(name) {
//   if (!name || typeof name !== "string") return "ST";
//   return name
//     .split(" ")
//     .map((w) => w[0])
//     .filter(Boolean)
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();
// }

// // Official Back Button
// function OfficialBackButton({ to, label = "Return to Dashboard" }) {
//   const navigate = useNavigate();
//   return (
//     <button
//       type="button"
//       onClick={() => (to ? navigate(to) : navigate(-1))}
//       title={label}
//       aria-label={label}
//       className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white text-[#0f2a4a] hover:bg-[#35a5f1] hover:text-white border border-slate-200 shadow-sm transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] shrink-0 cursor-pointer"
//     >
//       <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
//       </svg>
//     </button>
//   );
// }

// export default function CommunityPage() {
//   const { user } = useAuth();
//   const [communities, setCommunities] = useState(null);
//   const [activeId, setActiveId] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [postsLoading, setPostsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [notificationMsg, setNotificationMsg] = useState("");

//   // Post Form State
//   const [isCreatingPost, setIsCreatingPost] = useState(false);
//   const [newTitle, setNewTitle] = useState("");
//   const [newContent, setNewContent] = useState("");
//   const [category, setCategory] = useState("GENERAL");
//   const [posting, setPosting] = useState(false);

//   // Filters & Search
//   const [selectedCategory, setSelectedCategory] = useState("ALL");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("latest");

//   // Per-Post Comments State (Map: { [postId]: Array<Comment> })
//   const [postComments, setPostComments] = useState({});
//   const [openCommentsMap, setOpenCommentsMap] = useState({});
//   const [commentsLoadingMap, setCommentsLoadingMap] = useState({});
//   const [replyInputMap, setReplyInputMap] = useState({});
//   const [submittingReplyMap, setSubmittingReplyMap] = useState({});

//   // Share Toast
//   const [copiedPostId, setCopiedPostId] = useState(null);

//   const postFormRef = useRef(null);

//   const currentDate = new Date().toLocaleDateString("en-IN", {
//     weekday: "short",
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   // Track liked post IDs in localStorage per user to enforce Facebook-like toggle
//   const userStorageKey = `polyconnect_liked_posts_${user?.id || user?.username || "guest"}`;
//   const [likedPostIds, setLikedPostIds] = useState(() => {
//     try {
//       const saved = localStorage.getItem(userStorageKey);
//       return saved ? new Set(JSON.parse(saved)) : new Set();
//     } catch {
//       return new Set();
//     }
//   });

//   // Save liked post IDs whenever they change
//   useEffect(() => {
//     try {
//       localStorage.setItem(userStorageKey, JSON.stringify(Array.from(likedPostIds)));
//     } catch {
//       // ignore
//     }
//   }, [likedPostIds, userStorageKey]);

//   // Load Communities List
//   useEffect(() => {
//     let isMounted = true;
//     api
//       .get("/community")
//       .then((res) => {
//         if (!isMounted) return;
//         const list = Array.isArray(res.data) ? res.data : [];
//         setCommunities(list);
//         if (list.length > 0) setActiveId(list[0].id);
//       })
//       .catch((err) => {
//         if (isMounted) setError(apiErrorMessage(err, "Could not load official community channels."));
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // Fetch comments for a specific post
//   const fetchCommentsForPost = useCallback(async (postId) => {
//     setCommentsLoadingMap((prev) => ({ ...prev, [postId]: true }));
//     try {
//       const res = await api.get(`/community/posts/${postId}/comments`);
//       const commentList = parseCommentsList(res.data);
//       setPostComments((prev) => ({ ...prev, [postId]: commentList }));
//     } catch (err) {
//       console.warn("Could not fetch comments for post", postId, err);
//     } finally {
//       setCommentsLoadingMap((prev) => ({ ...prev, [postId]: false }));
//     }
//   }, []);

//   // Toggle Comments Box open/close per post
//   const toggleComments = useCallback(
//     (postId) => {
//       setOpenCommentsMap((prev) => {
//         const isCurrentlyOpen = !!prev[postId];
//         const nextState = !isCurrentlyOpen;
//         if (nextState) {
//           fetchCommentsForPost(postId);
//         }
//         return { ...prev, [postId]: nextState };
//       });
//     },
//     [fetchCommentsForPost]
//   );

//   // Load Posts when active community channel changes
//   useEffect(() => {
//     if (!activeId) return;
//     setPostsLoading(true);
//     let isMounted = true;
//     api
//       .get(`/community/${activeId}/posts`)
//       .then(async (res) => {
//         if (!isMounted) return;
//         const postList = Array.isArray(res.data) ? res.data : [];
//         setPosts(postList);

//         // Pre-populate if post already has comments embedded in any property
//         const initialMap = {};
//         postList.forEach((p) => {
//           const embedded = parseCommentsList(p.comments || p.replies || p.commentList || p.postComments);
//           if (embedded.length > 0) {
//             initialMap[p.id] = embedded;
//           }
//         });
//         if (Object.keys(initialMap).length > 0) {
//           setPostComments((prev) => ({ ...initialMap, ...prev }));
//         }
//       })
//       .catch((err) => {
//         if (isMounted) setError(apiErrorMessage(err, "Could not load discussion posts."));
//       })
//       .finally(() => {
//         if (isMounted) setPostsLoading(false);
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, [activeId]);

//   // Handle Post Creation
//   async function submitPost(e) {
//     e.preventDefault();
//     if (!newTitle.trim() || !newContent.trim()) return;
//     setPosting(true);
//     setError("");
//     try {
//       const res = await api.post(`/community/${activeId}/posts`, {
//         title: newTitle.trim(),
//         content: newContent.trim(),
//         category,
//       });
//       const newPost = res.data;
//       setPosts((p) => [newPost, ...p]);
//       setPostComments((prev) => ({ ...prev, [newPost.id]: [] }));
//       setNewTitle("");
//       setNewContent("");
//       setIsCreatingPost(false);
//       setNotificationMsg("Your official discussion topic was published successfully!");
//       setTimeout(() => setNotificationMsg(""), 4000);
//     } catch (err) {
//       setError(apiErrorMessage(err, "Could not publish your post."));
//     } finally {
//       setPosting(false);
//     }
//   }

//   // Facebook-Style Like / Unlike Toggle Logic
//   async function toggleLike(postId) {
//     const isCurrentlyLiked = likedPostIds.has(postId);

//     // Optimistic UI Update: Toggle like state and adjust count smoothly
//     setLikedPostIds((prev) => {
//       const next = new Set(prev);
//       if (isCurrentlyLiked) {
//         next.delete(postId);
//       } else {
//         next.add(postId);
//       }
//       return next;
//     });

//     setPosts((prevPosts) =>
//       prevPosts.map((post) => {
//         if (post.id === postId) {
//           const currentCount = Number(post.likesCount || 0);
//           const newCount = isCurrentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1;
//           return { ...post, likesCount: newCount };
//         }
//         return post;
//       })
//     );

//     // Sync with backend
//     try {
//       if (isCurrentlyLiked) {
//         try {
//           await api.post(`/community/posts/${postId}/unlike`);
//         } catch {
//           await api.post(`/community/posts/${postId}/like`);
//         }
//       } else {
//         await api.post(`/community/posts/${postId}/like`);
//       }
//     } catch {
//       // Non-fatal, optimistic UI maintains consistency
//     }
//   }

//   // Handle Comment Submission per post
//   async function submitComment(postId) {
//     const commentText = (replyInputMap[postId] || "").trim();
//     if (!commentText) return;

//     // Optimistic Comment Creation for Instant Visibility
//     const optimisticComment = {
//       id: `temp-${Date.now()}`,
//       content: commentText,
//       createdAt: new Date().toISOString(),
//       author: {
//         fullName: user?.fullName || user?.username || "You",
//         role: user?.role || "STUDENT",
//       },
//     };

//     // Instant UI update & ensure comments box is open
//     setOpenCommentsMap((prev) => ({ ...prev, [postId]: true }));
//     setPostComments((prev) => ({
//       ...prev,
//       [postId]: [...(prev[postId] || []), optimisticComment],
//     }));

//     // Clear input
//     setReplyInputMap((prev) => ({ ...prev, [postId]: "" }));

//     // Increment count
//     setPosts((prevPosts) =>
//       prevPosts.map((p) =>
//         p.id === postId ? { ...p, commentsCount: (Number(p.commentsCount) || 0) + 1 } : p
//       )
//     );

//     setSubmittingReplyMap((prev) => ({ ...prev, [postId]: true }));

//     try {
//       const res = await api.post(`/community/posts/${postId}/comments`, {
//         content: commentText,
//       });
//       const serverComment =
//         res.data?.comment || res.data?.data || (res.data?.id ? res.data : optimisticComment);

//       // Replace optimistic comment with server response
//       setPostComments((prev) => {
//         const currentList = prev[postId] || [];
//         const updated = currentList.map((c) =>
//           c.id === optimisticComment.id ? serverComment : c
//         );
//         return { ...prev, [postId]: updated };
//       });
//     } catch (err) {
//       setError(apiErrorMessage(err, "Could not submit your comment."));
//     } finally {
//       setSubmittingReplyMap((prev) => ({ ...prev, [postId]: false }));
//     }
//   }

//   // Copy Post Link
//   function copyPostLink(postId) {
//     const url = `${window.location.origin}/student/community#post-${postId}`;
//     if (navigator.clipboard) {
//       navigator.clipboard.writeText(url);
//     }
//     setCopiedPostId(postId);
//     setTimeout(() => setCopiedPostId(null), 2500);
//   }

//   // Filtered and Sorted Posts
//   const filteredPosts = useMemo(() => {
//     let result = [...posts];

//     // Filter by Category
//     if (selectedCategory !== "ALL") {
//       result = result.filter((p) => p.category === selectedCategory);
//     }

//     // Filter by Search Query
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (p) =>
//           p.title?.toLowerCase().includes(q) ||
//           p.content?.toLowerCase().includes(q) ||
//           p.author?.fullName?.toLowerCase().includes(q) ||
//           p.author?.username?.toLowerCase().includes(q)
//       );
//     }

//     // Sort
//     if (sortBy === "likes") {
//       result.sort((a, b) => (Number(b.likesCount) || 0) - (Number(a.likesCount) || 0));
//     } else if (sortBy === "comments") {
//       result.sort((a, b) => (Number(b.commentsCount) || 0) - (Number(a.commentsCount) || 0));
//     } else {
//       // Latest first
//       result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
//     }

//     return result;
//   }, [posts, selectedCategory, searchQuery, sortBy]);

//   const activeCommunity = communities?.find((c) => c.id === activeId);

//   if (error && !communities) {
//     return (
//       <div className="max-w-7xl mx-auto space-y-4 p-4 font-sans text-slate-800">
//         <div className="flex items-center gap-3">
//           <OfficialBackButton />
//           <h1 className="text-xl md:text-2xl font-bold text-[#0f2a4a]">Polytechnic Community</h1>
//         </div>
//         <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r shadow-sm flex items-start gap-3">
//           <svg className="w-5 h-5 text-red-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//           </svg>
//           <div>
//             <p className="text-sm font-semibold text-red-900">System Notification</p>
//             <p className="text-xs text-red-700 mt-0.5">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!communities) {
//     return <GovLoader label="Loading official student community channels…" />;
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-5 font-sans text-slate-800 pb-12 px-2 sm:px-4">
      
//       {/* 1. Main Official Government Header Banner */}
//       <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#092240] via-[#0d3461] to-[#35a5f1] p-4 sm:p-6 text-white shadow-md border-b-4 border-[#35a5f1]">
//         <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//           <div className="flex items-start gap-3.5">
//             <OfficialBackButton to="/student/dashboard" label="Return to Student Dashboard" />
//             <div>
         
//               <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
//                 Polytechnic Community Forums
//               </h1>
//               {/* <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-2xl font-light leading-relaxed">
//                 Dedicated academic boards for your polytechnic institution and statewide student community. Share questions, project lab ideas, and exam insights.
//               </p> */}
//             </div>
//           </div>

//           {/* Quick Action Button */}
//           <div className="flex items-center gap-2 pt-1 lg:pt-0">
//             <button
//               type="button"
//               onClick={() => {
//                 setIsCreatingPost((prev) => !prev);
//                 setTimeout(() => {
//                   postFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//                 }, 100);
//               }}
//               className="inline-flex items-center gap-2 bg-[#FF9933] hover:bg-[#e68524] text-[#092240] font-bold text-xs px-4 py-2.5 rounded shadow transition-all duration-150 cursor-pointer active:scale-95 shrink-0"
//             >
//               <i className="fa-solid fa-pen-to-square text-xs" />
//               <span>{isCreatingPost ? "Close Post Editor" : "Start a Discussion"}</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Success Notification Alert */}
//       {notificationMsg && (
//         <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3.5 rounded-r shadow-xs text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-200">
//           <div className="flex items-center gap-2.5">
//             <i className="fa-solid fa-circle-check text-emerald-600 text-sm" />
//             <span className="font-semibold">{notificationMsg}</span>
//           </div>
//           <button
//             type="button"
//             onClick={() => setNotificationMsg("")}
//             className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-2 py-0.5 cursor-pointer"
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       {/* 2. Channel Selector Tabs (College vs Statewide) */}
//       <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-2 sm:p-2.5">
//         <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2 px-1">
//           <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
//             Community Channel Boards
//           </span>
//           {activeCommunity && (
//             <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
//               Currently viewing: <strong className="text-[#092240]">{activeCommunity.name}</strong>
//             </span>
//           )}
//         </div>

//         <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
//           {communities.map((c) => {
//             const isSelected = activeId === c.id;
//             const isStatewide = c.name?.toLowerCase().includes("state") || c.name?.toLowerCase().includes("all");
//             return (
//               <button
//                 key={c.id}
//                 type="button"
//                 onClick={() => {
//                   setActiveId(c.id);
//                   setError("");
//                 }}
//                 className={`flex items-center gap-2.5 px-4 py-2.5 rounded-md text-xs font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
//                   isSelected
//                     ? "bg-[#092240] text-white shadow-sm ring-2 ring-[#35a5f1]/40"
//                     : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
//                 }`}
//               >
//                 {/* <i
//                   className={`fa-solid ${
//                     isStatewide ? "fa-earth-americas text-sky-400" : "fa-building-columns text-amber-400"
//                   } text-sm`}
//                 /> */}
//                 <span>{c.name}</span>
//                 {c.postsCount != null && (
//                   <span
//                     className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
//                       isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
//                     }`}
//                   >
//                     {c.postsCount}
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* 3. Create Discussion Form (Collapsible / Expandable) */}
//       {isCreatingPost && (
//         <div
//           ref={postFormRef}
//           className="bg-white rounded-lg border border-slate-200 shadow-md overflow-hidden animate-in slide-in-from-top-2 duration-200"
//         >
//           {/* Header */}
//           <div className="bg-[#0f2a4a] text-white px-4 py-3 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <i className="fa-solid fa-pen-nib text-[#35a5f1]" />
//               <span className="font-serif font-bold text-sm tracking-wide">
//                 Start a New Discussion in {activeCommunity?.name || "Community"}
//               </span>
//             </div>
//             <button
//               type="button"
//               onClick={() => setIsCreatingPost(false)}
//               className="text-slate-300 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer"
//             >
//               Cancel ✕
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={submitPost} className="p-4 sm:p-5 bg-slate-50/60 space-y-4">
//             <div>
//               <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
//                 Topic Title <span className="text-rose-500">*</span>
//               </label>
//               <input
//                 className="w-full bg-white border border-slate-300 rounded p-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] focus:border-transparent transition-all"
//                 placeholder="E.g., C-21 4th Sem Microcontrollers Lab Manual notes & syllabus guidance…"
//                 value={newTitle}
//                 onChange={(e) => setNewTitle(e.target.value)}
//                 required
//                 maxLength={200}
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
//                 Discussion Details / Question <span className="text-rose-500">*</span>
//               </label>
//               <textarea
//                 className="w-full bg-white border border-slate-300 rounded p-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] focus:border-transparent transition-all resize-y min-h-[120px]"
//                 rows={4}
//                 placeholder="Provide detailed context, coursework code, question references, or study tips for peers…"
//                 value={newContent}
//                 onChange={(e) => setNewContent(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
//               <div className="flex items-center gap-3">
//                 <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
//                   Category:
//                 </label>
//                 <select
//                   className="bg-white border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-[#35a5f1]"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 >
//                   {CATEGORIES.filter((c) => c.value !== "ALL").map((c) => (
//                     <option key={c.value} value={c.value}>
//                       {c.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-center gap-2.5">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsCreatingPost(false);
//                     setNewTitle("");
//                     setNewContent("");
//                   }}
//                   className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded transition-colors cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={posting}
//                   className="inline-flex items-center gap-2 bg-[#35a5f1] hover:bg-[#2888c9] text-white text-xs font-bold px-6 py-2.5 rounded shadow transition-all duration-150 cursor-pointer disabled:opacity-50"
//                 >
//                   {posting ? (
//                     <>
//                       <i className="fa-solid fa-spinner fa-spin text-xs" />
//                       <span>Publishing…</span>
//                     </>
//                   ) : (
//                     <>
//                       <i className="fa-solid fa-paper-plane text-xs" />
//                       <span>Publish Discussion</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* 4. Filter Toolbar & Search Bar */}
//       <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-3.5 space-y-3">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//           {/* Search Input */}
//           <div className="relative flex-1 max-w-md">
//             <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
//             <input
//               type="text"
//               placeholder="Search topics, questions, authors…"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-slate-50 border border-slate-200 rounded pl-8 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#35a5f1]"
//             />
//             {searchQuery && (
//               <button
//                 type="button"
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
//               >
//                 ✕
//               </button>
//             )}
//           </div>

//           {/* Sort Control */}
//           <div className="flex items-center gap-2 text-xs">
//             <span className="font-bold text-slate-500 uppercase text-[11px] shrink-0">Sort By:</span>
//             <div className="inline-flex items-center bg-slate-100 p-0.5 rounded border border-slate-200 text-xs font-semibold">
//               <button
//                 type="button"
//                 onClick={() => setSortBy("latest")}
//                 className={`px-3 py-1 rounded transition-all cursor-pointer ${
//                   sortBy === "latest" ? "bg-white text-[#092240] shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
//                 }`}
//               >
//                 Latest
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setSortBy("likes")}
//                 className={`px-3 py-1 rounded transition-all cursor-pointer ${
//                   sortBy === "likes" ? "bg-white text-[#092240] shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
//                 }`}
//               >
//                 Most Liked
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setSortBy("comments")}
//                 className={`px-3 py-1 rounded transition-all cursor-pointer ${
//                   sortBy === "comments" ? "bg-white text-[#092240] shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
//                 }`}
//               >
//                 Most Discussed
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Category Filter Chips */}
//         <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
//           {CATEGORIES.map((cat) => {
//             const isCatSelected = selectedCategory === cat.value;
//             return (
//               <button
//                 key={cat.value}
//                 type="button"
//                 onClick={() => setSelectedCategory(cat.value)}
//                 className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
//                   isCatSelected
//                     ? "bg-[#35a5f1] text-white shadow-xs"
//                     : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-200"
//                 }`}
//               >
//                 <i className={`fa-solid ${cat.icon} text-[10px]`} />
//                 <span>{cat.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* 5. Discussions Feed with Visible Comments */}
//       {postsLoading ? (
//         <GovLoader label="Refreshing official community discussions…" />
//       ) : filteredPosts.length === 0 ? (
//         <div className="bg-white rounded-lg border border-slate-200 p-12 text-center shadow-xs">
//           <div className="w-12 h-12 bg-sky-50 text-[#35a5f1] rounded-full flex items-center justify-center mx-auto mb-3">
//             <i className="fa-solid fa-comments text-xl" />
//           </div>
//           <h2 className="font-serif font-bold text-slate-800 text-base mb-1">
//             {searchQuery || selectedCategory !== "ALL"
//               ? "No discussions match your filter"
//               : "No discussions published yet"}
//           </h2>
//           <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
//             {searchQuery || selectedCategory !== "ALL"
//               ? "Try adjusting your search keywords or switching category filters."
//               : "Be the first student to ask a question, start a topic, or share laboratory notes."}
//           </p>
//           <button
//             type="button"
//             onClick={() => {
//               setSelectedCategory("ALL");
//               setSearchQuery("");
//               setIsCreatingPost(true);
//             }}
//             className="inline-flex items-center gap-2 bg-[#092240] hover:bg-[#0f2a4a] text-white text-xs font-bold px-4 py-2 rounded shadow transition-colors cursor-pointer"
//           >
//             <i className="fa-solid fa-plus text-xs" />
//             <span>Create First Topic</span>
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-5">
//           {filteredPosts.map((post) => {
//             const isLiked = likedPostIds.has(post.id);
//             const authorName = post.author?.fullName || post.author?.username || "Polytechnic Student";
//             const authorRole = (post.author?.role || "STUDENT").toUpperCase();
//             const authorBranch = post.author?.branch?.code || post.author?.branch || "";
//             const categoryObj = CATEGORIES.find((c) => c.value === post.category);
            
//             // Extract comments list safely - prioritizing fetched list, then any embedded list
//             const fetchedList = postComments[post.id];
//             const embeddedList = parseCommentsList(post.comments || post.replies || post.commentList || post.postComments);
//             const commentsList = (Array.isArray(fetchedList) && fetchedList.length > 0)
//               ? fetchedList
//               : embeddedList.length > 0
//               ? embeddedList
//               : (Array.isArray(fetchedList) ? fetchedList : []);

//             const isCommentsOpen = !!openCommentsMap[post.id];
//             const isCommentsLoading = commentsLoadingMap[post.id];
//             const currentReplyText = replyInputMap[post.id] || "";
//             const isSubmittingReply = submittingReplyMap[post.id];

//             return (
//               <article
//                 key={post.id}
//                 id={`post-${post.id}`}
//                 className="bg-white rounded-lg border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden"
//               >
//                 {/* Post Top Bar: Author Info + Category */}
//                 <div className="p-4 sm:p-5 pb-3">
//                   <div className="flex items-start justify-between gap-3 mb-3">
//                     <div className="flex items-center gap-3">
//                       {/* Avatar */}
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#092240] to-[#35a5f1] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 font-serif">
//                         {getInitials(authorName)}
//                       </div>
//                       <div>
//                         <div className="flex flex-wrap items-center gap-2">
//                           <span className="font-bold text-xs sm:text-sm text-slate-900">
//                             {authorName}
//                           </span>
//                           {/* Role Badge */}
//                           <span
//                             className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${
//                               authorRole === "HOD" || authorRole === "ADMIN" || authorRole === "FACULTY"
//                                 ? "bg-amber-50 text-amber-900 border-amber-300"
//                                 : authorRole === "SENIOR"
//                                 ? "bg-purple-50 text-purple-900 border-purple-200"
//                                 : "bg-sky-50 text-[#092240] border-sky-200"
//                             }`}
//                           >
//                             {authorRole}
//                           </span>
//                           {authorBranch && (
//                             <span className="text-[10px] text-slate-500 font-mono">
//                               ({authorBranch})
//                             </span>
//                           )}
//                         </div>
//                         <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
//                           <i className="fa-regular fa-clock text-[10px]" />
//                           <span>{timeAgo(post.createdAt)}</span>
//                         </span>
//                       </div>
//                     </div>

//                     {/* Category Chip */}
//                     <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shrink-0">
//                       <i className={`fa-solid ${categoryObj?.icon || "fa-comments"} text-[#35a5f1] text-[9px]`} />
//                       <span>{categoryObj?.label || post.category || "GENERAL"}</span>
//                     </span>
//                   </div>

//                   {/* Post Content */}
//                   <div className="space-y-2">
//                     <h2 className="font-serif font-bold text-base sm:text-lg text-[#092240] leading-snug">
//                       {post.title}
//                     </h2>
//                     <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
//                       {post.content}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Post Footer Action Bar (Facebook-Style Like Button & Replies Toggle) */}
//                 <div className="bg-slate-50/80 px-4 sm:px-5 py-2.5 border-t border-b border-slate-200 flex items-center justify-between text-xs">
//                   <div className="flex items-center gap-2 sm:gap-3">
                    
//                     {/* Facebook-like Like / Unlike Toggle Button */}
//                     <button
//                       type="button"
//                       onClick={() => toggleLike(post.id)}
//                       className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs transition-all duration-150 cursor-pointer active:scale-95 select-none ${
//                         isLiked
//                           ? "bg-sky-100 text-[#1b75bb] border border-sky-300 font-bold shadow-2xs"
//                           : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 font-medium"
//                       }`}
//                       title={isLiked ? "Click to unlike" : "Click to like this post"}
//                     >
//                       <i
//                         className={`${
//                           isLiked
//                             ? "fa-solid fa-thumbs-up text-[#35a5f1] scale-110"
//                             : "fa-regular fa-thumbs-up text-slate-500"
//                         } text-sm transition-transform`}
//                       />
//                       <span>{isLiked ? "Liked" : "Like"}</span>
//                       <span
//                         className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
//                           isLiked ? "bg-[#35a5f1] text-white" : "bg-slate-100 text-slate-600"
//                         }`}
//                       >
//                         {post.likesCount || 0}
//                       </span>
//                     </button>

//                     {/* Replies / Comments Toggle Button */}
//                     <button
//                       type="button"
//                       onClick={() => toggleComments(post.id)}
//                       className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold cursor-pointer transition-all duration-150 active:scale-95 ${
//                         isCommentsOpen
//                           ? "bg-sky-100 text-[#1b75bb] border-sky-300 shadow-2xs font-bold"
//                           : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
//                       }`}
//                       title={isCommentsOpen ? "Click to close replies" : "Click to view and post replies"}
//                     >
//                       <i className="fa-regular fa-comment-dots text-slate-500 text-sm" />
//                       <span>
//                         {isCommentsOpen ? "Hide Replies" : "Replies"} ({Math.max(Number(post.commentsCount) || 0, commentsList.length)})
//                       </span>
//                       <i
//                         className={`fa-solid ${
//                           isCommentsOpen ? "fa-chevron-up text-[#1b75bb]" : "fa-chevron-down text-slate-400"
//                         } text-[10px] ml-0.5`}
//                       />
//                     </button>
//                   </div>

//                   {/* Share Link Button */}
//                   <div className="relative">
//                     <button
//                       type="button"
//                       onClick={() => copyPostLink(post.id)}
//                       className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors text-xs font-medium cursor-pointer"
//                       title="Copy link to this discussion"
//                     >
//                       <i className="fa-regular fa-share-from-square text-xs" />
//                       <span className="hidden sm:inline">Share</span>
//                     </button>
//                     {copiedPostId === post.id && (
//                       <span className="absolute right-0 bottom-full mb-1 bg-[#092240] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap animate-in fade-in">
//                         Link Copied!
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* 6. COLLAPSIBLE COMMENTS SECTION */}
//                 {isCommentsOpen && (
//                   <div className="bg-[#f8fafc] p-4 sm:p-5 space-y-3 border-t border-slate-200 animate-in fade-in duration-150">
//                     <div className="flex items-center justify-between">
//                       <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#092240] flex items-center gap-1.5">
//                         <i className="fa-solid fa-comments text-[#35a5f1]" />
//                         Official Academic Discussion Replies ({Math.max(Number(post.commentsCount) || 0, commentsList.length)})
//                       </h3>
//                       <div className="flex items-center gap-2">
//                         <button
//                           type="button"
//                           onClick={() => fetchCommentsForPost(post.id)}
//                           className="text-[11px] text-[#35a5f1] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
//                           title="Reload replies for this post"
//                         >
//                           <i className={`fa-solid fa-arrows-rotate text-[10px] ${isCommentsLoading ? "fa-spin" : ""}`} />
//                           <span>{isCommentsLoading ? "Loading…" : "Refresh"}</span>
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => toggleComments(post.id)}
//                           className="text-[11px] text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
//                           title="Close reply box"
//                         >
//                           <i className="fa-solid fa-xmark text-xs" />
//                           <span>Close</span>
//                         </button>
//                       </div>
//                     </div>

//                     {/* Comments Stack */}
//                     {isCommentsLoading && commentsList.length === 0 ? (
//                       <div className="text-xs text-slate-500 py-4 text-center flex items-center justify-center gap-2 bg-white rounded border border-slate-200">
//                         <i className="fa-solid fa-spinner fa-spin text-[#35a5f1]" />
//                         <span>Loading discussion replies…</span>
//                       </div>
//                     ) : commentsList.length === 0 ? (
//                       <div className="text-xs text-slate-500 py-3 px-4 bg-white rounded-md border border-dashed border-slate-300 flex items-center gap-2">
//                         <i className="fa-regular fa-message text-slate-400 text-sm" />
//                         <span>No responses yet on this discussion. Share the first constructive answer below.</span>
//                       </div>
//                     ) : (
//                       <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
//                         {commentsList.map((c, cIdx) => {
//                           const cAuthor = typeof c.author === "object"
//                             ? (c.author?.fullName || c.author?.name || c.author?.username || "Student")
//                             : typeof c.user === "object"
//                             ? (c.user?.fullName || c.user?.name || c.user?.username || "Student")
//                             : typeof c.student === "object"
//                             ? (c.student?.fullName || c.student?.name || "Student")
//                             : (c.author || c.user || c.authorName || c.studentName || "Student");

//                           const cRole = typeof c.author === "object" && c.author?.role
//                             ? String(c.author.role).toUpperCase()
//                             : typeof c.user === "object" && c.user?.role
//                             ? String(c.user.role).toUpperCase()
//                             : (c.role || "STUDENT").toUpperCase();

//                           const cContent = typeof c === "object"
//                             ? (c.content || c.comment || c.text || c.message || "")
//                             : String(c || "");

//                           const cDate = c.createdAt || c.createdDate || c.timestamp || c.date;

//                           return (
//                             <div
//                               key={c.id || `c-${cIdx}`}
//                               className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs space-y-1.5"
//                             >
//                               <div className="flex items-center justify-between text-xs">
//                                 <div className="flex items-center gap-2">
//                                   <div className="w-5 h-5 rounded-full bg-[#092240] text-white text-[9px] font-bold flex items-center justify-center">
//                                     {getInitials(cAuthor)}
//                                   </div>
//                                   <span className="font-bold text-slate-900 text-xs">{cAuthor}</span>
//                                   <span
//                                     className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
//                                       cRole === "HOD" || cRole === "ADMIN" || cRole === "FACULTY"
//                                         ? "bg-amber-100 text-amber-900 border border-amber-300"
//                                         : cRole === "SENIOR"
//                                         ? "bg-purple-100 text-purple-900 border border-purple-200"
//                                         : "bg-sky-50 text-[#092240] border border-sky-200"
//                                     }`}
//                                   >
//                                     {cRole}
//                                   </span>
//                                 </div>
//                                 <span className="text-[10px] text-slate-400 font-mono">
//                                   {timeAgo(cDate)}
//                                 </span>
//                               </div>
//                               <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap pl-7">
//                                 {cContent}
//                               </p>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}

//                     {/* Inline Direct Reply Input Bar */}
//                     <div className="pt-2 flex gap-2">
//                       <input
//                         type="text"
//                         className="bg-white border border-slate-300 rounded px-3.5 py-2 text-xs flex-1 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] focus:border-transparent transition-all shadow-2xs"
//                         placeholder="Write an official academic reply…"
//                         value={currentReplyText}
//                         onChange={(e) =>
//                           setReplyInputMap((prev) => ({ ...prev, [post.id]: e.target.value }))
//                         }
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter" && !e.shiftKey) {
//                             e.preventDefault();
//                             submitComment(post.id);
//                           }
//                         }}
//                       />
//                       <button
//                         type="button"
//                         disabled={isSubmittingReply || !currentReplyText}
//                         onClick={() => submitComment(post.id)}
//                         className="inline-flex items-center gap-1.5 bg-[#35a5f1] hover:bg-[#2888c9] text-white text-xs font-bold px-4 py-2 rounded transition-all cursor-pointer disabled:opacity-50 shrink-0 shadow-xs"
//                       >
//                         {isSubmittingReply ? (
//                           <i className="fa-solid fa-spinner fa-spin text-xs" />
//                         ) : (
//                           <i className="fa-solid fa-reply text-xs" />
//                         )}
//                         <span>Post Reply</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </article>
//             );
//           })}
//         </div>
//       )}

//       {/* Quick Community Guidelines Strip */}
//       <div className="bg-sky-50/70 border border-sky-200 rounded-lg p-4 text-xs text-slate-700 flex items-start gap-3">
//         <i className="fa-solid fa-shield-halved text-[#35a5f1] text-base mt-0.5 shrink-0" />
//         <div>
//           <span className="font-bold text-[#092240] block mb-0.5">
//             Polytechnic Community Conduct &amp; Academic Integrity Guidelines
//           </span>
//           <p className="text-slate-600 leading-relaxed text-[11px]">
//             Please maintain civil discourse, respect peer queries, and refrain from sharing unauthorized examination question leaks or spam. Official announcements and faculty answers are marked with verified administrative badges.
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// }








































import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";
import { useAuth } from "../../context/AuthContext";

const CATEGORIES = [
  { value: "ALL", label: "All Topics" },
  { value: "ACADEMIC", label: "Academic & Syllabus" },
  { value: "EXAM_PREP", label: "Exam Prep & ECET"},
  { value: "PROJECT", label: "Projects & Labs"},
  { value: "CAMPUS_LIFE", label: "Campus Life & Events" },
  { value: "GENERAL", label: "General Discussion" },
];

// Helper: Extract comments array from any API payload structure
function parseCommentsList(resData) {
  if (!resData) return [];
  if (Array.isArray(resData)) return resData;
  if (Array.isArray(resData.comments)) return resData.comments;
  if (Array.isArray(resData.data)) return resData.data;
  if (Array.isArray(resData.replies)) return resData.replies;
  if (Array.isArray(resData.commentList)) return resData.commentList;
  if (Array.isArray(resData.results)) return resData.results;
  return [];
}

// Helper: Get a comment's timestamp regardless of field name used
function getCommentDateValue(c) {
  const raw = c?.createdAt || c?.createdDate || c?.timestamp || c?.date;
  const t = raw ? new Date(raw).getTime() : NaN;
  return isNaN(t) ? 0 : t;
}

// Helper: Always show newest comments first, regardless of backend/API order
function sortCommentsNewestFirst(list) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => getCommentDateValue(b) - getCommentDateValue(a));
}

// Helper: Format Relative Time
function timeAgo(dateString) {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Just now";
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Helper: Avatar Initials
function getInitials(name) {
  if (!name || typeof name !== "string") return "ST";
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Official Back Button
function OfficialBackButton({ to, label = "Return to Dashboard" }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      title={label}
      aria-label={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white text-[#0f2a4a] hover:bg-[#35a5f1] hover:text-white border border-slate-200 shadow-sm transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] shrink-0 cursor-pointer"
    >
      <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
    </button>
  );
}

export default function CommunityPage() {
  const { user } = useAuth();
  const [communities, setCommunities] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notificationMsg, setNotificationMsg] = useState("");

  // Post Form State
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [posting, setPosting] = useState(false);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Per-Post Comments State (Map: { [postId]: Array<Comment> })
  const [postComments, setPostComments] = useState({});
  const [openCommentsMap, setOpenCommentsMap] = useState({});
  const [commentsLoadingMap, setCommentsLoadingMap] = useState({});
  const [replyInputMap, setReplyInputMap] = useState({});
  const [submittingReplyMap, setSubmittingReplyMap] = useState({});

  // Share Toast
  const [copiedPostId, setCopiedPostId] = useState(null);

  const postFormRef = useRef(null);

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Track liked post IDs in localStorage per user to enforce Facebook-like toggle
  const userStorageKey = `polyconnect_liked_posts_${user?.id || user?.username || "guest"}`;
  const [likedPostIds, setLikedPostIds] = useState(() => {
    try {
      const saved = localStorage.getItem(userStorageKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Save liked post IDs whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(userStorageKey, JSON.stringify(Array.from(likedPostIds)));
    } catch {
      // ignore
    }
  }, [likedPostIds, userStorageKey]);

  // Load Communities List
  useEffect(() => {
    let isMounted = true;
    api
      .get("/community")
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res.data) ? res.data : [];
        setCommunities(list);
        if (list.length > 0) setActiveId(list[0].id);
      })
      .catch((err) => {
        if (isMounted) setError(apiErrorMessage(err, "Could not load official community channels."));
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch comments for a specific post (sorted newest-first immediately on fetch)
  const fetchCommentsForPost = useCallback(async (postId) => {
    setCommentsLoadingMap((prev) => ({ ...prev, [postId]: true }));
    try {
      const res = await api.get(`/community/posts/${postId}/comments`);
      const commentList = sortCommentsNewestFirst(parseCommentsList(res.data));
      setPostComments((prev) => ({ ...prev, [postId]: commentList }));
    } catch (err) {
      console.warn("Could not fetch comments for post", postId, err);
    } finally {
      setCommentsLoadingMap((prev) => ({ ...prev, [postId]: false }));
    }
  }, []);

  // Toggle Comments Box open/close per post
  const toggleComments = useCallback(
    (postId) => {
      setOpenCommentsMap((prev) => {
        const isCurrentlyOpen = !!prev[postId];
        const nextState = !isCurrentlyOpen;
        if (nextState) {
          fetchCommentsForPost(postId);
        }
        return { ...prev, [postId]: nextState };
      });
    },
    [fetchCommentsForPost]
  );

  // Load Posts when active community channel changes
  useEffect(() => {
    if (!activeId) return;
    setPostsLoading(true);
    let isMounted = true;
    api
      .get(`/community/${activeId}/posts`)
      .then(async (res) => {
        if (!isMounted) return;
        const postList = Array.isArray(res.data) ? res.data : [];
        setPosts(postList);

        // Pre-populate if post already has comments embedded in any property
        const initialMap = {};
        postList.forEach((p) => {
          const embedded = sortCommentsNewestFirst(
            parseCommentsList(p.comments || p.replies || p.commentList || p.postComments)
          );
          if (embedded.length > 0) {
            initialMap[p.id] = embedded;
          }
        });
        if (Object.keys(initialMap).length > 0) {
          setPostComments((prev) => ({ ...initialMap, ...prev }));
        }
      })
      .catch((err) => {
        if (isMounted) setError(apiErrorMessage(err, "Could not load discussion posts."));
      })
      .finally(() => {
        if (isMounted) setPostsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [activeId]);

  // Handle Post Creation
  async function submitPost(e) {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    setPosting(true);
    setError("");
    try {
      const res = await api.post(`/community/${activeId}/posts`, {
        title: newTitle.trim(),
        content: newContent.trim(),
        category,
      });
      const newPost = res.data;
      // New post is prepended so it appears first under "Latest" sort
      setPosts((p) => [newPost, ...p]);
      setPostComments((prev) => ({ ...prev, [newPost.id]: [] }));
      setNewTitle("");
      setNewContent("");
      setIsCreatingPost(false);
      setNotificationMsg("Your official discussion topic was published successfully!");
      setTimeout(() => setNotificationMsg(""), 4000);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not publish your post."));
    } finally {
      setPosting(false);
    }
  }

  // Facebook-Style Like / Unlike Toggle Logic
  async function toggleLike(postId) {
    const isCurrentlyLiked = likedPostIds.has(postId);

    // Optimistic UI Update: Toggle like state and adjust count smoothly
    setLikedPostIds((prev) => {
      const next = new Set(prev);
      if (isCurrentlyLiked) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const currentCount = Number(post.likesCount || 0);
          const newCount = isCurrentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1;
          return { ...post, likesCount: newCount };
        }
        return post;
      })
    );

    // Sync with backend
    try {
      if (isCurrentlyLiked) {
        try {
          await api.post(`/community/posts/${postId}/unlike`);
        } catch {
          await api.post(`/community/posts/${postId}/like`);
        }
      } else {
        await api.post(`/community/posts/${postId}/like`);
      }
    } catch {
      // Non-fatal, optimistic UI maintains consistency
    }
  }

  // Handle Comment Submission per post
  async function submitComment(postId) {
    const commentText = (replyInputMap[postId] || "").trim();
    if (!commentText) return;

    // Optimistic Comment Creation for Instant Visibility
    const optimisticComment = {
      id: `temp-${Date.now()}`,
      content: commentText,
      createdAt: new Date().toISOString(),
      author: {
        fullName: user?.fullName || user?.username || "You",
        role: user?.role || "STUDENT",
      },
    };

    // Instant UI update & ensure comments box is open
    // Newest first: prepend the optimistic comment instead of appending
    setOpenCommentsMap((prev) => ({ ...prev, [postId]: true }));
    setPostComments((prev) => ({
      ...prev,
      [postId]: [optimisticComment, ...(prev[postId] || [])],
    }));

    // Clear input
    setReplyInputMap((prev) => ({ ...prev, [postId]: "" }));

    // Increment count
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId ? { ...p, commentsCount: (Number(p.commentsCount) || 0) + 1 } : p
      )
    );

    setSubmittingReplyMap((prev) => ({ ...prev, [postId]: true }));

    try {
      const res = await api.post(`/community/posts/${postId}/comments`, {
        content: commentText,
      });
      const serverComment =
        res.data?.comment || res.data?.data || (res.data?.id ? res.data : optimisticComment);

      // Replace optimistic comment with server response, keep newest-first order
      setPostComments((prev) => {
        const currentList = prev[postId] || [];
        const updated = currentList.map((c) =>
          c.id === optimisticComment.id ? serverComment : c
        );
        return { ...prev, [postId]: sortCommentsNewestFirst(updated) };
      });
    } catch (err) {
      setError(apiErrorMessage(err, "Could not submit your comment."));
    } finally {
      setSubmittingReplyMap((prev) => ({ ...prev, [postId]: false }));
    }
  }

  // Copy Post Link
  function copyPostLink(postId) {
    const url = `${window.location.origin}/student/community#post-${postId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2500);
  }

  // Filtered and Sorted Posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by Category
    if (selectedCategory !== "ALL") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.content?.toLowerCase().includes(q) ||
          p.author?.fullName?.toLowerCase().includes(q) ||
          p.author?.username?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "likes") {
      result.sort((a, b) => (Number(b.likesCount) || 0) - (Number(a.likesCount) || 0));
    } else if (sortBy === "comments") {
      result.sort((a, b) => (Number(b.commentsCount) || 0) - (Number(a.commentsCount) || 0));
    } else {
      // Latest first (newest post at top)
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  }, [posts, selectedCategory, searchQuery, sortBy]);

  const activeCommunity = communities?.find((c) => c.id === activeId);

  if (error && !communities) {
    return (
      <div className="max-w-7xl mx-auto space-y-4 p-4 font-sans text-slate-800">
        <div className="flex items-center gap-3">
          <OfficialBackButton />
          <h1 className="text-xl md:text-2xl font-bold text-[#0f2a4a]">Polytechnic Community</h1>
        </div>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r shadow-sm flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-red-900">System Notification</p>
            <p className="text-xs text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!communities) {
    return <GovLoader label="Loading official student community channels…" />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-5 font-sans text-slate-800 pb-12 px-2 sm:px-4">
      
      {/* 1. Main Official Government Header Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#092240] via-[#0d3461] to-[#35a5f1] p-4 sm:p-6 text-white shadow-md border-b-4 border-[#35a5f1]">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <OfficialBackButton to="/student/dashboard" label="Return to Student Dashboard" />
            <div>
         
              <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Polytechnic Community Forums
              </h1>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2 pt-1 lg:pt-0">
            <button
              type="button"
              onClick={() => {
                setIsCreatingPost((prev) => !prev);
                setTimeout(() => {
                  postFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
              }}
              className="inline-flex items-center gap-2 bg-[#FF9933] hover:bg-[#e68524] text-[#092240] font-bold text-xs px-4 py-2.5 rounded shadow transition-all duration-150 cursor-pointer active:scale-95 shrink-0"
            >
              <i className="fa-solid fa-pen-to-square text-xs" />
              <span>{isCreatingPost ? "Close Post Editor" : "Start a Discussion"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {notificationMsg && (
        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3.5 rounded-r shadow-xs text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <i className="fa-solid fa-circle-check text-emerald-600 text-sm" />
            <span className="font-semibold">{notificationMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotificationMsg("")}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-2 py-0.5 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. Channel Selector Tabs (College vs Statewide) */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-2 sm:p-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            Community Channel Boards
          </span>
          {activeCommunity && (
            <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
              Currently viewing: <strong className="text-[#092240]">{activeCommunity.name}</strong>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {communities.map((c) => {
            const isSelected = activeId === c.id;
            const isStatewide = c.name?.toLowerCase().includes("state") || c.name?.toLowerCase().includes("all");
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveId(c.id);
                  setError("");
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-md text-xs font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#092240] text-white shadow-sm ring-2 ring-[#35a5f1]/40"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span>{c.name}</span>
                {c.postsCount != null && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {c.postsCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Create Discussion Form (Collapsible / Expandable) */}
      {isCreatingPost && (
        <div
          ref={postFormRef}
          className="bg-white rounded-lg border border-slate-200 shadow-md overflow-hidden animate-in slide-in-from-top-2 duration-200"
        >
          {/* Header */}
          <div className="bg-[#0f2a4a] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-pen-nib text-[#35a5f1]" />
              <span className="font-serif font-bold text-sm tracking-wide">
                Start a New Discussion in {activeCommunity?.name || "Community"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCreatingPost(false)}
              className="text-slate-300 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer"
            >
              Cancel ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={submitPost} className="p-4 sm:p-5 bg-slate-50/60 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Topic Title <span className="text-rose-500">*</span>
              </label>
              <input
                className="w-full bg-white border border-slate-300 rounded p-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] focus:border-transparent transition-all"
                placeholder="E.g., C-21 4th Sem Microcontrollers Lab Manual notes & syllabus guidance…"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Discussion Details / Question <span className="text-rose-500">*</span>
              </label>
              <textarea
                className="w-full bg-white border border-slate-300 rounded p-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] focus:border-transparent transition-all resize-y min-h-[120px]"
                rows={4}
                placeholder="Provide detailed context, coursework code, question references, or study tips for peers…"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Category:
                </label>
                <select
                  className="bg-white border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-[#35a5f1]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.filter((c) => c.value !== "ALL").map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingPost(false);
                    setNewTitle("");
                    setNewContent("");
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={posting}
                  className="inline-flex items-center gap-2 bg-[#35a5f1] hover:bg-[#2888c9] text-white text-xs font-bold px-6 py-2.5 rounded shadow transition-all duration-150 cursor-pointer disabled:opacity-50"
                >
                  {posting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin text-xs" />
                      <span>Publishing…</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane text-xs" />
                      <span>Publish Discussion</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 4. Filter Toolbar & Search Bar */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-3.5 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search topics, questions, authors…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded pl-8 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#35a5f1]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-500 uppercase text-[11px] shrink-0">Sort By:</span>
            <div className="inline-flex items-center bg-slate-100 p-0.5 rounded border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSortBy("latest")}
                className={`px-3 py-1 rounded transition-all cursor-pointer ${
                  sortBy === "latest" ? "bg-white text-[#092240] shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Latest
              </button>
              <button
                type="button"
                onClick={() => setSortBy("likes")}
                className={`px-3 py-1 rounded transition-all cursor-pointer ${
                  sortBy === "likes" ? "bg-white text-[#092240] shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Most Liked
              </button>
              <button
                type="button"
                onClick={() => setSortBy("comments")}
                className={`px-3 py-1 rounded transition-all cursor-pointer ${
                  sortBy === "comments" ? "bg-white text-[#092240] shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Most Discussed
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isCatSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
                  isCatSelected
                    ? "bg-[#35a5f1] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-200"
                }`}
              >
                <i className={`fa-solid ${cat.icon} text-[10px]`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Discussions Feed with Visible Comments */}
      {postsLoading ? (
        <GovLoader label="Refreshing official community discussions…" />
      ) : filteredPosts.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 bg-sky-50 text-[#35a5f1] rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fa-solid fa-comments text-xl" />
          </div>
          <h2 className="font-serif font-bold text-slate-800 text-base mb-1">
            {searchQuery || selectedCategory !== "ALL"
              ? "No discussions match your filter"
              : "No discussions published yet"}
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            {searchQuery || selectedCategory !== "ALL"
              ? "Try adjusting your search keywords or switching category filters."
              : "Be the first student to ask a question, start a topic, or share laboratory notes."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
              setIsCreatingPost(true);
            }}
            className="inline-flex items-center gap-2 bg-[#092240] hover:bg-[#0f2a4a] text-white text-xs font-bold px-4 py-2 rounded shadow transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Create First Topic</span>
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredPosts.map((post) => {
            const isLiked = likedPostIds.has(post.id);
            const authorName = post.author?.fullName || post.author?.username || "Polytechnic Student";
            const authorRole = (post.author?.role || "STUDENT").toUpperCase();
            const authorBranch = post.author?.branch?.code || post.author?.branch || "";
            const categoryObj = CATEGORIES.find((c) => c.value === post.category);
            
            // Extract comments list safely - prioritizing fetched list, then any embedded list
            const fetchedList = postComments[post.id];
            const embeddedList = parseCommentsList(post.comments || post.replies || post.commentList || post.postComments);
            const rawCommentsList = (Array.isArray(fetchedList) && fetchedList.length > 0)
              ? fetchedList
              : embeddedList.length > 0
              ? embeddedList
              : (Array.isArray(fetchedList) ? fetchedList : []);

            // Always render newest-first, no matter which source the list came from
            const commentsList = sortCommentsNewestFirst(rawCommentsList);

            const isCommentsOpen = !!openCommentsMap[post.id];
            const isCommentsLoading = commentsLoadingMap[post.id];
            const currentReplyText = replyInputMap[post.id] || "";
            const isSubmittingReply = submittingReplyMap[post.id];

            return (
              <article
                key={post.id}
                id={`post-${post.id}`}
                className="bg-white rounded-lg border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Post Top Bar: Author Info + Category */}
                <div className="p-4 sm:p-5 pb-3">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#092240] to-[#35a5f1] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 font-serif">
                        {getInitials(authorName)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            {authorName}
                          </span>
                          {/* Role Badge */}
                          <span
                            className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${
                              authorRole === "HOD" || authorRole === "ADMIN" || authorRole === "FACULTY"
                                ? "bg-amber-50 text-amber-900 border-amber-300"
                                : authorRole === "SENIOR"
                                ? "bg-purple-50 text-purple-900 border-purple-200"
                                : "bg-sky-50 text-[#092240] border-sky-200"
                            }`}
                          >
                            {authorRole}
                          </span>
                          {authorBranch && (
                            <span className="text-[10px] text-slate-500 font-mono">
                              ({authorBranch})
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <i className="fa-regular fa-clock text-[10px]" />
                          <span>{timeAgo(post.createdAt)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Category Chip */}
                    <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shrink-0">
                      <i className={`fa-solid ${categoryObj?.icon || "fa-comments"} text-[#35a5f1] text-[9px]`} />
                      <span>{categoryObj?.label || post.category || "GENERAL"}</span>
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-2">
                    <h2 className="font-serif font-bold text-base sm:text-lg text-[#092240] leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                </div>

                {/* Post Footer Action Bar (Facebook-Style Like Button & Replies Toggle) */}
                <div className="bg-slate-50/80 px-4 sm:px-5 py-2.5 border-t border-b border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 sm:gap-3">
                    
                    {/* Facebook-like Like / Unlike Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs transition-all duration-150 cursor-pointer active:scale-95 select-none ${
                        isLiked
                          ? "bg-sky-100 text-[#1b75bb] border border-sky-300 font-bold shadow-2xs"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 font-medium"
                      }`}
                      title={isLiked ? "Click to unlike" : "Click to like this post"}
                    >
                      <i
                        className={`${
                          isLiked
                            ? "fa-solid fa-thumbs-up text-[#35a5f1] scale-110"
                            : "fa-regular fa-thumbs-up text-slate-500"
                        } text-sm transition-transform`}
                      />
                      <span>{isLiked ? "Liked" : "Like"}</span>
                      <span
                        className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                          isLiked ? "bg-[#35a5f1] text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {post.likesCount || 0}
                      </span>
                    </button>

                    {/* Replies / Comments Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleComments(post.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold cursor-pointer transition-all duration-150 active:scale-95 ${
                        isCommentsOpen
                          ? "bg-sky-100 text-[#1b75bb] border-sky-300 shadow-2xs font-bold"
                          : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
                      }`}
                      title={isCommentsOpen ? "Click to close replies" : "Click to view and post replies"}
                    >
                      <i className="fa-regular fa-comment-dots text-slate-500 text-sm" />
                      <span>
                        {isCommentsOpen ? "Hide Replies" : "Replies"} ({Math.max(Number(post.commentsCount) || 0, commentsList.length)})
                      </span>
                      <i
                        className={`fa-solid ${
                          isCommentsOpen ? "fa-chevron-up text-[#1b75bb]" : "fa-chevron-down text-slate-400"
                        } text-[10px] ml-0.5`}
                      />
                    </button>
                  </div>

                  {/* Share Link Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => copyPostLink(post.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors text-xs font-medium cursor-pointer"
                      title="Copy link to this discussion"
                    >
                      <i className="fa-regular fa-share-from-square text-xs" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                    {copiedPostId === post.id && (
                      <span className="absolute right-0 bottom-full mb-1 bg-[#092240] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap animate-in fade-in">
                        Link Copied!
                      </span>
                    )}
                  </div>
                </div>

                {/* 6. COLLAPSIBLE COMMENTS SECTION */}
                {isCommentsOpen && (
                  <div className="bg-[#f8fafc] p-4 sm:p-5 space-y-3 border-t border-slate-200 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-[#092240] flex items-center gap-1.5">
                        <i className="fa-solid fa-comments text-[#35a5f1]" />
                        Official Academic Discussion Replies ({Math.max(Number(post.commentsCount) || 0, commentsList.length)})
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fetchCommentsForPost(post.id)}
                          className="text-[11px] text-[#35a5f1] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                          title="Reload replies for this post"
                        >
                          <i className={`fa-solid fa-arrows-rotate text-[10px] ${isCommentsLoading ? "fa-spin" : ""}`} />
                          <span>{isCommentsLoading ? "Loading…" : "Refresh"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleComments(post.id)}
                          className="text-[11px] text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                          title="Close reply box"
                        >
                          <i className="fa-solid fa-xmark text-xs" />
                          <span>Close</span>
                        </button>
                      </div>
                    </div>

                    {/* Comments Stack (rendered newest-first) */}
                    {isCommentsLoading && commentsList.length === 0 ? (
                      <div className="text-xs text-slate-500 py-4 text-center flex items-center justify-center gap-2 bg-white rounded border border-slate-200">
                        <i className="fa-solid fa-spinner fa-spin text-[#35a5f1]" />
                        <span>Loading discussion replies…</span>
                      </div>
                    ) : commentsList.length === 0 ? (
                      <div className="text-xs text-slate-500 py-3 px-4 bg-white rounded-md border border-dashed border-slate-300 flex items-center gap-2">
                        <i className="fa-regular fa-message text-slate-400 text-sm" />
                        <span>No responses yet on this discussion. Share the first constructive answer below.</span>
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                        {commentsList.map((c, cIdx) => {
                          const cAuthor = typeof c.author === "object"
                            ? (c.author?.fullName || c.author?.name || c.author?.username || "Student")
                            : typeof c.user === "object"
                            ? (c.user?.fullName || c.user?.name || c.user?.username || "Student")
                            : typeof c.student === "object"
                            ? (c.student?.fullName || c.student?.name || "Student")
                            : (c.author || c.user || c.authorName || c.studentName || "Student");

                          const cRole = typeof c.author === "object" && c.author?.role
                            ? String(c.author.role).toUpperCase()
                            : typeof c.user === "object" && c.user?.role
                            ? String(c.user.role).toUpperCase()
                            : (c.role || "STUDENT").toUpperCase();

                          const cContent = typeof c === "object"
                            ? (c.content || c.comment || c.text || c.message || "")
                            : String(c || "");

                          const cDate = c.createdAt || c.createdDate || c.timestamp || c.date;

                          return (
                            <div
                              key={c.id || `c-${cIdx}`}
                              className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs space-y-1.5"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-[#092240] text-white text-[9px] font-bold flex items-center justify-center">
                                    {getInitials(cAuthor)}
                                  </div>
                                  <span className="font-bold text-slate-900 text-xs">{cAuthor}</span>
                                  <span
                                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                                      cRole === "HOD" || cRole === "ADMIN" || cRole === "FACULTY"
                                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                                        : cRole === "SENIOR"
                                        ? "bg-purple-100 text-purple-900 border border-purple-200"
                                        : "bg-sky-50 text-[#092240] border border-sky-200"
                                    }`}
                                  >
                                    {cRole}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {timeAgo(cDate)}
                                </span>
                              </div>
                              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap pl-7">
                                {cContent}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Inline Direct Reply Input Bar */}
                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        className="bg-white border border-slate-300 rounded px-3.5 py-2 text-xs flex-1 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] focus:border-transparent transition-all shadow-2xs"
                        placeholder="Write an official academic reply…"
                        value={currentReplyText}
                        onChange={(e) =>
                          setReplyInputMap((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            submitComment(post.id);
                          }
                        }}
                      />
                      <button
                        type="button"
                        disabled={isSubmittingReply || !currentReplyText}
                        onClick={() => submitComment(post.id)}
                        className="inline-flex items-center gap-1.5 bg-[#35a5f1] hover:bg-[#2888c9] text-white text-xs font-bold px-4 py-2 rounded transition-all cursor-pointer disabled:opacity-50 shrink-0 shadow-xs"
                      >
                        {isSubmittingReply ? (
                          <i className="fa-solid fa-spinner fa-spin text-xs" />
                        ) : (
                          <i className="fa-solid fa-reply text-xs" />
                        )}
                        <span>Post Reply</span>
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Quick Community Guidelines Strip */}
      <div className="bg-sky-50/70 border border-sky-200 rounded-lg p-4 text-xs text-slate-700 flex items-start gap-3">
        <i className="fa-solid fa-shield-halved text-[#35a5f1] text-base mt-0.5 shrink-0" />
        <div>
          <span className="font-bold text-[#092240] block mb-0.5">
            Polytechnic Community Conduct &amp; Academic Integrity Guidelines
          </span>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Please maintain civil discourse, respect peer queries, and refrain from sharing unauthorized examination question leaks or spam. Official announcements and faculty answers are marked with verified administrative badges.
          </p>
        </div>
      </div>

    </div>
  );
}