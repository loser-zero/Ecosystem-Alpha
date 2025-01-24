// src/reportWebVitals.ts
const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && performance.getEntriesByName) {
    performance.getEntriesByName('web-vital').forEach((entry) => {
      onPerfEntry(entry);
    });
  }
};

export default reportWebVitals;