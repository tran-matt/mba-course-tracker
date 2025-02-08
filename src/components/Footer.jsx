import React from "react";
import "./Footer.css"; // Import external CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MBA Course Tracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
