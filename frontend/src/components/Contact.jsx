import React from 'react';
import { FaPhone, FaLocationDot, FaEnvelope } from "react-icons/fa6";

const Contact = () => {
	const contacts = [
		{ name: "Ms. P. D. Mundada", role: "Coordinator", phone: "7083818238" },
		{ name: "Ms. N. L. Mudegol", role: "Organizing Committee", phone: "9359644838" },
		{ name: "Ms. M. B. Shinde", role: "Organizing Committee", phone: "9970968078" },
		{ name: "Ms. A. B. Patil", role: "Organizing Committee", phone: "7758998115" },
	];

	return (
		<div data-aos='fade-up' id="contact" className="text-black mb-5 pt-28 lg:w-[85%] mx-auto pb-8 px-6 lg:px-4">
			<div>
				<span className="text-blue-700 font-bold tracking-wider uppercase text-xs bg-blue-100 px-3.5 py-1 rounded-full block w-fit mx-auto mb-2">
					Get In Touch
				</span>
				<h2 className="text-4xl sm:text-5xl leading-snug text-center text-black font-bold mb-2 uppercase">
					Contact Us
				</h2>
				<p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
					For queries regarding registration, abstract submission, or event guidelines, please reach out to our team.
				</p>

				<div className="flex flex-col mt-4 lg:flex-row gap-8 sm:gap-12">
					{/* Campus Map */}
					<div className="space-y-4 flex-1">
						<h3 className="text-xl font-bold mb-2">Our Campus Location</h3>
						<div style={{ width: '100%', height: '320px' }}>
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.609076472004!2d74.59888257492179!3d16.845738683952064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1237f52c65db5%3A0xa3535676176ded0a!2sWalchand%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1733626750439!5m2!1sen!2sin"
								width="100%"
								height="100%"
								style={{ border: 0, borderRadius: '1rem' }}
								allowFullScreen={true}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="Google Map"
							></iframe>
						</div>
					</div>

					{/* Contact Details & Organizers */}
					<div className='flex-1 flex flex-col justify-between'>
						<div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
							<div className="flex items-center gap-4 pb-3 border-b border-gray-100">
								<img src="/wcelogo.png" alt="WCE Logo" className="h-10 w-auto object-contain" />
								<div className="h-6 w-px bg-gray-300"></div>
								<img src="/acmlogo.png" alt="WCE ACM Logo" className="h-10 w-auto object-contain" />
							</div>

							<h3 className="text-xl font-bold mb-2">Symposium Secretariat</h3>
							
							<div className="flex items-start space-x-3 text-gray-800">
								<FaLocationDot className="text-blue-600 mt-1 flex-shrink-0" size={16} />
								<span className="text-sm">
									Walchand College of Engineering, A/P: Vishrambag, Sangli - 416415, Maharashtra, India.
								</span>
							</div>

							<div className="flex items-center space-x-3 text-gray-800">
								<FaEnvelope className="text-blue-600 flex-shrink-0" size={16} />
								<a href="mailto:wceacmsc@gmail.com" className="text-sm text-blue-700 hover:underline font-semibold">
									wceacmsc@gmail.com
								</a>
							</div>
						</div>

						<div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-gray-200/80 shadow-sm mt-4">
							<h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
								Event Coordinators
							</h4>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{contacts.map((c, i) => (
									<div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
										<FaPhone className="text-blue-600 text-xs flex-shrink-0" />
										<div className="text-xs">
											<div className="font-bold text-gray-900">{c.name}</div>
											<a href={`tel:${c.phone}`} className="text-blue-600 hover:underline">
												+91 {c.phone}
											</a>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
