let app = getApp()

// getApp() 全局函数，一个页面page 由wxml,wxss,js,即MVC组成。
// ovt 数据模型层

Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        checked: true,
        isleft: true,
        city: "南昌",
        id: '',
        items: [],
        items0: [],
    },

    // 页面加载完成后
    onLoad: function() {
        // 发送请求获取数据
        console.log('Onload');
        // wx 是微信的缩写
        var that = this;

        wx.request({
            url: "https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000",
            data: {},
            method: 'GET',
            header: { 'Content-type': 'application/json' },
            success: function(res) {
                console.log(res)
                console.log(res.data.data.movies)
                that.setData({
                    items: res.data.data.movies,
                    items0: res.data.data.movies,
                    id: res.data.data.movies.id
                })
            }
        })
    },

    onShow: function() {
        console.log('Onshow')
        let that = this;
        wx.getStorage({
            key: 'key',
            success: function(res) {
                console.log(res.data.cardmes.city);
                that.setData({
                    city: res.data.cardmes.city,
                })

            }
        })
    },
    swiperchange: function(e) {
        console.log(e.detail.current);
    },
    bindViewTap: function(e) {
        console.log('item clicked');
    },
    tabChangehot: function() {
        this.setData({
            isleft: true
        })
    },
    tabChangewaiting: function() {
        this.setData({
            isleft: false
        })
    },
    goLocaltion: function() {
        wx.navigateTo({
            url: "/pages/switchcity/switchcity"
        })
    },
    BuyIt: function(res) {
        var id = res.currentTarget.id;
        var td = res.target.dataset.td;
        console.log(id)
        console.log(td)
        wx.navigateTo({
            url: '/pages/index/index?id=' + id,
        })
    },
    doIt: function(e) {
        let a = e.target.dataset.num
        let x = e.target.dataset.zan
        let c = this.data.items0
        x = !x;
        c[a].zan = x;
        // console.log(a)
        // console.log(x)
        // console.log(c)
        // console.log(c.zan)
        this.setData({
            items0: c
        })
    }
})