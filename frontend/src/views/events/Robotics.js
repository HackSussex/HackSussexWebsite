import React from 'react';

import Resources from '../../components/Resources';
import EventWhereWhen from '../../components/EventWhereWhen';
import AboutSection from '../../components/AboutSection';
import RoboticsBackground from '../../assets/Events/Robotics/RoboticsBackground.png';

const linksData = [
    // Website - Online Practice
    { name: "LeetCode", url: "https://leetcode.com/" },
    { name: "HackerRank", url: "https://www.hackerrank.com/" },
    { name: "Codeforces", url: "https://codeforces.com/" },
    { name: "AtCoder", url: "https://atcoder.jp/" },
  
    // Website - Misc
    { name: "Visualgo", url: "https://visualgo.net/en" },
    { name: "Tech Interview Handbook", url: "https://www.techinterviewhandbook.org/grind75" },
    { name: "Neetcode", url: "https://neetcode.io/" },
    { name: "LeetCode The Hard Way", url: "https://leetcodethehardway.com/" },
    { name: "USACO Guide", url: "https://usaco.guide/" },
    { name: "CP Algorithms", url: "https://cp-algorithms.com/index.html" },
  
    // Books - DSA
    { name: "Introduction to Algorithms", url: "https://www.amazon.co.uk/Introduction-Algorithms-Thomas-H-Cormen/dp/0262033844" },
  
    // Books - CP
    { name: "Competitive Programming Book", url: "https://cpbook.net/" },
    { name: "CSES Problem Set", url: "https://cses.fi/book/book.pdf" },
    { name: "Competitive Programming Handbook", url: "https://link.springer.com/book/10.1007/978-3-319-72547-5" },
  ];

const Robotics = () => {
  return (
    <>
        <div className="carousel-inner p-0">
            <img src={RoboticsBackground} className="d-block w-100 img-fluid splash" alt='Background' />
            <div className="carousel-caption">
                <p className='display-4' style={{color: "var(--electric-green)"}}>Robotics</p> {/* Get me sized correctly or replaced */}
            </div>
        </div>
        <AboutSection description={[`Welcome to HackSussex's Weekly Robotics workshops! Our workshops are open to anyone with an interest and offer the chance to learn the basics of electronics, mechanics, coding and robotics through a series of hands-on sessions. These sessions offer something for everyone, from beginners to hobbyists, you'll learn how to use and apply many different components like micro-controllers, motors and sensors. `,  `At every teaching session you'll get a quick introduction to the topic at the start, then in small groups, go through custom worksheets and hardware kits to learn whilst building. We also plan to host weekly open workshop sessions where you get access to a wide variety of tools and resources to make anything you can think of.`]} />
        <div className="container p-5 pt-0">
          Sign up to get notified <a href="https://docs.google.com/forms/d/e/1FAIpQLSc5fJVzFHijuOZrM6zirnidI43eSzg1SHWd9dZTJLJIFSAwQw/viewform?fbzx=6198511734001577115&pli=1">here</a>!
        </div>
        <EventWhereWhen location="FTL, Chichester 1" date="Wed 2:00pm" link="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.1261731945247!2d-0.08990902304499236!3d50.865863857366044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487588b5f2f211b5%3A0xae77bf312760670c!2sChichester%20I%2C%20Falmer%2C%20Brighton%20BN1%209QJ!5e0!3m2!1sen!2suk!4v1710763477385!5m2!1sen!2suk"/>
        {/* <Resources links={linksData} /> */}
    </>
  );
}

export default Robotics;