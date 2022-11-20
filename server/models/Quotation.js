module.exports = (sequelize, DataTypes) => {
    const Quotation = sequelize.define("Quotation", {
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
    // Quotation.associate = (models) => {
    //   Place.hasMany(models.Hotels);
    //   Place.hasMany(models.Transfers);
    //   Place.hasMany(models.Excursions);
      
    // };

    return Quotation;
  };