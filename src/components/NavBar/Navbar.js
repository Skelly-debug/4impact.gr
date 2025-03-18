import { useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full p-[1rem] bg-white z-50 shadow-sm">
      <div className="flex justify-between items-center">
        <a
          href="/"
          className="flex items-center justify-end space-x-4 ml-0 lg:ml-[10rem] hover:scale-105 transition ease-in-out duration-300 cursor-pointer"
        >
          <img
            className="w-24 h-24 object-contain text-black"
            src="../images/logo.png"
            alt="Logo"
          />
        </a>
        <div className="lg:hidden">
          <button
            type="button"
            className="group relative w-12 h-12 flex items-center justify-center transition-all duration-300 ease-in-outactive:scale-75 active:rotate-12 transform hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-6 transform transition-transform duration-300 active:rotate-45">
              {isMobileMenuOpen ? (
                <>
                  <span className="absolute inset-0 flex items-center justify-center rotate-45 opacity-100 transition-all duration-300">
                    <span className="h-0.5 w-6 bg-neutral-800 block transform rotate-90"></span>
                    <span className="h-0.5 w-6 bg-neutral-800 block absolute"></span>
                  </span>
                </>
              ) : (
                <div className="space-y-1.5">
                  <span className="block h-0.5 w-6 bg-neutral-800 transition-all duration-300 group-hover:w-5 active:rotate-6"></span>
                  <span className="block h-0.5 w-6 bg-neutral-800 active:rotate-6"></span>
                  <span className="block h-0.5 w-6 bg-neutral-800 transition-all duration-300 group-hover:w-5 origin-right active:rotate-6"></span>
                </div>
              )}
            </div>
          </button>
          {isMobileMenuOpen && (
            <nav className="absolute top-28 right-0 w-full p-4 bg-gray-200 border-t-2 border-neutral-200 z-10">
              <ul className="space-y-4">
              <li>
                  <a
                    href="/"
                    className="text-lg text-neutral-800 font-semibold hover:bg-gray-300 rounded p-2 transition ease-in duration-200"
                  >
                    Αρχική
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="text-lg text-neutral-800 font-semibold hover:bg-gray-300 rounded p-2 transition ease-in duration-200"
                  >
                    Υπηρεσίες
                  </a>
                </li>
                {/* <li>
                  <a
                    href="/news"
                    className="text-lg text-neutral-800 font-semibold hover:bg-gray-300 rounded p-2 transition ease-in duration-200"
                  >
                    Blog
                  </a>
                </li> */}
                <li>
                  <a
                    href="/about/who-we-are"
                    className="text-lg text-neutral-800 font-semibold hover:bg-gray-300 rounded p-2 transition ease-in duration-200"
                  >
                    Σχετικά με εμάς
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-lg text-neutral-800 font-semibold hover:bg-gray-300 rounded p-2 transition ease-in duration-200"
                  >
                    Επικοινωνία
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <nav className="hidden lg:flex mr-0 md:mr-[10rem]">
          <a
            href="/"
            className="text-lg mr-6 text-neutral-800 font-semibold hover:text-neutral-600 transition ease-in duration-200"
          >
            Αρχική
          </a>
          <a
            href="/services"
            className="text-lg mr-6 text-neutral-800 font-semibold hover:text-neutral-600 transition ease-in duration-200"
          >
            Υπηρεσίες
          </a>
          {/* <a
            href="/news"
            className="text-lg mr-6 text-neutral-800 font-semibold hover:text-neutral-600 transition ease-in duration-200"
          >
            Blog
          </a> */}
          <a
            href="/about/who-we-are"
            className="text-lg mr-6 text-neutral-800 font-semibold hover:text-neutral-600 transition ease-in duration-200"
          >
            Σχετικά με εμάς
          </a>
          <a
            href="/contact"
            className="text-lg mr-6 text-neutral-800 font-semibold hover:text-neutral-600 transition ease-in duration-200"
          >
            Επικοινωνία
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;