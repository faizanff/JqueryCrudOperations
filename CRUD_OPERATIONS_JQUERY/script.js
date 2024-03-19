import { validateData } from './validation';
var emptyRow = "<tr><td colspan='6' class='text-center'> No Records Available</td></tr>";

$(document).ready(function () {
    loadDataFromLocal();
    $('#tblData').on('click', '.btn-edit', function () {
      debugger;
      const firstName = $(this).parent().parent().find(".txtName").html();
      const lastName = $(this).parent().parent().find(".lastName").html();
      const contactNo = $(this).parent().parent().find(".txtContactNo").html();
      const emailAddress = $(this).parent().parent().find(".txtAddress").html();
      const id = $(this).parent().parent().find(".txtName").attr("data-id");
      $("#txtName").val(firstName);
      $("#lastName").val(lastName);
      $("#txtContactNo").val(contactNo);
      $("#txtAddress").val(emailAddress);
      $("#txtId").val(id);
      $("#btnSave").text("Update");
    });

    $('#tblData').on('click', '.btn-delete', function () {
      debugger;
      const id = $(this).parent().parent().find(".txtName").attr("data-id");
      deleteDataFromLocal(id);
    });

    $("#btnSave").click(function () {
      debugger;
      if ($("#txtId").val() == '') {
        addDataToLocal();
      } else {
        updateDataFromLocal();
      }
    });

    $("#btnClear").click(function () {
      debugger;
      clearForm();
    });
  });


  // clear Button Logic 
  function clearForm() {
    debugger;
    $("#txtName").val("");
    $("#lastName").val("");
    $("#txtContactNo").val("");
    $("#txtAddress").val("");
    $("#btnSave").text("Add");
  }


  // No Records Available Logic
  function addEmptyRow() {
    debugger;
    if ($("#tblData tbody").children().children().length == 0) {
      $("#tblData tbody").append(emptyRow);
    }
  }


  // Load Data From Input fields and save them in No Records Availble Column Logic
  function loadDataFromLocal() {
    debugger;
    let localData = localStorage.getItem('localData');
    if (localData) {
      $("#tblData tbody").html("");
      let localArray = JSON.parse(localData);
      let index = 1;
      localArray.forEach(element => {
        let dynamicTR = "<tr>";
        dynamicTR = dynamicTR + "<td> " + index + "</td>";
        dynamicTR = dynamicTR + "<td class='txtName'  data-id=" + element.id + ">" + element.firstName + "</td>";
        dynamicTR = dynamicTR + "<td class='lastName'>" + element.lastName + "</td>";
        dynamicTR = dynamicTR + "<td class='txtContactNo'>" + element.contactNo + "</td>";
        dynamicTR = dynamicTR + "<td class='txtAddress'>" + element.emailAddress + "</td>";
        dynamicTR = dynamicTR + "    <td class='tdAction text-center'>";
        dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-success btn-edit'> Edit</button>";
        dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-danger btn-delete'> Delete</button>";
        dynamicTR = dynamicTR + "    </td>";
        dynamicTR = dynamicTR + " </tr>";
        $("#tblData tbody").append(dynamicTR);
        index++;
      });
    }
    addEmptyRow();
    
  }


// Add Button Logic
function addDataToLocal() {
debugger;
const firstName = $("#txtName").val().trim();
const lastName = $("#lastName").val().trim();
const contactNo = $("#txtContactNo").val().trim();
const emailAddress = $("#txtAddress").val().trim();

// Validate First Name
// if (firstName === '') {
//   alert("Please enter a first name.");
//   return;
// }

// // Validate Last Name
// if (lastName === '') {
//   alert("Please enter a last name.");
//   return;
// }

// // Validate Contact No
// if (contactNo !== '' && (isNaN(contactNo) || contactNo.length !== 11)) {
//   alert("Please enter a valid 11-digit contact number.");
//   return;
// }

// // Validate Email Address
// if (emailAddress === '') {
//   alert("Please enter an email address.");
//   return;
// }

// // Check for duplicate email address
// let localData = localStorage.getItem('localData');
// if (localData) {
//   let localArray = JSON.parse(localData);
//   const existingEmail = localArray.find(item => item.emailAddress === emailAddress);
//   if (existingEmail) {
//     alert("An entry with this email address already exists.");
//     return;
//   }
// }
// if (localData) {
//   let localArray = JSON.parse(localData);
//   const existingFirstName = localArray.find(item => item.firstName === firstName);
//   if (existingFirstName) {
//     alert("An entry with this First Name already exists.");
//     return;
//   }
// }

if (!validateData(firstName, lastName, contactNo, emailAddress)) {
  alert("Validation failed");
  return;
}

// Add the data to local storage
let localArray = JSON.parse(localData) || [];
const obj = {
  id: localArray.length + 1,
  firstName: firstName,
  lastName: lastName,
  contactNo: contactNo,
  emailAddress: emailAddress
};
localArray.push(obj);
localStorage.setItem('localData', JSON.stringify(localArray));
loadDataFromLocal();
clearForm();
window.location.href = "records.html";
}

  // Update Button Logic
  function updateDataFromLocal() {
    debugger;
    let localData = localStorage.getItem('localData');
    let localArray = JSON.parse(localData);
    const oldRecord = localArray.find(m => m.id == $("#txtId").val());
    oldRecord.firstName = $("#txtName").val();
    oldRecord.lastName = $("#lastName").val();
    oldRecord.contactNo = $("#txtContactNo").val();
    oldRecord.emailAddress = $("#txtAddress").val();
    localStorage.setItem('localData', JSON.stringify(localArray));
    loadDataFromLocal();
    clearForm();
  }
  
  // Delete Button Logic
  function deleteDataFromLocal(id) {
    debugger;
    let localData = localStorage.getItem('localData');
    let localArray = JSON.parse(localData);
    let i = 0;
    while (i < localArray.length) {
      if (localArray[i].id === Number(id)) {
        localArray.splice(i, 1);
      } else {
        ++i;
      }
    }
    localStorage.setItem('localData', JSON.stringify(localArray));
    loadDataFromLocal();
  }