export function getCachedHeroes(name) {
  let data = window.localStorage.getItem(name);
  return data ? JSON.parse(data) : [];
}

export function getSumOfPower(hero) {
  return Object.values(hero?.powerstats).reduce((acc, curr) => acc + curr, 0);
}
