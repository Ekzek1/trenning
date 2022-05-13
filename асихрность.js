class AlarmClock {
    constructor(alarmCollection, timerTd){
        this.alarmCollection = [];
        this.timerId = null;
    }

    addlock(time,callback,id){
        if(!id){
            throw new Error('error text');
        }
        if(this.alarmCollection.some(alarm => alarm.id === id)){
            console.error('такой id уже существует');
            return
        }
        this.alarmCollection.push({time: time, callback: callback, id: id})
    }

    removeClock(id){
        let deletId = this.alarmCollection.filter(alarm => alarm.id === id);
        deletId = this.alarmCollection.findIndex(deletId => deletId.id == id);
        if(deletId >= 0){
            this.alarmCollection.splice(deletId,1)
            return true
        }else{
            return false
        }
    }

    getCurrentFormattedTime(){
        return  new Date().toLocaleDateString("ru-Ru",{
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    start(){
        function checkClock (alarm){
            if(alarm.time === this.getCurrentFormattedTime()){
                return alarm.callback()
            }
        }

        let checkClockBind = checkClock.bind(this);

        if(!this.timerId){
            this.timerId = setInterval(() =>{
                this.alarmCollection.forEach(alarm => checkClockBind(alarm));
            }, 1000)
        }
    }

    stop(){
        if(!this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    printAlarms(){
        this.alarmCollection.forEach(alarm =>{
            console.log(`Будильник ${alarm.id} заведен на ${alarm.time}`)
        })
    }

    clearAlarms(){
        this.stop();
        this.alarmCollection = []
    }
}

const time = new AlarmClock(12,3);
console.log(time);
time.addlock(1845,1,1)
console.log(time.removeClock())
console.log(time.getCurrentFormattedTime())
time.clearAlarms()
console.log(time)




