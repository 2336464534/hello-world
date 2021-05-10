const pool = require('../config/sqlconnect.js')

const query = function( sql, values ) {
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) { // 开启数据库
            if (err) {
                reject( err );
            } else {
                pool.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    // 结束会话
                    connection.release();
                });
            }
        });
    });
};

module.exports = query