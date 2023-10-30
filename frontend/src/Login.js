import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

function Login() {
    return (
        <Button variant="outlined" startIcon={<LoginIcon />}>Войти</Button>
    );
}

export default Login;