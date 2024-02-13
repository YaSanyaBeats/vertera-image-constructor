import { useState } from 'react';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ImageIcon from '@mui/icons-material/Image';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import TextFieldsIcon from '@mui/icons-material/TextFields';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from '@mui/icons-material/Settings';

import Entities from './Entities';
import { Icon, IconButton } from '@mui/material';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EntityProps from './EntityProps';

function ToolBarMobile({tool, changeTool, changeEntity, handleExport, selectedEntityObj}) {

    const [entityPopupOpen, setEntityPopupOpen] = useState(false);
    const [propsPopupOpen, setPropsPopupOpen] = useState(false);

    const actions = [
        { icon: <TextFieldsIcon />, name: 'Добавить текст', tool: 'text' },
        { icon: <LocalFloristIcon />, name: 'Добавить изображение', tool: 'images' },
        { icon: <ImageIcon />, name: 'Добавить фон', tool: 'backgrounds' },
      ];

    const handleAddEntity = (currentTool) => () => {
        changeTool(currentTool);
        setEntityPopupOpen(true);
    }
    
    const handleClose = () => {
        setEntityPopupOpen(false);
        setPropsPopupOpen(false);
    }

    const handleChangeEntity = (event) => {
        setEntityPopupOpen(false);
        changeEntity(event);
    }

    const handleOpenPropsPopup = () => {
        setPropsPopupOpen(true);
        console.log(selectedEntityObj);
    }

    return (
        <>
            <IconButton className="export-mobile-button" size="small" variant="outlined" onClick={handleExport} sx={{ position: 'absolute', bottom: 13, right: 80 }}>
                <FileDownloadIcon fontSize="small" />
            </IconButton>
            {selectedEntityObj.selectedEntityProps.id !== "main-stage" && (
                <IconButton className="export-mobile-button" size="small" variant="outlined" onClick={handleOpenPropsPopup} sx={{ position: 'absolute', bottom: 13, right: 130 }}>
                    <SettingsIcon fontSize="small" />
                </IconButton>
            )}
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleAddEntity(action.tool)}
                    />
                ))}
            </SpeedDial>
            <Dialog
                fullScreen
                open={entityPopupOpen}
                onClose={handleClose}
            >
                <DialogContent className='entity-popup'>
                    <Entities tool={tool} changeEntity={handleChangeEntity}/>
                </DialogContent>
                <DialogActions className='entity-popup-actions'>
                    <Button onClick={handleClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullScreen
                open={propsPopupOpen}
                onClose={handleClose}
            >
                <DialogContent>
                <EntityProps 
                    setSelectedEntity={selectedEntityObj.setSelectedEntity}
                    selectedEntityProps={selectedEntityObj.selectedEntityProps}
                    setSelectedEntityProps={selectedEntityObj.setSelectedEntityProps}
                    setButtonClicked={selectedEntityObj.setButtonClicked}
                    setPropsPopup={setPropsPopupOpen}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Применить</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ToolBarMobile;