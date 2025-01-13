import { ref, get, set } from "firebase/database";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

import { auth, database } from "./config/firebase";
// import { setDiscountCode } from './scripts/firebas/discountCode'
import { getUsers } from './scripts/firebas/users'



let fireBaseData = {
    discountCode: [],
    adminUid: null,
    users: [],
    emailsForCsv: []
}



//get admin data from firebase
function getAdminData() {
    get(ref(database, "admin_data/uid")).then((snapshot) => {
        if (snapshot.exists()) {
            fireBaseData.adminUid = snapshot.val()
        } else {
            // console.log("No data available");
        }
    }).catch((error) => {
        // console.error("Error getting data:", error);
    });
}
//get admin data from firebase
getAdminData()

//login function
const logIn = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        checkAdmin()
        userLoggedIn = true
    } catch (err) {
        // console.error(err)
        authErrorDisplay.style.visibility = "visible"
    }
}
let userLoggedIn = false
//login button event listener
loginButton.onclick = () => logIn()

document.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' && userLoggedIn === false) {
        logIn()
    }
})

//logout function
const logOut = async () => {
    try {
        await signOut(auth)
        // console.log("User logged out")
        onUserLogOut()
        userLoggedIn = false
    } catch (err) {
        // console.error(err)
    }
}
//logout button event listener
logoutButton.onclick = () => logOut()

adminLogOutButton.onclick = () => {
    logOut()
    adminLoginContainer.style.display = "flex"
    adminContainer.style.display = "none"
}

//check if user is admin
function checkAdmin() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.uid === fireBaseData.adminUid) {
                // console.log("User is an admin");
                //if admin is true, show discount code container
                ifAdminTrue()
            } else {
                // console.log("User is not an admin");
                authErrorDisplay.style.visibility = "visible"
            }
        }
    });
}

//if admin is true, show discount code container
function ifAdminTrue() {
    adminLoginContainer.style.display = "none"
    adminContainer.style.display = "flex"
    adminEmail.innerHTML = auth?.currentUser?.email
    getDiscountCode()
    displayUsers()

    saveDiscountCodeButton.addEventListener("click", () => {
        // fireBaseData.discountCode = discountCodeInput.value
        setDiscountCode()
    })
}

//get discount code from firebase and display it in the input
function getDiscountCode() {
    const dbRef = ref(database, 'discount_code');
    get(dbRef).then((snapshot) => {
        // console.log(snapshot.val())
        fireBaseData.discountCode = snapshot.val()
        // console.log(fireBaseData.discountCode)
        for (let i = 0; i < fireBaseData.discountCode.length; i++) {
            if (i === 0) {
                document.getElementsByClassName("neededScoreInput")[0].value = fireBaseData.discountCode[0].needed_score
                document.getElementsByClassName("discountCodeInput")[0].value = fireBaseData.discountCode[0].discount_code
            }
            if (i > 0) {
                createDiscountCodeContainer(fireBaseData.discountCode[i].needed_score, fireBaseData.discountCode[i].discount_code)
            }
        }
    })
}

function setDiscountCode() {
    let error = false
    // fireBaseData.discountCode[0].needed_score = document.getElementsByClassName("neededScoreInput")[0].value
    // fireBaseData.discountCode[0].discount_code = document.getElementsByClassName("discountCodeInput")[0].value
    let discountCodeSeperatedContainers = document.getElementsByClassName("discountCodeSeperatedContainer")
    fireBaseData.discountCode = []
    for (let i = 0; i < discountCodeSeperatedContainers.length; i++) {
        if (document.getElementsByClassName("neededScoreInput")[i].value !== "" && document.getElementsByClassName("discountCodeInput")[i].value !== "") {
            fireBaseData.discountCode.push({
                needed_score: document.getElementsByClassName("neededScoreInput")[i].value,
                discount_code: document.getElementsByClassName("discountCodeInput")[i].value
            })
        } else {
            error = true
            document.getElementsByClassName("errorSuccessDisplay")[i].style.color = "#ff0000";
            document.getElementsByClassName("errorSuccessDisplayIcon")[i].innerHTML = "&#xf057;";
            document.getElementsByClassName("errorSuccessDisplayText")[i].innerHTML = "Error";
            document.getElementsByClassName("errorSuccessDisplay")[i].style.visibility = "visible";
            setTimeout(() => {
                document.getElementsByClassName("errorSuccessDisplay")[i].style.visibility = "hidden"
            }, 2000)
        }
    }
    if (error === false) {
        const dbRef = ref(database, 'discount_code');
        // console.log(fireBaseData.discountCode)
        set(dbRef, fireBaseData.discountCode).then((snapshot) => {
            for (let i = 0; i < discountCodeSeperatedContainers.length; i++) {
                document.getElementsByClassName("errorSuccessDisplay")[i].style.color = "#00ff00"
                document.getElementsByClassName("errorSuccessDisplayIcon")[i].innerHTML = "&#xf058;"
                document.getElementsByClassName("errorSuccessDisplayText")[i].innerHTML = "Success"
                document.getElementsByClassName("errorSuccessDisplay")[i].style.visibility = "visible"
                setTimeout(() => {
                    document.getElementsByClassName("errorSuccessDisplay")[i].style.visibility = "hidden"
                }, 2000)
            }
        }).catch((error) => {
            for (let i = 0; i < discountCodeSeperatedContainers.length; i++) {
                document.getElementsByClassName("errorSuccessDisplay")[i].style.color = "#ff0000";
                document.getElementsByClassName("errorSuccessDisplayIcon")[i].innerHTML = "&#xf057;";
                document.getElementsByClassName("errorSuccessDisplayText")[i].innerHTML = "Error";
                document.getElementsByClassName("errorSuccessDisplay")[i].style.visibility = "visible";
                setTimeout(() => {
                    document.getElementsByClassName("errorSuccessDisplay")[i].style.visibility = "hidden"
                }, 2000)
            }
        });
    }
}

