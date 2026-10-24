import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    college: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
});

const ipsSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    branch: { type: String, required: true },
    college: { type: String, required: true },
    year: { type: String, required: true },
    projectTitle: { type: String, default: "" },
    projectDomain: { type: String, default: "" },
    documentURL: { type: String, required: true },
    collegeIdURL: { type: String },
    team: [teamSchema],
}, { timestamps: true });

export const ipsForm = mongoose.model('ipsForm2027', ipsSchema);
