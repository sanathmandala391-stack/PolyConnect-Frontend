import { useNavigate } from "react-router-dom";

export default function BackButton({ label = "Back", fallback = "/student/dashboard" }) {
  const navigate = useNavigate();

  function handleBack() {
    // If there's history to go back to, use it; otherwise go to a safe fallback
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gov-navy hover:text-gov-blue border border-gov-border hover:border-gov-blue bg-white px-3 py-1.5 rounded-xs transition-colors mb-3"
    >
      <i className="fa-solid fa-arrow-left text-[10px]" />
      {label}
    </button>
  );
}