// utils/mailer.js
const nodemailer = require('nodemailer');

// Configure the transporter with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other services like 'SendGrid', 'Mailgun', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to send low inventory email
const sendLowInventoryEmail = async (product) => {
  const { name, price, quantity } = product;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL, // Owner's email address
    subject: '🚨 Low Inventory Alert: Time to Restock! 🚨',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #ff6f61; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🚨 Low Stock Alert! 🚨</h1>
            <p style="color: white; font-size: 16px;">Your inventory needs a little love! 💌</p>
          </div>
          <div style="padding: 20px;">
            <h2 style="color: #333;">Product: <span style="color: #ff6f61;">${name}</span></h2>
            <p style="font-size: 16px; color: #555;">
              Uh-oh! The product <strong>${name}</strong> is running dangerously low on stock. 
              Here are the deets you need to fix this quick:
            </p>
            <ul style="list-style: none; padding: 0; margin: 20px 0; border: 1px solid #ddd; border-radius: 5px; overflow: hidden;">
              <li style="background: #f9f9f9; padding: 10px 15px; font-size: 16px; color: #333;">
                <strong>💰 Price:</strong> ₹${price}
              </li>
              <li style="background: #fff; padding: 10px 15px; font-size: 16px; color: #333;">
                <strong>📦 Quantity:</strong> ${quantity} left! 😱
              </li>
            </ul>
            <p style="font-size: 16px; color: #555;">
              Time to hit the restock button before this popular item disappears! 🏃‍♂️💨
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://www.your-inventory-system.com" style="background-color: #ff6f61; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                Restock Now
              </a>
            </div>
          </div>
          <div style="background-color: #ff6f61; padding: 10px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 14px;">Powered by Your Inventory System 🚀</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Low inventory email sent for product: ${name}`);
  } catch (error) {
    console.error('Error sending low inventory email:', error);
  }
};

module.exports = { sendLowInventoryEmail };
