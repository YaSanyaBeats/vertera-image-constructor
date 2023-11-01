import React from 'react';
import {useRef, useState, useEffect} from 'react';
import { Stage, Layer } from 'react-konva';
import Box from '@mui/material/Box';
import CanvasEntity from './canvas/CanvasEntity.js'

const initialRectangles = [
    {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        id: 'rect1',
    },
    {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        id: 'rect2',
    },
];

const Canvas = () => {
    const [rectangles, setRectangles] = React.useState(initialRectangles);
    const [selectedId, selectShape] = React.useState(null);

    //Размер холста
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    })

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
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

    return (
        <Box bgcolor={'#023522'} borderRadius={2} overflow='hidden' ref={boxBounds} height={'100%'}>
            <Stage
                className='main-canvas'
                width={dimensions.width}
                height={dimensions.height}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
            >
                <Layer>
                    {rectangles.map((rect, i) => {
                        return (
                        <CanvasEntity
                            key={i}
                            shapeProps={rect}
                            isSelected={rect.id === selectedId}
                            onSelect={() => {
                                selectShape(rect.id);
                            }}
                            onChange={(newAttrs) => {
                                const rects = rectangles.slice();
                                rects[i] = newAttrs;
                                setRectangles(rects);
                            }}
                        />
                        );
                    })}
                </Layer>
                <Layer>
                    
                </Layer>
            </Stage>
        </Box>
    );
};

export default Canvas;