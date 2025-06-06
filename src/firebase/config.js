import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBPV-QAgn7XfY1cU-gM6YB5oBTZI8R5lvY",
  authDomain: "realtime-c-e7533.firebaseapp.com",
  projectId: "realtime-c-e7533",
  storageBucket: "realtime-c-e7533.firebasestorage.app",
  messagingSenderId: "1037443368084",
  appId: "1:1037443368084:web:c08d6b6a28489cb148e081",
  measurementId: "G-2RPRHN5SNF",
};

// Chỉ khởi tạo nếu chưa có app nào
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// if (window.location.hostname === "localhost") {
//   auth.useEmulator("http://localhost:9099");
//   db.useEmulator("localhost", 8080);
// }

export { db, auth };
export default firebase;
