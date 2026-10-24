import { workshopForm } from "../models/workshop.model.js";

export const submitForm = async (req, res) => {
    try {
        const formData = req.body;

        if (req.files?.abstract) {
            formData.abstractURL = req.files.abstract[0].path;
        }
        if (req.files?.collegeId) {
            formData.collegeIdURL = req.files.collegeId[0].path;
        }
        if (req.files?.paymentScreenshot) {
            formData.paymentScreenshotURL = req.files.paymentScreenshot[0].path;
        }

        const newFormEntry = new workshopForm(formData);
        await newFormEntry.save();

        res.status(201).json({
            message: "Ph.D. Research Workshop registration submitted successfully!",
            data: newFormEntry,
        });
    } catch (error) {
        console.error("Error saving Workshop form data:", error);
        res.status(500).json({
            message: "An error occurred while submitting the form.",
            error: error.message || error,
        });
    }
};

export const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const record = await workshopForm.findOne({ email });
        if (record) {
            return res.json({ message: "Record found", record });
        }
        return res.json({ message: "Record not found" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
