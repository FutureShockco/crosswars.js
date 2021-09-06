const calculateCostToUpgrade = (amount, level) => {
  if (!amount) {
    return 0;
  }
  return level
    ? (amount * (level + 1 * (level + 1) * (2 * (level + 1)))) / 5
    : ((amount * 2) / 5) * 2.5;
};

const calculateTimeToBuild = (id, coeff, level, hqLevel) =>
  id === 'headquarters'
    ? Math.sqrt(level) * (level * 200000)
    : ((coeff * 2000 * ((Math.sqrt(625 + 100 * (level * 250)) - 25) / 50)) / hqLevel) * 1000;

const calculateTimeToTrain = (coeff, level, amount) =>
  ((coeff * 160 - (level * 70) / 100)) * amount * 1000;

const getBalances = (user, ocLvl, timestamp) => {
  const time = (timestamp - new Date(user.last_update).getTime()) / 1000;
  let cash = user.cash_balance + Number(parseFloat(time * user.cash_production_rate).toFixed(2));
  let weapon =
    user.weapon_balance + Number(parseFloat(time * user.weapon_production_rate).toFixed(2));
  let alcohol =
    user.alcohol_balance + Number(parseFloat(time * user.alcohol_production_rate).toFixed(2));
  if (ocLvl > 0) {
    cash += (ocLvl + time * user.cash_production_rate) * 0.005;
    weapon += (ocLvl + time * user.weapon_production_rate) * 0.005;
    alcohol += (ocLvl + time * user.alcohol_production_rate) * 0.005;
  }
  return {
    cash: cash > user.cash_storage ? user.cash_storage : cash,
    weapon: weapon > user.weapon_storage ? user.weapon_storage : weapon,
    alcohol: alcohol > user.alcohol_storage ? user.alcohol_storage : alcohol,
  };
};

const calculateDistanceTime = (fromTerritory, fromBase, toTerritory, toBase) => {
  const territoryDif = (fromTerritory > toTerritory) ? fromTerritory - toTerritory : toTerritory - fromTerritory
  const baseDif = (fromBase > toBase) ? fromBase - toBase : toBase - fromBase
  return territoryDif + baseDif;
};

const calculateDistanceCost = (moveCost, distance) => {
  return moveCost * distance;
};

export default {
  calculateCostToUpgrade,
  calculateTimeToBuild,
  calculateTimeToTrain,
  calculateDistanceTime,
  calculateDistanceCost,
  getBalances,
};
