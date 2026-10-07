import React from "react";
import newGif from "./images/new.gif";

const updates = [
  "Diploma Results will be Released Soon",
  "C-24 and C-26 Attendance Updated",
  "Attendance 31-Day Sheet updated",
  "Diploma Notifications",
  "Diploma Circulars",
];

export default function WhatsNew() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center w-full">
        <h2
          className="shrink-0 flex items-center justify-center font-normal uppercase text-[11px] sm:text-[12px] text-white px-2.5 sm:px-3.5"
          style={{
            border: "2px solid #5aa628",
            background: "#5aa628",
            margin: "0 8px 0 0",
            color: "#fff",
            fontFamily: "'Mulish', sans-serif",
            height: "29px",
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            borderRadius: "1px",
          }}
        >
          What's New
        </h2>

        <div className="relative flex-1 min-w-0 overflow-hidden py-0.5">
          <div className="flex whitespace-nowrap marquee-track">
            {[...updates, ...updates, ...updates].map((item, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 mx-5 shrink-0"
              >
                <img
                  src={"https://www.sbtet.telangana.gov.in/contents/img/gif.gif"}
                  alt="new"
                  className="w-8 h-8 shrink-0 object-contain inline-block"
                  onError={(e) => {
                    e.currentTarget.src = "https://www.sbtet.telangana.gov.in/contents/img/gif.gif";
                  }}
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