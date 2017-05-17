Page({
    data: {
        id: '',
        imgsrc: '',
        name: '',
        score: '',
        comment: '',
        cat: '',
        country: '',
        showing: '',
        duration: '',
        desc: '',
        dra: '',
        imax: '',
        threeD: '',
        hideText: true,
        hideClass: 'up',
        comments: [],
        photos: [],
        timed: '',
        zan: false,
        items0: [{
            image: "../../image/me.jpg",
            name: '高枫',
            work: '导演'
        }, {
            image: "../../image/me.jpg",
            name: '朱荣',
            work: '大魔王'
        }, {
            image: "../../image/me.jpg",
            name: '严律己',
            work: '男主角'
        }, {
            image: "http://p0.meituan.net/movie/fbe5f97c016c9f4520109dc70f458d4d83363.jpg",
            name: '节目组',
            work: '认真制作'
        }, {
            image: "http://p0.meituan.net/movie/fbe5f97c016c9f4520109dc70f458d4d83363.jpg",
            name: '朱荣',
            work: '猪脚'
        }, {
            image: "http://p0.meituan.net/movie/fbe5f97c016c9f4520109dc70f458d4d83363.jpg",
            name: '朱荣',
            work: '猪脚'
        }, {
            image: "http://p0.meituan.net/movie/fbe5f97c016c9f4520109dc70f458d4d83363.jpg",
            name: '朱荣',
            work: '猪脚'
        }, {
            image: "http://p0.meituan.net/movie/fbe5f97c016c9f4520109dc70f458d4d83363.jpg",
            name: '朱荣',
            work: '猪脚'
        }],
        items1: [{
            data: "3",
            title: "昨日票房排行"
        }, {
            data: "2579",
            title: "首周票房（万）"
        }, {
            data: "3734",
            title: "累计票房（万）"
        }]
    },
    onLoad: function(e) {
        // 生命周期函数--监听页面加载
        console.log(e)
        var that = this;
        var id = e.id;
        var td = e.td;
        console.log(id);
        var url = 'http://m.maoyan.com/movie/' + id + '.json';
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            header: { 'Content-type': 'application/json' },
            success: function(res) {
                var value = res.data.data.MovieDetailModel;
                console.log(value)
                let length = value.dra.length
                that.setData({
                    imgsrc: value.img,
                    name: value.nm,
                    score: value.sc,
                    comment: value.snum,
                    cat: value.cat,
                    country: value.src,
                    showing: value.rt,
                    duration: value.dur,
                    ver: value.ver,
                    dra: value.dra.substring(3, length - 4),
                    imax: value.imax,
                    photos: value.photos
                });
                var text = value.dra;
                var subtext = text.substring(3, text.length - 4);
                that.setData({ desc: subtext });
                /**
                 * 获取评论
                 */
                that.setData({
                    comments: res.data.data.CommentResponseModel.hcmts
                        // timed: res.data.data.CommentResponseModel.hcmts.time.substring(4, 9)
                })
                console.log(res.data.data.CommentResponseModel)
            }
        })
    },
    showall: function() {
        var that = this;
        var hide = that.data.hideText;
        var hideClass = that.data.hideClass == 'up' ? 'down' : 'up';
        that.setData({
            hideText: !hide,
            hideClass: hideClass
        })
    },
    zan: function(e) {
        let a = e.target.dataset.num
        let x = e.target.dataset.zan
        let c = this.data.comments
        if (x == 1) {
            x = 0;
        } else {
            x = 1;
        }
        c[a].zan = x;
        // console.log(a)
        // console.log(x)
        // console.log(c)
        // console.log(c.zan)
        this.setData({
            comments: c
        })
    }
})