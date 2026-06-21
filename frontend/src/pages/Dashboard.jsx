import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import Navbar from "../components/Navbar";
import OpportunityCard from "../components/OpportunityCard";
import { toastSuccess } from "../utils/toast";
import OpportunityForm from "../components/OpportunityForm";
import {
  HiPlus,
  HiEye,
  HiTrash,
  HiCurrencyRupee,
  HiUser,
  HiMail,
  HiPhone,
  HiCalendar,
  HiDocumentText,
  HiSearch,
  HiFilter,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { MdBusiness, MdInbox } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function Dashboard() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [viewOpportunity, setViewOpportunity] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(null);

  // Pagination, Search, and Filter States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [showMyOnly, setShowMyOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 9; // Items per page

  async function getOpportunities() {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit,
        search: searchQuery,
        stage: stageFilter,
        priority: priorityFilter,
        owner: showMyOnly ? "me" : "",
      };

      const { data } = await axiosInstance.get("/opportunities", { params });
      setOpportunities(data.opportunities);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOpportunities();
  }, [currentPage, searchQuery, stageFilter, priorityFilter, showMyOnly]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchQuery, stageFilter, priorityFilter, showMyOnly]);

  async function handleView(id) {
    try {
      setViewLoading(true);
      const { data } = await axiosInstance.get(`/opportunities/${id}`);
      setViewOpportunity(data.opportunity);
      setShowViewModal(true);
    } finally {
      setViewLoading(false);
    }
  }

  async function handleCreateOpportunity(formData) {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/opportunities", formData);
      toastSuccess(data.message);
      setCurrentPage(1); // Reset to first page
      getOpportunities();
      setShowModal(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateOpportunity(formData) {
    try {
      setLoading(true);
      const { data } = await axiosInstance.put(
        `/opportunities/${editingOpportunity._id}`,
        formData,
      );
      toastSuccess(data.message);
      getOpportunities();
      setEditingOpportunity(null);
      setShowModal(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      const { data } = await axiosInstance.delete(
        `/opportunities/${selectedOpportunityId}`,
      );
      toastSuccess(data.message);
      getOpportunities();
      setShowDeleteModal(false);
      setSelectedOpportunityId(null);
    } catch (error) {}
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setStageFilter("");
    setPriorityFilter("");
    setShowMyOnly(false);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Stage color mapping
  const stageColors = {
    New: "bg-blue-100 text-blue-700 border-blue-200",
    Contacted: "bg-purple-100 text-purple-700 border-purple-200",
    Qualified: "bg-cyan-100 text-cyan-700 border-cyan-200",
    "Proposal Sent": "bg-indigo-100 text-indigo-700 border-indigo-200",
    Won: "bg-green-100 text-green-700 border-green-200",
    Lost: "bg-gray-100 text-gray-700 border-gray-200",
  };

  // Priority color mapping
  const priorityColors = {
    Low: "bg-slate-100 text-slate-700 border-slate-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    High: "bg-red-100 text-red-700 border-red-200",
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Opportunity Pipeline
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track and manage your sales opportunities
                {totalCount > 0 && (
                  <span className="ml-1 font-medium text-gray-700">
                    ({totalCount} total)
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={() => {
                setEditingOpportunity(null);
                setShowModal(true);
              }}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <HiPlus className="h-5 w-5" />
              <span>Create Opportunity</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, contact, email, or requirement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 rounded-full p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                  <IoClose className="h-5 w-5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                stageFilter || priorityFilter || showMyOnly
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <HiFilter className="h-5 w-5" />
              <span>Filters</span>
              {(stageFilter || priorityFilter || showMyOnly) && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {(stageFilter ? 1 : 0) + (priorityFilter ? 1 : 0) + (showMyOnly ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  Filter Options
                </h3>
                {(stageFilter || priorityFilter || showMyOnly) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* My Opportunities Toggle */}
              <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <label className="flex cursor-pointer items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HiUser className="h-5 w-5 text-blue-600" />
                    <div>
                      <span className="block text-sm font-medium text-gray-900">
                        My Opportunities Only
                      </span>
                      <span className="block text-xs text-gray-500">
                        Show only opportunities you own
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={showMyOnly}
                      onChange={(e) => setShowMyOnly(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2"></div>
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Stage Filter */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Stage
                  </label>
                  <select
                    value={stageFilter}
                    onChange={(e) => setStageFilter(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">All Stages</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Priority
                  </label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="mb-4 h-6 w-3/4 rounded bg-gray-200"></div>
                <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
                <div className="mb-4 h-4 w-2/3 rounded bg-gray-200"></div>
                <div className="mb-4 flex gap-2">
                  <div className="h-6 w-20 rounded-full bg-gray-200"></div>
                  <div className="h-6 w-20 rounded-full bg-gray-200"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : opportunities.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <MdInbox className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              {searchQuery || stageFilter || priorityFilter || showMyOnly
                ? "No Matches Found"
                : "No Opportunities Yet"}
            </h3>
            <p className="mb-6 max-w-md text-sm text-gray-500">
              {searchQuery || stageFilter || priorityFilter || showMyOnly
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Get started by creating your first opportunity to track leads and manage your sales pipeline effectively."}
            </p>
            {searchQuery || stageFilter || priorityFilter || showMyOnly ? (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingOpportunity(null);
                  setShowModal(true);
                }}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <HiPlus className="h-5 w-5" />
                <span>Create First Opportunity</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Opportunity Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {opportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity._id}
                  opportunity={opportunity}
                  onView={() => handleView(opportunity._id)}
                  onEdit={() => {
                    setEditingOpportunity(opportunity);
                    setShowModal(true);
                  }}
                  onDelete={() => {
                    setSelectedOpportunityId(opportunity._id);
                    setShowDeleteModal(true);
                  }}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-4 sm:px-6 rounded-lg">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {(currentPage - 1) * limit + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(currentPage * limit, totalCount)}
                      </span>{" "}
                      of <span className="font-medium">{totalCount}</span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <HiChevronLeft className="h-5 w-5" />
                      </button>
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        // Show first page, last page, current page, and pages around current
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 &&
                            pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 ${
                                currentPage === pageNumber
                                  ? "z-10 border-blue-600 bg-blue-50 text-blue-600"
                                  : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          pageNumber === currentPage - 2 ||
                          pageNumber === currentPage + 2
                        ) {
                          return (
                            <span
                              key={pageNumber}
                              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <HiChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-4xl animate-scale-in">
            <OpportunityForm
              initialData={editingOpportunity}
              loading={loading}
              onCancel={() => {
                setShowModal(false);
                setEditingOpportunity(null);
              }}
              onSubmit={
                editingOpportunity
                  ? handleUpdateOpportunity
                  : handleCreateOpportunity
              }
            />
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl animate-scale-in overflow-hidden rounded-xl h-[96%] bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <HiEye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Opportunity Details
                  </h2>
                  <p className="text-sm text-gray-500">
                    Complete information about this opportunity
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setViewOpportunity(null);
                }}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close modal"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            {viewLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="flex flex-col items-center gap-3">
                  <svg
                    className="h-10 w-10 animate-spin text-blue-600"
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
                  <p className="text-sm text-gray-500">Loading details...</p>
                </div>
              </div>
            ) : (
              <div className="max-h-[70vh] overflow-y-auto p-6">
                {/* Customer Info Section */}
                <div className="mb-6">
                  <div className="mb-4 flex items-center gap-2">
                    <MdBusiness className="h-5 w-5 text-blue-600" />
                    <h3 className="text-base font-semibold text-gray-900">
                      Customer Information
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <MdBusiness className="h-4 w-4" />
                        <span>Customer Name</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {viewOpportunity?.customerName}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <HiUser className="h-4 w-4" />
                        <span>Contact Person</span>
                      </div>
                      <p className="text-sm text-gray-900">
                        {viewOpportunity?.contactName || "—"}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <HiMail className="h-4 w-4" />
                        <span>Email</span>
                      </div>
                      <p className="truncate text-sm text-gray-900">
                        {viewOpportunity?.contactEmail || "—"}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <HiPhone className="h-4 w-4" />
                        <span>Phone</span>
                      </div>
                      <p className="text-sm text-gray-900">
                        {viewOpportunity?.contactPhone || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Opportunity Details Section */}
                <div className="mb-6">
                  <div className="mb-4 flex items-center gap-2">
                    <HiDocumentText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-base font-semibold text-gray-900">
                      Opportunity Details
                    </h3>
                  </div>

                  <div className="mb-4 rounded-lg bg-gray-50 p-4">
                    <div className="mb-1 text-xs font-medium text-gray-500">
                      Requirement
                    </div>
                    <p className="text-sm text-gray-900">
                      {viewOpportunity?.requirement}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <HiCurrencyRupee className="h-4 w-4" />
                        <span>Estimated Value</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(viewOpportunity?.estimatedValue)}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <HiCalendar className="h-4 w-4" />
                        <span>Next Follow-up</span>
                      </div>
                      <p className="text-sm text-gray-900">
                        {formatDate(viewOpportunity?.nextFollowUpDate)}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 text-xs font-medium text-gray-500">
                        Stage
                      </div>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${stageColors[viewOpportunity?.stage] || stageColors.New}`}
                      >
                        {viewOpportunity?.stage}
                      </span>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 text-xs font-medium text-gray-500">
                        Priority
                      </div>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${priorityColors[viewOpportunity?.priority] || priorityColors.Medium}`}
                      >
                        {viewOpportunity?.priority}
                      </span>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <HiUser className="h-4 w-4" />
                        <span>Owner</span>
                      </div>
                      <p className="text-sm text-gray-900">
                        {viewOpportunity?.owner?.name}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500">
                        <HiCalendar className="h-4 w-4" />
                        <span>Created Date</span>
                      </div>
                      <p className="text-sm text-gray-900">
                        {formatDate(viewOpportunity?.createdAt)}
                      </p>
                    </div>
                  </div>

                  {viewOpportunity?.notes && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <div className="mb-1 text-xs font-medium text-gray-500">
                        Notes
                      </div>
                      <p className="whitespace-pre-wrap text-sm text-gray-900">
                        {viewOpportunity.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setViewOpportunity(null);
                }}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md animate-scale-in rounded-xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <HiTrash className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Delete Opportunity
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedOpportunityId(null);
                }}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close modal"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this opportunity? This action
                cannot be undone and all associated data will be permanently
                removed.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedOpportunityId(null);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
