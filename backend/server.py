# backend API server for frontend React SPA app

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from modules import control as ctl

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    data = {"message": "Hello World"}
    return data


@app.get("/devices")
def get_device_list() -> list:

    device_list = ctl.fetch_device_list()  # TODO
    return device_list


@app.get("/devices/{device_id}/status")
async def get_device_status(device_id: str) -> dict:
    device_status = ctl.fetch_device_status(device_id)  # TODO
    return device_status


@app.post("/devices/{device_id}/command")
async def send_command(device_id: str, command: str) -> dict:

    # for debug
    result = f'''
    [DEBUG] device_id: {device_id}
    command: {command}
    '''

    # result = ctl.send_command(device_id, command)
    return result

