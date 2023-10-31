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

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

function App() {
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
                        <ToolBar/>
                        <Entities/>
                    </Stack>
                </Grid>
                <Grid item xs={8} justifyContent='center'>
                    <Canvas/>
                </Grid>
                <Grid item xs={2}>
                    <Stack
                        className='right-sidebar'
                        justifyContent='space-between'
                    >
                        <EntityProps/>
                        <Export/>
                    </Stack>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
