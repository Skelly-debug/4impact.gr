import React from "react";
import { Facebook, Instagram, Mail } from "lucide-react";

function Footer() {
  return (
    <div className="relative bottom-0 left-0 w-full p-[2rem] bg-white z-50 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <nav className="hidden lg:flex items-center space-x-4 space-y-4 justify-start">
          <div className="flex space-x-4">
            <a
              href="mailto:info@4impact.gr"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
            >
              <Mail className="mr-2 h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/4impact/"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
            >
              <Instagram className="mr-2 h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/4impact/"
              className="text-lg text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
            >
              <Facebook className="mr-2 h-6 w-6" />
            </a>
          </div>
        </nav>
        <nav className="hidden lg:flex items-center space-x-4 justify-center">
          <a
            href="/"
            className="text-lg text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
          >
            Αρχική
          </a>
          <a
            href="/news"
            className="text-lg text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
          >
            Νέα
          </a>
          <a
            href="/impact"
            className="text-lg text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
          >
            Impact
          </a>
          <a
            href="/about"
            className="text-lg text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
          >
            Σχετικά με εμάς
          </a>
          <a
            href="/contact"
            className="text-lg text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
          >
            Επικοινωνία
          </a>
        </nav>
        <div className="flex items-center justify-end">
          <img
            className="w-12 h-12 object-cover text-black m-auto"
            src="https://placehold.co/600x400"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;