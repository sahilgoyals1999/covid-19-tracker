import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

// For Defining opetions for the graph
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

// For Collecting the usefull data after calling api 
const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

// casesType refers to cases, recovered or deaths
const LineGraph = ({ casesType, ...props }) => {
  const [data, setData] = useState({});
  // Fetchhing last 120 days data of worldwide for Graph when casesType changes 
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);
  
  var color_graph = (casesType === "recovered") ? "7dd71d": "#fb4443";
  var color_b_graph = (casesType === "recovered") ? "rgba(125, 215, 29, 0.5)" : "rgba(251, 68, 67, 0.5)";
  return (
    <div className={props.className}>
     {/* data?.length() > 0 or (data && data.length > 0) both are same */} 
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: color_b_graph,
                borderColor: color_graph,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
