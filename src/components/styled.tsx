import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Avatar, Grid, Button } from "@mui/material";

const theme = createTheme();

export const SRootGrid = styled(Grid)({
  height: "100vh",
  component: "main",
});

export const SImageGrid = styled(Grid)({
  backgroundImage:
    "url(https://images.unsplash.com/photo-1598439210625-5067c578f3f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80)",
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

export const ModalInner = styled("div")({
  outline: "none",
  position: "absolute",
  width: 400,
  borderRadius: 10,
  backgroundColor: "white",
  paddingTop:"1rem",
  boxShadow: theme.shadows[5],
});

export const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%,-${left}%)`,
  };
};
