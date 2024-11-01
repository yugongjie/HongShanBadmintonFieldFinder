import { freeTask } from './task/free.js';
import { paidTask } from './task/paid.js';

const args = process.argv.slice(2); // 获取启动参数

// 检查参数
if (args.includes('free')) {
  console.log('Executing free task...');
  freeTask(); // 执行 freeTask
}

if (args.includes('paid')) {
  console.log('Executing paid task...');
  paidTask(); // 执行 paidTask
}

// 如果没有参数
if (!args.includes('free') && !args.includes('paid')) {
  console.log('No valid task specified. Use "free" or "paid".');
}
