// List of devices:
// Bot
// Plug
// Curtain
// Meter
// Motion Sensor
// Contact Sensor
// Color Bulb
// Humidifier
// Smart Fan
// Strip Light
// Plug Mini (US)
// Plug Mini (JP)
// Lock
// Meter Plus (JP)
// Meter Plus (US)

// List of Virtual infrared remote device:
// Air Conditioner
// TV
// Light
// IPTV/Streamer
// Set Top Box
// DVD
// Fan
// Projector
// Camera
// Air Purifier
// Speaker
// Water Heater
// Vacuum Cleaner
// Others

async function sendCommand(deviceId, command) {
  // http post request to 'localhost:8000/{deviceId}/command'
  // with command as body

  const localServerDomain = "http://localhost:8000";
  let url = localServerDomain + "/" + deviceId + "/command";
  let data = {
    command: command,
  };

  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

class AirConditioner {
  constructor(deviceId, temp, mode, fanSpeed, on_off) {
    this.deviceId = deviceId;
    this.temp = temp;
    this.mode = mode;
    this.fanSpeed = fanSpeed;
    this.on_off = on_off;
  }

  makeCommand(temp, mode, fanSpeed, on_off) {
    this.temp = temp;
    this.mode = mode;
    this.fanSpeed = fanSpeed;
    this.on_off = on_off;

    let command = `${temp},${mode},${fanSpeed},${on_off}`;
    return command;
  }

  turnOn() {
    let temp = this.temp;
    let mode = this.mode;
    let fan = this.fanSpeed;
    let on_off = "on";

    let response = sendCommand(
      this.deviceId,
      this.makeCommand(temp, mode, fan, on_off)
    );
    return response;
  }

  turnOnAuto() {
    let temp = 26;
    let mode = "auto";
    let fan = "auto";
    let on_off = "on";

    let response = sendCommand(
      this.deviceId,
      this.makeCommand(temp, mode, fan, on_off)
    );
    return response;
  }

  turnOff() {
    let temp = this.temp;
    let mode = this.mode;
    let fan = this.fanSpeed;
    let on_off = "off";

    let response = sendCommand(
      this.deviceId,
      this.makeCommand(temp, mode, fan, on_off)
    );
    return response;
  }

  setTemp(temp) {
    let mode = this.mode;
    let fan = this.fanSpeed;
    let on_off = this.on_off;

    let response = sendCommand(
      this.deviceId,
      this.makeCommand(temp, mode, fan, on_off)
    );
    return response;
  }

  setMode(mode) {
    let temp = this.temp;
    let fan = this.fanSpeed;
    let on_off = this.on_off;

    let response = sendCommand(
      this.deviceId,
      this.makeCommand(temp, mode, fan, on_off)
    );
    return response;
  }

  setFanSpeed(fanSpeed) {
    let temp = this.temp;
    let mode = this.mode;
    let on_off = this.on_off;

    let response = sendCommand(
      this.deviceId,
      this.makeCommand(temp, mode, fanSpeed, on_off)
    );
    return response;
  }
}
