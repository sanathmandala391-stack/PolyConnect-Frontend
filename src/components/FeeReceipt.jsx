// import React, { useState, useEffect } from "react";
// import api, { apiErrorMessage } from "../api/client"; // adjust import path to your api.js location

// /**
//  * API functions integrated directly into the component module
//  */
// const getExamMonthYear = async (feeType = "Regular") => {
//   const response = await api.get("/sbtet/fee/exam-month-year", {
//     params: { feeType },
//   });
//   return response.data;
// };

// const getChallanNumbers = async (examMonthYearId, pin) => {
//   const response = await api.get("/sbtet/fee/challan-numbers", {
//     params: { examMonthYearId, pin },
//   });
//   return response.data;
// };

// const getChallanDetails = async (chalanaNo) => {
//   const response = await api.get("/sbtet/fee/challan-details", {
//     params: { chalanaNo },
//   });
//   return response.data;
// };

// export default function FeeReceipt() {
//   // Form State
//   const [paymentType, setPaymentType] = useState("Select Payment Type");
//   const [feeType, setFeeType] = useState("Regular");
//   const [examMonthYearList, setExamMonthYearList] = useState([]);
//   const [selectedExamMonthYearId, setSelectedExamMonthYearId] = useState("");
//   const [pin, setPin] = useState("");

//   // Challans & Data State
//   const [challanList, setChallanList] = useState([]);
//   const [selectedChallanNo, setSelectedChallanNo] = useState("");
//   const [receiptData, setReceiptData] = useState(null);

//   // Status Indicators
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch Exam Month/Year options when feeType changes
//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         setError("");
//         const res = await getExamMonthYear(feeType);
//         const list = res?.Table1 || [];
//         setExamMonthYearList(list);
//         if (list.length > 0) {
//           setSelectedExamMonthYearId(list[0].Id);
//         }
//       } catch (err) {
//         setError(apiErrorMessage(err, "Failed to load Exam Month/Year options."));
//       }
//     };

//     fetchDropdownData();
//   }, [feeType]);

//   // Handler: Get Challan Numbers
//   const handleGetChallanNumbers = async () => {
//     if (!pin.trim()) {
//       setError("Please enter a valid PIN.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setReceiptData(null);
//       setChallanList([]);

//       const res = await getChallanNumbers(selectedExamMonthYearId, pin);
//       const list = res?.Table || [];
//       setChallanList(list);

//       if (list.length > 0) {
//         setSelectedChallanNo(list[0].ChalanaNumber);
//       } else {
//         setError("No challan numbers found for the entered PIN.");
//       }
//     } catch (err) {
//       setError(apiErrorMessage(err, "Failed to fetch Challan Numbers."));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handler: Get Receipt Details
//   const handleGetDetails = async () => {
//     if (!selectedChallanNo) {
//       setError("Please select a Challan Number.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       const res = await getChallanDetails(selectedChallanNo);

//       if (res?.success && res?.receiptDetails) {
//         setReceiptData(res.receiptDetails);
//       } else {
//         setError("No receipt details found for this Challan Number.");
//       }
//     } catch (err) {
//       setError(apiErrorMessage(err, "Failed to fetch Challan Details."));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fee-receipt-container">
//       {/* Embedded Stylesheet */}
//       <style>{`
//         .fee-receipt-container {
//           font-family: Arial, sans-serif;
//           max-width: 1000px;
//           margin: 20px auto;
//           color: #333;
//         }

//         .card {
//           border: 1px solid #bce8f1;
//           border-radius: 4px;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
//           margin-bottom: 25px;
//         }

//         .card-header {
//           background-color: #71b1d9;
//           color: white;
//           padding: 10px 15px;
//           font-weight: bold;
//           font-size: 15px;
//         }

//         .card-body {
//           padding: 20px;
//           background-color: #fcfcfc;
//         }

//         .form-grid {
//           display: flex;
//           flex-wrap: wrap;
//           align-items: flex-end;
//           gap: 15px;
//         }

