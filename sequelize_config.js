const DB_HOST = 'localhost';
const DB_NAME = 'redcross';
const DB_USER = 'root';
const DB_PWD = 'password';

module.exports = {
    getDbHost: function() { return DB_HOST; },
    getDbName: function() { return DB_NAME; },
    getDbUser: function() { return DB_USER; },
    getDbPwd: function() { return DB_PWD; }    
};