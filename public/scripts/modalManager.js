function login() {
    const azonosito = document.getElementById('azonosito').value
    const jelszo = document.getElementById('jelszo').value

    if (azonosito === "baloghtatailevente" || azonosito === "baloghtatairenata") {
        if (jelszo === "Sanyikaa20110127#" || jelszo === "BTRencsi1983*") {
            sessionStorage.setItem('adminid',azonosito)
        } else {
            sessionStorage.removeItem('adminid')
        }
    } else {
        sessionStorage.removeItem('adminid')
    }
    document.getElementById('azonosito').value = ""
    document.getElementById('jelszo').value = ""
    location.reload()
}