/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, Outlet } from "react-router-dom";
import {
  BellIcon,
  Bars4Icon,
  XCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/auth/authSlice";
import UserLayout from "../../../Layout/UserLayout";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Create", href: "/create-post", current: false },
  { name: "Posts", href: "/posts", current: false },
  { name: "Profile", href: "/users", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PrivateNavbar = ({ isLogin }) => {
  const userNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Your Profile", href: `/profile/${isLogin?.userEncId}` },
    { name: "Change your password", href: "/update-password" },
  ];

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  //logout
  const dispatch = useDispatch();
  return (
    <>
      <Disclosure as="nav" className="bg-gray-100">
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <div className="md:hidden">
                    <button
                      onClick={toggleSidebar}
                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                      {showSidebar ? (
                        <Bars4Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars4Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex-shrink-0 flex">
                  <Link to="/" className="text-2xl font-bold text-indigo-500">
                    Your Logo
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  <div className="flex">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center ml-3">
                <Link
                  to="/create-post"
                  className="pr-3 mr-4 border-r border-gray relative inline-flex items-center mr-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  <span>New Post</span>
                </Link>

                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={isLogin?.profilePicture}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => dispatch(logoutAction())}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                )}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>
        </>
      </Disclosure>
      <div style={{ display: "flex" }}>
        <div className="">{showSidebar || <UserLayout />}</div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PrivateNavbar;
