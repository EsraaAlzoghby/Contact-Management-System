let inputName = document.getElementById("name");
let inputPhone = document.getElementById("phone");
let inputEmail = document.getElementById("email");
let buttonAdd = document.getElementById("buttonAdd");
let buttonUpdate = document.getElementById("buttonUpdate");
let nameError = document.getElementById("nameError");
let PhoneError = document.getElementById("PhoneError");
let emailError = document.getElementById("emailError");
let search = document.getElementById("search");
let mainIndex = "";
let contactArray = [];
if (localStorage.getItem("contactSaveArray") !== null) {
    contactArray = JSON.parse(localStorage.getItem("contactSaveArray"));
    displayContact();
}

buttonAdd.addEventListener("click", function () {
    if (isNameValid && isPhoneValid && isEmailValid) {
        addContact();
    } else {
        Swal.fire({
            icon: "error",
            title: "Please fill all fields correctly before adding.",
        });
    }
});

function addContact() {
    if (!checkContact()) {
        let contactInformation = {
            inputName: inputName.value.trim(),
            inputPhone: inputPhone.value.trim(),
            inputEmail: inputEmail.value.trim(),
        };

        contactArray.push(contactInformation);
        localStorage.setItem("contactSaveArray", JSON.stringify(contactArray));
        displayContact();
        clearContact();
    } else {
        Swal.fire({
            icon: "error",
            title: "Email or Phone already exists.",
        });
    }
}
function clearContact() {
    inputName.value = "";
    inputPhone.value = "";
    inputEmail.value = "";
    inputName.classList.remove("is-valid");
    inputPhone.classList.remove("is-valid");
    inputEmail.classList.remove("is-valid");
    buttonUpdate.classList.add("d-none");
    buttonAdd.classList.remove("d-none");
}
function checkContact() {
    return contactArray.some(
        (contact) =>
            contact.inputPhone === inputPhone.value.trim() ||
            contact.inputEmail === inputEmail.value.trim()
    );
}
function displayContact() {
    let contactBox = "";
    contactArray.forEach((contact, index) => {
        contactBox += `
            <tr>
                <td>${contact.inputName}</td>
                <td>${contact.inputPhone}</td>
                <td>${contact.inputEmail}</td>
                <td class="actionButton">
                    <button type="button" class="btn btn-dark px-3" onclick="editContact(${index})">Edit</button>
                    <button type="button" class="btn btn-primary w-50" onclick="deleteContact(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
    document.getElementById("bodyTable").innerHTML = contactBox;
}
function editContact(index) {
    mainIndex = index;
    let contact = contactArray[index];
    inputName.value = contact.inputName;
    inputPhone.value = contact.inputPhone;
    inputEmail.value = contact.inputEmail;
    buttonAdd.classList.add("d-none");
    buttonUpdate.classList.remove("d-none");
}
buttonUpdate.addEventListener("click", function () {
    if (isNameValid && isPhoneValid && isEmailValid) {
        if (!checkContact()) {
            let contactInformation = {
                inputName: inputName.value.trim(),
                inputPhone: inputPhone.value.trim(),
                inputEmail: inputEmail.value.trim(),
            };

            contactArray.splice(mainIndex, 1, contactInformation);
            localStorage.setItem("contactSaveArray", JSON.stringify(contactArray));
            displayContact();
            clearContact();
        } else {
            Swal.fire({
                icon: "error",
                title: "Email or Phone already exists.",
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Please fill all fields correctly before updating.",
        });
    }
});

function deleteContact(index) {
    contactArray.splice(index, 1);
    localStorage.setItem("contactSaveArray", JSON.stringify(contactArray));
    displayContact();
}
let isNameValid = false;
let isPhoneValid = false;
let isEmailValid = false;

inputName.addEventListener("input", function () {
    validationName();
    validationAll();
});
function validationName() {
    let nameRegex = /^[a-z0-9_-]{3,15}$/;
    let isValid = nameRegex.test(inputName.value);
    inputName.classList.toggle("is-valid", isValid);
    inputName.classList.toggle("is-invalid", !isValid);
    nameError.classList.toggle("d-none", isValid);
    nameError.classList.toggle("d-block", !isValid);
    isNameValid = isValid;
}
inputPhone.addEventListener("input", function () {
    validationPhone();
    validationAll();
});
function validationPhone() {
    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let isValid = phoneRegex.test(inputPhone.value);
    inputPhone.classList.toggle("is-valid", isValid);
    inputPhone.classList.toggle("is-invalid", !isValid);
    PhoneError.classList.toggle("d-none", isValid);
    PhoneError.classList.toggle("d-block", !isValid);
    isPhoneValid = isValid;
}
inputEmail.addEventListener("input", function () {
    validationEmail();
    validationAll();
});
function validationEmail() {
    let emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    let isValid = emailRegex.test(inputEmail.value);
    inputEmail.classList.toggle("is-valid", isValid);
    inputEmail.classList.toggle("is-invalid", !isValid);
    emailError.classList.toggle("d-none", isValid);
    emailError.classList.toggle("d-block", !isValid);
    isEmailValid = isValid;
}
function validationAll() {
    if (isNameValid && isPhoneValid && isEmailValid) {
        buttonAdd.classList.remove("disabled");
    } else {
        buttonAdd.classList.add("disabled");
    }
}
search.addEventListener("input", function () {
    let textSearch = search.value.toLowerCase();
    let filteredContacts = contactArray.filter((contact) =>
        contact.inputName.toLowerCase().includes(textSearch)
    );
    let contactBox = "";
    filteredContacts.forEach((contact) => {
        contactBox += `
            <tr>
                <td>${contact.inputName}</td>
                <td>${contact.inputPhone}</td>
                <td>${contact.inputEmail}</td>
                <td class="actionButton">
                    <button type="button" class="btn btn-dark px-3" onclick="editContact(${contactArray.indexOf(contact)})">Edit</button>
                    <button type="button" class="btn btn-primary w-50" onclick="deleteContact(${contactArray.indexOf(contact)})">Delete</button>
                </td>
            </tr>
        `;
    });
    document.getElementById("bodyTable").innerHTML = contactBox;
});
