import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import CustomModal from "./CustomModal";
import UserDropdown from "./UserDropdown";

const Sidebar = () => {
  const { userAuth } = useSelector((state) => state.authentication);
  const [showUserDropdownModal, setshowUserDropdownModal] = useState(false);
  const handleCloseModal = () => {
    setshowUserDropdownModal(false);
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = () => {
      const sidebar = document.querySelector(".sidebar");
      const isToggled = sidebar.classList.contains("toggled");

      document.body.classList.toggle("sidebar-toggled");
      sidebar.classList.toggle("toggled");

      if (!isToggled && sidebar.classList.contains("toggled")) {
        // eslint-disable-next-line no-undef
        const collapseElement = new bootstrap.Collapse(sidebar, {
          toggle: false,
        });
        collapseElement.hide();
      }
    };

    const handleWindowResize = () => {
      // eslint-disable-next-line no-undef
      const sidebarCollapse = new bootstrap.Collapse(
        document.querySelector(".sidebar .collapse"),
        {
          toggle: false,
        }
      );

      if (window.innerWidth < 768) {
        sidebarCollapse.hide();
      }

      if (
        window.innerWidth < 480 &&
        !document.querySelector(".sidebar").classList.contains("toggled")
      ) {
        document.body.classList.add("sidebar-toggled");
        document.querySelector(".sidebar").classList.add("toggled");
        sidebarCollapse.hide();
      }
    };

    const handleMouseWheel = (e) => {
      if (window.innerWidth > 768) {
        const delta = e.deltaY || -e.detail || e.wheelDelta; // Use whichever property is available
        const sidebar = document.querySelector("body.fixed-nav .sidebar");

        if (sidebar) {
          sidebar.scrollTop += (delta < 0 ? 1 : -1) * 30;
          e.preventDefault();
        }
      }
    };

    const handleScroll = () => {
      const scrollDistance = window.scrollY;
      if (scrollDistance > 100) {
        document.querySelector(".scroll-to-top").style.display = "block";
      } else {
        document.querySelector(".scroll-to-top").style.display = "none";
      }
    };

    const handleScrollToTop = (e) => {
      const $anchor = e.target;
      document.querySelector("html, body").animate(
        {
          scrollTop: document.querySelector($anchor.getAttribute("href"))
            .offsetTop,
        },
        1000,
        "easeInOutExpo"
      );
      e.preventDefault();
    };

    // Event listeners
    document
      .getElementById("sidebarToggle")
      .addEventListener("click", handleSidebarToggle);
    document
      .getElementById("sidebarToggleTop")
      .addEventListener("click", handleSidebarToggle);
    window.addEventListener("resize", handleWindowResize);
    // document.body.addEventListener("mousewheel", handleMouseWheel);
    // document.body.addEventListener("DOMMouseScroll", handleMouseWheel);
    // window.addEventListener("scroll", handleScroll);
    // document.addEventListener("click", (e) => {
    //   if (e.target.classList.contains("scroll-to-top")) {
    //     handleScrollToTop(e);
    //   }
    // });

    // Cleanup listeners on component unmount
    return () => {
      document
        .getElementById("sidebarToggle")
        ?.removeEventListener("click", handleSidebarToggle);
      document
        .getElementById("sidebarToggleTop")
        ?.removeEventListener("click", handleSidebarToggle);
      window?.removeEventListener("resize", handleWindowResize);
      document?.body.removeEventListener("mousewheel", handleMouseWheel);
      document?.body.removeEventListener("DOMMouseScroll", handleMouseWheel);
      window?.removeEventListener("scroll", handleScroll);
      document?.removeEventListener("click", (e) => {
        if (e.target.classList.contains("scroll-to-top")) {
          handleScrollToTop(e);
        }
      });
    };
  }, []);

  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <NavLink
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text  mx-3">
            <NavLink className="text-white" to="/">
              HRM System
            </NavLink>
          </div>
        </NavLink>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <NavLink className="nav-link text-white" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Heading */}
        {/* <div className="sidebar-heading">Addons</div> */}

        {/* Nav Item - Add Company Collapse Menu */}
        {userAuth && !userAuth.companyName ? (
          <>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="/"
                data-toggle="collapse"
                data-target="#collapseMCompany"
                aria-expanded="true"
                aria-controls="collapseMCompany"
              >
                <i className="fas fa-fw fa-university"></i>
                <span>Manage Compnay</span>
              </a>
              <div
                id="collapseMCompany"
                className="collapse"
                aria-labelledby="headingMCompany"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <NavLink className="collapse-item" to="add-company">
                    Add Company
                  </NavLink>
                  <div className="collapse-divider"></div>
                  <NavLink className="collapse-item" to="company-list">
                    Company List
                  </NavLink>
                </div>
              </div>
            </li>
          </>
        ) : (
          ""
        )}

        {/* Nav Item - Department Collapse Menu */}
        {userAuth && userAuth.role !== "SuperAdmin" ? (
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="/"
              data-toggle="collapse"
              data-target="#collapseMDepartments"
              aria-expanded="true"
              aria-controls="collapseMDepartments"
            >
              <i className="fas fa-fw fa-building"></i>
              <span>Manage Department</span>
            </a>
            <div
              id="collapseMDepartments"
              className="collapse"
              aria-labelledby="headingMDepartments"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <NavLink className="collapse-item" to="add-department">
                  Add Department
                </NavLink>
                <div className="collapse-divider"></div>
                <NavLink className="collapse-item" to="department-list">
                  Department List
                </NavLink>
              </div>
            </div>
          </li>
        ) : (
          ""
        )}

        {/* Nav Item - User Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="/"
            data-toggle="collapse"
            data-target="#collapseMUsers"
            aria-expanded="true"
            aria-controls="collapseMUsers"
          >
            <i className="fas fa-fw fa-user"></i>
            <span>Manage User</span>
          </a>
          <div
            id="collapseMUsers"
            className="collapse"
            aria-labelledby="headingMUsers"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <NavLink className="collapse-item" to="add-user">
                Add User
              </NavLink>
              <div className="collapse-divider"></div>
              <NavLink className="collapse-item" to="user-list">
                Users List
              </NavLink>
              <div className="collapse-divider"></div>
              <span
                className="collapse-item"
                onClick={() => setshowUserDropdownModal(true)}
              >
                User Document
              </span>
            </div>
          </div>
        </li>

        {/* Nav Item - UserDocument Collapse Menu */}
        {/*<li className="nav-item">
          <button
            className="nav-link"
            data-target="#collapseUserDocument"
            aria-expanded="true"
            aria-controls="collapseUserDocument"
            onClick={() => setshowUserDropdownModal(true)}
          >
            <i className="fas fa-fw fa-file"></i>
            <span>User Document</span>
          </button>
        </li> */}

        {/* Nav Item - Leave Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="/"
            data-toggle="collapse"
            data-target="#collapseMLeaves"
            aria-expanded="true"
            aria-controls="collapseMLeaves"
          >
            <i className="bi bi-x-diamond-fill"></i>
            <span>Manage Leaves</span>
          </a>
          <div
            id="collapseMLeaves"
            className="collapse"
            aria-labelledby="headingMLeaves"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <NavLink className="collapse-item" to="leave-requests">
                Requests
              </NavLink>
              <div className="collapse-divider"></div>
              <NavLink className="collapse-item" to="leave-approvals">
                Approvals
              </NavLink>
            </div>
          </div>
        </li>

        {/* Nav Item - Quick Payroll Insights Collapse Menu */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/payroll-insights">
            <i className="bi bi-x-diamond-fill"></i>
            <span>Payroll Insights</span>
          </NavLink>
        </li>

        {/* Nav Item - Expense Collapse Menu */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/payroll-insights">
            <i className="bi bi-coin"></i>
            <span>Expense</span>
          </NavLink>
        </li>

        {/* Nav Item - Work from Home Collapse Menu */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/payroll-insights">
            <i className="bi bi-house-check-fill"></i>
            <span>Work from Home</span>
          </NavLink>
        </li>

        {/* Nav Item - Loan & Advances Collapse Menu */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/payroll-insights">
            <i className="bi bi-cash-coin"></i>
            <span>Loan & Advances</span>
          </NavLink>
        </li>

        {/* Nav Item - Overtime Collapse Menu */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/payroll-insights">
            <i className="bi bi-smartwatch"></i>
            <span>Overtime</span>
          </NavLink>
        </li>

        {/* Nav Item - Promotion Collapse Menu */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/payroll-insights">
            <i className="fas fa-fw fa-signal"></i>
            <span>Promotions</span>
          </NavLink>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>

      <CustomModal
        show={showUserDropdownModal}
        onHide={handleCloseModal}
        size="lg"
        classes="bg-primary text-white py-2"
        title={"User Document"}
        body={
          <>
            <UserDropdown onSuccessModal={setshowUserDropdownModal} />
          </>
        }
      />
    </>
  );
};

export default Sidebar;
