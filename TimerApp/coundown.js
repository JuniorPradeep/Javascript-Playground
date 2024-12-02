
class TimerBuilder{
    constructor(){
        this.minMSB = null;
        this.minLSB = null;
        this.secMSB = null;
        this.secLSB = null; 
        this.start = null; 
        this.stop = null; 
        this.reset = null; 
        this.display = null;
        this.is_valid_count = 0;
    }
    
    static getTimerBuilder(){
       const timerBuilder = new TimerBuilder()
       return timerBuilder; 
    }

    setMinMSB(minMSB){
       this.minMSB = document.getElementById(minMSB);
       this.is_valid_count += 1;
       return this;
    }
    setMinLSB(minLSB){
        this.minLSB = document.getElementById(minLSB);
        this.is_valid_count += 1;
        return this;
    }
    setSecMSB(secMSB){
        this.secMSB = document.getElementById(secMSB);
        this.is_valid_count += 1;
        return this;
    }
    setSecLSB(secLSB){
        this.secLSB = document.getElementById(secLSB);
        this.is_valid_count += 1;
        return this;
    }
    setStart(start){
        this.start = document.getElementById(start);
        this.is_valid_count += 1;
        return this;
    } 
    setStop(stop){
        this.stop = document.getElementById(stop);
        this.is_valid_count += 1;
        return this;
    } 
    setReset(reset){
        this.reset  = document.getElementById(reset);
        this.is_valid_count += 1;
        return this;
    }

    setDisplay(display){
        this.display  = document.getElementById(display);
        this.is_valid_count += 1;
        return this;
    } 
    build(){
        if(this.is_valid_count<8){
            throw new Error("Builder missing fields issue.");
            return null
        }
       return new Timer(this); 
    }   
}

class Timer{
    constructor(timer){
        this.minMSB = timer.minMSB;
        this.minLSB = timer.minLSB;
        this.secMSB = timer.secMSB;
        this.secLSB = timer.secLSB; 
        this.start = timer.start; 
        this.stop = timer.stop; 
        this.reset = timer.reset; 
        this.display = timer.display;
        this.attachedEvents();

        this.minutes = 0;
        this.seconds = 0;
        this.interval = 0;
        
    }

    attachedEvents = ()=>{
        this.start.addEventListener('click',(event)=>{
            this.startTimer(event);
        });
        this.stop.addEventListener('click',(event)=>{
            this.stopTimer(event);
        });

        this.reset.addEventListener('click',(event)=>{
            this.resetTimer(event);
        });
        
        this.display.addEventListener('input',(event)=>{
            // console.log(event.target);
            // console.log(event.data);
        });
    }

    startTimer(event){
        this.setControls(true,false);
        this.minutes = parseInt(this.minMSB.value)*10 + parseInt(this.minLSB.value)
        this.seconds = parseInt(this.secMSB.value)*10 + parseInt(this.secLSB.value)
        
        this.interval = setInterval(()=>{
            if(this.minutes === 0 && this.seconds === 0){
                this.setControls(false,false);
                clearInterval(this.interval);
                return;
            }
            this.seconds -= 1 
            if(this.seconds<0){
                this.seconds = 59;
                this.minutes -= 1;
            }
            this.setDisplay(this.minutes,this.seconds);

        },1000);    
    }

    stopTimer(event){
        if(this.minutes === 0 && this.seconds === 0){
            this.setControls(false,false);
            return;
        }
        this.setControls(false,true);
        clearInterval(this.interval);
    }

    resetTimer(event){
        this.setControls(false,false);
        clearInterval(this.interval);
        this.setDisplay(0,0);
    }

    setDisplay(mins,secs){
        this.minMSB.value = Math.floor(mins/10);
        this.minLSB.value = mins%10;
        this.secMSB.value = Math.floor(secs/10);
        this.secLSB.value = secs%10;


    }
    setControls(startStatus = false,stopStatus = false){
        this.start.disabled = startStatus;
        this.stop.disabled = stopStatus; 
    }
    
}


const timer =  TimerBuilder
.getTimerBuilder()
.setMinMSB('minMSB')
.setMinLSB('minLSB')
.setSecMSB('secMSB')
.setSecLSB('secLSB')
.setStart('start')
.setStop('stop')
.setReset('reset')
.setDisplay('display')
.build();
console.log(timer);