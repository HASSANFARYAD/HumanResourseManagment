import React, { useState } from "react";

const UpdatePassword = () => {
  return (
    <>
      <div className="row col-md-8 offset-md-2">
        <div className="card">
          <div className="card-body">
            <form className="form">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Old Password</label>
                    <input type="password" className="form-control" required />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="fw-semibold">New Password</label>
                    <input type="password" className="form-control" required />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Confirm Password</label>
                    <input type="password" className="form-control" required />
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-danger me-md-2">
                  Update Profile
                </button>
                <button className="btn btn-primary" type="submit">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
