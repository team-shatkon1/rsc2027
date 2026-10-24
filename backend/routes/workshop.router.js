import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { submitForm, checkEmail } from "../controllers/workshop.controller.js";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: async (req, file) => {
		const fullName = (req.body.fullName || 'scholar').replace(/\s+/g, '_');
		let folder = "RSC2027/WORKSHOP/other";
		if (file.fieldname === "abstract") folder = "RSC2027/WORKSHOP/abstracts";
		if (file.fieldname === "collegeId") folder = "RSC2027/WORKSHOP/collegeIds";
		if (file.fieldname === "paymentScreenshot") folder = "RSC2027/WORKSHOP/payments";

		const fileName = `${fullName}_${file.fieldname}_${Date.now()}`;

		return {
			folder,
			allowed_formats: ["jpg", "png", "pdf", "jpeg"],
			public_id: fileName,
		};
	},
});

const upload = multer({ storage });
const router = express.Router();

router.post(
	"/",
	upload.fields([
		{ name: "abstract", maxCount: 1 },
		{ name: "collegeId", maxCount: 1 },
		{ name: "paymentScreenshot", maxCount: 1 },
	]),
	submitForm
);

router.post("/check-email", checkEmail);

export default router;
