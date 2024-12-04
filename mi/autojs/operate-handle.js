/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:40:03
 * @Description: APP 操作
 * @FilePath: \mi\autojs\operate-handle.js
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
    qq: (params) => {
        startStep(operates.qq.send, params);
    },
    wechat: (params) => {
        startStep(operates.wechat.send, params);
    }
};

/**
 * 打开应用发送内容
 * @param {string} info 支持APP名称,发送对象,内容1,内容2...
 */
module.exports = function (info) {
    if (!operate[info[0]]) return;
    operate[info.shift()](info);
};
