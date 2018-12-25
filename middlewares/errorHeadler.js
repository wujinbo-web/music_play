
module.exports = async (ctx, next) => {
  //第一个执行,让后续先执行，出现异常，我来catch
  try{
    await next();
  }catch(err){
    console.log(err);
    ctx.body = `
      <div>
        对不起您访问的数据出现了异常
      </div>
    `;
  }
}
