const nodemailer = require('nodemailer');

function makeMailer(env = process.env) {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'CONTACT_TO'];
  if (required.some((key) => !env[key])) return null;
  const port = Number(env.SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid SMTP_PORT');
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  return {
    async sendContact(message) {
      const lines = [
        `Namn: ${message.name}`,
        `E-post: ${message.email}`,
        `Telefon: ${message.phone || 'Ej angivet'}`,
        `Ärende: ${message.subject || 'Ej angivet'}`,
        '', message.message,
      ];
      const result = await transport.sendMail({
        from: env.SMTP_FROM,
        to: env.CONTACT_TO,
        replyTo: message.email,
        subject: 'Ny förfrågan via Brynäs Bilservice webbplats',
        text: lines.join('\n'),
      });
      if (!result.accepted || result.accepted.length === 0) throw new Error('SMTP did not accept recipient');
      return result.messageId;
    },
    verify: () => transport.verify(),
  };
}

module.exports = { makeMailer };
