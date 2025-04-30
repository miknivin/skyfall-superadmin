import mongoose from "mongoose";

const { Schema } = mongoose;

const ResortSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    documents: [
      {
        type: {
          type: String,
          required: [true, "Document type is required"],
          enum: ["license", "registration"],
        },
        name: {
          type: String,
          required: [true, "Document name is required"],
          trim: true,
        },
        url: {
          type: String,
          required: [true, "Document URL is required"],
          trim: true,
        },
      },
    ],
    description: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rooms: [
      {
        roomType: {
          type: String,
          required: false,
        },
        capacity: {
          type: Number,
          required: false,
        },
        pricePerNight: {
          type: Number,
          required: false,
        },
        roomCount: {
          type: Number,
          required: false,
        },
      },
    ],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    availability: [
      {
        date: {
          type: Date,
          required: false,
        },
        availableRooms: [
          {
            roomType: { type: String },
            count: { type: Number },
          },
        ],
      },
    ],
    amenities: [
      {
        type: String,
        trim: true,
        required: false,
      },
    ],
  },
  { timestamps: true }
);
const Resort = mongoose.model("Resort", ResortSchema);
export default  Resort
