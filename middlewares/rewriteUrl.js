module.exports = function(rules){
  // {src: '/c', dist: '/d'},
  // {regex: /\/public\/(.*)/}
  return async (ctx,next) => {
      //判断请求是否是以public开头
      rules.forEach(rule=>{
        //判断是否有正则的处理
        if(rule.regex){
          let result = rule.regex.exec(ctx.url);
          if(result){
            //判断是否有dist 属性，如果有就整个赋值
            if(rule.dist){
              ctx.url = rule.dist;
            }else{
              //如果匹配上就修改
              ctx.url = '/'+result[1];
            }

          }
        }
        //处理src => dist
        if(ctx.url === rule.src){
          ctx.url = rule.dist;
        }
      })
      //经过一堆的规则匹配以后，最终放行
      await next();
  }
}
