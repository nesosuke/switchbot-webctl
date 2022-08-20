import json
import os
import requests

API_URL = "https://api.switch-bot.com"


def create_token_file():
    '''
    create config.txt if not exists
    '''
    if not os.path.exists("./token.txt"):
        with open("./token.txt", "w", encoding="utf-8") as f:
            f.write("")
    else:
        pass


def store_token(token):
    '''
    store token into config.txt
    '''
    with open("./token.txt", "w", encoding="utf-8") as f:
        f.write(token)


def get_token():
    '''
    get token from config.txt
    '''
    with open("./token.txt", "r", encoding="utf-8") as f:
        token = f.read()
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
