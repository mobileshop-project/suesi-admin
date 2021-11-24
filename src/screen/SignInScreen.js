import React, { Component } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Redirect, withRouter } from "react-router";
import Authentication from "../service/Authentication";
import { blue } from "@mui/material/colors";
import logo from "../assets/images/suesi_logo_2.png"
import Alert from "../service/Alert";
import {signin} from "../actions/auth/auth";
import {connect} from "react-redux";
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

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    if (Authentication.getDecodeUser() != null) {
      this.setState({ isRedirect: true })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props
    const data = new FormData(event.currentTarget);
    let username = data.get("username");
    let password = data.get("password");
    dispatch(signin(username, password))
      .then(async () => {
        await this.setState({isLoading: false})
        await Alert.getLoginAlert()
        await this.setState({isRedirect: true})
      },() =>{
        Alert.getLoginAlertFail()
        this.setState({isLoading: false})
      })
    // Authentication.signIn(username, password).then(async (res) => {
    //   let user = Authentication.deCodeJwt(res)
    //   if (user.roles[0] === "ADMIN") {
    //     await Alert.getLoginAlert(); this.setState({
    //       isRedirect: await true
    //     })
    //   } else {
    //     Alert.getLoginAlertFail()
    //   }
    // },(error) => {
    //   Alert.getLoginAlertFail()
    // });
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
            <img src={logo} className="w-auto h-36 p-2" alt="" />

            <Typography component="h1" variant="h5">
              <p className="font-bold">Sign in with suesi for Admin</p>
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
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  render() {
    const { isRedirect } = this.state;
    return (isRedirect ? <Redirect to="/home" /> : <div >{this.renderSignForm()}</div>)

  }
}

function mapStateToProps(state) {
  const {isLoggedIn} = state.auth;
  const {message} = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default withRouter(connect(mapStateToProps)(SignInScreen))
