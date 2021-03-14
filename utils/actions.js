import { firebaseApp } from "./firebase";
import * as firebase from "firebase";
import "firebase/firestore";
import { fileToBlob } from "./helpers";

const db = firebase.firestore(firebaseApp);

export const isUserLogged = () => {
  let isLogged = false;
  firebase.auth().onAuthStateChanged((user) => {
    user !== null && (isLogged = true);
  });
  return isLogged;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
  /*let isLogged = false
   firebase.auth().onAuthStateChanged((user)=>{
      user !== null && (isLogged = true)
   })
   return isLogged;
 */
};

export const registerUser = async (email, password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Este correo ya ha sido registrado";
  }
  return result;
};

export const loginWithEmailAndPassword = async (email, password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Usuario o contraseña no válidos.";
  }
  return result;
};

export const closeSession = () => {
  return firebase.auth().signOut();
};

export const uploadImage = async (image, path, name) => {
  const result = { statusResponse: false, error: null, url: null };
  const ref = firebase.storage().ref(path).child(name);
  const blob = await fileToBlob(image);
  
  try {
    await ref.put(blob)
    const url =  await firebase.storage().ref(`${path}/${name}`).getDownloadURL();
    result.statusResponse = true;

    result.url = url;
  } catch (error) {
    result.error = error;
  }
  return result;
};


export const updateProfile = async(data) =>{
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updateProfile(data)
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }

  return result
}

export const getCollection = async (collection) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    const data = await db.collection(collection).get();
    const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    result.statusResponse = true;
    result.data = arrayData;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const addDocument = async (collection, datas) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    const data = await db.collection(collection).add(datas);
    result.data = { id: Response.id };
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const getDocument = async (collection, id) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    const response = await db.collection(collection).doc(id).get();
    result.data = { id: response.id, ...response.data() };
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }

  return result;
};

export const updateDocument = async (collection, id, data) => {
  const result = { statusResponse: false, error: null };
  try {
    await db.collection(collection).doc(id).update(data);
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }

  return result;
};

export const deleteDocument = async (collection, id) => {
  const result = { statusResponse: false, error: null };
  try {
    await db.collection(collection).doc(id).delete();
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }

  return result;
};


export const reauthenticate = async(password) => {
  const result = { statusResponse: true, error: null }
  const user = getCurrentUser()
  const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)

  try {
      await user.reauthenticateWithCredential(credentials)
  } catch (error) {
      result.statusResponse = false
      result.error = error
  }
  return result     
}

export const updateEmail = async(email) => {
  const result = { statusResponse: true, error: null }
  try {
      await firebase.auth().currentUser.updateEmail(email)
  } catch (error) {
      result.statusResponse = false
      result.error = error
  }
  return result     
}


export const updatePassword = async(password) => {
  const result = { statusResponse: true, error: null }
  try {
      await firebase.auth().currentUser.updatePassword(password)
  } catch (error) {
      result.statusResponse = false
      result.error = error
  }
  return result     
}