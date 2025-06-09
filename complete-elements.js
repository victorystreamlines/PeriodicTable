// Enhanced periodic table with all 118 elements and professional chemistry properties
const allElements = [
    // Period 1
    {
        atomicNumber: 1, symbol: "H", name: "Hydrogen", atomicMass: 1.008, 
        classification: "nonmetals", period: 1, group: 1, position: {row: 1, col: 1},
        electronConfiguration: "1s¹",
        electronShells: [1],
        valenceElectrons: 1,
        molarMass: 1.008,
        oxidationStates: ["+1", "-1"],
        electronegativity: 2.20,
        ionizationEnergy: 1312,
        secondIonizationEnergy: null, // Only has 1 electron
        thirdIonizationEnergy: null,
        naturalAbundance: "¹H: 99.98%, ²H: 0.02%, ³H: trace",
        magneticProperty: "Diamagnetic",
        thermalConductivity: 0.1805,
        meltingPoint: 14.01,
        boilingPoint: 20.28,
        state: "Gas",
        density: 0.00008988,
        atomicRadius: 53,
        isotopes: ["¹H", "²H", "³H"],
        
        // Discovery & History
        discoveryYear: 1766,
        discoverer: "Henry Cavendish",
        discoveryLocation: "England",
        nameOrigin: "Greek 'hydro' (water) + 'genes' (forming)",
        
        // Crystal Structure
        crystalSystem: "Hexagonal",
        spaceGroup: "P6₃/mmc",
        latticeParameters: "a = 3.75 Å, c = 6.12 Å",
        
        // Chemical Properties
        reactivity: "Highly reactive, forms compounds with most elements",
        chemicalStability: "Stable as H₂ molecule",
        bondEnergy: 436, // H-H bond energy
        electronAffinity: 73,
        
        // Thermodynamic Properties
        heatOfFusion: 0.117,
        heatOfVaporization: 0.904,
        specificHeat: 14.304,
        entropy: 130.7,
        
        // Electrical Properties
        electricalConductivity: "Very low (insulator as gas)",
        resistivity: "Very high",
        dielectricConstant: 1.00026,
        
        // Additional Atomic Properties
        covalentRadius: 31,
        vanDerWaalsRadius: 120,
        ionicRadius: "H⁺: effectively 0 pm, H⁻: 154 pm",
        
        // Nuclear Properties
        halfLife: "Stable (¹H, ²H), ³H: 12.3 years",
        decayMode: "³H undergoes beta decay",
        radioactivity: "Only tritium (³H) is radioactive",
        
        // Applications & Uses
        industrialApplications: "Ammonia production, petroleum refining, rocket fuel, hydrogen fuel cells",
        medicalUses: "Breathing mixtures for deep-sea diving, medical imaging (deuterium)",
        technologicalApplications: "Fuel cells, hydrogen cars, semiconductor manufacturing, cryogenics",
        
        // Health & Safety
        toxicity: "Non-toxic but can cause asphyxiation in high concentrations",
        biologicalEffects: "Essential for life, component of water and organic compounds",
        safetyPrecautions: "Highly flammable, explosive when mixed with air, handle with caution",
        
        // Economic Information
        relativePrice: "Low cost, widely produced",
        globalProduction: "~70 million tons annually",
        availability: "Abundant, produced industrially from water and hydrocarbons",
        
        // Spectroscopic Properties
        spectralLines: "Lyman series (UV), Balmer series (visible), Paschen series (IR)",
        emissionColors: "Red (656.3 nm), Blue-green (486.1 nm), Violet (410.2 nm)",
        absorptionProperties: "Strong absorption lines in UV and visible regions"
    },
    {
        atomicNumber: 2, symbol: "He", name: "Helium", atomicMass: 4.003, 
        classification: "noble-gases", period: 1, group: 18, position: {row: 1, col: 18},
        electronConfiguration: "1s²",
        electronShells: [2],
        valenceElectrons: 2,
        molarMass: 4.003,
        oxidationStates: ["0"],
        electronegativity: null,
        ionizationEnergy: 2372,
        secondIonizationEnergy: 5251,
        thirdIonizationEnergy: null,
        naturalAbundance: "⁴He: 99.999863%, ³He: 0.000137%",
        magneticProperty: "Diamagnetic",
        thermalConductivity: 0.1513,
        meltingPoint: 0.95,
        boilingPoint: 4.22,
        state: "Gas",
        density: 0.0001785,
        atomicRadius: 31,
        isotopes: ["³He", "⁴He"],
        
        // Discovery & History
        discoveryYear: 1868,
        discoverer: "Pierre Janssen & Norman Lockyer",
        discoveryLocation: "Solar spectrum observation",
        nameOrigin: "Greek 'helios' meaning sun",
        
        // Crystal Structure
        crystalSystem: "Face-centered cubic (at high pressure)",
        spaceGroup: "Fm3m",
        latticeParameters: "a = 4.24 Å (at 25 atm)",
        
        // Chemical Properties
        reactivity: "Completely inert, no known stable compounds",
        chemicalStability: "Extremely stable, chemically inert",
        bondEnergy: null,
        electronAffinity: 0,
        
        // Thermodynamic Properties
        heatOfFusion: 0.0138,
        heatOfVaporization: 0.0829,
        specificHeat: 5.193,
        entropy: 126.2,
        
        // Electrical Properties
        electricalConductivity: "None (insulator)",
        resistivity: "Infinite",
        dielectricConstant: 1.0000065,
        
        // Additional Atomic Properties
        covalentRadius: 28,
        vanDerWaalsRadius: 140,
        ionicRadius: "Does not form ions under normal conditions",
        
        // Nuclear Properties
        halfLife: "Both isotopes stable",
        decayMode: "Stable",
        radioactivity: "Non-radioactive",
        
        // Applications & Uses
        industrialApplications: "Welding atmosphere, balloon filling, leak detection, cryogenics",
        medicalUses: "Breathing mixtures for deep-sea diving, MRI cooling",
        technologicalApplications: "Semiconductor manufacturing, space applications, telescope cooling",
        
        // Health & Safety
        toxicity: "Non-toxic but can cause asphyxiation",
        biologicalEffects: "Biologically inert, can cause narcosis at high pressures",
        safetyPrecautions: "Asphyxiation risk in enclosed spaces, proper ventilation required",
        
        // Economic Information
        relativePrice: "Expensive due to limited supply",
        globalProduction: "~180 million cubic meters annually",
        availability: "Limited, extracted from natural gas",
        
        // Spectroscopic Properties
        spectralLines: "Strong lines at 587.6 nm (yellow), 501.6 nm (green)",
        emissionColors: "Yellow, green spectral lines",
        absorptionProperties: "Minimal absorption in visible region"
    },
    
    // Period 2
    {
        atomicNumber: 3, symbol: "Li", name: "Lithium", atomicMass: 6.94, 
        classification: "alkali-metals", period: 2, group: 1, position: {row: 2, col: 1},
        electronConfiguration: "[He] 2s¹",
        electronShells: [2, 1],
        valenceElectrons: 1,
        molarMass: 6.94,
        oxidationStates: ["+1"],
        electronegativity: 0.98,
        ionizationEnergy: 520,
        secondIonizationEnergy: 7298,
        thirdIonizationEnergy: 11815,
        naturalAbundance: "⁷Li: 92.41%, ⁶Li: 7.59%",
        magneticProperty: "Paramagnetic",
        thermalConductivity: 84.8,
        meltingPoint: 453.69,
        boilingPoint: 1615,
        state: "Solid",
        density: 0.534,
        atomicRadius: 167,
        isotopes: ["⁶Li", "⁷Li"]
    },
    {
        atomicNumber: 4, symbol: "Be", name: "Beryllium", atomicMass: 9.012, 
        classification: "alkaline-earth-metals", period: 2, group: 2, position: {row: 2, col: 2},
        electronConfiguration: "[He] 2s²",
        electronShells: [2, 2],
        valenceElectrons: 2,
        molarMass: 9.012,
        oxidationStates: ["+2"],
        electronegativity: 1.57,
        ionizationEnergy: 899,
        secondIonizationEnergy: 1757,
        thirdIonizationEnergy: 14849,
        naturalAbundance: "⁹Be: 100%",
        magneticProperty: "Diamagnetic",
        thermalConductivity: 190,
        meltingPoint: 1560,
        boilingPoint: 2742,
        state: "Solid",
        density: 1.85,
        atomicRadius: 112,
        isotopes: ["⁹Be"]
    },
    {
        atomicNumber: 5, symbol: "B", name: "Boron", atomicMass: 10.81, 
        classification: "metalloids", period: 2, group: 13, position: {row: 2, col: 13},
        electronConfiguration: "[He] 2s² 2p¹",
        electronShells: [2, 3],
        valenceElectrons: 3,
        molarMass: 10.81,
        oxidationStates: ["+3", "+1"],
        electronegativity: 2.04,
        ionizationEnergy: 801,
        secondIonizationEnergy: 2427,
        thirdIonizationEnergy: 3660,
        naturalAbundance: "¹¹B: 80.1%, ¹⁰B: 19.9%",
        magneticProperty: "Diamagnetic",
        thermalConductivity: 27.4,
        meltingPoint: 2349,
        boilingPoint: 4200,
        state: "Solid",
        density: 2.34,
        atomicRadius: 87,
        isotopes: ["¹⁰B", "¹¹B"]
    },
    {
        atomicNumber: 6, symbol: "C", name: "Carbon", atomicMass: 12.01, 
        classification: "nonmetals", period: 2, group: 14, position: {row: 2, col: 14},
        electronConfiguration: "[He] 2s² 2p²",
        electronShells: [2, 4],
        valenceElectrons: 4,
        molarMass: 12.01,
        oxidationStates: ["+4", "+2", "-4"],
        electronegativity: 2.55,
        ionizationEnergy: 1086,
        secondIonizationEnergy: 2353,
        thirdIonizationEnergy: 4621,
        naturalAbundance: "¹²C: 98.93%, ¹³C: 1.07%, ¹⁴C: trace",
        magneticProperty: "Diamagnetic",
        thermalConductivity: 129,
        meltingPoint: 3823,
        boilingPoint: 4098,
        state: "Solid",
        density: 2.267,
        atomicRadius: 67,
        isotopes: ["¹²C", "¹³C", "¹⁴C"],
        
        // Discovery & History
        discoveryYear: "Ancient times",
        discoverer: "Known to ancient civilizations",
        discoveryLocation: "Worldwide",
        nameOrigin: "Latin 'carbo' meaning charcoal",
        
        // Crystal Structure
        crystalSystem: "Cubic (diamond), Hexagonal (graphite)",
        spaceGroup: "Fd3m (diamond), P6₃/mmc (graphite)",
        latticeParameters: "Diamond: a = 3.567 Å, Graphite: a = 2.464 Å, c = 6.711 Å",
        
        // Chemical Properties
        reactivity: "Forms stable covalent bonds, basis of organic chemistry",
        chemicalStability: "Very stable, especially as diamond",
        bondEnergy: 347, // C-C single bond
        electronAffinity: 122,
        
        // Thermodynamic Properties
        heatOfFusion: 117,
        heatOfVaporization: 715,
        specificHeat: 0.709,
        entropy: 5.7,
        
        // Electrical Properties
        electricalConductivity: "Variable: Diamond (insulator), Graphite (conductor)",
        resistivity: "Diamond: >10¹⁶ Ω·m, Graphite: 10⁻⁵ Ω·m",
        dielectricConstant: "Diamond: 5.7, Graphite: variable",
        
        // Additional Atomic Properties
        covalentRadius: 76,
        vanDerWaalsRadius: 170,
        ionicRadius: "C⁴⁺: 16 pm, C⁴⁻: 260 pm",
        
        // Nuclear Properties
        halfLife: "¹²C, ¹³C: stable, ¹⁴C: 5,730 years",
        decayMode: "¹⁴C undergoes beta decay",
        radioactivity: "Only ¹⁴C is radioactive",
        
        // Applications & Uses
        industrialApplications: "Steel production, plastics, fuels, electronics, lubricants",
        medicalUses: "Carbon-14 dating, medical implants, drug delivery systems",
        technologicalApplications: "Semiconductors, carbon fiber, graphene, carbon nanotubes",
        
        // Health & Safety
        toxicity: "Generally non-toxic, but carbon monoxide is deadly",
        biologicalEffects: "Essential for all life forms, basis of biological molecules",
        safetyPrecautions: "Avoid carbon monoxide exposure, wear protection when handling carbon dust",
        
        // Economic Information
        relativePrice: "Variable: graphite (low), diamond (very high)",
        globalProduction: "~10 billion tons annually (all forms)",
        availability: "Abundant in various forms",
        
        // Spectroscopic Properties
        spectralLines: "Multiple lines in UV and visible regions",
        emissionColors: "Various colors depending on excitation",
        absorptionProperties: "Strong absorption in UV, variable in visible"
    },
    {
        atomicNumber: 7, symbol: "N", name: "Nitrogen", atomicMass: 14.01, 
        classification: "nonmetals", period: 2, group: 15, position: {row: 2, col: 15},
        electronConfiguration: "[He] 2s² 2p³",
        electronShells: [2, 5],
        valenceElectrons: 5,
        molarMass: 14.01,
        oxidationStates: ["+5", "+4", "+3", "+2", "+1", "-1", "-2", "-3"],
        electronegativity: 3.04,
        ionizationEnergy: 1402,
        secondIonizationEnergy: 2856,
        thirdIonizationEnergy: 4578,
        naturalAbundance: "¹⁴N: 99.636%, ¹⁵N: 0.364%",
        magneticProperty: "Diamagnetic",
        thermalConductivity: 0.02583,
        meltingPoint: 63.15,
        boilingPoint: 77.36,
        state: "Gas",
        density: 0.0012506,
        atomicRadius: 56,
        isotopes: ["¹⁴N", "¹⁵N"]
    },
    {
        atomicNumber: 8, symbol: "O", name: "Oxygen", atomicMass: 16.00, 
        classification: "nonmetals", period: 2, group: 16, position: {row: 2, col: 16},
        electronConfiguration: "[He] 2s² 2p⁴",
        electronShells: [2, 6],
        valenceElectrons: 6,
        molarMass: 16.00,
        oxidationStates: ["+2", "-1", "-2"],
        electronegativity: 3.44,
        ionizationEnergy: 1314,
        secondIonizationEnergy: 3388,
        thirdIonizationEnergy: 5301,
        naturalAbundance: "¹⁶O: 99.757%, ¹⁸O: 0.205%, ¹⁷O: 0.038%",
        magneticProperty: "Paramagnetic",
        thermalConductivity: 0.02658,
        meltingPoint: 54.36,
        boilingPoint: 90.20,
        state: "Gas",
        density: 0.001429,
        atomicRadius: 48,
        isotopes: ["¹⁶O", "¹⁷O", "¹⁸O"]
    },
    {
        atomicNumber: 9, symbol: "F", name: "Fluorine", atomicMass: 19.00, 
        classification: "halogens", period: 2, group: 17, position: {row: 2, col: 17},
        electronConfiguration: "[He] 2s² 2p⁵",
        electronShells: [2, 7],
        valenceElectrons: 7,
        molarMass: 19.00,
        oxidationStates: ["-1"],
        electronegativity: 3.98,
        ionizationEnergy: 1681,
        secondIonizationEnergy: 3374,
        thirdIonizationEnergy: 6050,
        naturalAbundance: "¹⁹F: 100%",
        magneticProperty: "Diamagnetic",
        thermalConductivity: 0.0279,
        meltingPoint: 53.53,
        boilingPoint: 85.03,
        state: "Gas",
        density: 0.001696,
        atomicRadius: 42,
        isotopes: ["¹⁹F"]
    },
    {
        atomicNumber: 10, symbol: "Ne", name: "Neon", atomicMass: 20.18, 
        classification: "noble-gases", period: 2, group: 18, position: {row: 2, col: 18},
        electronConfiguration: "[He] 2s² 2p⁶",
        electronShells: [2, 8],
        valenceElectrons: 8,
        molarMass: 20.18,
        oxidationStates: ["0"],
        electronegativity: null,
        ionizationEnergy: 2081,
        secondIonizationEnergy: 3952,
        thirdIonizationEnergy: 6122,
        naturalAbundance: "²⁰Ne: 90.48%, ²²Ne: 9.25%, ²¹Ne: 0.27%",
        magneticProperty: "Diamagnetic",
        thermalConductivity: 0.0491,
        meltingPoint: 24.56,
        boilingPoint: 27.07,
        state: "Gas",
        density: 0.0008999,
        atomicRadius: 38,
        isotopes: ["²⁰Ne", "²¹Ne", "²²Ne"]
    }
];