//on user log out, hide discount code container
function onUserLogOut() {
    email.value = ""
    password.value = ""
    authErrorDisplay.style.visibility = "hidden"
}


//DISCOUNT CODE////////////////////////////////////////////////////////////////////////////////////////
let discountCodeInputs = document.querySelectorAll(".discountCodeInput")
discountCodeInputs[0].style.marginRight = "50px"

function createDiscountCodeContainer(score, code) {
    const container = document.createElement('div');
    container.className = 'discountCodeSeperatedContainer';

    container.innerHTML = `
        <h3 class="discountCodeHeaderTitle">Discount code</h3>
        <div class="errorSuccessDisplay">
            <h5 class="errorSuccessDisplayIcon fa">&#xf057;</h5>
            <h5 class="errorSuccessDisplayText">Error</h5>
        </div>
        <input class="neededScoreInput" type="number" placeholder="Needed score" value="${score}">
        <input class="discountCodeInput" type="text" placeholder="Discount code" value="${code}">
        <div class="discountCodeDeleteContainer fa">&#xf00d;</div>
    `;

    const discountCodeSeperatedContainers = document.getElementById('discountCodeSeperatedContainers');
    discountCodeSeperatedContainers.appendChild(container);

    // Add event listener to delete button
    const deleteButton = container.querySelector('.discountCodeDeleteContainer');
    deleteButton.addEventListener('click', () => {
        container.remove();
    });
}

// Add event listener to the "Add Discount Code" button
document.getElementById('addDiscountCodeButton').addEventListener('click', () => createDiscountCodeContainer("", ""));

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//PAGINATION
let currentPage = 1;
const usersPerPage = 9; // You can adjust this number as needed

async function displayUsers() {
    const dbRef = ref(database, 'users');
    get(dbRef).then((snapshot) => {
        fireBaseData.users = snapshot.val();
        fireBaseData.emailsForCsv = [];

        for (let i = 1; i < fireBaseData.users.length; i++) {
            fireBaseData.emailsForCsv.push({ user_email: fireBaseData.users[i].user_email });
        }

        displayUsersPage(currentPage);
        setupPagination();
    });
}

function displayUsersPage(page) {
    let usersList = document.getElementById("usersList");
    usersList.innerHTML = ''; // Clear existing users

    let start = (page - 1) * usersPerPage + 1;
    let end = Math.min(start + usersPerPage - 1, fireBaseData.users.length - 1);

    for (let i = start; i <= end; i++) {

        let userContainer = document.createElement("div")
        userContainer.classList.add("user")
        usersList.appendChild(userContainer)

        if (i === fireBaseData.users.length - 1) {
            userContainer.style.marginBottom = "50px"
        }

        if (i % 2 === 0) {
            userContainer.style.backgroundColor = "#f5f5f5"
        }

        let userNumber = document.createElement("h3")
        userNumber.classList.add("userNumber")
        userNumber.innerHTML = i
        userContainer.appendChild(userNumber)

        let userEmail = document.createElement("h3")
        userEmail.classList.add("userEmail")
        userEmail.innerHTML = fireBaseData.users[i].user_email
        userContainer.appendChild(userEmail)

        let userDiscountCode = document.createElement("h3")
        userDiscountCode.classList.add("userDiscountCode")
        userDiscountCode.innerHTML = fireBaseData.users[i].user_get_discount_code
        userContainer.appendChild(userDiscountCode)

    }
}

function setupPagination() {
    const totalPages = Math.ceil((fireBaseData.users.length - 1) / usersPerPage);
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination';

    const prevButton = document.createElement('button');
    prevButton.classList.add("paginationButton")
    prevButton.textContent = 'Previous';
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayUsersPage(currentPage);
            updatePageInfo();
        }
    };

    const nextButton = document.createElement('button');
    nextButton.classList.add("paginationButton")
    nextButton.textContent = 'Next';
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayUsersPage(currentPage);
            updatePageInfo();
        }
    };

    const pageInfo = document.createElement('span');
    pageInfo.id = 'pageInfo';

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(pageInfo);
    paginationContainer.appendChild(nextButton);

    // document.getElementById('usersList').after(paginationContainer);
    document.getElementById('usersContainer').appendChild(paginationContainer)

    updatePageInfo();
}

function updatePageInfo() {
    const totalPages = Math.ceil((fireBaseData.users.length - 1) / usersPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}



//DOWNLOAD CSV////////////////////////////////////////////////////////////////////////////////////////
// Function to convert JSON to CSV
function convertToCSV(data) {
    const header = Object.keys(data[0]).join(','); // Get headers
    const rows = data.map(row => Object.values(row).join(',')); // Get values
    return [header, ...rows].join('\n'); // Combine header and rows
}

// Function to download CSV
function downloadCSV() {
    const csvData = convertToCSV(fireBaseData.emailsForCsv);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.setAttribute('download', 'data.csv'); // Specify file name
    document.body.appendChild(anchor);
    anchor.click(); // Trigger download
    document.body.removeChild(anchor); // Clean up
}

// Add event listener to button
downloadCsvBtn.onclick = () => downloadCSV()










