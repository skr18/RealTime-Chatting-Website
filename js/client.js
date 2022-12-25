const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msginp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('/onii_chan.mp3');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const messgae = msginp.value;
    append(`you : ${messgae}`,'left');
    socket.emit('send',messgae)
    msginp.value=" "
})

const append = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='right')
    {
        audio.play();
    }
}
const mynames = prompt("Enter your name to join");
socket.emit('new-user-joined', mynames );
  
socket.on('user-joined', mynames =>{
    append(`${mynames} joined the chat `,'left');
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message} `,'right');
})

socket.on('left_chat', mynames =>{
    append(`${mynames} left the lobby `,'left');
})