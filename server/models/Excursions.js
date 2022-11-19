module.exports = (sequelize, DataTypes) => {
    const Excursions = sequelize.define("Excursions", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      excursions: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      descriptions: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      place: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
  
    Excursions.associate = (models) => {
      Excursions.hasMany(models.ExcursionDetails, {
        onDelete: "cascade",
      });
    };
  
    return Excursions;
  };
  