import React from "react";
import "./Table.css";
import numeral from "numeral";
import {
  Paper
} from "@material-ui/core";

// for Showing all country cases in deseending order
const Table = ({ countries }) => {
  return (
    <Paper className="table">
      {countries.map(country => (
        <tr key={country.country}>
            <td>
              <img style={{height: '20px', width: '25px', padding: '0px 10px'}}src={country.countryInfo.flag} alt="flag" />
              {country.country}
            </td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </Paper>
  );
}

export default Table;
