const userDB = require('../db');

module.exports = {
  findUserByUsername: username => userDB.q('select * from users where username = ?',[username]),
  addUser:userprops => userDB.q('insert into users (username, password, email) values (?,?,?)', userprops),
};
