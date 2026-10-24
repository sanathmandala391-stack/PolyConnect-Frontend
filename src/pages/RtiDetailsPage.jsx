import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Custom chevron component matching exact SBTET chevron arrow with smooth 180deg flip
function RtiChevron({ isOpen }) {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transform transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"
        }`}
      style={{ transformOrigin: "50% 50%" }}
    >
      <path
        d="M2.5 3L8 8.5L13.5 3"
        stroke="#ffffff"
        strokeWidth="2.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default function RtiDetailsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Full details of Right to Information Act | State Board of Technical Education and Training Telangana";
  }, []);

  // Accordion state: only one open at a time; opening another closes previously open section
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (sectionKey) => {
    setActiveSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  return (
    <div className="w-full min-h-[calc(100vh-250px)] bg-white sbtet-rti-page">
      <style>{`
        .sbtet-rti-page {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @media (max-width: 1200px) {
          .sbtet-rti-page .responsive-rti-content {
            margin-left: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .sbtet-rti-page .responsive-rti-breadcrumb {
            margin-left: 0 !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }

        .rti-accordion-header {
          background-color: #2886cd;
          color: #ffffff;
          cursor: pointer;
          user-select: none;
          font-family: Arial, Helvetica, sans-serif;
          outline: none !important;
          box-shadow: none !important;
          transform: none !important;
          min-height: 50px;
          height: auto;
          transition: background-color 0.15s ease-in-out;
        }

        .rti-accordion-header:hover {
          
        }

        .rti-accordion-header:focus,
        .rti-accordion-header:active {
          outline: none !important;
          box-shadow: none !important;
          transform: none !important;
        }

        /* Constant, steady accordion display - zero jumping, zero bounce, solid open/close across all buttons */
        .rti-accordion-wrapper {
          display: none;
          width: 100%;
        }

        .rti-accordion-wrapper.open {
          display: block;
        }

        .rti-accordion-content {
          width: 100%;
          overflow: visible;
        }

        .rti-body {
          background-color: #ffffff;
          padding: 8px 10px 12px 10px;
          font-family: 'Mulish', Arial, Helvetica, sans-serif;
          font-size: 12.5px;
          color: #333333;
          line-height: 1.45;
          box-sizing: border-box;
        }

        .rti-line {
          margin-bottom: 2.5px;
          color: #333333;
          font-size: 12.5px;
          line-height: 1.45;
          font-family: 'Mulish', Arial, Helvetica, sans-serif;
        }

        .rti-sub-line {
          margin-left: 20px;
          margin-bottom: 2px;
          color: #333333;
          font-size: 12.5px;
          line-height: 1.45;
          font-family: 'Mulish', Arial, Helvetica, sans-serif;
        }

        .rti-sub-sub-line {
          margin-left: 40px;
          margin-bottom: 2px;
          color: #333333;
          font-size: 12.5px;
          line-height: 1.45;
          font-family: 'Mulish', Arial, Helvetica, sans-serif;
        }

        .rti-placeholder {
          color: #777777;
          font-style: italic;
          font-size: 11.5px;
          line-height: 1.45;
          padding: 4px 0;
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>

      {/* 1. Header Breadcrumb Bar (Full-Width Edge-to-Edge Bar) */}
      <div
        className="w-full bg-[#e9ecef] border-b border-[#dee2e6] min-h-[36px] sm:h-[38px] flex items-center py-1 sm:py-0"
        style={{ boxSizing: "border-box" }}
      >
        <div className="responsive-rti-breadcrumb max-w-7xl w-full mx-auto px-2 sm:px-4 flex items-center text-[12px] sm:text-[13.5px] overflow-x-auto whitespace-nowrap" style={{ marginLeft: "135px" }}>
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
            style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: "500" }}
          >
            /
          </span>
          <span
            className="text-[#6c757d] font-semibold"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
          >
            Full details of Right to Information Act
          </span>
        </div>
      </div>

      {/* 2. Main Page Inner Container (Aligned with GovHeader max-w-7xl px-2 sm:px-4) */}
      <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 pt-5 pb-20">
        <div className="responsive-rti-content w-full flex flex-col gap-[5px]" style={{ marginLeft: "30px", width: "1160px", maxWidth: "100%" }}>
          {/* ITEM 1: PRELIMINARY */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("preliminary")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                PRELIMINARY
              </span>
              <RtiChevron isOpen={activeSection === "preliminary"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "preliminary" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">1. This Act may be called the Right to Information Act, 2005.</div>
                  <div className="rti-line">2. It extends to the whole of India except the State of Jammu and Kashmir.</div>
                  <div className="rti-line">
                    3. The provisions of sub-section (1) of section 4, sub-sections (1) and (2) of section 5, sections 12, 13, 15,16, 24 , 27 and 28 shall come into force at once, and the remaining provisions of this Act shall come into force on the one hundred and twentieth day of its enactment.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 2: DEFINITIONS */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("definitions")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                DEFINITIONS
              </span>
              <RtiChevron isOpen={activeSection === "definitions"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "definitions" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line mb-1">In this Act, unless the context otherwise requires:</div>
                  <div className="rti-line">
                    1. &ldquo;Appropriate Government&rdquo; means in relation to a public authority which is established, constituted, owned, controlled or substantially financed by funds provided directly or indirectly
                  </div>
                  <div className="rti-sub-line">1. By the Central Government or the Union territory administration, the Central Government.</div>
                  <div className="rti-sub-line">2. By the State Government, the State Government.</div>

                  <div className="rti-line">
                    2. &ldquo;Central Information Commission&rdquo; means the Central Information Commission constituted under sub-section (1) of section 12.
                  </div>

                  <div className="rti-line">
                    3. &ldquo;Central Public Information Officer&rdquo; means the Central Public Information Officer designated under sub-section (1) and includes a Central Assistant Public Information Officer designated as such under sub-section (2) of section 5.
                  </div>

                  <div className="rti-line">
                    4. &ldquo;Chief Information Commissioner&rdquo; and &ldquo;Information Commissioner&rdquo; mean the Chief Information Commissioner and Information Commissioner appointed under sub-section (3) of section 12.
                  </div>

                  <div className="rti-line">5. &ldquo;Competent authority&rdquo; means:</div>
                  <div className="rti-sub-line">
                    1. The Speaker in the case of the House of the People or the Legislative Assembly of a State or a Union territory having such Assembly and the Chairman in the case of the Council of States or Legislative Council of a State.
                  </div>
                  <div className="rti-sub-line">2. The Chief Justice of India in the case of the Supreme Court.</div>
                  <div className="rti-sub-line">3. The Chief Justice of the High Court in the case of a High Court.</div>
                  <div className="rti-sub-line">
                    4. The President or the Governor, as the case may be, in the case of other authorities established or constituted by or under the Constitution.
                  </div>
                  <div className="rti-sub-line">5. The administrator appointed under article 239 of the Constitution.</div>

                  <div className="rti-line">
                    6. &ldquo;Information&rdquo; means any material in any form, including records, documents, memos, e-mails, opinions, advices, press releases, circulars, orders, logbooks, contracts, reports, papers, samples, models, data material held in any electronic form and information relating to any private body which can be accessed by a public authority under any other law for the time being in force.
                  </div>

                  <div className="rti-line">
                    7. &ldquo;Prescribed&rdquo; means prescribed by rules made under this Act by the appropriate Government or the competent authority, as the case may be;
                  </div>

                  <div className="rti-line">
                    8. &ldquo;Public authority&rdquo; means any authority or body or institution of self- government established or constituted :
                  </div>
                  <div className="rti-sub-line">1. By or under the Constitution.</div>
                  <div className="rti-sub-line">2. By any other law made by Parliament.</div>
                  <div className="rti-sub-line">3. By any other law made by State Legislature.</div>
                  <div className="rti-sub-line">4. By notification issued or order made by the appropriate Government, and includes any:</div>
                  <div className="rti-sub-sub-line">1. Body owned, controlled or substantially financed.</div>
                  <div className="rti-sub-sub-line">
                    2. Non-Government organization substantially financed, directly or indirectly by funds provided by the appropriate Government.
                  </div>

                  <div className="rti-line">9. &ldquo;Record&rdquo; includes :</div>
                  <div className="rti-sub-line">1. Any document, manuscript and file.</div>
                  <div className="rti-sub-line">2. Any microfilm, microfiche and facsimile copy of a document.</div>
                  <div className="rti-sub-line">3. Any reproduction of image or images embodied in such microfilm (whether enlarged or not).</div>
                  <div className="rti-sub-line">4. Any other material produced by a computer or any other device.</div>

                  <div className="rti-line">
                    10. &ldquo;Right to information&rdquo; means the right to information accessible under this Act which is held by or under the control of any public authority and includes the right to:
                  </div>
                  <div className="rti-sub-line">1. Inspection of work, documents, records.</div>
                  <div className="rti-sub-line">2. Taking notes, extracts or certified copies of documents or records.</div>
                  <div className="rti-sub-line">3. Taking certified samples of material.</div>
                  <div className="rti-sub-line">
                    4. Obtaining information in the form of diskettes, floppies, tapes, video cassettes or in any other electronic mode or through printouts where such information is stored in a computer or in any other device.
                  </div>

                  <div className="rti-line">
                    11. &ldquo;State Information Commission&rdquo; means the State Information Commission constituted under sub-section (1) of section 15.
                  </div>
                  <div className="rti-line">
                    12. &ldquo;State Chief Information Commissioner&rdquo; and &ldquo;State Information Commissioner&rdquo; mean the State Chief Information Commissioner and the State Information Commissioner appointed under sub-section (3) of section 15.
                  </div>
                  <div className="rti-line">
                    13. &ldquo;State Public Information Officer&rdquo; means the State Public Information Officer designated under sub-section (1) and includes a State Assistant Public Information Officer designated as such under sub-section (2) of section 5.
                  </div>
                  <div className="rti-line">
                    14. &ldquo;Third party&rdquo; means a person other than the citizen making a request for information and includes a public authority.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 3: RIGHT TO INFORMATION AND OBLIGATIONS OF PUBLIC AUTHORITIES */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("rightToInfo")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                RIGHT TO INFORMATION AND OBLIGATIONS OF PUBLIC AUTHORITIES
              </span>
              <RtiChevron isOpen={activeSection === "rightToInfo"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "rightToInfo" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    Subject to the provisions of this Act, all citizens shall have the right to information.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 4: OBLIGATIONS */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("obligations")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                OBLIGATIONS
              </span>
              <RtiChevron isOpen={activeSection === "obligations"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "obligations" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">1. Every public authority shall:</div>
                  <div className="rti-sub-line">
                    1. Maintain all its records duly catalogued and indexed in a manner and the form which facilitates the right to information under this Act and ensure that all records that are appropriate to be computerized are, within a reasonable time and subject to availability of resources, computerized and connected through a network all over the country on different systems so that access to such records is facilitated.
                  </div>
                  <div className="rti-sub-line">2. Publish within one hundred and twenty days from the enactment of this Act:</div>
                  <div className="rti-sub-sub-line">1. The particulars of its organization, functions and duties.</div>
                  <div className="rti-sub-sub-line">2. The powers and duties of its officers and employees.</div>
                  <div className="rti-sub-sub-line">3. The procedure followed in the decision making process, including channels of supervision and accountability.</div>
                  <div className="rti-sub-sub-line">4. The norms set by it for the discharge of its functions.</div>
                  <div className="rti-sub-sub-line">5. The rules, regulations, instructions, manuals and records, held by it or under its control or used by its employees for discharging its functions.</div>
                  <div className="rti-sub-sub-line">6. A statement of the categories of documents that are held by it or under its control.</div>
                  <div className="rti-sub-sub-line">7. The particulars of any arrangement that exists for consultation with, or representation by, the members of the public in relation to the formulation of its policy or implementation thereof.</div>
                  <div className="rti-sub-sub-line">8. A statement of the boards, councils, committees and other bodies consisting of two or more persons constituted as its part or for the purpose of its advice, and as to whether meetings of those boards, councils, committees and other bodies are open to the public, or the minutes of such meetings are accessible for public.</div>
                  <div className="rti-sub-sub-line">9. A directory of its officers and employees.</div>
                  <div className="rti-sub-sub-line">10. The monthly remuneration received by each of its officers and employees, including the system of compensation as provided in its regulations.</div>
                  <div className="rti-sub-sub-line">11. The budget allocated to each of its agency, indicating the particulars of all plans, proposed expenditures and reports on disbursements made.</div>
                  <div className="rti-sub-sub-line">12. The manner of execution of subsidy programs, including the amounts allocated and the details of beneficiaries of such programs.</div>
                  <div className="rti-sub-sub-line">13. Particulars of recipients of concessions, permits or authorizations granted by it.</div>
                  <div className="rti-sub-sub-line">14. Details in respect of the information, available to or held by it, reduced in an electronic form.</div>
                  <div className="rti-sub-sub-line">15. The particulars of facilities available to citizens for obtaining information, including the working hours of a library or reading room, if maintained for public use.</div>
                  <div className="rti-sub-sub-line">16. The names, designations and other particulars of the Public Information Officers.</div>
                  <div className="rti-sub-sub-line">17. Such other information as may be prescribed and thereafter update these publications every year.</div>
                  <div className="rti-sub-line">3. Publish all relevant facts while formulating important policies or announcing the decisions which affect public.</div>
                  <div className="rti-sub-line">4. Provide reasons for its administrative or quasi-judicial decisions to affected persons.</div>
                  <div className="rti-line">
                    2. It shall be a constant Endeavour of every public authority to take steps in accordance with the requirements of clause (b) of sub-section (1) to provide as much information suo motu to the public at regular intervals through various means of communications, including internet, so that the public have minimum resort to the use of this Act to obtain information.
                  </div>
                  <div className="rti-line">
                    3. For the purposes of sub-section (1), every information shall be disseminated widely and in such form and manner which is easily accessible to the public.
                  </div>
                  <div className="rti-line">
                    4. All materials shall be disseminated taking into consideration the cost effectiveness, local language and the most effective method of communication in that local area and the information should be easily accessible, to the extent possible in electronic format with the Central Public Information Officer or State Public Information Officer, as the case may be, available free or at such cost of the medium or the print cost price as may be prescribed. Explanation.&ndash;For the purposes of sub-sections (3) and (4), &ldquo;disseminated&rdquo; means making known or communicated the information to the public through notice boards, newspapers, public announcements, media broadcasts, the internet or any other means, including inspection of offices of any public authority.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 5: DESIGNATION OF PIOS */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("designationOfPios")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                DESIGNATION OF PIOS
              </span>
              <RtiChevron isOpen={activeSection === "designationOfPios"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "designationOfPios" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. Every public authority shall, within one hundred days of the enactment of this Act, designate as many officers as the Central Public Information Officers or State Public Information Officers, as the case may be, in all administrative units or offices under it as may be necessary to provide information to persons requesting for the information under this Act.
                  </div>
                  <div className="rti-line">
                    2. Without prejudice to the provisions of sub-section (1), every public authority shall designate an officer, within one hundred days of the enactment of this Act, at each sub-divisional level or other sub-district level as a Central Assistant Public Information Officer or a State Assistant Public Information Officer, as the case may be, to receive the applications for information or appeals under this Act for forwarding the same forthwith to the Central Public Information Officer or the State Public Information Officer or senior officer specified under sub-section (1) of section 19 or the Central Information Commission or the State Information Commission, as the case may be: Provided that where an application for information or appeal is given to a Central Assistant Public Information Officer or a State Assistant Public Information Officer, as the case may be, a period of five days shall be added in computing the period for response specified under sub-section (1) of section 7.
                  </div>
                  <div className="rti-line">
                    3. Every Central Public Information Officer or State Public Information Officer, as the case may be, shall deal with requests from persons seeking information and render reasonable assistance to the persons seeking such information.
                  </div>
                  <div className="rti-line">
                    4. The Central Public Information Officer or State Public Information Officer, as the case may be, may seek the assistance of any other officer as he or she considers it necessary for the proper discharge of his or her duties.
                  </div>
                  <div className="rti-line">
                    5. Any officer, whose assistance has been sought under sub-section (4), shall render all assistance to the Central Public Information Officer or State Public Information Officer, as the case may be, seeking his or her assistance and for the purposes of any contravention of the provisions of this Act, such other officer shall be treated as a Central Public Information Officer or State Public Information Officer, as the case may be.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 6: REQUEST FOR OBTAINING INFORMATION */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("requestForInfo")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                REQUEST FOR OBTAINING INFORMATION
              </span>
              <RtiChevron isOpen={activeSection === "requestForInfo"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "requestForInfo" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. A person, who desires to obtain any information under this Act, shall make a request in writing or through electronic means in English or Hindi or in the official language of the area in which the application is being made, accompanying such fee as may be prescribed, to&ndash;
                  </div>
                  <div className="rti-line">
                    2. The Central Public Information Officer or State Public Information Officer, as the case may be, of the concerned public authority;
                  </div>
                  <div className="rti-line">
                    3. The Central Assistant Public Information Officer or State Assistant Public Information Officer, as the case may be, specifying the particulars of the information sought by him or her: Provided that where such request cannot be made in writing, the Central Public Information Officer or State Public Information Officer, as the case may be, shall render all reasonable assistance to the person making the request orally to reduce the same in writing.
                  </div>
                  <div className="rti-line">
                    4. An applicant making request for information shall not be required to give any reason for requesting the information or any other personal details except those that may be necessary for contacting him.
                  </div>
                  <div className="rti-line">
                    5. Where an application is made to a public authority requesting for an information,&ndash;
                  </div>
                  <div className="rti-sub-line">1. Which is held by another public authority; or</div>
                  <div className="rti-sub-line">
                    2. The subject matter of which is more closely connected with the functions of another public authority, The public authority, to which such application is made, shall transfer the application or such part of it as may be appropriate to that other public authority and inform the applicant immediately about such transfer: Provided that the transfer of an application pursuant to this sub-section shall be made as soon as practicable but in no case later than five days from the date of receipt of the application.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 7: DISPOSAL OF REQUEST */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("disposalOfRequest")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                DISPOSAL OF REQUEST
              </span>
              <RtiChevron isOpen={activeSection === "disposalOfRequest"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "disposalOfRequest" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. Subject to the proviso to sub-section (2) of section 5 or the proviso to sub-section (3) of section 6, the Central Public Information Officer or State Public Information Officer, as the case may be, on receipt of a request under section 6 shall, as expeditiously as possible, and in any case within thirty days of the receipt of the request, either provide the information on payment of such fee as may be prescribed or reject the request for any of the reasons specified in sections 8 and 9: Provided that where the information sought for concerns the life or liberty of a person, the same shall be provided within forty-eight hours of the receipt of the request.
                  </div>
                  <div className="rti-line">
                    2. If the Central Public Information Officer or State Public Information Officer, as the case may be, fails to give decision on the request for information within the period specified under sub-section (1), the Central Public Information Officer or State Public Information Officer, as the case may be, shall be deemed to have refused the request.
                  </div>
                  <div className="rti-line">
                    3. Where a decision is taken to provide the information on payment of any further fee representing the cost of providing the information, the Central Public Information Officer or State Public Information Officer, as the case may be, shall send an intimation to the person making the request, giving&ndash;
                  </div>
                  <div className="rti-sub-line">
                    1. The details of further fees representing the cost of providing the information as determined by him, together with the calculations made to arrive at the amount in accordance with fee prescribed under sub-section (1), requesting him to deposit that fees, and the period intervening between the dispatch of the said intimation and payment of fees shall be excluded for the purpose of calculating the period of thirty days referred to in that sub-section;
                  </div>
                  <div className="rti-sub-line">
                    2. Information concerning his or her right with respect to review the decision as to the amount of fees charged or the form of access provided, including the particulars of the appellate authority, time limit, process and any other forms.
                  </div>
                  <div className="rti-line">
                    4. Where access to the record or a part thereof is required to be provided under this Act and the person to whom access is to be provided is sensorial disabled, the Central Public Information Officer or State Public Information Officer, as the case may be, shall provide assistance to enable access to the information, including providing such assistance as may be appropriate for the inspection.
                  </div>
                  <div className="rti-line">
                    5. Where access to information is to be provided in the printed or in any electronic format, the applicant shall, subject to the provisions of sub-section (6), pay such fee as may be prescribed: Provided that the fee prescribed under sub-section (1) of section 6 and sub-sections (1) and (5) of section 7 shall be reasonable and no such fee shall be charged from the persons who are of below poverty line as may be determined by the appropriate Government.
                  </div>
                  <div className="rti-line">
                    6. Not withstanding anything contained in sub-section (5), the person making request for the information shall be provided the information free of charge where a public authority fails to comply with the time limits specified in sub-section (1).
                  </div>
                  <div className="rti-line">
                    7. Before taking any decision under sub-section (1), the Central Public Information Officer or State Public Information Officer, as the case may be, shall take into consideration the representation made by a third party under section 11.
                  </div>
                  <div className="rti-line">
                    8. Where a request has been rejected under sub-section (1), the Central Public Information Officer or State Public Information Officer, as the case may be, shall communicate to the person making the request,&ndash;
                  </div>
                  <div className="rti-sub-line">1. The reasons for such rejection;</div>
                  <div className="rti-sub-line">2. The period within which an appeal against such rejection may be preferred; and</div>
                  <div className="rti-sub-line">3. The particulars of the appellate authority.</div>
                  <div className="rti-line">
                    9. An information shall ordinarily be provided in the form in which it is sought unless it would disproportionately divert the resources of the public authority or would be detrimental to the safety or preservation of the record in question.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 8: EXEMPTION */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("exemption")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                EXEMPTION
              </span>
              <RtiChevron isOpen={activeSection === "exemption"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "exemption" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. Not withstanding anything contained in this Act, there shall be no obligation to give any citizen,&ndash;
                  </div>
                  <div className="rti-sub-line">
                    1. Information, disclosure of which would prejudicially affect the sovereignty and integrity of India, the security, strategic, scientific or economic interests of the State, relation with foreign State or lead to incitement of an offense;
                  </div>
                  <div className="rti-sub-line">
                    2. Information which has been expressly forbidden to be published by any court of law or tribunal or the disclosure of which may constitute contempt of court;
                  </div>
                  <div className="rti-sub-line">
                    3. Information, the disclosure of which would cause a breach of privilege of Parliament or the State Legislature;
                  </div>
                  <div className="rti-sub-line">
                    4. Information including commercial confidence, trade secrets or intellectual property, the disclosure of which would harm the competitive position of a third party, unless the competent authority is satisfied that larger public interest warrants the disclosure of such information;
                  </div>
                  <div className="rti-sub-line">
                    5. Information available to a person in his fiduciary relationship, unless the competent authority is satisfied that the larger public interest warrants the disclosure of such information;
                  </div>
                  <div className="rti-sub-line">6. Information received in confidence from foreign Government;</div>
                  <div className="rti-sub-line">
                    7. Information, the disclosure of which would endanger the life or physical safety of any person or identify the source of information or assistance given in confidence for law enforcement or security purposes;
                  </div>
                  <div className="rti-sub-line">
                    8. Information which would impede the process of investigation or apprehension or prosecution of offenders;
                  </div>
                  <div className="rti-sub-line">
                    9. Cabinet papers including records of deliberations of the Council of Ministers, Secretaries and other officers: Provided that the decisions of Council of Ministers, the reasons thereof, and the material on the basis of which the decisions were taken shall be made public after the decision has been taken, and the matter is complete, or over: Provided further that those matters which come under the exemptions specified in this section shall not be disclosed;
                  </div>
                  <div className="rti-sub-line">
                    10. Information which relates to personal information the disclosure of which has no relationship to any public activity or interest, or which would cause unwarranted invasion of the privacy of the individual unless the Central Public Information Officer or the State Public Information Officer or the appellate authority, as the case may be, is satisfied that the larger public interest justifies the disclosure of such information: Provided that the information which cannot be denied to the Parliament or a State Legislature shall not be denied to any person.
                  </div>
                  <div className="rti-line">
                    2. Not withstanding anything in the Official Secrets Act, 1923 nor any of the exemptions permissible in accordance with sub-section (1), a public authority may allow access to information, if public interest in disclosure outweighs the harm to the protected interests.
                  </div>
                  <div className="rti-line">
                    3. Subject to the provisions of clauses (a), (c) and (i) of sub-section (1), any information relating to any occurrence, event or matter which has taken place, occurred or happened twenty years before the date on which any request is made under section 6 shall be provided to any person making a request under that section: Provided that where any question arises as to the date from which the said period of twenty years has to be computed, the decision of the Central Government shall be final, subject to the usual appeals provided for in this Act.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 9: GROUNDS FOR REJECTION */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("groundsForRejection")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                GROUNDS FOR REJECTION
              </span>
              <RtiChevron isOpen={activeSection === "groundsForRejection"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "groundsForRejection" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. Without prejudice to the provisions of section 8, a Central Public Information Officer or a State Public Information Officer, as the case may be, may reject a request for information where such a request for providing access would involve an infringement of copyright subsisting in a person other than the State.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 10: SEVERITY */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("severability")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                SEVERITY
              </span>
              <RtiChevron isOpen={activeSection === "severability"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "severability" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. Where a request for access to information is rejected on the ground that it is in relation to information which is exempt from disclosure, then, notwithstanding anything contained in this Act, access may be provided to that part of the record which does not contain any information which is exempt from disclosure under this Act and which can reasonably be severed from any part that contains exempt information.
                  </div>
                  <div className="rti-line">
                    2. Where access is granted to a part of the record under sub-section (1), the Central Public Information Officer or State Public Information Officer, as the case may be, shall give a notice to the applicant, informing&ndash;
                  </div>
                  <div className="rti-sub-line">
                    1. That only part of the record requested, after severance of the record containing information which is exempt from disclosure, is being provided;
                  </div>
                  <div className="rti-sub-line">
                    2. The reasons for the decision, including any findings on any material question of fact, referring to the material on which those findings were based;
                  </div>
                  <div className="rti-sub-line">
                    3. The name and designation of the person giving the decision;
                  </div>
                  <div className="rti-sub-line">
                    4. The details of the fees calculated by him or her and the amount of fee which the applicant is required to deposit; and
                  </div>
                  <div className="rti-sub-line">
                    5. His or her rights with respect to review of the decision regarding non-disclosure of part of the information, the amount of fee charged or the form of access provided, including the particulars of the senior officer specified under sub-section (1) of section 19 or the Central Information Commission or the State Information Commission, as the case may be, time limit, process and any other form of access.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 11: THIRD PARTY INFORMATION */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("thirdPartyInfo")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                THIRD PARTY INFORMATION
              </span>
              <RtiChevron isOpen={activeSection === "thirdPartyInfo"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "thirdPartyInfo" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. Where a Central Public Information Officer or a State Public Information Officer, as the case may be, intends to disclose any information or record, or part thereof on a request made under this Act, which relates to or has been supplied by a third party and has been treated as confidential by that third party, the Central Public Information Officer or State Public Information Officer, as the case may be, shall, within five days from the receipt of the request, give a written notice to such third party of the request and of the fact that the Central Public Information Officer or State Public Information Officer, as the case may be, intends to disclose the information or record, or part thereof, and invite the third party to make a submission in writing or orally, regarding whether the information should be disclosed, and such submission of the third party shall be kept in view while taking a decision about disclosure of information: Provided that except in the case of trade or commercial secrets protected by law, disclosure may be allowed if the public interest in disclosure outweighs in importance any possible harm or injury to the interests of such third party.
                  </div>
                  <div className="rti-line">
                    2. Where a notice is served by the Central Public Information Officer or State Public Information Officer, as the case may be, under sub-section (1) to a third party in respect of any information or record or part thereof, the third party shall, within ten days from the date of receipt of such notice, be given the opportunity to make representation against the proposed disclosure.
                  </div>
                  <div className="rti-line">
                    3. Notwithstanding anything contained in section 7, the Central Public Information Officer or State Public Information Officer, as the case may be, shall, within forty days after receipt of the request under section 6, if the third party has been given an opportunity to make representation under sub-section (2), make a decision as to whether or not to disclose the information or record or part thereof and give in writing the notice of his decision to the third party.
                  </div>
                  <div className="rti-line">
                    4. A notice given under sub-section (3) shall include a statement that the third party to whom the notice is given is entitled to prefer an appeal under section 19 against the decision.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 12: THE CENTRAL INFORMATION COMMISSION */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("centralInfoCommission")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                THE CENTRAL INFORMATION COMMISSION
              </span>
              <RtiChevron isOpen={activeSection === "centralInfoCommission"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "centralInfoCommission" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. The Central Government shall, by notification in the Official Gazette, constitute a body to be known as the Central Information Commission to exercise the powers conferred on, and to perform the functions assigned to, it under this Act.
                  </div>
                  <div className="rti-line">
                    2. The Central Information Commission shall consist of&ndash;
                  </div>
                  <div className="rti-sub-line">1. The Chief Information Commissioner; and</div>
                  <div className="rti-sub-line">
                    2. Such number of Central Information Commissioners, not exceeding ten, as may be deemed necessary.
                  </div>
                  <div className="rti-line">
                    3. The Chief Information Commissioner and Information Commissioners shall be appointed by the President on the recommendation of a committee consisting of&ndash;
                  </div>
                  <div className="rti-sub-line">1. The Prime Minister, who shall be the Chairperson of the committee;</div>
                  <div className="rti-sub-line">2. The Leader of Opposition in the Lok Sabha; and</div>
                  <div className="rti-sub-line">3. A Union Cabinet Minister to be nominated by the Prime Minister.</div>
                  <div className="rti-sub-line">
                    Explanation.&ndash;For the purposes of removal of doubts, it is hereby declared that where the Leader of Opposition in the House of the People has not been recognized as such, the Leader of the single largest group in opposition of the Government in the House of the People shall be deemed to be the Leader of Opposition.
                  </div>
                  <div className="rti-line">
                    4. The general superintendence, direction and management of the affairs of the Central Information Commission shall vest in the Chief Information Commissioner who shall be assisted by the Information Commissioners and may exercise all such powers and do all such acts and things which may be exercised or done by the Central Information Commission autonomously without being subjected to directions by any other authority under this Act.
                  </div>
                  <div className="rti-line">
                    5. The Chief Information Commissioner and Information Commissioners shall be persons of eminence in public life with wide knowledge and experience in law, science and technology, social service, management, journalism, mass media or administration and governance.
                  </div>
                  <div className="rti-line">
                    6. The Chief Information Commissioner or an Information Commissioner shall not be a Member of Parliament or Member of the Legislature of any State or Union territory, as the case may be, or hold any other office of profit or connected with any political party or carrying on any business or pursuing any profession.
                  </div>
                  <div className="rti-line">
                    7. The headquarters of the Central Information Commission shall be at Delhi and the Central Information Commission may, with the previous approval of the Central Government, establish offices at other places in India.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 13: TERM OF OFFICE AND CONDITIONS OF SERVICE */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("termsOfOfficeCic")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                TERM OF OFFICE AND CONDITIONS OF SERVICE
              </span>
              <RtiChevron isOpen={activeSection === "termsOfOfficeCic"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "termsOfOfficeCic" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. The Chief Information Commissioner shall hold office for a term of five years from the date on which he enters upon his office and shall not be eligible for reappointment: Provided that no Chief Information Commissioner shall hold office as such after he has attained the age of sixty-five years.
                  </div>
                  <div className="rti-line">
                    2. Every Information Commissioner shall hold office for a term of five years from the date on which he enters upon his office or till he attains the age of sixty-five years, whichever is earlier, and shall not be eligible for reappointment as such Information Commissioner: Provided that every Information Commissioner shall, on vacating his office under this sub-section be eligible for appointment as the Chief Information Commissioner in the manner specified in sub-section (3) of section 12: Provided further that where the Information Commissioner is appointed as the Chief Information Commissioner, his term of office shall not be more than five years in aggregate as the Information Commissioner and the Chief Information Commissioner.
                  </div>
                  <div className="rti-line">
                    3. The Chief Information Commissioner or an Information Commissioner shall before he enters upon his office make and subscribe before the President or some other person appointed by him in that behalf, an oath or affirmation according to the form set out for the purpose in the First Schedule.
                  </div>
                  <div className="rti-line">
                    4. The Chief Information Commissioner or an Information Commissioner may, at any time, by writing under his hand addressed to the President, resign from his office: Provided that the Chief Information Commissioner or an Information Commissioner may be removed in the manner specified under section 14.
                  </div>
                  <div className="rti-line">
                    5. The salaries and allowances payable to and other terms and conditions of service of &mdash;
                  </div>
                  <div className="rti-sub-line">
                    1. The Chief Information Commissioner shall be the same as that of the Chief Election Commissioner;
                  </div>
                  <div className="rti-sub-line">
                    2. An Information Commissioner shall be the same as that of an Election Commissioner:
                  </div>
                  <div className="rti-sub-line">
                    Provided that if the Chief Information Commissioner or an Information Commissioner, at the time of his appointment is, in receipt of a pension, other than a disability or wound pension, in respect of any previous service under the Government of India or under the Government of a State, his salary in respect of the service as the Chief Information Commissioner or an Information Commissioner shall be reduced by the amount of that pension including any portion of pension which was commuted and pension equivalent of other forms of retirement benefits excluding pension equivalent of retirement gratuity: Provided further that if the Chief Information Commissioner or an Information Commissioner is, at the time of his appointment is, in receipt of retirement benefits in respect of any previous service rendered in a Corporation established by or under any Central Act or State Act or a Government company owned or controlled by the Central Government or the State Government, his salary in respect of the service as the Chief Information Commissioner or an Information Commissioner shall be reduced by the amount of pension equivalent to the retirement benefits: Provided also that the salaries, allowances and other conditions of service of the Chief Information Commissioner and the Information Commissioners shall not be varied to their disadvantage after their appointment.
                  </div>
                  <div className="rti-line">
                    6. The Central Government shall provide the Chief Information Commissioner and the Information Commissioners with such officers and employees as may be necessary for the efficient performance of their functions under this Act, and the salaries and allowances payable to and the terms and conditions of service of the officers and other employees appointed for the purpose of this Act shall be such as may be prescribed.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 14: REMOVAL OF CHIEF INFORMATION COMMISSIONER OR INFORMATION COMMISSIONER */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("removalCic")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                REMOVAL OF CHIEF INFORMATION COMMISSIONER OR INFORMATION COMMISSIONER
              </span>
              <RtiChevron isOpen={activeSection === "removalCic"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "removalCic" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. Subject to the provisions of sub-section (3), the Chief Information Commissioner or any Information Commissioner shall be removed from his office only by order of the President on the ground of proved misbehavior or incapacity after the Supreme Court, on a reference made to it by the President, has, on inquiry, reported that the Chief Information Commissioner or any Information Commissioner, as the case may be, ought on such ground be removed.
                  </div>
                  <div className="rti-line">
                    2. The President may suspend from office, and if deem necessary prohibit also from attending the office during inquiry, the Chief Information Commissioner or Information Commissioner in respect of whom a reference has been made to the Supreme Court under sub-section (1) until the President has passed orders on receipt of the report of the Supreme Court on such reference.
                  </div>
                  <div className="rti-line">
                    3. Not withstanding anything contained in sub-section (1), the President may by order remove from office the Chief Information Commissioner or any Information Commissioner if the Chief Information Commissioner or a Information Commissioner, as the case may be,&ndash;
                  </div>
                  <div className="rti-sub-line">1. Is adjudged an insolvent; or</div>
                  <div className="rti-sub-line">
                    2. Has been convicted of an offense which, in the opinion of the President, involves moral turpitude; or
                  </div>
                  <div className="rti-sub-line">
                    3. Engages during his term of office in any paid employment outside the duties of his office; or
                  </div>
                  <div className="rti-sub-line">
                    4. Is, in the opinion of the President, unfit to continue in office by reason of infirmity of mind or body; or
                  </div>
                  <div className="rti-sub-line">
                    5. Has acquired such financial or other interest as is likely to affect prejudicially his functions as the Chief Information Commissioner or a Information Commissioner.
                  </div>
                  <div className="rti-line">
                    4. If the Chief Information Commissioner or a Information Commissioner in any way, concerned or interested in any contract or agreement made by or on behalf of the Government of India or participates in any way in the profit thereof or in any benefit or emolument arising there from otherwise than as a member and in common with the other members of an incorporated company, he shall, for the purposes of sub-section (1), be deemed to be guilty of misbehavior.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 15: THE STATE INFORMATION COMMISSION-CONSTITUTION OF STATE INFORMATION COMMISSION */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("stateInfoCommission")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                THE STATE INFORMATION COMMISSION-CONSTITUTION OF STATE INFORMATION COMMISSION
              </span>
              <RtiChevron isOpen={activeSection === "stateInfoCommission"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "stateInfoCommission" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. Every State Government shall, by notification in the Official Gazette, constitute a body to be known as the .......... (name of the State) Information Commission to exercise the powers conferred on, and to perform the functions assigned to, it under this Act.
                  </div>
                  <div className="rti-line">
                    2. The State Information Commission shall consist of&ndash;
                  </div>
                  <div className="rti-sub-line">1. The State Chief Information Commissioner, and</div>
                  <div className="rti-sub-line">
                    2. Such number of State Information Commissioners, not exceeding ten, as may be deemed necessary.
                  </div>
                  <div className="rti-line">
                    3. The State Chief Information Commissioner and the State Information Commissioners shall be appointed by the Governor on the recommendation of a committee consisting of&ndash;
                  </div>
                  <div className="rti-sub-line">1. The Chief Minister, who shall be the Chairperson of the committee;</div>
                  <div className="rti-sub-line">2. The Leader of Opposition in the Legislative Assembly; and</div>
                  <div className="rti-sub-line">3. A Cabinet Minister to be nominated by the Chief Minister.</div>
                  <div className="rti-sub-line">
                    Explanation.&ndash;For the purposes of removal of doubts, it is hereby declared that where the Leader of Opposition in the Legislative Assembly has not been recognized as such, the Leader of the single largest group in opposition of the Government in the Legislative Assembly shall be deemed to be the Leader of Opposition.
                  </div>
                  <div className="rti-line">
                    4. The general superintendence, direction and management of the affairs of the State Information Commission shall vest in the State Chief Information Commissioner who shall be assisted by the State Information Commissioners and may exercise all such powers and do all such acts and things which may be exercised or done by the State Information Commission autonomously without being subjected to directions by any other authority under this Act.
                  </div>
                  <div className="rti-line">
                    5. The State Chief Information Commissioner and the State Information Commissioners shall be persons of eminence in public life with wide knowledge and experience in law, science and technology, social service, management, journalism, mass media or administration and governance.
                  </div>
                  <div className="rti-line">
                    6. The State Chief Information Commissioner or a State Information Commissioner shall not be a Member of Parliament or Member of the Legislature of any State or Union territory, as the case may be, or hold any other office of profit or connected with any political party or carrying on any business or pursuing any profession.
                  </div>
                  <div className="rti-line">
                    7. The headquarters of the State Information Commission shall be at such place in the State as the State Government may, by notification in the Official Gazette, specify and the State Information Commission may, with the previous approval of the State Government, establish offices at other places in the State.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 16: TERMS OF OFFICE AND CONDITIONS OF SERVICE */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleSection("termsOfOfficeSic")}
              className="w-full rti-accordion-header h-[50px] px-3.5 flex items-center justify-between text-left rounded-[2px]"
            >
              <span className="text-[12.5px] sm:text-[17px] font-bold uppercase tracking-wide text-white" style={{ fontFamily: "Mulish" }}>
                TERMS OF OFFICE AND CONDITIONS OF SERVICE
              </span>
              <RtiChevron isOpen={activeSection === "termsOfOfficeSic"} />
            </button>
            <div className={`rti-accordion-wrapper ${activeSection === "termsOfOfficeSic" ? "open" : ""}`}>
              <div className="rti-accordion-content">
                <div className="w-full rti-body">
                  <div className="rti-line">
                    1. The State Chief Information Commissioner shall hold office for a term of five years from the date on which he enters upon his office and shall not be eligible for reappointment: Provided that no State Chief Information Commissioner shall hold office as such after he has attained the age of sixty-five years.
                  </div>
                  <div className="rti-line">
                    2. Every State Information Commissioner shall hold office for a term of five years from the date on which he enters upon his office or till he attains the age of sixty-five years, whichever is earlier, and shall not be eligible for reappointment as such State Information Commissioner: Provided that every State Information Commissioner shall, on vacating his office under this sub-section, be eligible for appointment as the State Chief Information Commissioner in the manner specified in sub-section (3) of section 15: Provided further that where the State Information Commissioner is appointed as the State Chief Information Commissioner, his term of office shall not be more than five years in aggregate as the State Information Commissioner and the State Chief Information Commissioner.
                  </div>
                  <div className="rti-line">
                    3. The State Chief Information Commissioner or a State Information Commissioner, shall before he enters upon his office make and subscribe before the Governor or some other person appointed by him in that behalf.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
