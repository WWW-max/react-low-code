#! /usr/bin/env node

const { execSync } = require("child_process");

try {
    console.log("Starting deployment...");
    execSync("npm run build", { stdio: 'inherit'});
    console.log("Executing npm start...");
    execSync("npm run start", { stdio: 'inherit'});
} catch (error) {
    console.error('Deployment failed:', error.message);
    process.exit(1);
}