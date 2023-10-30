import Box from '@mui/material/Box';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Star, Text, Transformer } from 'react-konva';

function generateShapes() {
    return [...Array(10)].map((_, i) => ({
      id: i.toString(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 180,
      isDragging: false,
    }));
  }
  
  const INITIAL_STATE = generateShapes();
  

function Canvas() {
    const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
        const shapeRef = React.useRef();
        const trRef = React.useRef();
      
        React.useEffect(() => {
          if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
          }
        }, [isSelected]);
        
    const [stars, setStars] = React.useState(INITIAL_STATE);

    const handleDragStart = (e) => {
        const id = e.target.id();
        setStars(
        stars.map((star) => {
            return {
            ...star,
            isDragging: star.id === id,
            };
        })
        );
    };
    const handleDragEnd = (e) => {
        setStars(
        stars.map((star) => {
            return {
            ...star,
            isDragging: false,
            };
        })
        );
    };

    return (
        <Box
            justifyContent="center"
        >
            <React.Fragment>
      <Rect
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
    </React.Fragment>
        </Box>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Canvas />);

export default Canvas;