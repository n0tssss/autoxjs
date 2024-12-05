/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:40:03
 * @Description: APP 操作
 * @FilePath: \mi-listen\operate-handle.js
 * @Mail: mail@n0ts.top
 */

const operates = require("./operates");

/**
 * 执行步骤
 * @param {Array} step
 */
function startStep(step, config) {
    step.forEach((fn) => {
        const result = fn(config);
        if (result) {
            sleep(result);
        }
    });
    return true;
}

const operate = {
    qq: (config) => {
        startStep(operates.qq.send, config);
    },
    wechat: (config) => {
        startStep(operates.wechat.send, config);
    }
};

/**
 * 打开应用发送内容
 */
module.exports = function (config) {
    operate[config.app](config);
};
