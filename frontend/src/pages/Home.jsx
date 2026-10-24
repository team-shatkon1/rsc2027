import React from "react";
import About from "../components/About";
import Organizers from "../components/Organizers";
import Header from "../components/Header";
import FeaturedActivities from "../components/FeaturedActivities.jsx";
import Contact from "../components/Contact.jsx";
import Patrons from "../components/Patrons.jsx";
import OrganizingCommittee from "../components/OrganizingCommittee.jsx";
import AdvisoryCommittee from "../components/AdvisoryCommittee.jsx";
import ChairCoordinator from "../components/ChairCoordinator.jsx";
import ImportantDates from "../components/ImportantDates.jsx";
import ThreeDayProgramme from "../components/ThreeDayProgramme.jsx";
import WorkshopHighlight from "../components/WorkshopHighlight.jsx";
import RegistrationFees from "../components/RegistrationFees.jsx";
import SubmissionGuidelines from "../components/SubmissionGuidelines.jsx";

const Home = () => {
	return (
		<div className="font-jakarta min-h-screen w-full py-5">
			<Header />
			<video
				autoPlay
				loop
				muted
				id='video-section'
				className="-z-30 absolute top-0 left-0 w-full h-screen object-cover"
			>
				<source src="https://res.cloudinary.com/wceacmsc/video/upload/v1738178843/hero_video_final_vuo03a.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="absolute -z-20 h-screen inset-0 bg-black bg-opacity-[0.7]"></div>

			{/* Section Flow */}
			<About />
			<ThreeDayProgramme />
			<WorkshopHighlight />
			<FeaturedActivities />
			<RegistrationFees />
			<ImportantDates />
			<Patrons />
			<Organizers />
			<ChairCoordinator />
			<OrganizingCommittee />
			<AdvisoryCommittee />
			<SubmissionGuidelines />
			<Contact />
		</div>
	);
};

export default Home;
