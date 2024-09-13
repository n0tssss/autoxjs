/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:53:14
 * @Description: 初始化
 * @FilePath: \autoxjs\init.js
 * @Mail: mail@n0ts.top
 */
const storage = require("./storage");
const config = require("./config");

const keys = Object.keys(config);
for (let i = 0; i < keys.length; i++) {
    if (!storage.contains(keys[i])) {
        storage.set(keys[i], config[keys[i]]);
    }
}
