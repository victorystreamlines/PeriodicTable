// Quiz Manager for Interactive Periodic Table
class QuizManager {
    constructor() {
        this.periodicTableElement = document.getElementById('periodic-table');
        this.lanthanideActinideElement = document.getElementById('lanthanides-actinides');
        this.modal = new bootstrap.Modal(document.getElementById('elementModal'));
        this.currentElement = null;
        this.showingAnswers = false;
        this.quizData = this.loadQuizData();
        this.init();
    }

    init() {
        this.createPeriodicTable();
        this.createLanthanidesActinides();
        this.updateOverallStats();
    }

    // Load quiz progress from localStorage
    loadQuizData() {
        const stored = localStorage.getItem('periodicTableQuiz');
        return stored ? JSON.parse(stored) : {};
    }

    // Save quiz progress to localStorage
    saveQuizData() {
        localStorage.setItem('periodicTableQuiz', JSON.stringify(this.quizData));
        this.updateOverallStats();
    }

    // Get or create element data in quiz storage
    getElementQuizData(atomicNumber) {
        if (!this.quizData[atomicNumber]) {
            this.quizData[atomicNumber] = {
                answers: {},
                correctCount: 0,
                totalQuestions: 0,
                lastUpdated: new Date().toISOString()
            };
        }
        return this.quizData[atomicNumber];
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
        return completeElements.find(element => 
            element.position && element.position.row === row && element.position.col === col
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
            this.showElementQuiz(elementData);
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
            const element = completeElements.find(el => el.atomicNumber === atomicNumber);
            if (element) {
                const elementDiv = this.createLanthanideActinideElement(element);
                lanthanideRow.appendChild(elementDiv);
            } else {
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
            const element = completeElements.find(el => el.atomicNumber === atomicNumber);
            if (element) {
                const elementDiv = this.createLanthanideActinideElement(element);
                actinideRow.appendChild(elementDiv);
            } else {
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
            this.showElementQuiz(elementData);
        });

        return elementDiv;
    }

    createPlaceholderElement(atomicNumber, classification) {
        const elementDiv = document.createElement('div');
        elementDiv.className = `element ${classification}`;
        elementDiv.setAttribute('data-atomic-number', atomicNumber);
        
        // Element names for placeholders
        const elementNames = {
            57: 'La', 58: 'Ce', 59: 'Pr', 60: 'Nd', 61: 'Pm', 62: 'Sm', 63: 'Eu',
            64: 'Gd', 65: 'Tb', 66: 'Dy', 67: 'Ho', 68: 'Er', 69: 'Tm', 70: 'Yb', 71: 'Lu',
            89: 'Ac', 90: 'Th', 91: 'Pa', 92: 'U', 93: 'Np', 94: 'Pu', 95: 'Am',
            96: 'Cm', 97: 'Bk', 98: 'Cf', 99: 'Es', 100: 'Fm', 101: 'Md', 102: 'No', 103: 'Lr',
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
            this.showBasicElementQuiz(atomicNumber, symbol, fullName, classification);
        });

        return elementDiv;
    }

