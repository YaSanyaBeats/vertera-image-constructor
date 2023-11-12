import EntityProp from "./EntityProp";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function EntityProps({setSelectedEntity, selectedEntityProps, setSelectedEntityProps}) {
    const propsDictionary = {
        'x': {
            title: 'x',
            type: 'number'
        },
        'y': {
            title: 'y',
            type: 'number'
        },
        'width': {
            title: 'Ширина',
            type: 'number'
        },
        'height': {
            title: 'Высота',
            type: 'number'
        },
        'text': {
            title: 'Текст',
            type: 'text'
        },
        'fill': {
            title: 'Цвет',
            type: 'color',
        },
        'align': {
            title: 'Выравнивание',
            type: 'select',
            options: {
                'left': {
                    title: 'Слева',
                }, 
                'center': {
                    title: 'Посередине',
                }, 
                'right': {
                    title: 'Справа',
                }, 
            }
        },
        'fontSize': {
            title: 'Размер текста',
            type: 'number'
        },
    };

    const getEditebleProps = () => {

        let filtered = Object.keys(selectedEntityProps).filter((prop) => {
            return propsDictionary[prop];
        });
        return filtered;
    }

    const setValue = (name, value) => {
        let tmpEntityProps = selectedEntityProps;
        tmpEntityProps[name] = value;
        setSelectedEntityProps(tmpEntityProps);

        //Каждый раз уникальное значение, чтобы перерендеривался Canvas
        setSelectedEntity(Date.now());
    }


    return (
        <Stack
            spacing={2}
            useFlexGap 
        >
            <span><b>Свойства объекта:</b> {selectedEntityProps?.id}</span>
            {getEditebleProps().map((prop, index) => (
                <EntityProp key={index} name={prop} value={selectedEntityProps[prop]} setValue={setValue} propInfo={propsDictionary[prop]}/>
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