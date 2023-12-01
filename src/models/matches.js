module.exports = (sequelize, DataTypes) => {
    const Matches = sequelize.define('Matches', {
        username: DataTypes.STRING,
        job_offer_name: DataTypes.STRING,
        job_offer_id : DataTypes.INTEGER,
        match: DataTypes.BOOLEAN
    }, {
        timestamps: false, // desactiva las columnas createdAt y updatedAt
    });

    Matches.associate = function(models) {
        Matches.belongsTo(models.JobOffer, {
          foreignKey: 'job_offer_id',
          as: 'jobOffer'
        });
      };
      
    return Matches;
};
