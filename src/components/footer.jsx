import React, { useEffect, useRef, useState } from "react";
import "./footer.css";

function Footer() {
    const [footerVisible, setFooterVisible] = useState(false);
    const footerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY;

        // Adjusted condition for responsive visibility
        const isFooterVisible =
            documentHeight <= windowHeight ||
            scrollPosition > documentHeight - windowHeight * 0.75;

        setFooterVisible(isFooterVisible);
        };

        const handleResize = () => {
        // Re-trigger handleScroll on window resize for responsive visibility
            console.log("RESIZE")
        handleScroll();
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        // Initial adjustment when the component mounts
        handleScroll();

        return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={`footer ${footerVisible ? "visible" : "visible"}`} ref={footerRef}>
        <label>Teamshot.gg</label>
        </div>
    );
}

export default Footer;