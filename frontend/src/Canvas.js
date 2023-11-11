import React from 'react';
import {useRef, useState, useEffect} from 'react';
import { Stage, Layer } from 'react-konva';
import Box from '@mui/material/Box';
import CanvasEntity from './canvas/CanvasEntity.js';
import CanvasBackground from './canvas/CanvasBackground.js';

const Canvas = ({background, image, text, saving, saveImage}) => {
    const [selectedId, selectShape] = useState(null);
    const [entities, setEntities] = useState([]);

    //Размер холста
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    })

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage() || e.target.attrs.id === 'background';
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    //Resize canvas
    const boxBounds = useRef(null);

    const resizeHandler = () => {
        setDimensions({
            width: boxBounds.current.offsetWidth,
            height: boxBounds.current.clientHeight,
        });
    }

    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        if (boxBounds.current?.getBoundingClientRect) {
            resizeHandler();
        }
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, [])
    //End resize canvas

    useEffect(() => {
        //При выборе изображения из toolBar добавляем новое изображение
        setEntities(entities => entities?.concat([{
            x: 10,
            y: 10,
            width: 100,
            height: 100,
            id: 'rect' + entities.length,
            type: 'image',
            image: image
        }]));
        
    }, [image])

    useEffect(() => {
        //При выборе изображения из toolBar добавляем новое изображение
        setEntities(entities => entities?.concat([{
            x: 10,
            y: 10,
            width: 100,
            id: 'text' + entities.length,
            type: 'text',
            text: 'Hello world!'
        }]));
        
    }, [text])

    const stageRef = useRef(null);
    useEffect(() => {
        if(saving) {
            saveImage(stageRef.current.toDataURL({ pixelRatio: 2 }));
        }
    }, [saving, saveImage])

    return (
        <Box bgcolor={'#1E252A'} borderRadius={2} overflow='hidden' ref={boxBounds} height={'100%'}>
            <Stage
                className='main-canvas'
                width={dimensions.width}
                height={dimensions.height}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                ref={stageRef}
            >
                
                {background && (
                    <Layer>
                        <CanvasBackground src={background} canvasProps={dimensions}/>
                    </Layer>
                )}
                <Layer>
                    {entities?.map((rect, i) => {
                        return (
                        <CanvasEntity
                            key={i}
                            shapeProps={rect}
                            isSelected={rect.id === selectedId}
                            onSelect={() => {
                                selectShape(rect.id);
                            }}
                            onChange={(newAttrs) => {
                                const rects = entities.slice();
                                rects[i] = newAttrs;
                                setEntities(rects);
                            }}
                        />
                        );
                    })}
                </Layer>
            </Stage>
        </Box>
    );
};

export default Canvas;