// StepForm.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";

const StepForm = ({ steps, formik, disabled }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  const nextStep = () => {
    const currentStepFields = steps[currentStep - 1].fields;
    const currentStepErrors = currentStepFields
      .map((field) => formik.errors[field.id])
      .filter(Boolean);
    if (currentStepErrors.length === 0) {
      setCurrentStep(currentStep + 1);
    } else {
      const firstError = currentStepErrors[0];
      toast.error(firstError);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <div className="mb-3 text-center">
        <h6>{steps[currentStep - 1].name}</h6>
      </div>
      <div class="progress" style={{ height: "10px" }}>
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          style={{
            width: `${(currentStep / totalSteps) * 100}%`,
          }}
          aria-valuenow={(currentStep / totalSteps) * 100}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      {steps[currentStep - 1].fields.map((field) => (
        <>
          <div key={field.id} className="mb-3">
            <label className="fw-semibold">{field.label}</label>
            {field.type === "select" ? (
              <select
                id={field.id}
                name={field.id}
                className="form-select"
                value={formik.values[field.id]}
                onChange={formik.handleChange(field.id)}
                onBlur={formik.handleBlur(field.id)}
              >
                {field.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                className="form-control"
                rows="3"
                placeholder={`Enter ${field.label}`}
                value={formik.values[field.id]}
                onChange={formik.handleChange(field.id)}
                onBlur={formik.handleBlur(field.id)}
              ></textarea>
            ) : field.type === "radio" ? (
              <div>
                {field.options.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={field.id}
                      id={`${field.id}-${option}`}
                      value={option}
                      checked={formik.values[field.id] === option}
                      onChange={formik.handleChange(field.id)}
                    />
                    <label className="form-check-label">{option}</label>
                  </div>
                ))}
              </div>
            ) : field.type === "date" && field.min ? (
              <input
                type={field.type}
                className="form-control"
                value={formik.values[field.id]}
                onChange={formik.handleChange(field.id)}
                onBlur={formik.handleBlur(field.id)}
                max={field.min}
              />
            ) : (
              <input
                type={field.type || "text"}
                className="form-control"
                value={formik.values[field.id]}
                onChange={formik.handleChange(field.id)}
                onBlur={formik.handleBlur(field.id)}
                autoComplete="on"
              />
            )}
          </div>
        </>
      ))}

      <div
        class="btn-group d-grid gap-2 d-md-flex justify-content-md-end"
        role="group"
        aria-label="Basic example"
      >
        {currentStep === totalSteps && (
          <button className="btn btn-primary" type="submit" disabled={disabled}>
            Submit
          </button>
        )}

        {currentStep > 1 && (
          <a
            className="btn btn-secondary"
            disabled={disabled}
            onClick={prevStep}
          >
            Previous
          </a>
        )}

        {currentStep < totalSteps && (
          <a className="btn btn-primary" disabled={disabled} onClick={nextStep}>
            Next
          </a>
        )}
      </div>
    </div>
  );
};

export default StepForm;
