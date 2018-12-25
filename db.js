//mysql
const mysql = require('mysql');
const { dbConfig } = require('./config');
let pool = mysql.createPool(dbConfig);

//封装一个简易的q函数
let obj = {};
obj.q = function(sql,dataArr) {
  return new Promise(function(resolve,reject){
    pool.getConnection(function(err, connection) {
      if (err) {// 链接异常
        reject(err);
        return;
      }
      //调试语句
      console.log(sql,dataArr);
      //使用链接
      connection.query(sql,dataArr, function (error, results, fields) {
        // 释放链接回链接池
        connection.release();
        // 释放后的错误处理
        if (error) {
          reject(err);
          return;
        }
        //console.log(results);
        resolve(results);
      });
    });
  })
}
//将obj返回出去
module.exports = obj;


/*  不建议企业开发
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'secret',
  database: 'my_db'
})
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
*/
