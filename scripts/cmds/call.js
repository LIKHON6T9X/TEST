const axios = require("axios");

module.exports.config = {
  name: "call",
  version: "1.6.9",
  author: "LIKHON-AHMED",
  role: 2,
  description: "Send CALL to number",
  category: "fun",
  countDown: 3,
  guide: {
    en: "{pn} number - limit"
  }
};

module.exports.onStart = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  const info = args.join(" ");
  const msg = info.split("-");
  const number = msg[0]?.trim();
  const limit = msg[1]?.trim();

  if (!number || !limit || isNaN(limit)) {
    return api.sendMessage(`Please provide a valid number and limit.`, threadID, messageID);
  }
  try {
    const res = await axios.get(`http://5.9.12.94:15280/call?mobileNo=${number}&countryDialingCode=880`);
    const data = res.data;

    if (data && data.send) {
      const { num, limit, success, failure, msg } = data.send;
      await api.sendMessage(`Success! Sent ${success} out of ${limit} messages to ${num}.\nDetails: ${msg}`, threadID, messageID);
    } else {
      await api.sendMessage(`┏━━━━━━━•°🌺°•━━━━━━━┓\n⚀ •»✨𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘 ✨«•⚀\n┗━━━━━━━•°🌺°•━━━━━━━┛`, threadID, messageID);
    }
  } catch (error) {
    await api.sendMessage(`💔 Error: ${error.message}`, threadID, messageID);
  }
};
