import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

// hex => color
const casesTypeColors = {
  "cases": {
    multiplier: 400,
  },
  "recovered": {
    multiplier: 600,
  },
  "deaths": {
    multiplier: 800,
  },
};

export const sortData = (data) => {
  let sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases) ? -1 : 1);
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

// by default casesType is casses
export const showDataOnMap = (data, casesType = "cases", color_graph, color_b_graph) =>
  data.map(country => (
    <Circle
    key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={color_graph}
      fillColor={color_b_graph}
      fillOpacity={0.4}
      radius = {
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
        <div className="info-main">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          </div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));