document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.target');
    let draggedElement = null;
    let isSticky = false;
    let initialPosition = {};
    let lastTouchTime = 0;

    targets.forEach(target => {
        target.addEventListener('mousedown', startDragging);
        target.addEventListener('dblclick', startStickyDragging);

        target.addEventListener('touchstart', handleTouchStart);
        target.addEventListener('touchend', handleTouchEnd);
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchstart', onDocumentTouchStart);

    function startDragging(event) {
        if (isSticky) return;
        draggedElement = event.target;
        initialPosition = { x: event.target.offsetLeft, y: event.target.offsetTop };
        draggedElement.style.position = 'absolute';
    }

    function startStickyDragging(event) {
        draggedElement = event.target;
        initialPosition = { x: event.target.offsetLeft, y: event.target.offsetTop };
        draggedElement.style.position = 'absolute';
        draggedElement.style.backgroundColor = 'yellow';
        isSticky = true;
    }

    function onMouseMove(event) {
        if (!draggedElement) return;
        draggedElement.style.left = `${event.pageX}px`;
        draggedElement.style.top = `${event.pageY}px`;
    }

    function onMouseUp() {
        if (!isSticky) {
            draggedElement = null;
        }
    }

    function onClick(event) {
        if (isSticky && event.target === draggedElement) {
            isSticky = false;
            draggedElement.style.backgroundColor = '';
            draggedElement = null;
        }
    }

    function onKeyDown(event) {
        if (event.key === 'Escape' && draggedElement) {
            resetDraggedElement();
        }
    }

    function handleTouchStart(event) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTouchTime;

        if (tapLength < 300 && tapLength > 0) {
            startStickyDragging(event);
        } else if (!isSticky) {
            startDragging(event);
        }

        lastTouchTime = currentTime;
    }

    function handleTouchEnd(event) {
        if (event.touches.length === 0) {
            onMouseUp();
        }

        if (event.touches.length > 1) {
            resetDraggedElement();
        }
    }

    function onTouchMove(event) {
        event.preventDefault();
        if (!draggedElement) return;
        const touch = event.touches[0];
        draggedElement.style.left = `${touch.pageX}px`;
        draggedElement.style.top = `${touch.pageY}px`;
    }

    function onDocumentTouchStart(event) {
        if (isSticky && !draggedElement) {
            draggedElement = targets[0]; // Assume the first target is the active one
            draggedElement.style.position = 'absolute';
        }
    }

    function resetDraggedElement() {
        if (draggedElement) {
            draggedElement.style.left = `${initialPosition.x}px`;
            draggedElement.style.top = `${initialPosition.y}px`;
            draggedElement.style.backgroundColor = '';
            draggedElement = null;
            isSticky = false;
        }
    }
});