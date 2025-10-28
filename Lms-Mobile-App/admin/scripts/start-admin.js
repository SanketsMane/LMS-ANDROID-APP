#!/usr/bin/env node

const { spawn } = require('child_process');
const chalk = require('chalk');

// Display startup banner
console.log(chalk.cyan('════════════════════════════════════════════════════════════════'));
console.log(chalk.cyan.bold('                    LMS ADMIN PANEL                         '));
console.log(chalk.cyan('════════════════════════════════════════════════════════════════'));

// Get current timestamp
const getTimestamp = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
};

console.log(chalk.green(`[INFO] ${getTimestamp()} Starting LMS Admin Panel...`));
console.log(chalk.green(`[INFO] ${getTimestamp()} Next.js development server initializing...`));

// Start the Next.js development server
const nextProcess = spawn('npx', ['next', 'dev'], {
  stdio: 'pipe',
  env: { ...process.env, NODE_OPTIONS: '--no-deprecation' }
});

let serverStarted = false;

nextProcess.stdout.on('data', (data) => {
  const output = data.toString();
  
  // Filter and customize messages
  if (output.includes('ready started server')) {
    const portMatch = output.match(/url: http:\/\/localhost:(\d+)/);
    const port = portMatch ? portMatch[1] : '3000';
    console.log(chalk.green(`[INFO] ${getTimestamp()} Admin panel server started successfully`));
    console.log(chalk.blue(`[INFO] ${getTimestamp()} Server running on http://localhost:${port}`));
    console.log(chalk.yellow(`[INFO] ${getTimestamp()} Environment: Development`));
    console.log(chalk.green(`[INFO] ${getTimestamp()} Admin dashboard ready for connections`));
    console.log(chalk.cyan('════════════════════════════════════════════════════════════════'));
    serverStarted = true;
  } else if (output.includes('compiled client and server successfully') && serverStarted) {
    console.log(chalk.green(`[INFO] ${getTimestamp()} Application compiled successfully`));
  } else if (output.includes('warn Port') && output.includes('in use')) {
    const portMatch = output.match(/trying (\d+) instead/);
    const newPort = portMatch ? portMatch[1] : 'unknown';
    console.log(chalk.yellow(`[WARN] ${getTimestamp()} Port conflict detected, switching to port ${newPort}`));
  }
  
  // Hide verbose Next.js messages but show important ones
  if (!output.includes('- info Loaded env') && 
      !output.includes('- wait compiling') && 
      !output.includes('- event compiled') &&
      !output.includes('- ready started server') &&
      !output.includes('- warn Port')) {
    process.stdout.write(output);
  }
});

nextProcess.stderr.on('data', (data) => {
  const error = data.toString();
  if (!error.includes('ExperimentalWarning')) {
    console.error(chalk.red(`[ERROR] ${getTimestamp()} ${error.trim()}`));
  }
});

nextProcess.on('close', (code) => {
  if (code !== 0) {
    console.log(chalk.red(`[ERROR] ${getTimestamp()} Admin panel process exited with code ${code}`));
  } else {
    console.log(chalk.yellow(`[INFO] ${getTimestamp()} Admin panel server stopped`));
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log(chalk.yellow(`\n[INFO] ${getTimestamp()} Shutting down admin panel...`));
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow(`\n[INFO] ${getTimestamp()} Shutting down admin panel...`));
  nextProcess.kill('SIGTERM');
});