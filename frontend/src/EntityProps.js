import EntityProp from "./EntityProp";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import {useState, useEffect} from 'react';

function EntityProps({setSelectedEntity, selectedEntityProps, setSelectedEntityProps, setButtonClicked}) {
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
        'ratio': {
            title: 'Соотношение сторон',
            type: 'select',
            options: {
                '16:9': {
                    title: '16:9 (Горизонтальное)'
                },
                '1:1': {
                    title: '1:1 (Квадрат)'
                },
                '9:16': {
                    title: '9:16 (Вертикальное)'
                },
            }
        }
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

        console.log(selectedEntityProps);

        //Каждый раз уникальное значение, чтобы перерендеривался Canvas
        setSelectedEntity(Date.now());
    }

    const handleClick = (buttonType, event) => {
        setButtonClicked({type: buttonType});
    }

    return (
        <Stack
            spacing={2}
            useFlexGap 
        >
            <span><b>Свойства объекта:</b> {selectedEntityProps?.id?.split(' ')[0]}</span>
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
                {selectedEntityProps?.type !== 'stage' && (
                    <>
                        <Button variant="outlined" onClick={handleClick.bind(this, 'copy')}>Дублировать</Button>
                        <Button variant="outlined" color="error" onClick={handleClick.bind(this, 'delete')}>Удалить</Button>
                    </>
                )}
                
            </Stack>
        </Stack>
        
    );
}

export default EntityProps;