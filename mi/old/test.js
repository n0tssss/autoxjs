/*
 * @Author: N0ts
 * @Date: 2024-09-11 16:25:43
 * @Description: test
 * @FilePath: \mi\test.js
 * @Mail: mail@n0ts.top
 */

// click("康少", 0);
// sleep(500);
// editable().setText("测试");
// sleep(500);
// text("发送").click();

function clickFn(text) {
    if (!click(text, 0)) {
        sleep(500);
        clickFn(text);
    }
}

clickFn("康少");