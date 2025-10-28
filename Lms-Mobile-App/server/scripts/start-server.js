#!/usr/bin/env node

const { spawn } = require('child_process');
const chalk = require('chalk');

// Display startup banner
console.log(chalk.magenta('════════════════════════════════════════════════════════════════'));
console.log(chalk.magenta.bold('                    LMS BACKEND SERVER                        '));
console.log(chalk.magenta('════════════════════════════════════════════════════════════════'));

// Get current timestamp
const getTimestamp = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
};

console.log(chalk.green(`[INFO] ${getTimestamp()} ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.1.6)`));
console.log(chalk.green(`[INFO] ${getTimestamp()} Starting LMS Backend Server...`));

// Start the server
const path = require('path');
const serverDir = path.join(__dirname, '..');
const serverProcess = spawn('npx', ['ts-node-dev', '--respawn', '--transpile-only', 'server.ts'], {
  stdio: 'pipe',
  cwd: serverDir
});

let redisConnected = false;
let serverConnected = false;
let dbConnected = false;

serverProcess.stdout.on('data', (data) => {
  const output = data.toString().trim();
  
  // Filter and customize messages
  if (output.includes('Redis connected') && !redisConnected) {
    console.log(chalk.green(`[INFO] ${getTimestamp()} Redis connected`));
    redisConnected = true;
  } else if (output.includes('Server is connected with port') && !serverConnected) {
    const portMatch = output.match(/port (\d+)/);
    const port = portMatch ? portMatch[1] : '8000';
    console.log(chalk.green(`[INFO] ${getTimestamp()} Server is connected with port ${port}`));
    serverConnected = true;
  } else if (output.includes('Database connected with') && !dbConnected) {
    const dbMatch = output.match(/Database connected with (.+)/);
    const dbName = dbMatch ? dbMatch[1] : 'MongoDB';
    console.log(chalk.green(`[INFO] ${getTimestamp()} Database connected with ${dbName}`));
    console.log(chalk.cyan('════════════════════════════════════════════════════════════════'));
    console.log(chalk.yellow(`[INFO] ${getTimestamp()} LMS Backend Server ready for connections`));
    console.log(chalk.blue(`[INFO] ${getTimestamp()} API endpoints available at http://localhost:8000/api/v1`));
    console.log(chalk.cyan('════════════════════════════════════════════════════════════════'));
    dbConnected = true;
  } else if (output.includes('[INFO]') && output.includes('ts-node-dev ver.')) {
    // Skip the default ts-node-dev message since we're showing our own
    return;
  } else if (output.includes('Restarting:')) {
    console.log(chalk.yellow(`[INFO] ${getTimestamp()} File changed, restarting server...`));
    // Reset connection flags for restart
    redisConnected = false;
    serverConnected = false;
    dbConnected = false;
  } else if (output && 
             !output.includes('NODE_ENV:') && 
             !output.includes('Running in development mode') &&
             !output.includes('Creating new user') &&
             !output.includes('User already exists') &&
             output.length > 0) {
    // Show other important messages
    process.stdout.write(output + '\n');
  }
});

serverProcess.stderr.on('data', (data) => {
  const error = data.toString().trim();
  if (error.includes('EADDRINUSE')) {
    console.log(chalk.red(`[ERROR] ${getTimestamp()} Port 8000 is already in use`));
    console.log(chalk.yellow(`[INFO] ${getTimestamp()} Please stop other instances or use a different port`));
  } else if (!error.includes('ExperimentalWarning')) {
    console.error(chalk.red(`[ERROR] ${getTimestamp()} ${error}`));
  }
});

serverProcess.on('close', (code) => {
  if (code !== 0) {
    console.log(chalk.red(`[ERROR] ${getTimestamp()} Server process exited with code ${code}`));
  } else {
    console.log(chalk.yellow(`[INFO] ${getTimestamp()} LMS Backend Server stopped`));
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log(chalk.yellow(`\n[INFO] ${getTimestamp()} Shutting down LMS Backend Server...`));
  serverProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow(`\n[INFO] ${getTimestamp()} Shutting down LMS Backend Server...`));
  serverProcess.kill('SIGTERM');
});