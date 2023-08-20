const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});
const sendMail = (name, email, subject, message) => {
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const mail = {
    from: email,
    to: process.env.USER,
    subject: subject,
    html: `You got a message from
    Email : ${email}
    Name: ${name}
    Message: ${message}`,
  };


  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { sendMail };
