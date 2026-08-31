import{i as f,u as b,r as l,j as e}from"./vendor-react-DYpwqP_f.js";import{f as j,d as N}from"./index-C2DCxLA2.js";import"./vendor-axios-CvK77KZ7.js";import"./vendor-stomp-Bj-Ivpwx.js";function k(){var m;const{branchCode:s}=f(),c=b(),[a,h]=l.useState([]),[n,p]=l.useState(""),[i,d]=l.useState(!0),[r,x]=l.useState("");l.useEffect(()=>{(async()=>{try{d(!0),x("");const[o,u]=await Promise.all([j(s),N()]);h(o),p(u)}catch{x("Failed to load colleges for this branch.")}finally{d(!1)}})()},[s]);const g=((m=a[0])==null?void 0:m.courseName)||s;return e.jsxs("div",{className:"courses-page-wrapper w-full",children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;600;700&display=swap');

        .courses-page-wrapper {
          font-family: 'Muli', sans-serif;
          color: #333333;
          min-height: 100vh;
          width: 100%;
        }

        .courses-table-container {
          width: 100%;
          overflow-x: auto;
        }

        .courses-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #212529;
          background-color: #ffffff;
        }

        .courses-table th,
        .courses-table td {
          border: 1px solid #212529;
          padding: 8px 12px;
          text-align: left;
          font-size: 13.5px;
          line-height: 1.45;
        }

        .courses-table th {
          background-color: #ffffff;
          color: #212529;
          font-weight: bold;
        }

        .courses-table td.sno-col,
        .courses-table th.sno-col {
          width: 60px;
          min-width: 50px;
          text-align: center;
        }

        .courses-table td.intake-col,
        .courses-table th.intake-col {
          width: 90px;
          min-width: 70px;
          text-align: left;
        }

        .courses-table td.code-col,
        .courses-table th.code-col {
          width: 120px;
          min-width: 90px;
        }

        .courses-table tr:hover {
          background-color: #f3f8fd;
        }

        .status-msg {
          padding: 24px;
          text-align: center;
          color: #666666;
          font-size: 14px;
        }

        .error-msg {
          padding: 16px;
          text-align: center;
          color: #d9534f;
          font-weight: bold;
          font-size: 14px;
        }
      `}),e.jsxs("div",{className:"-mx-3 sm:-mx-4 md:-mx-6 bg-[#d8dadc] px-4 sm:px-8 py-2 flex items-center mb-4 text-[13px] sm:text-[14px]",style:{boxSizing:"border-box",marginTop:"-16px"},children:[e.jsx("span",{className:"font-bold text-[#0b3b60] hover:underline cursor-pointer",onClick:()=>c("/"),children:"Home"}),e.jsx("span",{className:"mx-2 text-gray-500",children:"/"}),e.jsx("span",{className:"font-bold text-[#0b3b60] hover:underline cursor-pointer",onClick:()=>c("/courses"),children:"Courses"}),e.jsx("span",{className:"mx-2 text-gray-500",children:"/"}),e.jsx("span",{className:"text-gray-600 font-semibold",children:s})]}),e.jsxs("div",{className:"w-full max-w-[1100px] mx-auto px-1 sm:px-4 py-2 sm:py-4",children:[e.jsxs("h1",{className:"text-lg sm:text-2xl font-bold mb-1 text-[#212529]",children:[s," - ",g]}),n&&e.jsxs("p",{className:"text-xs sm:text-sm text-gray-600 mb-6 font-medium",children:["Colleges offering this branch for Academic Year ",n]}),i&&e.jsx("div",{className:"status-msg",children:"Loading colleges..."}),r&&e.jsx("div",{className:"error-msg",children:r}),!i&&!r&&e.jsx("div",{className:"courses-table-container",children:e.jsxs("table",{className:"courses-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"sno-col",children:"S.No"}),e.jsx("th",{className:"code-col",children:"College Code"}),e.jsx("th",{children:"College Name"}),e.jsx("th",{className:"intake-col",children:"Intake"})]})}),e.jsxs("tbody",{children:[a.map((t,o)=>e.jsxs("tr",{children:[e.jsx("td",{className:"sno-col",children:o+1}),e.jsx("td",{className:"code-col font-mono font-medium",children:t.collegeCode}),e.jsx("td",{children:t.collegeName}),e.jsx("td",{className:"intake-col",children:t.intake})]},t.collegeCode+o)),a.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"status-msg",children:"No colleges currently offer this branch."})})]})]})})]})]})}export{k as default};
