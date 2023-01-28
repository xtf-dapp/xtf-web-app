import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#0e6ffd", color: "white" }}>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Copyright © {new Date().getFullYear()} XTF Platform</p>
      </div>
    </footer>
  );
};

export default Footer;