    showBasicElementQuiz(atomicNumber, symbol, name, classification) {
        this.currentElement = { atomicNumber, symbol, name, classification, isBasic: true };
        this.showingAnswers = false;
        
        const modalTitle = document.getElementById('elementModalLabel');
        const modalBody = document.getElementById('elementDetails');
        
        modalTitle.textContent = `Quiz: Element ${atomicNumber}`;
        
        const quizData = this.getElementQuizData(atomicNumber);
        
        modalBody.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-section">
                    <h6>🧪 Basic Properties</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <label>Atomic Number:</label>
                            <input type="number" class="quiz-input" data-field="atomicNumber" value="${quizData.answers.atomicNumber || ''}" placeholder="Enter atomic number">
                            <div class="answer-display" style="display: none;">${atomicNumber}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Element Symbol:</label>
                            <input type="text" class="quiz-input" data-field="symbol" value="${quizData.answers.symbol || ''}" placeholder="Enter element symbol">
                            <div class="answer-display" style="display: none;">${symbol}</div>
                        </div>
                        <div class="col-md-12">
                            <label>Element Name:</label>
                            <input type="text" class="quiz-input" data-field="name" value="${quizData.answers.name || ''}" placeholder="Enter element name">
                            <div class="answer-display" style="display: none;">${name}</div>
                        </div>
                        <div class="col-md-12">
                            <label>Classification:</label>
                            <input type="text" class="quiz-input" data-field="classification" value="${quizData.answers.classification || ''}" placeholder="Enter element classification">
                            <div class="answer-display" style="display: none;">${this.formatClassification(classification)}</div>
                        </div>
                    </div>
                </div>
                
                <div class="info-section">
                    <h6>ℹ️ Note</h6>
                    <p>This is a basic element with limited data available. Fill in the fundamental properties above.</p>
                </div>
            </div>
        `;
        
        this.attachInputListeners();
        this.updateElementScore();
        this.modal.show();
    }

    showElementQuiz(element) {
        this.currentElement = element;
        this.showingAnswers = false;
        
        const modalTitle = document.getElementById('elementModalLabel');
        const modalBody = document.getElementById('elementDetails');
        
        modalTitle.textContent = `Quiz: ${element.name} (${element.symbol})`;
        
        const quizData = this.getElementQuizData(element.atomicNumber);
        
        modalBody.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-section">
                    <h6>🧪 Basic Properties</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Atomic Number:</label>
                            <input type="number" class="quiz-input" data-field="atomicNumber" value="${quizData.answers.atomicNumber || ''}" placeholder="Enter atomic number">
                            <div class="answer-display" style="display: none;">${element.atomicNumber}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Atomic Mass:</label>
                            <input type="number" step="0.001" class="quiz-input" data-field="atomicMass" value="${quizData.answers.atomicMass || ''}" placeholder="Enter atomic mass">
                            <div class="answer-display" style="display: none;">${element.atomicMass} u</div>
                        </div>
                        <div class="col-md-4">
                            <label>Molar Mass:</label>
                            <input type="number" step="0.001" class="quiz-input" data-field="molarMass" value="${quizData.answers.molarMass || ''}" placeholder="Enter molar mass">
                            <div class="answer-display" style="display: none;">${element.molarMass || element.atomicMass} g/mol</div>
                        </div>
                        <div class="col-md-6">
                            <label>Classification:</label>
                            <input type="text" class="quiz-input" data-field="classification" value="${quizData.answers.classification || ''}" placeholder="Enter element classification">
                            <div class="answer-display" style="display: none;">${this.formatClassification(element.classification)}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Period & Group:</label>
                            <input type="text" class="quiz-input" data-field="periodGroup" value="${quizData.answers.periodGroup || ''}" placeholder="Period X, Group Y">
                            <div class="answer-display" style="display: none;">Period ${element.period}, Group ${element.group}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>⚛️ Electronic Structure</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <label>Electron Configuration:</label>
                            <input type="text" class="quiz-input" data-field="electronConfiguration" value="${quizData.answers.electronConfiguration || ''}" placeholder="Enter electron configuration">
                            <div class="answer-display" style="display: none;">${element.electronConfiguration}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Electron Shells:</label>
                            <input type="text" class="quiz-input" data-field="electronShells" value="${quizData.answers.electronShells || ''}" placeholder="Enter electron shells">
                            <div class="answer-display" style="display: none;">[${element.electronShells ? element.electronShells.join(', ') : 'Unknown'}]</div>
                        </div>
                        <div class="col-md-6">
                            <label>Valence Electrons:</label>
                            <input type="number" class="quiz-input" data-field="valenceElectrons" value="${quizData.answers.valenceElectrons || ''}" placeholder="Enter valence electrons">
                            <div class="answer-display" style="display: none;">${element.valenceElectrons || 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Oxidation States:</label>
                            <input type="text" class="quiz-input" data-field="oxidationStates" value="${quizData.answers.oxidationStates || ''}" placeholder="Enter oxidation states">
                            <div class="answer-display" style="display: none;">${Array.isArray(element.oxidationStates) ? element.oxidationStates.join(', ') : element.oxidationStates}</div>
                        </div>
                        <div class="col-md-12">
                            <label>Electronegativity:</label>
                            <input type="number" step="0.01" class="quiz-input" data-field="electronegativity" value="${quizData.answers.electronegativity || ''}" placeholder="Enter electronegativity">
                            <div class="answer-display" style="display: none;">${element.electronegativity || 'N/A'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>⚡ Ionization Energies</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <label>1st Ionization Energy (kJ/mol):</label>
                            <input type="number" class="quiz-input" data-field="ionizationEnergy" value="${quizData.answers.ionizationEnergy || ''}" placeholder="Enter 1st ionization energy">
                            <div class="answer-display" style="display: none;">${element.ionizationEnergy ? element.ionizationEnergy + ' kJ/mol' : 'Unknown'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>2nd Ionization Energy (kJ/mol):</label>
                            <input type="number" class="quiz-input" data-field="secondIonizationEnergy" value="${quizData.answers.secondIonizationEnergy || ''}" placeholder="Enter 2nd ionization energy">
                            <div class="answer-display" style="display: none;">${element.secondIonizationEnergy ? element.secondIonizationEnergy + ' kJ/mol' : 'N/A'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>3rd Ionization Energy (kJ/mol):</label>
                            <input type="number" class="quiz-input" data-field="thirdIonizationEnergy" value="${quizData.answers.thirdIonizationEnergy || ''}" placeholder="Enter 3rd ionization energy">
                            <div class="answer-display" style="display: none;">${element.thirdIonizationEnergy ? element.thirdIonizationEnergy + ' kJ/mol' : 'N/A'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>🌡️ Physical Properties</h6>
                    <div class="row">
                        <div class="col-md-3">
                            <label>State (STP):</label>
                            <input type="text" class="quiz-input" data-field="state" value="${quizData.answers.state || ''}" placeholder="Solid/Liquid/Gas">
                            <div class="answer-display" style="display: none;">${element.state}</div>
                        </div>
                        <div class="col-md-3">
                            <label>Melting Point (K):</label>
                            <input type="number" step="0.01" class="quiz-input" data-field="meltingPoint" value="${quizData.answers.meltingPoint || ''}" placeholder="Enter melting point">
                            <div class="answer-display" style="display: none;">${element.meltingPoint ? element.meltingPoint + ' K' : 'Unknown'}</div>
                        </div>
                        <div class="col-md-3">
                            <label>Boiling Point (K):</label>
                            <input type="number" step="0.01" class="quiz-input" data-field="boilingPoint" value="${quizData.answers.boilingPoint || ''}" placeholder="Enter boiling point">
                            <div class="answer-display" style="display: none;">${element.boilingPoint ? element.boilingPoint + ' K' : 'Unknown'}</div>
                        </div>
                        <div class="col-md-3">
                            <label>Density (g/cm³):</label>
                            <input type="number" step="0.001" class="quiz-input" data-field="density" value="${quizData.answers.density || ''}" placeholder="Enter density">
                            <div class="answer-display" style="display: none;">${element.density ? element.density + ' g/cm³' : 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Atomic Radius (pm):</label>
                            <input type="number" class="quiz-input" data-field="atomicRadius" value="${quizData.answers.atomicRadius || ''}" placeholder="Enter atomic radius">
                            <div class="answer-display" style="display: none;">${element.atomicRadius ? element.atomicRadius + ' pm' : 'Unknown'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>🧲 Magnetic & Thermal Properties</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <label>Magnetic Property:</label>
                            <input type="text" class="quiz-input" data-field="magneticProperty" value="${quizData.answers.magneticProperty || ''}" placeholder="Enter magnetic property">
                            <div class="answer-display" style="display: none;">${element.magneticProperty || 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Thermal Conductivity (W/m·K):</label>
                            <input type="number" step="0.001" class="quiz-input" data-field="thermalConductivity" value="${quizData.answers.thermalConductivity || ''}" placeholder="Enter thermal conductivity">
                            <div class="answer-display" style="display: none;">${element.thermalConductivity ? element.thermalConductivity + ' W/m·K' : 'Unknown'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>🌍 Natural Abundance & Isotopes</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <label>Natural Abundance:</label>
                            <input type="text" class="quiz-input" data-field="naturalAbundance" value="${quizData.answers.naturalAbundance || ''}" placeholder="Enter natural abundance">
                            <div class="answer-display" style="display: none;">${element.naturalAbundance || 'Data not available'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Main Isotopes:</label>
                            <input type="text" class="quiz-input" data-field="isotopes" value="${quizData.answers.isotopes || ''}" placeholder="Enter main isotopes">
                            <div class="answer-display" style="display: none;">${Array.isArray(element.isotopes) ? element.isotopes.join(', ') : element.isotopes}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>📜 Discovery & History</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <label>Discovery Year:</label>
                            <input type="text" class="quiz-input" data-field="discoveryYear" value="${quizData.answers.discoveryYear || ''}" placeholder="Enter discovery year">
                            <div class="answer-display" style="display: none;">${element.discoveryYear || 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Discoverer:</label>
                            <input type="text" class="quiz-input" data-field="discoverer" value="${quizData.answers.discoverer || ''}" placeholder="Enter discoverer">
                            <div class="answer-display" style="display: none;">${element.discoverer || 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Discovery Location:</label>
                            <input type="text" class="quiz-input" data-field="discoveryLocation" value="${quizData.answers.discoveryLocation || ''}" placeholder="Enter discovery location">
                            <div class="answer-display" style="display: none;">${element.discoveryLocation || 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Name Origin:</label>
                            <input type="text" class="quiz-input" data-field="nameOrigin" value="${quizData.answers.nameOrigin || ''}" placeholder="Enter name origin">
                            <div class="answer-display" style="display: none;">${element.nameOrigin || 'Unknown'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>🏗️ Crystal Structure</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Crystal System:</label>
                            <input type="text" class="quiz-input" data-field="crystalSystem" value="${quizData.answers.crystalSystem || ''}" placeholder="Enter crystal system">
                            <div class="answer-display" style="display: none;">${element.crystalSystem || 'Unknown'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Space Group:</label>
                            <input type="text" class="quiz-input" data-field="spaceGroup" value="${quizData.answers.spaceGroup || ''}" placeholder="Enter space group">
                            <div class="answer-display" style="display: none;">${element.spaceGroup || 'Unknown'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Lattice Parameters:</label>
                            <input type="text" class="quiz-input" data-field="latticeParameters" value="${quizData.answers.latticeParameters || ''}" placeholder="Enter lattice parameters">
                            <div class="answer-display" style="display: none;">${element.latticeParameters || 'Unknown'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>🧪 Chemical Properties</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <label>Reactivity:</label>
                            <input type="text" class="quiz-input" data-field="reactivity" value="${quizData.answers.reactivity || ''}" placeholder="Enter reactivity">
                            <div class="answer-display" style="display: none;">${element.reactivity || 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Chemical Stability:</label>
                            <input type="text" class="quiz-input" data-field="chemicalStability" value="${quizData.answers.chemicalStability || ''}" placeholder="Enter chemical stability">
                            <div class="answer-display" style="display: none;">${element.chemicalStability || 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Bond Energy (kJ/mol):</label>
                            <input type="number" class="quiz-input" data-field="bondEnergy" value="${quizData.answers.bondEnergy || ''}" placeholder="Enter bond energy">
                            <div class="answer-display" style="display: none;">${element.bondEnergy ? element.bondEnergy + ' kJ/mol' : 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Electron Affinity (kJ/mol):</label>
                            <input type="number" class="quiz-input" data-field="electronAffinity" value="${quizData.answers.electronAffinity || ''}" placeholder="Enter electron affinity">
                            <div class="answer-display" style="display: none;">${element.electronAffinity ? element.electronAffinity + ' kJ/mol' : 'Unknown'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>🌡️ Thermodynamic Properties</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <label>Heat of Fusion (kJ/mol):</label>
                            <input type="number" step="0.001" class="quiz-input" data-field="heatOfFusion" value="${quizData.answers.heatOfFusion || ''}" placeholder="Enter heat of fusion">
                            <div class="answer-display" style="display: none;">${element.heatOfFusion ? element.heatOfFusion + ' kJ/mol' : 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Heat of Vaporization (kJ/mol):</label>
                            <input type="number" step="0.001" class="quiz-input" data-field="heatOfVaporization" value="${quizData.answers.heatOfVaporization || ''}" placeholder="Enter heat of vaporization">
                            <div class="answer-display" style="display: none;">${element.heatOfVaporization ? element.heatOfVaporization + ' kJ/mol' : 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Specific Heat (J/g·K):</label>
                            <input type="number" step="0.001" class="quiz-input" data-field="specificHeat" value="${quizData.answers.specificHeat || ''}" placeholder="Enter specific heat">
                            <div class="answer-display" style="display: none;">${element.specificHeat ? element.specificHeat + ' J/g·K' : 'Unknown'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Entropy (J/mol·K):</label>
                            <input type="number" step="0.1" class="quiz-input" data-field="entropy" value="${quizData.answers.entropy || ''}" placeholder="Enter entropy">
                            <div class="answer-display" style="display: none;">${element.entropy ? element.entropy + ' J/mol·K' : 'Unknown'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>⚡ Electrical Properties</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Electrical Conductivity:</label>
                            <input type="text" class="quiz-input" data-field="electricalConductivity" value="${quizData.answers.electricalConductivity || ''}" placeholder="Enter electrical conductivity">
                            <div class="answer-display" style="display: none;">${element.electricalConductivity || 'Unknown'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Resistivity:</label>
                            <input type="text" class="quiz-input" data-field="resistivity" value="${quizData.answers.resistivity || ''}" placeholder="Enter resistivity">
                            <div class="answer-display" style="display: none;">${element.resistivity || 'Unknown'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Dielectric Constant:</label>
                            <input type="text" class="quiz-input" data-field="dielectricConstant" value="${quizData.answers.dielectricConstant || ''}" placeholder="Enter dielectric constant">
                            <div class="answer-display" style="display: none;">${element.dielectricConstant || 'Unknown'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>📏 Additional Atomic Properties</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Covalent Radius (pm):</label>
                            <input type="number" class="quiz-input" data-field="covalentRadius" value="${quizData.answers.covalentRadius || ''}" placeholder="Enter covalent radius">
                            <div class="answer-display" style="display: none;">${element.covalentRadius ? element.covalentRadius + ' pm' : 'Unknown'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Van der Waals Radius (pm):</label>
                            <input type="number" class="quiz-input" data-field="vanDerWaalsRadius" value="${quizData.answers.vanDerWaalsRadius || ''}" placeholder="Enter van der Waals radius">
                            <div class="answer-display" style="display: none;">${element.vanDerWaalsRadius ? element.vanDerWaalsRadius + ' pm' : 'Unknown'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Ionic Radius:</label>
                            <input type="text" class="quiz-input" data-field="ionicRadius" value="${quizData.answers.ionicRadius || ''}" placeholder="Enter ionic radius">
                            <div class="answer-display" style="display: none;">${element.ionicRadius || 'Unknown'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>☢️ Nuclear Properties</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Half-life:</label>
                            <input type="text" class="quiz-input" data-field="halfLife" value="${quizData.answers.halfLife || ''}" placeholder="Enter half-life">
                            <div class="answer-display" style="display: none;">${element.halfLife || 'Stable'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Decay Mode:</label>
                            <input type="text" class="quiz-input" data-field="decayMode" value="${quizData.answers.decayMode || ''}" placeholder="Enter decay mode">
                            <div class="answer-display" style="display: none;">${element.decayMode || 'Stable'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Radioactivity:</label>
                            <input type="text" class="quiz-input" data-field="radioactivity" value="${quizData.answers.radioactivity || ''}" placeholder="Enter radioactivity">
                            <div class="answer-display" style="display: none;">${element.radioactivity || 'Non-radioactive'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>🏭 Applications & Uses</h6>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Industrial Applications:</label>
                            <input type="text" class="quiz-input" data-field="industrialApplications" value="${quizData.answers.industrialApplications || ''}" placeholder="Enter industrial applications">
                            <div class="answer-display" style="display: none;">${element.industrialApplications || 'Various uses'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Medical Uses:</label>
                            <input type="text" class="quiz-input" data-field="medicalUses" value="${quizData.answers.medicalUses || ''}" placeholder="Enter medical uses">
                            <div class="answer-display" style="display: none;">${element.medicalUses || 'Limited medical use'}</div>
                        </div>
                        <div class="col-md-6">
                            <label>Technological Applications:</label>
                            <input type="text" class="quiz-input" data-field="technologicalApplications" value="${quizData.answers.technologicalApplications || ''}" placeholder="Enter technological applications">
                            <div class="answer-display" style="display: none;">${element.technologicalApplications || 'Research applications'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>⚠️ Health & Safety</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Toxicity:</label>
                            <input type="text" class="quiz-input" data-field="toxicity" value="${quizData.answers.toxicity || ''}" placeholder="Enter toxicity">
                            <div class="answer-display" style="display: none;">${element.toxicity || 'Unknown'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Biological Effects:</label>
                            <input type="text" class="quiz-input" data-field="biologicalEffects" value="${quizData.answers.biologicalEffects || ''}" placeholder="Enter biological effects">
                            <div class="answer-display" style="display: none;">${element.biologicalEffects || 'Under research'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Safety Precautions:</label>
                            <input type="text" class="quiz-input" data-field="safetyPrecautions" value="${quizData.answers.safetyPrecautions || ''}" placeholder="Enter safety precautions">
                            <div class="answer-display" style="display: none;">${element.safetyPrecautions || 'Standard laboratory safety'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>💰 Economic Information</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Relative Price:</label>
                            <input type="text" class="quiz-input" data-field="relativePrice" value="${quizData.answers.relativePrice || ''}" placeholder="Enter relative price">
                            <div class="answer-display" style="display: none;">${element.relativePrice || 'Variable'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Global Production:</label>
                            <input type="text" class="quiz-input" data-field="globalProduction" value="${quizData.answers.globalProduction || ''}" placeholder="Enter global production">
                            <div class="answer-display" style="display: none;">${element.globalProduction || 'Data not available'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Availability:</label>
                            <input type="text" class="quiz-input" data-field="availability" value="${quizData.answers.availability || ''}" placeholder="Enter availability">
                            <div class="answer-display" style="display: none;">${element.availability || 'Commercially available'}</div>
                        </div>
                    </div>
                </div>

                <div class="quiz-section">
                    <h6>🔬 Spectroscopic Properties</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Spectral Lines:</label>
                            <input type="text" class="quiz-input" data-field="spectralLines" value="${quizData.answers.spectralLines || ''}" placeholder="Enter spectral lines">
                            <div class="answer-display" style="display: none;">${element.spectralLines || 'Multiple characteristic lines'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Emission Colors:</label>
                            <input type="text" class="quiz-input" data-field="emissionColors" value="${quizData.answers.emissionColors || ''}" placeholder="Enter emission colors">
                            <div class="answer-display" style="display: none;">${element.emissionColors || 'Various colors'}</div>
                        </div>
                        <div class="col-md-4">
                            <label>Absorption Properties:</label>
                            <input type="text" class="quiz-input" data-field="absorptionProperties" value="${quizData.answers.absorptionProperties || ''}" placeholder="Enter absorption properties">
                            <div class="answer-display" style="display: none;">${element.absorptionProperties || 'Characteristic absorption'}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.attachInputListeners();
        this.updateElementScore();
        this.modal.show();
    }

    attachInputListeners() {
        const inputs = document.querySelectorAll('.quiz-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.checkAnswer(input);
                this.saveUserAnswer(input);
            });
            
            // Check answer on load if there's a value
            if (input.value) {
                this.checkAnswer(input);
            }
        });
    }

    checkAnswer(input) {
        const field = input.dataset.field;
        const userAnswer = input.value.toString().toLowerCase().trim();
        const correctAnswer = this.getCorrectAnswer(field).toLowerCase().trim();
        
        input.classList.remove('correct', 'incorrect');
        
        if (userAnswer && userAnswer === correctAnswer) {
            input.classList.add('correct');
        } else if (userAnswer) {
            input.classList.add('incorrect');
        }
        
        this.updateElementScore();
    }

    getCorrectAnswer(field) {
        const element = this.currentElement;
        
        if (element.isBasic) {
            // For basic elements
            switch (field) {
                case 'atomicNumber': return element.atomicNumber.toString();
                case 'symbol': return element.symbol;
                case 'name': return element.name;
                case 'classification': return this.formatClassification(element.classification);
                default: return '';
            }
        }
        
        // For full elements
        switch (field) {
            case 'atomicNumber': return element.atomicNumber.toString();
            case 'atomicMass': return element.atomicMass.toString();
            case 'molarMass': return (element.molarMass || element.atomicMass).toString();
            case 'classification': return this.formatClassification(element.classification);
            case 'periodGroup': return `period ${element.period}, group ${element.group}`;
            case 'electronConfiguration': return element.electronConfiguration;
            case 'valenceElectrons': return (element.valenceElectrons || '').toString();
            case 'oxidationStates': 
                return Array.isArray(element.oxidationStates) ? 
                    element.oxidationStates.join(', ') : element.oxidationStates.toString();
            case 'electronegativity': return (element.electronegativity || '').toString();
            case 'ionizationEnergy': return (element.ionizationEnergy || '').toString();
            case 'secondIonizationEnergy': return (element.secondIonizationEnergy || '').toString();
            case 'thirdIonizationEnergy': return (element.thirdIonizationEnergy || '').toString();
            case 'state': return element.state;
            case 'meltingPoint': return (element.meltingPoint || '').toString();
            case 'boilingPoint': return (element.boilingPoint || '').toString();
            case 'density': return (element.density || '').toString();
            case 'atomicRadius': return (element.atomicRadius || '').toString();
            case 'magneticProperty': return element.magneticProperty || '';
            case 'electronShells': 
                return element.electronShells ? 
                    element.electronShells.join(', ') : 'unknown';
            case 'thermalConductivity': return (element.thermalConductivity || '').toString();
            case 'naturalAbundance': return element.naturalAbundance || 'data not available';
            case 'isotopes': 
                return Array.isArray(element.isotopes) ? 
                    element.isotopes.join(', ') : (element.isotopes || '').toString();
            case 'discoveryYear': return element.discoveryYear || 'Unknown';
            case 'discoverer': return element.discoverer || 'Unknown';
            case 'discoveryLocation': return element.discoveryLocation || 'Unknown';
            case 'nameOrigin': return element.nameOrigin || 'Unknown';
            case 'crystalSystem': return element.crystalSystem || 'Unknown';
            case 'spaceGroup': return element.spaceGroup || 'Unknown';
            case 'latticeParameters': return element.latticeParameters || 'Unknown';
            case 'reactivity': return element.reactivity || 'Unknown';
            case 'chemicalStability': return element.chemicalStability || 'Unknown';
            case 'bondEnergy': return element.bondEnergy ? element.bondEnergy + ' kJ/mol' : 'Unknown';
            case 'electronAffinity': return element.electronAffinity ? element.electronAffinity + ' kJ/mol' : 'Unknown';
            case 'heatOfFusion': return element.heatOfFusion ? element.heatOfFusion + ' kJ/mol' : 'Unknown';
            case 'heatOfVaporization': return element.heatOfVaporization ? element.heatOfVaporization + ' kJ/mol' : 'Unknown';
            case 'specificHeat': return element.specificHeat ? element.specificHeat + ' J/g·K' : 'Unknown';
            case 'entropy': return element.entropy ? element.entropy + ' J/mol·K' : 'Unknown';
            case 'electricalConductivity': return element.electricalConductivity || 'Unknown';
            case 'resistivity': return element.resistivity || 'Unknown';
            case 'dielectricConstant': return element.dielectricConstant || 'Unknown';
            case 'covalentRadius': return element.covalentRadius ? element.covalentRadius + ' pm' : 'Unknown';
            case 'vanDerWaalsRadius': return element.vanDerWaalsRadius ? element.vanDerWaalsRadius + ' pm' : 'Unknown';
            case 'ionicRadius': return element.ionicRadius || 'Unknown';
            case 'halfLife': return element.halfLife || 'Stable';
            case 'decayMode': return element.decayMode || 'Stable';
            case 'radioactivity': return element.radioactivity || 'Non-radioactive';
            case 'industrialApplications': return element.industrialApplications || 'Various uses';
            case 'medicalUses': return element.medicalUses || 'Limited medical use';
            case 'technologicalApplications': return element.technologicalApplications || 'Research applications';
            case 'toxicity': return element.toxicity || 'Unknown';
            case 'biologicalEffects': return element.biologicalEffects || 'Under research';
            case 'safetyPrecautions': return element.safetyPrecautions || 'Standard laboratory safety';
            case 'relativePrice': return element.relativePrice || 'Variable';
            case 'globalProduction': return element.globalProduction || 'Data not available';
            case 'availability': return element.availability || 'Commercially available';
            case 'spectralLines': return element.spectralLines || 'Multiple characteristic lines';
            case 'emissionColors': return element.emissionColors || 'Various colors';
            case 'absorptionProperties': return element.absorptionProperties || 'Characteristic absorption';
            default: return '';
        }
    }

    saveUserAnswer(input) {
        const field = input.dataset.field;
        const atomicNumber = this.currentElement.atomicNumber;
        const quizData = this.getElementQuizData(atomicNumber);
        
        quizData.answers[field] = input.value;
        quizData.lastUpdated = new Date().toISOString();
        
        this.saveQuizData();
    }

    updateElementScore() {
        const inputs = document.querySelectorAll('.quiz-input');
        let totalQuestions = inputs.length;
        let correctAnswers = 0;
        
        inputs.forEach(input => {
            if (input.classList.contains('correct')) {
                correctAnswers++;
            }
        });
        
        const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        
        // Update element-specific score
        const elementScoreElement = document.getElementById('elementScore');
        if (elementScoreElement) {
            elementScoreElement.textContent = `Score: ${percentage}%`;
        }
        
        // Update quiz data
        const atomicNumber = this.currentElement.atomicNumber;
        const quizData = this.getElementQuizData(atomicNumber);
        quizData.correctCount = correctAnswers;
        quizData.totalQuestions = totalQuestions;
        
        this.saveQuizData();
    }

    updateOverallStats() {
        let totalCorrect = 0;
        let totalAnsweredQuestions = 0;
        let elementsAttempted = 0;
        
        // Count current progress
        Object.values(this.quizData).forEach(elementData => {
            if (elementData.totalQuestions > 0) {
                elementsAttempted++;
                totalCorrect += elementData.correctCount;
                totalAnsweredQuestions += elementData.totalQuestions;
            }
        });
        
        // Calculate total possible questions across all 118 elements
        const totalPossibleQuestions = this.calculateTotalPossibleQuestions();
        
        // Calculate overall percentage based on total possible questions
        const overallPercentage = totalPossibleQuestions > 0 ? 
            Math.round((totalCorrect / totalPossibleQuestions) * 100) : 0;
        
        // Update UI
        document.getElementById('overallPercentage').textContent = `${overallPercentage}%`;
        document.getElementById('overallProgressBar').style.width = `${overallPercentage}%`;
        document.getElementById('overallProgressBar').setAttribute('aria-valuenow', overallPercentage);
        document.getElementById('elementsAttempted').textContent = elementsAttempted;
        document.getElementById('totalAnswered').textContent = totalAnsweredQuestions;
        document.getElementById('correctAnswers').textContent = totalCorrect;
        document.getElementById('totalPossible').textContent = totalPossibleQuestions;
    }

    // Calculate total possible questions across all 118 elements
    calculateTotalPossibleQuestions() {
        let totalQuestions = 0;
        
        // For each of the 118 elements, determine how many questions they would have
        for (let atomicNumber = 1; atomicNumber <= 118; atomicNumber++) {
            const element = completeElements.find(el => el.atomicNumber === atomicNumber);
            
            if (element && this.hasFullElementData(element)) {
                // Full elements have all properties - count the fields in showElementQuiz
                totalQuestions += 62; // Updated to include all new professional chemistry fields
            } else {
                // Basic elements have limited properties - count the fields in showBasicElementQuiz  
                totalQuestions += 4; // atomicNumber, symbol, name, classification
            }
        }
        
        return totalQuestions;
    }

    // Check if element has full data (like elements 1-36 and others with complete properties)
    hasFullElementData(element) {
        // An element has full data if it has detailed properties like electron configuration
        return element && 
               element.electronConfiguration && 
               element.electronConfiguration !== `[Unknown configuration for Z=${element.atomicNumber}]` &&
               element.valenceElectrons &&
               element.oxidationStates &&
               Array.isArray(element.oxidationStates) &&
               element.ionizationEnergy;
    }

    toggleAnswers() {
        this.showingAnswers = !this.showingAnswers;
        const showAnswersBtn = document.getElementById('showAnswersBtn');
        const answerDisplays = document.querySelectorAll('.answer-display');
        const inputs = document.querySelectorAll('.quiz-input');
        
        if (this.showingAnswers) {
            showAnswersBtn.textContent = 'Hide Answers';
            answerDisplays.forEach(display => {
                display.style.display = 'block';
                display.style.color = '#28a745';
                display.style.fontWeight = 'bold';
                display.style.marginTop = '5px';
            });
            inputs.forEach(input => {
                input.style.display = 'none';
            });
        } else {
            showAnswersBtn.textContent = 'Show Answers';
            answerDisplays.forEach(display => {
                display.style.display = 'none';
            });
            inputs.forEach(input => {
                input.style.display = 'block';
            });
        }
    }

    resetCurrentElement() {
        if (!this.currentElement) return;
        
        const atomicNumber = this.currentElement.atomicNumber;
        delete this.quizData[atomicNumber];
        this.saveQuizData();
        
        // Reload the quiz
        if (this.currentElement.isBasic) {
            this.showBasicElementQuiz(atomicNumber, this.currentElement.symbol, this.currentElement.name, this.currentElement.classification);
        } else {
            this.showElementQuiz(this.currentElement);
        }
    }

    resetAllProgress() {
        if (confirm('Are you sure you want to reset all quiz progress? This action cannot be undone.')) {
            this.quizData = {};
            this.saveQuizData();
            alert('All quiz progress has been reset.');
        }
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

// Global variable for quiz manager
let quizManager;

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    quizManager = new QuizManager();
    
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