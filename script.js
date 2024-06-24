// Generación de calendarios interactivos con navegación de mes
const calendarTitle = document.getElementById('calendarTitle');
const calendarGrid = document.getElementById('calendarGrid');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const sendWhatsappBtn = document.getElementById('sendWhatsapp');

const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Función para generar el calendario para un mes y año dados
function generateCalendar(month, year) {
    // Limpiar el calendario anterior
    calendarGrid.innerHTML = '';

    // Establecer el título del calendario con mes y año
    calendarTitle.textContent = `${months[month]} ${year}`;

    // Obtener el primer día y el último día del mes
    const firstDay = new Date(year, month, 1).getDay(); // Día de la semana (0-6)
    const lastDate = new Date(year, month + 1, 0).getDate(); // Último día del mes

    // Generar los días del mes
    for (let i = 0; i < firstDay; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'empty');
        calendarGrid.appendChild(dayElement);
    }

    for (let i = 1; i <= lastDate; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;

        if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayElement.classList.add('today');
        }

        dayElement.addEventListener('click', function() {
            // Limpiar selección previa
            const selected = document.querySelector('.day.selected');
            if (selected) {
                selected.classList.remove('selected');
            }
            
            // Marcar día seleccionado
            dayElement.classList.add('selected');
            selectedDate = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}-${i < 10 ? '0' + i : i}`; // Formato YYYY-MM-DD
            console.log(selectedDate); // Mostrar en consola para verificar
        });

        calendarGrid.appendChild(dayElement);
    }
}

// Generar calendario para el mes actual al cargar la página
generateCalendar(currentMonth, currentYear);

// Event listeners para cambiar de mes
prevMonthBtn.addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Event listener para enviar por WhatsApp

const number = '+ 593984253830'
sendWhatsappBtn.addEventListener('click', function() {
    if (selectedDate) {
        const whatsappLink = `https://api.whatsapp.com/send?phone=${number}&text=Quiero%20agendar%20una%20cita%20para%20el%20${selectedDate}`;
        window.open(whatsappLink, '_blank');
    } else {
        alert('Por favor selecciona una fecha primero.');
    }
});

