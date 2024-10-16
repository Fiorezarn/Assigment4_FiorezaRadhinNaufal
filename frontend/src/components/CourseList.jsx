import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchRequest } from "../features/courses/coursesSlice";
import { Link } from "react-router-dom";

function Course() {
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_BASE_URL_BE;
  const { data, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch({ type: "COURSE_GET_ALL" });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
  }
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Our courses</h2>
        <p className="mt-4 text-gray-500">
          Flowbite helps you build your next project faster by providing a free
          and open-source alternative to JavaScript frameworks. Flowbite is an
          open-source component library that
        </p>
      </div>
      <div className="flex flex-wrap gap-6">
        {data?.data?.map((course, index) => {
          return (
            <div className="mt-10" key={index}>
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-center">
                  <img
                    className="w-28 h-28 rounded-md"
                    src={`${BASE_URL}/${course.cr_image}`}
                    alt=""
                  />
                </div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {course.cr_name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {course.cr_desc}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Rp.{" "}
                  {course.cr_price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
                <Link
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  to={`/detail/courses/${course.cr_id}`}
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Course;
