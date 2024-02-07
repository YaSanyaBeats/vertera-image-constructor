import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';

function Login() {
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const url = "http://localhost:8000/login/";

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changeLogin = (event) => {
        setLogin(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = () => {
        setLoader(true);
        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login, login,
                password: password
            })
        }).then((response) => {
            setLoader(false);
            console.log(response)
        });
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<LoginIcon />}>Войти</Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle>Авторизация</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Stack spacing={2}>
                            <TextField value={login} onChange={changeLogin} label="Логин" variant="filled" />
                            <TextField value={password} onChange={changePassword} label="Пароль" type="password" variant="filled" />
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>Отмена</Button>
                    <LoadingButton loading={loader} onClick={handleSubmit}><span>Войти</span></LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Login;