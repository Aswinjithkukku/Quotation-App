module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define("Country", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Country.associate = (models) => {
    Country.hasMany(models.Place, {
      onDelete: "cascade",
    });
    Country.hasMany(models.Airports, {
      onDelete: "cascade",
    });
    Country.hasMany(models.Hotels, {
      onDelete: 'cascade',
    });
    Country.hasMany(models.Excursions, {
      onDelete: 'cascade'
    });
  };

  return Country;
};
