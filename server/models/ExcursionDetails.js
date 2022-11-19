module.exports = (sequelize, DataTypes) => {
    const ExcursionDetails = sequelize.define("ExcursionDetails", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      timeFrom: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      timeTo: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
  
    return ExcursionDetails;
  };
  