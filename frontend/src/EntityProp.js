import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function EntityProp({name, value}) {
    const isNumber = !isNaN(+value);
    
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            useFlexGap 
        >
            <span>{name}:</span>
            <TextField type={isNumber ? 'number' : 'text'} size="small" value={value}/>
        </Stack>
    );
}

export default EntityProp;