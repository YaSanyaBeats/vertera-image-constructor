import {useRef, useEffect} from 'react';
import { Transformer, Image, Text } from 'react-konva';
import useImage from 'use-image';

const CanvasEntity = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    const trRef = useRef();

    const [image] = useImage(shapeProps.image);

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        shapeProps.type === 'image' ? (
            <>
                <Image
                image={image}
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                width={shapeProps.width}
                height={shapeProps.height}
                x={shapeProps.x}
                y={shapeProps.y}
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
                />
                )}
            </>
        ) : (
            <>
                <Text
                onClick={onSelect}
                fontSize={shapeProps.fontSize}
                align={shapeProps.align}
                text={shapeProps.text}
                onTap={onSelect}
                ref={shapeRef}
                width={shapeProps.width}
                x={shapeProps.x}
                y={shapeProps.y}
                fill={shapeProps.fill}
                draggable
                onDragEnd={(e) => {
                    onChange({
                    ...shapeProps,
                    x: e.target.x(),
                    y: e.target.y(),
                    });
                }}
                onTransform={(event) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();

                    // we will reset it back
                    node.scaleX(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(50, node.width() * scaleX),
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(50, node.width() * scaleX),
                    });
                }}
                />
                {isSelected && (
                <Transformer
                    ref={trRef}
                    padding={5}
                    // enable only side anchors
                    enabledAnchors={['middle-left', 'middle-right']}
                />
                )}
            </>
        )
    );
};

export default CanvasEntity;