// pages/toplist/toplist.js
import musicRequest from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList:null,
    authorityList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const topList = await musicRequest.get('/toplist')
    if(topList){
      this.setData({
        topList:topList.list
      })
    }
    const num = 4 // 官方榜个数
    let index = 0
    let result = []

    while (index < num){
      const tracksList = await musicRequest.get('/playlist/detail',{id:topList.list[index].id})
      result.push({name:topList.list[index].name,id:topList.list[index].id,tracks:tracksList.playlist.tracks.splice(0,3)})
      index++
    }
    this.setData({
      authorityList:result
    })
    console.log(result);
  },
  toList(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/songlist/songlist?id='+id,
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