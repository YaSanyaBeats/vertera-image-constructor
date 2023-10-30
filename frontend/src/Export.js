import Stack from '@mui/material/Stack';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';

function Export() {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className='export-wrapper'
        >
            <span>Сохранить как:</span>
            <IconButton>
                <FileDownloadIcon/>
            </IconButton>
        </Stack>
    );
}

export default Export;