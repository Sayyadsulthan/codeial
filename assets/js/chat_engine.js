class ChatEngine {
    constructor(chatBoxId, UserEmail){
        this.chatbox = $(`#${chatBoxId}`);
        this.userEmail = UserEmail;

        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        this.socket.on('connect', function(){
            console.log('connection established using sockets...');
        })
    }
}