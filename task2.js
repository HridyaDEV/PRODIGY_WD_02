let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTime = 0;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

function start() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
}

function pause() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
}

function reset() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    lapTime = 0;
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    millisecondsElement.textContent = '00';
    lapsList.innerHTML = '';
}

function lap() {
    if (!isRunning) return;
    const lapElement = document.createElement('li');
    lapElement.textContent = formatTime(elapsedTime);
    lapsList.appendChild(lapElement);
    lapTime = 0;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    hoursElement.textContent = String(time.getUTCHours()).padStart(2, '0');
    minutesElement.textContent = String(time.getUTCMinutes()).padStart(2, '0');
    secondsElement.textContent = String(time.getUTCSeconds()).padStart(2, '0');
    millisecondsElement.textContent = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
}

function formatTime(time) {
    const date = new Date(time);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
