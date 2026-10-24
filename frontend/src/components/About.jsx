import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const topics = [
	{
		id: 1,
		title: "About WCE Sangli",
		description:
			"The college is situated midway of Sangli-Miraj road. Initially in 1947, the college made a modest beginning with the name as New Engineering College. As a part of the arrangements, mainly funded by Seth Walchand Hirachand Memorial Trust (WHMT) and the Government, the college has been renamed as Walchand College of Engineering (WCE) from the year 1955. The College became autonomous institute during the year 2007-08. As a part of strategic planning in the college, research and development activities are being strengthened. The college has been recognized for running Ph.D. program under Quality Improvement Program (QIP) & National Doctoral Fellowship (NDF) now renamed as ADF schemes of AICTE. Today, it has more than 3,200 students taking various programs in Engineering and Technology. WCE creates opportunities not just for young minds to learn, but also for them to experience the fulfillment that comes from sharing this learning with other stakeholders.",
		imgSrc:
			"https://media.licdn.com/dms/image/v2/C561BAQHfsvXdECzV3A/company-background_10000/company-background_10000/0/1644296023893/mesa_mesc_wce_sangli_cover?e=2147483647&v=beta&t=3B5BxwPhaWTX4LZd6MAoEaUY2O8w5hMP7y3FBkCclFc",
	},
	{
		id: 2,
		title: "About CSE, IT & AI&ML Departments",
		description:
			"Established in 1986, 2001, and 2024, respectively, the CSE, IT, and AI & ML Departments of WCE offer industry-aligned UG and PG programmes. With strong academic foundations and a growing research culture, the departments support doctoral research through Ph.D. programmes and research guidance to Shivaji University scholars. Nearly 95% of faculty members hold or are pursuing Ph.D. degrees. The WCE ACM Student Chapter promotes research and innovation across these disciplines and allied fields.",
		imgSrc:
			"https://media.licdn.com/dms/image/v2/C511BAQHm6JYIoa0ODQ/company-background_1536_768/company-background_1536_768/0/1584487094492?e=2147483647&v=beta&t=_SF5JZWr2bv3JtSrpZzZwpku2qP9lbUKCUXqXl7BFPY",
		alt: "CSE IT AI&ML Departments",
	},
	{
		id: 3,
		title: "About RSC 2027",
		description:
			"The 9th Research Symposium on Computing (RSC 2027) is a three-day academic event organised by the WCE ACM Student Chapter under ACM India, in collaboration with the departments of Computer Science and Engineering, Information Technology, and Artificial Intelligence & Machine Learning at Walchand College of Engineering, Sangli. RSC 2027 combines two complementary activities: a showcase of research posters and innovative student projects (Day 1), followed by a focused Ph.D. Research Workshop (Days 2 & 3) featuring research problem-solving sessions and dedicated one-on-one expert mentoring. The event is designed to move beyond passive listening by giving participants opportunities to present work, examine research challenges, and identify practical next steps.",
		imgSrc:
			"https://media.licdn.com/dms/image/v2/C561BAQHfsvXdECzV3A/company-background_10000/company-background_10000/0/1644296023893/mesa_mesc_wce_sangli_cover?e=2147483647&v=beta&t=3B5BxwPhaWTX4LZd6MAoEaUY2O8w5hMP7y3FBkCclFc",
		alt: "RSC 2027",
	},
	{
		id: 4,
		title: "Previous Editions & RSC Legacy",
		description:
			"The Research Symposium on Computing (RSC) has an illustrious tradition of fostering research culture, peer review, and academic collaboration. Last year's 8th edition (RSC 2025) witnessed outstanding participation from institutions across the region, featuring highly competitive tracks in research posters, doctoral progress reviews, and cutting-edge undergraduate prototypes. Evaluated by eminent researchers from CDAC, Persistent Systems, BATU, and NITs, RSC 2025 established new benchmarks in academic discourse. In 2027, the 9th edition elevates this tradition with an expanded three-day format, introducing dedicated domain-matched one-on-one expert mentoring for Ph.D. scholars.",
		imgSrc:
			"https://media.licdn.com/dms/image/v2/C511BAQHm6JYIoa0ODQ/company-background_1536_768/company-background_1536_768/0/1584487094492?e=2147483647&v=beta&t=_SF5JZWr2bv3JtSrpZzZwpku2qP9lbUKCUXqXl7BFPY",
		alt: "Previous Editions & Legacy",
	},
	{
		id: 5,
		title: "About WCE ACM Student Chapter",
		description:
			"WCE ACM Student Chapter is an esteemed auxiliary of ACM, dedicated to advancing Computer Science since 2016. As a distinguished technical chapter, it fosters co-curricular activities that promote overall development, shaping students into responsible adults with strong core values. This is an institute club driven by the CSE department. It provides a platform for students to enhance their technical skills through workshops, hackathons, seminars, and coding competitions. The chapter encourages collaboration, innovation, and knowledge sharing, creating a community of like-minded individuals passionate about technology and its applications.",
		imgSrc:
			"/wceacmgroup.jpg",
		alt: "WCE ACM Student Chapter",
	},
];

const About = () => {
	const [currentSlidePos, setCurrentSlidePos] = useState(0);

	const totalSliderVisibleItems = 1;
	const totalSlidableItems = topics.length - totalSliderVisibleItems;

	const moveSliderItem = (index) => {
		setCurrentSlidePos(index);
	};

	const slideNext = () => {
		if (currentSlidePos < totalSlidableItems) {
			moveSliderItem(currentSlidePos + 1);
		}
	};

	const slidePrev = () => {
		if (currentSlidePos > 0) {
			moveSliderItem(currentSlidePos - 1);
		}
	};

	return (
		<section data-aos='fade-up' id='about'>
			<div className="container w-full lg:w-[85%] pt-28 mx-auto px-6 sm:px-6 lg:px-8">
				<h1 className="text-4xl sm:text-5xl leading-none text-center text-black font-bold mb-12 uppercase">ABOUT US</h1>
				<div className="w-full items-stretch rounded-lg flex flex-col-reverse lg:flex-row gap-2 lg:gap-7 ">
					<div className="flex flex-col gap-2 w-full lg:w-1/2 h-full">
						<div className="flex items-center gap-2">
							<span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
								Slide {currentSlidePos + 1} of {topics.length}
							</span>
						</div>
						<h2 className="text-xl lg:text-3xl text-black font-bold mt-1">
							{topics[currentSlidePos].title}
						</h2>
						<div className="flex flex-col-reverse sm:flex-col gap-2">
							<p className="text-gray-800 text-md text-justify leading-relaxed">
								{topics[currentSlidePos].description}
							</p>
							<div className="flex justify-start gap-4 mt-2">
								<button
									className="btn-icon bg-blue-900 text-white rounded-full py-2 px-3 hover:bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
									aria-label="previous"
									onClick={slidePrev}
									disabled={currentSlidePos === 0}
								>
									<FontAwesomeIcon icon={faArrowLeft} />
								</button>
								<button
									className="btn-icon bg-blue-900 text-white rounded-full py-2 px-3 hover:bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
									aria-label="next"
									onClick={slideNext}
									disabled={currentSlidePos === totalSlidableItems}
								>
									<FontAwesomeIcon icon={faArrowRight} />
								</button>
							</div>
						</div>
					</div>
					<div className="overflow-hidden w-full lg:w-1/2 flex items-stretch">
						<img
							className="rounded-lg object-cover w-full h-[280px] sm:h-[350px] shadow-md"
							src={topics[currentSlidePos].imgSrc}
							alt={topics[currentSlidePos].alt || "WCE Sangli"}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
