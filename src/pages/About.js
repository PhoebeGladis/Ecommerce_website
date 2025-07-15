import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us-Ecommerce App"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpg"
            alt="aboutus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            <strong>Welcome to Shopx, your trusted destination for quality products and seamless shopping.
We are a passionate team committed to delivering excellent value, fast shipping, and friendly support — all from the comfort of your home.

Happy Shopping! 🛍️</strong>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;