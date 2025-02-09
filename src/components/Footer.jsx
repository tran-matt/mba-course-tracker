import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-accent py-4 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MBA Course Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
