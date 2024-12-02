// const states = {
//     PENDING:'pending',
//     RESOLVED:'resolved',
//     REJECTED:'rejected'
// }
// function CustomPromise(executorFn){
// let state = states.PENDING;
// let val  = undefined; 

// const resolve = (val)=>{
//     if(states.PENDING !== state) return;
//     val = val;
//     state = state.RESOLVED;
//     console.log("value resolved",val)
// }
// const reject = (err)=>{
//     if(states.PENDING !== state) return;
//     val = err;
//     state = state.REJECTED;
// }
// try{
//   executorFn(resolve,reject);  
// }catch(err){
//     reject(err)
// }    
// }

// cus = new CustomPromise((res,rej)=>{

//       res(10)
// })

prom = new Promise((res,rej)=>{
    res(10)    
})
console.log(prom)
