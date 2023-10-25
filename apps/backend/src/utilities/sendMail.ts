import nodeMailer from 'nodemailer';
export const sendMail = async (email, resetToken) => {
  const transporter = new nodeMailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '5a095770cbf58a',
      pass: '1d2bc11f6096a4',
    },
  });

  const message = `<div>Reset Password of Loomi account. Click on given link below to reset password.<br><a>127.0.0.1/api/v1/users/resetPassord/${resetToken}</a><br>If you didn't requested for reseting you password then please ignore this mail.</div>`;

  return transporter.sendMail({
    form: '"Umer Saleem" <dev@loomi.io>',
    to: email,
    subject: 'You can reset your password within 10 minutes.',
    html: message,
  });
};
