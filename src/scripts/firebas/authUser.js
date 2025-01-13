import { auth } from "../../config/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { setUsers, handleUserLogin, checkUserExists } from "./users"

export function authUser(gameObject) {

    // Set persistence to local => so the user will stay logged in even if the page is refreshed
    // setTimeout(() => {
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            if (auth?.currentUser?.email != undefined) {
                if (auth?.currentUser?.displayName != null) {
                    userDisplay.innerHTML = `Welcome <br>${auth?.currentUser?.displayName}`
                } else {
                    userDisplay.innerHTML = `Welcome <br>${auth?.currentUser?.email}`
                }
                handleUserLogin(auth?.currentUser?.email, gameObject)
                startGameFromLoadingContainer.style.display = "flex";
            } else {
                authErrorDisplay.style.visibility = "hidden"
                authSection.style.display = "flex"
                // Call this function when the page loads
                if (window.location.href.includes('?')) {
                    completeSignInWithEmailLink();
                }
            }
        })
        .catch((error) => {
            // console.error("Error setting persistence:", error)
        })
    // }, 5000);

    //LOG OUT
    const logOut = async (isInGame) => {
        try {
            await signOut(auth)
            if (!isInGame) {
                authSection.style.display = "flex"
                gameObject.userLoggedInData = null
                startGameFromLoadingContainer.style.display = "none";
                authErrorDisplay.style.visibility = "hidden"
                authEmail.value = ""
                authPassword.value = ""
            }
            if (isInGame) {
                if (window.location.href.includes('?')) {
                    window.location.href = window.location.href.split('?')[0];
                } else {
                    location.reload();
                }
            }
        } catch (err) {
            // console.error(err)
        }
    }

    authLogOut.onclick = () => logOut(false)

    // logoutDisplay.onclick = () => {
    //     logOut(true)
    // }

    // Google Sign-In
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            // console.log("Google sign-in result:", result);
            authSection.style.display = "none"

            const userExists = await checkUserExists(user.uid);

            if (!userExists) {
                // console.log("New user created with Google:", user.email);
                await setUsers({
                    user_email: user.email,
                    user_uid: user.uid,
                    user_get_discount_code: "No code",
                    user_sign_in_method: "google",
                    // user_attempts_left: 3,
                    user_name: user.displayName
                }, gameObject);
            } else {
                // console.log("Existing user signed in with Google:", user.email);
            }
            // console.log(user.displayName)
            userDisplay.innerHTML = `Welcome <br>${user.displayName}`
            handleUserLogin(user.email, gameObject);
            startGameFromLoadingContainer.style.display = "flex";
            authErrorDisplay.style.visibility = "hidden";
        } catch (error) {
            // console.error("Error signing in with Google:", error);
            authErrorDisplayText.innerHTML = "Error signing in with Google";
            authErrorDisplay.style.visibility = "visible";
        }
    }

    authGoogleSignIn.onclick = () => signInWithGoogle();

    // Email Link Authentication
    const sendSignInLink = async (email) => {
        const actionCodeSettings = {
            url: window.location.href,
            handleCodeInApp: true
        };

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            authSuccessDisplayText.innerHTML = "Sign-in link sent to your email!";
            authSuccessDisplay.style.visibility = "visible";
            authErrorDisplay.style.visibility = "hidden";

        } catch (error) {
            // console.error("Error sending sign-in link to email:", error);
            authErrorDisplayText.innerHTML = "Error sending sign-in link";
            authErrorDisplay.style.visibility = "visible";
        }
    };

    const completeSignInWithEmailLink = async () => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            // console.log(email)
            // if (!email) {
            //     email = window.prompt('Please provide your email for confirmation');
            // }

            try {
                authSection.style.display = "none"
                const result = await signInWithEmailLink(auth, email, window.location.href);
                const user = result.user;

                const userExists = await checkUserExists(user.uid);

                if (!userExists) {
                    await setUsers({
                        user_email: user.email,
                        user_uid: user.uid,
                        user_get_discount_code: "No code",
                        user_sign_in_method: "email_link",
                        // user_attempts_left: 3,
                    }, gameObject);
                }

                userDisplay.innerHTML = `Welcome <br>${user.email}`
                handleUserLogin(user.email, gameObject);
                startGameFromLoadingContainer.style.display = "flex";
                authErrorDisplay.style.visibility = "hidden";

                window.localStorage.removeItem('emailForSignIn');
            } catch (error) {
                // console.error("Error signing in with email link:", error);
                authErrorDisplayText.innerHTML = "Error signing in with email link";
                authErrorDisplay.style.visibility = "visible";
                // authSection.style.display = "flex"
            }
        }
    };




    // Assuming you have a button for email link sign-in
    authEmailLinkSignIn.onclick = () => sendSignInLink(authEmail.value);

}




// //CREATE ACOUNT
// const createAcount = async (gameObject) => {
//     try {
//         await createUserWithEmailAndPassword(auth, authEmail.value, authPassword.value)
//         // console.log("User created")
//         // console.log(auth?.currentUser?.email)
//         userDisplay.innerHTML = `Welcome <br>${auth?.currentUser?.displayName}`

//         setUsers({
//             user_email: auth?.currentUser?.email,
//             user_password: authPassword.value,
//             user_uid: auth?.currentUser?.uid,
//             user_attempts_left: 3,
//             user_get_discount_code: "No code",
//             user_sign_in_method: "email",
//             user_name: auth?.currentUser?.displayName
//         }, gameObject)

//         startGameFromLoadingContainer.style.display = "flex";
//         authErrorDisplay.style.visibility = "hidden"
//     } catch (err) {
//         // console.error(err)
//         authErrorDisplayText.innerHTML = "Email is already in use"
//         authErrorDisplay.style.visibility = "visible"
//     }
// }
// authCreateAcount.onclick = () => createAcount()

// //LOG IN
// const logIn = async (gameObject) => {
//     try {
//         await signInWithEmailAndPassword(auth, authEmail.value, authPassword.value)
//         // console.log("User logged in")
//         // console.log(auth?.currentUser?.email)
//         userDisplay.innerHTML = `Welcome <br>${auth?.currentUser?.displayName}`
//         gameObject.userLoggedInData = { user_email: auth?.currentUser?.email, user_password: authPassword.value, user_uid: auth?.currentUser?.uid, user_get_discount_code: false }
//         // handleUserLogin(auth?.currentUser?.email, gameObject)
//         startGameFromLoadingContainer.style.display = "flex";
//         authErrorDisplay.style.visibility = "hidden"

//         authSection.style.display = "none"
//     } catch (err) {
//         authErrorDisplayText.innerHTML = "Wrong email or password"
//         authErrorDisplay.style.visibility = "visible"
//     }
// }
// authLogIn.onclick = () => logIn()