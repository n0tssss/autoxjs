/*
 * @Author: N0ts
 * @Date: 2024-09-11 16:25:43
 * @Description:
 * @FilePath: \autoxjs\test.js
 * @Mail: mail@n0ts.top
 */

const name = "坚果的坚果";

descContains(name).waitFor();
sleep(300);
descContains(name).click();
sleep(300);
editable().setText("test");
sleep(500);
text("发送").click();
sleep(300);
back();
