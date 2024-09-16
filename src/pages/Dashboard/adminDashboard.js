import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Grid } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import CustomBox from "../../components/custom/box";
import CustomCard from "../../theme-styles/customCard";
import HorizontalBars from "../../components/Charts/barChart";

const AdminDashboard = () => {
  const data = useSelector((state) => state?.authentication?.userAuth);

  if (data.role !== "0") {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} xl={3}>
          <CustomCard
            sx={{
              backgroundImage: "radial-gradient(circle, #D60BFF, #304FFE)",
              color: "white",
            }}
          >
            <CustomBox
              icon={
                <ReceiptIcon
                  sx={{
                    fontSize: "45px",
                    border: "1px  solid #fff",
                    borderRadius: "100%",
                    padding: "7px",
                  }}
                />
              }
              value1={"2478"}
              value2={"Total Invoices"}
            />
          </CustomCard>
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <CustomCard
            sx={{
              backgroundImage: "radial-gradient(circle, #304FFE, #D60BFF)",
              color: "white",
            }}
          >
            <CustomBox
              icon={
                <CheckBoxIcon
                  sx={{
                    fontSize: "45px",
                    border: "1px  solid #fff",
                    borderRadius: "100%",
                    padding: "7px",
                  }}
                />
              }
              value1={"2478"}
              value2={"Total Invoices"}
            />
          </CustomCard>
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <CustomCard
            sx={{
              backgroundImage: "radial-gradient(circle, #D60BFF, #304FFE)",
              color: "white",
            }}
          >
            <CustomBox
              icon={
                <EventBusyIcon
                  sx={{
                    fontSize: "45px",
                    border: "1px  solid #fff",
                    borderRadius: "100%",
                    padding: "7px",
                  }}
                />
              }
              value1={"2478"}
              value2={"Total Invoices"}
            />
          </CustomCard>
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <CustomCard
            sx={{
              backgroundImage: "radial-gradient(circle, #304FFE, #D60BFF)",
              color: "white",
            }}
          >
            <CustomBox
              icon={
                <AssignmentLateIcon
                  sx={{
                    fontSize: "45px",
                    border: "1px  solid #fff",
                    borderRadius: "100%",
                    padding: "7px",
                  }}
                />
              }
              value1={"2478"}
              value2={"Total Invoices"}
            />
          </CustomCard>
        </Grid>
      </Grid>

      <Grid container spacing={2} my={2}>
        <Grid item sm={12} xl={6}>
          <CustomCard>
            <HorizontalBars />
          </CustomCard>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboard;
