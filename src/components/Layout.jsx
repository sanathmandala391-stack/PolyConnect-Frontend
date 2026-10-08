import { Outlet } from "react-router-dom";
import GovHeader from "./GovHeader";
import GovFooter from "./GovFooter";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <GovHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 pt-2 pb-6">
        <Outlet />
      </main>
      <GovFooter />
    </div>
  );
}

// This is th code of the Layout //