import { useEffect } from "react";
import { Link } from "react-router-dom";
import localComingSoonSvg from "../images/coming-soon.svg";

export default function RtiObligationsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Obligations of Public Authority | State Board of Technical Education and Training Telangana";
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-250px)] bg-white sbtet-rti-obligations-page">
      <style>{`
        .sbtet-rti-obligations-page {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: 'Mulish', Arial, Helvetica, sans-serif;
        }
      `}</style>

      {/* 1. Header Breadcrumb Bar (Full-Width Edge-to-Edge Bar) */}
      <div
        className="w-full bg-[#e9ecef] border-b border-[#dee2e6] min-h-[36px] sm:h-[38px] flex items-center py-1 sm:py-0"
        style={{ boxSizing: "border-box" }}
      >
        <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-6 md:px-8 flex items-center text-[12px] sm:text-[13.5px] overflow-x-auto whitespace-nowrap">
          <Link
            to="/"
            className="text-[black] font-normal cursor-pointer hover:underline"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: "600" }}
          >
            Home
          </Link>
          <span
            className="text-[black] mx-1.5 font-normal select-none"
            style={{ fontFamily: "Mulish, sans-serif", fontWeight: "590" }}
          >
            /
          </span>
          <Link
            to="/sitemap"
            className="text-[black] font-normal cursor-pointer hover:underline"
            style={{ fontFamily: "Mulish, sans-serif", fontWeight: "590" }}
          >
            RTI
          </Link>
          <span
            className="text-[black] mx-1.5 font-normal select-none"
            style={{ fontFamily: "Mulish, sans-serif", fontWeight: "590" }}
          >
            /
          </span>
          <span
            className="text-[#6c757d] font-semibold"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
          >
            Obligations of Public Authority
          </span>
        </div>
      </div>

      {/* 2. Main Page Content: Centered Coming Soon Graphic matching Image 2 */}
      <div className="w-full flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
        <img
          src="https://www.sbtet.telangana.gov.in/assets/img/coming-soon.svg"
          onError={(e) => {
            // Fallback to locally bundled SVG asset if external network image is unreachable
            e.currentTarget.onerror = null;
            e.currentTarget.src = localComingSoonSvg;
          }}
          alt="Coming Soon..."
          className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] h-auto object-contain select-none"
        />
      </div>
    </div>
  );
}