//         .margin-top {
//           margin-top: 15px;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//         }

//         .form-group label {
//           font-size: 13px;
//           font-weight: bold;
//           margin-bottom: 5px;
//         }

//         .form-group input,
//         .form-group select {
//           padding: 6px 12px;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//           height: 34px;
//           min-width: 180px;
//         }

//         .btn-green {
//           background-color: #70b836;
//           color: white;
//           border: none;
//           padding: 8px 16px;
//           border-radius: 4px;
//           cursor: pointer;
//           font-weight: bold;
//           height: 34px;
//         }

//         .btn-green:hover {
//           background-color: #5d9d2d;
//         }

//         .btn-green:disabled {
//           background-color: #a3d47d;
//           cursor: not-allowed;
//         }

//         .board-title {
//           color: #333;
//           font-size: 18px;
//           margin-top: 30px;
//           margin-bottom: 15px;
//           font-weight: normal;
//         }

//         .receipt-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//           border: 1px solid #ddd;
//         }

//         .receipt-table th {
//           background-color: #f9f9f9;
//           text-align: left;
//           padding: 10px;
//           border: 1px solid #ddd;
//           color: #555;
//           font-weight: bold;
//         }

//         .receipt-table td {
//           padding: 10px;
//           border: 1px solid #ddd;
//           font-size: 14px;
//         }

//         .receipt-table tbody tr:nth-child(even) {
//           background-color: #f9f9f9;
//         }

//         .status-success {
//           color: #70b836;
//           font-weight: bold;
//         }

//         .print-action {
//           display: flex;
//           justify-content: flex-end;
//         }

//         .status-msg {
//           margin: 15px 0;
//           color: #666;
//         }

//         .error-msg {
//           margin: 15px 0;
//           color: #d9534f;
//           font-weight: bold;
//         }

//         @media print {
//           .card, .no-print {
//             display: none !important;
//           }
//         }
//       `}</style>

//       {/* Fee Form Card */}
//       <div className="card">
//         <div className="card-header">Fee Receipt By Pin</div>
//         <div className="card-body">
//           <div className="form-grid">
//             <div className="form-group">
//               <label>Payment Type:</label>
//               <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
//                <option value="None">Select Payment Type</option>
//                 <option value="Examination">Examination</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Fee Type:</label>
//               <select value={feeType} onChange={(e) => setFeeType(e.target.value)}>
//                 <option value="Regular">Regular</option>
//                 <option value="Backlog">Backlog</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Exam Month Year:</label>
//               <select
//                 value={selectedExamMonthYearId}
//                 onChange={(e) => setSelectedExamMonthYearId(e.target.value)}
//               >
//                 {examMonthYearList.map((item) => (
//                   <option key={item.Id} value={item.Id}>
//                     {item.ExamYearMonth}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>PIN :</label>
//               <input
//                 type="text"
//                 placeholder="24047-CS-023"
//                 value={pin}
//                 onChange={(e) => setPin(e.target.value)}
//               />
//             </div>

//             <div className="form-group btn-align">
//               <button className="btn-green" onClick={handleGetChallanNumbers} disabled={loading}>
//                 Get Challan Numbers
//               </button>
//             </div>
//           </div>

//           {/* Secondary Row: Challan Number Dropdown */}
//           {challanList.length > 0 && (
//             <div className="form-grid margin-top">
//               <div className="form-group">
//                 <label>Challan Numbers:</label>
//                 <select
//                   value={selectedChallanNo}
//                   onChange={(e) => setSelectedChallanNo(e.target.value)}
//                 >
//                   {challanList.map((item, index) => (
//                     <option key={index} value={item.ChalanaNumber}>
//                       {item.ChalanaNumber}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group btn-align">
//                 <button className="btn-green" onClick={handleGetDetails} disabled={loading}>
//                   Get Details
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {loading && <div className="status-msg">Loading...</div>}
//       {error && <div className="error-msg">{error}</div>}

