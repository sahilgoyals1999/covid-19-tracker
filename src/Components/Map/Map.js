import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "../Util/Util";

// pasess all the countries data, casesType, center and Zomm
const Map = ({ countries, casesType, center, zoom }) => {
  var color_graph = (casesType === "recovered") ? "7dd71d": "#fb4443";
  var color_b_graph = (casesType === "recovered") ? "rgba(125, 215, 29, 0.5)" : "rgba(251, 68, 67, 0.5)";
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType, color_graph, color_b_graph)}
      </MapContainer>
    </div>
  );
}

export default Map;
