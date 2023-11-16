import React from "react";

export default function Club(props) {
  return (
    <div className="club">
      <img src={props.image} />
      <div className="club-desc">
        <h1>{props.title}</h1>
        <div className="club-profile">
          <a
            href={`https://in.linkedin.com/company/${props.linkedin}`}
            target="_blank"
          >
            <img className="linkedin-logo" src="./images/linkedin.png" />
          </a>
          <a href="" target="_blank">
            <img className="instagram-logo" src="./images/instagram3.png" />
          </a>
        </div>
      </div>
    </div>
  );
}
