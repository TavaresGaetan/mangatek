import React, { useState, useRef } from "react";

import { withFirebase } from "../../Firebase";
import { useParams, withRouter } from "react-router-dom";
import { withAuthorization } from "../../Session";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SignInPage from "../../SignInPage";

function ChatPage(props) {
  const [user] = useAuthState(props.firebase.auth);
  const { id } = useParams();
  console.log("ididioeirpzoripzeorizperi", id);

  return (
    <div className="ChatPage">
      <h1>⚛️🔥💬 Chat Room </h1>

      <section>
        {user ? <ChatRoom roomId={id} {...props} /> : <SignInPage />}
      </section>
    </div>
  );
}

function ChatRoom({ roomId, ...props }) {
  const dummy = useRef();

  const messagesRef = props.firebase.firestore
    .collection("rooms")
    .doc(roomId)
    .collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages);

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = props.firebase.auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: Date.now().toString(),
      uid,
      photoURL,
    });

    setFormValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage {...props} key={msg.id} message={msg} />
          ))}

        <span ref={dummy}> </span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />

        <button type="submit">💬</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass =
    uid === props.firebase.auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

const condition = (authUser) => !!authUser;
export default withRouter(withFirebase(withAuthorization(condition)(ChatPage)));
