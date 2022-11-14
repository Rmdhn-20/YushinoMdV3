let fetch = require("node-fetch")
let arr = []
fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/citacita/main/citacita.txt')
  .then(res => res.text())
  .then(txt => arr = txt.split('\n'))
let handler = async (m, { conn }) => {
  let cita = arr[Math.floor(Math.random() * arr.length)]
  await conn.sendFile(m.chat, cita, 'cita.mp3', null, m, true)
}}
handler.help = ['citacita']
handler.tags = = ['main', 'fun']
handler.command = /^(citacita)$/i

module.exports = handler
