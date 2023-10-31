import React from 'react';
import {useRef, useState, useEffect} from 'react';
import { Stage, Layer, Transformer, Image } from 'react-konva';
import useImage from 'use-image';
import Box from '@mui/material/Box';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    const [bgImage] = useImage('https://konvajs.org/assets/lion.png');

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Image
            image={bgImage}
            onClick={onSelect}
            onTap={onSelect}
            ref={shapeRef}
            {...shapeProps}
            draggable
            onDragEnd={(e) => {
                onChange({
                ...shapeProps,
                x: e.target.x(),
                y: e.target.y(),
                });
            }}
            onTransformEnd={(e) => {
                // transformer is changing scale of the node
                // and NOT its width or height
                // but in the store we have only width and height
                // to match the data better we will reset scale on transform end
                const node = shapeRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                // we will reset it back
                node.scaleX(1);
                node.scaleY(1);
                onChange({
                ...shapeProps,
                x: node.x(),
                y: node.y(),
                // set minimal value
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(node.height() * scaleY),
                });
            }}
            />
            {isSelected && (
            <Transformer
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                // limit resize
                if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                }
                return newBox;
                }}
            />
            )}
        </>
    );
};

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
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    })

    const BGImage = () => {
        const [bgImage] = useImage('https://konvajs.org/assets/lion.png');
        return <Image image={bgImage} />;
    };

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    const resizeHandler = () => {
        setDimensions({
            width: boxBounds.current.offsetWidth,
            height: boxBounds.current.clientHeight,
        });
    }

    const boxBounds = useRef(null);

    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        if (boxBounds.current?.getBoundingClientRect) {
            resizeHandler();
        }
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, [])

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
                        <Rectangle
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