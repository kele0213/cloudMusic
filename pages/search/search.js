// pages/search/search.js
import musicRequest from '../../utils/request'
let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList:[],
    inputText:"",
    keywords:[],
    songs:[],
    state:0,
    history:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 历史记录
    const history = wx.getStorageSync('history')
    if(history){
      this.setData({
        history
      })
    }
    // 排行榜
    let searchTopList = wx.getStorageSync('searchTopList')
    if(searchTopList){
      this.setData({
        topList:searchTopList
      })
    }else{
      let topList = await musicRequest.get('/topList')
      const topListNum = 3
      topList.list.splice(topListNum)
      // 给排行榜增加歌曲信息
      let allList = []
      let index = 0
      while(index<topListNum){
        let topMusicList = await musicRequest.get('/playlist/detail',{id:topList.list[index].id})
        let playList = topMusicList.playlist
        allList.push({
          name:playList.name,
          id:playList.id,
          tracks:playList.tracks.slice(0,20)
        })
        index++
      }
      this.setData({
        topList:allList
      })
    }

  },
  clickName(e){
    const name = e.currentTarget.dataset.name
    this.setData({
      inputText:name
    })
    this.getMusicByName(name)
  },
  async getSuggest(keywords){
    let suggest = await musicRequest.get('/search/suggest', { keywords, type: 'mobile' })
    if(suggest){
      suggest = suggest.result.allMatch
    this.setData({
      keywords:suggest
    })
    }
  },
  suggestMusic(e){
    if(e.detail.value == ""){
      this.setData({
        state:0
      })
    }else{
      this.setData({
        state:1
      })
    }
    // 使用定时器节流
    clearInterval(timer)
    timer = setTimeout(() => {
      // console.log('定时器');
      this.getSuggest(e.detail.value)
    }, 500)
  },
  async searchMusic(musicName){
    let type = 1
    let searchResultData = await musicRequest.get('/search', { keywords: musicName, limit: 20, offset: 0, type })
    if(searchResultData){
      this.setData({
        songs:searchResultData.result.songs
      })
    }
    // console.log(searchResultData);
  },
  getMusic(e){
   this.getMusicByName(e.detail.value)
  },
  getMusicByName(name){
    this.setData({
      state:2
    })
    // 保存历史记录
    let history = this.data.history
    history.unshift(name)
    this.setData({
      history
    })
    wx.setStorageSync('history', history)
    // 查询音乐
    this.searchMusic(name)
  },
  async toMusic(e){
    const id = e.currentTarget.dataset.id;
    let song = await musicRequest.get("/song/detail",{ids:id})
    if(song){
      song = song.songs[0]
      let playingList = wx.getStorageSync('playingList')
      if(playingList){
        playingList.push(song)
        wx.setStorageSync('playingList', playingList)
      }else {
        playingList = [song]
        wx.setStorageSync('playingList', playingList)
      }
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