const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendTrainingReminder = async (athleteEmail, athleteName, trainingDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: athleteEmail,
      subject: 'Training Reminder - Smart Coaching',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Training Reminder</h2>
          <p>Hi ${athleteName},</p>
          <p>This is a reminder about your upcoming training session:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>${trainingDetails.title}</h3>
            <p><strong>Category:</strong> ${trainingDetails.category}</p>
            <p><strong>Date:</strong> ${new Date(trainingDetails.date).toLocaleDateString()}</p>
            <p><strong>Description:</strong> ${trainingDetails.description}</p>
          </div>
          <p>Stay focused and give your best!</p>
          <p>Best regards,<br>Smart Coaching Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Training reminder sent to:', athleteEmail);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

exports.sendPlanAssignment = async (athleteEmail, athleteName, planDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: athleteEmail,
      subject: 'New Training Plan Assigned - Smart Coaching',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Training Plan Assigned</h2>
          <p>Hi ${athleteName},</p>
          <p>Your coach has assigned you a new training plan:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>${planDetails.title}</h3>
            <p><strong>Category:</strong> ${planDetails.category}</p>
            <p><strong>Duration:</strong> ${planDetails.duration.weeks} weeks</p>
            <p><strong>Sessions per week:</strong> ${planDetails.duration.sessionsPerWeek}</p>
            <p><strong>Start Date:</strong> ${new Date(planDetails.startDate).toLocaleDateString()}</p>
            <p><strong>Description:</strong> ${planDetails.description}</p>
          </div>
          <p>Login to your dashboard to view the complete plan and start your training!</p>
          <p>Best regards,<br>Smart Coaching Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Plan assignment email sent to:', athleteEmail);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

exports.sendFeedbackResponse = async (athleteEmail, athleteName, feedbackResponse) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: athleteEmail,
      subject: 'Coach Response to Your Feedback - Smart Coaching',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Coach Response</h2>
          <p>Hi ${athleteName},</p>
          <p>Your coach has responded to your feedback:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Your Feedback:</strong> ${feedbackResponse.originalMessage}</p>
            <p><strong>Coach Response:</strong> ${feedbackResponse.response}</p>
          </div>
          <p>Keep up the great work!</p>
          <p>Best regards,<br>Smart Coaching Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Feedback response sent to:', athleteEmail);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};
