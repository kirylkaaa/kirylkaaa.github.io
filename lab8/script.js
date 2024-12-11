const canvas = document.getElementById('canvas');
const shapeSelector = document.getElementById('shape-selector');
let startX, startY, currentShape, shapeType;

shapeSelector.addEventListener('change', () => {
    shapeType = shapeSelector.value;
});

canvas.addEventListener('mousedown', (event) => {
    const { offsetX, offsetY } = event;
    startX = offsetX;
    startY = offsetY;
    shapeType = shapeSelector.value;

    if (shapeType === 'circle') {
        currentShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        currentShape.setAttribute('cx', startX);
        currentShape.setAttribute('cy', startY);
        currentShape.setAttribute('r', 0);
    } else if (shapeType === 'rectangle') {
        currentShape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        currentShape.setAttribute('x', startX);
        currentShape.setAttribute('y', startY);
        currentShape.setAttribute('width', 0);
        currentShape.setAttribute('height', 0);
    } else if (shapeType === 'triangle') {
        currentShape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        currentShape.setAttribute('points', `${startX},${startY}`);
    }
    currentShape.setAttribute('fill', 'transparent');
    currentShape.setAttribute('stroke', 'black');
    currentShape.setAttribute('stroke-width', 2);
    canvas.appendChild(currentShape);
});

canvas.addEventListener('mousemove', (event) => {
    if (!currentShape) return;

    const { offsetX, offsetY } = event;
    const dx = offsetX - startX;
    const dy = offsetY - startY;

    if (shapeType === 'circle') {
        const radius = Math.sqrt(dx * dx + dy * dy);
        currentShape.setAttribute('r', radius);
    } else if (shapeType === 'rectangle') {
        const width = Math.abs(dx);
        const height = Math.abs(dy);
        currentShape.setAttribute('x', Math.min(startX, offsetX));
        currentShape.setAttribute('y', Math.min(startY, offsetY));
        currentShape.setAttribute('width', width);
        currentShape.setAttribute('height', height);
    } else if (shapeType === 'triangle') {
        const points = [
            `${startX},${startY}`,
            `${startX + dx},${startY}`,
            `${startX + dx / 2},${startY - Math.abs(dx)}`
        ].join(' ');
        currentShape.setAttribute('points', points);
    }
});

canvas.addEventListener('mouseup', () => {
    currentShape = null;
});
