// pages/allTopList/allTopList.js
import musicRequest from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listType:null,
    listIndex:0,
    tagId:0,
    songs:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const listType = await musicRequest.get('/style/list');
    if(listType){
      this.setData({
        listType:listType.data,
        tagId:listType.data[0].tagId
      })
    }
    await this.getSongsByTagId(this.data.tagId)
  },
  async getSongsByTagId(tagId){
    const songs = await musicRequest.get('/style/playlist',{tagId})
    if(songs){
      this.setData({
        songs:songs.data.playlist
      })
    }
  },
  async changeType(e){
    const index = e.currentTarget.dataset.index
    const tagId = e.currentTarget.dataset.tagid
    this.setData({
      listIndex:index,
      tagId:tagId
    })
    this.getSongsByTagId(tagId)
  },
  toList(e){
    wx.navigateTo({
      url: '/pages/songlist/songlist?id='+e.currentTarget.dataset.id,
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