import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import video from "../assets/landing_page_vid_v4.mp4";
import "./NavbarStyles.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      	<section class="showcase" id = "top-page">
			<div class="video-container">
				<video src={video} autoPlay muted loop></video>
			</div>
			<div class="content">
				<h1>BOOK DENTISTS ALL OVER GOTHENBURG</h1>
				<h2 id="projName">PROJECT TITAN</h2>
				<a href="#about" class="steam-button" onClick={() => {
                navigate("/login");
              }}>Log In</a>
        
      <a href="#about" class="steam-button">Learn More</a>
      <a href="#contact-us" class="steam-button">Contact Us</a>
			</div>
		</section>

<section id="about">
  <h1>Learn More</h1>
          <p class="basicDesc">
          Seamless, easy to use, efficient. Just pick a preferred time and we will let you know what's available! Some more sample text
        </p>
  <p class="basicDesc">
          "Inspirational relevant quote" - Famous person
        </p>
</section>
<section id="contact-us"><h1>Contact Us</h1></section>
<section id="about">
  <a href="#top-page" class="steam-button">Back to Top</a>
</section>
  
    </>
  );
};

export default NavBar;
