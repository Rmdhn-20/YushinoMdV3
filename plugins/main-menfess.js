import fs from 'fs'
const delay = time => new Promise(res => setTimeout(res, time))

async function handler(m, { command }) {

    conn.menfess = conn.menfess ? conn.menfess : {}
    let id = m.sender
    find = Object.values(conn.menfess).find(menpes => menpes.status == 'wait')
    roof = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(m.sender))

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

    await conn.send2ButtonDoc(data.jid, tek, ssn, 'Lanjutkan', '.accmenfess', 'Tolak Menfess', '.tolakmenfess', m, { contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: sig,
    mediaType: 2, 
    description: sgc,
    title: "Follow Sɪɴɪ Cᴜʏ",
    body: wm,
    thumbnail: fs.readFileSync('./media/menfess.jpg'),
    sourceUrl: sig
    }}})
    conn.sendButton(m.chat, `*Done* mengirim menfess kepada @${data.jid.split('@')[0]}`, logs, imgr, [['Menu', '.? all']], m)
    conn.menfess[id] = {
          id: id,
          a: m.sender,
          b: jid,
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
        if(!roof) return m.reply("Kamu belum memulai menfess..")
        find = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(m.sender))
        await conn.sendMessage(find.a, `_@${find.b.split("@")[0]} Menolak bermain menfess.._`, m)
        m.reply("*^Done..*")
        delete conn.menfess[find.id]
        return !0
        break;
    }
}

handler.tags = ['anonymous']
handler.help = ['menfess'].map(v => v + ' <nomor|nama|pesan>')
handler.command = ['menfess', 'menfes', 'accmenfess', 'tolakmenfess']

handler.private = true

export default handler

// By Ekuzika
//cuma fix dikit
//Thx To
//xzeera-id
//ayang gw:v (citlaa_12)

