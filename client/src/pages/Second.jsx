import React from "react";
import Card from "../components/Card";
const Second = () => {
  const array = [1, 2, 3, 4, 5, 6, 7];
  return array.map((item, index) => {
    return <Card key={index} />;
  });
};

export default Second;
