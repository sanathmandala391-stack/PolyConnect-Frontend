import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import downloadButtonSvg from "../images/download-button-155-48.svg";

// Official SBTET tenders dataset in the exact sequence shown in the reference screenshot
const TENDERS_DATA = [
  {
    id: 1,
    title: "Tender Document for Confidential Printing Works - 2026",
    url: "https://sbtet.telangana.gov.in/downloads/Circular/Tender Document.pdf",
    tenderDate: "28-08-2026",
    endDate: "17-09-2026",
    rawTenderDate: "2026-08-28T00:00:00",
    rawEndDate: "2026-09-17T00:00:00",
  },
  {
    id: 2,
    title: "Tender Document for Print and Supply of QR and Barcoded OMR sheets along with Answer Booklets 2nd call",
    url: "https://www.sbtet.telangana.gov.in/downloads/Circular/signed Tender Doc 04-01-2025.pdf",
    tenderDate: "07-01-2025",
    endDate: "21-01-2025",
    rawTenderDate: "2025-01-07T00:00:00",
    rawEndDate: "2025-01-21T00:00:00",
  },
  {
    id: 3,
    title: "Tender Document for Print and Supply of QR and Barcoded OMR sheets along with Answer Booklets",
    url: "https://www.sbtet.telangana.gov.in/downloads/Circular/Tender Document OMR.pdf",
    tenderDate: "16-12-2024",
    endDate: "30-12-2024",
    rawTenderDate: "2024-12-16T00:00:00",
    rawEndDate: "2024-12-30T00:00:00",
  },
  {
    id: 4,
    title: "Tender Document for Print and Supply of QR code Answer Booklets",
    url: "https://www.sbtet.telangana.gov.in/downloads/Circular/Tender - OMR Printing 2021.pdf",
    tenderDate: "24-01-2022",
    endDate: "01-02-2022",
    rawTenderDate: "2022-01-24T00:00:00",
    rawEndDate: "2022-02-01T00:00:00",
  },
  {
    id: 5,
    title: 'Tender Document for “On Screen Digital Evaluation System (OSDES)”- 2024 bearing Tender No: SBTET-POE1/8/2024-POE1, Dated: 21.08.2024',
    url: "https://www.sbtet.telangana.gov.in/downloads/Circular/Final Tender Document for OSDES-2024 Tender-DSC.pdf",
    tenderDate: "11-09-2024",
    endDate: "25-09-2024",
    rawTenderDate: "2024-09-11T00:00:00",
    rawEndDate: "2024-09-25T00:00:00",
  },
  {
    id: 6,
    title: "Tender for Group Medical Insurance policy for SBTET",
    url: "https://www.sbtet.telangana.gov.in/downloads/Circular/Tender for Medical insurance_0001.pdf",
    tenderDate: "24-08-2023",
    endDate: "15-09-2023",
    rawTenderDate: "2023-08-24T00:00:00",
    rawEndDate: "2023-09-15T00:00:00",
  },
  {
    id: 7,
    title: "Tender Document for Engaging Confidential Printer-2023",
    url: "https://sbtet.telangana.gov.in/downloads/Circular/Tender Document for Engaging Confidential Printer-2023.pdf",
    tenderDate: "24-08-2023",
    endDate: "15-09-2023",
    rawTenderDate: "2023-08-24T00:00:00",
    rawEndDate: "2023-09-15T00:00:00",
  },
  {
    id: 8,
    title: "Group Insurance Tender Document",
    url: "https://sbtet.telangana.gov.in/downloads/Circular/Insurance Tender document.pdf",
    tenderDate: "23-07-2022",
    endDate: "01-08-2022",
    rawTenderDate: "2022-07-23T00:00:00",
    rawEndDate: "2022-08-01T00:00:00",
  },
  {
    id: 9,
    title: '“Onscreen Digital EvaluationSystem” Tender No :SBTET-POE1/3/2020-POE1, Dated:12.07.2021',
    url: "https://www.sbtet.telangana.gov.in/downloads/Circular/Signed Tender Document_OSDES-2021.pdf",
    tenderDate: "12-07-2021",
    endDate: "27-07-2021",
    rawTenderDate: "2021-07-12T00:00:00",
    rawEndDate: "2021-07-27T00:00:00",
  },
];

