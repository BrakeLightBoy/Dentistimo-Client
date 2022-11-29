import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import video from "../assets/landing_page_vid_v9.mp4";
import "./NavbarStyles.css";
import noah from "../assets/noah.jpg";
import michael from "../assets/michael.JPG";
import woj from "../assets/woj.jpg";
import elisa from "../assets/elisa.JPG";
import john from "../assets/john.JPG";
import frida from "../assets/frida.JPG";
import emil from "../assets/emil.JPG";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <section class="showcase" id="top-page">
        <div class="video-container">
          <video src={video} autoPlay muted loop></video>
        </div>
        <div class="content">
          <h1>BOOK DENTISTS ALL OVER GOTHENBURG</h1>
          <h2 id="projName">PROJECT TITAN</h2>
          <a
            href="#about"
            class="steam-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </a>

          <a href="#about" class="steam-button">
            About
          </a>
          <a href="#contact-us" class="steam-button">
            Contact Us
          </a>
        </div>
      </section>

      <section id="about">
        <h1>About</h1>
        <p class="basicDesc">
          Seamless, easy to use, efficient -- Just pick a preferred time and
          we'll let you know what's available.
        </p>
        <p class="basicDesc">
          Our teeth are one of our most precious tools. 
          We often don't appreciate them enough until we lose them, for instance due to bad dental 
          care. We recommend annual checks with a dentist, and strive to make it as simple as possible. 
        </p>
        <p class="basicDesc">
          For someone moving to Sweden, or within Sweden, it is not always easy to get a dentist appointment 
          as many practices are working on full capacity already and will reject you as a new care-taker. 
          Rather than a manual search online, Project Titan automates as much of the hard work we can, for you!
        </p>
        <p class="basicDesc">
          Through a seamless graphical user interface, we let you find available times in user-specified time 
          windows, as our system keeps track of the availability of free time-slots for a number of dentists, 
          including Dan Tist, the Tooth Fairy, Carmen Corona, and Glen Hysen
        </p>
        <p class="basicDesc quote">
          "Time and health are two precious assets that we don't recognize and
          appreciate until they have been depleted.''{" "}
        </p>
        <p class="basicDesc">- Denis Waitley</p>
      </section>

      <section>
        <h1 id="contact-us">Contact Us</h1>
        <p class="basicDesc">
          We're a small group of students with a wide variety of skills and from
          all over the world!
        </p>

        <div class="container">
          <div class="flex-item">
            <div class="pic">
              <img src={woj} alt="Wojciech" />
            </div>
            <div id="profile-name" class="title">
              Wojciech
            </div>
            <div class="desc">Full-Stack</div>
          </div>

          <div class="flex-item">
            <div class="pic">
              <img src={noah} alt="Noah" />
            </div>
            <div id="profile-name" class="title">
              Noah
            </div>
            <div class="desc">Full-Stack</div>
          </div>

          <div class="flex-item">
            <div class="pic">
              <img src={michael} alt="Michael" />
            </div>
            <div id="profile-name" class="title">
              Michael
            </div>
            <div class="desc">Full-Stack</div>
          </div>
        </div>

        <div class="container">
          <div class="flex-item">
            <div class="pic">
              <img src={frida} alt="Frida" />
            </div>
            <div id="profile-name" class="title">
              Frida
            </div>
            <div class="desc">Front-end</div>
          </div>

          <div class="flex-item">
            <div class="pic">
              <img src={emil} alt="Emil" />
            </div>
            <div id="profile-name" class="title">
              Emil
            </div>
            <div class="desc">Front-end</div>
          </div>
        </div>

        <div class="container">
          <div class="flex-item">
            <div class="pic">
              <img src={elisa} alt="Elisa" />
            </div>
            <div id="profile-name" class="title">
              Elisa
            </div>
            <div class="desc">Back-end</div>
          </div>

          <div class="flex-item">
            <div class="pic">
              <img src={john} alt="John" />
            </div>
            <div id="profile-name" class="title">
              John
            </div>
            <div class="desc">Back-end</div>
          </div>
        </div>
      </section>
      <section id="about">
        <a href="#top-page" class="steam-button">
          Back to Top
        </a>
      </section>
    </>
  );
};

export default NavBar;
