import Stack from '@mui/material/Stack';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';

function Export({handleExport}) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className='export-wrapper'
        >
            <span>Сохранить как:</span>
            <IconButton onClick={handleExport}>
                <FileDownloadIcon/>
            </IconButton>
        </Stack>
    );
}

export default Export;