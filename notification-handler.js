events.observeNotification();
events.onNotification(function (n) {
    console.log("监听消息啦", n.getTitle(), n.getText(), n.getPackageName());
    if (n.getPackageName() != "com.xiaomi.smarthome") return; //过滤非小米智能家居消息
    const info = n.getText().split(":");
    console.log(info);
});