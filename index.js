const { Client, Intents, Channel, MessageManager } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

const botToken = process.env.BOT_TOKEN;

const targetUsername = 'mockingjayyyy';
const targetRoleName = 'Nuub';
const stickerUrl = 'https://i.imgur.com/AwGevTh.png';
let active = false;

client.on('ready', () => {
    client.user.setPresence({ status: 'invisible' });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot || !message.content) return;

    if (message.channel.name === 'activate-bot' && message.author.username === targetUsername) {
        const content = message.content.toLowerCase();
        if (content === '!activate') {
            active = true;
            message.reply('Bot is now activated!');
        } else if (content === '!deactivate') {
            active = false;
            message.reply('Bot is now deactivated!');
        }
        if (content === '!botstatus') message.reply(`Bot is ${active ? 'Active' : 'Deactive'} `);
    }

    if (active && message.channel.name === 'chat-bebas') {
        if (message.mentions.users.some((user) => user.username.toLowerCase() === targetUsername.toLowerCase())) {
            message.reply({ files: [stickerUrl] }).catch(console.error);
        }
        const targetRole = message.guild.roles.cache.find((role) => role.name.toLowerCase() === targetRoleName.toLowerCase());
        if (targetRole && message.mentions.roles.has(targetRole.id)) {
            message.reply({ files: [stickerUrl] }).catch(console.error);
        }
    }
});

client.login(botToken);
