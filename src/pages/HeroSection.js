import React from "react";
import "../styles/HeroSection.css"; // CSS in same folder
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
const navigate = useNavigate();
  return (
    <Layout title={"Shop"}>
    <header className="hero" style={{
    backgroundImage: "url(/images/b3.jpg)",
  }}>
      <div className="overlay" />
      <div className="hero-content">
        <p className="sub-heading">WELCOME TO Famfit.</p>
        <h1 className="main-heading">Timeless Fashion for the Modern Wardrobe</h1>
        <button className="cta-button"  onClick={() =>
                      navigate("/shop")}>Shop Now </button>
      </div>
    </header>
    </Layout>
  );
};

export default HeroSection;