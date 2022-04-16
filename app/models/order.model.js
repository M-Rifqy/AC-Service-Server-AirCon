module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define('order', {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.INTEGER
        },
        address: {
            type: Sequelize.TEXT
        },
        date: {
            type: Sequelize.TEXT
        },
        message: {
            type: Sequelize.TEXT
        },
    },{
        freezeTableName:true
    });
    return Orders;
}