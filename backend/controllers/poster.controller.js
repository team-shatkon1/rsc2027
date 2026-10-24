import { posterForm } from "../models/poster.model.js";

export const submitForm = async (req, res) => {
    try {
        const formData = req.body;

        if (req.files?.document) {
            formData.documentURL = req.files.document[0].path;
        }
        if (req.files?.collegeIdCard || req.files?.collegeId) {
            formData.collegeIdURL = (req.files.collegeIdCard || req.files.collegeId)[0].path;
        }

        const newFormEntry = new posterForm(formData);
        await newFormEntry.save();

        res.status(201).json({
            message: "Poster Presentation registration submitted successfully!",
            data: newFormEntry,
        });
    } catch (error) {
        console.error("Error saving Poster form data:", error);
        res.status(500).json({
            message: "An error occurred while submitting the form.",
            error: error.message || error,
        });
    }
};

export const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const record = await posterForm.findOne({ email });
        if (record) {
            return res.json({ message: "Record found", record });
        }
        return res.json({ message: "Record not found" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
