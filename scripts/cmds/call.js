module.exports = {
  config: {
    name: "call",
    version: "1.0",
    author: "SK-SIDDIK-KHAN",
    countDown: 5,
    role: 0,
    category: "user",
  },

  onStart: async function({ nayan, args, events, Users, NAYAN }) {
    try {
      console.log("Nayan object received:", nayan);
      console.log("Args received:", args);
      console.log("Events received:", events);

      const axios = require("axios");
      const info = args.join(" ");
      const msg = info.split("-");
      const number = msg[0]?.trim();
      const limit = msg[1]?.trim();

      if (!info) {
        NAYAN.react("❌");
        if (nayan && typeof nayan.reply === "function") {
          return nayan.reply("Number & limit not found", events.threadID, events.messageID);
        } else {
          console.error("nayan.reply is undefined or not a function at first check");
          return;
        }
      }

      if (!number || !limit) {
        NAYAN.react("❌");
        if (nayan && typeof nayan.reply === "function") {
          return nayan.reply("Number & limit not found", events.threadID, events.messageID);
        } else {
          console.error("nayan.reply is undefined or not a function at second check");
          return;
        }
      }

      NAYAN.react("⏳");

      const res = await axios.get(`http://5.9.12.94:15280/call?mobileNo=${number}&countryDialingCode=880`);
      const data = res.data;

      if (data.error) {
        NAYAN.react("🖕");
        if (nayan && typeof nayan.reply === "function") {
          return nayan.reply(data.error, events.threadID, events.messageID);
        } else {
          console.error("nayan.reply is undefined or not a function at error check");
          return;
        }
      }

      const num = data.send.num;
      const lim = data.send.limit;
      const msgs = data.send.msg;

      if (nayan && typeof nayan.reply === "function") {
        return nayan.reply("Number: " + num + "\nLimit: " + lim + "\nMessage: " + msgs, events.threadID, events.messageID);
      } else {
        console.error("nayan.reply is undefined or not a function at final check");
      }

    } catch (error) {
      console.error("Error occurred in onStart function:", error);
      if (nayan && typeof nayan.reply === "function") {
        return nayan.reply("Sms not sent", events.threadID, events.messageID);
      } else {
        console.error("nayan.reply is undefined or not a function during error handling");
      }
    }
  }
};
