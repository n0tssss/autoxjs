/*
 * @Author: N0ts
 * @Date: 2024-12-04 14:55:11
 * @Description: test
 * @FilePath: \mi\v2\mi-listen.js
 * @Mail: mail@n0ts.top
 */

// api 回调地址
const callBackApi = "http://192.168.1.100:3000";

events.observeNotification();
events.onNotification(function (n) {
    if (n.getPackageName() != "com.xiaomi.smarthome") return;
    toast(`新通知: ${n.getText()}`);

    // 消息格式：类型,指令
    const msg = n.getText().split(",");
    if (msg.length < 1) return;

    // 发送消息
    if (msg[0] == "send") {
        http.postJson("https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9a4afff3-95f2-41a6-bb9d-e42609ca8c4c", {
            msgtype: "text",
            text: {
                content: msg[1]
            }
        });
    }

    // API 回调
    if (msg[0] == "api") {
        http.postJson(callBackApi, {
            msg: msg
        });
    }
});

toast(`米家监听已开启！`);
