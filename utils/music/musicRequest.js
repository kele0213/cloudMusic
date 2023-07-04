let Address = 'https://www.codeman.ink/api'
// let localAddress = 'http://localhost:8080/music'
let localAddress = 'http://192.168.123.144:8080/music'

export default class MusicRequest {
  get(url,data={}){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: Address+url,
        data:data,
        method:'GET',
        success:(res)=>{
          resolve(res.data)
        },
        fail:(err)=>{
          reject(err)
        }
      })
    })
  }
  localGet(url,data={}){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: localAddress+url,
        data:data,
        method:'GET',
        success:(res)=>{
          resolve(res.data)
        },
        fail:(err)=>{
          reject(err)
        }
      })
    })
  }
  localPost(url,data={}){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: localAddress+url,
        data:data,
        method:'POST',
        success:(res)=>{
          resolve(res.data)
        },
        fail:(err)=>{
          reject(err)
        }
      })
    })
  }
}