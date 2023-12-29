import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const ColumnBarChart = () => {
  const options = {
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "",
    },
    data: [
      {
        // Change type to "column", "doughnut", "line", "splineArea", etc.
        type: "doughnut",
        indexLabel: "{label} - {y}$",
        dataPoints: [
          { label: "Food", y: 10 },
          { label: "Accessories", y: 15 },
          { label: "Laptops", y: 25 },
          { label: "Utillity Bills", y: 30 },
          { label: "Salaries", y: 28 },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

// second graph - website traffic sources

const TrafficSourcesGraph = () => {
  const options = {
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 14,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 18, label: "Direct" },
          { y: 49, label: "Organic Search" },
          { y: 9, label: "Paid Search" },
          { y: 5, label: "Referral" },
          { y: 10, label: "Social" },
          { y: 9, label: "Test" },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        //   onRef={(ref) => (this.chart = ref)}
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export { ColumnBarChart, TrafficSourcesGraph };
