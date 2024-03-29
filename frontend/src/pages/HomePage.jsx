import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Canvas from "./../Canvas";
import Entities from "./../Entities";
import EntityProps from "./../EntityProps";
import Export from "./../Export";
import ToolBar from "./../ToolBar";
import ToolBarMobile from "./../ToolBarMobile";

import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./../Login";

function HomePage() {
  const [currentTool, setCurrentTool] = useState("backgrounds");
  const [background, setBackground] = useState();
  const [image, setImage] = useState();
  const [text, setText] = useState(false);
  const [saving, setSaving] = useState();
  const [selectedEntityProps, setSelectedEntityProps] = useState({});
  const [selectedEntity, setSelectedEntity] = useState();
  const [buttonClicked, setButtonClicked] = useState();

  const handleExport = (event) => {
    setSaving(true);
  };

  const saveImage = (dataSource) => {
    let link = document.createElement("a");
    link.download = "filename.png";
    link.href = dataSource;
    link.click();
    setSaving(false);
  };

  const handleChangeEntity = (event) => {
    if (event === null) {
      setBackground(null);
      return;
    }

    if (currentTool === "text") {
      setText(Date.now());
      return;
    }

    let src = event.target.src;
    if (event.target.getAttribute) {
      src = event.target.getAttribute("data-full-src");
    }

    fetch(src)
      .then((response) => {
        return response.blob();
      })
      .then((image) => {
        if (currentTool === "backgrounds") {
          setBackground(URL.createObjectURL(image));
        }
        if (currentTool === "images") {
          setImage(URL.createObjectURL(image));
        }
      })
      .catch(() => console.log("some error"));
  };

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2} p={{ md: 4, xs: 2 }} className="app">
        <Grid item xs={12} p={{ md: 2, xs: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Link to="/">
              <img className="logo" src="logo.svg" alt="logo" />
            </Link>
            <Login />
          </Stack>
        </Grid>
        <Grid item md={2} xs={12} sx={{ display: { xs: "none", md: "block" } }}>
          <Stack>
            <ToolBar changeTool={setCurrentTool} />
            <Entities tool={currentTool} changeEntity={handleChangeEntity} />
          </Stack>
        </Grid>
        <Grid item md={8} xs={12}>
          <Grid display="flex" justifyContent="center" height={"100%"}>
            <Canvas
              background={background}
              image={image}
              text={text}
              saving={saving}
              saveImage={saveImage}
              selectedEntityProps={selectedEntityProps}
              setSelectedEntityProps={setSelectedEntityProps}
              selectedEntity={selectedEntity}
              buttonClicked={buttonClicked}
            />
          </Grid>
        </Grid>
        <Grid item md={2} xs={12} sx={{ display: { xs: "none", md: "block" } }}>
          <Stack className="right-sidebar" justifyContent="space-between">
            <EntityProps
              setSelectedEntity={setSelectedEntity}
              selectedEntityProps={selectedEntityProps}
              setSelectedEntityProps={setSelectedEntityProps}
              setButtonClicked={setButtonClicked}
              setPropsPopup={() => {}}
            />
            <Export handleExport={handleExport} />
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ display: { md: "none", xs: "block" } }}>
          <ToolBarMobile
            tool={currentTool}
            changeTool={setCurrentTool}
            changeEntity={handleChangeEntity}
            handleExport={handleExport}
            selectedEntityObj={{
              setSelectedEntity: setSelectedEntity,
              selectedEntityProps: selectedEntityProps,
              setSelectedEntityProps: setSelectedEntityProps,
              setButtonClicked: setButtonClicked,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
