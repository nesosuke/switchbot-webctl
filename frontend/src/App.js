import "./App.css";

import AirConditioner from "./modules/controller";

const localServerDomain = "http://localhost:8000";

async function fetchDeviceList() {
  let url = localServerDomain + "/devices";
  let data = await fetch(url).then((response) => response.json());
  console.log(data); // for debugging
  return data;
}

async function getDeviceList() {
  const response = await fetchDeviceList();

  // make device list table
  let table =
    "<table><tr><th>Device ID</th><th>Device Name</th><th>Device Type</th><th>Hub Device ID</th></tr>";
  for (let i = 0; i < response.deviceList.length; i++) {
    table += `<tr><td>${response.deviceList[i].deviceId}</td><td>${response.deviceList[i].deviceName}</td><td>${response.deviceList[i].deviceType}</td><td>${response.deviceList[i].hubDeviceId}</td></tr>`;
  }
  for (let i = 0; i < response.infraredRemoteList.length; i++) {
    table += `<tr><td>${response.infraredRemoteList[i].deviceId}</td><td>${response.infraredRemoteList[i].deviceName}</td><td>${response.infraredRemoteList[i].remoteType}</td><td>${response.infraredRemoteList[i].hubDeviceId}</td></tr>`;
  }
  table += "</table>";

  // insertt table into HTML element
  document.getElementById("deviceListTable").innerHTML = table;
}

function makeRemoteController(deviceType) {
  if (deviceType === "Air Conditioner") {
    return <AirConditioner />;
  }
}

function App() {
  return (
    <>
      <div>
        <h1>Get Device List</h1>
        {/* <input type="text" id="apiToken" placeholder="Enter API token" /> */}
        <input type="button" value="Get Device List" onClick={getDeviceList} />
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

export default App;
