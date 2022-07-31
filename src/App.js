import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis/index";
import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";
import { sortBy } from "lodash";
import { Container, Typography } from "@material-ui/core";
import moment from "moment";
import "moment/locale/vi";
import "@fontsource/roboto";
moment.locale("vi");

const DEFAULT_NAME_COUNTRY = "mx";  

function App() {
  const [countries, setCountries] = useState([]);
  const [selectCountryName, setSelectCountryName] =
    useState(DEFAULT_NAME_COUNTRY);
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const countries = sortBy(res.data, "Country");
      setCountries(countries);
    });
  }, []);

  const handleOnChange = (e) => {
    setSelectCountryName(e.target.value);
  };

  useEffect(() => {
    const existCountryName = selectCountryName && selectCountryName !== "";
    const existCountry = countries && countries.length !== 0;
    if (existCountryName && existCountry) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectCountryName
      );
      // call api
      getReportByCountry(Slug).then((res) => {
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries, selectCountryName]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        Số liệu Covid-19
      </Typography>
      <Typography>{moment().format("LLL")}</Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectCountryName}
      />
      <HighLight report={report} />
      <Summary report={report} countryName={selectCountryName} />
    </Container>
  );
}

export default App;
