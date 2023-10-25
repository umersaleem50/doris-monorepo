import React from "react";
import CollectionSlider from "../../Components/Stateful/CollectionSlider/CollectionSlider";
import Slider from "../../Components/Stateful/Slider/Slider";
import Brands from "../../Components/Stateless/Brands/Brands";
import Category from "../../Components/Stateless/category/Category";
import NewsLetter from "../../Components/Stateless/NewsLetter/NewsLetter";
import DetailSection from "../../Components/Stateless/Sections/Details/DetailSection";
import Header from "../../Components/Stateless/Sections/Header/Header";
import NewArrival from "../../Components/Stateless/Sections/NewArrival/NewArrival";
import Section from "../../Components/Stateless/Sections/Section/Section";
import SliderItem from "../../Components/Stateless/SliderItem/SliderItem";

import "../../SCSS/_home.scss";

const Home = (props) => {
  return (
    <React.Fragment>
      <Header />
      <Section heading="trending now">{Slider(SliderItem)}</Section>

      <Section heading="Actual Categories">
        <Category />
      </Section>
      <Section heading="Only Trusted Brands">
        <Brands />
      </Section>

      <NewArrival />
      <DetailSection />
      <Section heading="Recommended Looks for you">
        <CollectionSlider />
      </Section>
      <Section>
        <NewsLetter />
      </Section>
    </React.Fragment>
  );
};

export default Home;
