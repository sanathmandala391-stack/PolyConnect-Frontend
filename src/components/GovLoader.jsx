import Loader from "../images/sbtetLoader.gif";

export default function GovLoader({
  size = 200,
  label = "",
  fullScreen = false,
  className = "",
}) {
  const content = (
    <div className={`flex flex-col items-center justify-center select-none bg-transparent ${className}`}>
      <img
        src={Loader}
        alt="Loading..."
        style={{
          width: size,
          height: size,
          maxWidth: "100%",
          backgroundColor: "transparent",
        }}
        className="object-contain bg-transparent"
      />
      {label && (
        <p className="text-xs font-bold text-[#092240] mt-3 tracking-wider uppercase animate-pulse text-center">
          {label}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/10 backdrop-blur-xs no-print">
        {content}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] w-full py-12 bg-transparent no-print">
      {content}
    </div>
  );
}