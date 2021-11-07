import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Redirect, withRouter } from "react-router";
import Authentication from "../service/Authentication";
import Home from "../screen/Home";
import { blue } from "@mui/material/colors";
import logo from "../assets/images/suesi_logo_2.png"
import { Link } from "react-router-dom";
import Alert from "../service/Alert";
const theme = createTheme();
class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
      username: "",
      password: "",
    };
  }


  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get("username");
    let password = data.get("password");

    Authentication.signIn(username, password).then(async (res) => {
      let user = Authentication.deCodeJwt(res)
      console.log(user.roles[0])
      if (user.roles[0] === "ADMIN") {
        await Alert.getLoginAlert(); this.setState({
          isRedirect: await true
        })
      } else {
        Alert.getLoginAlertFail()
      }


    }, (error) => {
      Alert.getLoginAlertFail()
    });
  }

  Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          2021 ยังไม่คิด.COM. All Rights Reserved.
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  renderSignForm() {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={logo} className="w-auto h-36 p-2" />
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Sign in with suesi admin
            </Typography>
            <Box
              component="form"
              onSubmit={this.handleSubmit.bind(this)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button style={{ backgroundColor: blue[800] }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            </Box>
          </Box>
          <this.Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>

      </ThemeProvider>
    );
  }

  render() {
    const { isRedirect } = this.state;
    return (isRedirect ? <Redirect to="/home" /> : <div className="  ">{this.renderSignForm()}</div>)

  }
}
export default withRouter(SignInScreen);
