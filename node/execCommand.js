const { spawn } = require('child_process');

function execCommand(command) {
  const spawnInstance = spawn(command, {
    encoding: 'utf8',
    cwd: process.cwd(), // 执行命令路径
    shell: true, // 使用shell命令
  })
  // 监听命令行执行过程的输出
  spawnInstance.stdout.on('data', (data) => {
    const value = data.toString().trim()
    console.log(`stdout: ${value}`)
  })
  // 错误或详细状态进度报告 比如 git push、 git clone 
  spawnInstance.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })
  spawnInstance.unref(); // detach from parent process

  return spawnInstance
}

module.exports = execCommand