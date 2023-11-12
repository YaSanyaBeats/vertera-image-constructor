import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useState, useEffect} from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MuiColorInput, matchIsValidColor } from 'mui-color-input'


function EntityProp({name, value, setValue, propInfo}) {
    const isNumber = !isNaN(+value);

    const setStartValue = (startValue) => {
        if(isNumber) {
            return Math.round(startValue);
        }
        return startValue;
    }

    const [nowValue, setNowValue] = useState(setStartValue(value));
    
    useEffect(() => {
        if(isNumber) {
            setNowValue(Math.round(value));
        }
        else {
            setNowValue(value);
        }
    }, [value, isNumber])

    const handleChange = (event) => {
        if(matchIsValidColor(event)) {
            setValue(name, event);
            setNowValue(event);
        }
        else {
            let currValue = event.target.value;
            if(isNumber) {
                currValue = +currValue;
            }
            
            setValue(name, currValue);
            setNowValue(currValue);
        }
    }
    
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            useFlexGap 
        >
            <span>{propInfo.title}:</span>
            {propInfo.type === 'select' ? (
                <Select
                    value={nowValue}
                    onChange={handleChange}
                >
                    {Object.keys(propInfo.options).map((option, index) => (
                        <MenuItem key={index} value={option}>{propInfo.options[option].title}</MenuItem>
                    ))}
                </Select>
            ) : propInfo.type === 'color' ? (
                <MuiColorInput format="hex8" value={nowValue} onChange={handleChange} />
            ) : (
                <TextField type={propInfo.type} size="small" value={nowValue} onChange={handleChange}/>
            )}
            
        </Stack>
    );
}

export default EntityProp;