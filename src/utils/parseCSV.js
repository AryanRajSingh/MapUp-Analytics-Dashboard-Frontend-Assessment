// src/utils/parseCSV.js
import Papa from 'papaparse';

export const parseCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();  // Get the response as text
      })
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => resolve(results.data),
          error: (error) => {
            console.error("Parsing error:", error);
            reject(error);
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching the CSV file:', error);
        reject(error);
      });
  });
};
