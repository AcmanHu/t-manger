import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import VueCookies from 'vue-cookies'
import router from '../../router';
Vue.use(VueCookies)
// Vue.use(axios)
Vue.use(VueAxios,axios);
Vue.use(qs)
axios.interceptors.request.use((config)=> {
    config.headers['X-TOKEN'] = `${VueCookies.get('token')}`
    return config;
  }, (error)=> {
    // 对请求错误做些什么
    // console.log(error)
    return Promise.reject(err)
  })
  axios.interceptors.response.use(function (response) { 
        return response
    }, function (error) {
        return Promise.reject(error)
    })

var hutn = {
    //post请求登陆接口
    httpLoginPost (url, params, callback, errorback) {
        axios.post(url,qs.stringify(params))
            .then(function (response) {
                callback(response.data)
            })
            .catch(function (error) {
                errorback(error)
            }
        );
   },
   //post请求
    httpPost (url, params, callback) {
        axios.post(url,qs.stringify(params))
            .then(function (response) {
                callback(response.data)
            })
            .catch(function (error) {
                callback(error.data)
            }
        );
   },
   //post请求发送文件
   httpPostfile (url, params, callback) {
    axios.post(url,{
        headers:{
            "Content-Type": "multipart/form-data"
        },
        params: {
            file: params
        }
        
    })
        .then(function (response) {
            callback(response.data)
        })
        .catch(function (error) {
            callback(error.data)
        }
        );
    },
    //验证token的有效性
    httptokenGet (url, params, callback,errorback) {
        axios.get(url,{
                params:params,
                })
                .then(function (response) {
                    callback(response.data)
                })
                .catch(function (error) {
                    errorback(error)
                }
            );
    }, 
    //get请求
    httpGet (url, params, callback) {
        axios.get(url,{
            params:params,
            })
            .then(function (response) {
                callback(response.data)
            })
            .catch(function (error) {
                callback(error.data)
            }
        );
    }, 
    //put请求
    httpPut (url, params, callback) {
    axios.put(url+'?'+qs.stringify(params))
            .then(function (response) {
                callback(response.data)
            })
            .catch(function (error) {
                callback(error.data)
            }
        );
    }, 
    //delete请求
    httpDelete (url, callback) {
        axios.delete(url)
            .then(function (response) {
                callback(response.data)
            })
            .catch(function (error) {
                callback(error.data)
            }
        );
    },
}
export default hutn;