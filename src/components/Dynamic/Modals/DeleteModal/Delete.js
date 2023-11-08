import React from "react";

const Delete = ({ ...props }) => {
  const handleSubmit = () => {};
  return (
    <>
      <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-danger">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Danger
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Are you sure you want to delete this?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delete;
