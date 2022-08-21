import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>Get Device List</h1>
        {/* <input type="text" id="apiToken" placeholder="Enter API token" /> */}
        <input type="button" value="Get Device List" onClick={showDeviceList} />
      </div>
      <div>
        <h2>Device List</h2>
        <p id="deviceListTable"></p>

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
async function showDeviceList() {
  let response = await fetchDeviceList();

  // initialize device list table, delete existing table if exists
  document.getElementById("deviceListTable").innerHTML = "";

  let deviceListTable = document.createElement("table");

  // create table header
  let header = document.createElement("tr");
  let headerDeviceId = document.createElement("th");
  headerDeviceId.innerHTML = "Device ID";
  header.appendChild(headerDeviceId);
  let headerDeviceName = document.createElement("th");
  headerDeviceName.innerHTML = "Device Name";
  header.appendChild(headerDeviceName);
  let headerDeviceType = document.createElement("th");
  headerDeviceType.innerHTML = "Device Type";
  header.appendChild(headerDeviceType);
  let headerHubDeviceId = document.createElement("th");
  headerHubDeviceId.innerHTML = "Hub Device ID";
  header.appendChild(headerHubDeviceId);

  deviceListTable.appendChild(header);

  for (let i = 0; i < response.deviceList.length; i++) {
    let row = document.createElement("tr");
    let deviceId = document.createElement("td");
    deviceId.innerHTML = response.deviceList[i].deviceId;
    row.appendChild(deviceId);
    let deviceName = document.createElement("td");
    deviceName.innerHTML = response.deviceList[i].deviceName;
    row.appendChild(deviceName);
    let deviceType = document.createElement("td");
    deviceType.innerHTML = response.deviceList[i].deviceType;
    row.appendChild(deviceType);
    let hubDeviceId = document.createElement("td");
    hubDeviceId.innerHTML = response.deviceList[i].hubDeviceId;
    row.appendChild(hubDeviceId);
    deviceListTable.appendChild(row);
  }
  // append virtual remote device
  for (let i = 0; i < response.infraredRemoteList.length; i++) {
    let row = document.createElement("tr");
    let deviceId = document.createElement("td");
    deviceId.innerHTML = response.infraredRemoteList[i].deviceId;
    row.appendChild(deviceId);
    let deviceName = document.createElement("td");
    deviceName.innerHTML = response.infraredRemoteList[i].deviceName;
    row.appendChild(deviceName);
    let remoteType = document.createElement("td");
    remoteType.innerHTML = response.infraredRemoteList[i].remoteType;
    row.appendChild(remoteType);
    let hubDeviceId = document.createElement("td");
    hubDeviceId.innerHTML = response.infraredRemoteList[i].hubDeviceId;
    row.appendChild(hubDeviceId);
    deviceListTable.appendChild(row);
  }

  // append device list table to the page
  document.getElementById("deviceListTable").appendChild(deviceListTable);
}

export default App;
