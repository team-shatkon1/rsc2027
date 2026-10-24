import { ipsForm } from "../models/ips.model.js";

export const submitForm = async (req, res) => {
    try {
        const formData = { ...req.body };

        if (typeof formData.team === "string") {
            try {
                formData.team = JSON.parse(formData.team);
            } catch (e) {
                formData.team = [];
            }
        }

        if (req.files?.document) {
            formData.documentURL = req.files.document[0].path;
        }
        if (req.files?.collegeId || req.files?.collegeIdCard) {
            formData.collegeIdURL = (req.files.collegeId || req.files.collegeIdCard)[0].path;
        }

        const newFormEntry = new ipsForm(formData);
        await newFormEntry.save();

        res.status(201).json({
            message: "Innovative Project Showcasing registration submitted successfully!",
            data: newFormEntry,
        });
    } catch (error) {
        console.error("Error saving IPS form data:", error);
        res.status(500).json({
            message: "An error occurred while submitting the form.",
            error: error.message || error,
        });
    }
};

export const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const record = await ipsForm.findOne({ email });
        if (record) {
            return res.json({ message: "Record found", record });
        }
        return res.json({ message: "Record not found" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
