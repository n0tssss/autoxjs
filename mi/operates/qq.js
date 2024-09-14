/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:44:33
 * @Description: QQ 操作
 * @FilePath: \mi\operates\qq.js
 * @Mail: mail@n0ts.top
 */
module.exports = {
    qqSendMsg: [
        () => {
            const launchResult = launch("com.tencent.mobileqq");
            if (!launchResult) {
                toast("启动QQ失败");
                return false;
            }
            return 1000;
        },
        (params) => {
            const name = params.shift();

            descContains(name).waitFor();
            descContains(name).click();
            sleep(500);

            params.forEach((msg) => {
                editable().setText(msg);
                sleep(500);
                text("发送").click();
                sleep(500);
            });

            back();
            sleep(100);
            lockScreen();
        }
    ]
};