//       {/* Receipt Output Details */}
//       {receiptData && (
//         <div className="receipt-output-section">
//           <h2 className="board-title">
//             STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA
//           </h2>

//           <table className="receipt-table">
//             <thead>
//               <tr>
//                 <th>Description</th>
//                 <th>Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Reference Number</td>
//                 <td>{receiptData.referenceNumber}</td>
//               </tr>
//               <tr>
//                 <td>Bank Transaction Number</td>
//                 <td>{receiptData.bankTxnNumber}</td>
//               </tr>
//               <tr>
//                 <td>Payment Status</td>
//                 <td className="status-success">{receiptData.paymentStatus}</td>
//               </tr>
//               <tr>
//                 <td>PIN</td>
//                 <td>{receiptData.pin}</td>
//               </tr>
//               <tr>
//                 <td>Exam Month Year</td>
//                 <td>{receiptData.examMonthYear || "NA"}</td>
//               </tr>
//               <tr>
//                 <td>Fee Amount</td>
//                 <td>{receiptData.feeAmount}</td>
//               </tr>
//               <tr>
//                 <td>Date</td>
//                 <td>{receiptData.date}</td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="print-action no-print">
//             <button className="btn-green" onClick={() => window.print()}>
//               Print
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import api, { apiErrorMessage } from "../api/client"; // Adjust import path to your api.js location

// const getExamMonthYear = async (feeType = "Regular") => {
//   const response = await api.get("/sbtet/fee/exam-month-year", {
//     params: { feeType },
//   });
//   return response.data;
// };

// const getChallanNumbers = async (examMonthYearId, pin) => {
//   const response = await api.get("/sbtet/fee/challan-numbers", {
//     params: { examMonthYearId, pin },
//   });
//   return response.data;
// };

// const getChallanDetails = async (chalanaNo) => {
//   const response = await api.get("/sbtet/fee/challan-details", {
//     params: { chalanaNo },
//   });
//   return response.data;
// };

// export default function FeeReceipt() {
//   // Navigation Tab State ("PIN" | "CHALLAN")
//   const [activeTab, setActiveTab] = useState("PIN");

//   // Tab 1: Fee Receipt By Pin Form State
//   const [paymentType, setPaymentType] = useState("Select Payment Type");
//   const [feeType, setFeeType] = useState("Regular");
//   const [examMonthYearList, setExamMonthYearList] = useState([]);
//   const [selectedExamMonthYearId, setSelectedExamMonthYearId] = useState("");
//   const [pin, setPin] = useState("");
//   const [challanList, setChallanList] = useState([]);
//   const [selectedChallanNo, setSelectedChallanNo] = useState("");

//   // Tab 2: Direct Challan Input State
//   const [directChallanNo, setDirectChallanNo] = useState("");

//   // Result & Status State
//   const [receiptData, setReceiptData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Reset results and status when switching tabs
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setReceiptData(null);
//     setError("");
//   };

//   // Fetch Exam Month/Year options when feeType changes
//   useEffect(() => {
//     if (activeTab !== "PIN") return;

//     const fetchDropdownData = async () => {
//       try {
//         setError("");
//         const res = await getExamMonthYear(feeType);
//         const list = res?.Table1 || [];
//         setExamMonthYearList(list);
//         if (list.length > 0) {
//           setSelectedExamMonthYearId(list[0].Id);
//         }
//       } catch (err) {
//         setError(apiErrorMessage(err, "Failed to load Exam Month/Year options."));
//       }
//     };

//     fetchDropdownData();
//   }, [feeType, activeTab]);

//   // Tab 1: Handler to fetch Challan Numbers list
//   const handleGetChallanNumbers = async () => {
//     if (!pin.trim()) {
//       setError("Please enter a valid PIN.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setReceiptData(null);
//       setChallanList([]);
//       setSelectedChallanNo("");

//       const res = await getChallanNumbers(selectedExamMonthYearId, pin);
//       const list = res?.Table || [];
//       setChallanList(list);

