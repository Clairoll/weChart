import { config } from "../config.js";
const tips = {
  1: '抱歉出现一个错误', //默认错误提示
  1005: 'appkey无效',
  3000: '期刊不存在'
}
class HTTP {
  request({url,data={},method="GET"}){
    return new Promise((resolve,reject)=>{
      this._request(url, resolve, reject, data , method);
    })
  }

  _request(url,resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: config.api_base_url + url,
      method:method,
      data: data,
      header: {
        "content-type": "application/json",
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString();
        // 判断状态码是否是以2开头的，
        if (code.startsWith('2')) {
          // 先判断是否需要执行success回调，如果需要就执行&&后面的返回用户需要的数据
          resolve(res);
        } else {
          reject();
          // 调用成功，但没有拿到数据（也就是服务器异常）
          const error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        reject();
        // 获取数据失败，也就是服务器错误
        this._show_error(1);
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code];
    wx.showToast({
      // 错误信息
      title:tip?tip: tips[1],
      // 错误图标
      icon: 'none',
      // 错误提示消失时间2秒
      duration: 2000
    })
  }
}
export { HTTP }