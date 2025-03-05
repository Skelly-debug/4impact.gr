"use client";

import React from "react";
import Navbar from "@/components/NavBar/Navbar";
import ArticleMonitoring from "@/components/ArticleMonitoring/ArticleMonitoring";
import CompanyForm from "@/components/CompanyForm/CompanyForm";

function AdminClient() {
  return (
    <div className=" bg-gray-300">
      <div className="font-playfair-display min-h-screen text-gray-800">
        <Navbar />
        <ArticleMonitoring />
        <CompanyForm />
      </div>
    </div>
  );
}

export default AdminClient;
