var xhr = new XMLHttpRequest(),
body = JSON.stringify(
    {
        "messages": [
            {
                "channel": "whatsapp",
                "to": "27735317061",
                "content": "Test WhatsApp Message Text"
            },
            {
                "channel": "sms",
                "to": "27735317061",
                "content": "Test SMS Message Text"
            }
        ]
    }
);
xhr.open('POST', 'https://platform.clickatell.com/v1/message', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', '9UTg66NvTV-KHjIgBWSTnQ==');
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('success');
    }
};

xhr.send(body);