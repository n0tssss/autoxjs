/*
 * @Author: N0ts
 * @Date: 2024-09-13 00:27:29
 * @Description: 存储
 * @FilePath: \autoxjs\storage.js
 * @Mail: mail@n0ts.top
 */
const s = storages.create("com.n0ts.mi");

module.exports = {
    get(key, defaultValue) {
        return s.get(key, defaultValue);
    },
    set(key, value) {
        s.put(key, value);
    },
    remove(key) {
        s.remove(key);
    },
    clear() {
        s.clear();
    },
    contains(key) {
        return s.contains(key);
    }
};
