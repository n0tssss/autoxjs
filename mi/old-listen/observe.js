/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:36:25
 * @Description: 监听事件
 * @FilePath: \mi-listen\observe.js
 * @Mail: mail@n0ts.top
 */

const operate = require("./operate-handle");

let runningLock = false;

events.observeNotification();
events.onNotification(function (n) {
    runningLock = true;

    if (n.getPackageName() != "com.xiaomi.smarthome") return;
    toast(`新通知: ${n.getText()}`);

    // 消息格式：类型,参数1,参数2,参数3...
    const msg = n.getText().split(",");
    if (msg.length < 1) return;

    // 发送消息
    if (msg[0] == "send") {
        msg.shift();
        operate(msg);
        launch("com.xiaomi.smarthome");
    }

    // API 回调
    if (msg[0] == "api") {
        http.postJson(callBackApi, {
            msg: msg
        });
    }

    runningLock = false;

    toast(`执行完成！\n${n.getText()}`);
});

launch("com.xiaomi.smarthome");
toast(`米家监听已开启！`);

setInterval(() => {
    if (runningLock) return;
    const x = device.width / 2;
    const y = device.height / 4;
    swipe(x, y, x, y * 3, 500);
}, 5000);
