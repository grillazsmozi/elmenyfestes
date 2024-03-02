const dropdown = document.getElementById('festes');
const input = document.getElementById('datum');

dropdown.addEventListener('change', function() {
    const selectedValue = dropdown.value;
    input.value = selectedValue
})