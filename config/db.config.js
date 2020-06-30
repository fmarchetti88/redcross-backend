module.exports = {
  HOST: 'us-cdbr-east-02.cleardb.com',
  USER: 'b10e7f2967e80d',
  PASSWORD: 'f7af71a4',
  DB: 'heroku_5de7c805f92998f',
  dialect: 'mysql',
  pool: {
    max: 25,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