// Continue with remaining elements (simplified for brevity - in real implementation, all 118 would have complete data)
const remainingElements = [
    // Period 3
    {atomicNumber: 11, symbol: "Na", name: "Sodium", atomicMass: 22.99, classification: "alkali-metals", period: 3, group: 1, position: {row: 3, col: 1}},
    {atomicNumber: 12, symbol: "Mg", name: "Magnesium", atomicMass: 24.31, classification: "alkaline-earth-metals", period: 3, group: 2, position: {row: 3, col: 2}},
    {atomicNumber: 13, symbol: "Al", name: "Aluminum", atomicMass: 26.98, classification: "post-transition-metals", period: 3, group: 13, position: {row: 3, col: 13}},
    {atomicNumber: 14, symbol: "Si", name: "Silicon", atomicMass: 28.09, classification: "metalloids", period: 3, group: 14, position: {row: 3, col: 14}},
    {atomicNumber: 15, symbol: "P", name: "Phosphorus", atomicMass: 30.97, classification: "nonmetals", period: 3, group: 15, position: {row: 3, col: 15}},
    {atomicNumber: 16, symbol: "S", name: "Sulfur", atomicMass: 32.07, classification: "nonmetals", period: 3, group: 16, position: {row: 3, col: 16}},
    {atomicNumber: 17, symbol: "Cl", name: "Chlorine", atomicMass: 35.45, classification: "halogens", period: 3, group: 17, position: {row: 3, col: 17}},
    {atomicNumber: 18, symbol: "Ar", name: "Argon", atomicMass: 39.95, classification: "noble-gases", period: 3, group: 18, position: {row: 3, col: 18}},
    
    // Period 4
    {atomicNumber: 19, symbol: "K", name: "Potassium", atomicMass: 39.10, classification: "alkali-metals", period: 4, group: 1, position: {row: 4, col: 1}},
    {atomicNumber: 20, symbol: "Ca", name: "Calcium", atomicMass: 40.08, classification: "alkaline-earth-metals", period: 4, group: 2, position: {row: 4, col: 2}},
    {atomicNumber: 21, symbol: "Sc", name: "Scandium", atomicMass: 44.96, classification: "transition-metals", period: 4, group: 3, position: {row: 4, col: 3}},
    {atomicNumber: 22, symbol: "Ti", name: "Titanium", atomicMass: 47.87, classification: "transition-metals", period: 4, group: 4, position: {row: 4, col: 4}},
    {atomicNumber: 23, symbol: "V", name: "Vanadium", atomicMass: 50.94, classification: "transition-metals", period: 4, group: 5, position: {row: 4, col: 5}},
    {atomicNumber: 24, symbol: "Cr", name: "Chromium", atomicMass: 51.996, classification: "transition-metals", period: 4, group: 6, position: {row: 4, col: 6}},
    {atomicNumber: 25, symbol: "Mn", name: "Manganese", atomicMass: 54.94, classification: "transition-metals", period: 4, group: 7, position: {row: 4, col: 7}},
    {atomicNumber: 26, symbol: "Fe", name: "Iron", atomicMass: 55.85, classification: "transition-metals", period: 4, group: 8, position: {row: 4, col: 8}},
    {atomicNumber: 27, symbol: "Co", name: "Cobalt", atomicMass: 58.93, classification: "transition-metals", period: 4, group: 9, position: {row: 4, col: 9}},
    {atomicNumber: 28, symbol: "Ni", name: "Nickel", atomicMass: 58.69, classification: "transition-metals", period: 4, group: 10, position: {row: 4, col: 10}},
    {atomicNumber: 29, symbol: "Cu", name: "Copper", atomicMass: 63.55, classification: "transition-metals", period: 4, group: 11, position: {row: 4, col: 11}},
    {atomicNumber: 30, symbol: "Zn", name: "Zinc", atomicMass: 65.38, classification: "transition-metals", period: 4, group: 12, position: {row: 4, col: 12}},
    {atomicNumber: 31, symbol: "Ga", name: "Gallium", atomicMass: 69.72, classification: "post-transition-metals", period: 4, group: 13, position: {row: 4, col: 13}},
    {atomicNumber: 32, symbol: "Ge", name: "Germanium", atomicMass: 72.63, classification: "metalloids", period: 4, group: 14, position: {row: 4, col: 14}},
    {atomicNumber: 33, symbol: "As", name: "Arsenic", atomicMass: 74.92, classification: "metalloids", period: 4, group: 15, position: {row: 4, col: 15}},
    {atomicNumber: 34, symbol: "Se", name: "Selenium", atomicMass: 78.97, classification: "nonmetals", period: 4, group: 16, position: {row: 4, col: 16}},
    {atomicNumber: 35, symbol: "Br", name: "Bromine", atomicMass: 79.90, classification: "halogens", period: 4, group: 17, position: {row: 4, col: 17}},
    {atomicNumber: 36, symbol: "Kr", name: "Krypton", atomicMass: 83.80, classification: "noble-gases", period: 4, group: 18, position: {row: 4, col: 18}},
    
    // Period 5
    {atomicNumber: 37, symbol: "Rb", name: "Rubidium", atomicMass: 85.47, classification: "alkali-metals", period: 5, group: 1, position: {row: 5, col: 1}},
    {atomicNumber: 38, symbol: "Sr", name: "Strontium", atomicMass: 87.62, classification: "alkaline-earth-metals", period: 5, group: 2, position: {row: 5, col: 2}},
    {atomicNumber: 39, symbol: "Y", name: "Yttrium", atomicMass: 88.91, classification: "transition-metals", period: 5, group: 3, position: {row: 5, col: 3}},
    {atomicNumber: 40, symbol: "Zr", name: "Zirconium", atomicMass: 91.22, classification: "transition-metals", period: 5, group: 4, position: {row: 5, col: 4}},
    {atomicNumber: 41, symbol: "Nb", name: "Niobium", atomicMass: 92.91, classification: "transition-metals", period: 5, group: 5, position: {row: 5, col: 5}},
    {atomicNumber: 42, symbol: "Mo", name: "Molybdenum", atomicMass: 95.96, classification: "transition-metals", period: 5, group: 6, position: {row: 5, col: 6}},
    {atomicNumber: 43, symbol: "Tc", name: "Technetium", atomicMass: 98, classification: "transition-metals", period: 5, group: 7, position: {row: 5, col: 7}},
    {atomicNumber: 44, symbol: "Ru", name: "Ruthenium", atomicMass: 101.07, classification: "transition-metals", period: 5, group: 8, position: {row: 5, col: 8}},
    {atomicNumber: 45, symbol: "Rh", name: "Rhodium", atomicMass: 102.91, classification: "transition-metals", period: 5, group: 9, position: {row: 5, col: 9}},
    {atomicNumber: 46, symbol: "Pd", name: "Palladium", atomicMass: 106.42, classification: "transition-metals", period: 5, group: 10, position: {row: 5, col: 10}},
    {atomicNumber: 47, symbol: "Ag", name: "Silver", atomicMass: 107.87, classification: "transition-metals", period: 5, group: 11, position: {row: 5, col: 11}},
    {atomicNumber: 48, symbol: "Cd", name: "Cadmium", atomicMass: 112.41, classification: "transition-metals", period: 5, group: 12, position: {row: 5, col: 12}},
    {atomicNumber: 49, symbol: "In", name: "Indium", atomicMass: 114.82, classification: "post-transition-metals", period: 5, group: 13, position: {row: 5, col: 13}},
    {atomicNumber: 50, symbol: "Sn", name: "Tin", atomicMass: 118.71, classification: "post-transition-metals", period: 5, group: 14, position: {row: 5, col: 14}},
    {atomicNumber: 51, symbol: "Sb", name: "Antimony", atomicMass: 121.76, classification: "metalloids", period: 5, group: 15, position: {row: 5, col: 15}},
    {atomicNumber: 52, symbol: "Te", name: "Tellurium", atomicMass: 127.60, classification: "metalloids", period: 5, group: 16, position: {row: 5, col: 16}},
    {atomicNumber: 53, symbol: "I", name: "Iodine", atomicMass: 126.90, classification: "halogens", period: 5, group: 17, position: {row: 5, col: 17}},
    {atomicNumber: 54, symbol: "Xe", name: "Xenon", atomicMass: 131.29, classification: "noble-gases", period: 5, group: 18, position: {row: 5, col: 18}},
    
    // Period 6
    {atomicNumber: 55, symbol: "Cs", name: "Cesium", atomicMass: 132.91, classification: "alkali-metals", period: 6, group: 1, position: {row: 6, col: 1}},
    {atomicNumber: 56, symbol: "Ba", name: "Barium", atomicMass: 137.33, classification: "alkaline-earth-metals", period: 6, group: 2, position: {row: 6, col: 2}},
    {atomicNumber: 57, symbol: "La", name: "Lanthanum", atomicMass: 138.91, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 58, symbol: "Ce", name: "Cerium", atomicMass: 140.12, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 59, symbol: "Pr", name: "Praseodymium", atomicMass: 140.91, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 60, symbol: "Nd", name: "Neodymium", atomicMass: 144.24, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 61, symbol: "Pm", name: "Promethium", atomicMass: 145, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 62, symbol: "Sm", name: "Samarium", atomicMass: 150.36, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 63, symbol: "Eu", name: "Europium", atomicMass: 151.96, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 64, symbol: "Gd", name: "Gadolinium", atomicMass: 157.25, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 65, symbol: "Tb", name: "Terbium", atomicMass: 158.93, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 66, symbol: "Dy", name: "Dysprosium", atomicMass: 162.50, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 67, symbol: "Ho", name: "Holmium", atomicMass: 164.93, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 68, symbol: "Er", name: "Erbium", atomicMass: 167.26, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 69, symbol: "Tm", name: "Thulium", atomicMass: 168.93, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 70, symbol: "Yb", name: "Ytterbium", atomicMass: 173.05, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 71, symbol: "Lu", name: "Lutetium", atomicMass: 174.97, classification: "lanthanides", period: 6, group: 3, position: {row: 6, col: 3}},
    {atomicNumber: 72, symbol: "Hf", name: "Hafnium", atomicMass: 178.49, classification: "transition-metals", period: 6, group: 4, position: {row: 6, col: 4}},
    {atomicNumber: 73, symbol: "Ta", name: "Tantalum", atomicMass: 180.95, classification: "transition-metals", period: 6, group: 5, position: {row: 6, col: 5}},
    {atomicNumber: 74, symbol: "W", name: "Tungsten", atomicMass: 183.84, classification: "transition-metals", period: 6, group: 6, position: {row: 6, col: 6}},
    {atomicNumber: 75, symbol: "Re", name: "Rhenium", atomicMass: 186.21, classification: "transition-metals", period: 6, group: 7, position: {row: 6, col: 7}},
    {atomicNumber: 76, symbol: "Os", name: "Osmium", atomicMass: 190.23, classification: "transition-metals", period: 6, group: 8, position: {row: 6, col: 8}},
    {atomicNumber: 77, symbol: "Ir", name: "Iridium", atomicMass: 192.22, classification: "transition-metals", period: 6, group: 9, position: {row: 6, col: 9}},
    {atomicNumber: 78, symbol: "Pt", name: "Platinum", atomicMass: 195.08, classification: "transition-metals", period: 6, group: 10, position: {row: 6, col: 10}},
    {atomicNumber: 79, symbol: "Au", name: "Gold", atomicMass: 196.97, classification: "transition-metals", period: 6, group: 11, position: {row: 6, col: 11}},
    {atomicNumber: 80, symbol: "Hg", name: "Mercury", atomicMass: 200.59, classification: "transition-metals", period: 6, group: 12, position: {row: 6, col: 12}},
    {atomicNumber: 81, symbol: "Tl", name: "Thallium", atomicMass: 204.38, classification: "post-transition-metals", period: 6, group: 13, position: {row: 6, col: 13}},
    {atomicNumber: 82, symbol: "Pb", name: "Lead", atomicMass: 207.2, classification: "post-transition-metals", period: 6, group: 14, position: {row: 6, col: 14}},
    {atomicNumber: 83, symbol: "Bi", name: "Bismuth", atomicMass: 208.98, classification: "post-transition-metals", period: 6, group: 15, position: {row: 6, col: 15}},
    {atomicNumber: 84, symbol: "Po", name: "Polonium", atomicMass: 209, classification: "post-transition-metals", period: 6, group: 16, position: {row: 6, col: 16}},
    {atomicNumber: 85, symbol: "At", name: "Astatine", atomicMass: 210, classification: "halogens", period: 6, group: 17, position: {row: 6, col: 17}},
    {atomicNumber: 86, symbol: "Rn", name: "Radon", atomicMass: 222, classification: "noble-gases", period: 6, group: 18, position: {row: 6, col: 18}},
    
    // Period 7
    {atomicNumber: 87, symbol: "Fr", name: "Francium", atomicMass: 223, classification: "alkali-metals", period: 7, group: 1, position: {row: 7, col: 1}},
    {atomicNumber: 88, symbol: "Ra", name: "Radium", atomicMass: 226, classification: "alkaline-earth-metals", period: 7, group: 2, position: {row: 7, col: 2}},
    {atomicNumber: 89, symbol: "Ac", name: "Actinium", atomicMass: 227, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 90, symbol: "Th", name: "Thorium", atomicMass: 232.04, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 91, symbol: "Pa", name: "Protactinium", atomicMass: 231.04, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 92, symbol: "U", name: "Uranium", atomicMass: 238.03, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 93, symbol: "Np", name: "Neptunium", atomicMass: 237, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 94, symbol: "Pu", name: "Plutonium", atomicMass: 244, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 95, symbol: "Am", name: "Americium", atomicMass: 243, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 96, symbol: "Cm", name: "Curium", atomicMass: 247, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 97, symbol: "Bk", name: "Berkelium", atomicMass: 247, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 98, symbol: "Cf", name: "Californium", atomicMass: 251, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 99, symbol: "Es", name: "Einsteinium", atomicMass: 252, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 100, symbol: "Fm", name: "Fermium", atomicMass: 257, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 101, symbol: "Md", name: "Mendelevium", atomicMass: 258, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 102, symbol: "No", name: "Nobelium", atomicMass: 259, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 103, symbol: "Lr", name: "Lawrencium", atomicMass: 262, classification: "actinides", period: 7, group: 3, position: {row: 7, col: 3}},
    {atomicNumber: 104, symbol: "Rf", name: "Rutherfordium", atomicMass: 267, classification: "transition-metals", period: 7, group: 4, position: {row: 7, col: 4}},
    {atomicNumber: 105, symbol: "Db", name: "Dubnium", atomicMass: 270, classification: "transition-metals", period: 7, group: 5, position: {row: 7, col: 5}},
    {atomicNumber: 106, symbol: "Sg", name: "Seaborgium", atomicMass: 271, classification: "transition-metals", period: 7, group: 6, position: {row: 7, col: 6}},
    {atomicNumber: 107, symbol: "Bh", name: "Bohrium", atomicMass: 270, classification: "transition-metals", period: 7, group: 7, position: {row: 7, col: 7}},
    {atomicNumber: 108, symbol: "Hs", name: "Hassium", atomicMass: 277, classification: "transition-metals", period: 7, group: 8, position: {row: 7, col: 8}},
    {atomicNumber: 109, symbol: "Mt", name: "Meitnerium", atomicMass: 276, classification: "transition-metals", period: 7, group: 9, position: {row: 7, col: 9}},
    {atomicNumber: 110, symbol: "Ds", name: "Darmstadtium", atomicMass: 281, classification: "transition-metals", period: 7, group: 10, position: {row: 7, col: 10}},
    {atomicNumber: 111, symbol: "Rg", name: "Roentgenium", atomicMass: 280, classification: "transition-metals", period: 7, group: 11, position: {row: 7, col: 11}},
    {atomicNumber: 112, symbol: "Cn", name: "Copernicium", atomicMass: 285, classification: "transition-metals", period: 7, group: 12, position: {row: 7, col: 12}},
    {atomicNumber: 113, symbol: "Nh", name: "Nihonium", atomicMass: 284, classification: "post-transition-metals", period: 7, group: 13, position: {row: 7, col: 13}},
    {atomicNumber: 114, symbol: "Fl", name: "Flerovium", atomicMass: 289, classification: "post-transition-metals", period: 7, group: 14, position: {row: 7, col: 14}},
    {atomicNumber: 115, symbol: "Mc", name: "Moscovium", atomicMass: 288, classification: "post-transition-metals", period: 7, group: 15, position: {row: 7, col: 15}},
    {atomicNumber: 116, symbol: "Lv", name: "Livermorium", atomicMass: 293, classification: "post-transition-metals", period: 7, group: 16, position: {row: 7, col: 16}},
    {atomicNumber: 117, symbol: "Ts", name: "Tennessine", atomicMass: 294, classification: "halogens", period: 7, group: 17, position: {row: 7, col: 17}},
    {atomicNumber: 118, symbol: "Og", name: "Oganesson", atomicMass: 294, classification: "noble-gases", period: 7, group: 18, position: {row: 7, col: 18}}
];

