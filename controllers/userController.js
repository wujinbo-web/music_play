const obj = {};
const userModel = require('../models/userModel');

/*
  判断是否可以注册
*/
obj.checkUsername = async (ctx, next)=>{
  //1:接受请求体的username
  let { username } = ctx.request.body;
  //2:根据username查询数据库
  let users = await userModel.findUserByUsername(username);
  //3:根据查询结果来响应客户端 ctx.body={code:'001'}
  if(users.length === 0){
    ctx.body = { code: '001', msg: '可以注册' }
    return;
  }
  ctx.body = { code: '002', msg: '用户名已经存在' }
}

/*
  判断是否可以注册，可以注册就插入一条数据
*/
obj.doRister = async ctx => {
  //1接受请求体的数据
  let { username, password, email, v_code } = ctx.request.body;
  //2先判断v_code，因为其不用查询db
  //3验证邮箱是否合法
  //4根据用户名查询出数据，判断该用户是否存在
  let users = await userModel.findUserByUsername(username);
  if(users.length !== 0){
    //5如果存在，响应code:'002'
    ctx.body = { code: '002', msg: '用户名已经存在' }
    return;
  }
  //6如果不存在，向数据库插入该数据
  let result = await userModel.addUser([username,password,email]);
  //7响应状态码001
  console.log(result);
  //判断插入数据是否成功
  if(result.affectedRows !== 1){
    ctx.throw(result.message);
  }
  ctx.body = {
    code: '001', msg: '注册成功',
  }
}
module.exports = obj;
