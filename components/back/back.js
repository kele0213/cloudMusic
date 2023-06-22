// components/back/back.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    black:{
      type:String
    },
    sty:{
      type:String
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
    goBack(){
      wx.navigateBack({
        delta: 1
      });
    }
  },
})
