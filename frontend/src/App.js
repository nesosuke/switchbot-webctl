import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>Get Device List</h1>
        {/* <input type="text" id="apiToken" placeholder="Enter API token" /> */}
        <input
          type="button"
          value="Get Device List"
          onClick={insertDOMDeviceList}
        />
      </div>
      <div>
        <h2>Device List</h2>
        <p id="deviceList"></p>

        <h2>Remote Control</h2>
        <p id="remoteControl"></p>
      </div>
    </>
  );
}

const localServerDomain = "http://localhost:8000";

async function fetchDeviceList() {
  let url = localServerDomain + "/devices";
  let data = await fetch(url).then((response) => response.json());
  console.log(data);
  return data;
}

// create device list table from data
async function insertDOMDeviceList(data) {
  let deviceList = await fetchDeviceList();

  // iterate through the device list and create a table
  // devicelist = { "deviceList": [
  //  { "deviceId": "0",
  //    "deviceName": "device0",
  //    "deviceType": "Hub",
  //    "hubDeviceId": "0000000"},
  //  { "deviceId": "1",
  //    "deviceName": "device1",
  //    "deviceType": "switch",
  //    "hubDeviceId": "0"}
  //  ]}

  // create table header
  let table = document.createElement("table");
  let tableHeader = document.createElement("thead");
  let tableHeaderRow = document.createElement("tr");
  let tableHeaderRowCell = document.createElement("th");
  tableHeaderRowCell.innerHTML = "Device Id";
  tableHeaderRow.appendChild(tableHeaderRowCell);
  tableHeaderRowCell = document.createElement("th");
  tableHeaderRowCell.innerHTML = "Device Name";
  tableHeaderRow.appendChild(tableHeaderRowCell);
  tableHeaderRowCell = document.createElement("th");
  tableHeaderRowCell.innerHTML = "Device Type";
  tableHeaderRow.appendChild(tableHeaderRowCell);
  tableHeaderRowCell = document.createElement("th");
  tableHeaderRowCell.innerHTML = "Hub Device Id";
  tableHeaderRow.appendChild(tableHeaderRowCell);
  tableHeader.appendChild(tableHeaderRow);
  table.appendChild(tableHeader);
  // create table body
  let tableBody = document.createElement("tbody");
  for (let i = 0; i < deviceList.deviceList.length; i++) {
    let tableBodyRow = document.createElement("tr");
    let tableBodyRowCell = document.createElement("td");
    tableBodyRowCell.innerHTML = deviceList.deviceList[i].deviceId;
    tableBodyRow.appendChild(tableBodyRowCell);
    tableBodyRowCell = document.createElement("td");
    tableBodyRowCell.innerHTML = deviceList.deviceList[i].deviceName;
    tableBodyRow.appendChild(tableBodyRowCell);
    tableBodyRowCell = document.createElement("td");
    tableBodyRowCell.innerHTML = deviceList.deviceList[i].deviceType;
    tableBodyRow.appendChild(tableBodyRowCell);
    tableBodyRowCell = document.createElement("td");
    tableBodyRowCell.innerHTML = deviceList.deviceList[i].hubDeviceId;
    tableBodyRow.appendChild(tableBodyRowCell);
    tableBody.appendChild(tableBodyRow);
  }

  table.appendChild(tableBody);
  document.getElementById("deviceList").appendChild(table);
}

export default App;
