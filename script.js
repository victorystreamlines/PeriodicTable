// Main JavaScript for Interactive Periodic Table
class PeriodicTable {
    constructor() {
        this.periodicTableElement = document.getElementById('periodic-table');
        this.lanthanideActinideElement = document.getElementById('lanthanides-actinides');
        this.modal = new bootstrap.Modal(document.getElementById('elementModal'));
        this.init();
    }

    init() {
        this.createPeriodicTable();
        this.createLanthanidesActinides();
    }

    createPeriodicTable() {
        // Create a 7x18 grid for the main periodic table
        const totalCells = 7 * 18;
        
        for (let i = 0; i < totalCells; i++) {
            const row = Math.floor(i / 18) + 1;
            const col = (i % 18) + 1;
            
            const element = this.findElementByPosition(row, col);
            const cellElement = this.createElement(element, row, col);
            this.periodicTableElement.appendChild(cellElement);
        }
    }

    findElementByPosition(row, col) {
        return elementsData.find(element => 
            element.position.row === row && element.position.col === col
        );
    }

    createElement(elementData, row, col) {
        const elementDiv = document.createElement('div');
        
        if (!elementData) {
            // Empty cell
            elementDiv.className = 'element empty';
            return elementDiv;
        }

        elementDiv.className = `element ${elementData.classification}`;
        elementDiv.setAttribute('data-atomic-number', elementData.atomicNumber);
        
        elementDiv.innerHTML = `
            <div class="atomic-number">${elementData.atomicNumber}</div>
            <div class="symbol">${elementData.symbol}</div>
            <div class="name">${elementData.name}</div>
            <div class="atomic-mass">${elementData.atomicMass}</div>
        `;

        elementDiv.addEventListener('click', () => {
            this.showElementDetails(elementData);
        });

        return elementDiv;
    }

    createLanthanidesActinides() {
        const container = this.lanthanideActinideElement;
        
        // Lanthanides label
        const lanthanideLabel = document.createElement('div');
        lanthanideLabel.className = 'series-label lanthanides-label';
        lanthanideLabel.textContent = 'Lanthanides';
        container.appendChild(lanthanideLabel);

        // Lanthanides row
        const lanthanideRow = document.createElement('div');
        lanthanideRow.className = 'lanthanides-row';
        
        // Add lanthanides (elements 57-71)
        for (let atomicNumber = 57; atomicNumber <= 71; atomicNumber++) {
            const element = elementsData.find(el => el.atomicNumber === atomicNumber);
            if (element) {
                const elementDiv = this.createLanthanideActinideElement(element);
                lanthanideRow.appendChild(elementDiv);
            } else {
                // Create placeholder for missing data
                const placeholder = this.createPlaceholderElement(atomicNumber, 'lanthanides');
                lanthanideRow.appendChild(placeholder);
            }
        }
        container.appendChild(lanthanideRow);

        // Actinides label
        const actinideLabel = document.createElement('div');
        actinideLabel.className = 'series-label actinides-label';
        actinideLabel.textContent = 'Actinides';
        container.appendChild(actinideLabel);

        // Actinides row
        const actinideRow = document.createElement('div');
        actinideRow.className = 'actinides-row';
        
        // Add actinides (elements 89-103)
        for (let atomicNumber = 89; atomicNumber <= 103; atomicNumber++) {
            const element = elementsData.find(el => el.atomicNumber === atomicNumber);
            if (element) {
                const elementDiv = this.createLanthanideActinideElement(element);
                actinideRow.appendChild(elementDiv);
            } else {
                // Create placeholder for missing data
                const placeholder = this.createPlaceholderElement(atomicNumber, 'actinides');
                actinideRow.appendChild(placeholder);
            }
        }
        container.appendChild(actinideRow);
    }

    createLanthanideActinideElement(elementData) {
        const elementDiv = document.createElement('div');
        elementDiv.className = `element ${elementData.classification}`;
        elementDiv.setAttribute('data-atomic-number', elementData.atomicNumber);
        
        elementDiv.innerHTML = `
            <div class="atomic-number">${elementData.atomicNumber}</div>
            <div class="symbol">${elementData.symbol}</div>
            <div class="name">${elementData.name}</div>
            <div class="atomic-mass">${elementData.atomicMass}</div>
        `;

        elementDiv.addEventListener('click', () => {
            this.showElementDetails(elementData);
        });

        return elementDiv;
    }

