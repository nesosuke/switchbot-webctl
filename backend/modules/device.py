

from logging import raiseExceptions
from mimetypes import common_types
from readline import set_completion_display_matches_hook


class Lock:
    '''
    Get Status smart lock device
    '''

    def __init__(self):
        self.status: dict = {}  # TODO

    def is_locked(self) -> bool:
        '''
        check if the lock is locked
        '''
        if self.status['lockState'] == 'locked':
            return True
        else:
            return False

    def door_is_closed(self) -> bool:
        '''
        check if the door is closed
        '''
        if self.status['doorState'] == 'closed':
            return True
        else:
            return False

    def about(self) -> str:
        '''
        get information about the lock
        '''
        return self.status

# handle virtual infrared remote devices


class AirConditioner:
    '''
    Return: Command string

    Command format: (temp, mode, fan_speed, on_off)
    Default: `26,1,1,on`
    '''

    def __init__(self, command):
        self.command: str = command

    def set_command(self, temp: int, mode: str, fan_speed: str, on_off: str) -> str:
        '''
        Convert air conditioner command to string
        '''
        # set default value
        temp = temp if temp else 26
        mode = mode if mode else 'auto'
        fan_speed = fan_speed if fan_speed else 'auto'
        on_off = on_off if on_off else 'off'

        if mode == 'auto':
            mode = 1
        elif mode == 'cool':
            mode = 2
        elif mode == 'dry':
            mode = 3
        elif mode == 'fan':
            mode = 4
        elif mode == 'heat':
            mode = 5

        if fan_speed == 'auto':
            fan_speed = 1
        elif fan_speed == 'low':
            fan_speed = 2
        elif fan_speed == 'medium':
            fan_speed = 3
        elif fan_speed == 'high':
            fan_speed = 4

        command = f'{temp},{mode},{fan_speed},{on_off}'
        self.command = command

    def turn_on_auto(self) -> str:
        '''
        Turn on air conditioner with auto mode, fan speed and temperature
        '''
        temp = 26
        mode = 'auto'
        fan_speed = 'auto'
        on_off = 'on'

        self.set_command(temp, mode, fan_speed, on_off)

    def turn_off(self) -> str:
        '''
        Turn off air conditioner
        '''
        on_off = 'off'

        self.set_command(None, None, None, on_off)
