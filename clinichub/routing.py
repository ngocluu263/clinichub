from channels.routing import route
from .consumers import *

channel_routing = [
    route('websocket.connect', ws_connect, path=r'^/chat/(?P<room>\w+)$'),
    route("websocket.receive", ws_message, path=r'^/chat/(?P<room>\w+)$'),
    route("websocket.disconnect", ws_disconnect, path=r'^/chat/(?P<room>\w+)$'),
]
