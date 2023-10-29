import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import Box from '@mui/material/Box';
import Entity from './Entity';
import { Grid } from '@mui/material';

function Entities() {
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
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                        <Grid item xs={6}>
                            <Entity/>
                        </Grid>
                    </Grid>
                </SwiperSlide>
            </Swiper>
        </Box>
    );
}

export default Entities;