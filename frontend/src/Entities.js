import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import Box from '@mui/material/Box';
import Entity from './Entity';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

function Entities() {
    const [backgrounds, setBackgrounds] = useState([]);


    useEffect(() => {
        console.log('ajax');
        fetch('http://localhost:8000/getBG/')
        .then(res => res.json())
        .then(
            (result) => {
                setBackgrounds(result)
            },
            (error) => {
                console.log("Backgrounds not loaded");
            }
        )
    }, [])


    return (
        <Box mt={2}>
            <Swiper
                direction={'vertical'}
                slidesPerView={'auto'}
                freeMode={true}
                scrollbar={true}
                mousewheel={true}
                modules={[FreeMode, Scrollbar, Mousewheel]}
                className="entity-swiper"
            >
                <SwiperSlide>
                    <Grid container spacing={2}>
                        
                        {backgrounds.map((bg) => (
                            <Grid item xs={6}>
                                <Entity src={bg}/>
                            </Grid>
                        ))}
                    </Grid>
                </SwiperSlide>
            </Swiper>
        </Box>
    );
}

export default Entities;