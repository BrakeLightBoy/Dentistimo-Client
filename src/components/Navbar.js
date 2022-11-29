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
          we'll let you know what's available
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
              <img src={woj} alt="" />
            </div>
            <div id="profile-name" class="title">
              Wojciech
            </div>
            <div class="desc">Full-Stack</div>
          </div>

          <div class="flex-item">
            <div class="pic">
              <img src={noah} alt="" />
            </div>
            <div id="profile-name" class="title">
              Noah
            </div>
            <div class="desc">Full-Stack</div>
          </div>

          <div class="flex-item">
            <div class="pic">
              <img src={michael} alt="" />
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
              <img src={frida} alt="" />
            </div>
            <div id="profile-name" class="title">
              Frida
            </div>
            <div class="desc">Front-end</div>
          </div>

          <div class="flex-item">
            <div class="pic">
              <img src={emil} alt="" />
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
              <img src={elisa} alt="" />
            </div>
            <div id="profile-name" class="title">
              Elisa
            </div>
            <div class="desc">Back-end</div>
          </div>

          <div class="flex-item">
            <div class="pic">
              <img src={john} alt="" />
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
