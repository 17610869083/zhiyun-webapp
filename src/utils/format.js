import request from '@/utils/request'
//yy-mm-dd  转换为毫秒
export function getSecondTime(time){
    return new Date(time).getTime();
}
//分类列表转换
export function gradeCatListSwitch(data){
       let catArr=[];
       data.map((item,index) => {
            catArr.push({});
            catArr[index]['key']=item.id;
            catArr[index]['value']=item.catname;
       })
       return catArr;
}
//专题饼图数据转换
export function topicPieSwitch(data){
       let topicArr=[];
       data.data.map((item,index) => {
            topicArr.push({});
            topicArr[index]['value'] = item;
            topicArr[index]['name'] = data['type'][index];
       })
       return topicArr;
}
//专题折线图添加样式
export function topicLine(data){
       data.map( (item,index) => {
             item.areaStyle={normal: {}};
       })
       return data;
}
//专题设置数据转换
export function topicSettingSwitch(data){
       let topicNameArr=[];
       data.map((item,index) => {
            item.topicList.map( (items,indexs) => {
                topicNameArr.push(items)
            })
       })   
       return topicNameArr;
}
//时间戳转 yyyy-mm-dd
export function getHourTime(time){      
       let year = new Date(time).getFullYear();
       let month = new Date(time).getMonth()+1;
       let date = new Date(time).getDate();
       let hour = new Date(time).getHours();
       let minute = new Date(time).getMinutes();
       let second = new Date(time).getSeconds();
       let timeStr=`${year}-${month<10?'0'+month:month}-${date<10?'0'+date:date} ${hour<10?'0'+hour:hour}:${minute<10?'0'+minute:minute}:${second<10?'0'+second:second}`;
       return timeStr
}
//时间戳转 yyyy-mm-dd hh:mm:ss
export function getTime(time){      
    let year = new Date(time).getFullYear();
    let month = new Date(time).getMonth()+1;
    let date = new Date(time).getDate();
    let timeStr=`${year}-${month}-${date}`;
    return timeStr
}
//分类设置数据转换
export function categorySettingSwitch(data){
       let categoryArr=[];
       data.map((item,index) => {
              item.clflist.map((items,indexs) => {
                 categoryArr.push(items)
              })
       })
       return categoryArr;
}
//docList 请求
export function requestDoclist(url,param){
      let str=`keyword=${param.keyword}&datetag=${param.timeValue}&neg=${param.trendValue}&order=${param.sortValue}&similer=${param.filterValue}&carry=${param.carry}&page=${param.page}`
      if(param.timeValue==='custom'){
           str+=`&begin=${param.begin}&end=${param.end}`
      }                                  
      return request(url+'&'+str)
}
export function requestTopicList(url,param,type){
    let str=`${type}=${param.topicid}&datetag=${param.timeValue}&neg=${param.trendValue}&order=${param.sortValue}&similer=${param.filterValue}&carry=${param.carry}&page=${param.page}`
     if(param.timeValue==='custom'&&param.topicid){
         str+=`&begin=${param.begin}&end=${param.end}`
      }                                
    return request(url+'&'+str)
}
//关键词重复校验
export function keywordDuplicateCheck(arr){
    var hash = {};
    for(var i in arr) {
        if(hash[arr[i]])
        {
            return true;
        }
        hash[arr[i]] = true;
     }
    return false;
}
// 文章详情标红
export function setHighlightTags(content, tags) { 
    const tag=tags.split(' ');
    tag.pop();
    const tagLength = tag.length;   
     let result = "";
     if (tagLength > 0  ) {
         tag.forEach(item => {          
             result = content.replace(item, `<span style="color: red;">${item}</span>`);
         })
         
     } else {
         result = content;
     }
     return result;
 }