    createPlaceholderElement(atomicNumber, classification) {
        const elementDiv = document.createElement('div');
        elementDiv.className = `element ${classification}`;
        elementDiv.setAttribute('data-atomic-number', atomicNumber);
        
        // Enhanced element names lookup for all 118 elements
        const elementNames = {
            // Lanthanides (57-71)
            57: 'La', 58: 'Ce', 59: 'Pr', 60: 'Nd', 61: 'Pm', 62: 'Sm', 63: 'Eu',
            64: 'Gd', 65: 'Tb', 66: 'Dy', 67: 'Ho', 68: 'Er', 69: 'Tm', 70: 'Yb', 71: 'Lu',
            // Actinides (89-103)
            89: 'Ac', 90: 'Th', 91: 'Pa', 92: 'U', 93: 'Np', 94: 'Pu', 95: 'Am',
            96: 'Cm', 97: 'Bk', 98: 'Cf', 99: 'Es', 100: 'Fm', 101: 'Md', 102: 'No', 103: 'Lr',
            // Super heavy elements (104-118)
            104: 'Rf', 105: 'Db', 106: 'Sg', 107: 'Bh', 108: 'Hs', 109: 'Mt', 110: 'Ds',
            111: 'Rg', 112: 'Cn', 113: 'Nh', 114: 'Fl', 115: 'Mc', 116: 'Lv', 117: 'Ts', 118: 'Og'
        };

        const elementFullNames = {
            57: 'Lanthanum', 58: 'Cerium', 59: 'Praseodymium', 60: 'Neodymium', 61: 'Promethium', 
            62: 'Samarium', 63: 'Europium', 64: 'Gadolinium', 65: 'Terbium', 66: 'Dysprosium', 
            67: 'Holmium', 68: 'Erbium', 69: 'Thulium', 70: 'Ytterbium', 71: 'Lutetium',
            89: 'Actinium', 90: 'Thorium', 91: 'Protactinium', 92: 'Uranium', 93: 'Neptunium', 
            94: 'Plutonium', 95: 'Americium', 96: 'Curium', 97: 'Berkelium', 98: 'Californium', 
            99: 'Einsteinium', 100: 'Fermium', 101: 'Mendelevium', 102: 'Nobelium', 103: 'Lawrencium',
            104: 'Rutherfordium', 105: 'Dubnium', 106: 'Seaborgium', 107: 'Bohrium', 108: 'Hassium',
            109: 'Meitnerium', 110: 'Darmstadtium', 111: 'Roentgenium', 112: 'Copernicium', 
            113: 'Nihonium', 114: 'Flerovium', 115: 'Moscovium', 116: 'Livermorium', 
            117: 'Tennessine', 118: 'Oganesson'
        };

        const symbol = elementNames[atomicNumber] || '?';
        const fullName = elementFullNames[atomicNumber] || 'Unknown';
        
        elementDiv.innerHTML = `
            <div class="atomic-number">${atomicNumber}</div>
            <div class="symbol">${symbol}</div>
            <div class="name">${fullName}</div>
            <div class="atomic-mass">-</div>
        `;

        elementDiv.addEventListener('click', () => {
            this.showBasicElementInfo(atomicNumber, symbol, fullName, classification);
        });

        return elementDiv;
    }

    showBasicElementInfo(atomicNumber, symbol, name, classification) {
        const modalTitle = document.getElementById('elementModalLabel');
        const modalBody = document.getElementById('elementDetails');
        
        modalTitle.textContent = `${name} (${symbol})`;
        modalBody.innerHTML = `
            <div class="element-info">
                <div class="element-header">
                    <div class="element-symbol-large ${classification}">${symbol}</div>
                    <div class="element-name-large">${name}</div>
                    <div class="text-muted">Atomic Number: ${atomicNumber}</div>
                </div>
                
                <div class="info-section">
                    <h6>🧪 Basic Properties</h6>
                    <div class="info-item">
                        <span class="info-label">Atomic Number:</span>
                        <span class="info-value">${atomicNumber}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Classification:</span>
                        <span class="info-value">${this.formatClassification(classification)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Status:</span>
                        <span class="info-value">Basic information available</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>ℹ️ Additional Information</h6>
                    <p>This element is part of the complete periodic table. For detailed properties like electron configuration, oxidation states, and physical properties, additional data would be needed.</p>
                    <p>Click on elements 1-36 for complete detailed information.</p>
                </div>
            </div>
        `;
        
        this.modal.show();
    }

