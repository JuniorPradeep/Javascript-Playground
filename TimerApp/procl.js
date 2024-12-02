class MyPromise{
    constructor(executor){
        this.state = 'pending';
        this.value = undefined;
        if(typeof executor !== 'function'){
            throw new Error("executor is not function");
        }
        try{
           executor(this._resolve.bind(this),this._reject.bind(this)) 
        }
        catch(err){
            throw new Error("Executor not resolving...")
        }
        
    }

    _resolve(val){
        if(this.state !=='pending') return;
        this.state = 'resolved';
        this.value = val; 
    }
    _reject(err){
        if(this.state !=='pending') return;
        this.state = 'rejected';
        this.value = err; 
    }
}
new MyPromise((res,rej)=>{
    res(10);  
})