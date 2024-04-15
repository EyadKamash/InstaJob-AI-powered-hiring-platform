import React from "react";
import MainPageBlockOne from "../components/MainPageBlockOne";
import MainPageBlockTwo from "../components/MainPageBlockTwo";
import MainPageFeatures from "../components/MainPageFeatures";
import Cv from "../components/Cv";

function IndexPage() {
  return (
    <div>
      <MainPageBlockOne />
      <MainPageBlockTwo />
      <MainPageFeatures />
      <Cv />
    </div>
  );
}

export default IndexPage;
