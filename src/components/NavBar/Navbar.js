import { useState } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full p-[0.3rem] bg-ink/90 backdrop-blur-md border-b border-white/10 z-50">
      <div className="flex justify-between items-center max-w-[1400px] mx-auto px-4 md:px-12">
        <a
          href="/"
          className="flex items-center justify-end space-x-4 hover:scale-105 transition ease-in-out duration-300 cursor-pointer"
        >
          <img
            className="w-[4.25rem] h-[4.25rem] object-contain"
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
                    <span className="h-0.5 w-6 bg-white block transform rotate-90"></span>
                    <span className="h-0.5 w-6 bg-white block absolute"></span>
                  </span>
                </>
              ) : (
                <div className="space-y-1.5">
                  <span className="block h-0.5 w-6 bg-white transition-all duration-300 group-hover:w-5 active:rotate-6"></span>
                  <span className="block h-0.5 w-6 bg-white active:rotate-6"></span>
                  <span className="block h-0.5 w-6 bg-white transition-all duration-300 group-hover:w-5 origin-right active:rotate-6"></span>
                </div>
              )}
            </div>
          </button>
          {isMobileMenuOpen && (
            <nav className="absolute top-full right-0 w-full px-6 py-8 bg-ink border-t border-white/10 z-10">
              <ul className="space-y-3">
                <li>
                  <a
                    href="/"
                    className="relative inline-block text-2xl text-white font-black tracking-tight hover:text-brand py-1 transition ease-in duration-200"
                  >
                    Αρχική
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="relative inline-block text-2xl text-white font-black tracking-tight hover:text-brand py-1 transition ease-in duration-200"
                  >
                    Υπηρεσίες
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="relative inline-block text-2xl text-white font-black tracking-tight hover:text-brand py-1 transition ease-in duration-200"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/about/who-we-are"
                    className="relative inline-block text-2xl text-white font-black tracking-tight hover:text-brand py-1 transition ease-in duration-200"
                  >
                    Σχετικά με εμάς
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="relative inline-block text-2xl text-white font-black tracking-tight hover:text-brand py-1 transition ease-in duration-200"
                  >
                    Επικοινωνία
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <nav className="hidden lg:flex items-center">
          <a
            href="/"
            className="relative inline-block underline-80 text-[15px] mr-8 text-white/75 font-bold tracking-wide hover:text-white transition ease-in duration-200"
          >
            Αρχική
          </a>
          <a
            href="/services"
            className="relative inline-block underline-80 text-[15px] mr-8 text-white/75 font-bold tracking-wide hover:text-white transition ease-in duration-200"
          >
            Υπηρεσίες
          </a>
          <a
            href="/blog"
            className="relative inline-block underline-80 text-[15px] mr-8 text-white/75 font-bold tracking-wide hover:text-white transition ease-in duration-200"
          >
            Blog
          </a>
          <a
            href="/about/who-we-are"
            className="relative inline-block underline-80 text-[15px] mr-8 text-white/75 font-bold tracking-wide hover:text-white transition ease-in duration-200"
          >
            Σχετικά με εμάς
          </a>
          <a
            href="/contact"
            className="relative inline-block text-[15px] px-6 py-2.5 rounded-full bg-brand text-ink font-bold tracking-wide hover:bg-white transition ease-in duration-200"
          >
            Επικοινωνία
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;