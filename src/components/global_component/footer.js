import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>
              &copy; 2023, Powered By{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href="http://www.nodlays.com"
                rel="noreferrer"
              >
                Nodlays
              </a>
            </span>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
