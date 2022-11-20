module.exports = (sequelize, DataTypes) => {
    const ExcursionBookings = sequelize.define("ExcursionBookings", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      peoples: {
        type: DataTypes.INTEGER,
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
      place: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      excusrionName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
    // ExcursionBookings.associate = (models) => {
    //   ExcursionBookings.hasMany(models.Hotels);
    // };

    return ExcursionBookings;
  };