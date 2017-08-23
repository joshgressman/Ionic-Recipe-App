import firebase from 'firebase';

export class AuthService {

  //sign up user using firebase built in method
  //result will be a promis from firebase
  signup(email: string, password: string){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

}