//       if (list.length === 0) {
//         setError("No challan numbers found for the entered PIN.");
//       }
//     } catch (err) {
//       setError(apiErrorMessage(err, "Failed to fetch Challan Numbers."));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Shared Handler: Fetch full details using a Challan Number
//   const handleFetchChallanDetails = async (challanNoToFetch) => {
//     if (!challanNoToFetch || !challanNoToFetch.trim()) {
//       setError("Please enter or select a Challan Number.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setReceiptData(null);

//       const res = await getChallanDetails(challanNoToFetch.trim());

//       if (res?.success && res?.receiptDetails) {
//         setReceiptData(res.receiptDetails);
//       } else {
//         setError("No receipt details found for this Challan Number.");
//       }
//     } catch (err) {
//       setError(apiErrorMessage(err, "Failed to fetch Challan Details."));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fee-receipt-container">
//       <style>{`
//         .fee-receipt-container {
//           font-family: Arial, sans-serif;
//           max-width: 1000px;
//           margin: 20px auto;
//           color: #333;
//         }

//         /* Top Navigation Tabs */
//         .tab-navigation {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 20px;
//           border-bottom: 1px solid #ddd;
//           padding-bottom: 0;
//         }

//         .tab-button {
//           background-color: transparent;
//           border: none;
//           color: #337ab7;
//           font-size: 15px;
//           font-weight: bold;
//           padding: 10px 20px;
//           cursor: pointer;
//           border-top-left-radius: 4px;
//           border-top-right-radius: 4px;
//           transition: all 0.2s ease-in-out;
//         }

//         .tab-button.active {
//           background-color: #31a7f1;
//           color: white;
//         }

//         /* Form Card */
//         .card {
//           border: 1px solid #bce8f1;
//           border-radius: 4px;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.08);
//           margin-bottom: 25px;
//           background-color: #fff;
//         }

//         .card-header {
//           background-color: #71b1d9;
//           color: white;
//           padding: 10px 15px;
//           font-weight: bold;
//           font-size: 15px;
//         }

//         .card-body {
//           padding: 20px;
//           background-color: #fcfcfc;
//         }

//         .form-grid {
//           display: flex;
//           flex-wrap: wrap;
//           align-items: flex-end;
//           gap: 15px;
//         }

//         .margin-top {
//           margin-top: 15px;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//         }

//         .form-group label {
//           font-size: 13px;
//           font-weight: bold;
//           margin-bottom: 6px;
//         }

//         .form-group input,
//         .form-group select {
//           padding: 6px 12px;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//           height: 36px;
//           min-width: 200px;
//           font-size: 14px;
//         }

//         .btn-green {
//           background-color: #70b836;
//           color: white;
//           border: none;
//           padding: 8px 18px;
//           border-radius: 4px;
//           cursor: pointer;
//           font-weight: bold;
//           height: 36px;
//           font-size: 14px;
//         }

//         .btn-green:hover {
//           background-color: #5d9d2d;
//         }

//         .btn-green:disabled {
//           background-color: #a3d47d;
//           cursor: not-allowed;
//         }

//         /* Receipt Display Table */
//         .board-title {
//           color: #333;
//           font-size: 18px;
//           margin-top: 30px;
//           margin-bottom: 15px;
//           font-weight: normal;
//         }

//         .receipt-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//           border: 1px solid #ddd;
//         }

//         .receipt-table th {
//           background-color: #f9f9f9;
//           text-align: left;
//           padding: 10px;
//           border: 1px solid #ddd;
//           color: #555;
//           font-weight: bold;
//         }

//         .receipt-table td {
//           padding: 10px;
//           border: 1px solid #ddd;
//           font-size: 14px;
//         }

//         .receipt-table tbody tr:nth-child(even) {
//           background-color: #f9f9f9;
//         }

//         .status-success {
//           color: #70b836;
//           font-weight: bold;
//         }

//         .print-action {
//           display: flex;
//           justify-content: flex-end;
//         }

