import React, {useState, useRef} from 'react';

import { withFirebase } from "../../Firebase";
import { withRouter } from "react-router-dom";
import { withAuthorization } from "../../Session";


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SignInPage from '../../SignInPage';
import SignOut from '../../SignOut';



function ChatPage(props) {

const [user] = useAuthState( props.firebase.auth);

  return (
    <div className="ChatPage">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header> 
      
      <section>
        {user ? <ChatRoom {...props}/> : <SignInPage/>}
      </section>
    </div>
  );
} 


function ChatRoom(props) {

  const dummy = useRef();

  const messagesRef = props.firebase.firestore.collection('messages');
  console.log(messagesRef);

  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id'});
  console.log(messages);

  const [formValue, setFormValue] = useState('');


  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = props.firebase.auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: Date.now().toString(),
      uid,
      photoURL
    });

    setFormValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth'});
  }

  return (<>
      <main>

        {messages && messages.map(msg => <ChatMessage {...props} key={msg.id} message={msg} />)}

        <span ref={dummy}> </span>

      </main>

      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />

        <button type="submit">💬</button>

      </form>
    </>
  )
}


function ChatMessage(props) {

  const { text, uid, photoURL} = props.message;
  
  const messageClass = uid === props.firebase.auth.currentUser.uid ? 'sent' : 'received';

  return(<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  </>  ) 
}

const condition = (authUser) => !!authUser;
export default withRouter(
  withFirebase(withAuthorization(condition)(ChatPage))
);
