import React from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  FormHelperText,
  TextField,
  Select,
  MenuItem
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export function TextInput(props) {
  return <TextField {...props} fullWidth variant="outlined" />;
}

export function MoneyTextInput(props) {
  return (
    <TextField
      fullWidth
      label={props.label}
      helperText={props.helperText}
      value={props.value}
      onChange={props.onChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>
      }}
      variant="outlined"
    />
  );
}

export function Selector(props) {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-age-native-simple">{props.label}</InputLabel>
      <Select label={props.label} value={props.value} onChange={props.onChange}>
        {props.options.map((value, idx) => {
          return (
            <MenuItem key={idx} value={value.value}>
              {value.label}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}

const optionAlreadySelected = (option, value) => {
  for (const key in value) {
    if (option === value[key].label) return true;
  }
  return false;
};

export function AutoCompleteSelector(props) {
  return (
    <Autocomplete
      multiple
      fullWidth
      id="controlled-demo"
      getOptionDisabled={(option) => optionAlreadySelected(option.label, props.value)}
      options={props.options}
      getOptionLabel={(option) => option.label}
      value={props.value}
      onChange={props.onChange}
      renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" />}
    />
  );
}
