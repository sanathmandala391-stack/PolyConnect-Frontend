// import websiteLoadingGif from "../images/websiteloading.gif";

// export default function WebsiteLoader() {
//   return (
//     <div
//       className="fixed inset-0 z-[9999999] flex items-center justify-center bg-white select-none pointer-events-auto overflow-hidden"
//       style={{
//         minHeight: "100vh",
//         height: "100dvh",
//         width: "100vw",
//       }}
//     >
//       <div className="flex items-center justify-center p-4">
//         <img
//           src={websiteLoadingGif}
//           alt="Loading..."
//           className="w-[260px] xs:w-[300px] sm:w-[350px] md:w-[380px] max-w-[85vw] h-auto object-contain select-none pointer-events-none"
//         />
//       </div>
//     </div>
//   );
// }


import { createPortal } from "react-dom";
import websiteLoadingGif from "../images/websiteloading.gif";

export default function WebsiteLoader() {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999999] flex justify-center bg-white select-none pointer-events-auto overflow-hidden"
      style={{
        top: -200,
        left: 0,
        width: "100vw",
        height: "100dvh",
        paddingTop: "18vh",
      }}
    >
      <img
        src={websiteLoadingGif}
        alt="Loading..."
        className="h-auto object-contain select-none pointer-events-none"
        style={{
          width: "clamp(220px, 60vw, 580px)",
        }}
      />
    </div>,
    document.body
  );
}