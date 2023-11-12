import EntityProp from "./EntityProp";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function EntityProps({selectedEntityProps, setSelectedEntityProps}) {

    const setValue = (name, value) => {
        let tmpEntityProps = selectedEntityProps;
        tmpEntityProps[name] = value;
        setSelectedEntityProps(tmpEntityProps);
        console.log('changed');
    }

    return (
        <Stack
            spacing={2}
            useFlexGap 
        >
            <span><b>Свойства объекта:</b> {selectedEntityProps?.id}</span>
            {Object.keys(selectedEntityProps).map((prop, index) => (
                <EntityProp key={index} name={prop} value={selectedEntityProps[prop]} setValue={setValue}/>
            ))}
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