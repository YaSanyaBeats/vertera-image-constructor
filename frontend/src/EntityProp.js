import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useRef, useState, useEffect} from 'react';

function EntityProp({name, value, setValue}) {
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
            if(Math.round(value) != Math.round(nowValue)) {
                setNowValue(Math.round(value));
            }
        }
        else {
            if(value != nowValue) {
                setNowValue(value);
            }
        }
        
    }, [value])

    const handleChange = (event) => {
        let currValue = event.target.value;
        if(isNumber) {
            currValue = +currValue;
        }
        
        setValue(name, currValue);
        setNowValue(currValue);
    }
    
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            useFlexGap 
        >
            <span>{name}:</span>
            <TextField type={isNumber ? 'number' : 'text'} size="small" value={nowValue} onChange={handleChange}/>
        </Stack>
    );
}

export default EntityProp;