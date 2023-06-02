import React from "react";
import {Slider, Promotion, Container} from "@/components";
import Category from "./components/Category";
import Collect from "./components/Collect";
import {withHeaderAndFooter} from "@/hoc";

const Home: React.FC = () => {
  return (
    <Container>
      <Slider />
      {/* <Promotion /> */}
      <Category />
      <Collect />
    </Container>
  );
};

export default withHeaderAndFooter(Home);
