const sgMail = require('@sendgrid/mail');

const sendgridApiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridApiKey);

const sendWelcomeEmail = async (email, name) => {
  try {
    await sgMail.send({
      to: email,
      from: 'sunderrawat7777@gmail.com',
      subject: 'Welcome to Task Manager App',
      text: `Hello ${name}, welcome to task manager app. thanks for joining.`,
    });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

const sendCancelationEmail = async (email, name) => {
  try {
    await sgMail.send({
      to: email,
      from: 'sunderrawat7777@gmail.com',
      subject: 'Bye from Task Manager App',
      text: `Hello ${name}, See you again`,
    });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = { sendWelcomeEmail, sendCancelationEmail };
