import { ArrowUp } from "lucide-react";

export default function GovFooter() {
  return (
    <footer
      id="contact-us"
      className="section footer-classic context-dark bg-image w-full mt-14 relative no-print"
      style={{ fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* Upper Footer Block */}
      <div className="bg-[#0b62a4] text-white py-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {/* Address Column */}
          <div>
            <h5 className="text-[18px] font-normal text-white mb-2 tracking-wide">Address:</h5>
            <dl className="contact-list m-0">
              <dt></dt>
              <dd className="text-[14px] text-white leading-relaxed m-0 font-normal">
                Sankethika Vidhya Bhavan, Masab Tank, Hyderabad – 500 028, India.
              </dd>
            </dl>
          </div>

          {/* Contacts Us Column */}
          <div>
            <h5 className="text-[18px] font-normal text-white mb-2 tracking-wide">Contacts Us</h5>
            <dl className="contact-list m-0">
              <dt className="text-[14px] font-normal text-white leading-relaxed m-0">
                Email : <span>
                  <a
                    href="mailto:sbtet-helpdesk@telangana.gov.in"
                    className="hover:underline"
                    style={{ color: "rgb(255, 255, 255)", fontSize: "14px" }}
                  >
                    sbtet-helpdesk@telangana.gov.in
                  </a>
                </span>
                <br />
                Phone : <span>
                  <a
                    href="tel:08031404549"
                    className="hover:underline"
                    style={{ color: "rgb(255, 255, 255)", fontSize: "14px" }}
                  >
                    08031404549
                  </a>
                </span>
              </dt>
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full relative" style={{ backgroundColor: "#2075ae" }}>
        <div className="max-w-[1350px] mx-auto py-3 px-4 sm:px-8 lg:px-12">
          <div className="site-info flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-white">
            {/* Copyright Text */}
            <span className="text-center md:text-left text-white font-normal">
              © {new Date().getFullYear()} State Board of Technical Education &amp; Training, Telangana. All rights reserved.
            </span>

            {/* Site Views Counter */}
            <div className="flex items-center select-none whitespace-nowrap">
              <span>Total Site Views: </span>
              <span
                className="site-visit font-bold"
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgb(0, 0, 0)",
                  letterSpacing: "10px",
                  marginLeft: "5px",
                  padding: "2px 0px 2px 8px",
                }}
              >
                1468929
              </span>
            </div>
          </div>
        </div>

        {/* Scroll to Top Circle Button */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute -top-4 right-6 sm:right-10 w-8 h-8 rounded-full bg-white text-black shadow-md flex items-center justify-center hover:bg-gray-100 transition-transform active:scale-95 cursor-pointer z-20 border border-gray-200"
          aria-label="Scroll to Top"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4 text-black stroke-[3]" />
        </button>
      </div>
    </footer>
  );
}
