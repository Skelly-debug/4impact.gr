import React from "react";
import { Facebook, Instagram, Mail, Linkedin } from "lucide-react";

function Footer() {
  return (
    <div className="relative bottom-0 left-0 w-full px-6 py-10 md:px-12 md:py-12 bg-ink border-t-8 border-brand z-50 overflow-x-hidden">
      <div className="flex justify-between items-center max-w-[1304px] mx-auto">
        <nav className="flex items-center space-x-3 md:space-x-4 justify-start">
          <div className="flex space-x-3 md:space-x-4">
            <a
              href="mailto:info@4impact.gr"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/25 text-white hover:bg-brand hover:border-brand hover:text-ink transition ease-in-out duration-300"
            >
              <Mail className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            {/* <a
              href="https://www.instagram.com/4impact/"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/25 text-white hover:bg-brand hover:border-brand hover:text-ink transition ease-in-out duration-300"
            >
              <Instagram className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            */}
            <a
              href="https://www.facebook.com/profile.php?id=61574461771626"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/25 text-white hover:bg-brand hover:border-brand hover:text-ink transition ease-in-out duration-300"
            >
              <Facebook className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/4impact-communications/"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/25 text-white hover:bg-brand hover:border-brand hover:text-ink transition ease-in-out duration-300"
            >
              <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
            </a>
          </div>
        </nav>
        <div className="flex items-center justify-end">
          <img
            className="w-16 h-16 md:w-24 md:h-24 object-cover"
            src="../images/logo.png"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;