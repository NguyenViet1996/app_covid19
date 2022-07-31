import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import LineChart from "../Charts/LineChart/index";
import HighMaps from "../Charts/HighMaps/index";

export default function Summary({ report, countryName }) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (countryName) {
      import(
        `@highcharts/map-collection/countries/${countryName}/${countryName}-all.geo.json`
      )
        .then((res) => setMapData(res))
        .catch((error) => console.log(error));
    }
  }, [countryName]);

  return (
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}
