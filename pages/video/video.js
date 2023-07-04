import musicRequest from '../../utils/request'

const backgroundAudio = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvList:null,
    videoCtx:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    backgroundAudio.pause()
    wx.setStorageSync('isPlay', false)
    // /top/mv  /mv/exclusive/rcmd
    let mvs = await musicRequest.get("/top/mv")
    mvs = mvs.data
    let result = []
    for(let i=0;i<mvs.length;i++){
      const mvUrl = await musicRequest.get("/mv/url",{
        id:mvs[i].id
      })
      result.push({
        name:mvs[i].name,
        artist:mvs[i].artistName,
        url:mvUrl.data.url
      })
    }
    this.setData({
      mvList:result,
      videoCtx:wx.createVideoContext('myVideo0', this)
    })
    this.data.videoCtx.play()
  },
  changeVideo(e){
    const index = e.detail.current
    this.data.videoCtx.stop()
    this.setData({
      videoCtx:wx.createVideoContext('myVideo'+index, this)
    })
    this.data.videoCtx.play()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})