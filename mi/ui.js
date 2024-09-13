/*
 * @Author: N0ts
 * @Date: 2024-09-14 00:46:21
 * @Description: ui
 * @FilePath: \mi\ui.js
 * @Mail: mail@n0ts.top
 */

"ui";

const storage = require("./storage");
const config = require("./config");

ui.statusBarColor("#292729");
ui.layout(
    <vertical>
        <text
            id="title"
            text="米家消息监听自动化"
            textSize="18sp"
            textColor="white"
            textStyle="bold"
            bg="#292729"
            padding="10 20 10 20"
            marginBottom="10"
        />
        <vertical padding="20">
            <text textSize="16sp" textColor="black" text="触发密码（可为空）" />
            <input id="pwd" text="" />
            <text textSize="16sp" textColor="black" text="锁屏密码" />
            <input id="lockScreenPwd" text="" />
            <text textSize="16sp" textColor="black" text="监听白名单包名（英文逗号分隔）" />
            <input id="whiteObservePackages" text="" />
            <button id="ok" text="保存设置" />
            <button id="reset" text="重置设置" />
            <button id="copy" text="复制当前配置" />
        </vertical>
    </vertical>
);

ui.title.setText(ui.title.text() + ` ${app.autojs.versionName}`);

ui.pwd.setText(storage.get("pwd"));
ui.lockScreenPwd.setText(storage.get("lockScreenPwd"));
ui.whiteObservePackages.setText(storage.get("whiteObservePackages").toString());

ui.ok.click(function () {
    storage.set("pwd", ui.pwd.text());
    storage.set("lockScreenPwd", ui.lockScreenPwd.text());
    storage.set("whiteObservePackages", ui.whiteObservePackages.text());
    toast("配置已保存");
});

ui.reset.click(function () {
    storage.set("pwd", config.pwd);
    storage.set("lockScreenPwd", config.lockScreenPwd);
    storage.set("whiteObservePackages", config.whiteObservePackages);
    ui.pwd.setText(config.pwd);
    ui.lockScreenPwd.setText(config.lockScreenPwd);
    ui.whiteObservePackages.setText(config.whiteObservePackages.toString());
    toast("配置已重置");
});

ui.copy.click(function () {
    const pwd = storage.get("pwd");
    setClip(`QQ，${pwd ? pwd + "，" : ""}通知人，消息1，消息2`);
    toast("复制成功");
});
