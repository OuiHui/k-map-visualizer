class KMapVisualizer {
    constructor() {
        this.variables = 3;
        this.kmap = {};
        this.groups = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateKMap();
        this.updateTruthTable();
        this.findGroups(); // Automatically find groups on initialization
    }

    setupEventListeners() {
        document.getElementById('btn-2var').addEventListener('click', () => this.setVariables(2));
        document.getElementById('btn-3var').addEventListener('click', () => this.setVariables(3));
        document.getElementById('btn-4var').addEventListener('click', () => this.setVariables(4));
        document.getElementById('btn-clear').addEventListener('click', () => this.clearKMap());
        document.getElementById('btn-random').addEventListener('click', () => this.randomFill());
    }

    setVariables(num) {
        this.variables = num;
        this.kmap = {};
        
        // Update button states
        document.querySelectorAll('.variable-controls .btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`btn-${num}var`).classList.add('active');
        
        this.generateKMap();
        this.updateTruthTable();
        this.findGroups(); // Automatically find groups after changing variables
    }

    generateKMap() {
        const container = document.getElementById('kmap');
        container.innerHTML = '';
        
        if (this.variables === 2) {
            container.className = 'kmap kmap-2var';
            this.generate2VarKMap(container);
        } else if (this.variables === 3) {
            container.className = 'kmap kmap-3var';
            this.generate3VarKMap(container);
        } else if (this.variables === 4) {
            container.className = 'kmap kmap-4var';
            this.generate4VarKMap(container);
        }
    }

    generate2VarKMap(container) {
        // Headers
        container.appendChild(this.createHeader(''));
        container.appendChild(this.createHeader('B\''));
        container.appendChild(this.createHeader('B'));
        
        // Row A
        container.appendChild(this.createLabel('A\''));
        container.appendChild(this.createCell('00'));
        container.appendChild(this.createCell('01'));
        
        // Row A'
        container.appendChild(this.createLabel('A'));
        container.appendChild(this.createCell('10'));
        container.appendChild(this.createCell('11'));
    }

    generate3VarKMap(container) {
        // Headers
        container.appendChild(this.createHeader(''));
        container.appendChild(this.createHeader('B\'C\''));
        container.appendChild(this.createHeader('B\'C'));
        container.appendChild(this.createHeader('BC'));
        container.appendChild(this.createHeader('BC\''));
        
        // Row A
        container.appendChild(this.createLabel('A\''));
        container.appendChild(this.createCell('000'));
        container.appendChild(this.createCell('001'));
        container.appendChild(this.createCell('011'));
        container.appendChild(this.createCell('010'));
        
        // Row A'
        container.appendChild(this.createLabel('A'));
        container.appendChild(this.createCell('100'));
        container.appendChild(this.createCell('101'));
        container.appendChild(this.createCell('111'));
        container.appendChild(this.createCell('110'));
    }

    generate4VarKMap(container) {
        // Headers
        container.appendChild(this.createHeader(''));
        container.appendChild(this.createHeader('C\'D\''));
        container.appendChild(this.createHeader('C\'D'));
        container.appendChild(this.createHeader('CD'));
        container.appendChild(this.createHeader('CD\''));
        
        // Rows
        const rowLabels = ['A\'B\'', 'A\'B', 'AB', 'AB\''];
        const cellMappings = [
            ['0000', '0001', '0011', '0010'],
            ['0100', '0101', '0111', '0110'],
            ['1100', '1101', '1111', '1110'],
            ['1000', '1001', '1011', '1010']
        ];

        for (let i = 0; i < 4; i++) {
            container.appendChild(this.createLabel(rowLabels[i]));
            for (let j = 0; j < 4; j++) {
                container.appendChild(this.createCell(cellMappings[i][j]));
            }
        }
    }

    createHeader(text) {
        const div = document.createElement('div');
        div.className = 'kmap-header';
        div.textContent = text;
        return div;
    }

    createLabel(text) {
        const div = document.createElement('div');
        div.className = 'kmap-label';
        div.textContent = text;
        return div;
    }

    createCell(minterm) {
        const div = document.createElement('div');
        div.className = 'kmap-cell';
        div.dataset.minterm = minterm;
        div.textContent = this.kmap[minterm] || '0';
        
        if (this.kmap[minterm] === '1') {
            div.classList.add('value-1');
        } else {
            div.classList.add('value-0');
        }
        
        div.addEventListener('click', () => this.toggleCell(minterm));
        return div;
    }

    toggleCell(minterm) {
        this.kmap[minterm] = this.kmap[minterm] === '1' ? '0' : '1';
        this.generateKMap();
        this.updateTruthTable();
        this.findGroups(); // Automatically find groups after each change
    }

    clearKMap() {
        this.kmap = {};
        this.generateKMap();
        this.updateTruthTable();
        this.findGroups(); // Automatically find groups after clearing
    }

    randomFill() {
        this.kmap = {};
        const numCells = Math.pow(2, this.variables);
        
        for (let i = 0; i < numCells; i++) {
            const binary = i.toString(2).padStart(this.variables, '0');
            this.kmap[binary] = Math.random() > 0.5 ? '1' : '0';
        }
        
        this.generateKMap();
        this.updateTruthTable();
        this.findGroups(); // Automatically find groups after random fill
    }

    updateTruthTable() {
        const table = document.getElementById('truth-table');
        table.innerHTML = '';
        
        // Header
        const headerRow = table.insertRow();
        const variables = ['A', 'B', 'C', 'D'].slice(0, this.variables);
        variables.forEach(v => {
            const th = document.createElement('th');
            th.textContent = v;
            headerRow.appendChild(th);
        });
        const outputTh = document.createElement('th');
        outputTh.textContent = 'F';
        headerRow.appendChild(outputTh);
        
        // Data rows
        const numRows = Math.pow(2, this.variables);
        for (let i = 0; i < numRows; i++) {
            const row = table.insertRow();
            const binary = i.toString(2).padStart(this.variables, '0');
            
            for (let j = 0; j < this.variables; j++) {
                const cell = row.insertCell();
                cell.textContent = binary[j];
            }
            
            const outputCell = row.insertCell();
            outputCell.textContent = this.kmap[binary] || '0';
            outputCell.style.fontWeight = '600';
            outputCell.style.color = (this.kmap[binary] === '1') ? '#059669' : '#dc2626';
        }
    }

    findGroups() {
        this.groups = [];
        const ones = Object.keys(this.kmap).filter(key => this.kmap[key] === '1');
        
        if (ones.length === 0) {
            this.updateGroupsDisplay();
            this.updateSimplifiedExpression();
            return;
        }

        // Convert binary strings to numbers for easier processing
        const onesAsNumbers = ones.map(term => parseInt(term, 2));
        
        // Find all possible groups and sort by size (largest first)
        const allPossibleGroups = this.findAllPossibleGroups(onesAsNumbers);
        allPossibleGroups.sort((a, b) => b.length - a.length);

        // Filter out groups that are subsets of larger groups
        let maximalGroups = allPossibleGroups.filter((group, i, arr) => {
            return !arr.some((other, j) =>
                j !== i &&
                other.length > group.length &&
                group.every(x => other.includes(x))
            );
        });

        // Remove duplicate groups (same minterms, possibly in different order)
        maximalGroups = maximalGroups.filter((group, i, arr) => {
            return arr.findIndex(other =>
                other.length === group.length &&
                other.every(x => group.includes(x))
            ) === i;
        });

        // Add only maximal, unique groups
        for (let group of maximalGroups) {
            const groupTerms = group.map(num => num.toString(2).padStart(this.variables, '0'));
            this.groups.push({
                terms: groupTerms,
                size: group.length,
                expression: this.groupToExpression(group)
            });
        }
        
        this.updateGroupsDisplay();
        this.updateSimplifiedExpression();
    }

    findAllPossibleGroups(ones) {
        const allGroups = [];
        
        // Start from largest possible group size down to 1
        const maxSize = Math.pow(2, this.variables);
        for (let size = maxSize; size >= 1; size /= 2) {
            const groupsOfSize = this.findAllGroupsOfSize(ones, size);
            allGroups.push(...groupsOfSize);
        }
        
        return allGroups;
    }

    findAllGroupsOfSize(ones, targetSize) {
        const groups = [];
        
        if (this.variables === 2) {
            groups.push(...this.findAllGroups2Var(ones, targetSize));
        } else if (this.variables === 3) {
            groups.push(...this.findAllGroups3Var(ones, targetSize));
        } else if (this.variables === 4) {
            groups.push(...this.findAllGroups4Var(ones, targetSize));
        }
        
        return groups;
    }

    findAllGroups2Var(ones, targetSize) {
        const patterns = {
            1: ones.map(num => [num]), // Individual cells
            2: [
                [0, 1], [2, 3], // horizontal pairs
                [0, 2], [1, 3]  // vertical pairs
            ],
            4: [[0, 1, 2, 3]] // all cells
        };
        
        const validGroups = [];
        for (let pattern of patterns[targetSize] || []) {
            if (pattern.every(num => ones.includes(num))) {
                validGroups.push(pattern);
            }
        }
        return validGroups;
    }

    findAllGroups3Var(ones, targetSize) {
        const patterns = {
            1: ones.map(num => [num]), // Individual cells
            2: [
                // Adjacent pairs in Gray code order (3-var K-map layout: 000,001,011,010 / 100,101,111,110)
                [0, 1], [1, 3], [3, 2], [2, 0], // top row adjacencies (with wrap-around)
                [4, 5], [5, 7], [7, 6], [6, 4], // bottom row adjacencies (with wrap-around)
                [0, 4], [1, 5], [2, 6], [3, 7]  // vertical pairs
            ],
            4: [
                [0, 1, 3, 2], [4, 5, 7, 6], // horizontal rectangles (rows)
                [0, 1, 4, 5], [1, 3, 5, 7], [3, 2, 7, 6], [2, 0, 6, 4], // vertical rectangles and corners
                [0, 2, 4, 6], [1, 3, 5, 7] // diagonal patterns (corners)
            ],
            8: [[0, 1, 2, 3, 4, 5, 6, 7]] // all cells
        };
        
        const validGroups = [];
        for (let pattern of patterns[targetSize] || []) {
            if (pattern.every(num => ones.includes(num))) {
                validGroups.push(pattern);
            }
        }
        return validGroups;
    }

    findAllGroups4Var(ones, targetSize) {
        const patterns = {
            1: ones.map(num => [num]), // Individual cells
            2: this.generate4VarPairs(),
            4: this.generate4VarQuads(),
            8: this.generate4VarOctets(),
            16: [[...Array(16).keys()]] // all cells
        };
        
        const validGroups = [];
        for (let pattern of patterns[targetSize] || []) {
            if (pattern.every(num => ones.includes(num))) {
                validGroups.push(pattern);
            }
        }
        return validGroups;
    }

    generate4VarPairs() {
        // Generate all valid adjacent pairs for 4-variable K-map
        const pairs = [];
        const kmap4Layout = [
            [0, 1, 3, 2],
            [4, 5, 7, 6],
            [12, 13, 15, 14],
            [8, 9, 11, 10]
        ];
        
        // Horizontal pairs
        for (let row of kmap4Layout) {
            for (let i = 0; i < row.length - 1; i++) {
                pairs.push([row[i], row[i + 1]]);
            }
            // Wrap around
            pairs.push([row[row.length - 1], row[0]]);
        }
        
        // Vertical pairs
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 3; row++) {
                pairs.push([kmap4Layout[row][col], kmap4Layout[row + 1][col]]);
            }
            // Wrap around
            pairs.push([kmap4Layout[3][col], kmap4Layout[0][col]]);
        }
        
        return pairs;
    }

    generate4VarQuads() {
        // Generate all valid 2x2 rectangles for 4-variable K-map
        return [
            [0, 1, 4, 5], [1, 3, 5, 7], [3, 2, 7, 6], [2, 0, 6, 4],
            [4, 5, 12, 13], [5, 7, 13, 15], [7, 6, 15, 14], [6, 4, 14, 12],
            [12, 13, 8, 9], [13, 15, 9, 11], [15, 14, 11, 10], [14, 12, 10, 8],
            [8, 9, 0, 1], [9, 11, 1, 3], [11, 10, 3, 2], [10, 8, 2, 0]
        ];
    }

    generate4VarOctets() {
        // Generate all valid 8-cell groups for 4-variable K-map
        return [
            [0, 1, 2, 3, 4, 5, 6, 7], // top two rows
            [8, 9, 10, 11, 12, 13, 14, 15], // bottom two rows
            [0, 1, 4, 5, 8, 9, 12, 13], // left two columns
            [2, 3, 6, 7, 10, 11, 14, 15] // right two columns
        ];
    }

    groupToExpression(group) {
        if (group.length === 1) {
            return this.termToExpression(group[0].toString(2).padStart(this.variables, '0'));
        }
        
        // Find which variables are constant across the group
        const firstTerm = group[0].toString(2).padStart(this.variables, '0');
        const constants = [];
        
        for (let i = 0; i < this.variables; i++) {
            const bit = firstTerm[i];
            if (group.every(num => {
                const term = num.toString(2).padStart(this.variables, '0');
                return term[i] === bit;
            })) {
                constants.push({
                    variable: ['A', 'B', 'C', 'D'][i],
                    value: bit
                });
            }
        }
        
        if (constants.length === 0) return '1'; // All variables cancel out
        
        return constants.map(c => c.value === '1' ? c.variable : c.variable + "'").join('');
    }

    updateGroupsDisplay() {
        const container = document.getElementById('groups-list');
        container.innerHTML = '';
        
        if (this.groups.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No Groups Found :o';
            container.appendChild(p);
            return;
        }
        
        this.groups.forEach((group, index) => {
            const div = document.createElement('div');
            div.className = 'group-item fade-in';
            div.innerHTML = `
                <strong>Group ${index + 1}:</strong> ${group.terms.join(', ')}<br>
                <em>Expression: ${group.expression}</em>
            `;
            container.appendChild(div);
        });
    }

    updateSimplifiedExpression() {
        const display = document.getElementById('simplified-expression');
        
        const ones = Object.keys(this.kmap).filter(key => this.kmap[key] === '1');
        
        if (ones.length === 0) {
            display.textContent = 'F = 0';
            return;
        }
        
        if (this.groups.length === 0) {
            // Show sum of minterms when no groups are found
            const minterms = ones.map(term => this.termToExpression(term));
            display.textContent = 'F = ' + minterms.join(' + ');
        } else {
            // Show simplified expression using groups
            const expressions = this.groups.map(group => group.expression);
            display.textContent = 'F = ' + expressions.join(' + ');
        }
    }

    termToExpression(term) {
        const variables = ['A', 'B', 'C', 'D'].slice(0, this.variables);
        return term.split('').map((bit, index) => {
            return bit === '1' ? variables[index] : variables[index] + "'";
        }).join('');
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new KMapVisualizer();
});
