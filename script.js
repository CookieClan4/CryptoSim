// initialize

var money, days, reward, blocksMined;
var miners = [0, 0, 0, 0, 0, 0];
var upgrades = [0, 0, 0];
var upgradesCosts = [100, 250, 1000];
var minersCosts = [20, 750, 25000, 250000, 3000000, 50000000];
var achievements = [0, 0, 0, 0, 0];

function initialize () {
  money = parseFloat(localStorage.getItem("Money")) || 20;
  days = parseInt(localStorage.getItem("Days")) || 0;
  blocksMined = parseInt(localStorage.getItem("Blocks")) || 0;
  reward = localStorage.getItem("Reward") || "Pay Per Share";
  for (let i = 0; i < miners.length; i++) {
    miners[i] = parseInt(localStorage.getItem("Miners" + i)) || 0;
  }
  for (let i = 0; i < upgrades.length; i++) {
    upgrades[i] = parseInt(localStorage.getItem("Upgrades" + i)) || 0;
    if (upgrades[i] == 1) {
      document.getElementById("upgrade" + i).style.display = "none";
    } else {
      document.getElementById("upgrade" + i).style.display = "button";
    }
  }
  for (let i = 0; i < achievements.length; i++) {
    achievements[i] = parseInt(localStorage.getItem("Achievements" + i)) || 0;
    if (achievements[i] == 1) {
      document.getElementById("achievement" + i).style.display = "block";
    } else {
      document.getElementById("achievement" + i).style.display = "none";
    }
  }
  minersCosts = [20, 750, 25000, 250000, 3000000, 50000000];
  for (let i = 0; i < minersCosts.length; i++) {
    minersCosts[i] = parseFloat(localStorage.getItem("MinersCosts" + i)) || minersCosts[i];
  }
}
initialize();


// day function

function day () {
  var hashrate = (miners[0] * 100 + miners[1] * 2500 + miners[2] * 15000 + miners[3] * 90000 + miners[4] * 1000000 + miners[5] * 6000000) * (1 + 0.1 * upgrades.reduce((acc, curr) => acc + curr, 0));
  hashrate *= 86400;
  if (reward == "Pay Per Share") {
    var difficulty = 2**22;
    money += (poisson(hashrate, difficulty) * (difficulty / 2**32) * (200 * 0.95))
  } else {
    var difficulty = 2**32
    var blocks = poisson(hashrate, difficulty);
    money += blocks * 200;
    blocksMined += blocks;
  }
  days++;
  updateScreen();
  updateLocalValues();
  testAchievements();
}
setInterval(day, 1000)
updateScreen();

// big rng calculate function (idk how it works but it does i love math), taken from ChatGPT with modifications

function poisson(hash, difficulty) { // improved using log, can pretty much do any number
  if (hash != 0) {
      var earned = 0;
    let lambda = hash / difficulty;
    let logL = -lambda;
    let logP = 0;
  
    while (logP > logL) {
      logP += Math.log(Math.random());
      earned += 1;
      }
    earned--;
    return earned;
  } else {
    return(0);
  }
}


// update screen bc yk thats important

function updateScreen() {
  // stats
  document.getElementById("moneyCount").innerText = "Money: $" + money.toFixed(3);
  document.getElementById("days").innerText = "Days: " + days;
  
  // handle reward
  if (reward == "Pay Per Share") {
    document.getElementById("reward").innerText = "Reward: Pay Per Share (-5%)";
  } else {
    document.getElementById("reward").innerText = "Reward: Blocks (-0%)";
  }
  
  // handle hashrate calc
  var hashrate = (miners[0] * 100 + miners[1] * 2500 + miners[2] * 15000 + miners[3] * 90000 + miners[4] * 1000000 + miners[5] * 6000000) * (1 + 0.1 * upgrades.reduce((acc, curr) => acc + curr, 0));
  if (hashrate < 1000) {
    document.getElementById("hashes").innerText = "Hashrate: " + Math.floor(hashrate) + "H/s";
  } else if (hashrate < 1000000) {
    document.getElementById("hashes").innerText = "Hashrate: " + (Math.floor(hashrate) / 1000).toFixed(1) + "kH/s";
  } else {
    document.getElementById("hashes").innerText = "Hashrate: " + (Math.floor(hashrate) / 1000000).toFixed(1) + "mH/s";
  }
  
  // handle miner buttons
  for (let i = 0; i < miners.length; i++) {
    document.getElementById("miner" + i + "count").innerText = "(" + miners[i] + ")";
  }
  for (let i = 0; i < minersCosts.length; i++) {
    document.getElementById("miner" + i + "cost").innerText = "$" + minersCosts[i].toFixed(2);
  }
}

