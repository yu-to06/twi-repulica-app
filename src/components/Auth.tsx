import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, provider, storage } from "../firebase";
import {
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  IconButton,
  Modal,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import CameraIcon from "@mui/icons-material/Camera";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { updateUserProfile } from "../features/userSlice";

import {
  SRootGrid,
  SImageGrid,
  SPaperDiv,
  SAvatar,
  SButton,
  SForm,
  ModalInner,
  getModalStyle,
} from "./styled";
import styles from "./Auth.module.css";
import { Box } from "@mui/system";
import { PasswordSharp } from "@mui/icons-material";


const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const dispatch = useDispatch();

  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((error) => {
        alert(error.message);
        setResetEmail("");
      });
  };

  const onChangeImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // !マークはtypescriptでnullまたはundefinedではないと宣言している
    if (event.target.files![0]) {
      setAvatarImage(event.target.files![0]);
      event.target.value = "";
    }
  };

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);
    let url = "";
    // 画像をstorageへ保存
    if (avatarImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      // 16文字の名前を作りたいので16をセット
      const N = 16;
      // randomCharには16桁の乱数が入る。Uint32Arrayで約43億の配列ができ、そのうち16個がnに入る。
      // その配列をSの長さ62で割ると必ず0～61が出力されるのでS[index]となる
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + avatarImage.name;
      await storage.ref(`avatars/${fileName}`).put(avatarImage);
      url = await storage.ref("avatars").child(fileName).getDownloadURL();
    }
    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: url,
    });
    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: url,
      })
    );
  };

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

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
            {isLogin ? "Login" : "Register"}
          </Typography>

          {/* 入力フォーム */}
          <SForm noValidate>
            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.target.value);
                  }}
                />

                <Box textAlign="center">
                  <IconButton>
                    <label>
                      <AccountCircleIcon
                        fontSize="large"
                        className={
                          avatarImage
                            ? styles.login_addIconLoaded
                            : styles.login_addIcon
                        }
                      />
                      <input
                        type="file"
                        className={styles.login_hiddenIcon}
                        onChange={onChangeImageHandler}
                      />
                    </label>
                  </IconButton>
                </Box>
              </>
            )}

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
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
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
              placeholder={isLogin ? "" : "Please Enter at Least 6 Characters"}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />

            {/* ログインボタン */}
            <SButton
              disabled={
                isLogin
                  ? !email || password.length < 6
                  : !username || !email || password.length < 6 || !avatarImage
              }
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<EmailIcon />}
              onClick={
                isLogin
                  ? async () => {
                      try {
                        await signInEmail();
                      } catch (error: any) {
                        alert(error.message);
                      }
                    }
                  : async () => {
                      try {
                        await signUpEmail();
                      } catch (error: any) {
                        alert(error.message);
                      }
                    }
              }>
              {isLogin ? "Login" : "Register"}
            </SButton>

            {/* ヘルプボタン */}
            <Grid container>
              <Grid item xs>
                <span
                  onClick={() => setOpenModal(true)}
                  className={styles.login_reset}>
                  Forgot Password?
                </span>
              </Grid>

              <Grid item>
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className={styles.login_toggleMode}>
                  {isLogin ? "Create new account?" : "Back to Login"}
                </span>
              </Grid>
            </Grid>

            {/* GOOGLE認証 */}
            <SButton
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<CameraIcon />}
              onClick={signInGoogle}>
              SignIn with Google
            </SButton>
          </SForm>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <ModalInner style={getModalStyle()}>
              <div className={styles.login_modal}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  type="email"
                  name="email"
                  label="Reset E-mail"
                  value={resetEmail}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setResetEmail(event.target.value);
                  }}
                />
                <IconButton onClick={sendResetEmail}>
                  <SendIcon />
                </IconButton>
              </div>
            </ModalInner>
          </Modal>
        </SPaperDiv>
      </Grid>
    </SRootGrid>
  );
};
export default Auth;
