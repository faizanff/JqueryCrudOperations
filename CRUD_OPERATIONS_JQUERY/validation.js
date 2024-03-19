

function validateData(firstName, lastName, contactNo, emailAddress) {
    if (firstName === '') {
        alert("Please enter a first name.");
        return false;
    }

    if (!/^[a-zA-Z]+$/.test(firstName)) {
        alert("First name should contain only letters.");
        return false;
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
        alert("Last name should contain only letters.");
        return false;
    }

    if (contactNo !== '' && (isNaN(contactNo) || contactNo.length !== 11)) {
        alert("Please enter a valid 11-digit contact number.");
        return false;
    }
    if (contactNo !== '' && !/^\d+$/.test(contactNo)) {
        alert("Contact number should contain only numbers.");
        return false;
    }
    
    if (emailAddress === '') {
        alert("Please enter an email address.");
        return false;
    }

    let localData = localStorage.getItem('localData');
    if (localData) {
        let localArray = JSON.parse(localData);
        const existingEmail = localArray.find(item => item.emailAddress === emailAddress);
        if (existingEmail) {
            alert("An entry with this email address already exists.");
            return false;
        }

        const existingFirstName = localArray.find(item => item.firstName === firstName);
        if (existingFirstName) {
            alert("An entry with this First Name already exists.");
            return false;
        }
    }

    return true;
}

export { validateData };
