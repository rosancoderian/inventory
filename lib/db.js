import { firebase } from '@firebase/app'
import '@firebase/firestore'

export function init () {
    let db = null
    try {
        firebase.initializeApp({
            apiKey: 'AIzaSyBfu3eeJjrKkWFJIF_He9KiT_Nrm_ZkoJ0',
            authDomain: 'inventory-rosancoderian.firebaseapp.com',
            projectId: 'inventory-rosancoderian'
        })
    } catch (err) {
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }
    db = firebase.firestore()
    try {
        db.settings({
            timestampsInSnapshots: true
        })
    } catch (err) {
        if (!/settings can no longer be changed/.test(err.message)) {
            console.error('Firebase settings error', err.stack)
        }
    }
    return db
}

export const db = init()