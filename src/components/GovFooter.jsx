import { ArrowUp } from "lucide-react";


export default function GovFooter() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Exact 7-digit visitor counter boxes from Screenshot 3
  const visitorCountDigits = ["1", "4", "6", "8", "9", "2", "8"];

  return (

    // <footer id="contact-us" className="mt-16 no-print">
    //   {/* 1. Upper Blue Footer matching Screenshot 3 */}
    //   <div className="bg-[#0f4c81] text-white py-6 px-4 border-t-2 border-gov-blue">
    //     <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs sm:text-sm">
    //       {/* Left: Official Address */}
    //       <div>
    //         <p className="font-bold text-sm text-white mb-1">Address:</p>
    //         <p className="text-white/80 leading-relaxed font-sans">
    //           Sankethika Vidhya Bhavan, Masab Tank, Hyderabad &ndash; 500 028, India.
    //         </p>
    //       </div>

    //       {/* Right: Contacts Us */}
    //       <div className="md:text-right">
    //         <p className="font-bold text-sm text-white mb-1">Contacts Us</p>
    //         <p className="text-white/80 leading-relaxed font-sans">
    //           Email : <span className="font-bold text-white">sbtet-helpdesk@telangana.gov.in</span>, Phone :{" "}
    //           <span className="font-bold text-white">08031404549</span>
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* 2. Lower Dark Blue Footer matching Screenshot 3 */}
    //   <div className="bg-[#082a47] text-white py-3 px-4 border-t border-white/10">
    //     <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
    //       {/* Left: Copyright */}
    //       <div className="text-center md:text-left text-white/70 text-[11px] leading-relaxed">
    //         &copy; {new Date().getFullYear()} This is the student services portal of State Board of Technical Education & Training, Telangana. All rights reserved.
    //       </div>

    //       {/* Right: Visitor Counter + Scroll to Top Button */}
    //       <div className="flex items-center gap-3 shrink-0">
    //         <div className="flex items-center gap-1">
    //           <span className="text-[11px] text-white/80 mr-1">Total Site Views:</span>
    //           <div className="flex items-center gap-0.5">
    //             {visitorCountDigits.map((d, i) => (
    //               <span
    //                 key={i}
    //                 className="bg-white text-gov-navy font-mono font-bold text-xs px-1.5 py-0.5 rounded-xs shadow-xs"
    //               >
    //                 {d}
    //               </span>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Scroll to top button */}
    //         <button
    //           onClick={scrollToTop}
    //           className="w-7 h-7 rounded-full bg-white text-gov-navy hover:bg-slate-200 flex items-center justify-center shadow-sm font-bold text-xs transition-transform hover:-translate-y-0.5"
    //           title="Scroll to top"
    //           aria-label="Scroll to top"
    //         >
    //           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </footer>



      //   <footer className="w-full mt-14 relative" style={{ fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      //   {/* Main Blue Upper Footer */}
      //   <div className="bg-[#0062a4] text-white py-8 sm:py-10 px-4 sm:px-8 lg:px-12">
      //     <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
      //       {/* Left Column: Address */}
      //       <div>
      //         <h3 className="text-[17px] sm:text-[18px] font-normal text-white mb-3 tracking-normal">
      //           Address:
      //         </h3>
      //         <p className="text-[13.5px] sm:text-[14px] text-white leading-relaxed m-0 font-normal">
      //           Sankethika Vidhya Bhavan, Masab Tank, Hyderabad – 500 028, India.
      //         </p>
      //       </div>

      //       {/* Right Column: Contacts Us */}
      //       <div>
      //         <h3 className="text-[17px] sm:text-[18px] font-normal text-white mb-3 tracking-normal">
      //           Contacts Us
      //         </h3>
      //         <p className="text-[13.5px] sm:text-[14px] text-white leading-relaxed m-0">
      //           <span className="font-bold text-white">Email : </span>
      //           <a
      //             href="mailto:sbtet-helpdesk@telangana.gov.in"
      //             className="font-bold text-white hover:underline decoration-white/80"
      //           >
      //             sbtet-helpdesk@telangana.gov.in
      //           </a>
      //           <span className="font-bold text-white">, Phone : </span>
      //           <a
      //             href="tel:08031404549"
      //             className="font-bold text-white hover:underline decoration-white/80"
      //           >
      //             08031404549
      //           </a>
      //         </p>
      //       </div>
      //     </div>
      //   </div>

      //   {/* Bottom Dark Blue Copyright & Visitor Counter Strip */}
      //   <div className="bg-[#004f86] text-white py-3 px-4 sm:px-8 lg:px-12 relative">
      //     <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[12.5px] sm:text-[13px]">
      //       {/* Copyright text */}
      //       <p className="m-0 text-center md:text-left text-white font-normal">
      //         © 2020 This is the official website of State Board of Technical Education & Training, Telangana. All rights reserved
      //       </p>

      //       {/* Total Site Views Counter */}
      //       <div className="flex items-center gap-2 select-none">
      //         <span className="text-white font-normal whitespace-nowrap">
      //           Total Site Views:
      //         </span>
      //         <div
      //           className="bg-white text-black font-semibold text-[13px] tracking-[0.25em] px-2 py-0.5 leading-tight rounded-none shadow-xs text-center"
      //           style={{ fontFamily: "monospace, 'Segoe UI', sans-serif" }}
      //         >
      //           1 4 6 8 9 2 9
      //         </div>
      //       </div>
      //     </div>

      //     {/* Floating Scroll to Top Circle Button (Matching Image) */}
      //     <button
      //       type="button"
      //       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      //       className="absolute -top-4.5 right-6 sm:right-10 w-9 h-9 rounded-full bg-white text-black shadow-md flex items-center justify-center hover:bg-gray-100 transition-transform active:scale-95 cursor-pointer z-20 border border-gray-200"
      //       aria-label="Scroll to Top"
      //       title="Scroll to Top"
      //     >
      //       <ArrowUp className="w-4.5 h-4.5 text-black stroke-[2.8]" />
      //     </button>
      //   </div>
      // </footer>