// Combine detailed elements with remaining elements
const completeElements = [...allElements, ...remainingElements];

// Add default enhanced properties for remaining elements
remainingElements.forEach(element => {
    // Calculate electron shells based on period
    element.electronShells = element.electronShells || calculateElectronShells(element.period, element.atomicNumber);
    
    // Calculate valence electrons based on group
    element.valenceElectrons = element.valenceElectrons || calculateValenceElectrons(element.group, element.classification);
    
    // Set molar mass equal to atomic mass
    element.molarMass = element.molarMass || element.atomicMass;
    
    // Default properties
    element.electronConfiguration = element.electronConfiguration || `[Unknown configuration for Z=${element.atomicNumber}]`;
    element.oxidationStates = element.oxidationStates || ["Variable"];
    element.electronegativity = element.electronegativity || null;
    element.ionizationEnergy = element.ionizationEnergy || null;
    element.secondIonizationEnergy = element.secondIonizationEnergy || null;
    element.thirdIonizationEnergy = element.thirdIonizationEnergy || null;
    element.naturalAbundance = element.naturalAbundance || "Data not available";
    element.magneticProperty = element.magneticProperty || "Unknown";
    element.thermalConductivity = element.thermalConductivity || null;
    element.meltingPoint = element.meltingPoint || null;
    element.boilingPoint = element.boilingPoint || null;
    element.state = element.state || "Unknown";
    element.density = element.density || null;
    element.atomicRadius = element.atomicRadius || null;
    element.isotopes = element.isotopes || ["Unknown"];
    
    // Discovery & History (defaults)
    element.discoveryYear = element.discoveryYear || "Unknown";
    element.discoverer = element.discoverer || "Unknown";
    element.discoveryLocation = element.discoveryLocation || "Unknown";
    element.nameOrigin = element.nameOrigin || "Unknown etymology";
    
    // Crystal Structure (defaults)
    element.crystalSystem = element.crystalSystem || "Unknown";
    element.spaceGroup = element.spaceGroup || "Unknown";
    element.latticeParameters = element.latticeParameters || "Unknown";
    
    // Chemical Properties (defaults)
    element.reactivity = element.reactivity || "Unknown";
    element.chemicalStability = element.chemicalStability || "Unknown";
    element.bondEnergy = element.bondEnergy || null;
    element.electronAffinity = element.electronAffinity || null;
    
    // Thermodynamic Properties (defaults)
    element.heatOfFusion = element.heatOfFusion || null;
    element.heatOfVaporization = element.heatOfVaporization || null;
    element.specificHeat = element.specificHeat || null;
    element.entropy = element.entropy || null;
    
    // Electrical Properties (defaults)
    element.electricalConductivity = element.electricalConductivity || "Unknown";
    element.resistivity = element.resistivity || "Unknown";
    element.dielectricConstant = element.dielectricConstant || "Unknown";
    
    // Additional Atomic Properties (defaults)
    element.covalentRadius = element.covalentRadius || null;
    element.vanDerWaalsRadius = element.vanDerWaalsRadius || null;
    element.ionicRadius = element.ionicRadius || "Unknown";
    
    // Nuclear Properties (defaults)
    element.halfLife = element.halfLife || "Unknown";
    element.decayMode = element.decayMode || "Unknown";
    element.radioactivity = element.radioactivity || "Unknown";
    
    // Applications & Uses (defaults)
    element.industrialApplications = element.industrialApplications || "Research and specialized applications";
    element.medicalUses = element.medicalUses || "Limited or no current medical use";
    element.technologicalApplications = element.technologicalApplications || "Scientific research";
    
    // Health & Safety (defaults)
    element.toxicity = element.toxicity || "Unknown";
    element.biologicalEffects = element.biologicalEffects || "Unknown";
    element.safetyPrecautions = element.safetyPrecautions || "Handle with standard laboratory precautions";
    
    // Economic Information (defaults)
    element.relativePrice = element.relativePrice || "Unknown";
    element.globalProduction = element.globalProduction || "Limited production";
    element.availability = element.availability || "Limited availability";
    
    // Spectroscopic Properties (defaults)
    element.spectralLines = element.spectralLines || "Characteristic spectral lines";
    element.emissionColors = element.emissionColors || "Various wavelengths";
    element.absorptionProperties = element.absorptionProperties || "Characteristic absorption";
});

// Helper functions
function calculateElectronShells(period, atomicNumber) {
    // Simplified electron shell calculation
    const shells = [];
    let remainingElectrons = atomicNumber;
    
    for (let shell = 1; shell <= period && remainingElectrons > 0; shell++) {
        const maxElectrons = shell === 1 ? 2 : (shell === 2 ? 8 : (shell === 3 ? 18 : 32));
        const electronsInShell = Math.min(remainingElectrons, maxElectrons);
        shells.push(electronsInShell);
        remainingElectrons -= electronsInShell;
    }
    
    return shells;
}

function calculateValenceElectrons(group, classification) {
    if (classification === "noble-gases") return 8;
    if (group <= 2) return group;
    if (group >= 13) return group - 10;
    return "Variable"; // Transition metals
}

// Replace elementsData with enhanced complete data
const elementsData = completeElements; 