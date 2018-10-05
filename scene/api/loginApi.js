import React from 'react';
import Constants from '../constants/constants'

export default class LoginApi {

    static async login(onCallbackHandler) {
        try {
          // 注意这里的await语句，其所在的函数必须有async关键字声明
          let response = await fetch(
            Constants.login
          );
          console.info(response);
          let responseJson = await response.json();
          onCallbackHandler(responseJson)
          return responseJson;
        } catch (error) {
          console.info(error);
        }
    };
    
}