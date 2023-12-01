module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.TEXT,
    password: DataTypes.TEXT,
    type: {
      type: DataTypes.TEXT,
    },
    description: DataTypes.TEXT,
    gender: DataTypes.TEXT,
    age: DataTypes.INTEGER,
  }, {
    timestamps: false, // desactiva las columnas createdAt y updatedAt
  });

  // Aquí puedes definir las asociaciones de tu modelo, si las hay

  return User;
};
