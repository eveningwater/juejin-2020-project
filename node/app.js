const superagent = require('superagent');
const express = require('express');
const app = express();
const port = 8081;
function isObject(value) {
    return value && typeof value === 'object';
}
function getApi(url, params,method) {
    return new Promise((resolve) => {
        if (!isObject(params)) {
            return resolve(setResponse(400, null, '请传入参数!'));
        } else {
            let paramMethod = method.toLowerCase() === 'post' ? 'send' : 'query';
            superagent(method,url)[paramMethod](params).set('X-Agent', 'Juejin/Web').end((err, supRes) => {
                if (err) {
                    return resolve(setResponse(400, null, err));
                }
                let data = JSON.parse(supRes.text);
                resolve(setResponse(data.err_no === 0 ? 200 : data.err_no, data.data, data.err_msg));
            });
        }
    })
}
app.use(express.json());
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options') {
        res.send(200);
    } else {
        next();
    }

});
function setResponse(code, data, message) {
    return {
        code: code,
        data: data,
        message: message
    }
}
app.post('/info', (req, res) => {
    const params = req.body;
    getApi('https://api.juejin.cn/list_api/v1/annual/info', params,'post').then(data => {
        res.send(JSON.stringify(data));
    })
})
app.post('/list', (req, res) => {
    const params = req.body;
    getApi('https://api.juejin.cn/list_api/v1/annual/list', params,'post').then(data => {
        res.send(JSON.stringify(data));
    });
})

app.get('/user',(req,res) => {
    const params = req.query;
    getApi('https://api.juejin.cn/user_api/v1/user/get',params,'get').then(data => {
        res.send(JSON.stringify(data));
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
