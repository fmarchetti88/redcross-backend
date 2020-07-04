const isInDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
module.exports = {
  HOST: isInDevelopment ? 'localhost' : 'us-cdbr-east-02.cleardb.com',
  USER: isInDevelopment ? 'root' : 'b10e7f2967e80d',
  PASSWORD: isInDevelopment ? 'password' : 'f7af71a4',
  DB: isInDevelopment ? 'redcross' : 'heroku_5de7c805f92998f',
  dialect: 'mysql',
  pool: {
    max: 25,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
