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
 * @FilePath: \autoxjs\main.js
 * @Mail: mail@n0ts.top
 */
"ui";

auto.waitFor();
toast("插件已启用");

require("./init");
require("./ui");
require("./observe");
