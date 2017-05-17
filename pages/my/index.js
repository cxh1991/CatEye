//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        latitude: 23.099994,
        longitude: 113.324520,
        userInfo: {},
        source: 'github.com/yanlvji'
    },
    onLoad: function() {
        // 小程序中获取用户的身份
        console.log('load');
        app.getUserInfo((data) => {
            this.setData({
                userInfo: data
            })
        })
    },
    onReady: function() {
        console.log('ready');
        wx.setNavigationBarTitle({
            title: '我的'
        })
        this.mapCtx = wx.createMapContext('myMap')
        wx.getLocation({
            type: 'wgs84',
            success: (res) => {
                var latitude = res.latitude
                var longitude = res.longitude
                this.setData({
                    latitude,
                    longitude
                })
            }

        })

    },
    getCenterLocation: function() {
        this.mapCtx.getCenterLocation({
            success: function(res) {
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },
    moveToLocation: function() {
        this.mapCtx.moveToLocation()
    }
})