const bcrypt = require('bcrypt');
const { User } = require('../models'); // Importa User desde models/index.js

const registerUser = async (ctx) => {
  const { username, password, type, description, gender, age} = ctx.request.body;
  console.log('Datos recibidos:', username, password, type, description, gender, age); // Aquí puedes ver los datos recibidos

  try {
    const existingUser = await User.findOne({ where: { name: username } });
    console.log('Usuario existente:', existingUser); // Aquí puedes ver si el usuario ya existe

    if (existingUser) {
      ctx.status = 400;
      ctx.body = { error: 'El nombre de usuario ya está en uso' };
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Contraseña cifrada:', hashedPassword); // Aquí puedes ver la contraseña cifrada
    const user = await User.create({ name: username, password: hashedPassword, type: type, description: description, gender: gender, age: age });
    console.log('Usuario creado:', user); // Aquí puedes ver el usuario creado

    ctx.status = 201;
    ctx.body = { message: 'Registro exitoso', user };
    console.log('Registro exitoso');
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Error al registrarse' };
  }
};


module.exports = {

  registerUser,
};
