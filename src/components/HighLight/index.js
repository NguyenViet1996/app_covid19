import React, { useEffect, useState } from "react";
import { Grid, CardContent, Typography } from "@material-ui/core";
import HighlightCard from "./HighlightCard";

export default function HighLight({ report }) {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const index = report.length !== 0 ? report.length - 1 : 0;
    const data = report[index];
    if (data && data.length !== 0) {
      setSummary([
        {
          title: "Số ca nhiễm",
          count: data.Confirmed,
          type: "Confirmed",
        },
        {
          title: "Khỏi",
          count: data.Recovered,
          type: "Recovered",
        },
        {
          title: "Tử vong",
          count: data.Deaths,
          type: "Deaths",
        },
      ]);
    }
  }, [report]);

  return (
    <Grid container spacing={3}>
      {summary.map((item) => (
        <Grid item sm={4} xs={12}>
          <HighlightCard
            title={item.title}
            count={item.count}
            type={item.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}
