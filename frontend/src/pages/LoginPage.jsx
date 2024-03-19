import { Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Login from "../Login";

function LoginPage() {
  return (
    <>
      <CssBaseline />
      <Grid container spacing={2} p={{ md: 4, xs: 2 }} className="app">
        <Grid item xs={12} p={{ md: 2, xs: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Link to="/">
              <img className="logo" src="logo.svg" alt="logo" />
            </Link>
            <Login isLoginPage />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginPage;
