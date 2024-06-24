const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
let noButtonClickCount = 0;

btnNo.addEventListener('click', function() {
    if (noButtonClickCount < 5) {
        btnYes.style.transform = `scale(${1.4 + 0.1 * noButtonClickCount})`;
        noButtonClickCount++;
    } else {
        // Cambiar posición del botón al pasar el mouse
        btnNo.addEventListener('mouseover', function() {
            const newX = Math.random() * (window.innerWidth - btnNo.clientWidth);
            const newY = Math.random() * (window.innerHeight - btnNo.clientHeight);
            btnNo.style.position = 'absolute';
            btnNo.style.left = `${newX}px`;
            btnNo.style.top = `${newY}px`;
        });
    }
});

btnYes.addEventListener('click', function() {
    // Redirigir a la página del calendario
    window.location.href = 'calendario.html'; // Cambiar 'calendario.html' por la ruta de tu página de calendario
});
