import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import IconButton from '@mui/material/IconButton';
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
            <IconButton color="primary">
                <ImageIcon/>
            </IconButton>
            <IconButton>
                <LocalFloristIcon/>
            </IconButton>
            <IconButton>
                <TextFieldsIcon/>
            </IconButton>
        </Stack>
    );
}

export default ToolBar;