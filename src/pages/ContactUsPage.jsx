import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import localSecImg from "../images/sbtet-sec.jpg";
import localLogoImg from "../images/sb-1.jpg";

const SECRETARY_IMG_URL = "https://sbtet.telangana.gov.in/downloads/Circular/secretary.jpg";
const SBTET_LOGO_URL = "https://www.sbtet.telangana.gov.in/downloads/Circular/sbtet%20logo.jpg";

export default function ContactUsPage() {
  const [openSectionId, setOpenSectionId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Contact Us | State Board of Technical Education and Training Telangana";
  }, []);

  const toggleSection = (id) => {
    setOpenSectionId((prev) => (prev === id ? null : id));
  };

  // Section Accordion Table Data matching exact SBTET Portal records
  const accordionData = [
    {
      id: "admin",
      title: "Administration",
      rows: [
        {
          sNo: "1",
          isSecretary: true,
          name: "Er. A. Pullaiah",
          designation: "Secretary",
          subject: "Head of the Office",
          section: "Administration",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "+918031404549",
        },
        {
          sNo: "2",
          isSecretary: false,
          name: "Shafiaz Akhtar",
          designation: "Additional Secretary(I/C)",
          subject: "Adminisration",
          section: "Administration",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "+918031404549",
        },
        {
          sNo: "3",
          isSecretary: false,
          name: "Shafiaz Akhtar",
          designation: "Controller of Examinations",
          subject: "Examinations",
          section: "Administration",
          email: "jssbtetts@gmail.com",
          mobile: "+918031404549",
        },
        {
          sNo: "4",
          isSecretary: false,
          name: "Dr.D.Venkateshwarlu",
          designation: "Joint Secretary (Acad)",
          subject: "Affiliation and Academics",
          section: "Administration",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "+918031404549",
        },
      ],
    },
    {
      id: "pre-exam",
      title: "Pre Examination",
      rows: [
        {
          sNo: "1",
          isSecretary: false,
          name: "A.Punyavathi",
          designation: "Deputy secretary",
          subject: "Pre examination",
          section: "Pre-Exam",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "8008908758",
        },
        {
          sNo: "2",
          isSecretary: false,
          name: "Gayasuddin Danish",
          designation: "Assistant Secretary",
          subject: "PreExamination Section",
          section: "Pre-Exam",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "8008908368",
        },
      ],
    },
    {
      id: "post-exam",
      title: "Post Examination",
      rows: [
        {
          sNo: "1",
          isSecretary: false,
          name: "A K Srikanth",
          designation: "DS Post Exams",
          subject: "Post Examination",
          section: "Post-Examination",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "8008908254",
        },
        {
          sNo: "2",
          isSecretary: false,
          name: "N Srinivas chakravarthi",
          designation: "Assistant secretary",
          subject: "Post Examination",
          section: "Post-Examination",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "8008908265",
        },
        {
          sNo: "3",
          isSecretary: false,
          name: "M. Manjulatha",
          designation: "Assistant Secretary (NT)",
          subject: "Post examination",
          section: "Post-Examination",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "+918031404549",
        },
      ],
    },
    {
      id: "computer",
      title: "Computer Section",
      rows: [
        {
          sNo: "1",
          isSecretary: false,
          name: "K Venkan Goud",
          designation: "Deputy Secretary(System Analyst)",
          subject: "Computer Section",
          section: "IT",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "8008908189",
        },
        {
          sNo: "2",
          isSecretary: false,
          name: "K Purushottam",
          designation: "Assistant Secretary",
          subject: "Computer Section",
          section: "IT",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "8008908506",
        },
      ],
    },
    {
      id: "others",
      title: "Others",
      rows: [
        {
          sNo: "1",
          isSecretary: false,
          name: "S. V. S. Ramakrishna",
          designation: "Accounts Officer",
          subject: "Accounts & Budget",
          section: "Accounts",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "+918031404549",
        },
        {
          sNo: "2",
          isSecretary: false,
          name: "Technical Exam Cell",
          designation: "Assistant Secretary",
          subject: "TW & SH Examinations",
          section: "TW & SH Wing",
          email: "sbtet-helpdesk@telangana.gov.in",
          mobile: "+918031404549",
        },
      ],
    },
  ];

  return (
    <div
      className="contact-us-page-wrapper w-full bg-white text-[#333333] min-h-screen"
      style={{ fontFamily: "'Mulish', 'Muli', sans-serif" }}
    >
      <style>{`
        .accordion-grid-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .accordion-grid-wrapper.is-open {
          grid-template-rows: 1fr;
        }
        .accordion-grid-inner {
          overflow: hidden;
        }
        .sbtet-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #4b5563;
        }
        .sbtet-table th, .sbtet-table td {
          border: 1px solid #4b5563;
        }
        .sbtet-table th {
          color: #0288d1;
          font-weight: 700;
          font-size: 13.5px;
          background-color: #ffffff;
        }
        .sbtet-accordion-btn {
          background-color: #1e88e5 !important;
          transform: none !important;
          transition: none !important;
        }
        .sbtet-accordion-btn:hover,
        .sbtet-accordion-btn:focus,
        .sbtet-accordion-btn:active {
          background-color: #1e88e5 !important;
          transform: none !important;
          box-shadow: none !important;
        }
        .sbtet-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .sbtet-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .sbtet-scroll::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 3px;
        }
      `}</style>

      {/* 1. Header Breadcrumb Banner (100% Full-Width Edge-to-Edge Bar) */}
      <div
        className="w-full bg-[#d8dadc] border-b border-[#cbd5e1] h-[34px] sm:h-[36px] flex items-center mb-6"
        style={{ boxSizing: "border-box" }}
      >
        <div className="max-w-[1350px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center gap-2 text-[13px] sm:text-[13.5px] font-semibold text-[#003366]">
          <Link to="/" className="text-[#003366] hover:underline cursor-pointer">
            Home
          </Link>
          <span className="text-gray-500 font-normal">/</span>
          <span className="text-[#1a365d] font-bold">Contact-Us</span>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="max-w-[1350px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-[738px_1fr] gap-8 lg:gap-10 xl:gap-12">
          {/* Left Column: Contact Us Section & Accordions (Expanded to line up directly with 'COURSES' start) */}
          <div className="lg:col-span-8 xl:col-span-1">
            {/* Section Header with Green Vertical Indicator */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-[5px] h-[22px] bg-[#43a047] rounded-xs shrink-0" />
              <h1 className="text-[10px] sm:text-[20px] text-[#212529] tracking-tight m-0 leading-none" style={{ fontFamily: "'Mulish','Muli', sans-serif", fontWeight: "500" }}>
                Contact Us
              </h1>
            </div>

            {/* Accordion List with Smooth Animated Transitions */}
            <div className="space-y-2.5">
              {accordionData.map((section) => {
                const isOpen = openSectionId === section.id;
                return (
                  <div
                    key={section.id}
                    className="border border-[#1e88e5]/20 rounded-[3px] overflow-hidden shadow-2xs"
                  >
                    {/* Accordion Header Button (Constant, Fixed, No Hover Color Change or Movement) */}
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="sbtet-accordion-btn w-full flex items-center justify-between px-4 sm:px-5 py-3 text-left bg-[#1e88e5] text-white cursor-pointer select-none"
                    >
                      <span className="text-[15px] sm:text-[15.5px] tracking-wide" style={{ fontFamily: "Mulish ", fontWeight: "450" }}>
                        {section.title}
                      </span>
                      <i
                        className={`fa-solid fa-chevron-down text-[13px] transition-transform duration-300 ease-in-out shrink-0 ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Accordion Animated Body with Grid Template Rows */}
                    <div className={`accordion-grid-wrapper ${isOpen ? "is-open" : ""}`}>
                      <div className="accordion-grid-inner">
                        <div className="bg-white p-3 sm:p-4">
                          <div className="sbtet-scroll overflow-x-auto w-full">
                            <table className="sbtet-table w-full text-left text-[13px]">
                              <thead>
                                <tr className="bg-white">
                                  <th className="py-2 px-2 text-center w-[48px] whitespace-nowrap">S.No</th>
                                  <th className="py-2 px-2 text-center w-[60px] whitespace-nowrap">Photo</th>
                                  <th className="py-2 px-3 whitespace-nowrap">Name</th>
                                  <th className="py-2 px-3 whitespace-nowrap">Designation</th>
                                  <th className="py-2 px-3 whitespace-nowrap">Subject</th>
                                  <th className="py-2 px-3 whitespace-nowrap">Section</th>
                                  <th className="py-2 px-3 whitespace-nowrap">Email</th>
                                  <th className="py-2 px-3 whitespace-nowrap">Mobile Number</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-[#4b5563]">
                                {section.rows.map((row, idx) => (
                                  <tr
                                    key={idx}
                                    className="hover:bg-blue-50/50 transition-colors duration-150"
                                  >
                                    <td className="py-2 px-2 text-center text-[#212529] font-normal align-middle">
                                      {row.sNo}
                                    </td>
                                    <td className="py-1.5 px-2 text-center align-middle">
                                      <div className="flex items-center justify-center">
                                        {row.isSecretary ? (
                                          <img
                                            src={SECRETARY_IMG_URL}
                                            onError={(e) => {
                                              e.currentTarget.onerror = null;
                                              e.currentTarget.src = localSecImg;
                                            }}
                                            alt={row.name}
                                            className="w-[38px] h-[38px] object-cover rounded-xs border border-gray-300"
                                            loading="lazy"
                                          />
                                        ) : (
                                          <img
                                            src={SBTET_LOGO_URL}
                                            onError={(e) => {
                                              e.currentTarget.onerror = null;
                                              e.currentTarget.src = localLogoImg;
                                            }}
                                            alt="SBTET Logo"
                                            className="w-[34px] h-[34px] object-contain rounded-full"
                                            loading="lazy"
                                          />
                                        )}
                                      </div>
                                    </td>
                                    <td className="py-2 px-3 text-[#212529] font-medium whitespace-nowrap align-middle">
                                      {row.name}
                                    </td>
                                    <td className="py-2 px-3 text-[#212529] font-normal whitespace-nowrap align-middle">
                                      {row.designation}
                                    </td>
                                    <td className="py-2 px-3 text-[#212529] font-normal whitespace-nowrap align-middle">
                                      {row.subject}
                                    </td>
                                    <td className="py-2 px-3 text-[#212529] font-normal whitespace-nowrap align-middle">
                                      {row.section}
                                    </td>
                                    <td className="py-2 px-3 whitespace-nowrap align-middle">
                                      <a
                                        href={`mailto:${row.email}`}
                                        className="text-[#212529]"
                                      >
                                        {row.email}
                                      </a>
                                    </td>
                                    <td className="py-2 px-3 whitespace-nowrap align-middle">
                                      <a
                                        href={`tel:${row.mobile.replace(/\s+/g, "")}`}
                                        className="text-[#212529]"
                                      >
                                        {row.mobile}
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Postal Address & Any queries (Span 4 on lg, 1fr on xl) */}
          <div className="lg:col-span-4 xl:col-span-1 flex flex-col justify-start">
            {/* 1. Postal Address Section */}
            <div className="mb-7 sm:mb-9">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-[5px] h-[22px] bg-[#43a047] rounded-xs shrink-0" />
                <h2 className="text-[22px] sm:text-[20px] text-[#212529] tracking-tight m-0 leading-none" style={{ fontFamily: "'Mulish','Muli', sans-serif", fontWeight: "500" }}>
                  Postal Address
                </h2>
              </div>
              <div className="text-[14px] sm:text-[14.5px] text-[#495057] leading-relaxed pl-1 space-y-1 font-normal">
                <p className="font-semibold text-[#212529] tracking-normal mb-1">
                  STATE BOARD OF TECHNICAL EDUCATION AND TRAINING
                </p>
                <p className="m-0">Sankethika Vidhaha Bhavan,</p>
                <p className="m-0">Masab Tank,</p>
                <p className="m-0">Hyderabad – 500 028.</p>
                <p className="m-0">India</p>
              </div>
            </div>

            {/* 2. Any queries - Connect with us Section */}
            <div>
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-[5px] h-[22px] bg-[#43a047] rounded-xs shrink-0" />
                <h2 className="text-[20px] sm:text-[20px] text-[#000000] tracking-tight m-0 leading-none" style={{ fontFamily: "'Mulish','Muli', sans-serif", fontWeight: "500", color: "black" }}>
                  Any queries - Connect with us.
                </h2>
              </div>
              <div className="text-[14px] sm:text-[14.5px] text-[#212529] leading-relaxed pl-1 space-y-2 font-normal">
                <p className="m-0 flex items-center gap-1.5 flex-wrap">
                  <span className="font-normal text-[#212529]">Tel:</span>
                  <a
                    href="tel:+918031404549"
                    className="text-[#212529]  font-normal inline-block"
                  >
                    +918031404549
                  </a>
                </p>
                <p className="m-0 flex items-center gap-1.5 flex-wrap">
                  <span className="font-normal text-[#212529]">Email:</span>
                  <a
                    href="mailto:helpdesk-sbtet@telangana.gov.in"
                    className="text-[#212529] font-normal inline-block"
                  >
                    helpdesk-sbtet@telangana.gov.in
                  </a>
                </p>
                <p className="m-0 text-gray-700">
                  <span className="font-normal text-gray-800">In all working days:</span>{" "}
                  10:30AM to 05:00PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Embedded Google Map Section (Full Width, Centered on Masab Tank) */}
        <div className="mt-12 sm:mt-14 w-full">
          <div className="border border-[#cbd5e1] rounded-md overflow-hidden shadow-xs relative bg-slate-100">
            {/* Google Map iframe */}
            <iframe
              title="SBTET Office Location - Sanketika Vidya Bhavan, Masab Tank"
              src="https://maps.google.com/maps?q=Sankethika+Vidya+Bhavan,+Masab+Tank,+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[360px] sm:h-[420px] md:h-[480px] border-0 block"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
