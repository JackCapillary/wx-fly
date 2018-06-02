/**
 * Created by huygo on 2018/6/1.
 */
/* eslint-disable */
let api = {};
import Qs from "qs";
// const basePath = 'http://192.168.1.10:3000';//打包时候解开
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
