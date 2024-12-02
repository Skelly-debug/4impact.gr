import React from "react";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full p-[1rem] bg-white z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-end space-x-4 ml-0 lg:ml-[10rem]">
          <img
            className="w-12 h-12 object-cover text-black"
            src="https://placehold.co/600x400"
            alt="Logo"
          />
          <h1 className="text-2xl font-bold text-neutral-800 font-sans">
            4Impact
          </h1>
        </div>
        <nav className="hidden lg:flex mr-0 md:mr-[10rem]">
          <a
            href="/"
            className="text-lg mr-6 text-neutral-800 font-semibold hover:text-neutral-600 transition ease-in duration-200"
          >
            Αρχική
          </a>
          <a
            href="/news"
            className="text-lg mr-6 text-neutral-800 font-semibold hover:text-neutral-600 transition ease-in duration-200"
          >
            Νέα
          </a>
          <a
            href="/impact"
            className="text-lg mr-6 text-neutral-800 font-semibold hover:text-neutral-600 transition ease-in duration-200"
          >
            Impact
          </a>
          <a
            href="/about"
            className="text-lg mr-6 text-neutral-800 font-semibold hover:text-neutral-600 transition ease-in duration-200"
          >
            Σχετικά με εμάς
          </a>
          <a
            href="/contact"
            className="text-lg mr-6 text-neutral-800 font-semibold hover:text-neutral-600 transition ease-in duration-200"
          >
            Επικοινωνία
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