//         .status-msg {
//           margin: 15px 0;
//           color: #666;
//         }

//         .error-msg {
//           margin: 15px 0;
//           color: #d9534f;
//           font-weight: bold;
//         }

//         @media print {
//           .tab-navigation, .card, .no-print {
//             display: none !important;
//           }
//         }
//       `}</style>

//       {/* Top Tabs Header */}
//       <div className="tab-navigation no-print">
//         <button
//           className={`tab-button ${activeTab === "PIN" ? "active" : ""}`}
//           onClick={() => handleTabChange("PIN")}
//         >
//           Fee Reciept By Pin
//         </button>
//         <button
//           className={`tab-button ${activeTab === "CHALLAN" ? "active" : ""}`}
//           onClick={() => handleTabChange("CHALLAN")}
//         >
//           Fee Reciept By Challan Number
//         </button>
//       </div>

//       {/* TAB 1: FEE RECEIPT BY PIN */}
//       {activeTab === "PIN" && (
//         <div className="card">
//           <div className="card-header">Fee Reciept By Pin</div>
//           <div className="card-body">
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Payment Type:</label>
//                 <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
//                 <option value="None">Select Payment Type</option>
//                   <option value="Examination">Examination</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Fee Type:</label>
//                 <select value={feeType} onChange={(e) => setFeeType(e.target.value)}>
//                   <option value="Regular">Regular</option>
//                   <option value="Backlog">Backlog</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Exam Month Year:</label>
//                 <select
//                   value={selectedExamMonthYearId}
//                   onChange={(e) => setSelectedExamMonthYearId(e.target.value)}
//                 >
//                   {examMonthYearList.map((item) => (
//                     <option key={item.Id} value={item.Id}>
//                       {item.ExamYearMonth}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>PIN :</label>
//                 <input
//                   type="text"
//                   placeholder="24047-CS-023"
//                   value={pin}
//                   onChange={(e) => setPin(e.target.value)}
//                 />
//               </div>

//               <div className="form-group btn-align">
//                 <button
//                   className="btn-green"
//                   onClick={handleGetChallanNumbers}
//                   disabled={loading}
//                 >
//                   Get Challan Numbers
//                 </button>
//               </div>
//             </div>

//             {/* Challan Dropdown Row */}
//             {challanList.length > 0 && (
//               <div className="form-grid margin-top">
//                 <div className="form-group">
//                   <label>Challan Numbers:</label>
//                   <select
//                     value={selectedChallanNo}
//                     onChange={(e) => setSelectedChallanNo(e.target.value)}
//                   >
//                     <option value="">Select Challan Number</option>
//                     {challanList.map((item, index) => (
//                       <option key={index} value={item.ChalanaNumber}>
//                         {item.ChalanaNumber}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group btn-align">
//                   <button
//                     className="btn-green"
//                     onClick={() => handleFetchChallanDetails(selectedChallanNo)}
//                     disabled={loading || !selectedChallanNo}
//                   >
//                     Get Details
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* TAB 2: FEE RECEIPT BY CHALLAN NUMBER */}
//       {activeTab === "CHALLAN" && (
//         <div className="card">
//           <div className="card-header">Fee Reciept By Challan Number</div>
//           <div className="card-body">
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Challan Number :</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Challan Number"
//                   value={directChallanNo}
//                   onChange={(e) => setDirectChallanNo(e.target.value)}
//                 />
//               </div>

//               <div className="form-group btn-align">
//                 <button
//                   className="btn-green"
//                   onClick={() => handleFetchChallanDetails(directChallanNo)}
//                   disabled={loading || !directChallanNo.trim()}
//                 >
//                   Get Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Status Messages */}
//       {loading && <div className="status-msg">Loading details...</div>}
//       {error && <div className="error-msg">{error}</div>}

//       {/* Receipt Output Details */}
//       {receiptData && (
//         <div className="receipt-output-section">
//           <h2 className="board-title">
//             STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA
//           </h2>

