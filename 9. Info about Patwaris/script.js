document.addEventListener('DOMContentLoaded', () => {
    const patwariTable = document.getElementById('patwariTable').getElementsByTagName('tbody')[0];

    // Example data
    const data = [
        {
            name: 'Mehar Afzal Haraj',
            id: '36302-6272967-3',
            idPassword: 'Haraj2694*',
            halqa: 'Tehsildar Pindigheb',
            whatsapp: '+923006890786'
        },
        {
            name: 'Tanvir Ahmed',
            id: 'tanvir.ahmed.m.khan',
            idPassword: 'Ahmed@123',
            halqa: 'Qangoi Mianwala, Kisran, ',
            whatsapp: '+923015129495'
        }
    ];

    data.forEach(patwari => {
        const row = patwariTable.insertRow();
        row.insertCell(0).textContent = patwari.name;
        row.insertCell(1).textContent = patwari.id;
        row.insertCell(2).textContent = patwari.idPassword;
        row.insertCell(3).textContent = patwari.halqa;
        row.insertCell(4).innerHTML = `<a href="https://wa.me/${patwari.whatsapp}" target="_blank">${patwari.whatsapp}</a>`;
    });
});
document.getElementById('showDataBtn').addEventListener('click', () => {
    const password = prompt('Enter password to view data:');
    if (password === '7897836') {
        document.getElementById('dataSection').style.display = 'block';
    } else {
        alert('Incorrect password!');
    }
});

