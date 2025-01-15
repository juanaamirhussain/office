document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const showDataBtn = document.getElementById('showDataBtn');
    const dataSection = document.getElementById('dataSection');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const searchBox = document.getElementById('searchBox');
    const deleteAllBtn = document.getElementById('deleteAllBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = Date.now();
        const name = document.getElementById('name').value;
        const cnic = document.getElementById('cnic').value;
        const patwariId = document.getElementById('patwariId').value;
        const halqa = document.getElementById('halqa').value;
        const idPassword = document.getElementById('idPassword').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const password = document.getElementById('password').value;

        if (password !== '7897836') {
            alert('Incorrect password!');
            return;
        }

        const data = { id, name, cnic, patwariId, halqa, idPassword, whatsapp };
        saveData(data);
        appendDataToTable(data);
        form.reset();
        dataSection.style.display = 'block';
    });

    showDataBtn.addEventListener('click', () => {
        const password = prompt('Enter password to view data:');
        if (password !== '7897836') {
            alert('Incorrect password!');
            return;
        }
        dataSection.style.display = 'block';
        loadData();
    });

    searchBox.addEventListener('input', (e) => {
        const filter = e.target.value.toLowerCase();
        const rows = dataTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let match = false;
            for (let j = 0; j < cells.length - 3; j++) {
                if (cells[j].textContent.toLowerCase().includes(filter)) {
                    match = true;
                    break;
                }
            }
            rows[i].style.display = match ? '' : 'none';
        }
    });

    deleteAllBtn.addEventListener('click', () => {
        const password = prompt('Enter password to delete all data:');
        if (password !== '7897836') {
            alert('Incorrect password!');
            return;
        }

        localStorage.removeItem('data');
        dataTable.innerHTML = '';
        dataSection.style.display = 'none';
    });

    function saveData(data) {
        let savedData = JSON.parse(localStorage.getItem('data')) || [];
        savedData.unshift(data);
        localStorage.setItem('data', JSON.stringify(savedData));
    }

    function loadData() {
        const savedData = JSON.parse(localStorage.getItem('data')) || [];
        savedData.forEach(data => appendDataToTable(data));
        if (savedData.length > 0) {
            dataSection.style.display = 'block';
        }
    }

    function appendDataToTable(data) {
        const row = dataTable.insertRow();
        row.insertCell(0).textContent = data.id;
        row.insertCell(1).textContent = data.name;
        row.insertCell(2).textContent = data.cnic;
        row.insertCell(3).textContent = data.patwariId;
        row.insertCell(4).textContent = data.halqa;
        row.insertCell(5).textContent = data.idPassword;
        row.insertCell(6).innerHTML = `<a href="https://wa.me/${data.whatsapp}" target="_blank">${data.whatsapp}</a>`;
        const editCell = row.insertCell(7);
        const deleteCell = row.insertCell(8);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => requestPassword(() => editData(row, data));
        editCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => requestPassword(() => deleteData(row, data.id));
        deleteCell.appendChild(deleteButton);
    }

    function requestPassword(callback) {
        const password = prompt('Enter password:');
        if (password === '7897836') {
            callback();
        } else {
            alert('Incorrect password!');
        }
    }

    function editData(row, data) {
        const cells = row.getElementsByTagName('td');
        const name = prompt('Edit Name', data.name);
        const cnic = prompt('Edit CNIC', data.cnic);
        const patwariId = prompt('Edit Patwari ID', data.patwariId);
        const halqa = prompt('Edit Halqa', data.halqa);
        const idPassword = prompt('Edit ID Password', data.idPassword);
        const whatsapp = prompt('Edit WhatsApp', data.whatsapp);

        if (name !== null) data.name = name;
        if (cnic !== null) data.cnic = cnic;
        if (patwariId !== null) data.patwariId = patwariId;
        if (halqa !== null) data.halqa = halqa;
        if (idPassword !== null) data.idPassword = idPassword;
        if (whatsapp !== null) data.whatsapp = whatsapp;

        saveEditedData(data);
        cells[1].textContent = data.name;
        cells[2].textContent = data.cnic;
        cells[3].textContent = data.patwariId;
        cells[4].textContent = data.halqa;
        cells[5].textContent = data.idPassword;
        cells[6].innerHTML = `<a href="https://wa.me/${data.whatsapp}" target="_blank">${data.whatsapp}</a>`;
    }

    function saveEditedData(data) {
        let savedData = JSON.parse(localStorage.getItem('data')) || [];
        savedData = savedData.map(item => item.id === data.id ? data : item);
        localStorage.setItem('data', JSON.stringify(savedData));
    }

    function deleteData(row, id) {
        row.remove();
        let savedData = JSON.parse(localStorage.getItem('data')) || [];
        savedData = savedData.filter(item => item.id !== id);
        localStorage.setItem('data', JSON.stringify(savedData));

        if (savedData.length === 0) {
            dataSection.style.display = 'none';
        }
    }

    loadData();
});
