import React from "react";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <div class="card w-100">
                <img
                  src="https://neurosciencenews.com/files/2023/05/neuroscience-fitness.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-4">
              <div class="card w-100">
                <img
                  src="https://neurosciencenews.com/files/2023/05/neuroscience-fitness.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div class="card w-100">
            <img
              src="https://neurosciencenews.com/files/2023/05/neuroscience-fitness.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
