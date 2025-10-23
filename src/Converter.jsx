import { 
  Box,
  FormControl, 
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Paper
} from '@mui/material';
import { useState, useEffect } from 'react';


const Converter = () => {

    const MILE_AS_KM = 1.609
  
    const [unit, setUnit] = useState("");

    const [value, setValue] = useState("");

    const [showConversions, setShowConversions] = useState(false);

    const [showError, setShowError] = useState(false);

    const handleChange = (event) => {
      setUnit(event.target.value);
      setValue("");
    }

    const handleClick = () => {
      if (checkInputValidity(value)) {
        convert(value);
        setFixedUnit(unit);
        setShowError(false);
        setShowConversions(true);
      } else if (unit !== "") {
        setShowError(true);
        setShowConversions(false);
      } else {
        setShowConversions(false);
      }
    }

    const [formattedValue, setFormattedValue] = useState("");

    const [fixedUnit, setFixedUnit] = useState("");

    const [convertedValues, setConvertedValues] = useState([]); 
    
    const convertToNumericValue = (stringValue) => {
      if (String(stringValue).indexOf(",") !== -1) {
        const splitValue = stringValue.split(",")
        const decimalString = "0." + String(splitValue[1])
        const decimalNumeric = Number(decimalString)
        const numericValue = Number(splitValue[0]) + decimalNumeric
        return numericValue
      }
      else {
        return 0
      }
    }

    const checkInputValidity = (value) => {
      if (value == "") {
        return false
      }
      else if (unit == "min/km" || unit == "min/mile") {
        const splitValue = value.split(":")
        if (splitValue.length == 2) {
          if (isNaN(Number(splitValue[0])) || Number(splitValue[0]) < 0) {
            return false
          }
          else if (isNaN(Number(splitValue[1])) || Number(splitValue[1]) < 0 || Number(splitValue[1]) >= 60) {
            return false
          }
          else {
            setFormattedValue(splitValue)
            return true
          }
        }
        else if (splitValue.length == 1) {
          if (isNaN(Number(splitValue[0])) || Number(splitValue[0]) < 0) {
            return false
          }
          else {
            setFormattedValue([Number(splitValue[0]), 0])
            return true
          }
        }
        else {
          return false
        }
      }
      else {
        const splitValue = value.split(",") 
        if (splitValue.length === 2) {
          if (isNaN(Number(splitValue[0])) || Number(splitValue[0]) < 0 ) {
            return false
          }
          else if (isNaN(Number(splitValue[1]))) {
            return false
          }
          else {
            const numericValue = convertToNumericValue(value)
            setFormattedValue(numericValue)
            return true
          }
        }
        else if (splitValue.length === 1) {
          if (isNaN(Number(value)) || Number(value) < 0) {
            return false
          }
          else {
            setFormattedValue(Number(value))
            return true
          }
        }
        else {
          return false
        }
      }
    }

    const minPerKmToKmPerHour = (startValue) => {
      if (isNaN(Number(startValue)) && startValue.length == 2) {
        const minutes = Number(startValue[0])
        const seconds = Number(startValue[1])
        const secondsAsDecimal = seconds / 60
        const timeAsDecimal = minutes + secondsAsDecimal
        if (timeAsDecimal > 0) {
          const kmPerHour = 60 / timeAsDecimal
          return kmPerHour
        }
        else {
          return 0
        }
      }
      else if ((String(startValue)).split(":").length == 2) {
        const splitValue = (String(startValue)).split(":")
        const minutes = Number(splitValue[0])
        const seconds = Number(splitValue[1])
        const secondsAsDecimal = seconds / 60
        const timeAsDecimal = minutes + secondsAsDecimal
        if (timeAsDecimal > 0) {
          const kmPerHour = 60 / timeAsDecimal
          return kmPerHour
        }
        else {
          return 0
        }
      } 
      else if (!isNaN(Number(startValue)) && Number(startValue) > 0) {
        const minutes = startValue
        if (minutes > 0) {
          const kmPerHour = 60 / minutes
          return kmPerHour
        }
        else {
          return 0
        }
      }
      else {
        return 0
      }      
    }

    const kmPerHourToMinPerKm = (startValue) => {
      if (!isNaN(Number(startValue)) && startValue > 0) {
        const decimalMinutes = 60 / startValue
        const minutes = Math.floor(decimalMinutes)
        const seconds = Math.floor(60 * (decimalMinutes - minutes))
        return [minutes, seconds]
      } 
      else if (String(startValue).split(",").length == 2) {
        const numericValue = convertToNumericValue(startValue)
        const decimalMinutes = 60 / numericValue
        const minutes = Math.floor(decimalMinutes)
        const seconds = Math.floor(60 * (decimalMinutes - minutes))
        return [minutes, seconds]
      } 
      else {
        return [0, 0]
      }
    }

    const kmPerHourToMilesPerHour = (startValue) => {
      if (isNaN(Number(startValue))) {
        startValue = convertToNumericValue(startValue)
      }
      const milesPerHour = startValue / MILE_AS_KM
      return milesPerHour
    }

    const milesPerHourToKmPerHour = (startValue) => {
      if (isNaN(Number(startValue))) {
        startValue = convertToNumericValue(startValue)
      }
      const kmPerHour = MILE_AS_KM * startValue
      return kmPerHour
    }

    const minPerMileToMinPerKm = (startValue) => {
      if (isNaN(Number(startValue)) && startValue.length == 2) {
        const minutes = Number(startValue[0])
        const seconds = Number(startValue[1])
        const secondsAsDecimal = seconds / 60
        const timeAsDecimal = minutes + secondsAsDecimal
        const minPerMileDecimal = timeAsDecimal / MILE_AS_KM
        const new_minutes = Math.floor(minPerMileDecimal)
        const new_seconds = Math.floor(60 * (minPerMileDecimal - new_minutes))
        return [new_minutes, new_seconds]
      }
      else if ((String(startValue)).split(":").length == 2) {
        const splitValue = (String(startValue)).split(":")
        const minutes = Number(splitValue[0])
        const seconds = Number(splitValue[1])
        const secondsAsDecimal = seconds / 60
        const timeAsDecimal = minutes + secondsAsDecimal
        const minPerKmDecimal = timeAsDecimal / MILE_AS_KM
        const new_minutes = Math.floor(minPerKmDecimal)
        const new_seconds = Math.floor(60 * (minPerKmDecimal - new_minutes))
        return [new_minutes, new_seconds]
      }
      else if (!isNaN(Number(startValue))) {
        const decimalMinutes = startValue / MILE_AS_KM
        const minutes = Math.floor(decimalMinutes)
        const decimalSeconds = decimalMinutes - minutes
        const seconds = Math.floor(decimalSeconds * 60)
        return [minutes, seconds]
      }
      else {
        return 0
      }      
    }

    const minPerKmToMinPerMile = (startValue) => {
      if (isNaN(Number(startValue)) && startValue.length == 2) {
        const minutes = Number(startValue[0])
        const seconds = Number(startValue[1])
        const secondsAsDecimal = seconds / 60
        const timeAsDecimal = minutes + secondsAsDecimal
        const minPerMileDecimal = timeAsDecimal * MILE_AS_KM
        const new_minutes = Math.floor(minPerMileDecimal)
        const new_seconds = Math.floor(60 * (minPerMileDecimal - new_minutes))
        return [new_minutes, new_seconds]
      }
      else if ((String(startValue)).split(":").length == 2) {
        const splitValue = (String(startValue)).split(":")
        const minutes = Number(splitValue[0])
        const seconds = Number(splitValue[1])
        const secondsAsDecimal = seconds / 60
        const timeAsDecimal = minutes + secondsAsDecimal
        const minPerMileDecimal = timeAsDecimal * MILE_AS_KM
        const new_minutes = Math.floor(minPerMileDecimal)
        const new_seconds = Math.floor(60 * (minPerMileDecimal - new_minutes))
        return [new_minutes, new_seconds]
      }
      else if (!isNaN(Number(startValue))) {
        const decimalMinutes = startValue * MILE_AS_KM
        const minutes = Math.floor(decimalMinutes)
        const decimalSeconds = decimalMinutes - minutes
        const seconds = Math.floor(decimalSeconds * 60)
        return [minutes, seconds]
      }
      else {
        return 0
      }
    }

    const kmPerHourToMetresPerSecond = (startValue) => {
      if (isNaN(Number(startValue))) {
        startValue = convertToNumericValue(startValue)
      }
      const metresPerSecond = startValue / 3.6
      return metresPerSecond
    }

    const metresPerSecondToKmPerHour = (startValue) => {
      if (isNaN(Number(startValue))) {
        startValue = convertToNumericValue(startValue)
      }
      const kmPerHour = startValue * 3.6
      return kmPerHour
    }

    const stringifyTime = (time) => {
      var timeAsString = String(time)
      if (isNaN(time) && time.length == 2) {
        const minutes = time[0]
        const seconds = time[1]
        let secondsString = String(seconds)
        if (seconds < 10) {
          secondsString = String("0" + seconds)
        }
        timeAsString = String(minutes + ":" + secondsString)
      } else if (!isNaN(Number(time))) {
        timeAsString = String(time + ":00")
      }
      
      return timeAsString
    }

    const convert = (originalValue) => {
      if (unit == "min/km") {
        const kmPerHour = minPerKmToKmPerHour(originalValue)
        const metresPerSecond = kmPerHourToMetresPerSecond(kmPerHour)
        const milesPerHour = kmPerHourToMilesPerHour(kmPerHour)
        const minutesPerMile = minPerKmToMinPerMile(originalValue)
        const minPerMileString = stringifyTime(minutesPerMile)
        setFormattedValue(stringifyTime(originalValue))
        setConvertedValues(
          [
            {id: "kilometers per hour", value: kmPerHour.toFixed(2)},
            {id: "metres per second", value: metresPerSecond.toFixed(2)},
            {id: "miles per hour", value: milesPerHour.toFixed(2)},
            {id: "minutes per mile", value: minPerMileString}
          ]
        )
      }
      else if (unit == "min/mile") {
        const minutesPerKm = minPerMileToMinPerKm(originalValue)
        const kmPerHour = minPerKmToKmPerHour(minutesPerKm)
        const metresPerSecond = kmPerHourToMetresPerSecond(kmPerHour)
        const milesPerHour = kmPerHourToMilesPerHour(kmPerHour)
        const minPerKmString = stringifyTime(minutesPerKm)
        setFormattedValue(stringifyTime(originalValue))
        setConvertedValues(
          [
            {id: "kilometers per hour", value: kmPerHour.toFixed(2)},
            {id: "metres per second", value: metresPerSecond.toFixed(2)},
            {id: "miles per hour", value: milesPerHour.toFixed(2)},
            {id: "minutes per kilometer", value: minPerKmString}
          ]
        )
      }
      else if (unit == "km/h") {
        const minutesPerKm = kmPerHourToMinPerKm(originalValue)
        const milesPerHour = kmPerHourToMilesPerHour(originalValue)
        const minutesPerMile = minPerKmToMinPerMile(minutesPerKm)
        const metresPerSecond = kmPerHourToMetresPerSecond(originalValue)
        const minPerKmString = stringifyTime(minutesPerKm)
        const minPerMileString = stringifyTime(minutesPerMile)
        setConvertedValues(
          [
            {id: "minutes per kilometer", value: minPerKmString},
            {id: "metres per second", value: metresPerSecond.toFixed(2)},
            {id: "miles per hour", value: milesPerHour.toFixed(2)},
            {id: "minutes per mile", value: minPerMileString}
          ]
        )
      }
      else if (unit == "m/s") {
        const kmPerHour = metresPerSecondToKmPerHour(originalValue)
        const milesPerHour = kmPerHourToMilesPerHour(kmPerHour)
        const minutesPerKm = kmPerHourToMinPerKm(kmPerHour)
        const minutesPerMile = minPerKmToMinPerMile(minutesPerKm)
        const minPerKmString = stringifyTime(minutesPerKm)
        const minPerMileString = stringifyTime(minutesPerMile)
        setConvertedValues(
          [
            {id: "kilometers per hour", value: kmPerHour.toFixed(2)},
            {id: "minutes per kilometer", value: minPerKmString},
            {id: "miles per hour", value: milesPerHour.toFixed(2)},
            {id: "minutes per mile", value: minPerMileString}
          ]
        )
      }
      else if (unit == "miles/h") {
        const kmPerHour = milesPerHourToKmPerHour(originalValue)
        const metresPerSecond = kmPerHourToMetresPerSecond(kmPerHour)
        const minutesPerKm = kmPerHourToMinPerKm(kmPerHour)
        const minutesPerMile = minPerKmToMinPerMile(minutesPerKm)
        const minPerKmString = stringifyTime(minutesPerKm)
        const minPerMileString = stringifyTime(minutesPerMile)
        setConvertedValues(
          [
            {id: "kilometers per hour", value: kmPerHour.toFixed(2)},
            {id: "metres per second", value: metresPerSecond.toFixed(2)},
            {id: "minutes per kilometer", value: minPerKmString},
            {id: "minutes per mile", value: minPerMileString}
          ]
        )
      }
    }

    useEffect(() => {

    },[showConversions, unit, value, formattedValue, convertedValues])

    return(
      <>
      <Box
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          backgroundColor: "primary.light",
          height: "100vh"
        }}
      >
        <Paper 
          elevation={5} 
          sx={{
            padding: 4, 
            minWidth: "40vh",
            minHeight: 500, 
            margin: 4,
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
          }}>
          <Typography 
            variant="h4" 
            marginTop={2} 
            marginBottom={3}
            >
              Speed unit converter
          </Typography>
          <FormControl>
          <InputLabel id="unit">Choose input unit</InputLabel>
          <Select 
            sx={{minWidth:"40vh"}}
            labelId="select_label"
            id="select"
            value={unit}
            onChange={handleChange}            
            label="Unit"
            >
            <MenuItem value={"km/h"}>Kilometers per hour (km/h)</MenuItem>
            <MenuItem value={"m/s"}>Metres per second (m/s)</MenuItem>
            <MenuItem value={"min/km"}>Minutes per kilometer (min/km)</MenuItem>
            <MenuItem value={"miles/h"}>Miles per hour (miles/h)</MenuItem>
            <MenuItem value={"min/mile"}>Minutes per mile (min/mile)</MenuItem>
          </Select>
          <TextField 
            value={value}
            error={!checkInputValidity}
            onChange={(e) => {setValue(e.target.value);}}
            label={unit == "min/km" || unit == "min/mile" ? "mm:ss" : "Add the value to convert"}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
              },
            }}
            sx={{marginTop: 2}}>
          </TextField>
          <Button 
            variant="contained" 
            sx={{marginTop: 2}}
            onClick={handleClick}
            disabled={unit == "" || value == ""}
            >
              Convert
          </Button>
          <Box 
            sx={{display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: 2
              }}>
            {showConversions ? 
              <Box sx={{display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: 3
              }}>
                <Typography variant="h4" >{formattedValue} {fixedUnit} equals</Typography>
                {convertedValues.map((item, i) => <Typography key={i} variant="h6" sx={{margin:0.5}}>{item.value} {item.id}</Typography>)}
              </Box>
              : showError ?
              <Box sx={{display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: 3
              }}>
                <Typography variant="h6">Please enter the value in a valid format.</Typography>
                {unit == "min/km" || unit == "min/miles" ? <>
                  <Typography>Valid format is <em>mm:ss</em></Typography>
                  <Typography>Example: <em>10</em> or <em>10:12</em></Typography></> 
                : <>
                  <Typography>Valid format for {unit} is a decimal number</Typography>
                  <Typography>(example: <em>5</em> or <em>5,5</em> or <em>5.55</em>)</Typography></>
                }
              </Box>
              : <></>
            }
          </Box>
        </FormControl>
        </Paper>
      </Box>
    </>
  )
}

export default Converter;