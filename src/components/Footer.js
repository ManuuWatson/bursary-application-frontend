import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0 small">
          © {new Date().getFullYear()} Bursary Application System | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
