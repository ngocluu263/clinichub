from django.http import HttpResponse
from channels import Group
from channels.sessions import channel_session 

# Connected to websocket.connect
def ws_connect(message, room):
    # print(room + ' connect')
    Group("chat-"+room).add(message.reply_channel)

# Connected to websocket.receive
def ws_message(message, room):
    # print(room + ' message')
    Group("chat-"+room).send({
        "text": message.content['text'],
    })

# Connected to websocket.disconnect
def ws_disconnect(message, room):
    # print(room + ' disconnect')
    Group("chat-"+room).discard(message.reply_channel)

