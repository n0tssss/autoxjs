/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:36:25
 * @Description: 监听事件
 * @FilePath: \autoxjs\observe.js
 * @Mail: mail@n0ts.top
 */

const storage = require("./storage");
const operate = require("./operate-handle");

events.observeNotification();
events.onNotification(function (n) {
    const whiteObservePackages = storage.get("whiteObservePackages", []);
    const pwd = storage.get("pwd", "");
    n.delete();
    if (!whiteObservePackages.includes(n.getPackageName())) return;
    const info = n.getText().split("，");
    if (pwd && info[1] != pwd) {
        console.log("密码错误，拒绝执行！", info);
        return;
    }

    operate(info);

    n.delete();
});
