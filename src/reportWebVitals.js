"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/reportWebVitals.ts
const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && performance.getEntriesByName) {
        performance.getEntriesByName('web-vital').forEach((entry) => {
            onPerfEntry(entry);
        });
    }
};
exports.default = reportWebVitals;
