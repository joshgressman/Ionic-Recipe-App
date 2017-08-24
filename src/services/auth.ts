import firebase from 'firebase';

export class AuthService {

  //sign up user using firebase built in method
  //result will be a promis from firebase
  signup(email: string, password: string){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  //signin using firebase built in method
  signin(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //method will removed web token
  logout(){
    firebase.auth().signOut();
  }

}
