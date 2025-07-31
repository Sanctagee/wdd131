const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2013", name: "Power Laces" },
    { id: "fs-1987", name: "Time Circuits" },
    { id: "ac-2000", name: "Low Voltage Controller" },
    { id: "jj-1969", name: "Warp Coil" },
    { id: "jd-2012", name: "Washing Machine" },
    { id: "yr-2001", name: "Inverter AC" },
    { id: "gh-1999", name: "Itel Power Bank" },
    { id: "kj-2019", name: "Rechargeable Fan" },
    { id: "fg-2011", name: "Airpods" }
];

// Populate product dropdown in the Select tag
const productSelect = document.getElementById('productName');
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

// Footer Content
document.addEventListener('DOMContentLoaded', ()=>{
    // Update date/time in footer
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayName = days[today.getDay()];

    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('day').textContent = `Today is ${dayName}`;
    document.getElementById('lastmodified').textContent += document.lastModified;

    
});
