import React from "react";
import {
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import {
  SRootGrid,
  SImageGrid,
  SPaperDiv,
  SAvatar,
  SButton,
  SForm,
} from "./styled";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        TwiRep
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  return (
    <SRootGrid container>
      <CssBaseline />
      <SImageGrid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <SPaperDiv>
          <SAvatar>
            <LockIcon />
          </SAvatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <SForm noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <SButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary">
              Sign In
            </SButton>
            <Grid container sx={{ my: 2 }}>
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
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </SForm>
        </SPaperDiv>
      </Grid>
    </SRootGrid>
  );
}
