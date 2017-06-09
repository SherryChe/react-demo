/**
 * Created by chenxq on 2017/6/9.
 */
var obj={};
function getArray(){
    getData().then(data=>{
        console.log("data",data);
        obj.arr=data;
    })

function getData(){
    return new Promise((resolve,reject)=>{
        resolve([1,2,3])
    })
}


export {
    getData
}