// Parse DD-MM-YYYY string to timestamp for sorting
const parseDate = (dStr) => {
  if (!dStr) return 0;
  const parts = dStr.split("-");
  if (parts.length === 3) {
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime() || 0;
  }
  return 0;
};

// Properly encode URL for Chrome (handling spaces in PDF filenames safely)
const getSafePdfUrl = (rawUrl) => {
  if (!rawUrl) return "#";
  try {
    return encodeURI(decodeURI(rawUrl));
  } catch {
    return rawUrl;
  }
};

export default function TendersPage() {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Tenders | State Board of Technical Education and Training Telangana";

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedTenders = useMemo(() => {
    let result = [...TENDERS_DATA];

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.tenderDate.includes(q) ||
          item.endDate.includes(q) ||
          String(item.id).includes(q)
      );
    }

    if (sortColumn) {
      result.sort((a, b) => {
        let comparison = 0;
        if (sortColumn === "description") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortColumn === "tenderDate") {
          comparison = parseDate(a.tenderDate) - parseDate(b.tenderDate);
        } else if (sortColumn === "endDate") {
          comparison = parseDate(a.endDate) - parseDate(b.endDate);
        } else if (sortColumn === "download") {
          comparison = a.id - b.id;
        }
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [search, sortColumn, sortDirection]);

  return (
    <div className="w-full min-h-[calc(100vh-250px)] bg-white sbtet-tenders-page">
      {/* Explicit Open Sans styling and exact dark border specifications matching SBTET portal */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');

        .sbtet-tenders-page {
          font-family: 'Open Sans', Arial, sans-serif !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* The exact box with crisp, dark 1px solid borders on all outer edges and internal cells */
        .sbtet-tenders-table {
          font-family: 'Open Sans', Arial, sans-serif !important;
          border-collapse: collapse !important;
          border-spacing: 0 !important;
          width: 100% !important;
          border: 1px solid #333333 !important;
          background-color: #ffffff !important;
        }

        .sbtet-tenders-table th,
        .sbtet-tenders-table td {
          border: 1px solid #333333 !important;
          vertical-align: middle !important;
          box-sizing: border-box !important;
        }

        .sbtet-tenders-table th {
          color: #007bff !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          background-color: #ffffff !important;
          padding: 7px 10px !important;
          text-align: left !important;
          line-height: 1.35 !important;
        }

        .sbtet-tenders-table td {
          color: #333333 !important;
          font-size: 13px !important;
          font-weight: 400 !important;
          padding: 6px 10px !important;
          background-color: #ffffff !important;
          line-height: 1.35 !important;
        }

        /* Consistent single-line row height matching exact reference */
        .sbtet-tenders-table tr {
          min-height: 36px !important;
        }

        .sbtet-tenders-table tbody tr:hover td {
          background-color: #bbdefb !important;
          cursor: pointer;
        }
      `}</style>

      {/* 1. Header Breadcrumb Bar (edge-to-edge government bar) */}
      <div
        className="w-full bg-[#e9ecef] border-b border-[#dee2e6] h-[36px] sm:h-[38px] flex items-center"
        style={{ boxSizing: "border-box" }}
      >
        <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 flex items-center text-[13px] sm:text-[13.5px]">
          <Link
            to="/"
            className="text-[black] font-normal cursor-pointer"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: "500" }}
          >
            Home
          </Link>
          <span
            className="text-[black] mx-1.5 font-normal select-none"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: "500" }}
          >
            /
          </span>
          <Link
            to="/sitemap"
            className="text-[black] font-normal cursor-pointer"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: "500" }}
          >
            More
          </Link>
          <span
            className="text-[black] mx-1.5 font-normal select-none"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: "500" }}
          >
            /
          </span>
          <span
            className="text-[#212529] font-semibold"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
          >
            Tenders
          </span>
        </div>
      </div>

      {/* 2. Page Inner Container (Aligned with GovHeader max-w-7xl px-2 sm:px-4) */}
      <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 pt-5 pb-20" style={{ marginTop: "25px" }}>
        {/* Title with Vertical Green Accent Bar (Matching exact cap-height of Tenders) */}
        <div className="flex items-center mb-4">
          <div className="w-[4px] h-[25px] bg-[#28a745] rounded-[1px] mr-2 shrink-0" />
          <h2
            className="text-[21px] sm:text-[21px] font-semibold text-[#1a365d] tracking-tight m-0 leading-none"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif", marginLeft: "9px", fontWeight: "500" }}
          >
            Tenders
          </h2>
        </div>

        {/* Search Input Section */}
        <div className="mb-3.5">
          <label
            htmlFor="sbtet-tender-search"
            className="block text-[13px] text-[#333333] mb-1 font-normal"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
          >
            Search
          </label>
          <input
            id="sbtet-tender-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full max-w-[240px] h-[32px] px-2.5 py-1 text-[13px] text-[#495057] bg-white border border-[#ced4da] rounded focus:outline-none focus:border-[#80bdff] focus:ring-1 focus:ring-[#80bdff] transition-all placeholder:text-[#6c757d]"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
          />
        </div>

        {/* Exact Table Box with 1px Solid Continuous Dark Borders and Proportions */}
        <div className="w-full overflow-x-auto bg-white">
          <table className="sbtet-tenders-table">
            <thead>
              <tr className="bg-white">
                {/* S.No Header: No sort icon as in reference image */}
                <th
                  style={{ width: "3.5%", minWidth: "40px", fontFamily: "Mulish", fontWeight: "" }}
                  className="whitespace-nowrap"
                >
                  S.No
                </th>

                {/* Description Header with sort icon */}
                <th
                  onClick={() => handleSort("description")}
                  style={{ width: "63.5%" }}
                  className="cursor-pointer select-none hover:bg-slate-50 transition-colors"
                  title="Click to sort by Description"
                >
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontFamily: "Mulish" }}>Description</span>
                    <i className="fa-solid fa-sort text-[11px] text-[#007bff]" />
                  </div>
                </th>

                {/* Tender Date Header with sort icon */}
                <th
                  onClick={() => handleSort("tenderDate")}
                  style={{ width: "11%", minWidth: "95px" }}
                  className="cursor-pointer select-none whitespace-nowrap hover:bg-slate-50 transition-colors"
                  title="Click to sort by Tender Date"
                >
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontFamily: "Mulish" }}>Tender Date</span>
                    <i className="fa-solid fa-sort text-[11px] text-[#007bff]" />
                  </div>
                </th>

                {/* End Date Header with sort icon */}
                <th
                  onClick={() => handleSort("endDate")}
                  style={{ width: "11%", minWidth: "95px" }}
                  className="cursor-pointer select-none whitespace-nowrap hover:bg-slate-50 transition-colors"
                  title="Click to sort by End Date"
                >
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontFamily: "Mulish" }}>End Date</span>
                    <i className="fa-solid fa-sort text-[11px] text-[#007bff]" />
                  </div>
                </th>

                {/* Download Header with sort icon */}
                <th
                  onClick={() => handleSort("download")}
                  style={{ width: "11%", minWidth: "95px" }}
                  className="cursor-pointer select-none whitespace-nowrap hover:bg-slate-50 transition-colors"
                  title="Click to sort by Download"
                >
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontFamily: "Mulish" }}>Download</span>
                    <i className="fa-solid fa-sort text-[11px] text-[#007bff]" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTenders.length > 0 ? (
                filteredAndSortedTenders.map((tender, index) => (
                  <tr
                    key={tender.id}
                    className="hover:bg-[#f8f9fa] transition-colors"
                  >
                    {/* S.No Column: 1 to 9 */}
                    <td className="align-middle text-left whitespace-nowrap" style={{ fontFamily: "Mulish" }}>
                      {index + 1}
                    </td>

                    {/* Description Column */}
                    <td className="align-middle text-left" style={{ fontFamily: "Mulish" }}>
                      {tender.title}
                    </td>

                    {/* Tender Date Column */}
                    <td className="align-middle whitespace-nowrap text-left" style={{ fontFamily: "Mulish" }}>
                      {tender.tenderDate}
                    </td>

                    {/* End Date Column */}
                    <td className="align-middle whitespace-nowrap text-left" style={{ fontFamily: "Mulish" }}>
                      {tender.endDate}
                    </td>

                    {/* Download Column with green official pill button */}
                    <td className="align-middle text-left whitespace-nowrap" style={{ fontFamily: "Mulish" }}>
                      <a
                        href={getSafePdfUrl(tender.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
                        title={`Open Tender PDF: ${tender.title}`}
                      >
                        <img
                          src={downloadButtonSvg}
                          alt="Download"
                          className="h-[21px] w-auto max-w-[74px] object-contain block"
                        />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-[#6c757d] text-[13px] font-normal"
                  >
                    No matching tenders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}
