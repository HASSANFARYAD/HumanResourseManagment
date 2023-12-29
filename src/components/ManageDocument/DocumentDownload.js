import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { GetDocumentDownloadPermission } from "../../utils/Permission/DocumentDownloadPermissions";
import { addPersonalDocument } from "../redux/AdminController";

function DocumentDownload({ userId, onSuccessModal }) {
  const [documentDownloadPermissionData, setDocumentDownloadPermission] =
    useState([]);
  const loggedInUser = useSelector((state) => state?.authentication?.userAuth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionData = await GetDocumentDownloadPermission(
          loggedInUser?.role
        );
        setDocumentDownloadPermission(permissionData);
      } catch (error) {
        // Handle error
        alert("error: ");
      }
    };

    fetchData();
  }, [loggedInUser?.role]);

  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);

  const initialValues = {
    userId: userId ? userId : "",
    documentType: "",
  };

  const validateDownloadDocument = Yup.object().shape({
    documentType: Yup.string().required("Please select document type"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: validateDownloadDocument,
    onSubmit: async (values) => {
      try {
        setShowSpinner(true);
        await dispatch(addPersonalDocument(values));
        onSuccessModal(false);
      } catch (error) {
      } finally {
        setShowSpinner(false);
      }
    },
  });

  return (
    <>
      <form className="documentDownload" onSubmit={handleSubmit}>
        <input type="hidden" value={values.userId} />

        <div className="form-group col-lg-12">
          <label className="form-label ml-1 fw-bold" htmlFor="exampleInputSDoc">
            Select Document Type
          </label>
          <select
            className="form-control"
            id="exampleInputSDoc"
            value={values.documentType}
            onBlur={handleBlur("documentType")}
            onChange={handleChange("documentType")}
          >
            <option selected="true" disabled="true" value="">
              Select Document Type
            </option>
            {documentDownloadPermissionData &&
              documentDownloadPermissionData.map((item) => (
                <option key={item.Id} value={item.Name}>
                  {item.Name}
                </option>
              ))}
          </select>
          {errors.documentType && (
            <small className="text-danger">{errors.documentType}</small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-user btn-block"
          disabled={showSpinner}
        >
          {showSpinner ? (
            <span>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </span>
          ) : (
            "Download"
          )}
        </button>
      </form>
    </>
  );
}

export default DocumentDownload;
