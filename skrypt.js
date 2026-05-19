const body = document.body
let daneMiast = []
fetch('miasta.json')
    .then(r => r.json())
    .then(dane => daneMiast = dane)
    .then(() => renderUI())
function renderUI() {
    const strona = document.createElement('div')
    strona.classList.add('strona')

    const header = document.createElement('header')

    const naglowek = document.createElement('div')
    naglowek.classList.add('naglowek_miasta')

    const h1 = document.createElement('h1')
    h1.textContent = 'Pogoda na każdy dzień'

    naglowek.appendChild(h1)
    header.appendChild(naglowek)

    const main = document.createElement('div')
    main.classList.add('miasto_zawartosc')

    const search = document.createElement('div')
    search.id = 'wyszukiwanie_miasta'

    const input = document.createElement('input')
    input.id = 'wyszukiwanie_pole'
    input.type = 'text'

    const button = document.createElement('button')
    button.id = 'wyszukiwanie_przycisk'
    button.textContent = 'Szukaj'

    search.appendChild(input)
    search.appendChild(button)

    const wynik = document.createElement('div')
    wynik.id = 'wynik'

    main.appendChild(search)
    main.appendChild(wynik)

    const footer = document.createElement('footer')
    footer.innerHTML = 'Przekaż 1,5% podatku na fundację <b>Pogoda dla każdego</b>'

    strona.appendChild(header)
    strona.appendChild(main)
    strona.appendChild(footer)

    body.appendChild(strona)

    document.getElementById('wyszukiwanie_przycisk')
        .addEventListener('click', szukaj)
}

function szukaj() {

    const wpis = document
        .getElementById('wyszukiwanie_pole')
        .value
        .trim()
        .toLowerCase()

    if (!wpis) return alert('Wpisz miejscowość')

    const miasto = daneMiast.find(m => m.Name.toLowerCase() === wpis)

    if (!miasto) return alert('Nie znaleziono miejscowości')

    pobierzPogode(miasto)
}

async function pobierzPogode(miasto) {

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${miasto.Latitude}&longitude=${miasto.Longitude}&current=relative_humidity_2m,temperature_2m,wind_speed_10m,surface_pressure`

    const res = await fetch(url)
    const pogoda = await res.json()

    pokaz(miasto, pogoda)
}

function pokaz(miasto, pogoda) {

    const wynik = document.getElementById('wynik')
    wynik.innerHTML = ''

    const kontener = document.createElement('div')
    kontener.classList.add('miasto_zawartosc')
    if (pogoda.current.temperature_2m<=5){
        kontener.appendChild(card('Temperatura', 'temperatura/thermometer-colder.svg', pogoda.current.temperature_2m + '°C'))
    }
    else if(pogoda.current.temperature_2m<20) {
        kontener.appendChild(card('Temperatura', 'temperatura/thermometer.svg', pogoda.current.temperature_2m + '°C'))
    }
    else if(pogoda.current.temperature_2m>=20){
            kontener.appendChild(card('Temperatura', 'temperatura/thermometer-warmer.svg', pogoda.current.temperature_2m + '°C'))
        }
    kontener.appendChild(card('Wilgotność', 'zachmurzenie_opady/cloudy.svg', pogoda.current.relative_humidity_2m + '%'))
    kontener.appendChild(card('Wiatr', 'wiatr/wind.svg', pogoda.current.wind_speed_10m + ' km/h'))
    kontener.appendChild(card('Ciśnienie', 'cisnienie/pressure-high.svg', pogoda.surface_pressure + ' hPa'))

    wynik.appendChild(kontener)
}

function card(title, img, value) {

    const article = document.createElement('article')
    article.classList.add('element_pogody')

    const h2 = document.createElement('h2')
    h2.textContent = title

    const image = document.createElement('img')
    image.src = img

    const p = document.createElement('p')
    p.textContent = value

    article.appendChild(h2)
    article.appendChild(image)
    article.appendChild(p)

    return article
}