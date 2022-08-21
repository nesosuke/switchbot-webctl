import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <>
      <div>
        <h1>Get Device List</h1>
        <input type="text" id="apiToken" placeholder="Enter API token" />
        <input type="button" value="Get Device List" onClick={showDeviceList} />
      </div>
      <div>
        <h2>Device List</h2>
        <p id="deviceList"></p>
        <p id="header"></p>
      </div>
    </>
  );
}

const switchBotApiDomain = "https://api.switch-bot.com/v1.0";

// function: get the api token inputted in the text form
function getApiToken() {
  const apiToken = document.getElementById("apiToken").value;
  if (apiToken === "") {
    alert("Error: Input your API token.");
    return "Error";
  } else {
    return apiToken;
  }
}

// function: fetch the device list from switch bot Api with apiToken
function showDeviceList(apiToken) {
  let data = fetchDeviceList(apiToken);
  document.getElementById("deviceList").innerHTML = JSON.stringify(data);
}

function fetchDeviceList(apiToken) {
  let url = switchBotApiDomain + "/devices";
  if (getApiToken() !== "Error") {
    const header = {
      Authorization: getApiToken(),
      "Content-Type": "application/json; charset=utf8",
    };
    fetch(url, { headers: header })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}

export default App;
