import React from "react";

function UserLayout() {
  return (
    <>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0">
        <div className="bg-white">
          <div className="flex-col flex">
            <div className="w-full border-b-2 border-gray-200"></div>
            <div className="flex bg-gray-100  overflow-x-hidden">
              <div className="bg-white lg:flex md:w-64 md:flex-col">
                <div className="flex-col pt-5 flex overflow-y-auto">
                  <div className="h-full flex-col justify-between px-4 flex">
                    <div className="space-y-4">
                      <div className="bg-top bg-cover space-y-1">
                        <a
                          href="#"
                          className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                        >
                          <span className="justify-center items-center flex">
                            <svg
                              className="flex-shrink-0 w-5 h-5 mr-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1
                              1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                          </span>
                          <span>Dashboard</span>
                        </a>
                        <a
                          href="#"
                          className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                        >
                          <span className="justify-center items-center flex">
                            <svg
                              className="mr-4"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 10L8 16"
                                stroke="#4F4F4F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 12V16"
                                stroke="#4F4F4F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16 8V16"
                                stroke="#4F4F4F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="16"
                                rx="2"
                                stroke="#4F4F4F"
                                strokeWidth="2"
                              />
                            </svg>
                          </span>
                          <span>Hero</span>
                        </a>
                      </div>
                      <div>
                        <p className="px-4 font-semibold text-xs tracking-widest text-gray-400 uppercase">
                          Data
                        </p>
                        <div className="mt-4 bg-top bg-cover space-y-1">
                          <a
                            href="#"
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <svg
                                className="mr-4"
                                width="24"
                                height="24"
                                viewBox="0 0 20 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <ellipse
                                  cx="12"
                                  cy="7"
                                  rx="7"
                                  ry="3"
                                  stroke="#4F4F4F"
                                  strokeWidth="2"
                                />
                              </svg>
                            </span>
                            <span>Folders</span>
                          </a>
                          <a
                            href="#"
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <svg
                                className="mr-4"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.90112 11.8461C7.55156 9.56955 9.63235 8 12 8V8C14.3676 8 16.4484 9.56954 17.0989 11.8461L17.6571 13.7998C17.8843 14.5951 18.2336 15.3504 18.6924 16.0386L18.8012 16.2018C18.9408 16.4111 19.0105 16.5158 19.045 16.5932C19.3105 17.1894 18.943 17.8759 18.2997 17.9857C18.2162 18 18.0904 18 17.8388 18H6.16116C5.90958 18 5.78379 18 5.70027 17.9857C5.05697 17.8759 4.68952 17.1894 4.955 16.5932C4.98947 16.5158 5.05924 16.4111 5.19879 16.2018L5.30758 16.0386C5.76642 15.3504 6.11569 14.5951 6.34293 13.7998L6.90112 11.8461Z"
                                  fill="#4F4F4F"
                                />
                                <path
                                  d="M11 9L12 3"
                                  stroke="#4F4F4F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13 9L12 3"
                                  stroke="#4F4F4F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.5 21H11.5"
                                  stroke="#4F4F4F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                            <span>Alerts</span>
                          </a>
                          <a
                            href="#"
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <svg
                                className="flex-shrink-0 w-5 h-5 mr-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2
                                2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </span>
                            <span>Statistics</span>
                            <span
                              className="px-2 py-0.5 items-center font-semibold text-xs ml-auto bg-indigo-50 text-indigo-600
                        rounded-full uppercase border border-indigo-300 inline-flex"
                            >
                              New
                            </span>
                          </a>
                        </div>
                      </div>
                      <div>
                        <p className="px-4 font-semibold text-xs tracking-widest text-gray-400 uppercase">
                          Contact
                        </p>
                        <div className="mt-4 bg-top bg-cover space-y-1">
                          <a
                            href="#"
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <svg
                                className="flex-shrink-0 w-5 h-5 mr-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012 2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                              </svg>
                            </span>
                            <span>Forms</span>
                            <span
                              className="px-2 py-0.5 items-center font-semibold text-xs ml-auto bg-gray-500 text-white
                        rounded-full uppercase border border-transparent inline-flex"
                            >
                              15
                            </span>
                          </a>
                          <a
                            href="#"
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <svg
                                className="mr-4"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="#4F4F4F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M7.88124 15.7559C8.37391 16.1826 9.02309 16.4909 9.72265 16.6928C10.4301 16.897 11.2142 17 12 17C12.7858 17 13.5699 16.897 14.2774 16.6928C14.9769 16.4909 15.6261 16.1826 16.1188 15.7559"
                                  stroke="#4F4F4F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <circle
                                  cx="9"
                                  cy="10"
                                  r="1.25"
                                  fill="#4F4F4F"
                                  stroke="#4F4F4F"
                                  strokeWidth="0.5"
                                  strokeLinecap="round"
                                />
                                <circle
                                  cx="15"
                                  cy="10"
                                  r="1.25"
                                  fill="#4F4F4F"
                                  stroke="#4F4F4F"
                                  strokeWidth="0.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                            <span>Agents</span>
                          </a>
                          <a
                            href="#"
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <svg
                                className="flex-shrink-0 w-5 h-5 mr-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                              </svg>
                            </span>
                            <span>Customers</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 pb-4">
                      <div className="bg-top bg-cover space-y-1">
                        <a
                          href="#"
                          className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                        >
                          <span className="justify-center items-center flex">
                            <svg
                              className="flex-shrink-0 w-5 h-5 mr-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.940 3.310 .826 2.370 2.370a1.724 1.724 0 001.065 2.572c1.756 .426 1.756 2.924 0 3.350a1.724 1.724 0 00-1.066 2.573c.940 1.543-.826 3.310-2.370 2.370a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.350 0a1.724 1.724 0 00-2.573-1.066c-1.543 .940-3.310-.826-2.370-2.370a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.350a1.724 1.724 0 001.066-2.573c-.940-1.543 .826-3.310 2.370-2.370c.996 .608 2.296 .070 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </span>
                          <span>Settings</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLayout;
