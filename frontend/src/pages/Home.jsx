import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Course from "../components/CourseList";
import Hero from "../components/Hero";
import MainNavbar from "../components/Navbar";

function Home() {
  return (
    <>
      <MainNavbar />
      <Hero />
      <Course />
    </>
  );
}

export default Home;
