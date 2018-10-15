'use strict'
import SodiumTool from '../../utils/SodiumTool'

/**
 *  http request
 */
export default class HttpRequest{


    constructor() {
        this.mUrl = "";
        this.mMethod = 'POST';
        this.mHeaders = new Headers();
        // this.mHeaders.set("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        //application/json
        this.mHeaders.set("Content-Type","application/json");
        this.mHeaders.set("Accept","application/json");
        this.mParams = null;
        this.mJsonObject = null;
        this.mCallback = null;
        console.log("HttpRequest constructor");
    }

    // constructor(url, method='POST', headerHash, bodyHash) {
    //     console.log("HttpRequest constructor2");
    // }

    // constructor(url, headerHash, json) {
    //     console.log("HttpRequest constructor3");
    // }

    /**
     *  设置接口地址
     * @param { } url 
     */
    serverUrl(url){
        this.mUrl = url;
        console.log("Url:" +this.mUrl);
        return this;
    }

    contentType(contentType){
        this.mHeaders.set("Content-Type",contentType);
    }

    /**
     * 设置http方法
     * @param {*} method 
     */
    method(method){
        this.mMethod = method;
        return this;
    }

    /**
     * 增加http头
     * @param {} key 
     * @param {*} value 
     */
    header(key, value){
        if(this.mHeaders == null){
            this.mHeaders = new Headers()
        }
        this.mHeaders.set(key, value);
        console.log("headers:" + this.mHeaders);
        return this;
    }

    /**
     * 增加多个http头
     * @param {} hash 
     */
    headers(hash){
        if(this.mHeaders == null){
            this.mHeaders = hash;
        }
        else{
            hash.forEach(function (item, key, mapObj) {
                this.mHeaders.set(key, mapObj);
            });
        }
        console.log("headers:" + this.mHeaders);
        return this;
    }

    /**
     * 增加键值对参数
     * @param { } key 
     * @param {*} value 
     */
    param(key, value){
        if(this.mParams == null){
            this.mParams = new Map()
        }
        this.mParams.set(key, value);

        console.log("params:" + this.mParams);
        return this;
    }

    /**
     * 增加hash键值对参数
     * @param {} hash 
     */
    params(hash){
        if(this.mParams == null){
            this.mParams = hash;
        }
        else{
            hash.forEach(function (item, key, mapObj) {
                this.mParams.set(key, mapObj);
            });
        }
        console.log("params:" + this.mParams);
        return this;
    }

    /**
     * 增加json参数
     * @param {} jsonParam 
     */
    json(jsonParam){
        this.mJsonObject = jsonParam
        return this;
    }

    /**
     * 设置回调
     * @param { } cb 
     */
    callback(cb){
        this.mCallback = cb;
        return this;
    }

    /**
     *  开始请求,回调模式
     * @param {boolean} isEncrypt 
     */
    start(isEncrypt=true){

    }

    /**
     *  开始请求
     * @param {boolean} isEncrypt 
     */
    startAsync(isEncrypt=true){
        console.log("HttpRequest start1：" + isEncrypt);
        console.log("this.mUrl：" + this.mUrl);
        console.log("this.mMethod：" + this.mMethod);
        console.log("this.mHeaders：" + this.mHeaders);
        console.log("this.mParams：" + this.mParams);
       
        var thiz = this;
        var p = new Promise(function(resolve, reject){
            thiz._request(isEncrypt, resolve, reject);
        });

        return p;
    }

    _request(isEncrypt, resolve, reject){

        var bodyStr = this.mJsonObject != null ? this._encodeJsonParams() : this._encodeParams();

        if(isEncrypt){
            
            
            SodiumTool.encodeByClientSecretKey(bodyStr,
            "1989a1723bd706b4020ad1ef05c16c0cb9d1a36005efbe4aaab0f20fb9f5baf8",
             "316b1045a431941da1c6947c5fd3a8c45b01282003bd7673eef3c714cbe72702").then(([nonceB64, resultB64])=>{
                console.log("bodyStr0:" + nonceB64);
                this.mHeaders.set("x-client-nonce", nonceB64);
                this.mHeaders.set("x-client-pubkey", 
                "8919d83cdb4403067f20aae79f98d97cabd6f6f9ffb6c4b5ee7a4aa2cf466338");
            
                bodyStr = resultB64;
                console.log("bodyStr1:" + resultB64);
                console.log("bodyStr2:" + bodyStr);
                var myInit = {
                    method: this.mMethod,
                    headers: this.mHeaders,
                    mode: 'cors',
                    cache: 'default',
                    // redirect: 'follow', // manual, *follow, error
                    // referrer: 'no-referrer', // *client, no-referrer
                    // credentials: 'same-origin', // include, same-origin, *omit
                    body:bodyStr,
                    };

                    // fetch(this.mUrl,  {
                    //     method: this.mMethod,
                    //     headers: this.mHeaders,
                    //     mode: 'cors',
                    //     cache: 'default',
                    //     // redirect: 'follow', // manual, *follow, error
                    //     // referrer: 'no-referrer', // *client, no-referrer
                    //     // credentials: 'same-origin', // include, same-origin, *omit
                    //     body:bodyStr,
                    //     }).then(response => response.text).then(function(res) {
                        
                    //     resolve(res);
                    // });

                    this._requestReal(myInit, resolve, reject);
            });
        }
        else{
            var myInit = {
                method: this.mMethod,
                headers: this.mHeaders,
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // *client, no-referrer
                credentials: 'same-origin', // include, same-origin, *omit
                mode: 'same-origin',
                cache: 'default',
                body:bodyStr,
                };
            this._requestReal(myInit, resolve, reject);
        }

        
       
    }

    _requestReal(myInit, resolve, reject){
        fetch(this.mUrl, myInit).then(response => {
            const x_server_nonce = response.headers != null ? 
                response.headers.get("x-server-nonce") : null;
            response.text().then(function(res) {
            console.log('返回值[1代表登陆成功，0代表登陆失败]:')
            // console.log(res)
            // console.log(res.status);
            if(x_server_nonce != null){
                SodiumTool.decodeByServerPublicKey(res,  "1989a1723bd706b4020ad1ef05c16c0cb9d1a36005efbe4aaab0f20fb9f5baf8",
                "316b1045a431941da1c6947c5fd3a8c45b01282003bd7673eef3c714cbe72702",
                x_server_nonce).then((result)=>{
                    resolve(JSON.parse(result));
                });
            }
            else{
                resolve(res);
            }
            
        })});
    }

    _encodeJsonParams(){
        let strRet = "{}";
        if(this.mJsonObject != null)
            strRet = JSON.stringify(this.mJsonObject);
      console.log("_encodeJsonParams:" + strRet);
        return strRet;
    }

    _encodeParams(){
        let strRet = "";
        if(this.mParams != null){
            this.mParams.forEach(function (item, key, mapObj) {
                strRet+=key;
                strRet+="=";
                strRet+=mapObj;
                if(item < this.mParams.size() -1 ){
                    strRet+="&";
                }
            });
        }
        console.log("encodeParams:" + strRet);
        return strRet;
    }


}