import React, { useState, useEffect } from "react";
import api, { apiErrorMessage } from "../api/client";

const getExamMonthYear = async (feeType = "Regular") => {
  const response = await api.get("/sbtet/fee/exam-month-year", {
    params: { feeType },
  });
  return response.data;
};

const getChallanNumbers = async (examMonthYearId, pin) => {
  const response = await api.get("/sbtet/fee/challan-numbers", {
    params: { examMonthYearId, pin },
  });
  return response.data;
};

const getChallanDetails = async (chalanaNo) => {
  const response = await api.get("/sbtet/fee/challan-details", {
    params: { chalanaNo },
  });
  return response.data;
};

export default function FeeReceipt() {
  // Navigation Tab State ("PIN" | "CHALLAN")
  const [activeTab, setActiveTab] = useState("PIN");

  // Tab 1: Fee Receipt By Pin Form State
  const [paymentType, setPaymentType] = useState("None");
  const [feeType] = useState("Regular");
  const [examMonthYearList, setExamMonthYearList] = useState([]);
  const [selectedExamMonthYearId, setSelectedExamMonthYearId] = useState("");
  const [pin, setPin] = useState("");
  const [challanList, setChallanList] = useState([]);
  const [selectedChallanNo, setSelectedChallanNo] = useState("");

  // Tab 2: Direct Challan Input State
  const [directChallanNo, setDirectChallanNo] = useState("");

  // Result & Status State
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset results and status when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setReceiptData(null);
    setError("");
  };

  // Fetch Exam Month/Year options when feeType changes
  useEffect(() => {
    if (activeTab !== "PIN") return;

    const fetchDropdownData = async () => {
      try {
        setError("");
        const res = await getExamMonthYear(feeType);
        const list = res?.Table1 || [];
        setExamMonthYearList(list);
      } catch (err) {
        setError(apiErrorMessage(err, "Failed to load Exam Month/Year options."));
      }
    };

    fetchDropdownData();
  }, [feeType, activeTab]);

  // Tab 1: Handler to fetch Challan Numbers list
  const handleGetChallanNumbers = async () => {
    if (!pin.trim()) {
      setError("Please enter a valid PIN.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setReceiptData(null);
      setChallanList([]);
      setSelectedChallanNo("");

      const res = await getChallanNumbers(selectedExamMonthYearId, pin);
      const list = res?.Table || [];
      setChallanList(list);

      if (list.length === 0) {
        setError("No challan numbers found for the entered PIN.");
      }
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to fetch Challan Numbers."));
    } finally {
      setLoading(false);
    }
  };

  // Shared Handler: Fetch full details using a Challan Number
  const handleFetchChallanDetails = async (challanNoToFetch) => {
    if (!challanNoToFetch || !challanNoToFetch.trim()) {
      setError("Please enter or select a Challan Number.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setReceiptData(null);

      const res = await getChallanDetails(challanNoToFetch.trim());

      if (res?.success && res?.receiptDetails) {
        setReceiptData(res.receiptDetails);
      } else {
        setError("No receipt details found for this Challan Number.");
      }
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to fetch Challan Details."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fee-receipt-page w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap');

        .fee-receipt-page {
          font-family: 'Muli', Arial, sans-serif;
          color: #333333;
        }

        .tab-btn-base {
          padding: 8px 16px;
          margin: 0;
          font-family: 'Muli', sans-serif;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.4;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          border: 1px solid transparent;
        }

        .tab-btn-active {
          background-color: #35A5F1 !important;
          color: #ffffff !important;
          border-color: #35A5F1;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .tab-btn-inactive {
          background-color: transparent !important;
          color: #35A5F1 !important;
        }

        .tab-btn-inactive:hover {
          background-color: #f0f8ff !important;
          text-decoration: underline;
        }

        .receipt-card {
          border: 1px solid #bce8f1;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          background-color: #ffffff;
          overflow: hidden;
        }

        .receipt-card-header {
          color: #ffffff;
          font-size: 14px;
          font-family: 'Open Sans', sans-serif;
          font-weight: 600;
          background-color: #5ca0d3;
          padding: 8px 14px;
        }

        .receipt-card-body {
          padding: 16px;
          background-color: #fcfcfc;
        }

        @media (min-width: 640px) {
          .receipt-card-body {
            padding: 20px;
          }
        }

        .form-label-style {
          font-family: 'Muli', sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          color: #333333;
          margin-bottom: 5px;
          display: block;
        }

        .form-control-style {
          width: 100%;
          height: 36px;
          padding: 6px 10px;
          font-family: 'Muli', sans-serif;
          font-size: 13px;
          color: #333333;
          background-color: #ffffff;
          border: 1px solid #cccccc;
          border-radius: 4px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .form-control-style:focus {
          border-color: #5ca0d3;
          box-shadow: 0 0 0 2px rgba(92, 160, 211, 0.25);
        }

        .btn-green-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          padding: 6px 18px;
          margin: 0;
          font-family: 'Muli', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #ffffff;
          background-color: #7cb342;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }

        .btn-green-action:hover:not(:disabled) {
          background-color: #6ea528;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.18);
        }

        .btn-green-action:disabled {
          background-color: #a3d47d;
          cursor: not-allowed;
          opacity: 0.75;
        }

        /* Receipt Output Table */
        .board-title-text {
          color: #222222;
          font-size: 16px;
          font-weight: 700;
          margin-top: 24px;
          margin-bottom: 12px;
          text-align: center;
          letter-spacing: 0.2px;
        }

        .receipt-data-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          border: 1px solid #dddddd;
          background-color: #ffffff;
        }

        .receipt-data-table th {
          background-color: #f9f9f9;
          text-align: left;
          padding: 8px 12px;
          border: 1px solid #dddddd;
          color: #444444;
          font-size: 13px;
          font-weight: 700;
        }

        .receipt-data-table td {
          padding: 8px 12px;
          border: 1px solid #dddddd;
          font-size: 13px;
          color: #333333;
        }

        .receipt-data-table tbody tr:nth-child(even) {
          background-color: #fafafa;
        }

        @media print {
          .page-breadcrumb, .tab-nav-section, .receipt-card, .no-print {
            display: none !important;
          }
          .receipt-output-section {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>

      {/* Top Gray Breadcrumb Bar */}
      <div
        className="page-breadcrumb -mx-3 sm:-mx-4 md:-mx-6 bg-[#d8dadc] px-4 sm:px-8 py-2 flex items-center mb-4"
        style={{ boxSizing: "border-box", marginTop: "-16px" }}
      >
        <h1
          className="m-0 text-[13px] sm:text-[14px] text-[#212529] leading-none"
          style={{ fontFamily: "'Mulish', 'Muli', sans-serif", fontWeight: 700 }}
        >
          Download Fee Receipt
        </h1>
      </div>

      <div className="w-full max-w-[1240px] mx-auto py-1 sm:py-3">
        {/* Top Tabs Navigation */}
        <div className="tab-nav-section no-print flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <button
            type="button"
            className={`tab-btn-base ${activeTab === "PIN" ? "tab-btn-active" : "tab-btn-inactive"}`}
            onClick={() => handleTabChange("PIN")}
          >
            Fee Receipt By Pin
          </button>
          <button
            type="button"
            className={`tab-btn-base ${activeTab === "CHALLAN" ? "tab-btn-active" : "tab-btn-inactive"}`}
            onClick={() => handleTabChange("CHALLAN")}
          >
            Fee Receipt By Challan Number
          </button>
        </div>

        {/* TAB 1: FEE RECEIPT BY PIN */}
        {activeTab === "PIN" && (
          <div className="receipt-card w-full">
            <div className="receipt-card-header">Fee Receipt By Pin</div>
            <div className="receipt-card-body">
              {/* Responsive Form Layout: Stacked vertically on mobile, horizontal single row on desktop */}
              <div className="flex flex-col md:flex-row md:items-end gap-3.5 md:gap-3 lg:gap-4">
                {/* 1. Payment Type */}
                <div className="w-full md:flex-1 md:min-w-[160px]">
                  <label className="form-label-style">Payment Type:</label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="form-control-style"
                  >
                    <option value="None">Select Payment Type</option>
                    <option value="Examination">Examination</option>
                  </select>
                </div>

                {/* 2. Exam Month Year */}
                <div className="w-full md:flex-1 md:min-w-[190px]">
                  <label className="form-label-style">Exam Month Year:</label>
                  <select
                    value={selectedExamMonthYearId}
                    onChange={(e) => setSelectedExamMonthYearId(e.target.value)}
                    className="form-control-style"
                  >
                    <option value="">Select Exam Month Year</option>
                    {examMonthYearList.map((item) => (
                      <option key={item.Id} value={item.Id}>
                        {item.ExamYearMonth}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. PIN */}
                <div className="w-full md:flex-1 md:min-w-[160px]">
                  <label className="form-label-style">PIN :</label>
                  <input
                    type="text"
                    placeholder="Enter Pin Number"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="form-control-style"
                  />
                </div>

                {/* 4. Get Challan Numbers Button */}
                <div className="w-full md:w-auto mt-1 md:mt-0 flex shrink-0">
                  <button
                    type="button"
                    className="btn-green-action w-full md:w-auto"
                    onClick={handleGetChallanNumbers}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Get Challan Numbers"}
                  </button>
                </div>
              </div>

              {/* Secondary Row: Challan Number Dropdown */}
              {challanList.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col md:flex-row md:items-end gap-3.5 md:gap-3 lg:gap-4">
                  <div className="w-full md:flex-1 md:min-w-[220px]">
                    <label className="form-label-style">Challan Numbers:</label>
                    <select
                      value={selectedChallanNo}
                      onChange={(e) => setSelectedChallanNo(e.target.value)}
                      className="form-control-style"
                    >
                      <option value="">Select Challan Number</option>
                      {challanList.map((item, index) => (
                        <option key={index} value={item.ChalanaNumber}>
                          {item.ChalanaNumber}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full md:w-auto mt-1 md:mt-0 flex shrink-0">
                    <button
                      type="button"
                      className="btn-green-action w-full md:w-auto"
                      onClick={() => handleFetchChallanDetails(selectedChallanNo)}
                      disabled={loading || !selectedChallanNo}
                    >
                      Get Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: FEE RECEIPT BY CHALLAN NUMBER */}
        {activeTab === "CHALLAN" && (
          <div className="receipt-card w-full">
            <div className="receipt-card-header">Fee Receipt By Challan Number</div>
            <div className="receipt-card-body">
              <div className="flex flex-col md:flex-row md:items-end gap-3.5 md:gap-3 lg:gap-4">
                <div className="w-full md:flex-1 md:min-w-[240px]">
                  <label className="form-label-style">Challan Number :</label>
                  <input
                    type="text"
                    placeholder="Enter Challan Number"
                    value={directChallanNo}
                    onChange={(e) => setDirectChallanNo(e.target.value)}
                    className="form-control-style"
                  />
                </div>

                <div className="w-full md:w-auto mt-1 md:mt-0 flex shrink-0">
                  <button
                    type="button"
                    className="btn-green-action w-full md:w-auto"
                    onClick={() => handleFetchChallanDetails(directChallanNo)}
                    disabled={loading || !directChallanNo.trim()}
                  >
                    Get Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Messages */}
        {loading && <div className="text-gray-600 text-sm mt-3 font-medium">Loading details...</div>}
        {error && <div className="text-rose-600 text-sm mt-3 font-semibold">{error}</div>}

        {/* Receipt Output Details */}
        {receiptData && (
          <div className="receipt-output-section mt-6 bg-white border border-[#dddddd] rounded-sm p-4 sm:p-6 shadow-xs">
            <h2 className="board-title-text uppercase">
              STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA
            </h2>

            <div className="w-full overflow-x-auto">
              <table className="receipt-data-table">
                <thead>
                  <tr>
                    <th className="w-1/3">Description</th>
                    <th className="w-2/3">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold text-gray-700">Reference Number</td>
                    <td>{receiptData.referenceNumber || "NA"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-gray-700">Bank Transaction Number</td>
                    <td>{receiptData.bankTxnNumber || "NA"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-gray-700">Payment Status</td>
                    <td className="text-[#70b836] font-bold">{receiptData.paymentStatus || "SUCCESS"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-gray-700">PIN</td>
                    <td className="font-mono">{receiptData.pin || pin}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-gray-700">Exam Month Year</td>
                    <td>{receiptData.examMonthYear || "NA"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-gray-700">Fee Amount</td>
                    <td className="font-semibold">{receiptData.feeAmount || "NA"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-gray-700">Date</td>
                    <td>{receiptData.date || new Date().toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4 no-print">
              <button
                type="button"
                className="btn-green-action"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}