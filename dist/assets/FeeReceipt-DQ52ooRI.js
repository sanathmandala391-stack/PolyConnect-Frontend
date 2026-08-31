import{r as s,j as e}from"./vendor-react-DYpwqP_f.js";import{b as f,a as b}from"./index-C2DCxLA2.js";import"./vendor-axios-CvK77KZ7.js";import"./vendor-stomp-Bj-Ivpwx.js";const I=async(l="Regular")=>(await b.get("/sbtet/fee/exam-month-year",{params:{feeType:l}})).data,L=async(l,o)=>(await b.get("/sbtet/fee/challan-numbers",{params:{examMonthYearId:l,pin:o}})).data,F=async l=>(await b.get("/sbtet/fee/challan-details",{params:{chalanaNo:l}})).data;function G(){const[l,o]=s.useState("PIN"),[h,k]=s.useState("None"),[u]=s.useState("Regular"),[S,A]=s.useState([]),[g,D]=s.useState(""),[d,E]=s.useState(""),[N,y]=s.useState([]),[x,j]=s.useState(""),[p,M]=s.useState(""),[r,c]=s.useState(null),[i,m]=s.useState(!1),[w,n]=s.useState(""),v=t=>{o(t),c(null),n("")};s.useEffect(()=>{if(l!=="PIN")return;(async()=>{try{n("");const a=await I(u),T=(a==null?void 0:a.Table1)||[];A(T)}catch(a){n(f(a,"Failed to load Exam Month/Year options."))}})()},[u,l]);const P=async()=>{if(!d.trim()){n("Please enter a valid PIN.");return}try{m(!0),n(""),c(null),y([]),j("");const t=await L(g,d),a=(t==null?void 0:t.Table)||[];y(a),a.length===0&&n("No challan numbers found for the entered PIN.")}catch(t){n(f(t,"Failed to fetch Challan Numbers."))}finally{m(!1)}},C=async t=>{if(!t||!t.trim()){n("Please enter or select a Challan Number.");return}try{m(!0),n(""),c(null);const a=await F(t.trim());a!=null&&a.success&&(a!=null&&a.receiptDetails)?c(a.receiptDetails):n("No receipt details found for this Challan Number.")}catch(a){n(f(a,"Failed to fetch Challan Details."))}finally{m(!1)}};return e.jsxs("div",{className:"fee-receipt-page w-full",children:[e.jsx("style",{children:`
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
      `}),e.jsx("div",{className:"page-breadcrumb -mx-3 sm:-mx-4 md:-mx-6 bg-[#d8dadc] px-4 sm:px-8 py-2 flex items-center mb-4",style:{boxSizing:"border-box",marginTop:"-16px"},children:e.jsx("h1",{className:"m-0 text-[13px] sm:text-[14px] text-[#212529] leading-none",style:{fontFamily:"'Mulish', 'Muli', sans-serif",fontWeight:700},children:"Download Fee Receipt"})}),e.jsxs("div",{className:"w-full max-w-[1240px] mx-auto py-1 sm:py-3",children:[e.jsxs("div",{className:"tab-nav-section no-print flex flex-wrap items-center gap-2 sm:gap-3 mb-4",children:[e.jsx("button",{type:"button",className:`tab-btn-base ${l==="PIN"?"tab-btn-active":"tab-btn-inactive"}`,onClick:()=>v("PIN"),children:"Fee Receipt By Pin"}),e.jsx("button",{type:"button",className:`tab-btn-base ${l==="CHALLAN"?"tab-btn-active":"tab-btn-inactive"}`,onClick:()=>v("CHALLAN"),children:"Fee Receipt By Challan Number"})]}),l==="PIN"&&e.jsxs("div",{className:"receipt-card w-full",children:[e.jsx("div",{className:"receipt-card-header",children:"Fee Receipt By Pin"}),e.jsxs("div",{className:"receipt-card-body",children:[e.jsxs("div",{className:"flex flex-col md:flex-row md:items-end gap-3.5 md:gap-3 lg:gap-4",children:[e.jsxs("div",{className:"w-full md:flex-1 md:min-w-[160px]",children:[e.jsx("label",{className:"form-label-style",children:"Payment Type:"}),e.jsxs("select",{value:h,onChange:t=>k(t.target.value),className:"form-control-style",children:[e.jsx("option",{value:"None",children:"Select Payment Type"}),e.jsx("option",{value:"Examination",children:"Examination"})]})]}),e.jsxs("div",{className:"w-full md:flex-1 md:min-w-[190px]",children:[e.jsx("label",{className:"form-label-style",children:"Exam Month Year:"}),e.jsxs("select",{value:g,onChange:t=>D(t.target.value),className:"form-control-style",children:[e.jsx("option",{value:"",children:"Select Exam Month Year"}),S.map(t=>e.jsx("option",{value:t.Id,children:t.ExamYearMonth},t.Id))]})]}),e.jsxs("div",{className:"w-full md:flex-1 md:min-w-[160px]",children:[e.jsx("label",{className:"form-label-style",children:"PIN :"}),e.jsx("input",{type:"text",placeholder:"Enter Pin Number",value:d,onChange:t=>E(t.target.value),className:"form-control-style"})]}),e.jsx("div",{className:"w-full md:w-auto mt-1 md:mt-0 flex shrink-0",children:e.jsx("button",{type:"button",className:"btn-green-action w-full md:w-auto",onClick:P,disabled:i,children:i?"Loading...":"Get Challan Numbers"})})]}),N.length>0&&e.jsxs("div",{className:"mt-4 pt-4 border-t border-gray-200 flex flex-col md:flex-row md:items-end gap-3.5 md:gap-3 lg:gap-4",children:[e.jsxs("div",{className:"w-full md:flex-1 md:min-w-[220px]",children:[e.jsx("label",{className:"form-label-style",children:"Challan Numbers:"}),e.jsxs("select",{value:x,onChange:t=>j(t.target.value),className:"form-control-style",children:[e.jsx("option",{value:"",children:"Select Challan Number"}),N.map((t,a)=>e.jsx("option",{value:t.ChalanaNumber,children:t.ChalanaNumber},a))]})]}),e.jsx("div",{className:"w-full md:w-auto mt-1 md:mt-0 flex shrink-0",children:e.jsx("button",{type:"button",className:"btn-green-action w-full md:w-auto",onClick:()=>C(x),disabled:i||!x,children:"Get Details"})})]})]})]}),l==="CHALLAN"&&e.jsxs("div",{className:"receipt-card w-full",children:[e.jsx("div",{className:"receipt-card-header",children:"Fee Receipt By Challan Number"}),e.jsx("div",{className:"receipt-card-body",children:e.jsxs("div",{className:"flex flex-col md:flex-row md:items-end gap-3.5 md:gap-3 lg:gap-4",children:[e.jsxs("div",{className:"w-full md:flex-1 md:min-w-[240px]",children:[e.jsx("label",{className:"form-label-style",children:"Challan Number :"}),e.jsx("input",{type:"text",placeholder:"Enter Challan Number",value:p,onChange:t=>M(t.target.value),className:"form-control-style"})]}),e.jsx("div",{className:"w-full md:w-auto mt-1 md:mt-0 flex shrink-0",children:e.jsx("button",{type:"button",className:"btn-green-action w-full md:w-auto",onClick:()=>C(p),disabled:i||!p.trim(),children:"Get Details"})})]})})]}),i&&e.jsx("div",{className:"text-gray-600 text-sm mt-3 font-medium",children:"Loading details..."}),w&&e.jsx("div",{className:"text-rose-600 text-sm mt-3 font-semibold",children:w}),r&&e.jsxs("div",{className:"receipt-output-section mt-6 bg-white border border-[#dddddd] rounded-sm p-4 sm:p-6 shadow-xs",children:[e.jsx("h2",{className:"board-title-text uppercase",children:"STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA"}),e.jsx("div",{className:"w-full overflow-x-auto",children:e.jsxs("table",{className:"receipt-data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-1/3",children:"Description"}),e.jsx("th",{className:"w-2/3",children:"Details"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"font-semibold text-gray-700",children:"Reference Number"}),e.jsx("td",{children:r.referenceNumber||"NA"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"font-semibold text-gray-700",children:"Bank Transaction Number"}),e.jsx("td",{children:r.bankTxnNumber||"NA"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"font-semibold text-gray-700",children:"Payment Status"}),e.jsx("td",{className:"text-[#70b836] font-bold",children:r.paymentStatus||"SUCCESS"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"font-semibold text-gray-700",children:"PIN"}),e.jsx("td",{className:"font-mono",children:r.pin||d})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"font-semibold text-gray-700",children:"Exam Month Year"}),e.jsx("td",{children:r.examMonthYear||"NA"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"font-semibold text-gray-700",children:"Fee Amount"}),e.jsx("td",{className:"font-semibold",children:r.feeAmount||"NA"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"font-semibold text-gray-700",children:"Date"}),e.jsx("td",{children:r.date||new Date().toLocaleDateString()})]})]})]})}),e.jsx("div",{className:"flex justify-end mt-4 no-print",children:e.jsx("button",{type:"button",className:"btn-green-action",onClick:()=>window.print(),children:"Print"})})]})]})]})}export{G as default};
