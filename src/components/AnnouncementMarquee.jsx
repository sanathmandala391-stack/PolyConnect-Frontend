// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/client";

// export default function AnnouncementMarquee() {
//   const [items, setItems] = useState([]);
//   const [failed, setFailed] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     api
//       .get("/sbtet/circulars")
//       .then((res) => {
//         if (!isMounted) return;
//         if (Array.isArray(res.data)) {
//           const sorted = [...res.data]
//             .sort(
//               (a, b) =>
//                 new Date(b.timeStamp || b.NotificationDate || 0) -
//                 new Date(a.timeStamp || a.NotificationDate || 0)
//             )
//             .slice(0, 10);
//           setItems(sorted);
//         }
//       })
//       .catch(() => {
//         if (isMounted) setFailed(true);
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   if (failed || items.length === 0) {
//     return null;
//   }

//   const track = (
//     <div className="flex items-center gap-10 shrink-0 pr-10">
//       {items.map((c, i) => (
//         <a
//           key={c.ID || i}
//           href={c.Url || `/circulars`}
//           target={c.Url ? "_blank" : "_self"}
//           rel="noreferrer"
//           className="text-xs md:text-sm text-gov-navy hover:text-gov-blue hover:underline whitespace-nowrap flex items-center gap-2"
//         >
//           {/* Real Government Portal Blinking (NEW) Badge */}
//           <span className="blink-new text-xs font-black text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded-sm shadow-xs">
//             (NEW)
//           </span>

//           <span className="font-bold text-gov-blueDark">
//             {c.CircularType ? `[${c.CircularType}]` : ""}
//           </span>
//           <span className="font-medium text-gov-ink">{c.Title}</span>

//           {c.NotificationDate && (
//             <span className="text-[11px] text-gov-slate font-mono bg-white px-1.5 py-0.5 rounded border border-gov-border">
//               {new Date(c.NotificationDate).toLocaleDateString("en-IN", {
//                 day: "2-digit",
//                 month: "2-digit",
//                 year: "numeric",
//               })}
//             </span>
//           )}
//         </a>
//       ))}
//     </div>
//   );

//   return (
//     <div className="bg-[#e8f4fd] border-y border-gov-border overflow-hidden no-print">
//       <div className="max-w-7xl mx-auto flex items-stretch">
//         <Link
//           to="/circulars"
//           className="shrink-0 bg-[#43a047] hover:bg-[#388e3c] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 flex items-center gap-1.5 shadow-sm transition-colors z-10"
//         >
//           <span className="animate-pulse">●</span> What's New
//         </Link>
//         <div className="flex overflow-hidden py-1.5 px-3 flex-1">
//           <div className="marquee-track flex items-center">
//             {track}
//             {track}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

export default function AnnouncementMarquee() {
  const [items, setItems] = useState([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/sbtet/circulars")
      .then((res) => {
        if (!isMounted) return;
        if (Array.isArray(res.data)) {
          const sorted = [...res.data]
            .sort(
              (a, b) =>
                new Date(b.timeStamp || b.NotificationDate || 0) -
                new Date(a.timeStamp || a.NotificationDate || 0)
            )
            .slice(0, 10);
          setItems(sorted);
        }
      })
      .catch(() => {
        if (isMounted) setFailed(true);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (failed || items.length === 0) {
    return null;
  }

  const track = (
    <div className="flex items-center gap-10 shrink-0 pr-10">
      {items.map((c, i) => (
        <a
          key={c.ID || i}
          href={c.Url || `/circulars`}
          target={c.Url ? "_blank" : "_self"}
          rel="noreferrer"
          className="text-xs md:text-sm hover:underline whitespace-nowrap flex items-center gap-2 font-sans"
        >
          <span className="blink-new text-[10px] font-black text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-sm">
            (NEW)
          </span>

          {c.CircularType && (
            <span className="font-bold text-gov-blueDark">
              [{c.CircularType}]
            </span>
          )}
          <span className="font-medium text-gov-ink hover:text-gov-blue transition-colors">
            {c.Title}
          </span>

          {c.NotificationDate && (
            <span className="text-[11px] text-gov-slate font-mono bg-white px-1.5 py-0.5 rounded border border-gov-border">
              {new Date(c.NotificationDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          )}
        </a>
      ))}
    </div>
  );

  return (
    <div className="bg-[#e8f4fd] border-y border-gov-border overflow-hidden no-print">
      <div className="max-w-7xl mx-auto flex items-stretch">
        <Link
          to="/circulars"
          className="shrink-0 bg-[#43a047] hover:bg-[#388e3c] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 flex items-center gap-1.5 shadow-sm transition-colors z-10 font-sans"
        >
          <span className="blink-new">●</span> What's New
        </Link>

        {/* This wrapper's width bounds the scroll; track is 2x content, animated -50% */}
        <div className="flex overflow-hidden py-1.5 px-3 flex-1">
          <div className="marquee-track flex items-center" style={{ width: "max-content" }}>
            {track}
            {track}
          </div>
        </div>
      </div>
    </div>
  );
}