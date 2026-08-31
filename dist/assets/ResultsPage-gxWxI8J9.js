import{j as e,P as H,r as a}from"./vendor-react-DYpwqP_f.js";import{u as O,G as Y,a as u}from"./index-C2DCxLA2.js";import{s as U}from"./sb-C0OETi26.js";import"./vendor-axios-CvK77KZ7.js";import"./vendor-stomp-Bj-Ivpwx.js";function _({result:d,examTypeId:x}){var b;if(!d)return null;const j=Number(x)===5,o=d.studentInfo||{},N=d.studentWiseReport||[],s=d.studentSGPACGPAInfo||null,l=d.studentSubjectTotal||null;function M(){window.print()}const S=o.ExamMonthYear||(l==null?void 0:l.AcadamicYear)||"DEC-2024",w=o.BranchCode?`C24-${S}`:S,z=o.Pin||"—",E=o.StudentName||o.Name||"—",F=o.BranchCode||o.BranchName||"—",r=o.Sem||o.SemYear||"—",f=o.ExamMonthYear||S,C=j?"Semester":o.ExamType||(Number(x)===2?"Mid-2":"Mid-1"),I=o.CollegeCode||"—",c=o.CollegeName||"GOVERNMENT POLYTECHNIC";return e.jsxs("div",{className:`
        w-full
        max-w-6xl
        mx-auto
        px-4
        sm:px-8
        py-6
        text-[#1a1a1a]
        marks-card-container
      `,children:[e.jsx("div",{className:"flex justify-end mb-3 no-print",children:e.jsxs("button",{id:"print-marks-card-btn",onClick:M,type:"button",className:`
            inline-flex
            items-center
            gap-1.5
            bg-[#1d72b8]
            hover:bg-[#155b94]
            text-white
            text-sm
            font-semibold
            px-4
            py-1.5
            rounded
            shadow-xs
            transition-colors
            cursor-pointer
          `,children:[e.jsx("span",{children:"Print"}),e.jsx(H,{className:"w-4 h-4"})]})}),e.jsxs("div",{className:"relative mb-6 pt-1",children:[e.jsx("div",{className:`
    sm:absolute
    sm:left-4
    sm:top-0
    flex
    justify-center
    sm:block
    mb-3
    sm:mb-0
  `,children:e.jsx("img",{src:U,alt:"SBTET Logo",className:"h-[88px] w-auto object-contain"})}),e.jsxs("div",{className:"text-center px-4 sm:px-24",children:[e.jsx("h1",{id:"board-title",className:`
              text-lg
              sm:text-xl
              md:text-2xl
              font-bold
              tracking-tight
              text-[#1a202c]
              uppercase
              leading-snug
            `,style:{fontFamily:"Roboto, sans-serif",fontWeight:10},children:"STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA"}),e.jsx("h2",{id:"document-title",className:`
              text-xl
              sm:text-2xl
              font-medium
              tracking-wide
              text-[#3f8876]
              mt-2
              uppercase
            `,children:j?`MARKS CARD ${w}`:"MARKS CARD"})]})]}),e.jsx("div",{id:"student-info-table-container",className:"overflow-x-auto mb-3",children:e.jsxs("table",{id:"student-info-table",className:`
            w-full
            border-collapse
            border
            border-black
            text-xs
            sm:text-sm
          `,children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-[#ecf2f7] text-[#111827]",children:[e.jsx("th",{className:"border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[18%]",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"PIN"}),e.jsx("th",{className:"border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[28%]",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"NAME"}),e.jsx("th",{className:"border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[12%]",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"BRANCH"}),e.jsx("th",{className:"border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[10%]",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"SEM"}),e.jsx("th",{className:"border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[20%]",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"EXAM MONTH YEAR"}),e.jsx("th",{className:"border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[12%]",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"EXAM"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{className:"text-center bg-white",children:[e.jsx("td",{className:"border border-black text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:z}),e.jsx("td",{className:"border border-black py-1.5 px-3 font-medium uppercase",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:E}),e.jsx("td",{className:"border border-black py-1.5 px-3 font-medium",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:F}),e.jsx("td",{className:"border border-black py-1.5 px-3 font-medium",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:r}),e.jsx("td",{className:"border border-black py-1.5 px-3 font-medium uppercase",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:f}),e.jsx("td",{className:"border border-black py-1.5 px-3 font-medium",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:C})]})})]})}),e.jsx("div",{id:"college-info-table-container",className:"overflow-x-auto mb-3",children:e.jsxs("table",{id:"college-info-table",className:`
            w-full
            border-collapse
            border
            border-black
            text-xs
            sm:text-sm
          `,children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-[#ecf2f7] text-[#111827]",children:[e.jsx("th",{className:"border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[22%]",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"COLLEGE CODE"}),e.jsx("th",{className:"border border-black py-1.5 px-3 font-bold text-center tracking-wider w-[78%]",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"COLLEGE NAME"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{className:"text-center bg-white",children:[e.jsx("td",{className:"border border-black py-1.5 px-3 font-medium font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:I}),e.jsx("td",{className:"border border-black py-1.5 px-3 font-medium uppercase",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:c})]})})]})}),e.jsx("div",{id:"subject-marks-table-container",className:"overflow-x-auto mb-5",children:j?e.jsxs("table",{id:"subject-marks-table",className:`
              w-full
              border-collapse
              border
              border-black
              text-xs
              sm:text-sm
            `,children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-[#ecf2f7] text-[#111827]",children:[e.jsx("th",{className:"border border-black py-1.5 px-1.5 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"SUBJECT CODE"}),e.jsx("th",{className:"border border-black py-1.5 px-2 font-bold text-left",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"SUBJECT NAME"}),e.jsx("th",{className:"border border-black py-1.5 px-1 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"COURSE CREDITS"}),e.jsx("th",{className:"border border-black py-1.5 px-1 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"MID SEM1 (20)"}),e.jsx("th",{className:"border border-black py-1.5 px-1 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"MID SEM2 (20)"}),e.jsx("th",{className:"border border-black py-1.5 px-1 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"INTERNAL (20)"}),e.jsx("th",{className:"border border-black py-1.5 px-1 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"END SEM (40)"}),e.jsx("th",{className:"border border-black py-1.5 px-1 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"SUBJECT TOTAL (100)"}),e.jsx("th",{className:"border border-black py-1.5 px-1 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"GRADE"}),e.jsx("th",{className:"border border-black py-1.5 px-1 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"GRADE POINTS EQUIV"}),e.jsx("th",{className:"border border-black py-1.5 px-1 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"CREDITS EARNED"}),e.jsx("th",{className:"border border-black py-1.5 px-1 font-bold text-center",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"TOTAL GRADE POINTS"})]})}),e.jsxs("tbody",{children:[N.map((n,h)=>e.jsxs("tr",{className:"bg-white hover:bg-slate-50/50",children:[e.jsx("td",{className:"border border-black py-1 px-1 text-center font-mono text-[11px] font-bold",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.Subject_Code||"—"}),e.jsx("td",{className:"border border-black py-1 px-2 text-left text-[11px] font-medium",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.SubjectName||"—"}),e.jsx("td",{className:"border border-black py-1 px-1 text-center font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.MaxCredits??"—"}),e.jsx("td",{className:"border border-black py-1 px-1 text-center font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.MID1_MARKS??"—"}),e.jsx("td",{className:"border border-black py-1 px-1 text-center font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.MID2_MARKS??"—"}),e.jsx("td",{className:"border border-black py-1 px-1 text-center font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.Internal_MARKS??"—"}),e.jsx("td",{className:"border border-black py-1 px-1 text-center font-mono font-semibold",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.EndSemMarks??"—"}),e.jsx("td",{className:"border border-black py-1 px-1 text-center font-mono font-bold",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.SubjectTotal??"—"}),e.jsx("td",{className:"border border-black py-1 px-1 text-center font-bold",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.HybridGrade??"—"}),e.jsx("td",{className:"border border-black py-1 px-1 text-center font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.GradePoint??"—"}),e.jsx("td",{className:"border border-black py-1 px-1 text-center font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.CreditsGained!=null?Number(n.CreditsGained).toFixed(2):"—"}),e.jsx("td",{className:"border border-black py-1 px-1 text-center font-mono font-bold",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.TotalGradePoints!=null?Number(n.TotalGradePoints).toFixed(2):"—"})]},h)),e.jsxs("tr",{className:"bg-[#ecf2f7] font-bold text-gray-800",children:[e.jsx("td",{colSpan:2,className:"border border-black py-1.5 px-3 text-right",children:"Semester Total:"}),e.jsx("td",{className:"border border-black py-1.5 px-1 text-center font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:(s==null?void 0:s.SgpaTotalCredits)??"—"}),e.jsx("td",{colSpan:7,className:"border border-black py-1.5 px-1 bg-white"}),e.jsx("td",{className:"border border-black py-1.5 px-1 text-center font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:(s==null?void 0:s.SgpaTotalCredits)??"—"}),e.jsx("td",{className:"border border-black py-1.5 px-1 text-center font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:(s==null?void 0:s.SgpaTotalPoints)??"—"})]}),e.jsxs("tr",{className:"bg-[#ecf2f7] font-bold text-gray-800",children:[e.jsx("td",{colSpan:2,className:"border border-black py-1.5 px-3 text-right",children:"Course Total:"}),e.jsx("td",{className:"border border-black py-1.5 px-1 text-center font-mono",children:(s==null?void 0:s.CgpaTotalCredits)??"—"}),e.jsx("td",{colSpan:7,className:"border border-black py-1.5 px-1 bg-white"}),e.jsx("td",{className:"border border-black py-1.5 px-1 text-center font-mono",children:(s==null?void 0:s.CgpaTotalCredits)??"—"}),e.jsx("td",{className:"border border-black py-1.5 px-1 text-center font-mono",children:(s==null?void 0:s.CgpaTotalPoints)??"—"})]}),e.jsxs("tr",{className:"font-bold",children:[e.jsxs("td",{colSpan:11,className:`
                    border
                    border-black
                    py-1.5
                    px-3
                    text-center
                    bg-[#ecf2f7]
                  `,children:["Semester Grade Point Average(SGPA)"," ","(",(s==null?void 0:s.SgpaTotalPoints)||"—","/",(s==null?void 0:s.SgpaTotalCredits)||"—",")"]}),e.jsx("td",{className:"border border-black py-1.5 px-1 text-center font-mono text-sm font-bold",children:(s==null?void 0:s.SGPA)??"—"})]}),e.jsxs("tr",{className:"font-bold",children:[e.jsx("td",{colSpan:11,className:`
                    border
                    border-black
                    py-1.5
                    px-3
                    text-center
                    bg-[#ecf2f7]
                  `,children:"Result"}),e.jsx("td",{className:`
                    border
                    border-black
                    py-1.5
                    px-1
                    text-center
                    text-sm
                    ${((b=l==null?void 0:l.Result)==null?void 0:b.toUpperCase())==="FAIL"?"text-red-600":"text-emerald-700"}
                  `,children:(l==null?void 0:l.Result)||"Pass"})]})]})]}):e.jsxs("table",{id:"subject-marks-table",className:`
              w-full
              border-collapse
              border
              border-black
              text-xs
              sm:text-sm
            `,children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-[#ecf2f7] text-[#111827]",children:[e.jsx("th",{className:`
                    border
                    border-black
                    py-1.5
                    px-3
                    font-bold
                    text-center
                    tracking-wider
                    w-[20%]
                  `,style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"SUBJECT CODE"}),e.jsx("th",{className:`
                    border
                    border-black
                    py-1.5
                    px-3
                    font-bold
                    text-center
                    tracking-wider
                    w-[65%]
                  `,style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"SUBJECT NAME"}),e.jsxs("th",{className:`
                    border
                    border-black
                    py-1
                    px-3
                    font-bold
                    text-center
                    tracking-wider
                    w-[15%]
                  `,children:[e.jsx("div",{style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:Number(x)===2?"MID SEM2":"MID SEM1"}),e.jsx("div",{className:"text-[11px] sm:text-xs font-semibold",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:700},children:"(20)"})]})]})}),e.jsx("tbody",{children:N.map((n,h)=>e.jsxs("tr",{id:`subject-row-${(n.Subject_Code||h).toString().toLowerCase()}`,className:"bg-white hover:bg-slate-50/50",children:[e.jsx("td",{className:"border border-black py-1.5 px-3 text-center font-medium font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.Subject_Code||"—"}),e.jsx("td",{className:"border border-black py-1.5 px-4 text-left font-medium",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:n.SubjectName||"—"}),e.jsx("td",{className:"border border-black py-1.5 px-3 text-center font-medium font-mono",style:{fontFamily:"'Mulish', sans-serif",fontSize:"13px",fontWeight:500,color:"#555"},children:Number(x)===2?n.MID2_MARKS??n.Marks??"—":n.MID1_MARKS??n.Marks??"—"})]},h))})]})}),e.jsxs("div",{id:"abbreviations-section",className:`
          text-xs
          sm:text-sm
          text-[#111827]
          mt-3
        `,children:[e.jsx("h3",{className:`
            font-bold
            text-[#111827]
            mb-2
            text-sm
          `,children:"Abbreviations"}),e.jsxs("div",{className:`
            grid
            grid-cols-2
            sm:grid-cols-4
            gap-y-1.5
            gap-x-4
          `,children:[e.jsxs("div",{className:"font-medium",children:[e.jsx("span",{className:"font-bold",children:"R"})," - Regular Exam"]}),e.jsxs("div",{className:"font-medium",children:[e.jsx("span",{className:"font-bold",children:"S"})," - Supplementary Exam"]}),e.jsxs("div",{className:"font-medium",children:[e.jsx("span",{className:"font-bold",children:"P"})," - Pass"]}),e.jsxs("div",{className:"font-medium",children:[e.jsx("span",{className:"font-bold",children:"F"})," - Fail"]}),e.jsxs("div",{className:"font-medium",children:[e.jsx("span",{className:"font-bold",children:"MP"})," - MalPractice"]}),e.jsxs("div",{className:"font-medium",children:[e.jsx("span",{className:"font-bold",children:"W"})," - Wanting"]}),e.jsxs("div",{className:"font-medium col-span-2",children:[e.jsx("span",{className:"font-bold",children:"UE"})," - Under Evaluation"]})]})]})]})}function X(){var A;const{user:d}=O(),[x,j]=a.useState([]),[o,N]=a.useState([]),[s,l]=a.useState([]),[M,S]=a.useState([]),[w,z]=a.useState(!0),[E,F]=a.useState("1"),[r,f]=a.useState({schemeCode:"C21",schemeSbtetId:"",examPassType:"Regular",semYearId:"",examTypeId:"1",pin:(d==null?void 0:d.pin)||"24047-CS-023",examMonthYearId:""}),[C,I]=a.useState(!1),[c,b]=a.useState(null),[n,h]=a.useState(""),[y,W]=a.useState(!1);a.useEffect(()=>{async function t(){try{const[i,g,L,P]=await Promise.all([u.get("/sbtet/discovery/schemes"),u.get("/sbtet/discovery/exam-types"),u.get("/sbtet/discovery/semesters"),u.get("/sbtet/discovery/exam-month-years")]),k=Array.isArray(i.data)?i.data:[],D=Array.isArray(g.data)?g.data:[],v=Array.isArray(L.data)?L.data:[],G=Array.isArray(P.data)?P.data:[];j(k),N(D),l(v);const R=G.filter(p=>p.active);S(R),k.length>0&&f(p=>({...p,schemeCode:k[0].schemeCode||"C21",schemeSbtetId:k[0].sbtetSchemeId||""})),v.length>0&&f(p=>({...p,semYearId:v[0].sbtetSchemeSemId??v[0].sequenceId??"1"})),R.length>0&&f(p=>({...p,examMonthYearId:R[0].sbtetId||""}))}catch{}finally{z(!1)}}t()},[]);const T=Number(r.examTypeId)===5||r.examTypeId==="Semester";function m(t,i){f(g=>({...g,[t]:i}))}async function B(t){t&&t.preventDefault(),h(""),b(null),I(!0),W(!0),F(r.examTypeId);try{let i;T?i=await u.get("/sbtet/results/semester",{params:{examMonthYearId:r.examMonthYearId||1,pin:r.pin.trim().toUpperCase(),schemeId:r.schemeSbtetId||1,semYearId:r.semYearId||1,studentTypeId:1}}):i=await u.get("/sbtet/results/mid",{params:{examTypeId:r.examTypeId||1,pin:r.pin.trim().toUpperCase(),schemeId:r.schemeSbtetId||1,semYearId:r.semYearId||1}}),b(i.data)}catch{b(null)}finally{W(!1)}}return w?e.jsx(Y,{label:"Loading SBTET diploma examination schemes…"}):e.jsxs("div",{className:"space-y-4 my-4",style:{fontFamily:"'Muli', sans-serif"},children:[e.jsx("style",{children:`
  @media print {
    /* Hide search forms, layout headers, and footers */
    .print\\:hidden, header, nav, footer {
      display: none !important;
    }

    /* Set tight 5mm page margins */
    @page {
      size: A4 portrait;
      margin: 5mm;
    }

    body {
      background: #fff !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Scale down the entire marks card container to fit on one page */
    .marks-card-container {
      transform: scale(0.88);
      transform-origin: top center;
      width: 100% !important;
      margin: 0 auto !important;
    }

    /* Reduce table cell padding and font sizes for print */
    table th, table td {
      padding: 2px 3px !important;
      font-size: 10px !important;
      line-height: 1.1 !important;
    }

    /* Prevent breaking table rows across pages */
    table, tr, td, th {
      page-break-inside: avoid !important;
    }

    /* Reduce space around abbreviations */
    .abbreviations-section {
      margin-top: 6px !important;
      font-size: 9px !important;
    }
  }
`}),e.jsxs("div",{className:"overflow-hidden print:hidden",children:[e.jsx("div",{style:{color:"#ffffff",fontSize:"14px",fontFamily:"'Open Sans', sans-serif",background:"#5ca0d3",padding:"6px 9px",fontWeight:600,marginTop:"0px",marginBottom:"5px"},children:"Diploma Results"}),e.jsx("form",{onSubmit:B,style:{backgroundColor:"#d5eef8",padding:"15px",overflow:"hidden"},children:e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",marginRight:"-15px",marginLeft:"-15px",color:"rgb(12, 84, 96)",backgroundColor:"transparent"},children:[e.jsxs("div",{className:"w-full md:w-1/6",style:{position:"relative",paddingRight:"15px",paddingLeft:"15px",marginBottom:"15px"},children:[e.jsx("label",{style:{display:"inline-block",marginBottom:"5px",fontSize:"14px",fontWeight:500,lineHeight:"21px",color:"rgb(12, 84, 96)"},children:"Scheme :"}),e.jsx("select",{value:r.schemeCode,onChange:t=>{const i=x.find(g=>g.schemeCode===t.target.value);m("schemeCode",t.target.value),i&&m("schemeSbtetId",i.sbtetSchemeId)},style:{display:"block",width:"100%",height:"34px",padding:"3.75px 7.5px",fontSize:"12px",lineHeight:1.5,color:"rgb(73, 80, 87)",backgroundColor:"rgb(255, 255, 255)",border:"0.8px solid rgb(206, 212, 218)",borderRadius:"4px",boxShadow:"inset 0 1px 1px rgba(0, 0, 0, 0.075)",boxSizing:"border-box",fontFamily:"'Muli', sans-serif"},children:x.length>0?x.map(t=>e.jsx("option",{value:t.schemeCode,children:t.schemeCode},t.id||t.schemeCode)):e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"C21",children:"C21"}),e.jsx("option",{value:"C24",children:"C24"}),e.jsx("option",{value:"C18",children:"C18"})]})})]}),e.jsxs("div",{className:"w-full md:w-1/6",style:{position:"relative",paddingRight:"15px",paddingLeft:"15px",marginBottom:"15px"},children:[e.jsx("label",{style:{display:"inline-block",marginBottom:"5px",fontSize:"14px",fontWeight:500,lineHeight:"21px",color:"rgb(12, 84, 96)"},children:"Exam Pass Type :"}),e.jsxs("select",{value:r.examPassType,onChange:t=>m("examPassType",t.target.value),style:{display:"block",width:"100%",height:"34px",padding:"3.75px 7.5px",fontSize:"12px",lineHeight:1.5,color:"rgb(73, 80, 87)",backgroundColor:"#fff",border:"0.8px solid rgb(206, 212, 218)",borderRadius:"4px",boxShadow:"inset 0 1px 1px rgba(0, 0, 0, 0.075)",boxSizing:"border-box",fontFamily:"'Muli', sans-serif"},children:[e.jsx("option",{value:"Regular",children:"Regular"}),e.jsx("option",{value:"Supplementary",children:"Supplementary"})]})]}),e.jsxs("div",{className:"w-full md:w-1/6",style:{position:"relative",paddingRight:"15px",paddingLeft:"15px",marginBottom:"15px"},children:[e.jsx("label",{style:{display:"inline-block",marginBottom:"5px",fontSize:"14px",fontWeight:500,lineHeight:"21px",color:"rgb(12, 84, 96)"},children:"Sem & Year :"}),e.jsx("select",{value:r.semYearId,onChange:t=>m("semYearId",t.target.value),style:{display:"block",width:"100%",height:"34px",padding:"3.75px 7.5px",fontSize:"12px",lineHeight:1.5,color:"rgb(73, 80, 87)",backgroundColor:"#fff",border:"0.8px solid rgb(206, 212, 218)",borderRadius:"4px",boxShadow:"inset 0 1px 1px rgba(0, 0, 0, 0.075)",boxSizing:"border-box",fontFamily:"'Muli', sans-serif"},children:s.length>0?s.map(t=>e.jsx("option",{value:t.sbtetSchemeSemId??t.sequenceId,children:t.semId},t.id||t.semId)):e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"1",children:"1SEM"}),e.jsx("option",{value:"2",children:"2SEM"}),e.jsx("option",{value:"3",children:"3SEM"}),e.jsx("option",{value:"4",children:"4SEM"}),e.jsx("option",{value:"5",children:"5SEM"}),e.jsx("option",{value:"6",children:"6SEM"})]})})]}),e.jsxs("div",{className:"w-full md:w-1/6",style:{position:"relative",paddingRight:"15px",paddingLeft:"15px",marginBottom:"15px"},children:[e.jsx("label",{style:{display:"inline-block",marginBottom:"5px",fontSize:"14px",fontWeight:500,lineHeight:"21px",color:"rgb(12, 84, 96)"},children:"Exam :"}),e.jsxs("select",{value:r.examTypeId,onChange:t=>m("examTypeId",t.target.value),style:{display:"block",width:"100%",height:"34px",padding:"3.75px 7.5px",fontSize:"12px",lineHeight:1.5,color:"rgb(73, 80, 87)",backgroundColor:"#fff",border:"0.8px solid rgb(206, 212, 218)",borderRadius:"4px",boxShadow:"inset 0 1px 1px rgba(0, 0, 0, 0.075)",boxSizing:"border-box",fontFamily:"'Muli', sans-serif"},children:[e.jsx("option",{value:"1",children:"Mid1"}),e.jsx("option",{value:"2",children:"Mid2"}),e.jsx("option",{value:"5",children:"Semester"})]})]}),T&&e.jsxs("div",{className:"w-full md:w-1/6",style:{position:"relative",paddingRight:"15px",paddingLeft:"15px",marginBottom:"15px"},children:[e.jsx("label",{style:{display:"inline-block",marginBottom:"5px",fontSize:"14px",fontWeight:500,lineHeight:"21px",color:"rgb(12, 84, 96)"},children:"Exam Month / Year :"}),e.jsx("select",{value:r.examMonthYearId,onChange:t=>m("examMonthYearId",t.target.value),style:{display:"block",width:"100%",height:"34px",padding:"3.75px 7.5px",fontSize:"12px",lineHeight:1.5,color:"rgb(73, 80, 87)",backgroundColor:"#fff",border:"0.8px solid rgb(206, 212, 218)",borderRadius:"4px",boxShadow:"inset 0 1px 1px rgba(0, 0, 0, 0.075)",boxSizing:"border-box",fontFamily:"'Muli', sans-serif"},children:M.length>0?M.map(t=>e.jsx("option",{value:t.sbtetId,children:t.examYearMonth||t.description||t.sbtetId},t.sbtetId||t.id)):e.jsx("option",{value:"1",children:"APR/MAY 2024"})})]}),e.jsxs("div",{className:"w-full md:w-1/6",style:{position:"relative",paddingRight:"15px",paddingLeft:"15px",marginBottom:"15px"},children:[e.jsx("label",{style:{display:"inline-block",marginBottom:"5px",fontSize:"14px",fontWeight:500,lineHeight:"21px",color:"rgb(12, 84, 96)"},children:"Pin Number :"}),e.jsx("input",{type:"text",value:r.pin,onChange:t=>m("pin",t.target.value.toUpperCase()),placeholder:"Enter PIN",required:!0,style:{display:"block",width:"100%",height:"34px",padding:"3.75px 7.5px",fontSize:"12px",lineHeight:1.5,color:"rgb(73, 80, 87)",backgroundColor:"#fff",border:"0.8px solid rgb(206, 212, 218)",borderRadius:"4px",boxShadow:"inset 0 1px 1px rgba(0, 0, 0, 0.075)",boxSizing:"border-box",fontFamily:"'Muli', sans-serif"}})]}),e.jsx("div",{style:{width:"100%",flex:"0 0 100%",maxWidth:"100%",paddingRight:"15px",paddingLeft:"15px",marginTop:"3px"},children:e.jsx("div",{style:{marginTop:"18px",textAlign:"left",marginLeft:"40px"},children:e.jsxs("button",{type:"submit",disabled:y,style:{display:"inline-block",color:"rgb(255, 255, 255)",backgroundColor:"rgb(40, 134, 205)",border:"0.8px solid rgb(0, 123, 255)",padding:"2.5px 5px",fontSize:"16px",lineHeight:"24px",borderRadius:"2px",boxShadow:"0 2px 10px 0 rgba(0, 0, 0, 0.12)",cursor:y?"not-allowed":"pointer",textAlign:"center",fontFamily:"'Muli', sans-serif",opacity:y?.7:1},children:["Get Report",e.jsx("span",{style:{marginLeft:"5px"},children:e.jsx("i",{className:"fa fa-arrow-down"})})]})})})]})})]}),y&&e.jsx(Y,{size:56}),C&&!y&&(!c||!c.studentWiseReport||c.studentWiseReport.length===0)&&e.jsxs("div",{className:"bg-white border border-gray-200 py-16 px-4 text-center flex flex-col items-center justify-center gap-2 shadow-xs",children:[e.jsx("div",{className:"w-14 h-14 text-slate-300 flex items-center justify-center",children:e.jsx("svg",{className:"w-12 h-12",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"})})}),e.jsx("p",{className:"text-red-600 font-sans font-bold text-base md:text-lg",children:"No Result Found"})]}),!y&&((A=c==null?void 0:c.studentWiseReport)==null?void 0:A.length)>0&&e.jsx(_,{result:c,examTypeId:E})]})}export{X as default};
