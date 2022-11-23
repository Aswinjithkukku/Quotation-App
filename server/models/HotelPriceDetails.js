
module.exports = (sequelize, DataTypes) => {
    const HotelPriceDetails = sequelize.define("HotelPriceDetails", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
    },
    fromDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    toDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    individuals: {
        type: DataTypes.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('individuals'))
        },
        set: function (individuals) {
            this.setDataValue('individuals', JSON.stringify(individuals));
        }
    },
    })


    return HotelPriceDetails
  }