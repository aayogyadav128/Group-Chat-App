
const socket = io('http://127.0.0.1:8000');

const form = document.getElementById('form');
const msgin = document.getElementById('input');
const msgcontainer = document.querySelector("#messages");
const audio = new Audio('pikachu_sms.mp3');

const name = prompt('Enter Your Name to Join');
socket.emit('user-joined', name);

const append = (msg,position)=>{
    const messageElement = document.createElement("li");
    messageElement.innerText = msg;
    messageElement.classList.add(position)
    msgcontainer.append(messageElement);
    if (position=="left"){audio.play();};
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = msgin.value;
    append(`You :${message}`,'right');
    socket.emit('send',message);
    msgin.value="";
});



socket.on('user-joined',name=>{
    append(`${name} joined chat`, 'center')
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.msg}`, 'left')
})

socket.on('left',Name=>{
    append(`${Name} left the chat`, 'right')
})