/*
 * @Author: N0ts
 * @Date: 2024-09-11 10:48:50
 * @Description: test
 * @FilePath: \autoxjs\mi.js
 * @Mail: mail@n0ts.top
 */

auto.waitFor();
toast("插件已启用");

const whiteObservePackages = ["com.tencent.mobileqq", "com.xiaomi.smarthome"];

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

const unlockPhone = [
    () => {
        device.wakeUpIfNeeded();
        return 1000;
    },
    () => {
        swipe(600, 1600, 500, 800, 100);
        return 500;
    },
    () => {
        const pwd = "945520";
        pwd.split("").forEach((number) => {
            const xy = lockNumberXY[number];
            if (!xy) return;
            click(xy[0], xy[1]);
            sleep(10);
        });
        return 1000;
    }
];

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
        sleep(500);
        lockScreen();
    }
];

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
        startStep(qqSendMsg, params);
    }
};

events.observeNotification();
events.onNotification(function (n) {
    if (!whiteObservePackages.includes(n.getPackageName())) return;
    const info = n.getText().split("，");
    if (!operate[info[0]]) return;
    if (!device.isScreenOn()) startStep(unlockPhone);
    toast("开始执行");
    operate[info.shift()](info);
});

function test() {
    const info = ["QQ", "坚果的坚果", "消息1", "消息2", "消息3"];
    if (!device.isScreenOn()) startStep(unlockPhone);
    operate[info.shift()](info);
}
// test();
