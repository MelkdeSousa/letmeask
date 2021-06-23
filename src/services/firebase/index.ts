import firebase from './config'

const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database }
