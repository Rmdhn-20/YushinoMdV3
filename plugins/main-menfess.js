import fs from 'fs'
import moment from 'moment-timezone'
const delay = time => new Promise(res => setTimeout(res, time))

async function handler(m, { command, text, usedPrefix }) {

    conn.menfess = conn.menfess ? conn.menfess : {}
    let id = m.sender
    let find = Object.values(conn.menfess).find(menpes => menpes.status == 'wait')
    let roof = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(m.sender))
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')

    switch(command) {
    case 'menfes': case 'menfess':
    if(roof) return m.reply('Kamu masih berada dalam Obrolan!')
    let [jid, name, pesan] = text.split('|');
    if ((!jid || !name || !pesan)) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Anonymous|Hai.`;
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.'
    if (jid == m.sender) throw 'Kenapa kirim menfess ke diri sendiri kak?\nCapek ya? Semangat kak<3'

    let tek = `Hᴀɪ Kᴀᴋ @${data.jid.split('@')[0]}, ᴋᴀᴍᴜ ᴍᴇɴᴇʀɪᴍᴀʜ ᴘᴇsᴀɴ ᴍᴀɴғᴇss ɴɪʜ.\n➴`.trim();
    let ssn = `〠 Dᴀʀɪ : ${name}\n⎙ Pᴇsᴀɴ : ${pesan}\nJam : ${wib}`
    let logs = `➯ Pᴇsᴀɴ : ${pesan}\nJam : ${wib}`
    let imgr = fla.getRandom()

    conn.sendButton(m.chat, `*Done* mengirim menfess kepada @${data.jid.split('@')[0]}`, logs, imgr, [['Menu', '.? all']], m)
    await conn.send3ButtonDoc(data.jid, tek, ssn, 'Lanjutkan', '.accmenfess', 'Tolak Menfess', '.tolakmenfess', 'Menu', '.? all', m, { contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: sig,
    mediaType: 2, 
    description: sig,
    title: "Follow Sɪɴɪ Cᴜʏ",
    body: wm,
    thumbnail: fs.readFileSync('./media/menfess.jpg'),
    sourceUrl: sig
    }}})
    conn.menfess[id] = {
          id: id,
          a: m.sender,
          b: data.jid,
          status: "wait",
        }
        break;

    case 'accmenfess':
        if(!roof) return m.reply("Kamu belum memulai menfess..")
        try {
            find.b = m.sender
            find.status = 'chatting'
            conn.menfess[find.id] = {...find}
            find = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(m.sender))
            conn.sendMessage(find.a, `_@${m.sender.split("@")[0]} menerima chat dengan anda, sekarang anda bisa melanjutkan menfes dengan dia.._\n\n*NOTE : Jika ingin berhenti dari menfess, silahkan ketik _.stopmenfess_ Untuk hapus session kalian..*`, m)
            m.reply(`*^Done..*\n\nSekarang kamu bisa melanjutkan menfes dengan dia. Ketik sesuatu, bot akan otomatis mengirim pesan mu.\n\n*NOTE : Jika ingin berhenti dari menfess, silahkan ketik _.stopmenfess_ Untuk hapus session kalian..*`)
        } catch (e){
            m.reply(e)
        }
            break
    
    case 'tolakmenfess':
    case 'stopmenfess': {
    let room = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(m.sender))
    if (!room) return this.sendButton(m.chat, '_Kamu belum memulai menfess.._', author, null, [['Menu', `.? all`]], m)
    m.reply('Ok')
    let to = room.a == m.sender ? room.b : room.a
    if (to) await this.sendButton(to, '_Partner meninggalkan chat_', author, null, [['Menu', `.? all`]], m)
    delete conn.menfess[room.id]
      return !0
    }
      break;
    }
}

handler.tags = ['anonymous']
handler.help = ['menfess'].map(v => v + ' <nomor|nama|pesan>')
handler.command = /^(menfes?s|accmenfess|tolakmenfess|stopmenfess)$/i

handler.private = true

export default handler

//FIX By Ekuzika
//Thx To
//xzeera-id
//ayang gw:v (citlaa_12)

