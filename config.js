require('dotenv').config();

const config = {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://wohakim785_db_user:7QpD3pVoQeJuTInK@cluster0.apv9rsx.mongodb.net/',

    DB_NAME: process.env.DB_NAME || 'queen',

    COLLECTIONS: {
        SESSIONS: 'whatsapp_sessions',
        NUMBERS: 'active_numbers',
        CONFIGS: 'bot_configs'
    },

    AUTO_VIEW_STATUS: 'true',
    AUTO_STATUS_REACT: 'false',
    AUTO_STATUS_REPLY: 'false',
    STATUS_REPLY_MSG: '*_Your status viewed successfully by 𝙌𝙐𝙀𝙀𝙉🦋 🤖_*',
    AUTO_RECORDING: 'false',
    AUTO_REACT: 'false',
    AUTO_TYPING: 'false',
    ALWAYS_ONLINE: 'false',
    VERSION: '10.1.0 Bᴇᴛᴀ',
    DESCRIPTION: '> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙌𝙐𝙀𝙀𝙉🦋 🍷*',
    ANTI_DELETE_PATH: 'inbox',
    ANTI_DELETE: 'false',
    ANTI_EDIT_PATH: 'inbox',
    ANTI_EDIT: 'false',
    STICKER_NAME: '.  ̶͟ ̶̽ ̶͟ ̶͟ ͟𝐐𝐔𝐄𝐄𝐍🦋⸼˺┇🌸• ⑅⃝⃕͜➳ᷝ͢•ⷨ',
    ANTI_LINK: 'true',
    ANTI_LINK_ACTION: 'warn',
    WELCOME: 'false',
    GOODBYE: 'false',
    WELCOME_MESSAGE: '*_@user joined the group, welcome! 🎉_*',
    GOODBYE_MESSAGE: '*_@user has left the group, we will miss them! 👋_*',
    ADMIN_ACTION: 'false',
    MODE: 'public',
    PREFIX: '.',
    ANTI_CALL: 'false',
    REJECT_MSG: '*Call Rejected Automatically 📵*',
    READ_MESSAGE: 'false',
    AUTO_STATUS_SEEN: 'true',
    OWNER_REACT: 'false',
    CUSTOM_REACT: 'false',
    HEART_REACT: 'false',
    CUSTOM_EMOJIS: ['😊', '👍', '🚀', '💻', '🎉', '🔥'],
    HEART_EMOJIS: ['❤️', '💖', '💝', '💗', '💓', '💞', '💕', '💟', '♥️', '❤️‍🔥', '❤️‍🩹'],
    OWNER_EMOJIS: ['❤️', '🧡', '💛', '💚', '🩵', '💙', '💜', '🩷', '🤎', '🖤', '🩶', '🤍', '❤️‍🔥', '❤️‍🩹', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️'],
    REACT_EMOJIS: [
'❤️','🔥','👏','😮','😢','👍','🎉','🙏','😍','😊','🥰','💕','🤩','✨','😎','🥳','🙌',
'💖','💗','💓','💞','💘','💝','💟','❣️','♥️','❤️‍🔥','❤️‍🩹',
'🧡','💛','💚','🩵','💙','💜','🩷','🤍','🤎','🖤','🩶',
'🌹','🌺','🌸','💐','🌷','🪷','🌻','🌼',
'⭐','🌟','💫','✨','⚡','☀️','🌈','☄️',
'👑','💎','🏆','🥇','🎖️','🏅',
'🎁','🎀','🧸','🍫','🍭','🍬',
'🦋','🕊️','🦢','🦚','🦜','🐬','🐳','🐠',
'🍓','🍒','🍑','🍍','🥭','🍉','🍇',
'🎵','🎶','🎤','🎧','🎸','🎹',
'🚀','🛸','🌍','🌎','🌏','🌙','⭐',
'💯','✔️','✅','☑️','💥','💫','🫶','🤝','💪',
'🏖️','🌊','⛱️','🏝️','🌅','🌄',
'🎇','🎆','🎊','🎈','🎂','🍰','🧁',
'💌','📩','📨','💍','💐','🪄',
'🔮','🪙','💠','🔷','🔹','🔸','🔶',
'🕯️','🪔','🏵️','🎗️','🌠','🌌',
'🫰','🤲','🙌','🙏','💐','💝',
'♾️','☘️','🍀','🌿','🌱','🌴','🎋',
'🧿','🪬','💎','👑','🏰','🗝️'
] ,

    BOT_NAME: '𝙌𝙐𝙀𝙀𝙉-𝗠𝗗',
    OWNER_NAME: '𝙌𝙐𝙀𝙀𝙉🦋',
    OWNER_NUMBER: '923147385565',
    DEV: '923147385565',
    BOT_IMAGE: 'https://files.catbox.moe/33a8lk.jpg',
    CONNECT_MSG_IMAGE: 'https://files.catbox.moe/33a8lk.jpg',
    NEWSLETTER_JID: '120363431481085222@newsletter',
    NEWSLETTER_NAME: '𝙌𝙐𝙀𝙀𝙉-MD',

    MAX_RETRIES: 50,
    OTP_EXPIRY: 300000,
    BANNED: [],
    SUDO: [
        "923147385565@s.whatsapp.net"
    ],

    DEFAULT_SETTINGS: {
        AUTO_VIEW_STATUS: 'true',
        AUTO_STATUS_SEEN: 'true',
        AUTO_STATUS_REACT: 'false',
        AUTO_STATUS_REPLY: 'false',
        STATUS_REPLY_MSG: '*_Your status viewed successfully by 𝙌𝙐𝙀𝙀𝙉🦋 🤖_*',
        READ_MESSAGE: 'false',

        AUTO_RECORDING: 'false',
        AUTO_REACT: 'false',
        AUTO_TYPING: 'false',
        ALWAYS_ONLINE: 'false',
        OWNER_REACT: 'false',
        CUSTOM_REACT: 'false',
        HEART_REACT: 'false',
        CUSTOM_EMOJIS: ['😊', '👍', '🚀', '💻', '🎉', '🔥'],
        HEART_EMOJIS: ['❤️', '💖', '💝', '💗', '💓', '💞', '💕', '💟', '♥️', '❤️‍🔥', '❤️‍🩹'],

        ANTI_DELETE: 'false',
        ANTI_DELETE_PATH: 'inbox',
        ANTI_EDIT: 'false',
        ANTI_EDIT_PATH: 'inbox',
        ANTI_CALL: 'false',
        ANTI_LINK: 'true',
        ANTI_LINK_ACTION: 'warn',

        WELCOME: 'false',
        GOODBYE: 'false',
        ADMIN_ACTION: 'false',

        WELCOME_MESSAGE: '*_@user joined the group, welcome! 🎉_*',
        GOODBYE_MESSAGE: '*_@user has left the group, we will miss them! 👋_*',
        REJECT_MSG: '*Call Rejected Automatically 📵*',

        VERSION: '10.1.0 Bᴇᴛᴀ',
        OWNER_NAME: '𝙌𝙐𝙀𝙀𝙉🦋',
        OWNER_NUMBER: '923147385565',
        DEV: '923147385565',
        DESCRIPTION: '> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙌𝙐𝙀𝙀𝙉🦋 🍷*',
        STICKER_NAME: '.  ̶͟ ̶̽ ̶͟ ̶͟ ͟𝐐𝐔𝐄𝐄𝐍🦋⸼˺┇🌸• ⑅⃝⃕͜➳ᷝ͢•ⷨ',
        MODE: 'public',
        PREFIX: '.',
        BOT_NAME: '𝙌𝙐𝙀𝙀𝙉-MD',
        BOT_IMAGE: 'https://files.catbox.moe/33a8lk.jpg',
        CONNECT_MSG_IMAGE: 'https://files.catbox.moe/33a8lk.jpg',
        NEWSLETTER_JID: '120363431481085222@newsletter',
        NEWSLETTER_NAME: '𝙌𝙐𝙀𝙀𝙉-MD',

        REACT_EMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],
        OWNER_EMOJIS: ['❤️', '🔥', '👑', '⭐', '💎'],

        BANNED: [],
        SUDO: [
            "923147385565@s.whatsapp.net"
        ]
    }
};

module.exports = config;
