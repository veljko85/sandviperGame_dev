import { ref, get, set } from "firebase/database";
import { database } from "../../config/firebase";


let setUsersObject = {
    users: []
}
// getUsers(setUsersObject)

export function getUsers(object) {
    const dbRef = ref(database, 'users');
    get(dbRef).then((snapshot) => {
        object.users = snapshot.val()
        // console.log(object.users)
    });
}

export function setUsers(user, gameObject) {
    const dbRef = ref(database, 'users');
    get(dbRef).then((snapshot) => {
        // console.log(snapshot.val())
        setUsersObject.users = snapshot.val()
        user.database_position = setUsersObject.users.length
        setUsersObject.users.push(user)
        set(dbRef, setUsersObject.users);
        gameObject.userLoggedInData = user;
        // console.log(gameObject.userLoggedInData)
    });
}

export function handleUserLogin(userEmail, gameObject) {
    const dbRef = ref(database, 'users');
    get(dbRef).then((snapshot) => {
        // console.log(snapshot.val())
        setUsersObject.users = snapshot.val()
        for (let i = 0; i < setUsersObject.users.length; i++) {
            // console.log(setUsersObject.users[i].user_email, userEmail)
            if (setUsersObject.users[i].user_email === userEmail) {
                gameObject.userLoggedInData = setUsersObject.users[i];
            }
        }
        // console.log(gameObject.userLoggedInData)
    });
}

export const checkUserExists = async (uid) => {
    const dbRef = ref(database, `users`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        const users = snapshot.val();
        return users.some(user => user.user_uid === uid);
    }
    return false;
}
