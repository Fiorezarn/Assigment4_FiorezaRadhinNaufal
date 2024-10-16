import Profile from "../assets/evan.jpg";

export function MainNavbar() {
  return (
    <nav className="bg-gray-800 border-gray-700 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Phincon Course
          </span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a
            href="/login"
            className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
          >
            Login
          </a>
          <button>
            <img
              src={Profile}
              alt="Profile"
              className="w-10 h-10 rounded-full object-fill"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;