    showElementDetails(element) {
        const modalTitle = document.getElementById('elementModalLabel');
        const modalBody = document.getElementById('elementDetails');
        
        modalTitle.textContent = `${element.name} (${element.symbol})`;
        
        modalBody.innerHTML = `
            <div class="element-info">
                <div class="element-header">
                    <div class="element-symbol-large ${element.classification}">${element.symbol}</div>
                    <div class="element-name-large">${element.name}</div>
                    <div class="text-muted">Atomic Number: ${element.atomicNumber}</div>
                </div>
                
                <div class="info-section">
                    <h6>🧪 Basic Properties</h6>
                    <div class="info-item">
                        <span class="info-label">Atomic Number:</span>
                        <span class="info-value">${element.atomicNumber}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Atomic Mass:</span>
                        <span class="info-value">${element.atomicMass} u</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Molar Mass:</span>
                        <span class="info-value">${element.molarMass || element.atomicMass} g/mol</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Classification:</span>
                        <span class="info-value">${this.formatClassification(element.classification)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Period & Group:</span>
                        <span class="info-value">Period ${element.period}, Group ${element.group}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>⚛️ Electronic Structure</h6>
                    <div class="info-item">
                        <span class="info-label">Electron Configuration:</span>
                        <span class="info-value">${element.electronConfiguration}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Electron Shells:</span>
                        <span class="info-value">[${element.electronShells ? element.electronShells.join(', ') : 'Unknown'}]</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Valence Electrons:</span>
                        <span class="info-value">${element.valenceElectrons || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Oxidation States:</span>
                        <span class="info-value">${Array.isArray(element.oxidationStates) ? element.oxidationStates.join(', ') : element.oxidationStates}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Electronegativity:</span>
                        <span class="info-value">${element.electronegativity || 'N/A'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>⚡ Ionization Energies</h6>
                    <div class="info-item">
                        <span class="info-label">1st Ionization Energy:</span>
                        <span class="info-value">${element.ionizationEnergy ? element.ionizationEnergy + ' kJ/mol' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">2nd Ionization Energy:</span>
                        <span class="info-value">${element.secondIonizationEnergy ? element.secondIonizationEnergy + ' kJ/mol' : 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">3rd Ionization Energy:</span>
                        <span class="info-value">${element.thirdIonizationEnergy ? element.thirdIonizationEnergy + ' kJ/mol' : 'N/A'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>🌡️ Physical Properties</h6>
                    <div class="info-item">
                        <span class="info-label">State (STP):</span>
                        <span class="info-value">${element.state}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Melting Point:</span>
                        <span class="info-value">${element.meltingPoint ? element.meltingPoint + ' K' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Boiling Point:</span>
                        <span class="info-value">${element.boilingPoint ? element.boilingPoint + ' K' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Density:</span>
                        <span class="info-value">${element.density ? element.density + ' g/cm³' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Atomic Radius:</span>
                        <span class="info-value">${element.atomicRadius ? element.atomicRadius + ' pm' : 'Unknown'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>🧲 Magnetic & Thermal Properties</h6>
                    <div class="info-item">
                        <span class="info-label">Magnetic Property:</span>
                        <span class="info-value">${element.magneticProperty || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Thermal Conductivity:</span>
                        <span class="info-value">${element.thermalConductivity ? element.thermalConductivity + ' W/m·K' : 'Unknown'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>🌍 Natural Abundance & Isotopes</h6>
                    <div class="info-item">
                        <span class="info-label">Natural Abundance:</span>
                        <span class="info-value">${element.naturalAbundance || 'Data not available'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Main Isotopes:</span>
                        <span class="info-value">${Array.isArray(element.isotopes) ? element.isotopes.join(', ') : element.isotopes}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>📜 Discovery & History</h6>
                    <div class="info-item">
                        <span class="info-label">Discovery Year:</span>
                        <span class="info-value">${element.discoveryYear || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Discoverer:</span>
                        <span class="info-value">${element.discoverer || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Discovery Location:</span>
                        <span class="info-value">${element.discoveryLocation || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Name Origin:</span>
                        <span class="info-value">${element.nameOrigin || 'Unknown'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>🏗️ Crystal Structure</h6>
                    <div class="info-item">
                        <span class="info-label">Crystal System:</span>
                        <span class="info-value">${element.crystalSystem || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Space Group:</span>
                        <span class="info-value">${element.spaceGroup || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Lattice Parameters:</span>
                        <span class="info-value">${element.latticeParameters || 'Unknown'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>🧪 Chemical Properties</h6>
                    <div class="info-item">
                        <span class="info-label">Reactivity:</span>
                        <span class="info-value">${element.reactivity || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Chemical Stability:</span>
                        <span class="info-value">${element.chemicalStability || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Bond Energy:</span>
                        <span class="info-value">${element.bondEnergy ? element.bondEnergy + ' kJ/mol' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Electron Affinity:</span>
                        <span class="info-value">${element.electronAffinity ? element.electronAffinity + ' kJ/mol' : 'Unknown'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>🌡️ Thermodynamic Properties</h6>
                    <div class="info-item">
                        <span class="info-label">Heat of Fusion:</span>
                        <span class="info-value">${element.heatOfFusion ? element.heatOfFusion + ' kJ/mol' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Heat of Vaporization:</span>
                        <span class="info-value">${element.heatOfVaporization ? element.heatOfVaporization + ' kJ/mol' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Specific Heat:</span>
                        <span class="info-value">${element.specificHeat ? element.specificHeat + ' J/g·K' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Entropy:</span>
                        <span class="info-value">${element.entropy ? element.entropy + ' J/mol·K' : 'Unknown'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>⚡ Electrical Properties</h6>
                    <div class="info-item">
                        <span class="info-label">Electrical Conductivity:</span>
                        <span class="info-value">${element.electricalConductivity ? element.electricalConductivity + ' S/m' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Resistivity:</span>
                        <span class="info-value">${element.resistivity ? element.resistivity + ' Ω·m' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Dielectric Constant:</span>
                        <span class="info-value">${element.dielectricConstant || 'Unknown'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>📏 Additional Atomic Properties</h6>
                    <div class="info-item">
                        <span class="info-label">Covalent Radius:</span>
                        <span class="info-value">${element.covalentRadius ? element.covalentRadius + ' pm' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Van der Waals Radius:</span>
                        <span class="info-value">${element.vanDerWaalsRadius ? element.vanDerWaalsRadius + ' pm' : 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Ionic Radius:</span>
                        <span class="info-value">${element.ionicRadius ? element.ionicRadius + ' pm' : 'Unknown'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>☢️ Nuclear Properties</h6>
                    <div class="info-item">
                        <span class="info-label">Half-life:</span>
                        <span class="info-value">${element.halfLife || 'Stable'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Decay Mode:</span>
                        <span class="info-value">${element.decayMode || 'Stable'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Radioactivity:</span>
                        <span class="info-value">${element.radioactivity || 'Non-radioactive'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>🏭 Applications & Uses</h6>
                    <div class="info-item">
                        <span class="info-label">Industrial Applications:</span>
                        <span class="info-value">${element.industrialApplications || 'Various uses'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Medical Uses:</span>
                        <span class="info-value">${element.medicalUses || 'Limited medical use'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Technological Applications:</span>
                        <span class="info-value">${element.technologicalApplications || 'Research applications'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>⚠️ Health & Safety</h6>
                    <div class="info-item">
                        <span class="info-label">Toxicity:</span>
                        <span class="info-value">${element.toxicity || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Biological Effects:</span>
                        <span class="info-value">${element.biologicalEffects || 'Under research'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Safety Precautions:</span>
                        <span class="info-value">${element.safetyPrecautions || 'Standard laboratory safety'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>💰 Economic Information</h6>
                    <div class="info-item">
                        <span class="info-label">Relative Price:</span>
                        <span class="info-value">${element.relativePrice || 'Variable'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Global Production:</span>
                        <span class="info-value">${element.globalProduction || 'Data not available'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Availability:</span>
                        <span class="info-value">${element.availability || 'Commercially available'}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h6>🔬 Spectroscopic Properties</h6>
                    <div class="info-item">
                        <span class="info-label">Spectral Lines:</span>
                        <span class="info-value">${element.spectralLines || 'Multiple characteristic lines'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Emission Colors:</span>
                        <span class="info-value">${element.emissionColors || 'Various colors'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Absorption Properties:</span>
                        <span class="info-value">${element.absorptionProperties || 'Characteristic absorption'}</span>
                    </div>
                </div>
            </div>
        `;
        
        this.modal.show();
    }

