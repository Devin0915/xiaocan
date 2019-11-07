// 环境配置文件
let env = "localhost"; //环境名称变量
const config = {
    localhost:{
        domain:'localhost', 
        server: "/local",
    },
    dev: {
        domain: "xc.dev.patozon.net", //本地环境，服务器地址需要在host配置
        server: "http://xc.dev.patozon.net",
    },
    test: { // 测试环境
        domain: "xc.test.patozon.net", // 域名
        server: "http://xc.test.patozon.net", // 服务器地址
    },
    pre: { //预发布环境
        domain: "pre.test.patozon.net", // 域名
        server: "http://pre.test.patozon.net", // 服务器地址
    },
    prod: { //生产环境
        domain: "xc.patozon.net",
        server: "http://xc.patozon.net",
    }
};

//根据域名判断环境
let hostname = location.hostname;
for (let i in config) {
    if (config[i].domain === hostname) {
        env = i;
        break;
    }
}

export default {
    cokieDomain: config[env].domain,
    serverPath: {
        server: config[env].server,
    }
   
};