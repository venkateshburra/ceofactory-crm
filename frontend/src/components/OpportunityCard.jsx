import { useAuth } from "../context/AuthContext";
import {
  HiEye,
  HiPencil,
  HiTrash,
  HiCurrencyRupee,
  HiUser,
  HiCalendar,
} from "react-icons/hi";
import { MdBusiness } from "react-icons/md";

function OpportunityCard({ opportunity, onView, onEdit, onDelete }) {
  const { user } = useAuth();

  const isOwner = user?.id === opportunity.owner._id;

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
    <div className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <MdBusiness className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {opportunity.customerName}
            </h3>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {opportunity.requirement}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${stageColors[opportunity.stage] || stageColors.New}`}
        >
          {opportunity.stage}
        </span>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityColors[opportunity.priority] || priorityColors.Medium}`}
        >
          {opportunity.priority}
        </span>
      </div>

      {/* Details */}
      <div className="mb-4 flex-1 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <HiCurrencyRupee className="h-4 w-4 text-gray-400" />
          <span className="font-semibold text-gray-900">
            {formatCurrency(opportunity.estimatedValue)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <HiUser className="h-4 w-4 text-gray-400" />
          <span className="truncate">{opportunity.owner.name}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <HiCalendar className="h-4 w-4 text-gray-400" />
          <span>{formatDate(opportunity.nextFollowUpDate)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-gray-100 pt-4">
        <button
          onClick={onView}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="View opportunity"
        >
          <HiEye className="h-4 w-4" />
          <span>View</span>
        </button>

        {isOwner && (
          <>
            <button
              onClick={onEdit}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Edit opportunity"
            >
              <HiPencil className="h-4 w-4" />
              <span>Edit</span>
            </button>

            <button
              onClick={onDelete}
              className="flex items-center justify-center rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Delete opportunity"
            >
              <HiTrash className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Owner Badge */}
      {isOwner && (
        <div className="mt-3 flex items-center justify-center">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            You own this
          </span>
        </div>
      )}
    </div>
  );
}

export default OpportunityCard;
