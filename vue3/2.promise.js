// 类 Promise 不兼容的 兼容方案es6-promise
// 默认new Promise 就会被直接调用 ***所以在使用的时候通常是把Promise包函数中，需要用的时候直接运行这个函数即可。
// 一旦成功或者失败就停止了 不会在发生状态改变
                            // resolve就是then中的第一个函数
                            // reject 代表的就是then中的第二个函数
let p = new Promise(function (resolve,reject) {
    resolve('word');
});
//promise实例上都会有一个then方法
p.then(function (data) { //success
    console.log(data)
},function (err) { //error
    console.log(err)
});


let str ='';
function read() {
    return new Promise(function (resolve,reject) { //resolve,reject挂载载Promise原型上的方法
        setTimeout(()=>{ //setTimeout就是异步的
            str = 'hello';
            resolve(str);
        },3000);
    });
}
read().then(function (data) {
    console.log(data);
},function () {});





//****以下是自己添加，并非老师所讲；
//***上例可以写成let p = new Promise。return p这个函数对象；这样，在之后的就可以使用read()的then、catch等方法了。这就是它的强大之处；
//then里面的函数就像回调函数一样，在这个异步任务执行完成后再 被执行；
//这就是Promise的使用了，把原来的回调分离出来，在异步操作执行完成后，用链式调用的方式执行回调函数；
/*
function runAsync(callback){
    setTimeout(function(){
        console.log('执行完成');
        callback('随便什么数据');
    }, 2000);
}

runAsync(function(data){
    console.log(data);
});*/
//链式操作的用法
//从表面上看，Promise只是能够简化层层回调的写法，而实质上，Promise的精髓是“状态”，用维护状态、传递状态的方式来使得回调函数
// 能够及时调用，它比传递callback函数要简单、灵活的多。所以使用Promise的正确场景是这样的：
function runAsync1(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;
}
function runAsync2(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;
}
function runAsync3(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;
}

runAsync1()
    .then(function(data){
        console.log(data);
        return runAsync2();
    })
    .then(function(data){
        console.log(data);
        return runAsync3();
    })
    .then(function(data){
        console.log(data);
    });
