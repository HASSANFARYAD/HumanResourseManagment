import { useEffect, useState } from "react";
import "./Dashboard.css";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { dashboardGraphDetail } from "../redux/AdminController";
import { logDOM } from "@testing-library/react";
import { ColumnBarChart, TrafficSourcesGraph } from "./charts/ColumnBarChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.authentication);
  const [showSpinner, setShowSpinner] = useState(true);
  const [dashboardDetailDto, setDashboardDetailDto] = useState([]);

  const fetchDashboardGraphData = async () => {
    setShowSpinner(true);
    try {
      const response = await dispatch(dashboardGraphDetail());

      if (dashboardGraphDetail.fulfilled.match(response)) {
        console.log("graph data :: ", response?.payload);
        setDashboardDetailDto(response?.payload);
      }
      setShowSpinner(false);
    } catch (error) {
      console.error("Error fetching graph data:", error);
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    fetchDashboardGraphData();
  }, []);

  return (
    <>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </a>
      </div>

      {/* Content Row */}
      <div className="row">
        {/* Companies */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Companies
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {dashboardDetailDto && dashboardDetailDto.totalCompanies}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-building fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Departments
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-2 font-weight-bold text-gray-800">
                        {dashboardDetailDto &&
                          dashboardDetailDto.totalDepartments}
                      </div>
                    </div>
                    <div className="col">
                      {/* <div className="progress progress-sm mr-2">
                          <div
                            className="progress-bar bg-info progress-bar1"
                            role="progressbar"
                            style={{ width: "50%" }}
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {dashboardDetailDto && dashboardDetailDto.totalUsers}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Projects
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {dashboardDetailDto && dashboardDetailDto.totalProjects}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-project-diagram fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Row */}
      <div className="row">
        {/* Content Column */}
        <div className="col-lg-12 mb-4">
          {/* Project Card Example */}
          <div className="card shadow mb-4">
            <div className="card-body">
              <h4 className="small font-weight-bold">
                New Joinees This Month{" "}
                <span className="float-right">
                  {dashboardDetailDto &&
                    dashboardDetailDto.newJoineesThisMonth &&
                    dashboardDetailDto.newJoineesThisMonth}
                </span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar  progress-bar4"
                  role="progressbar"
                  // style={{ width: "60%" }}
                  style={{
                    width:
                      dashboardDetailDto &&
                      dashboardDetailDto.newJoineesThisMonth &&
                      dashboardDetailDto.newJoineesThisMonth,
                  }}
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <h4 className="small font-weight-bold">
                Projects Open
                <span className="float-right">
                  {dashboardDetailDto &&
                    dashboardDetailDto.totalProjectsOpen &&
                    dashboardDetailDto.totalProjectsOpen}
                </span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-info  progress-bar5"
                  role="progressbar"
                  style={{
                    width:
                      dashboardDetailDto &&
                      dashboardDetailDto.totalProjectsOpen &&
                      dashboardDetailDto.totalProjectsOpen,
                  }}
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <h4 className="small font-weight-bold">
                Projects Closed{" "}
                <span className="float-right">
                  {dashboardDetailDto &&
                    dashboardDetailDto.totalProjectsClosed &&
                    dashboardDetailDto.totalProjectsClosed}
                </span>
              </h4>
              <div className="progress">
                <div
                  className="progress-bar bg-success progress-bar6"
                  role="progressbar"
                  // style={{ width: "100%" }}
                  style={{
                    width:
                      dashboardDetailDto &&
                      dashboardDetailDto.totalProjectsClosed &&
                      dashboardDetailDto.totalProjectsClosed,
                  }}
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {userAuth && userAuth?.companyId && (
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Expense Tracking
                </h6>
              </div>
              <ColumnBarChart />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Loans & Advances Tracking
                </h6>
              </div>
              <TrafficSourcesGraph />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
