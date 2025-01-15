function authenticate() {
    let code = prompt('Enter the access code:');
    if (code !== '7897836') {
        alert('Incorrect code! Access denied.');
        window.location.href = 'index.html'; // Redirect to the form page
    } else {
        loadData(); // Load the data if the code is correct
    }
}
