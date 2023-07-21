import * as React from 'react';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select,{SelectChangeEvent} from '@mui/material/Select';
import { CountryContext } from '../../context/CountryContext';

export default function MySelect() {
  const [region, setRegion] = React.useState('');
  const { country, setCountry } = React.useContext(CountryContext)

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
    setCountry({country: event.target.value})
  };

  return (
    <Box sx={{ minWidth: 240 }} border={'none'}>
      <FormControl fullWidth>
        <Select
          id="demo-simple-select"
          value={region}
          displayEmpty
          onChange={handleChange}
        >
           <MenuItem value="">
            Filter by Region
          </MenuItem>
          <MenuItem value={"africa"}>Africa</MenuItem>
          <MenuItem value={"america"}>America</MenuItem>
          <MenuItem value={"asia"}>Asia</MenuItem>
          <MenuItem value={"europe"}>Europe</MenuItem>
          <MenuItem value={"oceania"}>Oceania</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

