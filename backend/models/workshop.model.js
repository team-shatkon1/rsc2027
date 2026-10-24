import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String, required: true },
    phdAdmissionYear: { type: String, required: true },
    guideName: { type: String, required: true },
    researchTopic: { type: String, required: true },
    researchDomain: { type: String, required: true },
    researchChallenge: { type: String, default: "" },
    abstractURL: { type: String, required: true },
    collegeIdURL: { type: String, required: true },
    transactionId: { type: String, required: true },
    paymentScreenshotURL: { type: String, required: true },
}, { timestamps: true });

export const workshopForm = mongoose.model('workshopForm2027', workshopSchema);
