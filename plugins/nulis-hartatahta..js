let handler = async (m, { conn, text }) => {
    if (!text) throw 'Textnya mana...'
    m.reply('_Sedang membuat..._\n*Mohon tunggu sekitar 1 menit*')
    try {
        let img = `https://api-xcoders.site/api/maker/tahta?text=${text}&apikey=cyXNcMnw3x`
        conn.sendFile(m.chat, img, 'Harta Tahta.png', `*${wm}*\nMade with FFmpeg`, m)
    } catch(e) {
        m.reply(e)
    }
}
handler.help = ['tahta <teks>']
handler.tags = ['nulis']
handler.command = /^((harta)?tahta)$/i

handler.limit = true

export default handler

