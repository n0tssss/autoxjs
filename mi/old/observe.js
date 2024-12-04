/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:36:25
 * @Description: 监听事件
 * @FilePath: \mi\observe.js
 * @Mail: mail@n0ts.top
 */

const storage = require("./storage");
const operate = require("./operate-handle");

events.observeNotification();
events.onNotification(function (n) {
    log("\n监听到新通知:\n标题: %s\n内容: %s\n包名: %s", n.getTitle(), n.getText(), n.getPackageName());

    const whiteObservePackages = storage.get("whiteObservePackages", []);
    const pwd = storage.get("pwd", "");
    if (!whiteObservePackages.includes(n.getPackageName())) return;
    const info = n.getText().split("，");
    if (pwd && info[1] != pwd) {
        log("密码错误，拒绝执行！", info);
        return;
    }

    // 如果 pwd 存在，则去掉密码
    if (pwd) info.splice(1, 1);

    operate(info);
});

toast("监听已启用");
