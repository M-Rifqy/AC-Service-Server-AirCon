const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAlias: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
    });

sequelize.authenticate()
.then(() => {
        console.log('connected..')
    })
.catch(err => {
        console.log('Error'+ err)
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// define semua models yang ada pada aplikasi
db.users = require('./user.model')(sequelize, Sequelize);
db.order = require('./order.model')(sequelize, Sequelize);


// 1 to Many Relation

db.users.hasMany(db.order, {
    foreignKey: 'user_id',
    as: 'order'
})


db.order.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'user'
})

module.exports = db;