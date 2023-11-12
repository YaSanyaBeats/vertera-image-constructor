import React from 'react';
import {useRef, useState, useEffect, useCallback} from 'react';
import { Stage, Layer } from 'react-konva';
import Box from '@mui/material/Box';
import CanvasEntity from './canvas/CanvasEntity.js';
import CanvasBackground from './canvas/CanvasBackground.js';

const Canvas = ({background, image, text, saving, saveImage, selectedEntityProps, setSelectedEntityProps, selectedEntity}) => {
    const [selectedId, selectShape] = useState(null);
    const [entities, setEntities] = useState([]);
    const [ratio, setRatio] = useState('16:9');

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

    const resizeHandler = useCallback(() => {
        if(!ratio) {
            return;
        }
        let [widthRatio, heightRatio] = ratio.split(':');

        setDimensions({
            width: boxBounds.current.clientHeight / heightRatio * widthRatio,
            height: boxBounds.current.clientHeight,
        });
    }, [ratio])

    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        if (boxBounds.current?.getBoundingClientRect) {
            resizeHandler();
        }
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
        
    }, [resizeHandler])
    //End resize canvas

    useEffect(() => {
        if(!image) {
            return;
        }
        //При выборе изображения из toolBar добавляем новое изображение
        setEntities(entities => entities?.concat([{
            x: 10,
            y: 10,
            width: 100,
            height: 100,
            id: 'rect' + entities.length,
            type: 'image',
            image: image,
        }]));
        
    }, [image, text])

    useEffect(() => {
        console.log(text);
        if(!text) {
            return;
        }
        //При выборе изображения из toolBar добавляем новое изображение
        setEntities(entities => entities?.concat([{
            x: 10,
            y: 10,
            width: 300,
            id: 'text' + entities.length,
            type: 'text',
            align: 'left',
            fontSize: 50,
            text: 'Vertera',
            fill: '#000000',
        }]));
        
    }, [text])

    useEffect(() => {
        const [needEntity] = entities.filter((entity) => {
            return entity.id === selectedId;
        })
        if(needEntity) {
            setSelectedEntityProps(needEntity);
        }
        else {
            console.log(ratio);
            if(!ratio) {
                return;
            }
            setSelectedEntityProps({
                id: 'main-stage',
                type: 'stage',
                ratio: ratio
            })
        }
    }, [selectedId, entities, setSelectedEntityProps, ratio])

    useEffect(() => {
        if(!selectedEntityProps.ratio) {
            return;
        }
        setRatio(selectedEntityProps.ratio);
    }, [selectedEntityProps, selectedEntity])

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