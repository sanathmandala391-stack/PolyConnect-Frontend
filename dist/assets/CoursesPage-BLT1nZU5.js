import{u as I,r as a,j as e}from"./vendor-react-DYpwqP_f.js";import{c as E,d as F,e as M}from"./index-C2DCxLA2.js";import"./vendor-axios-CvK77KZ7.js";import"./vendor-stomp-Bj-Ivpwx.js";function Y(){const y=I(),[c,m]=a.useState("courses"),[l,j]=a.useState(()=>{try{const t=localStorage.getItem("pc_cache_courses");return t?JSON.parse(t):[]}catch{return[]}}),[h,N]=a.useState(()=>{try{return localStorage.getItem("pc_cache_acad_year")||""}catch{return""}}),[n,w]=a.useState(""),[u,S]=a.useState(()=>{try{return!localStorage.getItem("pc_cache_courses")}catch{return!0}}),[i,v]=a.useState(""),[C,k]=a.useState(null),[_,L]=a.useState([]),[x,f]=a.useState(!1),[d,p]=a.useState(""),[b,z]=a.useState(!1);a.useEffect(()=>{let t=!0;return(async()=>{try{const[r,o]=await Promise.all([E(),F()]);if(!t)return;j(r),N(o);try{localStorage.setItem("pc_cache_courses",JSON.stringify(r)),o&&localStorage.setItem("pc_cache_acad_year",o)}catch{}}catch{t&&l.length===0&&v("Failed to load courses. Please try again.")}finally{t&&S(!1)}})(),()=>{t=!1}},[]),a.useEffect(()=>{if(c!=="colleges"||b)return;(async()=>{try{f(!0),p("");const s=await M();L(s),z(!0)}catch{p("Failed to load college summary. Please try again.")}finally{f(!1)}})()},[c,b]);const g=a.useMemo(()=>{if(!n.trim())return l;const t=n.trim().toLowerCase();return l.filter(s=>{var r,o;return((r=s.branchCode)==null?void 0:r.toLowerCase().includes(t))||((o=s.branchName)==null?void 0:o.toLowerCase().includes(t))})},[l,n]);return e.jsxs("div",{className:"courses-page-wrapper w-full",children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;600;700&display=swap');

        .courses-page-wrapper {
          font-family: 'Muli', sans-serif;
          color: #333333;
          min-height: 100vh;
          width: 100%;
        }

        .academic-year-badge-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .academic-year-badge {
          background-color: #3c8dbc;
          color: #ffffff;
          font-weight: bold;
          font-size: 13px;
          padding: 8px 18px;
          border-radius: 4px;
          letter-spacing: 0.2px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .tab-row {
          display: flex;
          border-bottom: 1px solid #dee2e6;
          margin-bottom: 20px;
          gap: 4px;
        }

        .tab-item {
          padding: 8px 18px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          border: 1px solid transparent;
          border-bottom: none;
          background: none;
          outline: none;
          transition: all 0.15s ease;
        }

        .tab-item.active {
          background-color: #ffffff;
          border: 1px solid #dee2e6;
          border-bottom: 1px solid #ffffff;
          margin-bottom: -1px;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          color: #555555;
        }

        .tab-item.inactive {
          color: #007bff;
        }

        .tab-item.inactive:hover {
          color: #0056b3;
        }

        .search-section {
          margin-bottom: 18px;
        }

        .search-section label {
          display: block;
          font-size: 13px;
          margin-bottom: 6px;
          color: #212529;
          font-weight: 500;
        }

        .search-section input {
          width: 100%;
          max-width: 320px;
          padding: 7px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
          color: #495057;
          background-color: #ffffff;
          outline: none;
        }

        .search-section input:focus {
          border-color: #80bdff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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

        .courses-table tr:hover {
          background-color: #f3f8fd;
        }

        .courses-table tr.row-selected {
          background-color: #cce8ff !important;
        }

        .branch-link {
          font-family: 'Muli', sans-serif !important;
          color: #007bff;
          text-decoration: none;
          cursor: pointer;
          display: inline-block;
          font-weight: 500;
        }

        .branch-link:hover {
          text-decoration: underline;
          color: #0056b3;
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
      `}),e.jsx("div",{className:"-mx-3 sm:-mx-4 md:-mx-6 bg-[#d8dadc] px-4 sm:px-8 py-2 flex items-center mb-4",style:{boxSizing:"border-box",marginTop:"-16px"},children:e.jsx("h1",{className:"m-0 text-[13px] sm:text-[14px] text-[#212529] leading-none",style:{fontFamily:"'Mulish', sans-serif",fontWeight:700},children:"Home / Courses"})}),e.jsxs("div",{className:"w-full max-w-[1100px] mx-auto px-1 sm:px-4 py-2 sm:py-4",children:[h&&e.jsx("div",{className:"academic-year-badge-wrap",children:e.jsxs("div",{className:"academic-year-badge",children:["Data Shown for Current Academic Year : ",h]})}),e.jsxs("div",{className:"tab-row",children:[e.jsx("button",{type:"button",className:`tab-item ${c==="courses"?"active":"inactive"}`,onClick:()=>m("courses"),children:"Diploma Courses"}),e.jsx("button",{type:"button",className:`tab-item ${c==="colleges"?"active":"inactive"}`,onClick:()=>m("colleges"),children:"Colleges"})]}),c==="courses"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"search-section",children:[e.jsx("label",{htmlFor:"course-search",children:"Search"}),e.jsx("input",{id:"course-search",type:"text",placeholder:"Search by branch code or name...",value:n,onChange:t=>w(t.target.value)})]}),u&&e.jsx("div",{className:"status-msg",children:"Loading courses..."}),i&&e.jsx("div",{className:"error-msg",children:i}),!u&&!i&&e.jsx("div",{className:"courses-table-container",children:e.jsxs("table",{className:"courses-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"sno-col",children:"S.No"}),e.jsx("th",{children:"Branch"})]})}),e.jsxs("tbody",{children:[g.map((t,s)=>{const r=C===t.branchCode;return e.jsxs("tr",{className:r?"row-selected":"",onClick:()=>k(t.branchCode),children:[e.jsx("td",{className:"sno-col",children:s+1}),e.jsx("td",{children:e.jsxs("span",{className:"branch-link",onClick:o=>{o.stopPropagation(),y(`/courses/${t.branchCode}`)},children:[t.branchCode," - ",t.branchName]})})]},t.courseId||t.branchCode||s)}),g.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:2,className:"status-msg",children:"No branches match your search."})})]})]})})]}),c==="colleges"&&e.jsxs(e.Fragment,{children:[x&&e.jsx("div",{className:"status-msg",children:"Loading college summary..."}),d&&e.jsx("div",{className:"error-msg",children:d}),!x&&!d&&e.jsx("div",{className:"courses-table-container max-w-2xl",children:e.jsxs("table",{className:"courses-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-1/2",children:"Type"}),e.jsx("th",{className:"w-1/4",children:"Colleges"}),e.jsx("th",{className:"w-1/4",children:"Intake"})]})}),e.jsx("tbody",{children:_.map(t=>{const s=t.typeName==="Total";return e.jsxs("tr",{style:{backgroundColor:s?"#e5f3fa":"#ffffff"},children:[e.jsx("td",{style:{fontWeight:s?"700":"400"},children:t.typeName}),e.jsx("td",{style:{fontWeight:s?"700":"500",color:"#007bff"},children:t.collegeCount}),e.jsx("td",{style:{fontWeight:s?"700":"400"},children:t.totalIntake})]},t.typeName)})})]})})]})]})]})}export{Y as default};
