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

// Podpowiadanie do wyszukiwania
    const datalist = document.createElement('datalist')
    datalist.id = 'miasta'

    input.setAttribute('list', 'miasta')
    search.appendChild(datalist)


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

        datalist.innerHTML = ""

        if (tekst.length < 2) return

        daneMiast
            .filter(m => m.Name.toLowerCase().includes(tekst))
            .slice(0, 10)
            .forEach(m => {
                const option = document.createElement("option")
                option.value = m.Name
                datalist.appendChild(option)
            })
    })
}



// async function pobierzPogode(miasto) {
//
//     const url =
//         `https://api.open-meteo.com/v1/forecast?latitude=${miasto.Latitude}&longitude=${miasto.Longitude}&current=relative_humidity_2m,temperature_2m,wind_speed_10m,surface_pressure`
//
//     const res = await fetch(url)
//     const pogoda = await res.json()
//
//     pokaz(miasto, pogoda)
// }
function szukaj() {
    const query = document.getElementById("wyszukiwanie_pole").value;
    pobierzPogode(query);
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
        `https://api.open-meteo.com/v1/forecast?latitude=${miasto.latitude}&longitude=${miasto.longitude}&current=relative_humidity_2m,temperature_2m,wind_speed_10m,surface_pressure`;

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