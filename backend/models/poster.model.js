import mongoose from "mongoose";

const posterSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String },
    course: { type: String, required: true },
    year: { type: String },
    posterTitle: { type: String, default: "" },
    researchDomain: { type: String, default: "" },
    abstractText: { type: String, default: "" },
    documentURL: { type: String, required: true },
    collegeIdURL: { type: String },
}, { timestamps: true });

export const posterForm = mongoose.model('posterForm2027', posterSchema);
