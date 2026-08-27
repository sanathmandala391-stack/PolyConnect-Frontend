// src/components/WhatsNew.jsx

const updates = [
  "Diploma Results will be Released Soon",
  "C-24 and  C-26 Attendance Updated ",
  "Attendance 31-Day Sheet updated",
   "Diploma Notifications",
   "Diploma Circulars"
];

export default function WhatsNew() {
  return (
    // <div className="overflow-hidden mt-1 px-3 sm:px-4 md:px-6">
<div className="overflow-hidden mt-1 px-3 sm:px-4 md:px-6 xl:px-6">
      {/* <div className="max-w-7xl mx-auto flex items-center"> */}
      <div className="max-w-7xl mx-auto flex items-center xl:justify-end">
        <h2
          className="shrink-0 flex items-center justify-center font-normal uppercase text-[11px] sm:text-[12px] text-white px-2 sm:px-4 py-1.5"
          style={{
            border: "2px solid #5aa628",
            background: "#5aa628",
            margin: "2px 8px 4px 0",
            color: "#fff",
            fontFamily: "'Mulish', sans-serif",
            height: "32px",
            boxSizing: "border-box",
            whiteSpace: "nowrap",
          }}
        >
          What's New
        </h2>

        {/* <div className="relative flex-1 min-w-0 overflow-hidden py-2"> */}
        <div className="relative flex-1 min-w-0 overflow-hidden py-2 xl:flex-none xl:w-[1130px]">
          <div className="flex whitespace-nowrap marquee-track">

            {[...updates, ...updates].map((item, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2 mx-8 shrink-0"
              >
                <img
                  src="https://www.sbtet.telangana.gov.in/contents/img/gif.gif"
                  alt="new"
                  className="w-5 h-5 shrink-0"
                />

                <span
                  className="text-[13px] text-[#1a3c78]"
                  style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {item}
                </span>
              </span>
            ))}

          </div>
        </div>
      </div>

      <style>{`
        .marquee-track {
          width: max-content;
          animation: marquee-scroll 25s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}