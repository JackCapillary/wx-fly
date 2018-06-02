/* eslint-disable */
let api = {};
import Qs from "qs";
// const basePath = 'http://localhost:3000';//打包时候解开
const basePath = 'http://tantanwin.com:3000';//打包时候解开
function putApi(name, url, method) {
    if (!method) {
        method = 'post';
    }
    api[name] = (context, body, fun) => {
        context.axios[method](url, getCreds(body),
            {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                // timeout: 2000,
            }
        )
            .then((back) => {
                if (fun) {
                    fun(back)
                }
            })
            .catch((err) => {
                if(fun) {
                  fun(err)
                }
            })
    }
}
function getCreds(body) {
    return Qs.stringify(body)
}
putApi('users', basePath + '/users', 'post');
putApi('getData', basePath + '/users/getData?id=1', 'get');
putApi('delect', basePath + '/users/delect', 'post');
putApi('update', basePath + '/users/update', 'post');
// putApi('test', basePath1 + 'users/getUserInfo?id=1', 'get');
//获取微信openID
// putApi('start', basePath + 'start/returnMessage',10001,'post',false);

// 调用方式示例
// var body = {
// 	"jsurl": location.href.split('#')[0]
// };
// api.insertInfo(this, body, (res)=> {
//
// });
export default api;
