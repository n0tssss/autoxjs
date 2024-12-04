/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:36:25
 * @Description: 监听事件
 * @FilePath: \mi\autojs\observe.js
 * @Mail: mail@n0ts.top
 */

const operate = require("./operate-handle");

events.observeNotification();
events.onNotification(function (n) {
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
});

toast(`米家监听已开启！`);
