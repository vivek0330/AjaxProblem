let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeAjaxCall(methodType, url, callback, async = true, data) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    console.log(
      "State Changed Called. ready State: " +
        xhr.readyState +
        " Status: " +
        xhr.status
    );
    if (xhr.readyState === 4) {
      //response 200 series menans success
      if (xhr.status === 200 || xhr.status === 201) {
        callback(xhr.responseText);
      } else if (xhr.status >= 400) {
        console.log("Handle 400 client Error or 500 Server Error");
      }
    }
  };
  xhr.open(methodType, url, async);
  if (data) {
    console.log(JSON.stringify(data));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  } else {
    xhr.send();
  }
  console.log(methodType + " request sent to the server");
}

//fetch data from server
const getURL = "http://127.0.0.1:3000/employees/";
function getUserDetails(data) {
  console.log("Get User Data: " + data);
}
makeAjaxCall("GET", getURL, getUserDetails);

//delete data from server
const deleteURL = "http://127.0.0.1:3000/employees/4";
function deleteUserDetails(data) {
  console.log("User Deleted: " + data);
}
makeAjaxCall("DELETE", deleteURL, deleteUserDetails, false);

//Add a new object
const postUrl = "http://127.0.0.1:3000/employees";
const empData = { name: "Harry", salary: "5000" };
function userAdd(data) {
  console.log("User Added: " + data);
}
makeAjaxCall("POST", postUrl, userAdd, true, empData);
