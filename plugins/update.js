let { execSync } = require('child_process')
let handler = async (m, { conn, text, isROwner }) => {
  if (!text) throw `Link repo nya mana?\nEx : https://github.com/Rmdhn-20/YushinoMdV3`
  if (global.conn.user.jid == conn.user.jid) {
    let stdout = execSync(`git remote set-url origin ${text}.git && git pull` + (isROwner && text ? ' ' + text : ''))
    if (isROwner) require('fs').readdirSync('plugins').map(v => global.reload('', v))
    m.reply(stdout.toString())
  }
}
handler.help = ['update']
handler.tags = ['owner']
handler.command = /^(update)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

