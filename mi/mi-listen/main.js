/*
 * @Author: N0ts
 * @Date: 2024-12-05 15:16:09
 * @Description: 米家日志监听
 * @FilePath: \mi-listen\main.js
 * @Mail: mail@n0ts.top
 */
// console.show();

let logsSize = 0;

function scrollRefresh() {
    const x = device.width / 2;
    const y = device.height / 5;
    swipe(x, y, x, y * 3, 500);
}

function getNewLogs() {
    const dom = textContains("监听").find();
    if (dom.empty()) return [];

    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}`;
    const timeDom = textContains(time).find();

    if (timeDom.empty()) return [];

    const logs = dom.splice(0, timeDom.length).map((l) => l.text());

    if (logs.length == logsSize) return [];

    const newLogs = logs.slice(0, logs.length - logsSize);
    logsSize = logs.length;
    return newLogs;
}

setInterval(() => {
    scrollRefresh();
    const newLogs = getNewLogs();
}, 500);
