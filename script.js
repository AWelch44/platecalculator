const availablePlates = [45, 35, 25, 10, 5, 2.5];

const plateColors = {
    45: '#1e40af',
    35: '#2563eb',
    25: '#3b82f6',
    10: '#60a5fa',
    5: '#93c5fd',
    2.5: '#bfdbfe'
};

const defaultBarWeights = {
    barbell: 45,
    hackSquat: 35,
    legPress: 45,
    other: 0
};

function calculatePlates() {
    const targetWeight = parseFloat(document.getElementById('targetWeight').value);
    const machineType = document.getElementById('machineType').value;
    const barWeight = parseFloat(document.getElementById('barWeight').value) || defaultBarWeights[machineType];
    const results = document.getElementById('results');
    const error = document.getElementById('error');
    const plateList = document.getElementById('plateList');

    // Reset displays
    results.style.display = 'none';
    error.style.display = 'none';
    plateList.innerHTML = '';

    // Validate inputs
    if (!targetWeight || !barWeight) {
        error.textContent = 'Please enter valid weights';
        error.style.display = 'block';
        return;
    }

    // Calculate weight needed per side
    const weightPerSide = (targetWeight - barWeight) / 2;

    if (weightPerSide < 0) {
        error.textContent = 'Target weight must be greater than bar weight';
        error.style.display = 'block';
        return;
    }

    // Calculate plates needed
    const platesNeeded = {};
    let remainingWeight = weightPerSide;

    for (const plate of availablePlates) {
        const count = Math.floor(remainingWeight / plate);
        if (count > 0) {
            platesNeeded[plate] = count;
            remainingWeight -= (count * plate);
        }
    }

    // Display results
    if (remainingWeight > 0.1) { // Allow for small rounding errors
        error.textContent = `Cannot make exact weight. Closest possible weight is ${targetWeight - (remainingWeight * 2)} lbs`;
        error.style.display = 'block';
    }

    // Create plate list
    let html = '';
    for (const [plate, count] of Object.entries(platesNeeded)) {
        html += `<p>
            <span style="display: inline-block; width: 20px; height: 20px; background-color: ${plateColors[plate]}; margin-right: 10px; vertical-align: middle; border-radius: 4px;"></span>
            ${count}x ${plate}lb plates
        </p>`;
    }
    plateList.innerHTML = html || '<p>No plates needed</p>';

    // Show results
    results.style.display = 'block';

    // Visualize plates
    visualizePlates(platesNeeded, barWeight);
}

function visualizePlates(platesNeeded, barWeight) {
    const barbell = document.getElementById('barbell');
    barbell.innerHTML = '';

    // Add the bar element first
    const barElement = document.createElement('div');
    barElement.className = 'barbell';
    
    barbell.appendChild(barElement);

    let xOffset = 0;
    const plateSpacing = 26;

    for (const [plate, count] of Object.entries(platesNeeded)) {
        for (let i = 0; i < count; i++) {
            // Create right plate
            const plateElement = createPlateElement(plate, xOffset, 'right');
            barbell.appendChild(plateElement);
            
            
            
            // Create left plate
            const leftPlate = createPlateElement(plate, xOffset, 'left');
            barbell.appendChild(leftPlate);
            
            
            
            xOffset += plateSpacing;
        }
    }
}

function createPlateElement(weight, xOffset, side) {
    const plateElement = document.createElement('div');
    plateElement.className = 'plate';
    
    const height = Math.max(40, Math.min(100, weight * 1.8));
    plateElement.style.height = `${height}px`;
    plateElement.style.backgroundColor = plateColors[weight];
    
    if (side === 'right') {
        plateElement.style.right = `${xOffset}px`;
    } else {
        plateElement.style.left = `${xOffset}px`;
    }
    plateElement.style.top = `${(120 - height) / 2}px`;
    
    plateElement.textContent = weight;
    return plateElement;
}



// Add event listeners
document.getElementById('targetWeight').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') calculatePlates();
});

document.getElementById('machineType').addEventListener('change', function() {
    const barWeight = defaultBarWeights[this.value] || 0;
    document.getElementById('barWeight').value = barWeight;
});