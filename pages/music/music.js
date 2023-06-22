import musicRequest from '../../utils/request'
import moment from 'moment'
// pages/music/music.js
const app = getApp();
const backgroundAudioManager = wx.getBackgroundAudioManager()
// 歌曲配置
let musicLink = '' // 歌曲链接
// 原始时间
let originCurrentTime = 0
// 当前歌曲索引
let currentMusicIndex = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    lyrics:[],//歌词 [[time,value]],
    isshowLyric:false,
    musicID:0,
    lyricIndex:0,
    currentTime:'00:00',
    allTime:'00:00',
    barValue:0,
    playingList:[],
    ishiddenList:true,
    musicInfo:{
      name:"",
      singer:"",
      picUrl:"",
      dt:0
    },
    isLike:false
  },
  existGlobalData(){
    wx.setStorageSync('musicInfo', this.data.musicInfo)
    wx.setStorageSync('isPlay', this.data.isPlay)
    wx.setStorageSync('musicID', this.data.musicID)
  },
  changeCurrentMusicIndex(){
    currentMusicIndex = this.data.playingList.findIndex(item=>{
      return item.id == this.data.musicID
    })
    // console.log(currentMusicIndex);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async registerInfo(id){
    let musicID = id // 为空则为父亲
    let musicInfo = await this.getMusicInfo(musicID)
    let allTime =  moment(musicInfo.dt).format('mm:ss')
    this.setData({
      musicID,
      musicInfo,
      allTime
    })
  },
  async onLoad(options) {
      // 读取并保存歌曲信息
      let playingList = wx.getStorageSync('playingList')
      // console.log(playingList);
      // console.log(playingList);
      // console.log(currentMusicIndex);
      // console.log(playingList);
      // 注册信息
      if(options.id!==this.data.musicID){
        await this.registerInfo(options.id)
        if(this.data.isPlay){
          this.changeState()
          this.changeState()
        }else{
          this.changeState()
        }
      }

      this.setData({
        playingList
      })




      this.changeCurrentMusicIndex()

      // // 传给页面的小歌曲
      // this.existGlobalData()

      // // 存储当前歌曲url
      // let music = await musicRequest.get('/song/url',{id:this.data.musicID,br:320000})
      // wx.setStorageSync('musicurl', music.data[0].url)

      // console.log(playingList);

      // 获取状态
      let isPlay = wx.getStorageSync('isPlay')
      if(isPlay!==undefined){
        this.setData({
          isPlay
        })
      }
      if(isPlay && musicLink==''){
        musicLink == '非空'
      }
      
     backgroundAudioManager.onPlay(()=>{
       this.data.isPlay = true
      //  console.log('播放了');
      const userInfo = wx.getStorageSync('userInfo')
      if(userInfo){
        const saveHistory = musicRequest.localGet("/song/save",{
          uid:userInfo.uid,
          musicId:this.data.musicID,
          type:0
        })
        // console.log(saveHistory);
        const isLike = musicRequest.localGet("/song/iscollect",{
          uid:userInfo.uid,
          musicId:this.data.musicID
        }).then(res=>{
          this.setData({
            isLike:res.data.isCollect
          })
        })
      }
     }) 
     backgroundAudioManager.onPause(()=>{
       this.data.isPlay = false
     })

     backgroundAudioManager.onEnded(()=>{
       this.nextMusic()
     })
     backgroundAudioManager.onTimeUpdate(()=>{
       let currentTime = moment(backgroundAudioManager.currentTime*1000).format('mm:ss')
       originCurrentTime = backgroundAudioManager.currentTime
      //  console.log(currentTime);
      // 计算进度条
      let barValue = ((backgroundAudioManager.currentTime*1000)/this.data.musicInfo.dt)*100
      if(backgroundAudioManager.currentTime*1000 <= this.data.musicInfo.dt){
        this.setData({
          currentTime,
          barValue
        })
      }

      if(this.data.lyricIndex < this.data.lyrics.length){
        if(this.data.isshowLyric){
          if(backgroundAudioManager.currentTime>=this.data.lyrics[this.data.lyricIndex][0]){
            let lyricIndex = this.data.lyricIndex + 1;
            this.setData({
              lyricIndex
            })
          }
        }
      }
      
     })
  },
  async likeMusic(){
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      if(this.data.isLike){
        const deleteLike = await musicRequest.localGet('/song/delete/collect',{
          uid:userInfo.uid,
          musicId:this.data.musicID
        })
        this.setData({
          isLike:false
        })
      }else{
        const addLike = await musicRequest.localGet('/song/save',{
          uid:userInfo.uid,
          musicId:this.data.musicID,
          type:1
        })
        this.setData({
          isLike:true
        })
      }
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  toWrite(){
    wx.navigateTo({
      url: '/pages/comment/comment?musicid='+this.data.musicID,
    })
  },
  showList(){
    let ishiddenList = !this.data.ishiddenList;
    this.setData({
      ishiddenList
    })
  },
  async getMusicInfo(id){
    let musicInfo = await musicRequest.get('/song/detail',{ids:id})
    // console.log(musicInfo);
    return {
      name:musicInfo.songs[0].name,
      singer:musicInfo.songs[0].ar[0].name,
      picUrl:musicInfo.songs[0].al.picUrl,
      dt:musicInfo.songs[0].dt
    }
  },
  // 修改进度条
  changeSlider(e){
    let value = e.detail.value * this.data.musicInfo.dt / 100 /1000  //当前对应的秒数
    backgroundAudioManager.seek(value)
    this.repairIndex(value)
  },
  changeState(){
    let isPlay = !this.data.isPlay
    this.musicControl(isPlay,this.data.musicID,musicLink)
    this.setData({
      isPlay
    })
    this.existGlobalData()
  },
  async musicControl(state,id,musicLink){
    if(state){
      if(!musicLink){
        let music = await musicRequest.get('/song/url',{id,br:320000})
        musicLink = music.data[0].url;
        if(!musicLink){
          console.log('不能播放');
          return
        }
        backgroundAudioManager.title = this.data.musicInfo.name
        backgroundAudioManager.src = musicLink
      }
      backgroundAudioManager.play()
    }else{
      backgroundAudioManager.pause()
    }
  },

  // 点击CD，载入歌词
  async showLyric(){
    // // 修正lyricindex
    // this.repairIndex();

    let isshowLyric = !this.data.isshowLyric
    this.setData({
      isshowLyric
    })
    if(isshowLyric && this.data.lyrics.length<=1){
      let lyrics = await musicRequest.get('/lyric',{id:this.data.musicID})
      lyrics = lyrics.lrc.lyric
      let lyr = lyrics.split('\n')
      let arr = []
      let result = []
      // 去空
      lyr.forEach(item=>{
        if(item!=""){
          arr.push(item)
        }
      })
      lyr = arr;
      // 进行分割
      lyr.forEach(item=>{
        let time = item.split(']')[0]
        time = time.slice(1)
        let value = item.split(']')[1]
        result.push([parseInt(time.split(':')[0],10)*60+parseFloat(time.split(':')[1]),value])
      })
      this.setData({
        lyrics:result
      })
      // console.log(result);
    }
    if(isshowLyric){
      this.repairIndex(originCurrentTime)
    }
  },
  repairIndex(time){
    let lyricIndex = this.data.lyrics.findIndex(item => {
      return time <= item[0]
    })
    this.setData({
      lyricIndex
    })
  },
  async changeListMusic(e){
    let musicID = e.currentTarget.dataset.id
    await this.changeMusic(musicID)
    this.changeCurrentMusicIndex()
    // console.log(currentMusicIndex);
  },
  async changeMusic(musicID){
    backgroundAudioManager.stop()
    await this.registerInfo(musicID)
    musicLink=""
    this.musicControl(true,musicID,musicLink)
    let isshowLyric = false
    this.setData({
      lyrics: [['Tip', '正在加载歌词']],
      currentTime: '00:00',
      lyricsIndex: 0,
      isshowLyric,
      isPlay:true,
    })
    this.existGlobalData()
  },
  nextMusic(){
    if(currentMusicIndex == this.data.playingList.length-1){
      currentMusicIndex = 0
    }else {
      currentMusicIndex++
    }
    this.changeMusic(this.data.playingList[currentMusicIndex].id)
  },
  preMusic(){
    if(currentMusicIndex == 0){
      currentMusicIndex = this.data.playingList.length-1
    }else {
      currentMusicIndex--
    }
    this.changeMusic(this.data.playingList[currentMusicIndex].id)
  }
})