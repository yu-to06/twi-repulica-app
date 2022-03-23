import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Avatar, Grid, Button } from "@mui/material";

const theme = createTheme();

export const SRootGrid = styled(Grid)({
  height: "100vh",
  component: "main",
});

export const SImageGrid = styled(Grid)({
  backgroundImage: "url(https://source.unsplash.com/random)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export const SPaperDiv = styled("div")({
  margin: theme.spacing(8, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const SAvatar = styled(Avatar)({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
});

export const SForm = styled("form")({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
});

export const SButton = styled(Button)({
  margin: theme.spacing(3, 0, 2),
});
