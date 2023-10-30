import EntityProp from "./EntityProp";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function EntityProps() {
    return (
        <Stack
            spacing={2}
            useFlexGap 
        >
            <span><b>Свойства объекта:</b> Image1</span>
            <EntityProp/>
            <EntityProp/>
            <EntityProp/>
            <EntityProp/>
            <Stack
                my={2}
                direction='row'
                flexWrap="wrap"
                spacing={1}
                useFlexGap 
            >
                <Button variant="outlined">На передний план</Button>
                <Button variant="outlined">На задний план</Button>
                <Button variant="outlined" color="error">Удалить</Button>
            </Stack>
        </Stack>
        
    );
}

export default EntityProps;