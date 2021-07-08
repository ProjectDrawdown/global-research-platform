export const mockChartData = [
  [
    {
      sector: "Electricity Generation",
      amount: 25
    },
    {
      sector: "Transport",
      amount: 14
    },
    {
      sector: "Food",
      amount: 24
    },
    {
      sector: "Industry",
      amount: 21
    },
    {
      sector: "Land Sinks",
      amount: 24
    },
    {
      sector: "Ocean Sinks",
      amount: 17
    }
  ],

  [
    {
      sector: "Electricity Generation",
      amount: 17
    },
    {
      sector: "Transport",
      amount: 10
    },
    {
      sector: "Food",
      amount: 20
    },
    {
      sector: "Industry",
      amount: 15
    },
    {
      sector: "Land Sinks",
      amount: 34
    },
    {
      sector: "Ocean Sinks",
      amount: 37
    }
  ]
];

export function interpolateMockChartData(
  mockChartData,
  startYear,
  endYear,
  coefPowers
) {
  const years = Array(1 + endYear - startYear)
    .fill(startYear)
    .map((year, index) => year + index);
  const startVals = mockChartData[0];
  const endVals = mockChartData[mockChartData.length - 1];
  const yearsData = years.reduce((dataYears, year, yearIndex) => {
    const progress = yearIndex / (endYear - startYear);
    dataYears[year] = startVals.map(
      ({ sector, amount: startAmount }, sectorsIndex) => {
        const endValForSector = endVals.find(
          ({ sector: endvalSector, amount }) => endvalSector === sector
        ).amount;
        const coef = Math.pow(progress, coefPowers[sectorsIndex]);
        return {
          sector,
          amount: startAmount + coef * (endValForSector - startAmount)
        };
      }
    );
    return dataYears;
  }, {});
  return yearsData;
}

export const mockChartData2020To2060 = interpolateMockChartData(
  mockChartData,
  2020,
  2060,
  [1, 1, 0.8, 3, 0.7, 5]
);

// Dummy sectors from the  drawdown.org sink/source diagrams
export const mockSinkSectorsData = ["Land Sinks", "Ocean Sinks"];

export const mockSourceSectorsData = [
  "Electricity Generation",
  "Transport",
  "Food",
  "Industry"
];
