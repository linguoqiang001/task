var baseUrl = 'https://www.zilii.top/task/'

var requestHandler = {
  url:'',
  params: {},
  success: function (res) {
    // success
  },
  fail: function (err) {
    // fail
  }
}

//GET请求
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求
function POST(requestHandler) {
  request('POST', requestHandler)
}

function request(method, requestHandler) {
  //注意：可以对params加密等处理
  var params = requestHandler.params;
  var url=requestHandler.url;
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: baseUrl+url,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      //注意：可以对参数解密等处理
      wx.hideLoading();
      requestHandler.success(res)
    },
    fail: function (err) {
      wx.hideLoading({
        success:function(){
          wx.showToast({
            title: '网络异常',
            icon: 'none',
            duration: 2000
          })
        }
      });
      requestHandler.fail(err);
    },
    complete: function () {
      // complete
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST
}
