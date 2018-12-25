let config = {};

config.rewriteUrlList=[
  {src: '/', dist: '/user/login'},
  {src: '/a', dist: '/user/login'},
  {regex: /^\/public\/(.*)/},
  {regex: /^\/xx/, dist: '/user/login'},
];

config.port = 8888;

config.dbConfig={
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'node_music'
};

module.exports = config;
