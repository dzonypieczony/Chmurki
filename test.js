let daneMiast = []

fetch('miasta.json')
    .then(odpowiedz => odpowiedz.json())
    .then(dane => {
        daneMiast = dane
        console.log(daneMiast)
    })

const przycisk = document.getElementById('szukajButton')

przycisk.addEventListener('click', () => {

    const wpisaneMiasto = document.getElementById('miastoInput').value.trim().toLowerCase()

    if (wpisaneMiasto === '') {
        alert('Wpisz miejscowość')
        return
    }
    const znalezioneMiasto = daneMiast.find(element => element.Name.toLowerCase() === wpisaneMiasto)

    if (!znalezioneMiasto) {
        alert('Nie znaleziono miejscowości')
        return
    }
    pobierzDanePogody(znalezioneMiasto)
})

async function pobierzDanePogody(miasto) {

    const szerokosc = miasto.Latitude
    const dlugosc = miasto.Longitude

    const adresApi =
        `https://api.open-meteo.com/v1/forecast?latitude=${szerokosc}&longitude=${dlugosc}&current=relative_humidity_2m,temperature_2m,wind_speed_10m,pressure_msl`
    const odpowiedz = await fetch(adresApi)
    const danePogody = await odpowiedz.json()
    pokazPogode(miasto, danePogody)
}

function pokazPogode(miasto, pogoda) {
    const divWynik = document.getElementById('wynik')
    divWynik.innerHTML = `
        <div class="kartaPogody">

            <h2>${miasto.Name}</h2>

            <p>
                Wilgotność:
                ${pogoda.current.relative_humidity_2m}%
            </p>

            <p>
                Temperatura:
                ${pogoda.current.temperature_2m}°C
            </p>

            <p>
                Wiatr:
                ${pogoda.current.wind_speed_10m} km/h
            </p>

            <p>
                Ciśnienie:
                ${pogoda.current.pressure_msl} hPa
            </p>

        </div>

    `
}