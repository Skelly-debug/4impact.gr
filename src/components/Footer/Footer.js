import React from "react";

function Footer() {
  return (
    <div className="relative bottom-0 left-0 w-full p-[2rem] bg-white z-50">
      <div className="flex justify-between items-center">
        <nav className="flex">
          <a
            href="/"
            className="text-lg mr-6 text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
          >
            Αρχική
          </a>
          <a
            href="/about"
            className="text-lg mr-6 text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
          >
            Σχετικά με εμάς
          </a>
          <a
            href="/news"
            className="text-lg mr-6 text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
          >
            Νέα
          </a>
          <a
            href="/contact"
            className="text-lg mr-6 text-neutral-900 font-semibold hover:text-neutral-300 transition ease-in-out duration-200"
          >
            Επικοινωνία
          </a>
        </nav>
        <div>
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
