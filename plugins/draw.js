import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
        let wm = global.me
        if (!text) throw توليد صور أنمي بالذكاء الاصطناعي مثال:\n\n${ usedPrefix + command } girl
        await m.reply('*انتظر قليلا*')
        await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⌛'  }}, { messageId: m.key.id })
        try {
        let ff = await fetch(`https://api.neoxr.eu/api/waifudiff?q=${text}`)
        let anu = await ff.json()
        await conn.sendFile(m.chat, anu.data.url, 'image.jpg', wm, m)
        m.react('🎐')
      } catch (e) {
        console.log(e)
        m.reply('instagram.com/f0.0n1')
      }
    }

handler.help = ['رسم']
handler.tags = ['drawing']
handler.command = /^(رسم)$/i

export default handler