Page({
    data: {
        infos: [],
        id: '',
        threeD: true
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        var that = this;
        wx.request({
            url: 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000',
            data: {},
            method: 'GET',
            success: function (res) {
                // success
                // console.log(res);
                // console.log(res);
                that.setData({
                    infos: res.data.data.movies
                })
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
    detail: function (res) {
        var id = res.currentTarget.id;
        wx.navigateTo({
            url: '../moviedetail/moviedetail?id=' + id
        })
        // console.log(e);
    }
})
