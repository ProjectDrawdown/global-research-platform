export default {
  data: {
    name: "HE: Electricity",
    data: {
      "EMISSIONS ALLOCATIONS in LLDC": {
        "Health and Education": {
          conventional: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
          solution: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
        },
        "Education": {
          conventional: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
          solution: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
        },
        "Family Planning": {
          conventional: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
          solution: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
        },
      },
      "EMISSIONS ALLOCATIONS in MDC": {
        "Health and Education": {
          conventional: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
          solution: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
        },
        "Education": {
          conventional: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
          solution: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
        },
        "Family Planning": {
          conventional: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
          solution: [
            {
              year: "2014",
              value: 1000
            },
            {
              year: "2015",
              value: 2000
            },
            {
              year: "2016",
              value: 1000
            }
          ],
        },
      }
    },
    hash: null
  },
  technologies: {
    heelectricity: {
      tam_mix: {
        coal: {
          adoption: 10,
          in_integration: "ignore"
        },
        natural_gas: {
          adoption: 22,
          in_integration: "ignore"
        },
        nuclear: {
          adoption: 15.8,
          in_integration: "ignore"
        },
        oil: {
          adoption: 70,
          in_integration: "ignore"
        },
      },
      fixed_weighting_factor: 0.094,
      use_fixed_weight: 0.234,
      impact_of_ed_attainment: 12,
    }
  }
}