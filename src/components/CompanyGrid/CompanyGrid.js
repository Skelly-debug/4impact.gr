"use client";
import React, { createContext, useState, useContext } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";

// Context for managing companies
const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([
    {
      id: '1',
      imgSrc: "https://i.ibb.co/wZw2rFQs/PXSOS.jpg",
      companyName: "Παιδικά Χωριά SOS",
      description: "Supporting children's welfare and community development.",
      websiteUrl: "https://sos-villages.gr/"
    },
    {
      id: '2',
      imgSrc: "https://i.ibb.co/KYbBGHF/IKBKK-1.jpg",
      companyName: "ΙΚΒΚΚ",
      description: "Committed to social impact and community support.",
      websiteUrl: "https://www.cvf.gr/"
    },
    {
      id: '2',
      imgSrc: "https://i.ibb.co/h1Mxbccc/OTPM.jpg",
      companyName: "Οδηγός της Πόλης μας",
      description: "Guiding our community to a brighter future.",
      websiteUrl: "https://www.facebook.com/odigostispolis"
    }
  ]);

  const addCompany = (newCompany) => {
    const company = { ...newCompany, id: Date.now().toString() };
    setCompanies([...companies, company]);
  };

  const removeCompany = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  return (
    <CompanyContext.Provider value={{ companies, addCompany, removeCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanies = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanies must be used within a CompanyProvider');
  }
  return context;
};

const CompanyGrid = () => {
  const { companies, removeCompany } = useCompanies();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="group relative">
            <CompanyCard 
              imgSrc={company.imgSrc}
              companyName={company.companyName}
              description={company.description}
              websiteUrl={company.websiteUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyGrid;