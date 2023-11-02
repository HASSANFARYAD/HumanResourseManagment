import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { logoutAction } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  let profileLinks = [
    {
      name: "Profile",
      to: "/update-profile",
    },
    {
      name: "Password",
      to: "/update-password",
    },
  ];

  const [activeMenu, setActiveMenu] = useState(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem("activeMenu");
    const isDropdownOpen = localStorage.getItem("isDropdownOpen");
    if (storedActiveMenu) {
      setActiveMenu(storedActiveMenu);
    }
    if (isDropdownOpen) {
      setDropdownIsOpen(true);
    }
  }, []);

  const handleMenuClick = (menuName, isDropdownitem) => {
    if (isDropdownitem) {
      setDropdownIsOpen(isDropdownitem);
      localStorage.setItem("isDropdownOpen", isDropdownitem);
    } else {
      localStorage.removeItem("isDropdownOpen");
      setDropdownIsOpen(false);
    }
    setActiveMenu(menuName);
    localStorage.setItem("activeMenu", menuName);
  };

  const isMenuActive = (menuName) => {
    return activeMenu === menuName ? "active" : "";
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100">
        <div
          className="custom-card-sidebar mb-3"
          style={{
            backgroundImage: `url(
              "https://neurosciencenews.com/files/2023/05/neuroscience-fitness.jpg"
            )`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="text-center p-4">
            <img
              src="https://neurosciencenews.com/files/2023/05/neuroscience-fitness.jpg"
              className="img-fluid rounded mx-auto d-block"
            />
            <h3 className="text-white">Has SAn</h3>
            <h6 className="text-white">Admin</h6>
          </div>
        </div>
        <div className="w-100 px-3">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
            id="menu"
          >
            <li className="w-100">
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                className="nav-link text-white align-middle px-0"
              >
                <i className="fs-4 bi-speedometer2"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Manage Users</span>
              </a>
              <ul
                className={`collapse nav custom-collapse flex-column ${
                  dropdownIsOpen ? "show" : ""
                }`}
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li className={`nav-item ${isMenuActive("Add Users")} w-100`}>
                  <NavLink
                    to="/add-user"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-white px-0 active"
                        : "nav-link text-white px-0"
                    }
                    onClick={() => handleMenuClick("Add Users", true)}
                  >
                    Add Users
                  </NavLink>
                </li>

                <li className={`nav-item ${isMenuActive("Users List")} w-100`}>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-white px-0 active"
                        : "nav-link text-white px-0"
                    }
                    onClick={() => handleMenuClick("Users List", true)}
                  >
                    Users
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="w-100 text-center">
          <hr />
          <div className="dropdown pb-4">
            <a
              href="#"
              className="align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="hugenerd"
                width="30"
                height="30"
                className="rounded-circle"
              />
              <span className="d-none d-sm-inline mx-1">loser</span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              {profileLinks.map((item) => {
                return (
                  <>
                    <NavLink to={item.to} className="dropdown-item">
                      {item.name}
                    </NavLink>
                  </>
                );
              })}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  onClick={() => dispatch(logoutAction())}
                >
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

// <li className={`nav-item ${isMenuActive("Home")} w-100`}>
//               <a
//                 href="#"
//                 className={`nav-link text-white align-middle px-0 ${isMenuActive(
//                   "Home"
//                 )}`}
//                 onClick={() => handleMenuClick("Home", false)}
//               >
//                 <i className="fs-4 bi-house"></i>{" "}
//                 <span className="ms-1 d-none d-sm-inline">Home</span>
//               </a>
//             </li>
//             <li className="w-100">
//               <a
//                 href="#submenu1"
//                 data-bs-toggle="collapse"
//                 className="nav-link text-white align-middle px-0"
//               >
//                 <i className="fs-4 bi-speedometer2"></i>{" "}
//                 <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
//               </a>
//               <ul
//                 className={`collapse nav custom-collapse flex-column ${
//                   dropdownIsOpen ? "show" : ""
//                 }`}
//                 id="submenu1"
//                 data-bs-parent="#menu"
//               >
//                 <li className={`nav-item ${isMenuActive("Item 1")} w-100`}>
//                   <a
//                     href="#"
//                     class={`nav-link text-white px-0 ${isMenuActive("Item 1")}`}
//                     onClick={() => handleMenuClick("Item 1", true)}
//                   >
//                     {" "}
//                     <span className="d-none d-sm-inline">Item</span> 1{" "}
//                   </a>
//                 </li>

//                 <li className={`nav-item ${isMenuActive("Item 2")} w-100`}>
//                   <a
//                     href="#"
//                     class={`nav-link text-white px-0 ${isMenuActive("Item 2")}`}
//                     onClick={() => handleMenuClick("Item 2", true)}
//                   >
//                     {" "}
//                     <span className="d-none d-sm-inline">Item</span> 2{" "}
//                   </a>
//                 </li>
//               </ul>
//             </li>
//             <li className={`nav-item ${isMenuActive("Home")} w-100`}>
//               <a href="#" className="nav-link text-white px-0 align-middle">
//                 <i className="fs-4 bi-table"></i>{" "}
//                 <span className="ms-1 d-none d-sm-inline">Orders</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#submenu2"
//                 data-bs-toggle="collapse"
//                 className="nav-link text-white px-0 align-middle "
//               >
//                 <i className="fs-4 bi-bootstrap"></i>{" "}
//                 <span className="ms-1 d-none d-sm-inline">Bootstrap</span>
//               </a>
//               <ul
//                 className="collapse nav custom-collapse flex-column ms-1"
//                 id="submenu2"
//                 data-bs-parent="#menu"
//               >
//                 <li className="w-100">
//                   <a href="#" className="nav-link text-white px-0">
//                     {" "}
//                     <span className="d-none d-sm-inline">Item</span> 1
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="nav-link text-white px-0">
//                     {" "}
//                     <span className="d-none d-sm-inline">Item</span> 2
//                   </a>
//                 </li>
//               </ul>
//             </li>
//             <li>
//               <a
//                 href="#submenu3"
//                 data-bs-toggle="collapse"
//                 className="nav-link text-white px-0 align-middle"
//               >
//                 <i className="fs-4 bi-grid"></i>{" "}
//                 <span className="ms-1 d-none d-sm-inline">Products</span>{" "}
//               </a>
//               <ul
//                 className="collapse nav custom-collapse flex-column ms-1"
//                 id="submenu3"
//                 data-bs-parent="#menu"
//               >
//                 <li className="w-100">
//                   <a href="#" className="nav-link text-white px-0">
//                     {" "}
//                     <span className="d-none d-sm-inline">Product</span> 1
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="nav-link text-white px-0">
//                     {" "}
//                     <span className="d-none d-sm-inline">Product</span> 2
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="nav-link text-white px-0">
//                     {" "}
//                     <span className="d-none d-sm-inline">Product</span> 3
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="nav-link text-white px-0">
//                     {" "}
//                     <span className="d-none d-sm-inline">Product</span> 4
//                   </a>
//                 </li>
//               </ul>
//             </li>
//             <li>
//               <a href="#" className="nav-link text-white px-0 align-middle">
//                 <i className="fs-4 bi-people"></i>{" "}
//                 <span className="ms-1 d-none d-sm-inline">Customers</span>{" "}
//               </a>
//             </li>
