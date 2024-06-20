import React from "react";
import { BreadCumpArea } from "../components/breadcump-area";

import { SpecialFooter } from "../components/special_footer";
import AboutSection from "../components/about-section";
import TrendingSection from "../components/subcomponents/trending";
import ChefSection from "../components/chef-section";
import AboutVideoArea from "../components/about-video-area";
import VisitArea from "../components/subcomponents/visit-area";
import CtaArea from "../components/cta";
import InstagramSlider from "../components/subcomponents/instagram-area";
import Notices from "../components/notices";

export const About = () => {
  return (
    <section className="about">
      <BreadCumpArea link="About Us" />
      <AboutSection />
      <TrendingSection />
      <ChefSection />
      <AboutVideoArea />
      <VisitArea />
      <CtaArea />
      <Notices/>
      <InstagramSlider />
      <SpecialFooter />
    </section>
  );
};
