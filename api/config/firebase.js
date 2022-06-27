import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCLOgFwSgisZMMPt4cKR-0DxJa4_LPTf4I',
  authDomain: 'mobilidade-urbana-546b3.firebaseapp.com',
  projectId: 'mobilidade-urbana-546b3',
  storageBucket: 'mobilidade-urbana-546b3.appspot.com',
  messagingSenderId: '991177366659',
  appId: '1:991177366659:web:871a301389a1d9777c8fb6',
};

firebase.initializeApp(firebaseConfig);

//used to realtime database
export const databaseRef = firebase.database();

//used to Push notification
export const PUSH_APPID =
  'AAAA5sbGXIM:APA91bEwhJNksyY_kAsBxa1euX9QlHMVyTfsZsdiqRzgTus8udfyjzLHiu8QqARJhp-7v9eTjf_PWzgJs5AmDeJLCTqZzy35OKMrYMdyIypC-Yj2xkogTppMp70c11z4ciYO8-LbNL2A';

export const PUSH_SENDERID = '991177366659';
