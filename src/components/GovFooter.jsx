import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const SBTET_VISITOR_API_PROXIED = "/sbtet-api/PreExamination/GetWebSiteVisiterCount";
const SBTET_VISITOR_API_DIRECT = "https://www.sbtet.telangana.gov.in/api/api/PreExamination/GetWebSiteVisiterCount";

export default function GovFooter() {
  const [visitorCount, setVisitorCount] = useState(() => {
    try {
      const cached = localStorage.getItem("sbtet_visitor_count");
      if (cached) return cached;
    } catch {
      // ignore storage error
    }
    return "1468953";
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchVisitorCount() {
      // 1. Try proxied path first to prevent browser CORS, then try direct SBTET endpoint
      const endpoints = [SBTET_VISITOR_API_PROXIED, SBTET_VISITOR_API_DIRECT];

      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            headers: {
              Accept: "application/json",
            },
          });
          if (!res.ok) continue;

          const data = await res.json();
          const count =
            data?.Table?.[0]?.WebsiteVisitedCount ??
            data?.Table1?.[0]?.WebsiteVisitedCount ??
            (Array.isArray(data) ? data[0]?.WebsiteVisitedCount : null) ??
            data?.WebsiteVisitedCount;

          if (count && isMounted) {
            const countStr = String(count);
            setVisitorCount(countStr);
            try {
              localStorage.setItem("sbtet_visitor_count", countStr);
            } catch {
              // ignore storage error
            }
            break; // successfully fetched
          }
        } catch {
          // silently continue to fallback
        }
      }
    }

    fetchVisitorCount();

    // Live refresh every 60 seconds
    const interval = setInterval(fetchVisitorCount, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <footer
      id="contact-us"
      className="section footer-classic context-dark bg-image w-full mt-14 relative no-print"
      style={{ fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* Upper Footer Block */}
      <div className="bg-[#0b62a4] text-white py-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {/* Address Column */}
          <div>
            <h5 className="text-[18px] font-normal text-white mb-2 tracking-wide">Address:</h5>
            <dl className="contact-list m-0">
              <dt></dt>
              <dd className="text-[14px] text-white leading-relaxed m-0 font-normal">
                Sankethika Vidhya Bhavan, Masab Tank, Hyderabad – 500 028, India.
              </dd>
            </dl>
          </div>

          {/* Contacts Us Column */}
          <div>
            <dl className="contact-list m-0">
              <dt className="text-[14px] font-normal text-white leading-relaxed m-0">
                Email : <span>
                  <a
                    href="mailto:sbtet-helpdesk@telangana.gov.in"
                    className="hover:underline"
                    style={{ color: "rgb(255, 255, 255)", fontSize: "14px" }}
                  >
                    sbtet-helpdesk@telangana.gov.in
                  </a>
                </span>
                <br />
                Phone : <span>
                  <a
                    href="tel:08031404549"
                    className="hover:underline"
                    style={{ color: "rgb(255, 255, 255)", fontSize: "14px" }}
                  >
                    08031404549
                  </a>
                </span>
              </dt>
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full relative" style={{ backgroundColor: "#2075ae" }}>
        <div className="max-w-[1350px] mx-auto py-3 px-4 sm:px-8 lg:px-12">
          <div className="site-info flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-white">
            {/* Copyright Text */}
            <span className="text-center md:text-left text-white font-normal">
              © {new Date().getFullYear()} State Board of Technical Education &amp; Training, Telangana. All rights reserved.
            </span>

            {/* Site Views Counter */}
            <div
              className="flex items-center select-none whitespace-nowrap"
              title={`Live Website Visitors: ${visitorCount} (SBTET Telangana)`}
            >
              <span className="text-white text-[12px] font-normal tracking-normal mr-3" style={{ fontFamily: "Mulish", color: "white" }}>
                Total Site Views:
              </span>
              <div
                className="inline-flex items-center bg-white h-[25px] px-[6px] select-all"
                style={{ backgroundColor: "#ffffff" }}
              >
                {visitorCount.split("").map((digit, idx) => (
                  <span
                    key={idx}
                    className="w-[22px] h-full flex items-center justify-center font-normal text-black text-[14px] leading-none select-all"
                    style={{ fontFamily: "Mulish" }}
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Circle Button */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute -top-4 right-6 sm:right-10 w-8 h-8 rounded-full bg-white text-black shadow-md flex items-center justify-center hover:bg-gray-100 transition-transform active:scale-95 cursor-pointer z-20 border border-gray-200"
          aria-label="Scroll to Top"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4 text-black stroke-[3]" />
        </button>
      </div>

      {/* Separate Disclaimer & Developer Contact Bar */}
      <div className="w-full bg-[#083b63] border-t border-white/10 text-white py-2.5 px-4 sm:px-8 text-center select-none">
        <div className="max-w-[1350px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 text-[12px] text-white/90">
          <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
            {/* <i className="fa-solid fa-triangle-exclamation text-xs"></i> */}
            This is Not Official Site.
          </span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="text-white/80">
            Contact Developer:{" "}
            <span className="text-white font-semibold tracking-wide">
              Mandala Sanath Kumar
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
