import { useEffect } from "react";
import MainNavbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import locationIcon from "../assets/locationicon.png";
function Profile() {
  const dispatch = useDispatch();
  const { userId, cookie } = useSelector((state) => state.auth);

  const id = cookie?.us_id;

  useEffect(() => {
    dispatch({ type: "auth/getCookieRequest" });
    dispatch({ type: "auth/getUserByIdRequest", payload: id });
  }, [dispatch, id]);

  return (
    <>
      <MainNavbar />
      <div className="flex justify-center px-10 mt-14 gap-5">
        <aside className="w-96 p-4 h-1/2 text-white border-2 rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            User Information
          </h2>

          <div className="flex items-center space-x-3">
            <span className="text-gray-600 font-medium">Name:</span>
            <p className="text-gray-900">
              {cookie?.us_fullname || "Not available"}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-gray-600 font-medium">Username:</span>
            <p className="text-gray-900">
              {cookie?.us_username || "Not available"}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-gray-600 font-medium">Email:</span>
            <p className="text-gray-900">
              {cookie?.us_email || "Not available"}
            </p>
          </div>
        </aside>
        <div className="flex flex-col gap-10 border-b-2 pb-14 mb-5 border-2 rounded-2xl p-6">
          {userId?.data?.Courses?.length > 0 ? (
            userId.data.Courses.map((course, index) => (
              <div key={index} className="border p-4 rounded-md">
                <p className="text-lg font-semibold">
                  Course: {course.cr_name}
                </p>
                <p className="text-sm text-gray-600">
                  Description: {course.cr_desc}
                </p>
                <p className="text-sm text-gray-600">
                  Price: Rp {course.cr_price.toLocaleString("id-ID")}
                </p>
                <div className="mt-4">
                  <p className="text-md font-semibold">Schedule:</p>
                  {course.Schedules?.length > 0 ? (
                    course.Schedules.map((schedule, scheduleIndex) => (
                      <div key={scheduleIndex} className="mt-2 pl-4">
                        <p className="text-gray-600">
                          {new Intl.DateTimeFormat("id-ID", {
                            dateStyle: "long",
                          }).format(new Date(schedule.sc_date))}
                          {" | "}
                          {new Intl.DateTimeFormat("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(schedule.sc_date))}
                        </p>
                        <p className="text-sm font-bold flex gap-2">
                          <img
                            className="w-5"
                            src={locationIcon}
                            alt="location"
                          />
                          {schedule.sc_location}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No schedule available
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
