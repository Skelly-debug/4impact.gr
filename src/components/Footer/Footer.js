import React from "react";
import { Facebook, Instagram, Mail, Linkedin } from "lucide-react";

function Footer() {
  return (
    <div className="relative bottom-0 left-0 w-full p-[2rem] bg-white z-50 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <nav className="hidden lg:flex items-center space-x-4 space-y-4 justify-start">
          <div className="flex space-x-4">
            <a
              href="mailto:info@4impact.gr"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-400 transition ease-in-out duration-300"
            >
              <Mail className="mr-2 h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/4impact/"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-400 transition ease-in-out duration-300"
            >
              <Instagram className="mr-2 h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/4impact/"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-400 transition ease-in-out duration-300"
            >
              <Facebook className="mr-2 h-6 w-6" />
            </a>
            <a
              href="https://gr.linkedin.com/in/iasonkantas"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-400 transition ease-in-out duration-300"
            >
              <Linkedin className="mr-2 h-6 w-6" />
            </a>
          </div>
        </nav>
        <div className="flex items-center justify-end">
          <img
            className="w-24 h-24 object-cover text-black m-auto"
            src="../images/logo.png"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
