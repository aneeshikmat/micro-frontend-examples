import React from "react";

const dashboardStyle = {
  backgroundColor: "#f9f9f9",
  padding: "20px",
  margin: "20px auto",
  maxWidth: "800px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  color: "#333"
};

const Dashboard = () => (
  <div style={dashboardStyle}>
    <h2 style={{ marginBottom: "20px" }}>Dashboard Component</h2>
    <p>Welcome to your dashboard! This is where your content would go.</p>
    <small>2nees.com</small>
  </div>
);

export default Dashboard;