    formatClassification(classification) {
        const classificationMap = {
            'alkali-metals': 'Alkali Metals',
            'alkaline-earth-metals': 'Alkaline Earth Metals',
            'transition-metals': 'Transition Metals',
            'post-transition-metals': 'Post-transition Metals',
            'metalloids': 'Metalloids',
            'nonmetals': 'Nonmetals',
            'halogens': 'Halogens',
            'noble-gases': 'Noble Gases',
            'lanthanides': 'Lanthanides',
            'actinides': 'Actinides'
        };
        
        return classificationMap[classification] || classification;
    }
}

// Initialize the periodic table when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PeriodicTable();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects for legend items
    const legendItems = document.querySelectorAll('.legend-item');
    legendItems.forEach(item => {
        const colorClass = item.querySelector('.legend-color').classList[1];
        
        item.addEventListener('mouseenter', function() {
            // Highlight elements of the same type
            const elements = document.querySelectorAll(`.element.${colorClass}`);
            elements.forEach(el => {
                el.style.transform = 'scale(1.1)';
                el.style.zIndex = '100';
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset elements
            const elements = document.querySelectorAll(`.element.${colorClass}`);
            elements.forEach(el => {
                el.style.transform = '';
                el.style.zIndex = '';
            });
        });
    });
}); 