import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import Box from '@mui/material/Box';
import Entity from './Entity';
import Masonry from '@mui/lab/Masonry';

import { useEffect, useState } from 'react';

function Entities({tool, changeEntity}) {
    const [backgrounds, setBackgrounds] = useState([]);
    const [linkPath, setLinkPath] = useState();

    useEffect(() => {
        if(tool === 'text') {
            setBackgrounds(['text.svg']);
            setLinkPath('/');
            return;
        }

        fetch('http://localhost:8000/getEntity/?all=true&entityTypeName=' + tool)
        .then(res => res.json())
        .then(
            (result) => {
                setBackgrounds(result);
                setLinkPath('http://localhost:8000/getEntity/?all=false&entityTypeName=' + tool + '&entityName=');
            },
            (error) => {
                console.log("Backgrounds not loaded");
            }
        )
    }, [tool])

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
                    <Masonry columns={2} spacing={2}>
                        {backgrounds.map((bg, index) => (
                            <Entity key={index} src={linkPath + bg} onClick={changeEntity} tool={tool}/>
                        ))}
                    </Masonry>
                </SwiperSlide>
            </Swiper>
        </Box>
    );
}

export default Entities;