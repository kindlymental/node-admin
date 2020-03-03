const mysql = require('mysql')
const config = require('./config')
const { debug } = require('../utils/constant')

function connect() {
    return mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        multipleStatements: true
    })
}

function querySql(sql) {
    const conn = connect()
    return new Promise((resolve, reject) => {
        try {
            debug && console.log(sql)
            conn.query(sql, (err, results) => {
                if (err) {
                    debug && console.log('查询失败:', JSON.stringify(err))
                    reject(err)
                } else {
                    debug && console.log('查询成功:', JSON.stringify(results))
                    resolve(results)
                }
            })
        } catch (e) {
            reject(e)
        } finally {
            conn.end()
        }
    })
}

module.exports = {
    querySql
}