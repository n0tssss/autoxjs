/*
 * @Author: N0ts
 * @Date: 2024-09-14 13:45:26
 * @Description: 微信 操作
 * @FilePath: \mi-listen\operates\wechat.js
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
        (config) => {
            const name = config.name;

            clickFn(name);
            sleep(1000);

            config.msg.forEach((msg) => {
                editable().setText(msg);
                sleep(1000);
                text("发送").click();
                sleep(1000);
            });

            back();
        }
    ]
};
