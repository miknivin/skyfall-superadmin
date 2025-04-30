import mongoose from "mongoose";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import AdminRequest from "../models/AdminRequest.js";
import Resort from "../models/Resort.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";

// Register user   =>  /api/v1/register
export const createAdminRequest = catchAsyncErrors(async (req, res, next) => {
  const { userId, name, email, phone, status, requestDetails, reviewedBy } =
    req.body;

  const adminRequest = await AdminRequest.create({
    userId,
    name,
    email,
    phone,
    status: status || "pending",
    requestDetails: requestDetails || { resorts: [] },
    reviewedBy,
  });

  res.status(201).json({
    success: true,
    data: adminRequest,
  });
});

export const getAllAdminRequests = catchAsyncErrors(async (req, res, next) => {
  const adminRequests = await AdminRequest.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: adminRequests.length,
    data: adminRequests,
  });
});

export const getAdminRequestById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const adminRequest = await AdminRequest.findById(id).populate(
    "userId",
    "name email"
  );

  if (!adminRequest) {
    return next(new ErrorHandler("Admin request not found", 404));
  }

  res.status(200).json({
    success: true,
    data: adminRequest,
  });
});

export const acceptAdminRequest = catchAsyncErrors(async (req, res, next) => {
  const { requestId } = req.body;

  if (!requestId) {
    return next(new ErrorHandler("Invalid request ID", 400));
  }

  const adminRequest = await AdminRequest.findById(requestId);
  if (!adminRequest) {
    return next(new ErrorHandler("Admin request not found", 404));
  }

  if (adminRequest.status !== "pending") {
    return next(new ErrorHandler("Request is already processed", 400));
  }

  const resorts = adminRequest.requestDetails.resorts.map((resort) => ({
    adminId: adminRequest.userId,
    name: resort.name,
    location: resort.location.formattedAddress,
    documents: resort.documents,
    description: resort.description || "",
    images: [],
    status: "approved",
    rooms: [],
    bookings: [],
    availability: [],
    amenities: [],
  }));

  const createdResorts = await Resort.insertMany(resorts);

  const user = await User.findById(adminRequest.userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.role = "admin";
  user.resorts = [
    ...user.resorts,
    ...createdResorts.map((resort) => resort._id),
  ];
  await user.save();

  adminRequest.status = "approved";
  adminRequest.reviewedBy = req.user._id; // Set reviewedBy to authenticated user's ID
  adminRequest.updatedAt = new Date();
  await adminRequest.save();

  res.status(200).json({
    message:
      "Admin request approved, resorts created, and user updated to admin",
  });
});