//       <footer className="w-full mt-14 relative" style={{ fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
//   {/* Main Blue Upper Footer */}
//   <div className="bg-[#0566A8] text-[#cfebd9] py-8 sm:py-10 px-4 sm:px-8 lg:px-12">
//     <div className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
//       {/* Left Column: Address */}
//       <div>
//         <h3 className="text-[17px] sm:text-[18px] font-normal text-[#cfebd9] mb-2.5 tracking-wide">
//           Address:
//         </h3>
//         <p className="text-[13.5px] sm:text-[14px] text-[#cfebd9] leading-relaxed m-0 font-normal opacity-95">
//           Sankethika Vidhya Bhavan, Masab Tank, Hyderabad – 500 028, India.
//         </p>
//       </div>

//       {/* Right Column: Contacts Us */}
//       <div>
//         <h3 className="text-[17px] sm:text-[18px] font-normal text-[#cfebd9] mb-2.5 tracking-wide">
//           Contacts Us
//         </h3>
//         <p className="text-[13.5px] sm:text-[14px] text-[#cfebd9] leading-relaxed m-0 opacity-95">
//           <span className="font-bold text-[#e1f3e7]">Email : </span>
//           <a
//             href="mailto:sbtet-helpdesk@telangana.gov.in"
//             className="font-bold text-[#e1f3e7] hover:underline force-bold" style={{color: "rgb(255, 255, 255)"}}
//           >
//             sbtet-helpdesk@telangana.gov.in
//           </a>
//           <br></br>
//           <span className="font-bold text-[#e1f3e7]">Phone : </span>
//           <a
//             href="tel:08031404549"
//             className="font-bold text-[#e1f3e7] hover:underline" style={{color: " rgb(255, 255, 255)"}}
//           >
//             08031404549
//           </a>
//         </p>
//       </div>
//     </div>
//   </div>

//   {/* Bottom Darker Blue Copyright & Visitor Counter Strip */}
//   <div className="bg-[#084b7f] text-[#cfebd9] py-2.5 px-4 sm:px-8 lg:px-12 relative">
//     <div className="max-w-[1350px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[12.5px] sm:text-[13px]">
//       {/* Copyright text */}
//       <p className="m-0 text-center md:text-left text-[#cfebd9] font-normal opacity-90">
//         © 2020 This is the official website of State Board of Technical Education & Training, Telangana. All rights reserved
//       </p>

//       {/* Total Site Views Counter */}
//       <div className="flex items-center gap-2 select-none">
//         <span className="text-[#cfebd9] font-normal whitespace-nowrap opacity-90">
//           Total Site Views:
//         </span>
        
//         {/* Individual digit boxes matching the image */}
//         <div className="flex items-center bg-white px-1.5 py-[1px] shadow-sm">
//           {["1", "4", "6", "8", "9", "2", "9"].map((digit, index) => (
//             <span
//               key={index}
//               className="text-[#000000] font-sans font-bold text-[12.5px] w-[13px] text-center inline-block"
//             >
//               {digit}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>

//     {/* Floating Scroll to Top Circle Button */}
//     <button
//       type="button"
//       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//       className="absolute -top-4 right-6 sm:right-10 w-8 h-8 rounded-full bg-white text-black shadow-md flex items-center justify-center hover:bg-gray-100 transition-transform active:scale-95 cursor-pointer z-20 border border-gray-200"
//       aria-label="Scroll to Top"
//       title="Scroll to Top"
//     >
//       <ArrowUp className="w-4 h-4 text-black stroke-[3]" />
//     </button>
//   </div>
// </footer>
<footer className="section footer-classic context-dark bg-image w-full mt-14 relative" style={{ fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
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
        <h5 className="text-[18px] font-normal text-white mb-2 tracking-wide">Contacts Us</h5>
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
            <br></br>
            </span> Phone : <span>
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

  {/* Bottom Bar using exact #2075ae color & .site-visit CSS rules */}
  <div className="w-full relative" style={{ backgroundColor: "#2075ae" }}>
    <div className="max-w-[1350px] mx-auto py-3 px-4 sm:px-8 lg:px-12">
      <div className="site-info flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-white">
        
        {/* Copyright Text */}
        <span className="text-center md:text-left text-white font-normal">
          © 2026 This is the Not the official website of State Board of Technical Education &amp; Training, Telangana. All rights reserved
        </span>

        {/* Site Views Counter (exact .site-visit inline styling applied) */}
        <div className="flex items-center select-none whitespace-nowrap">
          <span>Total Site Views: </span>
          <span
            className="site-visit ng-binding font-bold"
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgb(0, 0, 0)",
              letterSpacing: "10px",
              marginLeft: "5px",
              padding: "2px 0px 2px 8px"
            }}
          >
            1468929
          </span>
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
</footer>



  );
}










