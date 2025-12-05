"use client";

import React from "react";
import Navbar from "@/components/NavBar/Navbar";
import ArticleMonitoring from "@/components/ArticleMonitoring/ArticleMonitoring";

function AdminClient() {
  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="font-playfair-display text-gray-800">
        <Navbar />
        
        {/* Added a main wrapper with top padding/margin */}
        <main className="pt-24 pb-10 px-4">
          <ArticleMonitoring />
        </main>
      </div>
    </div>
  );
}

export default AdminClient;