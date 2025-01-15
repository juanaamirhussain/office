document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let cnic = document.getElementById('cnic').value;
    let password = document.getElementById('password').value;
    let halqa = document.getElementById('halqa').value;

    let data = {
        id: id,
        name: name,
        cnic: cnic,
        password: password,
        halqa: halqa
    };

    localStorage.setItem('formData', JSON.stringify(data));

    document.getElementById('result').innerHTML = "Data saved successfully!";
});

function loadData() {
    let data = JSON.parse(localStorage.getItem('formData'));
    if (data) {
        let dataTable = document.getElementById('dataTable');
        dataTable.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>CNIC</th>
                <th>Password</th>
                <th>Halqa</th>
            </tr>
            <tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.cnic}</td>
                <td>${data.password}</td>
                <td>${data.halqa}</td>
            </tr>
        `;
    }
}

function searchTable() {
    let input = document.getElementById('search');
    let filter = input.value.toUpperCase();
    let table = document.getElementById('dataTable');
    let tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td');
        let found = false;
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        tr[i].style.display = found ? '' : 'none';
    }
}
