export default {
  name: "HE: Electricity",
  data: {
    data: {
      "ref 1 population": {
        world: [
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
        OECD90: [
          {
            year: "2014",
            value: 2000
          },
          {
            year: "2015",
            value: 2000
          },
          {
            year: "2016",
            value: 2000
          }
        ]
      },
      "ref 2 population": {
        world: [
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
        OECD90: [
          {
            year: "2014",
            value: 2000
          },
          {
            year: "2015",
            value: 2000
          },
          {
            year: "2016",
            value: 2000
          }
        ]
      }
    }
  },
  technologies: {
    heelectricity: {
      tam_mix: {
        coal: {
          adoption: 10,
          in_solution: false,
          in_convetional: false
        },
        natural_gas: {
          adoption: 22,
          in_solution: false,
          in_convetional: false
        },
        nuclear: {
          adoption: 15.8,
          in_solution: false,
          in_convetional: false
        },
        oil: {
          adoption: 70,
          in_solution: false,
          in_convetional: false
        },
      },
      assumption: {
        fixed_weighting_factor: 0,
        use_fixed_weight: 0,
        impact_of_ed_attainment: 0
      }
    }
  }
}