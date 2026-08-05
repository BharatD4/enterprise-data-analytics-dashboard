export const getDashboard = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Welcome to Enterprise Data Analytics Dashboard",

        user: req.user,

    });

};
export const deleteDataset = async (req, res) => {
  try {
    await Dataset.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Dataset Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};