/*
 * @Author: N0ts
 * @Date: 2024-09-11 16:25:43
 * @Description: test
 * @FilePath: \autoxjs\test.js
 * @Mail: mail@n0ts.top
 */

"ui";

ui.layout(
    <vertical>
        <text
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
        </vertical>
    </vertical>
);