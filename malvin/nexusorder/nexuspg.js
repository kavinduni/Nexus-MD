import config from '../../config.cjs'; // Ensure this matches your project setup

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "ping") {
    const start = new Date().getTime();
    await m.React('⏳'); // React with a loading icon
    const end = new Date().getTime();
    const responseTime = (end - start).toFixed(2);

    // Updated text style with Sarkar-MD branding and response rate
    const responseText = `*_𝑁𝑒𝑥𝑢𝑠-𝑀𝐷 𝑠𝑝𝑒𝑒𝑑 𝑖𝑠_* ${responseTime} 𝑚𝑠`;

    await m.React('✅'); // React with a success icon

    sock.sendMessage(
      m.from,
      {
        text: responseText,
        contextInfo: {
          isForwarded: false,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '@newsletter',
            newsletterName: "Nexus-MD",
            serverMessageId: -1,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            title: "🚀 Nexus-MD 🚀",
            body: "Ping Speed Calculation",
            thumbnailUrl: '', // Add thumbnail URL if required
            sourceUrl: 'https://whatsapp.com/channel/0029Vac8SosLY6d7CAFndv3Z', // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: m }
    );
  }
};

export default ping;
