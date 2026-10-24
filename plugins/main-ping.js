const { cmd } = require('../command');

const FOOTER = `> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ϙᴜᴇᴇɴ-ᴍᴅ ⚡*`;

const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

const contextInfo = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: '120363431481085222@newsletter',
    newsletterName: "𝐐𝐔𝐄𝐄𝐍-𝐌𝐃",
    serverMessageId: Date.now()
  }
};

const getNumber = (conn, mek, sender) => {
  const list = [
    sender,
    mek?.key?.participant,
    mek?.key?.participantAlt,
    mek?.key?.participantPn,
    mek?.key?.fromMe ? conn?.user?.id : null,
    mek?.key?.remoteJidAlt,
    mek?.key?.remoteJid
  ];
  const jid = list.find(j => typeof j === 'string' && j.endsWith('@s.whatsapp.net'));
  return (jid || sender || '').split('@')[0].split(':')[0];
};

const buildQuotedCard = (conn, mek, sender) => {
  const number = getNumber(conn, mek, sender);
  return {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "QUEEN-MD",
        vcard: `BEGIN:VCARD
VERSION:3.0
FN:QUEEN-MD
ORG:Queen-xtech;
item1.TEL;waid=${number}:${number}
item1.X-ABLabel:Mobile
END:VCARD`
      }
    }
  };
};

async function measureMs(conn, from, mek) {
  const emoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
  const start = Date.now();
  await conn.sendMessage(from, {
    react: { text: emoji, key: mek.key }
  });
  return Date.now() - start;
}

cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    desc: "Check bot's response time",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const ms = await measureMs(conn, from, mek);

        const msg = 
`╭━━━⪨ 🎀 𝐐𝐔𝐄𝐄𝐍 𝐌𝐃 🎀 ⪩━━━╮
  
  ⚡ ‣ 𝐒𝐩𝐞𝐞𝐝 : ${ms}ms 💨
  💖 ‣ 𝐒𝐭𝐚𝐭𝐮𝐬 : Active & Cute 💕

╰━━━━━━━━━━━━━━━━━━━━━━╯

> 🎀 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ QUEEN🦋*`;

        await conn.sendMessage(from, {
            text: msg,
            contextInfo: {
                ...contextInfo,
                mentionedJid: sender ? [sender] : undefined
            }
        }, { quoted: buildQuotedCard(conn, mek, sender) });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

cmd({
    pattern: "ping2",
    desc: "Check bot's response time",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const ms = await measureMs(conn, from, mek);

        let status;
        if (ms < 100) status = "🚀 *Blazing Fast*";
        else if (ms < 500) status = "⚡ *Fast & Responsive*";
        else status = "🐢 *Slow Response*";

        const msg =
`╭━━━⪨ 🎀 𝐐𝐔𝐄𝐄𝐍 𝐌𝐃 🎀 ⪩━━━╮
  
  📶 ‣ 𝐋𝐚𝐭𝐞𝐧𝐜𝐲 : ${ms} ms
  🧠 ‣ 𝐒𝐭𝐚𝐭𝐮𝐬   : ${status}
  💫 ‣ 𝐌𝐨𝐝𝐞    : Active & Stable
  🛡️ ‣ 𝐒𝐞𝐜𝐮𝐫𝐢𝐭𝐲 : Secured 💕

╰━━━━━━━━━━━━━━━━━━━━━━╯

> 🎀 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ QUEEN🦋*`;

        await conn.sendMessage(from, {
            text: msg.trim(),
            contextInfo
        }, { quoted: buildQuotedCard(conn, mek, sender) });

    } catch (e) {
        console.error("Error in ping2 command:", e);
        reply(`⚠️ Error: ${e.message}`);
    }
});
