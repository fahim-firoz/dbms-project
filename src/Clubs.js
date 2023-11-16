import React from "react";
import "./index.css";
import clubData from "./Data";
import Club from "./Club";

export default function App() {
  const clubElements = clubData.map((data) => {
    return (
      <Club
        title={data.title}
        image={data.image}
        linkedin={data.linkedin}
        instagram={data.instagram}
      />
    );
  });
  return (
    <div>
      <div className="club-section">{clubElements}</div>
    </div>
  );
}
