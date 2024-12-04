/*
 * @Author: N0ts
 * @Date: 2024-12-04 15:39:35
 * @Description: windows listen
 * @FilePath: \mi\v2\windows-listen.js
 * @Mail: mail@n0ts.top
 */
const { exec, execFile } = require("child_process");

function runCmd(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`执行命令时出错: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`命令错误输出: ${stderr}`);
            return;
        }
    });
}

function runExe(exePath) {
    execFile(exePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`执行 EXE 时出错: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`EXE 错误输出: ${stderr}`);
            return;
        }
    });
}

runExe("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe");
