import json
import os
import requests

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


def get_device_list(token: str) -> json:
    '''
    get device list from api
    '''
    suffix = '/v1.0/devices'
    url = API_URL + suffix

    headers = {
        'Authorization': token,
        'Content-Type': 'application/json; charset=utf-8'
    }

    response = requests.get(url, headers=headers)
    return response.json()


# debug
if __name__ == "__main__":
    token = get_token()
    print(get_device_list(token))
