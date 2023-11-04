import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';

function Entity({src}) {
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch(src)
            .then(response => response.blob())
            .then((image) => {
                setUrl(URL.createObjectURL(image));
                setLoading(false);
            });
    }, [src]);

    return (
        <Box bgcolor={'#1E252A'} borderRadius={2}>
            {loading ? (
                <Skeleton variant="rounded" height={100} />
            ) : (
                <img src={url} alt="Entity Preview" className='entity-image entity-image_cover'/>
            )}
        </Box>
    );
}

export default Entity;