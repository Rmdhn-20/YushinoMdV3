export async function before(m, { match }) {
    try {
      conn.menfess = conn.menfess ? conn.menfess : {}
      const find = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(m.sender) && menpes.status == 'chatting')
          if(m.isGroup) return
          if(find == undefined) return
          const to = find.a == m.sender ? find.b : find.a
          conn.sendMessage(to, '*Menfess Reply*\n💬 : ')
    } catch {}
  }
  

// By Ekuzika
//cuma fix dikit
//Thx To
//xzeera-id
//ayang gw:v (citlaa_12)

