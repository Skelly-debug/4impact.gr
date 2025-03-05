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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Company' : 'Add New Company'}
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={companyData.name}
          onChange={handleChange}
          placeholder="Enter company name"
          className="mt-1 block w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
          Industry
        </label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={companyData.industry}
          onChange={handleChange}
          placeholder="Enter industry"
          className="mt-1 block w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={companyData.location}
          onChange={handleChange}
          placeholder="Enter company location"
          className="mt-1 block w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
          Logo URL (Optional)
        </label>
        <input
          type="url"
          id="logoUrl"
          name="logoUrl"
          value={companyData.logoUrl}
          onChange={handleChange}
          placeholder="Enter logo URL"
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Company Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={companyData.description}
          onChange={handleChange}
          placeholder="Enter company description"
          className="mt-1 block w-full p-2 border rounded h-32"
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
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {initialData ? 'Update Company' : 'Add Company'}
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;