//           <table className="receipt-table">
//             <thead>
//               <tr>
//                 <th>Description</th>
//                 <th>Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Reference Number</td>
//                 <td>{receiptData.referenceNumber}</td>
//               </tr>
//               <tr>
//                 <td>Bank Transaction Number</td>
//                 <td>{receiptData.bankTxnNumber}</td>
//               </tr>
//               <tr>
//                 <td>Payment Status</td>
//                 <td className="status-success">{receiptData.paymentStatus}</td>
//               </tr>
//               <tr>
//                 <td>PIN</td>
//                 <td>{receiptData.pin}</td>
//               </tr>
//               <tr>
//                 <td>Exam Month Year</td>
//                 <td>{receiptData.examMonthYear || "NA"}</td>
//               </tr>
//               <tr>
//                 <td>Fee Amount</td>
//                 <td>{receiptData.feeAmount}</td>
//               </tr>
//               <tr>
//                 <td>Date</td>
//                 <td>{receiptData.date}</td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="print-action no-print">
//             <button className="btn-green" onClick={() => window.print()}>
//               Print
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }














































import React, { useState, useEffect } from "react";
import api, { apiErrorMessage } from "../api/client"; // Adjust import path to your api.js location
import { Weight } from "lucide-react";

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
  // feeType is kept internally (API needs it) but is not shown as a
  // separate field in this screen, to match the target design.
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
    <div className="fee-receipt-page">
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;600;700&display=swap');


        .fee-receipt-page {
          font-family: Arial, sans-serif;
          color: #333;
        }

      

        .page-header {
          background-color: #d9d9d9;
          padding: 12px 20px;
          font-weight: bold;
          font-size: 15px;
          color: #333;
        }

        .fee-receipt-container {
          max-width: 1000px;
          margin: 20px auto;
          padding: 0 15px;
        }

        /* Top Navigation Tabs */
        .tab-navigation {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 0;
        }

        // .tab-button {
        //   background-color: transparent;
        //   border: none;
        //   font-family: Arial, sans-serif;
        //   color: #337ab7;
        //   font-size: 14px;
        //   font-weight: 600;
        //   padding: 10px 20px;
        //   cursor: pointer;
        //   border-radius:5px;
        //   transition: all 0.2s ease-in-out;
        // }

        // .tab-button.active {
        //   background-color: #31a7f1;
        //   color: white;
        // }
        .tab-button {
  display: block;
  position: relative;
  padding: 10px 15px;
  margin: 0;

  background-color: transparent;
  color: #35A5F1;
  border: 1px solid transparent;
  border-radius: 4px;

  font-family: 'Muli', sans-serif;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.42857143;
  text-align: left;
  text-decoration: none;

  box-shadow: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.tab-button.active {
  background-color: #35A5F1 !important;
  color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px !important;
}

        /* Form Card */
        .card {
          border: 1px solid #bce8f1;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          margin-bottom: 25px;
          background-color: #fff;
        }

        // .card-header {
        //   background-color: #71b1d9;
        //   color: white;
        //   padding: 10px 15px;
        //   font-weight: bold;
        //   font-size: 15px;
        // }

        .card-header {
  color: #ffffff;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  background: #5ca0d3;
  padding: 6px 9px;
  font-weight: 50;
  margin-top: 0px;
}

        .card-body {
          padding: 20px;
          background-color: #fcfcfc;
        }

        .form-grid {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          gap: 15px;
        }

        .margin-top {
          margin-top: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          // margin-left:20px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 6px;
        }

        .form-group input,
        .form-group select {
          padding: 6px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          height: 36px;
          min-width: 200px;
          font-size: 14px;
        }

        // .btn-green {
        //   background-color: #70b836;
        //   color: white;
        //   border: none;
        //   padding: 8px 18px;
        //   border-radius: 4px;
        //   cursor: pointer;
        //   font-weight: bold;
        //   height: 36px;
        //   font-size: 14px;
        // }

        // .btn-green:hover {
        //   background-color: #5d9d2d;
        // }

        // .btn-green:disabled {
        //   background-color: #a3d47d;
        //   cursor: not-allowed;
        // }
.btn-green {
  display: inline-block;
  padding: 5px 20px;
  margin: 0;

  font-family: 'Muli', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #ffffff;
  text-align: center;
  text-decoration: none;

  background-color: rgb(124, 184, 47);
  border: none;
  border-radius: 2px;

  cursor: pointer;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;

  outline: none;
  -webkit-appearance: none;
}

.btn-green:hover {
  background-color: rgb(110, 165, 40);
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.2);
}

