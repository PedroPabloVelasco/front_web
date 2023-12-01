module.exports = (sequelize, DataTypes) => {
    const JobOffer = sequelize.define('JobOffer', {
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      company: DataTypes.TEXT,
      location: DataTypes.TEXT,
      salary: DataTypes.NUMBER,
      employer: DataTypes.TEXT,
    }, {
      timestamps: false, // desactiva las columnas createdAt y updatedAt
    });
  
    // Aquí puedes definir las asociaciones de tu modelo, si las hay
  
    return JobOffer;
  };
  