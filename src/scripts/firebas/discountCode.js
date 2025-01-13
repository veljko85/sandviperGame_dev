import { ref, get, set } from "firebase/database";
import { database, auth } from "../../config/firebase";

import { code } from "../code";

// import { getFirestore, doc, getDoc } from "firebase/firestore";
const dbRef = ref(database, 'discount_code');

export function getDiscountCode(object, page) {

    get(dbRef).then((snapshot) => {
        // console.log(snapshot)
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            if (page == "game") {
                object.discountCode = snapshot.val()
                code(object.discountCode)
            } else if (page == "admin") {
                // object.discountCode = snapshot.val()
                // console.log(object.discountCode)
                // discountCodeInput.value = object.discountCode
            }
        } else {
            // console.log("No data available");
        }
    }).catch((error) => {
        // console.error("Error getting data:", error);
    });

}

// export function setDiscountCode(object, page) {
//     // console.log('setDiscountCode')
//     set(dbRef, object.discountCode).then((snapshot) => {
//         // console.log("success")
//         errorSuccessDisplay.style.color = "#00ff00"
//         errorSuccessDisplayIcon.innerHTML = "&#xf058;"
//         errorSuccessDisplayText.innerHTML = "Success"
//         errorSuccessDisplay.style.visibility = "visible"
//         setTimeout(() => {
//             errorSuccessDisplay.style.visibility = "hidden"
//         }, 2000)

//     }).catch((error) => {
//         // console.error("Error setting data:", error);
//         errorSuccessDisplay.style.color = "#ff0000"
//         errorSuccessDisplayIcon.innerHTML = "&#xf057;"
//         errorSuccessDisplayText.innerHTML = "Error"
//         errorSuccessDisplay.style.visibility = "visible"
//         setTimeout(() => {
//             errorSuccessDisplay.style.visibility = "hidden"
//         }, 2000)
//     });
// }