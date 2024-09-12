/*
 * @Author: N0ts
 * @Date: 2024-09-11 10:48:50
 * @Description: 监听手机通知触发自动化操作
 * 举例：监听小米智能家居的通知，自动解锁手机，打开QQ，发送信息到指定人
 * 如手机通知有内容为：QQ，名字，内容1，内容2，内容3
 * 则会打开 QQ，根据当前屏幕找到含有这个名字的内容点击，然后发送内容1，内容2，内容3，最后息屏；
 * 目前支持格式：
 * 无密码： QQ，名字，内容1，内容2，内容3
 * 有密码：QQ，密码，名字，内容1，内容2，内容3
 * @FilePath: \autoxjs\mi.js
 * @Mail: mail@n0ts.top
 */

auto.waitFor();
toast("插件已启用");

// 监听哪些包的消息，白名单
const whiteObservePackages = ["com.tencent.mobileqq", "com.xiaomi.smarthome"];

// 触发密码（可以不设置）
const pwd = "123";

// 手机锁屏密码按键坐标
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

// 解锁手机的步骤
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

// QQ 发送信息到具体人的步骤
const qqSendMsg = [
    () => {
        const launchResult = launch("com.tencent.mobileqq");
        if (!launchResult) {
            toast("启动QQ失败");
            return false;
        }
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

// 应用操作配置
const AppOperate = {
    QQ: (params) => {
        startStep(qqSendMsg, params);
    }
};

// 消息监听
events.observeNotification();
events.onNotification(function (n) {
    // n.delete();
    if (!whiteObservePackages.includes(n.getPackageName())) return;
    const info = n.getText().split("，");
    if (pwd && info[1] != pwd) {
        console.log("密码错误，拒绝执行！", info);
        return;
    }
    if (!AppOperate[info[0]]) return;
    if (!device.isScreenOn()) startStep(unlockPhone);
    toast("开始执行");
    AppOperate[info.shift()](info);
    n.delete();
});

function test() {
    const info = ["QQ", "坚果的坚果", "消息1", "消息2", "消息3"];
    if (!device.isScreenOn()) startStep(unlockPhone);
    AppOperate[info.shift()](info);
}
// test();
