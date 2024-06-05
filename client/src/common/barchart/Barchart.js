import React, { useState } from "react";
import { TextField, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomButton from "../components/CustomButton";
import Select from "@mui/material/Select";
import convertDate from "../components/convertDate";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./charts.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,

  Title,
  Tooltip,
  Legend
);

function VerticalBarChart(props) {
  // objects destructuring: picking specific properties from the object
  const { data, options, prevale, setVale, storeData, title } = props;
  //change profit types

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVale({ ...prevale, [name]: value });
  }; //change dates

  const handleChangeDate = (name, date) => {
    setVale({ ...prevale, [name]: date });
  };
  return (
    <>
      {" "}
      <Grid container spacing={2} style={{ margin: "0px", with: "100%" }}>
        {" "}
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <h2 className="chart-title"> {title}</h2>{" "}
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              name="Date1"
              value={prevale?.Date1}
              onChange={(date) => {
                handleChangeDate("Date1", date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              name="Date2"
              value={prevale?.Date2}
              onChange={(date) => {
                handleChangeDate("Date2", date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Profit type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={prevale?.profit}
              name="profit"
              label="Profit type"
              onChange={handleChange}
            >
              <MenuItem value={"facility"}>Profit per facility</MenuItem>
              <MenuItem value={"activity"}>Profit per activity</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          lg={11}
          md={11}
          sm={12}
          xs={12}
          style={{ textAlign: "right" }}
        >
          <CustomButton text={"Save"} onClick={storeData} />
        </Grid>
      </Grid>
      <div className="chart" style={{ width: "auto", margin: "auto" }}>
        <Bar options={options} data={data} height={400} width={600} />
      </div>
    </>
  );
}
export default VerticalBarChart;