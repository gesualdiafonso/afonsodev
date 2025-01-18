window.onload = function() {
    const name = "Afonso Gesualdi";
    let index = 0;
    const outputElement = document.getElementById('nameOutput');
    
    function typeName() {
        if (index < name.length) {
            outputElement.innerHTML += name.charAt(index);
            index++;
            setTimeout(typeName, 150);
        } else {
            setTimeout(hideLoading, 500); // Após digitar o nome, esconde o loading
        }
    }

    function hideLoading() {
        document.getElementById('loadingContainer').style.display = "none";
        document.getElementById('mainContent').style.display = "block";
    }

    typeName();
};
