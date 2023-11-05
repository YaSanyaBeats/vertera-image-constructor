import { Image } from 'react-konva';
import { useState, useEffect } from 'react';
import useImage from 'use-image';

function CanvasBackground({src, canvasProps}) {

    const [background] = useImage(src);
    const [dimention, setDimention] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    
    useEffect(() => {
        if(background !== undefined) {
            const isGorizontal = (canvasProps.width / canvasProps.height) < (background.width / background.height);
            let width;
            let height;
            let x;
            let y;

            if(isGorizontal) {
                width = canvasProps.width;
                height = background.height / (background.width / canvasProps.width);
                x = 0;
                y = (canvasProps.height - height) / 2;

                
            }
            else {
                width = background.width / (background.height / canvasProps.height);;
                height = canvasProps.height;
                x = (canvasProps.width - width) / 2;
                y = 0;
            }

            setDimention({
                width: width,
                height: height,
                x: x,
                y: y
            })
        }
    }, [background, canvasProps])

    return (
        
        <Image
            image={background}
            x={dimention.x}
            y={dimention.y}
            width={dimention.width}
            height={dimention.height}
            id={'background'}
        />
    )
}

export default CanvasBackground;