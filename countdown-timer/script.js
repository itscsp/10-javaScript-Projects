// To Get Dom Elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secondsEl = document.getElementById('seconds');
const data = document.getElementById("fname");



function countdown() {
    if (data.value < '01 jan 2022'){
        data.value = '01 Jan 2022'
    }
    const newYears = data.value;


    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    // To Get Total Seconds in remaining
    const totalSeconds = (newYearsDate - currentDate) / 1000 ;

    // To Get days
    const days = Math.floor(totalSeconds / 3600 / 24);

    // To Get Hours
    const hours = Math.floor(totalSeconds / 3600) % 24;
    // To Get Minutes
    const minutes = Math.floor(totalSeconds / 60) % 60;
    // To Get seconds
    const seconds = Math.floor(totalSeconds % 60)

    daysEl.innerHTML = formatedTime(days);
    hoursEl.innerHTML = formatedTime(hours);
    minsEl.innerHTML = formatedTime(minutes);
    secondsEl.innerHTML = formatedTime(seconds);

}

//Function to return Formatef Time
function formatedTime(time){
    return time < 10 ? (`0${time}`) : time;
}

// first call of the function
countdown();

setInterval(countdown, 1000)