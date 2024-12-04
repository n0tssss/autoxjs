/*
 * @Author: N0ts
 * @Date: 2024-09-14 13:45:26
 * @Description: 微信 操作
 * @FilePath: \mi\operates\wechat.js
 * @Mail: mail@n0ts.top
 */

function clickFn(text) {
    if (!click(text, 0)) {
        sleep(500);
        clickFn(text);
    }
}

module.exports = {
    send: [
        () => {
            const launchResult = launch("com.tencent.mm");
            if (!launchResult) {
                toast("启动微信失败");
                return false;
            }
            return 1000;
        },
        (params) => {
            const name = params.shift();

            clickFn(name);
            sleep(500);

            params.forEach((msg) => {
                editable().setText(msg);
                sleep(500);
                text("发送").click();
                sleep(500);
            });

            back();
            sleep(500);
            lockScreen();
        }
    ]
};
