/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:44:33
 * @Description: QQ 操作
 * @FilePath: \mi-listen\operates\qq.js
 * @Mail: mail@n0ts.top
 */
module.exports = {
    send: [
        () => {
            const launchResult = launch("com.tencent.mobileqq");
            if (!launchResult) {
                toast("启动QQ失败");
                return false;
            }
            return 1000;
        },
        (config) => {
            const name = config.name;

            descContains(name).waitFor();
            descContains(name).click();
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
