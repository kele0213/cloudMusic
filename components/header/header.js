// components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:"标题"
    },
    url:{
      type:String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toUrl(){
      wx.navigateTo({
        url: this.properties.url,
      })
    }
  }
})
