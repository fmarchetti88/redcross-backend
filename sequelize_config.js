module.exports = {
    getDbHost: function() { return process.env.DB_HOST; },
    getDbName: function() { return process.env.DB_NAME; },
    getDbUser: function() { return process.env.DB_USER; },
    getDbPwd: function() { return process.env.DB_PWD; }    
};