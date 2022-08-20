from flask import render_template, Flask
import sys
import json
import os
import requests

app = Flask(__name__)

REFERENCE_URL = '''
GitHub: https://github.com/OpenWonderLabs/SwitchBotAPI/blob/549798907aeff0504135a3f087affc63657d0207/README.md
'''

API_URL = "https://api.switch-bot.com/v1.0"

physical_device_list = [
    'Hub',
    'Hub Plus',
    'Hub Mini',
    'Bot', 'Curtain',
    'Plug',
    'Meter',
    'Motion Sensor',
    'Contact Sensor',
    'Color Bulb',
    'Humidifier',
    'Smart Fan',
    'Strip Light',
    'Plug Mini (US)',
    'Plug Mini (JP)',
    'Lock',
    'Meter Plus (JP)',
    'Meter Plus (US)',
]


def create_token_file():
    '''
    create config.txt if not exists
    '''
    if not os.path.exists("./token.txt"):
        with open("./token.txt", "w", encoding="utf-8") as out_f:
            out_f.write("")
    else:
        pass


def store_token(token):
    '''
    store token into config.txt
    '''
    with open("./token.txt", "w", encoding="utf-8") as out_f:
        out_f.write(token)


def get_token():
    '''
    get token from config.txt
    '''
    with open("./token.txt", "r", encoding="utf-8") as in_f:
        token = in_f.read()
        token = str(token).strip()
    return token


def get_device_list() -> json:
    '''
    get device list from api
    '''
    url = f'{API_URL}/devices'

    response = requests.get(url, headers=HEADERS)
    return response.json()


def get_device_status(device_id: str) -> json:
    '''
    get the status of a physical device from api.
    '''
    device_id = str(device_id)
    url = f'{API_URL}/devices/{device_id}/status'

    response = requests.get(url, headers=HEADERS)
    return response.json()


OPEN_TOKEN = get_token()
HEADERS = {
    'Authorization': OPEN_TOKEN,
    'Content-Type': 'application/json; charset=utf-8'
}


@app.route('/')
def index():
    return render_template('index.html')


# debug
DEVICE_ID_DEBUG = 'C8AEB72F341A'
if __name__ == "__main__":
    result = get_device_status(DEVICE_ID_DEBUG)
    print(result)
    sys.exit(0)