// .btn-green:active {
//   transform: translateY(1px);
//   box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
// }

.btn-green:disabled {
  background-color: #a3d47d;
  cursor: not-allowed;
}


        /* Receipt Display Table */
        .board-title {
          color: #333;
          font-size: 18px;
          margin-top: 30px;
          margin-bottom: 15px;
          font-weight: normal;
        }

        .receipt-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          border: 1px solid #ddd;
        }

        .receipt-table th {
          background-color: #f9f9f9;
          text-align: left;
          padding: 10px;
          border: 1px solid #ddd;
          color: #555;
          font-weight: bold;
        }

        .receipt-table td {
          padding: 10px;
          border: 1px solid #ddd;
          font-size: 14px;
        }

        .receipt-table tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .status-success {
          color: #70b836;
          font-weight: bold;
        }

        .print-action {
          display: flex;
          justify-content: flex-end;
        }

        .status-msg {
          margin: 15px 0;
          color: #666;
        }

        .error-msg {
          margin: 15px 0;
          color: #d9534f;
          font-weight: bold;
        }

        @media print {
          .page-topline, .page-header, .tab-navigation, .card, .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Breadcrumb */}
      <div
        className="-mx-3 sm:-mx-4 md:-mx-6 bg-[#d8dadc] px-4 sm:px-8 py-2 flex items-center mb-4"
        style={{ boxSizing: "border-box", marginTop: "-16px" }}
      >
        <h1
          className="m-0 text-[13px] sm:text-[14px] text-[#212529] leading-none"
          style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 700 }}
        >
          Download Fee Receipt
        </h1>
      </div>

      <div className="fee-receipt-container w-full max-w-[1240px] mx-auto py-2 sm:py-4">
        {/* Top Tabs Header */}
        <div className="tab-navigation no-print flex flex-wrap gap-2 mb-4">
          <button
            className={`tab-button ${activeTab === "PIN" ? "active" : ""}`}
            onClick={() => handleTabChange("PIN")}
          >
            Fee Receipt By Pin
          </button>
          <button
            className={`tab-button ${activeTab === "CHALLAN" ? "active" : ""}`}
            onClick={() => handleTabChange("CHALLAN")}
          >
            Fee Receipt By Challan Number
          </button>
        </div>

        {/* TAB 1: FEE RECEIPT BY PIN */}
        {activeTab === "PIN" && (
          <div className="card w-full">
            <div className="card-header font-bold text-sm">Fee Receipt By Pin</div>
            <div className="card-body">
              <div className="form-grid flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-end gap-3.5 sm:gap-4">
                <div className="form-group flex-1 min-w-[200px]">
                  <label style={{fontFamily: "'Muli', sans-serif",fontSize: "12px"}}>Payment Type:</label>
                  <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} style={{fontFamily: "'Muli', sans-serif",fontSize: "12px"}} className="w-full">
                    <option value="None">Select Payment Type</option>
                    <option value="Examination">Examination</option>
                  </select>
                </div>

                <div className="form-group flex-1 min-w-[200px]">
                  <label style={{fontFamily: "'Muli', sans-serif",fontSize: "12px"}}>Exam Month Year:</label>
                  <select style={{fontFamily: "'Muli', sans-serif",fontSize: "12px"}}
                    value={selectedExamMonthYearId}
                    onChange={(e) => setSelectedExamMonthYearId(e.target.value)}
                    className="w-full"
                  >
                    <option value="" style={{fontFamily: "'Muli', sans-serif",fontSize: "12px"}}>Select Exam Month Year</option>
                    {examMonthYearList.map((item) => (
                      <option key={item.Id} value={item.Id}>
                        {item.ExamYearMonth}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group flex-1 min-w-[200px]">
                  <label style={{fontFamily: "'Muli', sans-serif",fontSize: "12px"}}>PIN :</label>
                  <input
                    type="text"
                    placeholder="Enter Pin Number"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)} style={{fontFamily: "'Muli', sans-serif",fontSize: "12px"}}
                    className="w-full"
                  />
                </div>

                <div className="form-group btn-align w-full sm:w-auto">
                  <button
                    className="btn-green w-full sm:w-auto"
                    onClick={handleGetChallanNumbers}
                    disabled={loading}
                    style={{
                      fontFamily: '"Montserrat", "Open Sans", sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#ffffff',
                      backgroundColor: '#7cb342',
                      padding: '8px 16px',
                      borderRadius: '2px',
                      border: 'none',
                      cursor: 'pointer',
                      height: '36px',
                    }}
                  >
                    Get Challan Numbers
                  </button>
                </div>
              </div>

              {/* Challan Dropdown Row */}
              {challanList.length > 0 && (
                <div className="form-grid margin-top flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-end gap-3.5 sm:gap-4">
                  <div className="form-group flex-1 min-w-[200px]">
                    <label>Challan Numbers:</label>
                    <select  
                      value={selectedChallanNo}
                      onChange={(e) => setSelectedChallanNo(e.target.value)}
                      className="w-full"
                    >
                      <option value="">Select Challan Number</option>
                      {challanList.map((item, index) => (
                        <option key={index} value={item.ChalanaNumber}>
                          {item.ChalanaNumber}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group btn-align w-full sm:w-auto">
                    <button
                      className="btn-green w-full sm:w-auto"
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
          <div className="card w-full">
            <div className="card-header font-bold text-sm">Fee Receipt By Challan Number</div>
            <div className="card-body">
              <div className="form-grid flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-end gap-3.5 sm:gap-4">
                <div className="form-group flex-1 min-w-[200px]">
                  <label style={{fontFamily: "'Muli', sans-serif",fontSize: "12px"}}>Challan Number :</label>
                  <input
                    type="text"
                    placeholder="Enter Challan Number"
                    value={directChallanNo}
                    onChange={(e) => setDirectChallanNo(e.target.value)}
                    style={{fontFamily: "'Muli', sans-serif",fontSize: "12px"}}
                    className="w-full"
                  />
                </div>

                <div className="form-group btn-align w-full sm:w-auto">
                  <button
                    className="btn-green w-full sm:w-auto"
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
        {loading && <div className="status-msg">Loading details...</div>}
        {error && <div className="error-msg">{error}</div>}

        {/* Receipt Output Details */}
        {receiptData && (
          <div className="receipt-output-section overflow-x-auto">
            <h2 className="board-title">
              STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA
            </h2>

            <table className="receipt-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Reference Number</td>
                  <td>{receiptData.referenceNumber}</td>
                </tr>
                <tr>
                  <td>Bank Transaction Number</td>
                  <td>{receiptData.bankTxnNumber}</td>
                </tr>
                <tr>
                  <td>Payment Status</td>
                  <td className="status-success">{receiptData.paymentStatus}</td>
                </tr>
                <tr>
                  <td>PIN</td>
                  <td>{receiptData.pin}</td>
                </tr>
                <tr>
                  <td>Exam Month Year</td>
                  <td>{receiptData.examMonthYear || "NA"}</td>
                </tr>
                <tr>
                  <td>Fee Amount</td>
                  <td>{receiptData.feeAmount}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{receiptData.date}</td>
                </tr>
              </tbody>
            </table>

            <div className="print-action no-print">
              <button className="btn-green" onClick={() => window.print()}>
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}