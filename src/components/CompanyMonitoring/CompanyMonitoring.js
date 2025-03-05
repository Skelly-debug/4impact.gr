"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import CompanyForm from "../CompanyForm/CompanyForm";

const CompanyMonitoring = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/companies", {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch companies");

        const data = await response.json();
        setCompanies(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [session]);

  const handleDeleteCompany = async (companyId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const response = await fetch(`/api/companies?id=${companyId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Delete failed: ${errorText}`);
      }
  
      // Remove company from the state after successful deletion
      setCompanies((current) => current.filter((company) => company.id !== companyId));
  
      // Show success message
      alert("Company deleted successfully!");
  
    } catch (error) {
      console.error("Error deleting company:", error);
  
      // Show error message
      alert("Error deleting company: " + error.message);
    }
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/companies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingCompany.id,
          ...editingCompany,
          logoUrl: editingCompany.logoUrl || null,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Update failed: ${errorText}`);
      }
  
      const updatedCompany = await response.json();
      setCompanies(
        companies.map((company) =>
          company.id === updatedCompany.id ? updatedCompany : company
        )
      );
  
      // Close the modal
      setEditingCompany(null);
  
      // Show success message
      alert("Company updated successfully!");
  
    } catch (error) {
      console.error("Error updating company:", error);
  
      // Show error message
      alert("Error updating company: " + error.message);
    }
  };

  const handleAddCompany = async (newCompany) => {
    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken || ""}`,
        },
        body: JSON.stringify(newCompany),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      const addedCompany = await response.json();
      setCompanies((prev) => [addedCompany, ...prev]);
  
      // Close the modal
      setIsAddModalOpen(false);
  
      // Show success message
      alert("Company added successfully!");
  
    } catch (error) {
      console.error("Error adding company:", error);
  
      // Show error message
      alert("Error adding company: " + error.message);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return null;

  return (
    <div className="max-w-[98%] mx-auto pt-[6rem]">
      <div className="w-full bg-white shadow-md rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Company Management</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-[0.65rem] bg-blue-500 text-white rounded hover:bg-white hover:text-blue-500 border border-blue-500 transition"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="p-[0.4rem] bg-red-500 text-white rounded hover:bg-white hover:text-red-500 border border-red-500 transition ease-in-out duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-4">
          {companies.length === 0 ? (
            <p className="text-center text-gray-500">No companies found</p>
          ) : (
            <div className="space-y-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    {company.logoUrl && (
                      <img 
                        src={company.logoUrl} 
                        alt={`${company.name} logo`} 
                        className="w-16 h-16 object-contain"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{company.name}</h3>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                      <p className="text-sm text-gray-600">{company.location}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingCompany(company)}
                      className="p-2 border rounded hover:bg-gray-100 transition"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCompany(company.id)}
                      className="p-2 border rounded text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {editingCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-h-[80vh] w-[80vw] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Company</h2>
            <form onSubmit={handleUpdateCompany} className="space-y-4">
              <input
                type="text"
                value={editingCompany.name}
                onChange={(e) =>
                  setEditingCompany((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Company Name"
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="text"
                value={editingCompany.industry}
                onChange={(e) =>
                  setEditingCompany((prev) => ({
                    ...prev,
                    industry: e.target.value,
                  }))
                }
                placeholder="Industry"
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="text"
                value={editingCompany.location}
                onChange={(e) =>
                  setEditingCompany((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                placeholder="Location"
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="url"
                value={editingCompany.logoUrl || ""}
                onChange={(e) =>
                  setEditingCompany((prev) => ({
                    ...prev,
                    logoUrl: e.target.value,
                  }))
                }
                placeholder="Logo URL (optional)"
                className="w-full p-2 border rounded"
              />

              <textarea
                value={editingCompany.description || ""}
                onChange={(e) =>
                  setEditingCompany((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Company Description (optional)"
                className="w-full p-2 border rounded h-32"
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-h-[80vh] w-[80vw] overflow-y-auto">
            <CompanyForm
              onSubmit={handleAddCompany}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyMonitoring;