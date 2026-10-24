import { Outlet, useLocation } from "react-router-dom";
import GovHeader from "./GovHeader";
import GovFooter from "./GovFooter";

export default function Layout() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isFullWidthPage =
    path.startsWith("/contact-us") ||
    path.startsWith("/contactus") ||
    path.startsWith("/sitemap") ||
    path.startsWith("/site-map") ||
    path.startsWith("/tenders") ||
    path.startsWith("/tender") ||
    path.startsWith("/rti");

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] w-full max-w-full overflow-x-hidden">
      <GovHeader />
      <main className={isFullWidthPage ? "flex-1 w-full" : "flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 pt-2 pb-6"}>
        <Outlet />
      </main>
      <GovFooter />
    </div>
  );
}

// This is th code of the Layout //