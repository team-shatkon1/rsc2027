import React from "react";
import "./footer.css";

export default function Footer() {
	return (
		<footer className="mt-20">
			<div className="footer-logo-container">
				<img src="/wcelogo.png" alt="WCE Logo" className="wce-logo" />
				<div className="h-8 w-px bg-gray-300"></div>
				<img src="/acmlogo.png" alt="WCE ACM Student Chapter Logo" className="acm-logo" />
			</div>
			<div className="copyright_text">
				<span>Copyright &copy; 2027. All rights reserved by <strong>WCE ACM Student Chapter</strong></span>
				<span className="institution">Walchand College of Engineering, Sangli</span>
			</div>
		</footer>
	);
}
