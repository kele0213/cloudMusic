// pages/register/register.js
import musicRequest from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    checkpassword:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  changeUserName(e){
    const username = e.detail.value
    this.setData({
      username
    })
  },
  changePassWord(e){
    const password = e.detail.value
    this.setData({
      password
    })
  },
  changeCheckPassWord(e){
    const checkpassword = e.detail.value
    this.setData({
      checkpassword
    })
  },
  async reset(){
    const username = this.data.username
    const password = this.data.password
    const checkpassword = this.data.checkpassword
    let register = null;
    if(password === checkpassword){
       register = await musicRequest.localPost("/user/register",{
        phone:username,
        password,
        checkPassword:checkpassword,
        type:1
      })
    }else{
      wx.showModal({
        title: '错误',
        content: '重复密码错误'
      })
    }
    if(register){
      if(register.status===500){
        wx.showModal({
          title: '错误',
          content: '手机号重复或错误'
        })
      }else if(register.code===200){
        wx.showModal({
          title: '成功',
          content: '重置密码成功！',
          complete: (res) => {
            if (res.cancel) {
              wx.switchTab({
                url: '/pages/personal/personal',
              })
            }
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/personal/personal',
              })
            }
          }
        })
        wx.setStorageSync('userInfo', register.data)
      }
    }
    console.log(register);
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