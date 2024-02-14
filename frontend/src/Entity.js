import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';

function removeIsPreviewFromSrc(src) {
    let result = src.split('&isPreview=true');
    return result.join('');
}

function Entity({src, onClick, tool}) {
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch(src)
            .then(response => response.blob())
            .then((image) => {
                console.log(image);
                setUrl(URL.createObjectURL(image));
                setLoading(false);
            })
            .catch(() => console.log('some error'));
    }, []);

    return (
        <Box bgcolor={'#1E252A'} borderRadius={2}>
            {loading ? (
                <Skeleton variant="rounded" height={100} />
            ) : (
                <img src={url} data-full-src={removeIsPreviewFromSrc(src)} alt="Entity Preview" onClick={onClick} className={'entity-image ' + (tool === 'images' ? 'entity-image_cover' : '')}/>
            )}
        </Box>
    );
}

export default Entity;