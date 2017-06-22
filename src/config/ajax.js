import axios from 'axios'

var urlList="http://musicapi.duapp.com/api.php"
const basUrl="https://api.imjad.cn/cloudmusic/"
//获取歌单列表
export function getSongList(cat, order, offset, total, limit){
    return axios(`${urlList}?type=topPlayList&cat=${cat}&offset=${offset}&limit=${limit}`).then((res)=>{
            	 return res
            	 
    })
}
//获取歌曲列表
export function getPlaySongs(id){
    return axios(`${basUrl}?type=playlist&id=${id}`).then((res)=>{
         return res
    })
}


//获取播放歌曲

export function songAudios(id){
    return axios(`${urlList}?type=url&id=${id}`).then((res)=>{
    	return res
    })
}

export function searchWords(words){
    return axios(`${basUrl}?type=search&s=${words}`).then((res)=>{
        return res
    })
}

export function getLic(id){
    return axios(`${basUrl}?type=lyric&id=${id}`).then(res=>{
        return res
    })
}

