const dataConfig = {
  defaultChartColors: {
    buildup: "brown",
    drawdown: "lightblue",
    "Electricity Generation": "#FF4C24",
    Transport: "#009B9E",
    Food: "#529334",
    Industry: "#3885CC",
    "Land Sinks": "#C87828",
    "Ocean Sinks": "#007494"
  },
  techMap: {
    default: "grey",
    buildup: "buildup",
    drawdown: "drawdown",
    "Electricity Generation": "electricity",
    Transport: "transport",
    Food: "food",
    Industry: "industry",
    "Land Sinks": "land",
    "Land Use": "land",
    "Ocean Sinks": "coastal",
    Ocean: "coastal",
    "Buildings and Cities": "buildings",
    "Health and Education": "health",
    Materials: "materials",
    "Women and Girls": "women"
  },
  // TO-DO: Map coorect icons
  iconMap: {
    default: "user",
    buildup: "user",
    drawdown: "user",
    "Electricity Generation": "user",
    Transport: "truck",
    Food: "user",
    Industry: "industry",
    "Land Sinks": "user",
    "Land Use": "user",
    "Ocean Sinks": "user",
    Ocean: "user",
    "Buildings and Cities": "building",
    Materials: "user",
    "Women and Girls": "user"
  },
  sinkSectors: [
    "Utility Scale Solar PV",
    "Improved Rice "
  ],
  sourceSectors: [
    "Nutrient Management"
  ],
  // FIXME rename `sector` to `sectorName`
  // FIXME include this at compile time instead of as a context
  // Currently not in use
  technologiesBySector: {
    "Materials": [
      "refrigerants",
      "altcement",
      "waterefficiency",
      "bioplastic",
      "recycledpaper"
    ],
    "Electricity Generation": [
      "onshorewind",
      "solarpvutil",
      "solarpvroof",
      "geothermal",
      "nuclear",
      "offshorewind",
      "concentratedsolar",
      "waveandtidal",
      "biogas",
      "biomass",
      "solarhotwater",
      "instreamhydro",
      "biogas_small",
      "wastetoenergy",
      "microwind"
    ],
    "Land Use": [
      "tropicalforests",
      "temperateforests",
      "peatlands",
      "afforestation",
      "bamboo",
      "forestprotection",
      "indigenouspeoplesland",
      "perennialbioenergy"
    ],
    "Food": [
      "silvopasture",
      "regenerativeagriculture",
      "tropicaltreestaples",
      "conservationagriculture",
      "treeintercropping",
      "managedgrazing",
      "improvedcookstoves",
      "farmlandrestoration",
      "improvedrice",
      "multistrataagroforestry",
      "riceintensification",
      "composting",
      "nutrientmanagement",
      "irrigationefficiency",
      "biochar"
    ],
    "Transport": [
      "electricvehicles",
      "ships",
      "masstransit",
      "trucks",
      "airplanes",
      "telepresence",
      "highspeedrail",
      "electricbikes",
      "trains",
      "carpooling",
      "hybridcars"
    ],
    "Buildings and Cities": [
      "districtheating",
      "insulation",
      "leds_residential",
      "heatpumps",
      "leds_commercial",
      "buildingautomation",
      "walkablecities",
      "smartthermostats",
      "landfillmethane",
      "bikeinfrastructure",
      "smartglass",
      "waterdistribution",
      "greenroofs",
      "coolroofs"
    ],
    "Women and Girls": [
      "womensmallholders"
    ],
    "Oceans": [
      "bottomtrawling"
    ],
    "Health and Education Clusters": [
      "heelectricity",
      "hespaceheating",
    ]
  },
  technologyMetadata: {
    refrigerants: {
      name: "Refrigerant Management",
      sector: "Materials",
      type: "Source"
    },
    onshorewind: {
      name: "Onshore Wind Turbines",
      sector: "Electricity Generation",
      type: "Source"
    },
    tropicalforests: {
      name: "Tropical Forest Restoration",
      sector: "Land Use",
      type: "Source"
    },
    solarpvutil: {
      name: "Utility-scale Solar Photovoltaics",
      sector: "Electricity Generation",
      type: "Source"
    },
    silvopasture: { name: "Silvopasture", sector: "Food", type: "Source" },
    solarpvroof: {
      name: "Distributed Solar Photovoltaics",
      sector: "Electricity Generation",
      type: "Source"
    },
    regenerativeagriculture: {
      name: "Regenerative Annual Cropping",
      sector: "Food",
      type: "Source"
    },
    temperateforests: {
      name: "Temperate Forest Restoration",
      sector: "Land Use",
      type: "Sink"
    },
    peatlands: { name: "Peatland Protection & Rewetting", sector: "Land Use", type: "Sink" },
    tropicaltreestaples: {
      name: "Perennial Staple Crops",
      sector: "Food",
      type: "Source"
    },
    afforestation: { name: "Tree Plantations (on Degraded Land)", sector: "Land Use", type: "Sink" },
    conservationagriculture: {
      name: "Conservation Agriculture",
      sector: "Food",
      type: "Source"
    },
    treeintercropping: {
      name: "Tree Intercropping",
      sector: "Food",
      type: "Source"
    },
    geothermal: {
      name: "Geothermal Power",
      sector: "Electricity Generation",
      type: "Source"
    },
    managedgrazing: { name: "Managed Grazing", sector: "Food", type: "Source" },
    nuclear: {
      name: "Nuclear",
      sector: "Electricity Generation",
      type: "Source"
    },
    improvedcookstoves: {
      name: "Improved Clean Cookstoves",
      sector: "Food",
      type: "Source"
    },
    offshorewind: {
      name: "Offshore Wind Turbines",
      sector: "Electricity Generation",
      type: "Source"
    },
    farmlandrestoration: {
      name: "Abandoned Farmland Restoration",
      sector: "Food",
      type: "Source"
    },
    improvedrice: {
      name: "Improved Rice Production",
      sector: "Food",
      type: "Source"
    },
    concentratedsolar: {
      name: "Concentrated Solar Power",
      sector: "Electricity Generation",
      type: "Source"
    },
    electricvehicles: {
      name: "Electric Cars",
      sector: "Transport",
      type: "Source"
    },
    districtheating: {
      name: "District Heating",
      sector: "Buildings and Cities",
      type: "Source"
    },
    multistrataagroforestry: {
      name: "Multistrata Agroforestry",
      sector: "Food",
      type: "Source"
    },
    waveandtidal: {
      name: "Ocean Power",
      sector: "Electricity Generation",
      type: "Source"
    },
    biogas: {
      name: "Methane Digesters",
      sector: "Electricity Generation",
      type: "Source"
    },
    insulation: {
      name: "Insulation",
      sector: "Buildings and Cities",
      type: "Source"
    },
    ships: { name: "Efficient Ocean Shipping", sector: "Transport", type: "Source" },
    leds_residential: {
      name: "LED Lighting (Household)",
      sector: "Buildings and Cities",
      type: "Source"
    },
    biomass: {
      name: "Biomass Power",
      sector: "Electricity Generation",
      type: "Source"
    },
    bamboo: { name: "Bamboo Production", sector: "Land Use", type: "Sink" },
    altcement: {
      name: "Alternative Cements",
      sector: "Materials",
      type: "Source"
    },
    masstransit: { name: "Public Transit", sector: "Transport", type: "Source" },
    forestprotection: {
      name: "Forest Protection",
      sector: "Land Use",
      type: "Sink"
    },
    indigenouspeoplesland: {
      name: "Indigenous Peoples Forest Tenure",
      sector: "Land Use",
      type: "Sink"
    },
    trucks: { name: "Efficient Trucks", sector: "Transport", type: "Source" },
    // FIXME: restor solarhotwater when it is added to the API
    // solarhotwater: {
    //   name: "Solar Hot Water",
    //   sector: "Electricity Generation",
    //   type: "Source"
    // },
    heatpumps: {
      name: "High-Efficiency Heat Pumps",
      sector: "Buildings and Cities",
      type: "Source"
    },
    airplanes: { name: "Efficient Aviation", sector: "Transport", type: "Source" },
    leds_commercial: {
      name: "LED Lighting (Commercial)",
      sector: "Buildings and Cities",
      type: "Source"
    },
    buildingautomation: {
      name: "Building Automation Systems",
      sector: "Buildings and Cities",
      type: "Source"
    },
    waterefficiency: {
      name: "Low-Flow Fixtures",
      sector: "Materials",
      type: "Source"
    },
    bioplastic: { name: "Bioplastic", sector: "Materials", type: "Source" },
    instreamhydro: {
      name: "Small Hydropower",
      sector: "Electricity Generation",
      type: "Source"
    },
    perennialbioenergy: {
      name: "Perennial Biomass Production",
      sector: "Land Use",
      type: "Sink"
    },
    riceintensification: {
      name: "System of Rice Intensification",
      sector: "Food",
      type: "Source"
    },
    walkablecities: {
      name: "Walkable Cities",
      sector: "Buildings and Cities",
      type: "Source"
    },
    smartthermostats: {
      name: "Smart Thermostats",
      sector: "Buildings and Cities",
      type: "Source"
    },
    landfillmethane: {
      name: "Landfill Methane Capture",
      sector: "Buildings and Cities",
      type: "Source"
    },
    bikeinfrastructure: {
      name: "Bicycle Infrastructure",
      sector: "Buildings and Cities",
      type: "Source"
    },
    composting: { name: "Composting", sector: "Food", type: "Source" },
    smartglass: {
      name: "Dynamic Glass",
      sector: "Buildings and Cities",
      type: "Source"
    },
    womensmallholders: {
      name: "Sustainable Intensification for Smallholders",
      sector: "Women and Girls",
      type: "Source"
    },
    telepresence: { name: "Telepresence", sector: "Transport", type: "Source" },
    biogas_small: {
      name: "Biogas for Cooking",
      sector: "Electricity Generation",
      type: "Source"
    },
    nutrientmanagement: {
      name: "Nutrient Management",
      sector: "Food",
      type: "Source"
    },
    highspeedrail: {
      name: "High-Speed Rail",
      sector: "Transport",
      type: "Source"
    },
    irrigationefficiency: {
      name: "Farmland Irrigation Efficiency",
      sector: "Food",
      type: "Source"
    },
    wastetoenergy: {
      name: "Waste-to-Energy",
      sector: "Electricity Generation",
      type: "Source"
    },
    electricbikes: {
      name: "Electric Bicycles",
      sector: "Transport",
      type: "Source"
    },
    recycledpaper: {
      name: "Recycled Paper",
      sector: "Materials",
      type: "Source"
    },
    waterdistribution: {
      name: "Water Distribution Efficiency",
      sector: "Buildings and Cities",
      type: "Source"
    },
    biochar: { name: "Biochar Production", sector: "Food", type: "Source" },
    greenroofs: {
      name: "Green Roofs",
      sector: "Buildings and Cities",
      type: "Source"
    },
    trains: { name: "Electric Trains", sector: "Transport", type: "Source" },
    microwind: {
      name: "Micro Wind Turbines",
      sector: "Electricity Generation",
      type: "Source"
    },
    carpooling: { name: "Carpooling", sector: "Transport", type: "Source" },
    coolroofs: {
      name: "Green & Cool Roofs",
      sector: "Buildings and Cities",
      type: "Source"
    },
    bottomtrawling: {
      name: "Limiting Bottom Trawling",
      sector: "Oceans",
      type: "Sink"
    },
    hybridcars: { name: "Hybrid Cars", sector: "Transport", type: "Source" },
    // health and education
    heelectricity: {
      name: "Electricity",
      sector: "Health and Education",
      type: "HE"
    },
    hespaceheating: {
      name: "Space Heating",
      sector: "Health and Education",
      type: "HE"
    },
    hespacecooling: {
      name: "Space Cooling",
      sector: "Health and Education",
      type: "HE"
    },
    hecleancookstove: {
      name: "Clean Cook Stove",
      sector: "Health and Education",
      type: "HE"
    },
    hecomlight: {
      name: "Com Light",
      sector: "Health and Education",
      type: "HE"
    },
    hereslight: {
      name: "Res Light",
      sector: "Health and Education",
      type: "HE"
    },
    hewaterheating: {
      name: "Water Heating",
      sector: "Health and Education",
      type: "HE"
    },
    heair: {
      name: "Air",
      sector: "Health and Education",
      type: "HE"
    },
    henfreightkm: {
      name: "Nautical Freight Demand",
      sector: "Health and Education",
      type: "HE"
    },
    hepaper: {
      name: "Paper",
      sector: "Health and Education",
      type: "HE"
    },
    hepassengerkm: {
      name: "Passenger Travel Demand",
      sector: "Health and Education",
      type: "HE"
    },
    heplastic: {
      name: "Plastic",
      sector: "Health and Education",
      type: "HE"
    },
    hewater: {
      name: "Water",
      sector: "Health and Education",
      type: "HE"
    },
  },
  technologyStaticMetaData: {
    hepopulation: {
      name: "Population",
      sector: "Health and Education",
      type: "HE"
    },
    heemissionfactor: {
      name: "Emission Factors",
      sector: "Health and Education",
      type: "HE"
    }
  },
  technologyImages: {
    "abandoned-farmland-restoration": "solution_farmlandrestoration01.jpg",
    "alternative-cement": "t_solution_alternativecement02.jpg",
    "alternative-refrigerants": "t_solution_alternativerefrigerants02.jpg",
    "bamboo-production": "Solution_Bamboo01.jpg",
    "bicycle-infrastructure": "t_solution_bicycleinfrastructure02.jpg",
    "biochar-production": "t_solution_bicochar02.jpg",
    "biogas-for-cooking": "t_solution_biogasforcooking02.jpg",
    biomass: "t_solution_biomass01.jpg",
    bioplastics: "solution_bioplastics02.jpg",
    "building-automation-systems": "solution_buildingautomation01.jpg",
    "building-retrofitting": "solution_buildingretrofitting02.jpg",
    carpooling: "t_solution_carpooling02.jpg",
    "coastal-wetland-protection": "solution_coastalwetlands01.jpg",
    "coastal-wetland-restoration": "t_solution_coastalwetlandrestoration03.jpg",
    composting: "t_solution_composting01.jpg",
    concentratedsolar: "solution_concentratedsolar01.jpg",
    "conservation-agriculture": "solution_conservationagriculture01.jpg",
    "distributed-energy-storage": "t_solution_distributedenergystorage01.jpg",
    solarpvroof: "t_solution_rooftopsolar02.jpg",
    "district-heating": "t_solution_districtheating01.jpg",
    "dynamic-glass": "t_solution_dynamicglass02.jpg",
    "efficient-aviation": "airplanes-thumbnail.jpg",
    "efficient-ocean-shipping": "solution_ships01.jpg",
    "efficient-trucks": "t_solution_trucks01.jpg",
    "electric-bicycles": "t_solution_electricbicycles02.jpg",
    "electric-cars": "solution_cars03.jpg",
    "electric-trains": "solution_electrictrain02.jpg",
    "farm-irrigation-efficiency": "t_solution_farmlandirrigation01.jpg",
    "forest-protection": "t_solution_forestprotection02.jpg",
    geothermal: "t_solution_geothermal01.jpg",
    "grassland-protection": "t_solution_grasslandprotection02.jpg",
    "green-and-cool-roofs": "t_solution_greencoolroofs02.jpg",
    "grid-flexibility": "t_solution_gridflexibility01.jpg",
    "health-and-education": "t_solution_girlseducation02.jpg",
    "high-efficiency-heat-pumps": "t_solution_heatpumps01.jpg",
    "high-performance-glass": "t_solution_highperformanceglass02.jpg",
    "high-speed-rail": "t_solution_highspeedrail01.jpg",
    "hybrid-cars": "t_solution_hybridcars03.jpg",
    "improved-clean-cookstoves": "t_solution_cookstoves01.jpg",
    "improved-rice-production": "t_solution_improvedricecultivation01.jpg",
    "indigenous-peoples-forest-tenure":
      "t_solution_indigenouslandmanagement01.jpg",
    insulation: "solution_insulation02.jpg",
    "landfill-methane-capture": "t_solution_landfillmethanecapture01.jpg",
    "led-lighting": "t_solution_ledlighting02.jpg",
    "low-flow-fixtures": "t_solution_watersavingsathome01.jpg",
    "managed-grazing": "t_solution_managedgrazing01.jpg",
    biogas: "t_solution_methanedigesters02.jpg",
    microwind: "t_solution_microwind01.jpg",
    microgrids: "t_solution_microgrids01.jpg",
    "multistrata-agroforestry": "t_solution_multistrataagroforestry01.jpg",
    "net-zero-buildings": "t_solution_netzerobuildings01.jpg",
    nuclear: "t_solution_nuclear02.jpg",
    "nutrient-management": "t_solution_nutrientmanagement02.jpg",
    waveandtidal: "t_solution_wavetidal01.jpg",
    offshorewind: "t_solution_windturbinesoffshore01.jpg",
    onshorewind: "t_solution_windturbinesonshore01.jpg",
    "peatland-protection-and-rewetting": "t_solution_peatlands01.jpg",
    "perennial-biomass-production": "t_solution_perennialbiomass01.jpg",
    "perennial-staple-crops": "t_solution_tropicalstapletrees01.jpg",
    "plant-rich-diets": "solution_plantrichdiets02.jpg",
    "public-transit": "t_solution_publictransit02.jpg",
    "recycled-paper": "t_solution_recycledpaper01.jpg",
    recycling: "t_solution_recycling02.jpg",
    "reduced-food-waste": "t_solution_reducedfoodwaste02.jpg",
    "refrigerant-management": "t_solution_refrigerantmanagement02.jpg",
    "regenerative-annual-cropping": "t_solution_regenerativeagriculture01.jpg",
    silvopasture: "t_solution_silvopasture01.jpg",
    instreamhydro: "t_solution_smallhydro02.jpg",
    "smart-thermostats": "t_solution_smartthermostat02.jpg",
    // solarhotwater: "t_solution_solarwater01.jpg",
    "sustainable-intensification-for-smallholders":
      "t_solution_womensmallholder01.jpg",
    "system-of-rice-intensification":
      "t_solution_systemofriceintensification02.jpg",
    telepresence: "t_solution_telepresence01.jpg",
    "temperate-forest-restoration": "t_solution_temperateforests01.jpg",
    "tree-intercropping": "t_solution_treeintercropping01.jpg",
    "tree-plantations-on-degraded-land": "afforestation-thumbnail.jpg",
    "tropical-forest-restoration": "t_solution_tropicalforests02.jpg",
    "utility-scale-energy-storage": "t_solution_utilityenergystorage01.jpg",
    solarpvutil: "t_solution_solarfarms01.jpg",
    "walkable-cities": "t_solution_walkablecities01.jpg",
    wastetoenergy: "t_solution_wastetoenergy02.jpg",
    "water-distribution-efficiency": "t_solution_waterdistribution01.jpg"
  }
};
export default dataConfig;
