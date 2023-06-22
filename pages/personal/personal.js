import musicRequest from "../../utils/request";

// pages/personal/personal.js
const app = getApp()
let timer = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    historyList:null,
    likeList:null,
    historyUrl:null,
    likeUrl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo);
    if(userInfo){
      this.setData({
        userInfo
      })
      const historyMusic = await musicRequest.localGet("/song/recently/play",{
        uid:userInfo.uid,
        limit:10,
        type:0
      })
      this.setData({
        historyList:historyMusic.data
      })
      if(historyMusic){
        const historySong = await musicRequest.get('/song/detail',{ids:this.data.historyList[0]})
        if(historySong){
          this.setData({
            historyUrl:historySong.songs[0].al.picUrl
          })
        }
      }
      const likeMusic = await musicRequest.localGet("/song/recently/play",{
        uid:userInfo.uid,
        limit:10,
        type:1
      })
      this.setData({
        likeList:likeMusic.data
      })
      if(likeMusic){
        const likeSong = await musicRequest.get('/song/detail',{ids:this.data.likeList[0]})
        if(likeSong){
          this.setData({
            likeUrl:likeSong.songs[0].al.picUrl
          })
        }
      }
    }
    
  },
  // setTime(){
  //   const that = this
  //   timer = setInterval(function(){
  //     const userInfo = wx.getStorageSync('userInfo')
  //     if(userInfo){
  //       that.setData({
  //         userInfo
  //       })
  //       clearInterval(timer)
  //       const historyMusic = musicRequest.localGet("/song/recently/play",{
  //         uid:userInfo.uid,
  //         limit:10,
  //         type:0
  //       }).then((res)=>{
  //         that.setData({
  //           historyList:[...new Set(res.data)]
  //         })
  //       })
  //     }
  //   },1000)
  // },
  toLogin(){
    if(!this.data.userInfo){
      // this.setTime()
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  edit(){
    if(!this.data.userInfo){
      // this.setTime()
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      // 跳转到编辑资料页
      wx.navigateTo({
        url: '/pages/myInfo/myInfo',
      })
    }
  },
  toHistory(){
    // console.log(1);
    if(this.data.historyList){
      wx.navigateTo({
        url: '/pages/historyMusic/historyMusic?id='+JSON.stringify(this.data.historyList),
      })
    }
  },
  toLike(){
    if(this.data.likeList){
      wx.navigateTo({
        url: '/pages/likeMusic/likeMusic?id='+JSON.stringify(this.data.likeList),
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
    this.onLoad()
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