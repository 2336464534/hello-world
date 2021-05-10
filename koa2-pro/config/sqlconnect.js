const mysql = require("mysql");
const { mysqldatabase } = require('./default.js')

let pool = mysql.createPool({
    host: mysqldatabase.HOST,   // 数据库的地址
    user: mysqldatabase.USERNAME,        // 数据库用户名
    password: mysqldatabase.PASSWORD,    // 数据库密码
    port: mysqldatabase.PORT,        // mysql数据库的端口号
    database: mysqldatabase.DATABASE     // 使用那个数据库
})

// 这里也可以像mongodb一样写返回参数，各种连接不成功的
console.log("数据库连接成功");

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

module.exports = pool;