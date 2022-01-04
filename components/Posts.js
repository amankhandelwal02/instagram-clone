import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
    const [post, setPost] = useState([]);
  
    useEffect(
      () => 
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPost(snapshot.docs);
        }
      ), [db]);
  
    console.log("profile image is", post.profileImg)
    

  return (
    <div>
      {post.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          postImg={post.data().image}
          userImg={post.data().userImg}
          username={post.data().username}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
