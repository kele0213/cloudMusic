import musicRequest from '../../utils/request'

let currentIndex = 0; //当前榜单索引
let allTopList = []; //完整榜单数据
let test = 0;
let searchTopList = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    recommendList:[],
    topList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if(test==0){
      wx.clearStorageSync()
      test = 1
    }
    // 轮播图
    let bannerList = await musicRequest.get('/banner',{type:1})
    // 推荐歌单
    let recommendList = await musicRequest.get('/personalized')
    // 排行榜
    let topList = await musicRequest.get('/topList')
    topList.list.splice(8)
    // 给排行榜增加歌曲信息
    let allList = []
    let index = 0
    while(index<8){
      let topMusicList = await musicRequest.get('/playlist/detail',{id:topList.list[index].id})
      let playList = topMusicList.playlist
      allTopList.push(playList.tracks)
      allList.push({
        name:playList.name,
        id:playList.id,
        tracks:playList.tracks.slice(0,3)
      })
      searchTopList.push({
        name:playList.name,
        id:playList.id,
        tracks:playList.tracks.slice(0,20)
      })
      index++
    }
    wx.setStorageSync('searchTopList', searchTopList)
    
    this.setData({
      bannerList:bannerList.banners,
      recommendList:recommendList.result,
      topList:allList
    })
    // console.log(this.data.topList);
  },
  async toMusic(e){
    // console.log(e.currentTarget.dataset);
    // console.log(allTopList[currentIndex][0]);
    let id = e.currentTarget.dataset.id
    let currentTopList = allTopList[currentIndex]
    wx.setStorageSync('playingList', currentTopList)
    wx.navigateTo({
      url: '/pages/music/music?id=' + id
    })
  },
  changeIndex(e){
    currentIndex = e.detail.current
  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  toList(e){
    wx.navigateTo({
      url: '/pages/songlist/songlist?id='+e.currentTarget.dataset.id,
    })
  },
  toRecomend(){
    wx.navigateTo({
      url: '/pages/newSongs/newSongs',
    })
  },
  toSongList(){
    wx.navigateTo({
      url: '/pages/allTopList/allTopList',
    })
  },
  toTopList(){
    wx.navigateTo({
      url: '/pages/toplist/toplist',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})