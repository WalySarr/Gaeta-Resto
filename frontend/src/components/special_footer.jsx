/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export const SpecialFooter = () => {
  return (
    <div className="footer-area">
      <div className="container">
        <div className="row justify-content-between copyright-wrap">
          <div className="col-lg-2 col-md-6">
            <div className="footer-box">
              <h2 className="h2 text-white footer-title">Product</h2>
              <ul className="footer-list custom-ul">
                <li>
                  <a href="#">Breakfast</a>
                </li>
                <li>
                  <a href="#">Lunch</a>
                </li>
                <li>
                  <a href="#">Desserts</a>
                </li>
                <li>
                  <a href="#">Dinner</a>
                </li>
                <li>
                  <a href="#">Book a table</a>
                </li>
                <li>
                  <a href="#">Our Chefs</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <div className="footer-box">
              <h2 className="h2 text-white footer-title">Information</h2>
              <ul className="footer-list custom-ul">
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/contact">Support</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <div className="footer-box">
              <h2 className="h2 text-white footer-title">Company</h2>
              <ul className="footer-list custom-ul">
                <li>
                  <a href="/about">About us</a>
                </li>
                <li>
                  <a href="/reservation">Our Menu</a>
                </li>
                <li>
                  <a href="/contact">Contact us</a>
                </li>
                <li>
                  <a href="/">Gaeta</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="footer-box">
              <div className="footer-subscribe">
                <div className="footer-subscribe-img position-relative">
                  <img
                    className="w-100"
                    src="/images/experience/footer-subscribe-bg.png"
                    alt=""
                  />
                  <div className="section-title ps-4 position-absolute top-50 start-50 translate-middle w-100">
                    <span className="text-white">Subscribe</span>
                    <h2 className="mt-2 text-white">Our News letter</h2>
                    <p className="mt-3 text-white">To Get Regular Update</p>
                  </div>
                </div>
                <form
                  className="footer-subscribe-form mt-4 d-flex justify-content-between align-items-center"
                  action="#">
                  <input
                    className="w-100 border-0 h-100 ps-3 pe-3"
                    type="email"
                    placeholder="Enter your mail"
                  />
                  <button
                    className="common-btn h-100 flex-shrink-0 border-0 border-radius-0 ms-lg-4 ms-2"
                    type="submit">
                    <span>Subscribe</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-4">
          <div className="col-lg-4 text-center text-lg-start footer-logo-down">
            <a
              className="footer-logo "
              href="/">
              <img
                src="/images/gaeta2.svg"
                alt=""
              />
            </a>
          </div>
          <div className="col-lg-4">
            <ul className="footer-menu custom-ul d-flex justify-content-center mt-3 mb-3 mt-lg-0 mb-lg-0">
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Cookies</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <ul className="custom-ul social-list chefs-social-list d-flex justify-content-center justify-content-lg-end align-items-center">
              <li>
                <a href="#">
                  <i className=" fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
