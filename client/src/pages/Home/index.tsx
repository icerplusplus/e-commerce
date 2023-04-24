import React from "react";
import Slider from "../../components/Slider";
import Promotion from "../../components/Promotion";

export function Home() {
  return (
    <main className="m-auto my-2 w-full lg:w-container space-y-2">
      {/* slider */}
      <Slider />

      {/* Promotion */}
      <Promotion />
    </main>
  );
}
