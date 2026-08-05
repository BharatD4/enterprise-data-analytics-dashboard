import fs from "fs";
import csv from "csv-parser";
import Dataset from "../models/Dataset.js";

// Upload CSV
export const uploadDataset = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV file",
      });
    }

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const dataset = await Dataset.create({
            fileName: req.file.filename,
            data: results,
            uploadedBy: req.user._id,
          });

          res.status(201).json({
            success: true,
            message: "CSV Uploaded Successfully",
            totalRows: results.length,
            dataset,
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Datasets
export const getDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find({
      uploadedBy: req.user._id,
    });

    res.status(200).json({
      success: true,
      total: datasets.length,
      datasets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: "Dataset not found",
      });
    }

    await Dataset.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Dataset deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};