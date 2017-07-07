import Rebase from 're-base';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';

var app = firebase.initializeApp({
  apiKey: "AIzaSyCe0PUWaw2MWKMhoxXHx93w96nSYljKapE",
  authDomain: "learn-react-a9d23.firebaseapp.com",
  databaseURL: "https://learn-react-a9d23.firebaseio.com",
  projectId: "learn-react-a9d23",
});

var authApp = firebase.auth(app);
var db = database(app);
var base = Rebase.createClass(db);

export {
 base
};
