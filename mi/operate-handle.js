/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:40:03
 * @Description: APP 操作
 * @FilePath: \autoxjs\operate-handle.js
 * @Mail: mail@n0ts.top
 */

const operates = require("./operates");

/**
 * 执行步骤
 * @param {Array} step
 */
function startStep(step, params) {
    step.forEach((fn) => {
        const result = fn(params);
        if (result) {
            sleep(result);
        }
    });
    return true;
}

const operate = {
    QQ: (params) => {
        startStep(operates.qq.qqSendMsg, params);
    }
};

module.exports = function (info) {
    if (!operate[info[0]]) return;
    if (!device.isScreenOn()) startStep(operates.phone.unlockPhone);
    toast("开始执行");
    operate[info.shift()](info);
};
