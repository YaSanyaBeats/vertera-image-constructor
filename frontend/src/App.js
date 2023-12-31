import './App.css';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Entities from './Entities';
import ToolBar from './ToolBar';
import Canvas from './Canvas';
import EntityProps from './EntityProps.js';
import Export from './Export.js';
import Login from './Login';

import {useState} from 'react';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});


function App() {
    const [currentTool, setCurrentTool] = useState('backgrounds');
    const [background, setBackground] = useState();
    const [image, setImage] = useState();
    const [text, setText] = useState(false);
    const [saving, setSaving] = useState();
    const [selectedEntityProps, setSelectedEntityProps] = useState({});
    const [selectedEntity, setSelectedEntity] = useState();
    const [buttonClicked, setButtonClicked] = useState();

    const handleExport = (event) => {
        setSaving(true);
    }

    const saveImage = (dataSource) => {
        let link = document.createElement('a');
        link.download = 'filename.png';
        link.href = dataSource;
        link.click();
        setSaving(false);
    }

    const handleChangeEntity = (event) => {
        if(currentTool === 'backgrounds') {
            setBackground(event.target.src);
        }
        else if(currentTool === 'images') {
            setImage(event.target.src);
        }
        else if(currentTool === 'text') {
            setText(Date.now());
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Grid container spacing={2} p={4} className='app'>
                <Grid item xs={12} p={2}>
                    <Stack 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="stretch"
                    >
                        <img className='logo' src="logo.svg" alt="logo"/>
                        <Login/>
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    <Stack>
                        <ToolBar changeTool={setCurrentTool}/>
                        <Entities tool={currentTool} changeEntity={handleChangeEntity}/>
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    <Grid display="flex" justifyContent="center" height={'100%'}>
                        <Canvas background={background} image={image} text={text} saving={saving} saveImage={saveImage} selectedEntityProps={selectedEntityProps} setSelectedEntityProps={setSelectedEntityProps} selectedEntity={selectedEntity} buttonClicked={buttonClicked}/>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Stack
                        className='right-sidebar'
                        justifyContent='space-between'
                    >
                        <EntityProps setSelectedEntity={setSelectedEntity} selectedEntityProps={selectedEntityProps} setSelectedEntityProps={setSelectedEntityProps} setButtonClicked={setButtonClicked}/>
                        <Export handleExport={handleExport}/>
                    </Stack>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
