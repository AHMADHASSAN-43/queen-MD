const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path');
const fs = require('fs');
const { runtime } = require('../lib/functions')
const axios = require('axios')
const converter = require('../lib/converter');
const { sendButtons } = require('gifted-btns');

const NEWSLETTER_JID = '120363431481085222@newsletter';
const audioDir = path.join(__dirname, '../data/menu-voice');
let lastAudio = null;

const getRandomAudio = () => {
    if (!fs.existsSync(audioDir)) return null;
    const files = fs.readdirSync(audioDir).filter(f => /\.mp3$/i.test(f));
    if (!files.length) return null;
    const pool = files.length > 1 ? files.filter(f => f !== lastAudio) : files;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    lastAudio = pick;
    return path.join(audioDir, pick);
};

// --- YAHAN EMOJI CHANGE HOTA HAI HAR BAAR ---
const emojiList = ['🌸', '🦋', '🎀', '✨', '💗', '👀', '🌷'];
let menuCount = 0; // Yeh yaad rakhega ke kitni baar menu khula hai

const formatCategory = (category, cmds, prefix = '.', currentEmoji) => {
    const validCmds = cmds.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
    if (validCmds.length === 0) return '';
    
    let title = `\n*╭─── [ ${category.toUpperCase()} ] ───╮*\n`;
    // Ab har command ke aage wahi ek emoji lagega jo aapne baar baar type karne par badla hai
    let body = validCmds.map(cmd => `│ ${currentEmoji} ➢ ${prefix}${cmd.pattern}`).join('\n');
    let footer = `\n*╰─────────────────╯*\n`;
    return `${title}${body}${footer}`;
};

const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
        return false;
    }
    return url.startsWith('http://') || url.startsWith('https://');
};

cmd({
    pattern: "menu",
    alias: ["m", "help", "allmenu", "fullmenu"],
    use: '.menu [category]',
    desc: "Show all bot commands",
    category: "main",
    react: "🎀",
    filename: __filename
},
async (conn, mek, m, { from, args, reply, userConfig }) => {
    try {
        await conn.sendPresenceUpdate('composing', from);

        // Emoji change logic: Har baar menu type karne par next emoji select hoga
        const currentEmoji = emojiList[menuCount % emojiList.length];
        menuCount++; // Agli baar ke liye count barha diya

        let totalCommands = Object.keys(commands).length;

        const categories = [...new Set(Object.values(commands).map(c => c.category))].filter(cat =>
            cat && cat.trim() !== '' && cat !== 'undefined'
        );

        const categorized = {};
        categories.forEach(cat => {
            const categoryCommands = Object.values(commands).filter(c => c.category === cat);
            const validCommands = categoryCommands.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
            if (validCommands.length > 0) {
                categorized[cat] = validCommands;
            }
        });

        const BOT_NAME = userConfig?.BOT_NAME || config.BOT_NAME || "QUEEN-MD";
        const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || "Queen Owner";
        const PREFIX = userConfig?.PREFIX || config.PREFIX || ".";
        const MODE = userConfig?.MODE || config.MODE || "public";
        const VERSION = userConfig?.VERSION || config.VERSION || "1.0.0";
        const DESCRIPTION = userConfig?.DESCRIPTION || config.DESCRIPTION || "";

        const filterCategory = (args[0] || '').toLowerCase().trim();
        const isFiltered = filterCategory && filterCategory !== 'all';

        let menuSections = '';
        for (const [category, cmds] of Object.entries(categorized)) {
            if (isFiltered && category.toLowerCase() !== filterCategory) continue;
            if (cmds && cmds.length > 0) {
                // Yahan currentEmoji pass kiya ja raha hai
                const section = formatCategory(category, cmds, PREFIX, currentEmoji);
                if (section !== '') {
                    menuSections += section;
                }
            }
        }

        if (isFiltered && !menuSections) {
            return reply(`❌ No commands found in category *${filterCategory}*`);
        }

        let dec = `
*╭─ [ 🎀 ${BOT_NAME} 🎀 ] ─╮*

 👑 *Owner:* ${OWNER_NAME}
 ⏰ *Uptime:* ${runtime(process.uptime())}
 📂 *Cmds:* ${totalCommands}
 🦋 *Mode:* ${MODE}
 🏷️ *Version:* ${VERSION}

*╰─────────────────╯*
${menuSections}
> 🎀 *Powered By QUEEN🦋*`;

        const defaultMenuImage = 'https://files.catbox.moe/15j4gb.jpg';
        let imageToUse = defaultMenuImage;

        if (isValidImageUrl(userConfig?.BOT_IMAGE)) {
            try {
                await axios.head(userConfig.BOT_IMAGE, { timeout: 3000 });
                imageToUse = userConfig.BOT_IMAGE;
            } catch (urlError) {
                imageToUse = defaultMenuImage;
            }
        }

        const newsletterContext = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: NEWSLETTER_JID,
                newsletterName: "QUEEN-MD TECH 🦋",
                serverMessageId: 143
            }
        };

        const menuButtons = isFiltered
            ? [
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '📂 All Menu', id: `${PREFIX}menu` }) },
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '📥 Downloader', id: `${PREFIX}menu download` }) },
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '🏓 Ping', id: `${PREFIX}ping` }) }
            ]
            : [
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '🏓 Ping Menu', id: `${PREFIX}ping` }) },
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '📥 Downloader Menu', id: `${PREFIX}menu download` }) },
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '📂 All Menu', id: `${PREFIX}menu` }) }
            ];

        let sent = false;

        try {
            await sendButtons(conn, from, {
                title: '',
                text: dec.trim(),
                footer: 'Queen-MD',
                buttons: menuButtons,
                headerType: 4,
                image: { url: imageToUse },
                contextInfo: newsletterContext
            }, { quoted: mek });
            sent = true;
        } catch (btnErr) {
            console.log('sendButtons failed, using fallback:', btnErr.message);
        }

        if (!sent) {
            try {
                await conn.sendMessage(from, {
                    image: { url: imageToUse },
                    caption: dec.trim(),
                    contextInfo: newsletterContext
                }, { quoted: mek });
            } catch (imageError) {
                await conn.sendMessage(from, { text: dec.trim(), contextInfo: newsletterContext }, { quoted: mek });
            }
        }

        try {
            const audioPath = getRandomAudio();
            if (audioPath) {
                const input = fs.readFileSync(audioPath);
                const ptt = await converter.toPTT(input, 'mp3');
                await conn.sendMessage(from, { audio: ptt, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: mek });
            } else {
                await conn.sendMessage(from, { audio: { url: "https://files.catbox.moe/yfyuyk.mp3" }, mimetype: 'audio/mpeg', ptt: false }, { quoted: mek });
            }
        } catch (audioError) {
            console.log('Audio send error:', audioError);
        }

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
