/*
 * @Author: N0ts
 * @Date: 2024-09-11 10:48:50
 * @Description: test
 * @FilePath: \autoxjs\main.js
 * @Mail: mail@n0ts.top
 */

auto.waitFor();
toast("插件已启用");

const lockNumberXY = {
    1: [260, 1380],
    2: [540, 1380],
    3: [810, 1380],
    4: [260, 1555],
    5: [540, 1555],
    6: [810, 1555],
    7: [260, 1730],
    8: [540, 1730],
    9: [810, 1730],
    0: [540, 1920]
};

function getLockNumberXY(number) {
    return lockNumberXY[number];
}

const unlockPhone = [
    () => {
        device.wakeUpIfNeeded();
        return 300;
    },
    () => {
        swipe(600, 1600, 500, 800, 100);
        return 500;
    },
    () => {
        const pwd = "945520";
        pwd.split("").forEach((number) => {
            const xy = getLockNumberXY(number);
            if (!xy) return;
            click(xy[0], xy[1]);
            sleep(10);
        });
        return 1000;
    }
];

/**
 * 执行步骤
 * @param {Array} step
 */
function startStep(step, msg) {
    step.forEach((fn) => {
        const result = fn(msg);
        if (result) {
            sleep(result);
        }
    });
    return true;
}

const qqSendMsg = [
    () => {
        const launchResult = launch("com.tencent.mobileqq");
        if (!launchResult) {
            toast("启动QQ失败");
            return false;
        }
        console.log("成功打开 QQ");
        return 1000;
    },
    (msg) => {
        const name = "坚果的坚果";

        descContains(name).waitFor();
        sleep(500);
        descContains(name).click();
        sleep(500);
        editable().setText(msg);
        sleep(500);
        text("发送").click();
        sleep(500);
        back();
        sleep(500);
        lockScreen();
    }
];

const operate = {
    QQ: (msg) => {
        startStep(qqSendMsg, msg);
    }
};

events.observeNotification();
events.onNotification(function (n) {
    if (n.getPackageName() != "com.xiaomi.smarthome") return; //过滤非小米智能家居消息
    const info = n.getText().split(":");
    if (!device.isScreenOn()) startStep(unlockPhone);
    operate[info[0]](info[1]);
});

function test() {
    const info = ["QQ", "测试消息"];
    startStep(unlockPhone);
    operate[info[0]](info[1]);
}
// test();
