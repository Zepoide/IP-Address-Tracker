const htmlIP = document.getElementById('ip')
const htmlLocation = document.getElementById('location')
const htmlTimeZone = document.getElementById('timezone')
const htmlISP = document.getElementById('isp')
const htmlBuscador = document.getElementById('buscador')
const boton = document.getElementById('boton')

async function fetchIP(contenido){
    if (Number(contenido[0]) >= 0 && Number(contenido[0]) <= 9) {
        var ipAddress = contenido
        var domain = ''
    }else{
        var domain = contenido
        var ipAddress = ''
    }
    console.log(ipAddress)
    console.log(domain)
    // REVISAR NO FUNCIONA CON DOMAIN TODAVIA
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_Y3dcFV0k0BiqqqB9Pu6sua24ESMRD&ipAddress=${ipAddress}&domain=${domain}`)
    const json = await response.json()
    const country = json.location.country
    const city = json.location.city
    const ip = json.ip
    const timezone = json.location.timezone
    const isp = json.isp
    const postalCode = json.location.postalCode
    
    const lat = json.location.lat
    const lng = json.location.lng
    
    var map = L.map('map').setView([lat, lng], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    var myIcon = L.icon({
        iconUrl: '/images/icon-location.svg',
        iconSize: [60, 70]
    });

    L.marker([lat, lng], {icon: myIcon}).addTo(map);

    htmlIP.innerHTML = ip
    htmlLocation.innerHTML = `${city}, ${country} ${postalCode}`
    htmlTimeZone.innerHTML = timezone
    htmlISP.innerHTML = isp
}

boton.addEventListener('click', ()=>{
    const contenido = htmlBuscador.value
    fetchIP(contenido)
})