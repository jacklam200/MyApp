'use strict'
import Base64 from 'base64-js'
import Sodium from 'react-native-sodium'
import StringUtils from '../utils/StringUtils'

/**
 *  
 */
export default class SodiumTool{

    /**
     * 加密方式：己方密钥+对方公钥
     * @param encodedParams string
     * @param cSecretKey string
     * @param sPublicKey string 
     * @return nonce and encrypt text
     */
    static encodeByClientSecretKey(encodedParams, cSecretKey, sPublicKey){
        // 定义一个 promise 对象
        const promise = new Promise((resolve, reject) => {
            // 填充，并生成nonce
            Sodium.randombytes_buf(Sodium.crypto_box_NONCEBYTES)
            .then((nonceB64)=>{
                // 用生成nonce进行加密
                console.log('noonce:'+ nonceB64);
                SodiumTool._encode(encodedParams, cSecretKey, sPublicKey, nonceB64, resolve, reject);
            });
            
        })
        // 返回 promise 对象
        return promise;
    }


    /**
     *  通过服务端公钥解密
     * @param ciphertext string
     * @param cSecretKey string
     * @param sPublicKey string
     * @param nonce string 
     * @return text
     */
    static decodeByServerPublicKey(ciphertext, cSecretKey, sPublicKey, nonce){
        // 定义一个 promise 对象
        const promise = new Promise((resolve, reject) => {

            // 1c2f4ddfa053b682a13c43fca7f82782438078ce29e1dab10857813c336f71e8
            let alice_secretkey = StringUtils.hexStringToBytes(cSecretKey);
            // a6fac5cb60f64f886f74a7fb4601ee5068b04affc768048c6506faac757f8c41
            let bob_publickey =  StringUtils.hexStringToBytes(sPublicKey);// pk

            Sodium.crypto_box_open_easy(ciphertext,nonce,Base64.fromByteArray(bob_publickey),
                    Base64.fromByteArray(alice_secretkey))
                        .then((resultB64) => {
                            console.log("decode result base64:" + resultB64);
                            let source = Base64.toByteArray(resultB64);
                            let sourceStr = StringUtils.byteToString(source);
                            console.log("decode result :" + sourceStr);
                            resolve(sourceStr);
                        });
        });
        // 返回 promise 对象
        return promise;
    }

    
    /**
     * 加密
     * @param {string} encodedParams 
     * @param {string} cSecretKey 
     * @param {string} sPublicKey 
     * @param {string} nonceB64 
     * @param {promise} resolve 
     * @param {promise} reject 
     * @returns nonceb64 resultb64
     */
    static _encode (encodedParams,cSecretKey, sPublicKey, nonceB64, resolve, reject){
        let alice_secretkey = StringUtils.hexStringToBytes(cSecretKey);
        console.log('alice_secretkey:' + alice_secretkey);
        let bob_publickey =  StringUtils.hexStringToBytes(sPublicKey);// pk
        console.log('bob_publickey:' + bob_publickey); 
        let rawText = StringUtils.stringToByte(encodedParams);
        console.log("raw text:" + encodedParams);
        Sodium.crypto_box_easy(Base64.fromByteArray(rawText),nonceB64,
        Base64.fromByteArray(bob_publickey),
        Base64.fromByteArray(alice_secretkey)).
            then((resultB64) =>{
                console.log("result:" + resultB64);
                // callback 中去执行 resolve 或者 reject
                resolve([nonceB64, resultB64]);
            });
          
    }

    

} 





