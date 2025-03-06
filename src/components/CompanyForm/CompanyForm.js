import React, { useState } from 'react';

const CompanyForm = ({ onSubmit, onCancel, initialData }) => {
  const [companyData, setCompanyData] = useState({
    name: initialData?.name || '',
    industry: initialData?.industry || '',
    location: initialData?.location || '',
    logoUrl: initialData?.logoUrl || '',
    description: initialData?.description || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(companyData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-[100%] mx-auto mt-8 bg-white p-5">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {initialData ? 'Edit Company' : 'Add New Company'}
        </h2>
        
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={companyData.name}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="industry"
            value={companyData.industry}
            onChange={handleChange}
            placeholder="Industry"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="location"
            value={companyData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="url"
            name="logoUrl"
            value={companyData.logoUrl}
            onChange={handleChange}
            placeholder="Logo URL (optional)"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-6">
          <textarea
            name="description"
            value={companyData.description}
            onChange={handleChange}
            placeholder="Company Description (optional)"
            className="w-full px-3 py-2 border rounded-md h-32"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {initialData ? 'Update Company' : 'Add Company'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;