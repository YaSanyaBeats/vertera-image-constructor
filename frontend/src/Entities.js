import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import Stack from '@mui/material/Stack';
import Entity from './Entity';
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import { MuiFileInput } from 'mui-file-input'

import { useEffect, useState } from 'react';

const VisuallyHiddenInput = styled(MuiFileInput)({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function Entities({tool, changeEntity}) {
    const [backgrounds, setBackgrounds] = useState([]);
    const [linkPath, setLinkPath] = useState();
    const [localImages, setLocalImages] = useState([]);

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
                let currentLocalImages = localImages.filter((item) => {
                                                return item.tool === tool;
                                            }).map((item) => {
                                                return item.src;
                                            });
                setBackgrounds(result.concat(currentLocalImages));
                setLinkPath('http://localhost:8000/getEntity/?all=false&entityTypeName=' + tool + '&entityName=');
                console.log(result.concat(currentLocalImages));
            },
            (error) => {
                console.log("Backgrounds not loaded");
            }
        )
    }, [tool])

    const getImageLink = (link) => {
        if(link.startsWith('data:image')) {
            return link;
        }
        return linkPath + link;
    }

    const uploadEntity = (file) => {
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                let lastBackgrounds = backgrounds.concat();
                lastBackgrounds.push(reader.result);
                setBackgrounds(lastBackgrounds);

                let lastLocal = localImages.concat();
                lastLocal.push({"tool": tool, "src": reader.result});
                setLocalImages(lastLocal);
            },
          );
        
        reader.readAsDataURL(file);

    }

    return (
        <Stack mt={2} spacing={2} alignItems="flex-start" justifyContent="space-between" height="100%">
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
                            <Entity key={index} src={getImageLink(bg)} onClick={changeEntity} tool={tool}/>
                        ))}
                    </Masonry>
                </SwiperSlide>
                
            </Swiper>
            
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Загрузить
                <VisuallyHiddenInput inputProps={{ accept: '.png, .jpeg' }} onChange={uploadEntity} />
            </Button>
        </Stack>
    );
}

export default Entities;