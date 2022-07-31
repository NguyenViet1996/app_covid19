import React, { useEffect, useState, useRef } from "react";
import Highchart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { cloneDeep } from "lodash";

// load highcharts modules
highchartsMap(Highchart);

const initOptions = {
  chart: {
    height: "500",
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enable: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#871525"],
      [1, "#7A0826"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [{ mapData: {}, name: "dân số", joinBy: ["hc-key", "key"] }],
};

const HighMaps = ({ mapData }) => {
  const [options, setOptions] = useState({});
  const chartRef = useRef(null);
  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    if (mapData && Object.keys(mapData).length !== 0) {
      const fakeData = mapData.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index,
      }));

      setOptions({
        ...initOptions,
        series: [
          { ...initOptions.series[0], mapData: mapData, data: fakeData },
        ],
      });
      if (!configLoaded) setConfigLoaded(true);
    }
  }, [mapData, configLoaded]);

  useEffect(
    (chartRef) => {
      if (chartRef && chartRef.current) {
        chartRef.current.series[0].update({ mapData });
      }
    },
    [mapData]
  );

  return (
    <HighchartsReact
      highcharts={Highchart}
      options={cloneDeep(options)}
      constructorType={"mapChart"}
      ref={chartRef}
    />
  );
};

highchartsMap.defaultProps = {
  mapData: {},
};

export default React.memo(HighMaps);
