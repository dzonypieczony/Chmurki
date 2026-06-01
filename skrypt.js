const body = document.body
let daneMiast = [] // Branie danych miast do podpowiadania
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

// Podpowiadanie do wyszukiwania
    const datalist = document.createElement('datalist')
    datalist.id = 'miasta'
    input.setAttribute('list', 'miasta')


    const button = document.createElement('button')
    button.id = 'wyszukiwanie_przycisk'
    button.textContent = 'Szukaj'

    search.appendChild(input)
    search.appendChild(button)
    search.appendChild(datalist)

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
// Podpowiadanie do wyszukiwania
    input.addEventListener("input", () => {
        const tekst = input.value.toLowerCase()
        if (tekst.length < 2) {
            datalist.innerHTML = ""
            return
        }
        const wyniki = daneMiast
            .filter(m => m.Name.toLowerCase().startsWith(tekst))
            .slice(0, 10)
        datalist.innerHTML = ""
        wyniki.forEach(m => {
            const option = document.createElement("option")
            option.value = m.Name
            datalist.appendChild(option)
        })
    })
    }
async function szukaj() {
    const query = document.getElementById("wyszukiwanie_pole").value;
    await pobierzPogode(query);
}
function Wiatr(v) { //logika wiatru, temperatury  - obrazki - itd
    if (v < 20) return 'wiatr/wind.svg'
    return 'wiatr/wind-alert.svg'
}
function Temperatura(temp){
    if (temp < 5) return 'temperatura/thermometer-colder.svg'
    if (temp < 20) return 'temperatura/thermometer.svg'
    return 'temperatura/thermometer-warmer.svg'
}
function Cisnienie(pressure){
    if (pressure < 1000) return 'cisnienie/pressure-low.svg'
    if (pressure < 1020) return 'cisnienie/star.svg'
    return 'cisnienie/pressure-high.svg'
}

function pokaz(miasto, pogoda) {

    const wynik = document.getElementById('wynik')
    wynik.innerHTML = ''

    const kontener = document.createElement('div')
    kontener.classList.add('miasto_zawartosc')

    kontener.appendChild(card('Temperatura', Temperatura(pogoda.current.temperature_2m), pogoda.current.temperature_2m + '°C'))
    kontener.appendChild(card('Opis Pogody', 'zachmurzenie_opady/cloudy.svg', pogoda.current.relative_humidity_2m + '%'))

    kontener.appendChild(card('Wiatr', Wiatr(pogoda.current.wind_speed_10m), pogoda.current.wind_speed_10m + ' km/h'))
    kontener.appendChild(card('Ciśnienie', Cisnienie(pogoda.current.surface_pressure), pogoda.current.surface_pressure + ' hPa'))



    wynik.appendChild(kontener)
}

async function pobierzPogode(query) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=pl&format=json`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        console.log("Nie znaleziono miasta");
        return;
    }

    const miasto = geoData.results[0];
    const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${miasto.latitude}&longitude=${miasto.longitude}&current=temperature_2m,wind_speed_10m,surface_pressure`;

    const weatherRes = await fetch(weatherUrl);
    const pogoda = await weatherRes.json();

    pokaz(miasto, pogoda);
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