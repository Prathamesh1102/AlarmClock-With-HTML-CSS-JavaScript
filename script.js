const currTime = document.querySelector("h2"),
content = document.querySelector(".content"),
SelectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");


let Alarmtime, isAlrmSet,
ringtone = new Audio("./files/Dyalla.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value = "${i}" > ${i} </option>`;
    SelectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i>= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value = "${i}" > ${i} </option>`;
    SelectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i>0; i--) {
    let ampam = i == 1 ? "AM" : "PM";
    let option = `<option value = "${ampam}" > ${ampam} </option>`;
    SelectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {

    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampam = "AM";
    
    if( h > 12){
        h = h - 12;
        ampam = "PM";
    }

    h = h == 0 ? h = 12 : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currTime.innerText= `${h}:${m}:${s} ${ampam}`;

    if(Alarmtime == `${h}:${m} ${ampam}`){
        ringtone.play();
        ringtone.loop = true;
    }

},1000);

function setAlarm(){
    if(isAlrmSet){
        Alarmtime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlrmSet = false;
    }

    let time = `${SelectMenu[0].value}:${SelectMenu[1].value}:${SelectMenu[2].value}`;
    
    if( time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")){
        return alert("Please! Select Valid Time");
    }
    isAlrmSet = true;
    Alarmtime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = ("Clear Alarm");
}

setAlarmBtn.addEventListener("click", setAlarm);