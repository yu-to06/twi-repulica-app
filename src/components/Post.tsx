import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";
import styles from "./Post.module.css";
import { TodayTwoTone } from "@mui/icons-material";

interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
}

interface COMMENT {
  id: string;
  avatar: string;
  text: string;
  timestamp: any;
  username: string;
}

const Post: React.FC<PROPS> = (props) => {
  const [comment, setComment] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const user = useSelector(selectUser);
  const [comments, setComments] = useState<COMMENT[]>([
    {
      id: "",
      avatar: "",
      text: "",
      username: "",
      timestamp: null,
    },
  ]);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .doc(props.postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            text: doc.data().text,
            username: doc.data().username,
            timestamp: doc.data().timestamp,
          }))
        );
      });
    return () => {
      unSub();
    };
  }, [props.postId]);

  // コメント用の関数
  const newComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    db.collection("posts").doc(props.postId).collection("comments").add({
      avatar: user.photoUrl,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setComment("");
  };

  return (
    <div className={styles.post}>
      <div className={styles.post_avatar}>
        <Avatar src={props.avatar} />
      </div>
      <div className={styles.post_body}>
        <div>
          <div className={styles.post_header}>
            <h3>
              <span className={styles.post_headerUser}>@{props.username}</span>
              <span className={styles.post_headerTime}>
                {new Date(props.timestamp?.toDate()).toLocaleString()}
              </span>
            </h3>
          </div>
          <div className={styles.post_tweet}>
            <p>{props.text}</p>
          </div>
        </div>
        {props.image && (
          <div className={styles.post_tweetImage}>
            <img src={props.image} alt="tweet-image" />
          </div>
        )}

        {/* コメントの表示、非表示ボタン */}
        <MessageIcon
          className={styles.post_commentIcon}
          onClick={() => setOpenComments(!openComments)}
        />
        {/* コメントの表示 */}
        {openComments && (
          <>
            {comments.map((com) => (
              <div key={com.id} className={styles.post_comment}>
                <Avatar src={com.avatar} sx={{ width: 24, height: 24 }} />

                <span className={styles.post_commentUser}>@{com.username}</span>
                <span className={styles.post_commentText}>{com.text} </span>
                <span className={styles.post_headerTime}>
                  {new Date(com.timestamp?.toDate()).toLocaleString()}
                </span>
              </div>
            ))}
          </>
        )}

        <form onSubmit={newComment}>
          <div className={styles.post_form}>
            <input
              type="text"
              className={styles.post_input}
              placeholder="Type new Comment.."
              value={comment}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setComment(event.target.value)
              }
            />
            <button
              disabled={!comment}
              className={
                comment ? styles.post_buttom : styles.post_buttonDisable
              }
              type="submit">
              <SendIcon className={styles.post_sendIcon} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
