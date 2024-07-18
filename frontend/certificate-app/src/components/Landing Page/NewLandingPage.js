import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
function NewLandingPage() {
  return (
    <>
      {/* Hero Section */}
      <Navbar />
      <div className="landingsec-landing">
        <div className="item-landing">
          <div className="text-gray-200 body-font  ">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                  Blockchain-Based Certificate System
                  <br className="hidden lg:inline-block" />
                  For Secure Validation
                </h1>
                <p className="mb-8 leading-relaxed text-gray-400">
                  Ensure the authenticity and security of your certificates with
                  our blockchain-based solution. Generate, store, and validate
                  digital certificates seamlessly. Ideal for government
                  organizations, students, industries, and institutes.
                </p>
                <div className="flex justify-center">
                  <button className="inline-flex text-white bg-gradient-to-r from-purple-500 to-indigo-500 border-0 py-2 p-4 focus:outline-none hover:bg-purple-700 rounded text-lg">
                    Get Started
                  </button>
                  <button className="ml-4 inline-flex text-gray-900 bg-gray-300 border-0 py-2 px-6 focus:outline-none hover:bg-gray-400 rounded text-lg">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src="https://dummyimage.com/720x600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div>
          <div className="text-gray-200 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                  Blockchain Certificate Generation & Validation
                </h1>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-400">
                  Revolutionizing the way certificates are issued and validated
                  using blockchain technology. Secure, reliable, and easily
                  accessible digital certificates for government organizations,
                  students, industries, and institutes.
                </p>
              </div>
              <div className="flex flex-wrap -m-4">
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-600 p-6 rounded-lg bg-gray-800">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-white font-medium title-font mb-2">
                      Secure Generation
                    </h2>
                    <p className="leading-relaxed text-base text-gray-400">
                      Generate tamper-proof certificates with blockchain
                      technology, ensuring integrity and authenticity.
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-600 p-6 rounded-lg bg-gray-800">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="6" cy="6" r="3"></circle>
                        <circle cx="6" cy="18" r="3"></circle>
                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-white font-medium title-font mb-2">
                      Instant Validation
                    </h2>
                    <p className="leading-relaxed text-base text-gray-400">
                      Organizations can instantly validate the authenticity of
                      certificates through a decentralized blockchain network.
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-600 p-6 rounded-lg bg-gray-800">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h2 className="text-lg text-white font-medium title-font mb-2">
                      Digital Locker Integration
                    </h2>
                    <p className="leading-relaxed text-base text-gray-400">
                      Store your digital certificates securely in an integrated
                      digital locker for easy access and sharing.
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-600 p-6 rounded-lg bg-gray-800">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-white font-medium title-font mb-2">
                      Easy Access
                    </h2>
                    <p className="leading-relaxed text-base text-gray-400">
                      Access your certificates anytime and anywhere, with easy
                      sharing options for verification purposes.
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-600 p-6 rounded-lg bg-gray-800">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-white font-medium title-font mb-2">
                      Tamper-Proof
                    </h2>
                    <p className="leading-relaxed text-base text-gray-400">
                      Blockchain technology ensures that your certificates
                      cannot be tampered with, providing ultimate security.
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-600 p-6 rounded-lg bg-gray-800">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                        <path d="M21 12a9 9 0 00-18 0v6"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-white font-medium title-font mb-2">
                      Universal Recognition
                    </h2>
                    <p className="leading-relaxed text-base text-gray-400">
                      Recognized globally, your digital certificates are valid
                      anywhere, anytime, with blockchain verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        {/* Steps Section */}
        <div className="text-gray-200 body-font bg-black">
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <div className="flex flex-wrap w-full">
              <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                {[
                  {
                    step: "STEP 1",
                    description:
                      "VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.",
                    icon: (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    ),
                  },
                  {
                    step: "STEP 2",
                    description:
                      "Vice migas literally kitsch +1 pok pok. Truffaut hot chicken slow-carb health goth, vape typewriter.",
                    icon: (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    ),
                  },
                  {
                    step: "STEP 3",
                    description:
                      "Coloring book nar whal glossier master cleanse umami. Salvia +1 master cleanse blog taiyaki.",
                    icon: (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="5" r="3"></circle>
                        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                      </svg>
                    ),
                  },
                  {
                    step: "STEP 4",
                    description:
                      "VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.",
                    icon: (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    ),
                  },
                  {
                    step: "FINISH",
                    description:
                      "Pitchfork ugh tattooed scenester echo park gastropub whatever cold-pressed retro.",
                    icon: (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                    ),
                  },
                ].map((step, index) => (
                  <div className="flex relative pb-12" key={index}>
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                      {step.icon}
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-200 mb-1 tracking-wider">
                        {step.step}
                      </h2>
                      <p className="leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <img
                className="lg:w-3/5 md:w-1/2 w-3/4 h-auto object-cover object-center rounded-lg md:mt-0 mt-12"
                src="https://dummyimage.com/1200x500"
                alt="step"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NewLandingPage;
