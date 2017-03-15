export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('weatherForecastState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('weatherForecastState', serializedState);
  } catch (err) {
    console.error(err);
  }
};
