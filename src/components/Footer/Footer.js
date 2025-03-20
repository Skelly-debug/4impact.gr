import React from "react";
import { Facebook, Instagram, Mail, Linkedin } from "lucide-react";

function Footer() {
  return (
    <div className="relative bottom-0 left-0 w-full p-4 md:p-8 bg-white z-50 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <nav className="flex items-center space-x-3 md:space-x-4 justify-start">
          <div className="flex space-x-3 md:space-x-4">
            <a
              href="mailto:info@4impact.gr"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-400 transition ease-in-out duration-300"
            >
              <Mail className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            {/* <a
              href="https://www.instagram.com/4impact/"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-400 transition ease-in-out duration-300"
            >
              <Instagram className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a
              href="https://www.facebook.com/4impact/"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-400 transition ease-in-out duration-300"
            >
              <Facebook className="h-5 w-5 md:h-6 md:w-6" />
            </a> */}
            <a
              href="https://www.linkedin.com/company/4impact-communications/"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-400 transition ease-in-out duration-300"
            >
              <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
            </a>
          </div>
        </nav>
        <div className="flex items-center justify-end">
          <img
            className="w-16 h-16 md:w-24 md:h-24 object-cover text-black"
            src="../images/logo.png"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;