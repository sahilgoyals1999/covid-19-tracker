import React, { useState, useEffect } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import InfoBox from "./Components/InfoBox/InfoBox";
import LineGraph from "./Components/LineGraph/LineGraph";
import Table from "./Components/Table/Table";
import Social from "./Components/Social/Social"
import { sortData, prettyPrintStat } from "./Components/Util/Util";
import Map from "./Components/Map/Map";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Paper,
  Typography
} from "@material-ui/core";
import numeral from "numeral";
import {
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 28.630629, lng: 77.199387 });
  const [mapZoom, setMapZoom] = useState(3);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  })

  // Fetching WorldWide data when App loads
  useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

  // Fetching data of all Countries
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then(res => res.json())
        .then(data => {
          const countries = data.map(country => ({
            key: country.country,
            name: country.country,
            value: country.countryInfo.iso2
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  // Fetching data of a particular country when user changes it
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url = countryCode === "worldwide"
               ? "https://disease.sh/v3/covid-19/all"
               : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        const lat = (data.countryInfo) ? data.countryInfo.lat : 28.630629;
        const long = (data.countryInfo) ? data.countryInfo.long : 77.199387;
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([lat, long]);
        setMapZoom(4);
      });
  };

  return (
    <ThemeProvider theme={theme}>
    <Paper className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 Tracker</h1>
          <div className="app_form_toggle">
          <Brightness4Icon style={{ margin: '10px 30px'}} fontSize='large' onClick={() => setDarkMode(!darkMode)}/>
            <FormControl>
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
        </div>
        <div className="app_stats">
          <InfoBox
            title="Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
            onClick={e => setCasesType("cases")}
          />
          <InfoBox
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
            onClick={e => setCasesType("recovered")}
          />
          <InfoBox
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
            onClick={e => setCasesType("deaths")}
          />
        </div>
       <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <div className="app_information">
            <Typography variant="h5">Live Cases Country Wise</Typography>
            <Table countries={tableData} />
            <Typography variant="h5" className="app_right_title">Worldwide New {casesType}</Typography>
            <LineGraph className="app_graph" casesType={casesType} />
          </div>
        </CardContent>
      </Card>
      </Paper>
      <Social />
      </ThemeProvider>
  );
};

export default App;