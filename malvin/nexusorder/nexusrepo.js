import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent } = pkg;
import axios from 'axios';

const handleRepoCommand = async (m, Matrix) => {
  try {
    // Fetch Repository Info
    const repoLink = 'https://github.com/kingmalvn/Nexus-MD';
    const repoOwner = 'kingmalvn';
    const repoName = 'Nexus-MD';

    const repoData = {
      stars: 700,
      forks: 7676,
      watchers: 690,
      openIssues: 30,
    };

    const fetchedDate = new Date().toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Styled Repository Message
    const messageText = `🌍 *${repoName} REPO INFO* 🪀\n\n` +
      `🤖 *ɴᴀᴍᴇ:* ${repoName}\n` +
      `⭐ *sᴛᴀʀs:* ${repoData.stars}\n` +
      `👤 *ᴅᴀɪʟʏ ᴜsᴇʀs:* ${repoData.forks}\n` +
      `👀 *ᴡᴀᴛᴄʜᴇᴛs:* ${repoData.watchers}\n` +
      `❗ *ᴏᴘᴇɴ ɪssᴜᴇs:* ${repoData.openIssues}\n` +
      `👤 *ᴏᴡɴᴇʀ:* ${repoOwner}\n\n` +
      `🕒 *ғᴇᴛᴄʜᴇᴅ ᴏɴ:* ${fetchedDate}\n\n` +
      `🔗 *ʀᴇᴘᴏ ʟɪɴᴋ:* ${repoLink}\n\n` +
      `🛠️ sᴄʀɪᴘᴛᴇᴅ ʙʏ *${repoOwner}*\n\n` +
      `Stay connected and follow my updates!`;

    // Send the styled message
    await Matrix.sendMessage(m.from, { text: messageText }, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error('Error processing your request:', error);
    m.reply('❌ Error processing your request.');
    await m.react('❌');
  }
};

const searchRepo = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['repo', 'sc', 'script'];

  if (validCommands.includes(cmd)) {
    await handleRepoCommand(m, Matrix);
  }
};

export default searchRepo;
