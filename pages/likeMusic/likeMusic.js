// pages/infoMusic/infoMusic.js
import musicRequest from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    options.id = JSON.parse(options.id)
    const ids = options.id.join(",")
    const song = await musicRequest.get('/song/detail',{ids:ids})
    this.setData({
      songList:song.songs
    })
  },
  toMusic(e){
    const id = e.currentTarget.dataset.id
    const track = e.currentTarget.dataset.track 
    let playingList = wx.getStorageSync('playingList')
    if(playingList){
      playingList.push(track)
    }else{
      playingList = [track]
    }
    wx.setStorageSync('playingList', playingList)
    wx.navigateTo({
      url: '/pages/music/music?id='+id,
    })
  },
  bofangAll(e){
    if(this.data.songList){
      let id = this.data.songList[0].id
      wx.setStorageSync('playingList', this.data.songList)
      wx.navigateTo({
        url: '/pages/music/music?id='+id,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})