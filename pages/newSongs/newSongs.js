// pages/newSongs/newSongs.js
import moment from 'moment'
import musicRequest from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    newSongs:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const date = +new Date()
    let time = moment(date).format('M月DD日更新')
    this.setData({
      date:time
    })

    let newSongs = await musicRequest.get('/personalized/newsong')
    if(newSongs){
      this.setData({
        newSongs:newSongs.result
      })
    }
    // console.log(this.data.newSongs);

  },
  async toMusic(e){
    const id = e.currentTarget.dataset.id
    let song = await musicRequest.get("/song/detail",{ids:id})
    if(song){
      song = song.songs[0]
    }
    let playingList = wx.getStorageSync('playingList')
    if(playingList){
      playingList.push(song)
    }else{
      playingList = [song]
    }
    wx.setStorageSync('playingList', playingList)
    wx.navigateTo({
      url: '/pages/music/music?id='+id,
    })
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