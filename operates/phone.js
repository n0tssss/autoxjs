/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:47:40
 * @Description: 手机操作
 * @FilePath: \autoxjs\operates\phone.js
 * @Mail: mail@n0ts.top
 */
module.exports = {
    unlockPhone: [
        () => {
            device.wakeUpIfNeeded();
            return 1000;
        },
        () => {
            swipe(600, 1600, 500, 800, 100);
            return 500;
        },
        () => {
            lockScreenPwd.split("").forEach((number) => {
                descContains(number).click();
                sleep(10);
            });
            return 1000;
        }
    ]
};
