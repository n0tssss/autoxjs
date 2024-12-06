/*
 * @Author: N0ts
 * @Date: 2024-12-05 15:16:09
 * @Description: 米家日志监听
 * @FilePath: \mi-listen\main.js
 * @Mail: mail@n0ts.top
 */

console.show(true);

auto.waitFor();

const config = require("./config");
const operate = require("./operate-handle");

let logsSize = 0;
let nowTime = "";

function scrollRefresh() {
    const x = device.width / 2;
    const y = device.height / 5;
    swipe(x, y * 2, x, y * 5, 500);
}

function setNowTime() {
    const now = new Date();
    let nowTimeCache = `${now.getHours()}:${now.getMinutes()}`;
    if (nowTimeCache != nowTime) {
        nowTime = nowTimeCache;
        logsSize = 0;
    }
}

function getNewLogs() {
    const dom = textContains("监听").find();
    if (dom.empty()) return [];

    const timeDom = textContains(nowTime).find();

    if (timeDom.empty()) return [];

    const logs = dom.splice(0, timeDom.length).map((l) => l.text());
    if (logs.length == logsSize) return [];

    const newLogs = logs.slice(0, logs.length - logsSize);
    logsSize = logs.length;

    console.log(`${nowTime} 监听到 ${timeDom.length} 条日志`);
    console.log("新日志", newLogs);

    return newLogs;
}

function logHandler() {
    const newLogs = getNewLogs();
    if (newLogs.length == 0) return;
    const c = config.sendConfig[newLogs[0].replace("监听", "")];
    operate(c);
    launch("com.xiaomi.smarthome");
}

setInterval(() => {
    setNowTime();
    scrollRefresh();
    logHandler();
}, 500);

launch("com.xiaomi.smarthome");
toast(`米家监听已开启！`);
