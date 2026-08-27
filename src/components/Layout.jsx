// import { Outlet } from "react-router-dom";
// import GovHeader from "./GovHeader";
// import GovFooter from "./GovFooter";
// import AnnouncementMarquee from "./AnnouncementMarquee";
// import WhatsNew from "../WhatsNew";

// export default function Layout() {
//   return (
//     <div className="min-h-screen flex flex-col bg-[#f8fafc]">
//       <GovHeader />
//       <WhatsNew />
      
//       {/* <AnnouncementMarquee /> */}
//       <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
//         <Outlet />
//       </main>
//       <GovFooter />
//     </div>
//   );
// }
import { Outlet, useLocation } from "react-router-dom";
import GovHeader from "./GovHeader";
import GovFooter from "./GovFooter";
import AnnouncementMarquee from "./AnnouncementMarquee";
import WhatsNew from "../WhatsNew";

export default function Layout() {
  const location = useLocation();

  // Check if current route is the home page ("/")
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <GovHeader />
      
      {/* Render WhatsNew ONLY if it's the home page */}
      {isHomePage && <WhatsNew />}
      
      {/* <AnnouncementMarquee /> */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <Outlet />
      </main>
      <GovFooter />
    </div>
  );
}
