import { FreeMode, Mousewheel, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Masonry from "@mui/lab/Masonry";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Entity from "./Entity";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import CircularProgress from "@mui/material/CircularProgress";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { MuiFileInput } from "mui-file-input";

import { useEffect, useRef, useState } from "react";

const VisuallyHiddenInput = styled(MuiFileInput)({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Entities({ tool, changeEntity }) {
  const [backgrounds, setBackgrounds] = useState([]);
  const [linkPath, setLinkPath] = useState();
  const [localImages, setLocalImages] = useState([]);
  const [innerEntities, setInnerEntities] = useState([]);
  const [categoryLoader, setCategoryLoader] = useState(false);
  const [activeCategory, setActiveCategody] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const swiper = useRef();

  useEffect(() => {
    setActiveCategody(0);
    setBackgrounds([]);
    if (tool === "text") {
      setBackgrounds(["text.svg"]);
      setLinkPath("/");
      return;
    }

    fetch(
      process.env.REACT_APP_API_URL +
        "/getEntity/?all=true&entityTypeName=" +
        tool
    )
      .then((res) => res.json())
      .then(
        (result) => {
          let currentLocalImages = localImages
            .filter((item) => {
              return item.tool === tool;
            })
            .map((item) => {
              return item.src;
            });
          setBackgrounds(result.concat(currentLocalImages));
          if (tool === "images") {
            setLinkPath(
              process.env.REACT_APP_API_URL +
                "/getEntity/?all=false&entityTypeName=" +
                tool +
                "&entityCategory=3D&isPreview=true&entityName="
            );
            handleCategory(0, "3D")(null, true);
          } else {
            setLinkPath(
              process.env.REACT_APP_API_URL +
                "/getEntity/?all=false&entityTypeName=" +
                tool +
                "&isPreview=true&entityName="
            );
          }
          console.log(result.concat(currentLocalImages));
        },
        (error) => {
          console.log("Backgrounds not loaded");
        }
      );
  }, [tool]);

  const getImageLink = (link) => {
    if (link.startsWith("data:image")) {
      return link;
    }
    return linkPath + link;
  };

  const uploadEntity = (file) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      changeEntity({ target: { src: reader.result } });
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const removeEntity = () => {
    changeEntity(null);
  };

  const onClickEntity = (e) => {};

  const handleCategory = (activeCategory, bg) => (event, expanded) => {
    setActiveCategody(activeCategory);
    if (expanded) {
      setCategoryLoader(true);
      fetch(
        process.env.REACT_APP_API_URL +
          "/getEntity/?all=true&entityTypeName=" +
          tool +
          "&entityCategory=" +
          bg
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setInnerEntities(result);
            setLinkPath(
              process.env.REACT_APP_API_URL +
                "/getEntity/?all=false&entityTypeName=" +
                tool +
                "&entityCategory=" +
                bg +
                "&isPreview=true" +
                "&entityName="
            );
            setCategoryLoader(false);
          },
          (error) => {
            console.log("Backgrounds not loaded");
          }
        );
    } else {
      setActiveCategody(-1);
    }
    console.log(swiper.swiper);
    swiper.current.swiper.update();
  };

  return (
    <Stack
      sx={{ mt: { xs: 0, md: 2 } }}
      spacing={2}
      alignItems="flex-start"
      justifyContent="space-between"
      height="100%"
    >
      <Swiper
        ref={swiper}
        direction={"vertical"}
        slidesPerView={"auto"}
        freeMode={true}
        scrollbar={true}
        mousewheel={true}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        className="entity-swiper"
      >
        <SwiperSlide>
          {tool === "backgrounds" ? (
            <>
              <Masonry columns={2} spacing={2}>
                <Entity
                  src={"removeBG.svg"}
                  onClick={removeEntity}
                  tool={"images"}
                />
                {backgrounds.map((bg, index) => (
                  <Entity
                    key={index}
                    src={getImageLink(bg)}
                    onClick={(event) => {
                      setSelectedImage(bg);
                      changeEntity(event);
                    }}
                    // onClick={changeEntity}
                    tool={tool}
                    isSelected={selectedImage === bg}
                  />
                ))}
              </Masonry>
            </>
          ) : tool === "text" ? (
            <Masonry columns={2} spacing={2}>
              <Entity src={"text.svg"} onClick={changeEntity} tool={tool} />
            </Masonry>
          ) : (
            <>
              {backgrounds.map((bg, index) => (
                <Accordion
                  expanded={activeCategory === index}
                  key={index}
                  onChange={handleCategory(index, bg)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {bg}
                  </AccordionSummary>
                  <AccordionDetails>
                    <ImageList variant="masonry" cols={2} gap={8}>
                      {categoryLoader ? (
                        <CircularProgress />
                      ) : (
                        innerEntities.map((bg, index) => (
                          <ImageListItem key={index}>
                            <Entity
                              src={getImageLink(bg)}
                              onClick={(event) => {
                                setSelectedImage(bg);
                                changeEntity(event);
                              }}
                              tool={tool}
                              isSelected={selectedImage === bg}
                            />
                          </ImageListItem>
                        ))
                      )}
                    </ImageList>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          )}
        </SwiperSlide>
      </Swiper>

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Загрузить
        <VisuallyHiddenInput
          inputProps={{ accept: ".png, .jpeg" }}
          onChange={uploadEntity}
        />
      </Button>
    </Stack>
  );
}

export default Entities;
