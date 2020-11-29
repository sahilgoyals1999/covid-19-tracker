import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import GroupIcon from '@material-ui/icons/Group';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

// if isRed is false it means selected item is Recovered Cases  
const InfoBox = ({ title, cases, total, active, isRed, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox-selected"} ${
        isRed && "infoBox-red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <div className="infoBox_icon">
         <h2 className={`infoBox_cases ${!isRed && "infoBox_cases-green"}`}>
           {cases}
         </h2>
         {title === "Cases" ? <GroupIcon fontSize='large'/> : null}
         {title === "Recovered" ? <AccessibilityNewIcon fontSize='large'/> : null}
         {title === "Deaths" ? <AirlineSeatIndividualSuiteIcon fontSize='large'/> : null}
        </div>
        <Typography className="infoBox_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
