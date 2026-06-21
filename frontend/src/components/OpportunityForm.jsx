import { useEffect, useState } from "react";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiCurrencyRupee,
  HiCalendar,
  HiDocumentText,
} from "react-icons/hi";
import { MdBusiness } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function OpportunityForm({ initialData = null, onSubmit, loading, onCancel }) {
  const [formData, setFormData] = useState({
    customerName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    requirement: "",
    estimatedValue: "",
    stage: "New",
    priority: "Medium",
    nextFollowUpDate: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        customerName: initialData.customerName || "",
        contactName: initialData.contactName || "",
        contactEmail: initialData.contactEmail || "",
        contactPhone: initialData.contactPhone || "",
        requirement: initialData.requirement || "",
        estimatedValue: initialData.estimatedValue || "",
        stage: initialData.stage || "New",
        priority: initialData.priority || "Medium",
        nextFollowUpDate: initialData.nextFollowUpDate?.split("T")[0] || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="flex h-full max-h-[90vh] flex-col overflow-hidden rounded-xl bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? "Edit Opportunity" : "Create New Opportunity"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {initialData
              ? "Update the opportunity details below"
              : "Fill in the details to create a new opportunity"}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close form"
        >
          <IoClose className="h-6 w-6" />
        </button>
      </div>

      {/* Scrollable Form Content */}
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex-1 space-y-6 px-6 py-6">
          {/* Customer Information Section */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <MdBusiness className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">
                Customer Information
              </h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center text-sm font-medium text-gray-700">
                  Customer / Company Name
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Acme Corporation"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <MdBusiness className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 flex items-center text-sm font-medium text-gray-700">
                  Contact Person Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="e.g., John Doe"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <HiUser className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 flex items-center text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="contact@example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <HiMail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 flex items-center text-sm font-medium text-gray-700">
                  Contact Phone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <HiPhone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Opportunity Details Section */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <HiDocumentText className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">
                Opportunity Details
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center text-sm font-medium text-gray-700">
                  Requirement Summary
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <textarea
                  rows="3"
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  required
                  placeholder="Describe the customer's needs and requirements..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center text-sm font-medium text-gray-700">
                    Estimated Deal Value (₹)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="estimatedValue"
                      value={formData.estimatedValue}
                      onChange={handleChange}
                      min="0"
                      placeholder="50000"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <HiCurrencyRupee className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 flex items-center text-sm font-medium text-gray-700">
                    Next Follow-up Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="nextFollowUpDate"
                      value={formData.nextFollowUpDate}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <HiCalendar className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 flex items-center text-sm font-medium text-gray-700">
                    Stage
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 flex items-center text-sm font-medium text-gray-700">
                    Priority
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <HiDocumentText className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">
                Additional Notes
              </h3>
            </div>
            <textarea
              rows="4"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional information, comments, or observations..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <span>
                {initialData ? "Update Opportunity" : "Create Opportunity"}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OpportunityForm;
