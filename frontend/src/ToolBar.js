import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function ToolBar() {
    return (
        <Stack
            direction="row"
            alignItems="center"
        >
            <Box mr={2}>
                <span>Добавить:</span>
            </Box>
            <Tabs p={0} size="small">
                <Tab className="tool-tab" icon={<ImageIcon />} size="small"/>
                <Tab className="tool-tab" icon={<LocalFloristIcon />} size="small" />
                <Tab className="tool-tab" icon={<TextFieldsIcon />} size="small" />
            </Tabs>
        </Stack>
    );
}

export default ToolBar;