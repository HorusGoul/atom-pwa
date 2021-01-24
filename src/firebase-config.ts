import firebase from "firebase/app";
import "firebase/analytics";
import NativeBridge from "./NativeBridge";

const config = {
  apiKey: "AIzaSyBQ8L88zfT2qdwsi2bLoj5acgTYtdMJF-Y",
  authDomain: "atom-periodic-table-and-tests.firebaseapp.com",
  databaseURL: "https://atom-periodic-table-and-tests.firebaseio.com",
  projectId: "atom-periodic-table-and-tests",
  storageBucket: "atom-periodic-table-and-tests.appspot.com",
  messagingSenderId: "900411108071",
  appId: "1:900411108071:web:193ee47a8df4dd779d9042",
  measurementId: "G-FZM0SQQP75"
};

firebase.initializeApp(config);

if (!NativeBridge.isHybrid()) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("set", { send_page_view: false });

  firebase.analytics();
}
