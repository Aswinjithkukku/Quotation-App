module.exports = (sequelize, DataTypes) => {
    const Airports = sequelize.define("Airports", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
    },
    iata: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    })

    Airports.associate = (models) => {
        Airports.hasMany(models.Transfers, {
            onDelete: "cascade",
        })
      }

    return Airports
  }