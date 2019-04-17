import { config } from "../config.js";
const tips = {
  1: '抱歉出现一个错误', //默认错误提示
  1005: 'appkey无效',
  3000: '期刊不存在'
}
class HTTP {
  request(parms) {
    if (!parms.method) {
      parms.method = "GET";
    }
    wx.request({
      url: config.api_base_url + parms.url,
      method: parms.method,
      data: parms.data,
      header: {
        "content-type": "application/json",
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString();
        // 判断状态码是否是以2开头的，
        if (code.startsWith('2')) {
          // 先判断是否需要执行success回调，如果需要就执行&&后面的返回用户需要的数据
          parms.success && parms.success(res.data)
        } else {
          // 调用成功，但没有拿到数据（也就是服务器异常）
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
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
      title: tip ? tip : tips[1],
      // 错误图标
      icon: 'none',
      // 错误提示消失时间2秒
      duration: 2000
    })
  }
}
export { HTTP }