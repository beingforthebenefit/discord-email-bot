const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const emailMap = require('./channelEmailMap.json');

dotenv.config();

const client = new Discord.Client({
  intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.DIRECT_MESSAGES
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const botToken = process.env.BOT_TOKEN;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
const toEmail = process.env.TO_EMAIL;

let transporter = nodemailer.createTransport({
  // Your email SMTP configuration
  service: 'gmail',  // replace with your email service
  auth: {
    user: emailUser,
    pass: emailPassword
  }
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.partial) {
    // If the message is partial, fetch the full message
    try {
      await message.fetch();
    } catch (err) {
      console.error('Error fetching message: ', err);
      return;
    }
  }

  let replyToEmail = emailMap[message.channel.name];
  if (!replyToEmail) {
    console.error(`No mapping found for channel: ${channel.name}`);
    return;
  };

  // prepare the attachments
  let emailAttachments = [];
  message.attachments.each(attachment => {
    emailAttachments.push({
      filename: attachment.name,
      path: attachment.url
    });
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    replyTo: replyToEmail,
    subject: `New message in #${message.channel.name}`,
    text: `${message.author.username}: ${message.content}
    
Reply to this email to post a reply in #${message.channel.name}`,
    attachments: emailAttachments
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

client.login(botToken);
