import CourseContent from "../components/CourseDetailContent";
import MainNavbar from "../components/Navbar";
import Auth from "./Auth";

function CourseDetail() {
  return (
    <>
      <Auth />
      <MainNavbar />
      <CourseContent />
    </>
  );
}

export default CourseDetail;
