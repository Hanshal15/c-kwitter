//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyC2XBP4fYa3vZab8mAx9HiPGvNo99-Fi6w",
      authDomain: "kwitter-f7bbe.firebaseapp.com",
      databaseURL: "https://kwitter-f7bbe-default-rtdb.firebaseio.com",
      projectId: "kwitter-f7bbe",
      storageBucket: "kwitter-f7bbe.appspot.com",
      messagingSenderId: "747071201226",
      appId: "1:747071201226:web:202aecf6ff2d61d462b933",
}
firebase.initializeApp(firebaseConfig);

username=localStorage.getItem("username")
room_name=localStorage.getItem("room_name")


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name=message_data['name'];
message=message_data['message'];
like=message_data['like'];
namewithtag="<h4>"+name+"<img class=user_tick src='tick.png'></h4>";
messagewithtag="<h4 class='message_h4'>"+message+"</h4>";
likebutton="<button class='btn btn-warning' id="+firebase_message_id+"value="+like+"onclick='updatelike(this.id)'>";
spanwithtag="<span class='glyphicon glyphicon-thumbs-up'>Like:"+like+"</span></button><hr>";
row=namewithtag+messagewithtag+likebutton+spanwithtag;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();

function logout() {
      localStorage.removeItem("room_name")
      localStorage.removeItem("username")
      window.location="kwitter.html";
}

function send() {
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:username,
            message:msg,
            like:0,
      })
      document.getElementById("msg").value="";
}

function updatelike(message_id) {
      console.log("clicked on the like button"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updatedlikes=Number(likes)+1;
      console.log(updatedlikes);
      firebase.database().ref(room_name).child(message_id).update({
            like:updatedlikes
      });
      
}
