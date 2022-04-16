module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
            unique: true,
                validate: {
                    isUnique: (value, next) => {
                      Users.findAll({
                        where: { name: value },
                        attributes: ['id'],
                      })
                        .then((user) => {
                          if (user.length != 0)
                            next(new Error('name already in use!'));
                          next();
                        })
                        .catch((onError) => console.log(onError));
                    },
                  },
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
                validate: {
                    isUnique: (value, next) => {
                        Users.findAll({
                        where: { email: value },
                        attributes: ['id'],
                      })
                        .then((user) => {
                          if (user.length != 0)
                            next(new Error('email address already in use!'));
                          next();
                        })
                        .catch((onError) => console.log(onError));
                    },
                  },
        },
        password: {
            type: Sequelize.STRING,

        },
        no_telephone: {
            type: Sequelize.INTEGER,
            unique: true,
                validate: {
                    isUnique: (value, next) => {
                        Users.findAll({
                        where: { no_telephone: value },
                        attributes: ['id'],
                      })
                        .then((user) => {
                          if (user.length != 0)
                            next(new Error('phone_number already in use!'));
                          next();
                        })
                        .catch((onError) => console.log(onError));
                    },
                  },
        },
        isAdmin: {
          type: Sequelize.STRING,
          defaultValue: 'user',
      },
        refresh_token: {
            type: Sequelize.TEXT
        },
    },{
        freezeTableName:true
    });
    return Users;
}