const { TempMail } = require("1secmail-api");

function generateRandomId() {
		var length = 6;
		var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		var randomId = '';

		for (var i = 0; i < length; i++) {
				randomId += characters.charAt(Math.floor(Math.random() * characters.length));
		}

		return randomId;
}

module.exports = {
		config: {
				name: 'tempmail',
				version: '2.1.0',
				author: "LIKHON-AHMED", // not change credits
				countDown: 5,
				role: 0,
				shortDescription: 'Generate temporary email (auto get inbox)',
				category: 'generate',
				guide: {
						en: '[tempmail]'
				}
		},

		onStart: async function ({ api, event }) {
				const reply = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

				try {
						// Generate temporary email
						const mail = new TempMail(generateRandomId());

						// Auto fetch
						mail.autoFetch();

						if (mail) reply(" " + mail.address);

						// Fetch function
						const fetch = () => {
								mail.getMail().then((mails) => {
										if (!mails[0]) {
												return;
										} else {
												let b = mails[0];
												var msg = `┏━━━━━━━•°🌺°•━━━━━━━┓\n⚀ •» ✨𝐍𝐄𝐖 𝐌𝐄𝐒𝐒𝐀𝐆𝐄✨ «•⚀\n┗━━━━━━━•°🌺°•━━━━━━━┛\n\n╭─────────────|\n\╰‣ 𝐅𝐑𝐎𝐌-: ${b.from}\n\n╭─────────────|\n\╰‣𝐒𝐔𝐁𝐉𝐄𝐂𝐓-: ${b.subject}\n\n╭─────────────|\n\╰‣ 𝐃𝐀𝐓𝐄-:: ${b.date}`;
												reply(msg + `\n\n\n⚀ •» ✨ 𝐋𝐈𝐊𝐇𝐎𝐍-𝟔𝐓𝟗𝐗 ✨ «•⚀`);
												return mail.deleteMail();
										}
								});
						};

						// Auto fetch every 3 seconds
						fetch();
						setInterval(fetch, 3 * 1000);

				} catch (err) {
						console.error(err);
						return reply(err.message);
				}
		}
};
