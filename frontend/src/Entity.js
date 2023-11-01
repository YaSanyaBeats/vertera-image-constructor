import Box from '@mui/material/Box';
import { useEffect } from 'react';

function Entity({src}) {

    return (
        <Box bgcolor={'#1E252A'}>
            <img src={'http://localhost:8000/' + src} alt="Entity Preview" className='entity-image entity-image_cover'/>
        </Box>
    );
}

export default Entity;