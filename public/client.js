const socket = io()

const messages = document.getElementById('messages')
const username = document.getElementById('username')
const message = document.getElementById('message')
const send = document.getElementById('send')
const status = document.getElementById('status')

/* Cuando se conecta*/
socket.on('connect', () => {
    status.textContent = 'Conectado'
    status.classList.add('connected')
})

/* Cuando se desconecta*/
socket.on('disconnect', () => {
    status.textContent = 'Desconectado'
    status.classList.remove('connected')
})

/* Cuando recibe un mensaje*/
socket.on('mensaje', (data) => {
    const div = document.createElement('div')
    div.classList.add('message')

    /* Si el mensaje es mío lo pone a la derecha*/
    if (data.socketId === socket.id) {
        div.classList.add('own')
    }

    div.innerHTML = `
        <div class="author">${data.autor}</div>
        <div class="texto">${data.texto}</div>
    `

    messages.appendChild(div)
    messages.scrollTop = messages.scrollHeight
})

/* Enviar mensaje con el botón*/
send.addEventListener('click', enviarMensaje)

/* Enviar mensaje con Enter*/
message.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensaje()
})

function enviarMensaje() {
    const autor = username.value.trim() || 'Anónimo'
    const texto = message.value.trim()

    if (!texto) return

    socket.emit('mensaje', {
        autor,
        texto,
        socketId: socket.id
    })

    message.value = ''
}