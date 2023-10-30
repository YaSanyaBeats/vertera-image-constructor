import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function EntityProp() {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            useFlexGap 
        >
            <span>Ширина:</span>
            <TextField type="number" size="small"/>
        </Stack>
    );
}

export default EntityProp;