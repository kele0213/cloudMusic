// pages/myInfo/myInfo.js
import musicRequest from '../../utils/request'
import moment from 'moment'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    ishidden:true,
    newUserName:"",
    placeholder:"请输入用户名",
    isBir:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      userInfo.birthday =  moment(userInfo.birthday).format('YYYY-MM-DD')
      this.setData({
        userInfo
      })
    }
  },
  hid(){
    this.setData({
      ishidden:true
    })
  },
  nohid(){
    this.setData({
      ishidden:false,
      placeholder:"请输入用户名",
      newUserName:"",
      isBir:false
    })
  },
  nohid2(){
    this.setData({
      ishidden:false,
      placeholder:"示例:2022-01-01",
      newUserName:"",
      isBir:true
    })
  },
  changeValue(e){
    const newUserName = e.detail.value
    this.setData({
      newUserName
    })
  },
  async changInfo(){
    const newUserName = this.data.newUserName
    const userInfo = this.data.userInfo

    if(this.data.isBir){
      const changeInfo = await musicRequest.localPost("/user/update",{
        phone:userInfo.phone,
        gender:userInfo.gender,
        nickname:userInfo.nickname,
        birthday:newUserName
      })
      console.log(changeInfo);
      if(changeInfo.code === 200){
        changeInfo.data.birthday =  moment(changeInfo.data.birthday).format('YYYY-MM-DD')
        this.setData({
          userInfo:changeInfo.data,
          ishidden:true
        })
        wx.setStorageSync('userInfo', changeInfo.data)
      }
    }else{
      const changeInfo = await musicRequest.localPost("/user/update",{
        phone:userInfo.phone,
        gender:userInfo.gender,
        nickname:newUserName,
        birthday:userInfo.birthday
      })
      if(changeInfo.code === 200){
        changeInfo.data.birthday =  moment(changeInfo.data.birthday).format('YYYY-MM-DD')
        this.setData({
          userInfo:changeInfo.data,
          ishidden:true
        })
        wx.setStorageSync('userInfo', changeInfo.data)
      }
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