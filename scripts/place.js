// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('main-nav').classList.toggle('active');
});

// Footer content
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = new Date(document.lastModified).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

// Windchill calculation
function calculateWindChill(temp, windSpeed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 
           (0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1));
}

// Weather calculation
document.addEventListener('DOMContentLoaded', () => {
    const temp = 18; // Static temperature in °C
    const windSpeed = 12; // Static wind speed in km/h
    const windchillElement = document.getElementById('windchill');

    // Check conditions for windchill calculation
    if (temp <= 10 && windSpeed > 4.8) {
        windchillElement.textContent = `${calculateWindChill(temp, windSpeed)}°C`;
    } else {
        windchillElement.textContent = "N/A";
    }
});