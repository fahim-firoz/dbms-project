import React from "react";

function About() {
  return (
    <div className="about-us-container">
      <div className="about-us-desc">
        <h1>About us</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
          dolorem labore dolore ratione? Quibusdam culpa nisi laboriosam? Quasi
          dolores, consequatur expedita neque alias hic praesentium sed iusto
          dignissimos ab corporis?
        </p>
        <div>
          <a className="mail-link" href="mailto:123@gmail.com">
            Click to mail us
          </a>
        </div>
        <div className="follow-us">
          <p>Follow us</p>
          <a href="" target="_blank">
            <img className="linkedin-logo1" src="./images/linkedin.png" />
          </a>
          <a href="" target="_blank">
            <img className="instagram-logo1" src="./images/instagram3.png" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
