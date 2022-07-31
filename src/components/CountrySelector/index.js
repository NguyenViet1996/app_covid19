import {
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  FormControl: {
    margin: `${theme.spacing(3)}px 0`,
  },
}));

export default function CountrySelector({ value, countries, handleOnChange }) {
  const style = useStyle();

  return (
    <FormControl className={style.FormControl}>
      <InputLabel htmlFor="" shrink>
        Quốc gia
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnChange}
        inputProp={{
          name: "country",
          id: "country-selector",
        }}
      >
        {countries.map((country) => {
          return (
            <option value={country.ISO2.toLowerCase()}>
              {country.Country}
            </option>
          );
        })}
      </NativeSelect>
      <FormHelperText>Lựa chọn quốc gia</FormHelperText>
    </FormControl>
  );
}
