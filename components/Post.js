import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useSession } from "next-auth/react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const Post = ({ userImg, postImg, username, id, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const postLike = async () => {
      if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
      } else {

          await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
            username: session.user.username,
          });
      }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <Container>
      <PostHead>
        <UserImage src={userImg} height="50px" width="50px" />
        <p className="flex-1 font-bold">{username}</p>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </PostHead>

      <PostImg>
        <BodyImage src={postImg} className="object-cover w-full" />
      </PostImg>

      {session && (
        <PostIcon>
          <div>
              {
                  hasLiked ? (
                    <FavoriteIcon onClick={postLike} className="postBtn text-red-500" />
                  ) : (

                      <FavoriteBorderIcon onClick={postLike} className="postBtn" />
                  )
              }

            <ChatBubbleOutlineIcon className="postBtn" />

            <SendIcon className="postBtn -rotate-45" />
          </div>
          <BookmarkBorderIcon className="postBtn" />
        </PostIcon>
      )}

      <PostCaption>
        <p className="p-4 truncate">
            {likes.length > 0 && (
                <p className="font-bold mb-1">{likes.length} {likes.length < 0 ? "likes" : "like"}</p>
            )}
          <span className="font-bold mr-2">{username} </span>
          {caption}
        </p>
      </PostCaption>

      {comments.length > 0 && (
        <div className="ml-8 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <Image
                className="h-11 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="flex-1">
                <span className="font-bold">{comment.data().username}: </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-sm font-semibold">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <PostComment className="flex p-4 items-center">
          <EmojiEmotionsIcon />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border-none outline-none ml-3"
          />

          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-bold text-blue-400"
          >
            Post
          </button>
        </PostComment>
      )}
    </Container>
  );
};

export default Post;

const Container = styled.div`
  background-color: white;
  margin: 15px 0px;
`;

const PostHead = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;

const UserImage = styled.img`
  border-radius: 50px;
  padding: 2px;
  border: 2px solid gray;
  margin-right: 15px;
`;

const PostImg = styled.div``;

const BodyImage = styled.img``;

const PostIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PostCaption = styled.div``;

const PostComment = styled.div``;

const Image = styled.img`
  padding: 2px;
  border: 2px solid gray;
`;
