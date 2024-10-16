import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CourseContent() {
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_BASE_URL_BE;
  const { dataId, loading, error } = useSelector((state) => state.courses);

  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[3];

  useEffect(() => {
    dispatch({ type: "COURSE_GET_BY_ID", payload: id });
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error loading course</div>;
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto flex justify-center">
        {/* Course Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          {/* Course Header */}
          <div className="bg-blue-50 p-8 rounded-lg text-center mb-10">
            <h1 className="text-blue-700 text-4xl font-bold">
              {dataId?.data?.cr_name} Bootcamp
            </h1>
            <p className="text-gray-700 text-lg mt-4">
              {dataId?.data?.cr_desc}
            </p>
            <div className="mt-6">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold">
                Hubungi Kami
              </button>
            </div>
          </div>

          {/* Main Content with Course Image */}
          <div className="flex items-center mb-10">
            <img
              className="rounded-md w-40 h-28 mr-8"
              src={`${BASE_URL}/${dataId?.data?.cr_image}`}
              alt="Course image"
            />
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-4">
                Price: Rp. {dataId?.data?.cr_price}
              </p>
            </div>
          </div>

          {/* Schedule List */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Available Schedules:</h2>
            <ul className="space-y-4">
              {dataId?.data?.Schedules.map((schedule) => (
                <li key={schedule.sc_id} className="border p-4 rounded-md">
                  <p className="text-lg font-semibold">
                    Location: {schedule.sc_location}
                  </p>
                  <p className="text-gray-600">
                    Date: {new Date(schedule.sc_date).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Register Button */}
          <div className="mt-10">
            <button className="bg-blue-700 text-white py-2 px-4 rounded-md font-bold">
              Register Course
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseContent;
