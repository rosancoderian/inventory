import { firebase } from '@firebase/app'
import '@firebase/firestore'

export function db() {
    try {
        let config = {
            apiKey: 'AIzaSyBfu3eeJjrKkWFJIF_He9KiT_Nrm_ZkoJ0',
            authDomain: 'inventory-rosancoderian.firebaseapp.com',
            projectId: 'inventory-rosancoderian'
        }
        firebase.initializeApp(config)
    } catch (err) {
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }
    return firebase;
}