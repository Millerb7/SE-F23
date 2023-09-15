import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import { log } from 'console';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const app = express();

// Set up email transporter
let transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service provider
  auth: {
      user: 'zestybuffalosaucepacket@gmail.com',
      pass: 'zrbmazkofvybdrpb'
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Create a Prisma client instance
const prisma = new PrismaClient();

// Register a new user
app.post('/user/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Create a new user
    await prisma.user.create({ data: { username, email, password } });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
app.post('/user/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Exclude password and other sensitive fields before sending
    const { password: _, ...safeUser } = user;
    return res.status(200).json({ message: 'Login successful', user: safeUser});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Forgot Login
app.post('/user/forgot', async (req, res) => {
  const { username } = req.body;
  try {
      console.log("in forgot ", username);
      
      // Find the user in the database
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
          return res.status(401).json({ error: 'Invalid username' });
      }

      // Generate a random token for the user
      const randomToken = crypto.randomBytes(32).toString('hex');

      // Create a JWT with an expiration date (e.g., 1 hour)
      const tokenExpiration = Math.floor(Date.now() / 1000) + (60 * 60);
      const jwtToken = jwt.sign({ 
          user: username, 
          token: randomToken 
      }, 'YOUR_SECRET_KEY', {
          expiresIn: tokenExpiration
      });

      // Send an email with the token link
      const resetLink = `localhost:3000/reset-password/${jwtToken}`;

      let mailOptions = {
          from: 'zestybuffalosaucepacket@gmail.com',
          to: user.email,
          subject: 'Password Reset Request',
          text: `Hello ${username},\n\nClick this link to reset your password: ${resetLink}\n\nIf you didn't request this, please ignore this email.`
      };

      console.log(mailOptions)

      transporter.sendMail(mailOptions);
    

      // Exclude password and other sensitive fields before sending
      const { password: _, ...safeUser } = user;
      return res.status(200).json({ message: 'Email sent successfully. Please check your inbox.', user: safeUser });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Update Password
app.post('/user/update-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required.' });
  }

  try {
    // Decode the JWT
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');

    // Get the username from the decoded JWT
    const username = decoded.user;

    // Find the user in the database using the username from the decoded JWT
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update the password in the database
    await prisma.user.update({
      where: { username: username },
      data: { password: newPassword }
    });

    return res.status(200).json({ message: 'Password updated successfully.' });

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});



app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});


export default app;