// local storage stuff
function updateLocalValues() {
  localStorage.setItem("Money", money);
  localStorage.setItem("Days", days);
  localStorage.setItem("Reward", reward);
  localStorage.setItem("Blocks", blocksMined);
  for (let i = 0; i < miners.length; i++) {
    localStorage.setItem("Miners" + i, miners[i]);
  }
  for (let i = 0; i < upgrades.length; i++) {
    localStorage.setItem("Upgrades" + i, upgrades[i]);
  }
  for (let i = 0; i < minersCosts.length; i++) {
    localStorage.setItem("MinersCosts" + i, minersCosts[i]);
  }
  for (let i = 0; i < achievements.length; i++) {
    localStorage.setItem("Achievements" + i, achievements[i]);
  }
}

// handle purchasing

function buyUpgrade(num) {
  if (money >= upgradesCosts[num]) {
    upgrades[num]++;
    money -= upgradesCosts[num];
    document.getElementById("upgrade" + num).style.display = "none";
    updateScreen();
  }
}
for (let i = 0; i < upgrades.length; i++) {
  document.getElementById("upgrade" + i).addEventListener("click", function() {
    buyUpgrade(i);
  });
}

function buyMiner(num) {
  if (money >= minersCosts[num]) {
    miners[num]++;
    money -= minersCosts[num].toFixed(2);
    minersCosts[num] *= 1.1;
    updateScreen();
  }
}
for (let i = 0; i < miners.length; i++) {
  document.getElementById("miner" + i).addEventListener("click", function() {
    buyMiner(i);
  });
}

// change Reward

function changeReward() {
  if (reward == "Pay Per Share") {
    reward = "Blocks";
  } else {
    reward = "Pay Per Share";
  }
  updateScreen();
}
document.getElementById("changeReward").addEventListener("click", changeReward);

// handle achievements

function testAchievements () {
  if (achievements[0] == 0) {
    if (miners[0] >= 1) {
      achievements[0] = 1;
      document.getElementById("achievement0").style.display = "block";
    }
  }
  if (achievements[1] == 0) {
    if (blocksMined >= 1) {
      achievements[1] = 1;
      document.getElementById("achievement1").style.display = "block";
    }
  }
  if (achievements[2] == 0) {
    if (miners[2] >= 1) {
      achievements[2] = 1;
      document.getElementById("achievement2").style.display = "block";
    }
  }
  if (achievements[3] == 0) {
    if ((miners[0] * 100 + miners[1] * 2500 + miners[2] * 15000) * (1 + 0.1 * upgrades.reduce((acc, curr) => acc + curr, 0)) >= 1000000) {
      achievements[3] = 1;
      document.getElementById("achievement3").style.display = "block";
    }
  }
  if (achievements[4] == 0) {
    if (money >= 1000000) {
      achievements[4] = 1;
      document.getElementById("achievement4").style.display = "block";
    }
  }
}

// reset

function reset() {
  const confirmation = confirm("Are you sure you want to reset? This will clear all data.");
  if (confirmation) {
    localStorage.clear();
    initialize();
  }
}

document.getElementById("reset").addEventListener("click", reset);

