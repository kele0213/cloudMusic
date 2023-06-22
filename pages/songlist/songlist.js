// pages/songlist/songlist.js
import musicRequest from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList:null,
    songDetailInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 获取歌单详情
    const songList = await musicRequest.get('/playlist/detail',{id:options.id})
    const songDetailInfo = await musicRequest.get('/playlist/detail/dynamic',{id:options.id})
    if(songList){
      this.setData({
        songList:songList.playlist
      })
    }
    if(songDetailInfo){
      this.setData({
        songDetailInfo
      })
    }
    // console.log(songList);
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
      url: '/pages/music/music?id=' + id
    })
  },
  toMusicAll(){
    if(this.data.songList){
      const tracks = this.data.songList.tracks
    const id = tracks[0].id
    wx.setStorageSync('playingList', tracks)
    wx.navigateTo({
      url: '/pages/music/music?id=' + id
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