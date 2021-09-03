let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, async = true, data) {
  return new Promise(function (resolve, reject) {
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
          resolve(xhr.responseText);
        } else if (xhr.status >= 400) {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
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
  });
}

//fetch data from server
const getURL = "http://127.0.0.1:3000/employees/";
makePromiseCall("GET", getURL, true)
  .then((responseText) => console.log("Get User Data " + responseText))
  .catch((error) => console.log("Get User Data " + JSON.stringify(error)));

//delete data from server
const deleteURL = "http://127.0.0.1:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
  .then((responseText) => console.log("User Deleted: " + responseText))
  .catch((error) =>
    console.log("Delete Error Status: " + JSON.stringify(error))
  );

//Add a new object
const postUrl = "http://127.0.0.1:3000/employees";
const empData = { name: "Harry", salary: "5000" };
makePromiseCall("POST", postUrl, true, empData)
  .then((responseText) => console.log("User Added: " + responseText))
  .catch((error) => console.log("POST Error Status: " + JSON.stringify(error)));
