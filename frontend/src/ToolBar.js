import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';

function samePageLinkNavigation(event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

function ToolBar() {
    const [tool, setTool] = useState(0);

    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (
          event.type !== 'click' ||
          (event.type === 'click' && samePageLinkNavigation(event))
        ) {
            setTool(newValue);
        }
      };

    return (
        <Stack
            direction="row"
            alignItems="center"
        >
            <Box mr={2}>
                <span>Добавить:</span>
            </Box>
            <Tabs value={tool} onChange={handleChange} aria-label="bg image text">
                <Tab className="tool-tab" aria-label="bg" icon={<ImageIcon />} />
                <Tab className="tool-tab" aria-label="image" icon={<LocalFloristIcon />} />
                <Tab className="tool-tab" aria-label="text" icon={<TextFieldsIcon />} />
            </Tabs>
        </Stack>
    );
}

export default ToolBar;