import Opportunity from "../models/Opportunity.js";

// Create Opportunity
export const createOpportunity = async (req, res) => {
  try {
    const {
      customerName,
      contactName,
      contactEmail,
      contactPhone,
      requirement,
      estimatedValue,
      stage,
      priority,
      nextFollowUpDate,
      notes,
    } = req.body;

    // Required field validation
    if (!customerName || !requirement) {
      return res.status(400).json({
        success: false,
        message: "Customer name and requirement are required",
      });
    }

    const opportunity = await Opportunity.create({
      owner: req.user._id, // Get owner from JWT
      customerName,
      contactName,
      contactEmail,
      contactPhone,
      requirement,
      estimatedValue,
      stage,
      priority,
      nextFollowUpDate,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Opportunity created successfully",
      opportunity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Opportunities with Pagination, Search, and Filters
export const getAllOpportunities = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      search = "",
      stage = "",
      priority = "",
      owner = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build query object
    const query = {};

    // Search across multiple fields
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { contactName: { $regex: search, $options: "i" } },
        { requirement: { $regex: search, $options: "i" } },
        { contactEmail: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by stage
    if (stage) {
      query.stage = stage;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Filter by owner (my opportunities)
    if (owner === "me") {
      query.owner = req.user._id;
    }

    // Calculate pagination
const pageNum = Math.max(parseInt(page) || 1, 1);
const limitNum = Math.max(parseInt(limit) || 9, 1);
    const skip = (pageNum - 1) * limitNum;

    // Sort order
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Execute query with pagination
    const opportunities = await Opportunity.find(query)
      .populate("owner", "name email")
      .sort(sort)
      .limit(limitNum)
      .skip(skip);

    // Get total count for pagination
    const totalCount = await Opportunity.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limitNum);

    res.status(200).json({
      success: true,
      count: opportunities.length,
      totalCount,
      totalPages,
      currentPage: pageNum,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
      opportunities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Opportunity
export const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate("owner", "name email");

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    res.status(200).json({
      success: true,
      opportunity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Opportunity
export const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    // Ownership Check
    if (opportunity.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this opportunity",
      });
    }

    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Opportunity updated successfully",
      opportunity: updatedOpportunity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Opportunity
export const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    // Ownership Check
    if (opportunity.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this opportunity",
      });
    }

    await opportunity.deleteOne();

    res.status(200).json({
      success: true,
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
