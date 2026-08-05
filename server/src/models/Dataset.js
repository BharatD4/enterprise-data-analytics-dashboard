import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    data: {
      type: Array,
      default: [],
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Dataset = mongoose.model("Dataset", datasetSchema);

export default Dataset;