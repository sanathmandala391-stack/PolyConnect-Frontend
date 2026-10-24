import { useEffect } from "react";
import { Link } from "react-router-dom";
import banner2Svg from "../images/banner-2.svg";

export default function RtiAboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "About Right to Information | State Board of Technical Education and Training Telangana";
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-250px)] bg-white sbtet-rti-about-page">
      <style>{`
        .sbtet-rti-about-page {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: 'Mulish', Arial, Helvetica, sans-serif;
        }
        @media (max-width: 1200px) {
          .sbtet-rti-about-page .responsive-about-container {
            margin-left: 0 !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>

      {/* 1. Header Breadcrumb Bar (Full-Width Edge-to-Edge Bar) */}
      <div
        className="w-full bg-[#e9ecef] border-b border-[#dee2e6] min-h-[36px] sm:h-[38px] flex items-center py-1 sm:py-0"
        style={{ boxSizing: "border-box" }}
      >
        <div className="responsive-about-container max-w-[1320px] w-full mx-auto px-4 sm:px-6 md:px-8 flex items-center text-[12px] sm:text-[13.5px] overflow-x-auto whitespace-nowrap" style={{ marginLeft: "123px" }}>
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
            About Right to Information
          </span>
        </div>
      </div>

      {/* 2. Main Page Content: Left Text Section + Right Illustration Banner */}
      <div className="responsive-about-container max-w-[1320px] w-full mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-9 pb-16" style={{ marginLeft: "125px" }}>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-10">
          {/* Left Column: Title, Subtitle, and Description */}
          <div className="w-full flex-1 max-w-[960px] flex flex-col pt-1.5">
            {/* Green Accent Indicator + Subtitle */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-[3.5px] h-[21px] bg-[#28a745] rounded-xs shrink-0" />
              <span
                className="text-[15px] sm:text-[20px] text-[#222943] font-medium tracking-normal"
                style={{ fontFamily: "'Mulish', Arial, sans-serif" }}
              >
                About Right to Information
              </span>
            </div>

            {/* Main Section Heading */}
            <h1
              className="text-[26px] sm:text-[34px] font-bold text-[#202742] leading-[1.2] tracking-[-0.015em] mb-5 sm:mb-7"
              style={{ fontFamily: "'Mulish', Arial, sans-serif" }}
            >
              Know more about SBTET
            </h1>

            {/* Exact Verbatim Paragraph matching Image 1 with exact line-breaks and relaxed line spacing */}
            <p
              className="text-[13.5px] sm:text-[14px] text-[#555b68] leading-[26px] sm:leading-[33px] font-normal"
              style={{ fontFamily: "'Mulish', Arial, sans-serif" }}
            >
              The Board was created under the authority of Government of Telangana as an adjunct office of the Department of Technical<br className="hidden md:inline" />
              Education. While the Technical Education Department concentrates more on the administration and developmental aspects, the<br className="hidden md:inline" />
              Board is expected.
            </p>
          </div>

          {/* Right Column: Exact SBTET Illustration Banner (banner-2.svg) */}
          <div className="shrink-0 w-full lg:w-auto flex justify-center lg:justify-end items-start pt-1">
            <img
              src={banner2Svg}
              alt="About Right to Information Banner"
              className="w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px] h-auto object-contain select-none mx-auto lg:mx-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
