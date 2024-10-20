import Logo from "../assets/logo.jpg";

function Hero() {
  return (
    <section
      className="relative bg-gray-900 h-full bg-cover  bg-no-repeat"
      style={{ backgroundImage: `url(${Logo})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          {/* Title */}
          <h1 className="max-w-2xl mb-4 text-5xl font-extrabold tracking-tight leading-tight text-white md:text-6xl xl:text-7xl">
            Welcome to Phincon Course!
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mb-6 text-lg font-medium text-gray-200 lg:text-2xl">
            Phincon Course is a free and open-source alternative to JavaScript
            frameworks.
          </p>

          {/* Call to Action */}
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-[#62C8A1] rounded-lg hover:bg-[#53b08e] transition-all duration-300"
          >
            Speak to Sales
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
