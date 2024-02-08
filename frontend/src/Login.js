import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useState, useEffect, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { MuiFileInput } from 'mui-file-input'
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import ImageIcon from '@mui/icons-material/Image';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const VisuallyHiddenInput = styled(MuiFileInput)({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function Login() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [autoLoginLoader, setAutoLoginLoader] = useState(true);
    const [popupLoader, setPopupLoader] = useState(false);

    const [backButtonLoader, setBackButtonLoader] = useState(false);
    const [imageButtonLoader, setImageButtonLoader] = useState(false);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const uploadBackRef = useRef();

    const [alarmObj, setAlarmObj] = useState({
        open: false,
        severity: '',
        message: '',
    });

    const [uploadAlarmObj, setUploadAlarmObj] = useState({
        open: false,
        severity: '',
        message: '',
    });

    const url = process.env.REACT_APP_API_URL + '/login/';
    const uploadUrl = process.env.REACT_APP_API_URL + '/addEntity/';

    useEffect(() => {
        let token = localStorage.getItem('auth_token');
        if(token === undefined) {
            setIsLogin(false);
            setAutoLoginLoader(false);
        }
        else {
            fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'token',
                    token: token,
                })
            }).then((response) => response.json())
            .then((res) => {
                if(res.status === 'success') {
                    setIsLogin(true);
                }
                setAutoLoginLoader(false);
            })
        }
    }, [])
    

    const handleClickOpen = () => {
        setLoginOpen(true);
    };

    const handleClose = () => {
        setLoginOpen(false);
        setUploadOpen(false);
    };

    const changeLogin = (event) => {
        setLogin(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = () => {
        setPopupLoader(true);
        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'login',
                login: login,
                password: password
            })
        }).then((response) => response.json())
        .then(res => {
            if(res.status === 'success') {
                localStorage.setItem('auth_token', res.token);
                setAlarmObj({
                    open: true, 
                    severity: 'success',
                    message: 'Вы успешно авторизовались'
                });
                setIsLogin(true);
                setTimeout(() => {
                    setLoginOpen(false);
                }, 1500);
            }
            else {
                setAlarmObj({
                    open: true, 
                    severity: 'error',
                    message: 'Неверный логин или пароль, попробуйте ещё раз'
                });
            }
            setPopupLoader(false);
        });
    }

    const handleAddEntity = (fileType, file) => {

        const reader = new FileReader();
        console.log(fileType === "back")
        fileType === "back" ? setBackButtonLoader(true) : setImageButtonLoader(true);
        

        reader.addEventListener(
            "load",
            async (event) => {
                let formdata = new FormData();
                
                formdata.append(fileType, file, file.name);

                fetch(uploadUrl, {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                }).then(
                    response => response.json()
                ).then((res) => {
                        setBackButtonLoader(false);
                        setImageButtonLoader(false);
                        if(res.status === 'success') {
                            setUploadAlarmObj({
                                open: true, 
                                severity: 'success',
                                message: 'Файл успешно загружен'
                            });
                            setTimeout(() => {
                                setUploadOpen(false);
                                setUploadAlarmObj({
                                    open: false
                                })
                            }, 1500)
                        }
                        else {
                            setUploadAlarmObj({
                                open: true, 
                                severity: 'error',
                                message: 'Произошла ошибка, попробуйте ещё раз'
                            });
                        }
                    }
                )
            },
          );
        
        reader.readAsDataURL(file);
    }

    const handleUploadOpen = () => {
        setUploadOpen(true);
    }

    const handleLogOut = () => {
        localStorage.removeItem('auth_token');
        setIsLogin(false);
    }

    return (
        <>
            {autoLoginLoader ? (
                <CircularProgress size={20}/>
            ): isLogin ? (
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<CloudUploadIcon />} onClick={handleUploadOpen}>Загрузить в общую библиотеку</Button>
                    <Button color="error" variant="outlined" onClick={handleLogOut}>
                        Выйти
                    </Button>
                </Stack>
            ) : (
                <Button variant="outlined" onClick={handleClickOpen} startIcon={<LoginIcon />}>Войти</Button>
            )}
            
            <Dialog
                fullScreen={fullScreen}
                open={loginOpen}
                onClose={handleClose}
            >
                <DialogTitle>Авторизация</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Stack spacing={2}>
                            <Collapse in={alarmObj.open}>
                                <Alert  severity={alarmObj.severity}>{alarmObj.message}</Alert>
                            </Collapse>
                            <TextField value={login} onChange={changeLogin} label="Логин" variant="filled" />
                            <TextField value={password} onChange={changePassword} label="Пароль" type="password" variant="filled" />
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>Отмена</Button>
                    <LoadingButton loading={popupLoader} onClick={handleSubmit}><span>Войти</span></LoadingButton>
                </DialogActions>
            </Dialog>

            <Dialog
                fullScreen={fullScreen}
                open={uploadOpen}
                onClose={handleClose}
            >
                <DialogTitle>Загрузить в общюю библиотеку</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Collapse in={uploadAlarmObj.open}>
                            <Alert  severity={uploadAlarmObj.severity}>{uploadAlarmObj.message}</Alert>
                        </Collapse>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <LoadingButton component="label" loading={backButtonLoader} startIcon={<ImageIcon />}>
                        Добавить фон
                        <VisuallyHiddenInput ref={uploadBackRef} inputProps={{ accept: '.png, .jpeg' }} onChange={handleAddEntity.bind(null, 'back')} />
                    </LoadingButton>
                    <LoadingButton component="label" loading={imageButtonLoader} startIcon={<LocalFloristIcon />}>
                        Добавить изображение
                        <VisuallyHiddenInput inputProps={{ accept: '.png, .jpeg' }} onChange={handleAddEntity.bind(null, 'image')} />
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Login;