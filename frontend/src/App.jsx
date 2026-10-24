import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import Background from "./components/Background";
import IPS from "./components/IPS";
import PosterPresentation from "./components/PosterPresentation";
import PhDWorkshop from "./components/PhDWorkshop";
import Contact from "./components/Contact";
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <Router>
            <div className="relative min-h-screen flex flex-col font-jakarta">
                <Background />
                <Navbar />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/ips" element={<IPS />} />
                        <Route path="/posterpresentation" element={<PosterPresentation />} />
                        <Route path="/phd-workshop" element={<PhDWorkshop />} />
                        <Route path="/workshop" element={<PhDWorkshop />} />
                        <Route path="/researchpresentation" element={<PhDWorkshop />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
