// initialize

var money, days, reward;
var miners = [0, 0, 0];
var upgrades = [0, 0, 0];
var upgradesCosts = [100, 250, 1000];
var minersCosts = [20, 750, 25000];

function initialize () {
  money = parseFloat(localStorage.getItem("Money")) || 20;
  days = parseInt(localStorage.getItem("Days")) || 0;
  reward = localStorage.getItem("Reward") || "Pay Per Share";
  for (let i = 0; i < miners.length; i++) {
    miners[i] = parseInt(localStorage.getItem("Miners" + i)) || 0;
  }
  for (let i = 0; i < upgrades.length; i++) {
    upgrades[i] = parseInt(localStorage.getItem("Upgrades" + i)) || 0;
  }
  minersCosts = [20, 750, 25000];
  for (let i = 0; i < minersCosts.length; i++) {
    minersCosts[i] = parseFloat(localStorage.getItem("MinersCosts" + i)) || minersCosts[i];
  }
}
initialize();

// day function
function day () {
  var hashrate = (miners[0] * 100 + miners[1] * 2500 + miners[2] * 15000) * (1 + 0.1 * upgrades.reduce((acc, curr) => acc + curr, 0));
  hashrate *= 86400;
  if (reward == "Pay Per Share" && hashrate != 0) {
    var difficulty = 2**20;
    money += poisson(hashrate, difficulty) * difficulty / 2**32 * 0.95 * 200;
  } else if (hashrate != 0) {
    var difficulty = 2**32
    money += poisson(hashrate, difficulty) * 200;
  }
  days++;
  updateScreen();
  updateLocalValues();
}
setInterval(day, 1000)
updateScreen();

// big rng calculate function (idk how it works but it does i love math)

function poisson(hash, difficulty) {
  var earned = 0;
  let lambda = hash / difficulty;
  let L = Math.exp(-lambda);
  let p = 1.0;
  while (p > L) {
      p *= Math.random();
      earned += 1;
    }
  earned--;
  return(earned);
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
  var hashrate = (miners[0] * 100 + miners[1] * 2500 + miners[2] * 15000) * (1 + 0.1 * upgrades.reduce((acc, curr) => acc + curr, 0));
  if (hashrate < 1000) {
    document.getElementById("hashes").innerText = "Hashrate: " + Math.floor(hashrate) + "H/s";
  } else if (hashrate < 1000000) {
    document.getElementById("hashes").innerText = "Hashrate: " + Math.floor(hashrate / 1000) + "kH/s";
  } else {
    document.getElementById("hashes").innerText = "Hashrate: " + Math.floor(hashrate / 1000000) + "mH/s";
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
  for (let i = 0; i < miners.length; i++) {
    localStorage.setItem("Miners" + i, miners[i]);
  }
  for (let i = 0; i < upgrades.length; i++) {
    localStorage.setItem("Upgrades" + i, upgrades[i]);
  }
  for (let i = 0; i < minersCosts.length; i++) {
    localStorage.setItem("MinersCosts" + i, minersCosts[i]);
  }
}

// handle purchasing

function buyUpgrade(num) {
  if (money >= upgradesCosts[num]) {
    upgrades[num]++;
    money -= upgradesCosts[num];
    document.getElementById("upgrade" + num).style.visibility = "hidden";
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

// reset

function reset() {
  const confirmation = confirm("Are you sure you want to reset? This will clear all data.");
  if (confirmation) {
    localStorage.clear();
    initialize();
  }
}

document.getElementById("reset").addEventListener("click", reset);

