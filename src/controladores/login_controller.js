const bcrypt = require('bcrypt');
const { User } = require('../models'); // Importa User desde models/index.js
var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();


const loginUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const user = await User.findOne({ where: { name: username } });

    if (!user) {
      ctx.status = 401;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      ctx.status = 401;
      ctx.body = { error: 'Contraseña incorrecta' };
      return;
    }

    // Aquí puedes generar un token de autenticación y enviarlo al cliente

    const expirationSeconds = 1 * 24 * 60 * 60; // 1 día
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    var token = jwt.sign(
      {scope: ['user']},
      JWT_PRIVATE_KEY,
      {subject: user.id.toString()},
      { expiresIn: expirationSeconds }
    );

    console.log(token);

    ctx.body = {
      message: 'Inicio de sesión exitoso',
      "access_token": token,
      "token_type": "Bearer",
      "expires_in": expirationSeconds
    };

    ctx.status = 200;
    
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Error al iniciar sesión' };
  }
};

const getAllUsers = async (ctx) => {
  try {
    const users = await User.findAll();
    console.log(users);
    ctx.body = users;
  } catch (error) {
    console.error(error);
  }
};

const getUserByUsername = async (ctx) => {
  try {
    const user = await User.findOne({ where: { name: ctx.params.username } });
    ctx.body = user;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (ctx) => {
  try {
    const updatedUser = ctx.request.body;
    const user = await User.findOne({ where: { name: ctx.params.username } });
    if (updatedUser.password && updatedUser.password !== user.password) {
      const hashedPassword = await bcrypt.hash(updatedUser.password, 10);
      updatedUser.password = hashedPassword;
    }
    await User.update(updatedUser, { where: { name: ctx.params.username } });
    ctx.status = 200;
  } catch (error) {
    console.error(error);
  }
};



const deleteUser = async (ctx) => {
  try {
    await User.destroy({ where: { name: ctx.params.username } });
    ctx.status = 200;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  loginUser,
  getAllUsers,
  getUserByUsername,
  updateUser,
  deleteUser
};


