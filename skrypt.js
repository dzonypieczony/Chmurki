const body = document.body
let daneMiast = [] // Branie danych miast do podpowiadania
fetch('miasta.json')
    .then(r => r.json())
    .then(dane => daneMiast = dane)
    .then(() => renderUI())

function renderUI() {
    const strona = document.createElement('div')
    strona.classList.add('strona')

    const glowna_zawartosc = document.createElement('div')
    glowna_zawartosc.classList.add('glowna_zawartosc')

    const header = document.createElement('header')
    header.id = 'header_id'
    const naglowek_tekst = document.createElement('h1')
    naglowek_tekst.textContent = 'Pogoda na każdy dzień'
    header.appendChild(naglowek_tekst)


    const zawartosc_miasto = document.createElement('div')
    zawartosc_miasto.classList.add('miasto_zawartosc')


    const wyszukiwanie_miasta = document.createElement('div')
    wyszukiwanie_miasta.id = 'wyszukiwanie_miasta'

    const wyszukiwanie_pole = document.createElement('input')
    wyszukiwanie_pole.id = 'wyszukiwanie_pole'
    wyszukiwanie_pole.type = 'text'


// Podpowiadanie do wyszukiwania
    const datalist = document.createElement('datalist')
    datalist.id = 'miasta'
    wyszukiwanie_pole.setAttribute('list', 'miasta')


    const wyszukiwanie_przycisk = document.createElement('button')
    wyszukiwanie_przycisk.id = 'wyszukiwanie_przycisk'
    wyszukiwanie_przycisk.textContent = 'Szukaj'

    wyszukiwanie_miasta.appendChild(wyszukiwanie_pole)
    wyszukiwanie_miasta.appendChild(wyszukiwanie_przycisk)
    wyszukiwanie_miasta.appendChild(datalist)

    const wynik = document.createElement('div')
    wynik.id = 'wynik'

    glowna_zawartosc.appendChild(wyszukiwanie_miasta)
    glowna_zawartosc.appendChild(wynik)

    const footer = document.createElement('footer')
    footer.innerHTML = 'Przekaż 1,5% podatku na fundację <b>Pogoda dla każdego</b>'


    strona.appendChild(header)
    strona.appendChild(glowna_zawartosc)
    strona.appendChild(footer)

    body.appendChild(strona)

    document.getElementById('wyszukiwanie_przycisk')
        .addEventListener('click', szukaj)
// Podpowiadanie do wyszukiwania
    wyszukiwanie_pole.addEventListener("input", () => {
        const tekst = wyszukiwanie_pole.value.toLowerCase()
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
    // await pobierzPogode(query);
    // await pobierzKilkaDniPogody(query,7);
    await pobierzKonkretnegoDniaPogode(query,0);
}

async function szukajDnia(numer_dnia) {
    const query = document.getElementById("wyszukiwanie_pole").value;
    // await pobierzPogode(query);
    // await pobierzKilkaDniPogody(query,7);
    await pobierzKonkretnegoDniaPogode(query,numer_dnia);
}

function SzansaOpadow(chance) {
    if (chance < 10) return 'zachmurzenie_opady/clear-day.svg'
    if (chance < 30) return 'zachmurzenie_opady/partly-cloudy-day.svg'
    if (chance < 50) return 'zachmurzenie_opady/cloudy.svg'
    return 'zachmurzenie_opady/rain.svg'
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
    if (pressure < 1013) return 'cisnienie/pressure-low.svg'
    return 'cisnienie/pressure-high.svg'
}
function opisPogody(code, isDay) {

    if (code === 0) {
        return isDay
            ? ["Słonecznie", "zachmurzenie_opady/clear-day.svg"]
            : ["Bezchmurna noc", "zachmurzenie_opady/clear-night.svg"]
    }

    if (code <= 3) {
        return isDay
            ? ["Pochmurno", "zachmurzenie_opady/partly-cloudy-day.svg"]
            : ["Pochmurna noc", "zachmurzenie_opady/partly-cloudy-night.svg"]
    }

    if (code <= 48) {
        return isDay
            ? ["Mgliście", "zachmurzenie_opady/overcast-day-fog.svg"]
            : ["Mglista noc", "zachmurzenie_opady/overcast-night-fog.svg"]
    }

    if (code <= 69) {
        return ["Deszczowo", "zachmurzenie_opady/rain.svg"]
    }

    if (code <= 77) {
        return ["Śnieg", "zachmurzenie_opady/snow.svg"]
    }

    if (code <= 82) {
        return ["Przelotne opady", "zachmurzenie_opady/overcast-drizzle.svg"]
    }

    if (code <= 86) {
        return ["Śnieg", "zachmurzenie_opady/snow.svg"]
    }

    return ["Burza", "zachmurzenie_opady/thunderstorms.svg"]
}

function pokazWieleDni(miasto, pogoda, liczba_dni) {
    const wynik = document.getElementById('wynik')
    wynik.innerHTML = ''

    for (let i = 0; i < liczba_dni; i++) {
        const kontener = document.createElement('div')
        kontener.classList.add('miasto_zawartosc')

        kontener.appendChild(card('Temperatura', Temperatura(pogoda.hourly.temperature_2m[i*24]), pogoda.hourly.temperature_2m[i*24] + '°C'))
        kontener.appendChild(card('Opis Pogody', opisPogody(pogoda.hourly.weather_code[i*24], pogoda.hourly.is_day[i*24])[1], opisPogody(pogoda.hourly.weather_code[i*24], pogoda.hourly.is_day[i*24])[0]))

        kontener.appendChild(card('Wiatr', Wiatr(pogoda.hourly.wind_speed_10m[i*24]), pogoda.hourly.wind_speed_10m[i*24] + ' km/h'))
        kontener.appendChild(card('Ciśnienie', Cisnienie(pogoda.hourly.surface_pressure[i*24]), pogoda.hourly.surface_pressure[i*24] + ' hPa'))
        wynik.appendChild(kontener)
    }
    // naglowek miasta
    const header = document.getElementById('header_id')
    header.innerHTML = ''
    const naglowek_miasta = document.createElement('div')
    naglowek_miasta.classList.add('naglowek_miasta')
    const powrot_kontener = document.createElement('h3')
    powrot_kontener.classList.add('powrot')
    const powrot_tekst = document.createElement('p')
    powrot_tekst.innerHTML = 'Wróć na stronę główną'
    powrot_tekst.style.color = "black"
    const powrot_obraz = document.createElement('img')
    powrot_obraz.src = 'misc/arrow-narrow-left.svg'
    naglowek_miasta.appendChild(powrot_kontener)
    powrot_kontener.appendChild(powrot_tekst)
    powrot_kontener.appendChild(powrot_obraz)

    powrot_kontener.addEventListener('click', () => {
        body.innerHTML = ''
        renderUI();
    });

    const naglowek_tekst = document.createElement('h1')
    naglowek_tekst.textContent = 'Pogoda: ' + miasto.name
    naglowek_miasta.appendChild(naglowek_tekst)
    header.appendChild(naglowek_miasta)

    const dodatkowy_kontener = document.createElement('h3')
    dodatkowy_kontener.classList.add('dodatkowy')
    const dodatkowy_tekst = document.createElement('p')
    dodatkowy_tekst.innerHTML = 'Dodatkowe info'
    dodatkowy_tekst.style.color = "black"
    const dodatkowy_obraz = document.createElement('img')
    dodatkowy_obraz.src = 'misc/plus_symbol.svg'
    naglowek_miasta.appendChild(dodatkowy_kontener)
    dodatkowy_kontener.appendChild(dodatkowy_tekst)
    dodatkowy_kontener.appendChild(dodatkowy_obraz)

    dodatkowy_kontener.addEventListener('click', () => {
        // pobierzMaxPogode(miasto)
        pobierzKonkretnegoDniaMaxPogode(miasto, 0);
    });
}


function pokazKonkretnyDzien(miasto, pogoda, dzien) {
    const wynik = document.getElementById('wynik')
    wynik.innerHTML = ''



    // wybór następnych dni 
    const dni_kontener = document.createElement('div')
    dni_kontener.classList.add('dni_zawartosc')
    for (let i=0; i<8; i++) {
        dni_kontener.appendChild(dzienPrzycisk(i))
    }
    wynik.appendChild(dni_kontener)
    // 


    const kontener = document.createElement('div')
    kontener.classList.add('miasto_zawartosc')
    
    kontener.appendChild(card('Temperatura', Temperatura(pogoda.hourly.temperature_2m[dzien*24]), pogoda.hourly.temperature_2m[dzien*24] + '°C'))
    kontener.appendChild(card('Opis Pogody', opisPogody(pogoda.hourly.weather_code[dzien*24], pogoda.hourly.is_day[dzien*24])[1], opisPogody(pogoda.hourly.weather_code[dzien*24], pogoda.hourly.is_day[dzien*24])[0]))

    kontener.appendChild(card('Wiatr', Wiatr(pogoda.hourly.wind_speed_10m[dzien*24]), pogoda.hourly.wind_speed_10m[dzien*24] + ' km/h'))
    kontener.appendChild(card('Ciśnienie', Cisnienie(pogoda.hourly.surface_pressure[dzien*24]), pogoda.hourly.surface_pressure[dzien*24] + ' hPa'))


    wynik.appendChild(kontener)

    // naglowek miasta
    const header = document.getElementById('header_id')
    header.innerHTML = ''
    const naglowek_miasta = document.createElement('div')
    naglowek_miasta.classList.add('naglowek_miasta')
    const powrot_kontener = document.createElement('h3')
    powrot_kontener.classList.add('powrot')
    const powrot_tekst = document.createElement('p')
    powrot_tekst.innerHTML = 'Wróć na stronę główną'
    powrot_tekst.style.color = "black"
    const powrot_obraz = document.createElement('img')
    powrot_obraz.src = 'misc/arrow-narrow-left.svg'
    naglowek_miasta.appendChild(powrot_kontener)
    powrot_kontener.appendChild(powrot_tekst)
    powrot_kontener.appendChild(powrot_obraz)

    powrot_kontener.addEventListener('click', () => {
        body.innerHTML = ''
        renderUI();
    });

    const naglowek_tekst = document.createElement('h1')
    naglowek_tekst.textContent = 'Pogoda: ' + miasto.name
    naglowek_miasta.appendChild(naglowek_tekst)
    header.appendChild(naglowek_miasta)

    const dodatkowy_kontener = document.createElement('h3')
    dodatkowy_kontener.classList.add('dodatkowy')
    const dodatkowy_tekst = document.createElement('p')
    dodatkowy_tekst.innerHTML = 'Dodatkowe info'
    dodatkowy_tekst.style.color = "black"
    const dodatkowy_obraz = document.createElement('img')
    dodatkowy_obraz.src = 'misc/plus_symbol.svg'
    naglowek_miasta.appendChild(dodatkowy_kontener)
    dodatkowy_kontener.appendChild(dodatkowy_tekst)
    dodatkowy_kontener.appendChild(dodatkowy_obraz)

    dodatkowy_kontener.addEventListener('click', () => {
        // pobierzMaxPogode(miasto)
        pobierzKonkretnegoDniaMaxPogode(miasto, 0)
    });
}



function pokaz(miasto, pogoda) {

    const wynik = document.getElementById('wynik')
    wynik.innerHTML = ''

    const kontener = document.createElement('div')
    kontener.classList.add('miasto_zawartosc')

    kontener.appendChild(card('Temperatura', Temperatura(pogoda.current.temperature_2m), pogoda.current.temperature_2m + '°C'))
    kontener.appendChild(card('Opis Pogody', opisPogody(pogoda.current.weather_code, pogoda.current.is_day)[1], opisPogody(pogoda.current.weather_code, pogoda.current.is_day)[0]))

    kontener.appendChild(card('Wiatr', Wiatr(pogoda.current.wind_speed_10m), pogoda.current.wind_speed_10m + ' km/h'))
    kontener.appendChild(card('Ciśnienie', Cisnienie(pogoda.current.surface_pressure), pogoda.current.surface_pressure + ' hPa'))


    // naglowek miasta
    const header = document.getElementById('header_id')
    header.innerHTML = ''
    const naglowek_miasta = document.createElement('div')
    naglowek_miasta.classList.add('naglowek_miasta')
    const powrot_kontener = document.createElement('h3')
    powrot_kontener.classList.add('powrot')
    const powrot_tekst = document.createElement('p')
    powrot_tekst.innerHTML = 'Wróć na stronę główną'
    powrot_tekst.style.color = "black"
    const powrot_obraz = document.createElement('img')
    powrot_obraz.src = 'misc/arrow-narrow-left.svg'
    naglowek_miasta.appendChild(powrot_kontener)
    powrot_kontener.appendChild(powrot_tekst)
    powrot_kontener.appendChild(powrot_obraz)

    powrot_kontener.addEventListener('click', () => {
        body.innerHTML = ''
        renderUI();
    });

    const naglowek_tekst = document.createElement('h1')
    naglowek_tekst.textContent = 'Pogoda: ' + miasto.name
    naglowek_miasta.appendChild(naglowek_tekst)
    header.appendChild(naglowek_miasta)

    const dodatkowy_kontener = document.createElement('h3')
    dodatkowy_kontener.classList.add('dodatkowy')
    const dodatkowy_tekst = document.createElement('p')
    dodatkowy_tekst.innerHTML = 'Dodatkowe info'
    dodatkowy_tekst.style.color = "black"
    const dodatkowy_obraz = document.createElement('img')
    dodatkowy_obraz.src = 'misc/plus_symbol.svg'
    naglowek_miasta.appendChild(dodatkowy_kontener)
    dodatkowy_kontener.appendChild(dodatkowy_tekst)
    dodatkowy_kontener.appendChild(dodatkowy_obraz)

    dodatkowy_kontener.addEventListener('click', () => {
        // pobierzMaxPogode(miasto)
        pobierzKonkretnegoDniaMaxPogode(miasto, 0)
    });

    wynik.appendChild(kontener)
}

function pokazMax(miasto, pogoda) {

    const wynik = document.getElementById('wynik')
    wynik.innerHTML = ''


    const kontener = document.createElement('div')
    kontener.classList.add('miasto_zawartosc')

    kontener.appendChild(card('Temperatura', Temperatura(pogoda.daily.temperature_2m_max[0]), pogoda.daily.temperature_2m_max[0] + '°C'))
    kontener.appendChild(card('Opis Pogody', opisPogody(pogoda.daily.weather_code[0], true)[1], opisPogody(pogoda.daily.weather_code[0], true)[0]))

    kontener.appendChild(card('Wiatr', Wiatr(pogoda.daily.wind_speed_10m_max[0]), pogoda.daily.wind_speed_10m_max[0] + ' km/h'))
    kontener.appendChild(card('Szansa opadów', SzansaOpadow(pogoda.daily.precipitation_probability_max[0]), pogoda.daily.precipitation_probability_max[0] + ' %'))


    // naglowek miasta
    const header = document.getElementById('header_id')
    header.innerHTML = ''
    const naglowek_miasta = document.createElement('div')
    naglowek_miasta.classList.add('naglowek_miasta')
    const powrot_kontener = document.createElement('h3')
    powrot_kontener.classList.add('powrot')
    const powrot_tekst = document.createElement('p')
    powrot_tekst.innerHTML = 'Wróć na stronę główną'
    powrot_tekst.style.color = "black"
    const powrot_obraz = document.createElement('img')
    powrot_obraz.src = 'misc/arrow-narrow-left.svg'
    naglowek_miasta.appendChild(powrot_kontener)
    powrot_kontener.appendChild(powrot_tekst)
    powrot_kontener.appendChild(powrot_obraz)

    powrot_kontener.addEventListener('click', () => {
        body.innerHTML = ''
        renderUI();
    });

    
    const naglowek_tekst = document.createElement('h1')
    naglowek_tekst.textContent = 'Maksymalne wartości dla: ' + miasto.name
    naglowek_miasta.appendChild(naglowek_tekst)
    header.appendChild(naglowek_miasta)

    const normalny_rozklad_kontener = document.createElement('h3')
    normalny_rozklad_kontener.classList.add('dodatkowy')
    const normalny_rozklad_tekst = document.createElement('p')
    normalny_rozklad_tekst.innerHTML = 'Zwykłe info'
    normalny_rozklad_tekst.style.color = "black"
    const normalny_rozklad_obraz = document.createElement('img')
    normalny_rozklad_obraz.src = 'misc/plus_symbol.svg'
    naglowek_miasta.appendChild(normalny_rozklad_kontener)
    normalny_rozklad_kontener.appendChild(normalny_rozklad_tekst)
    normalny_rozklad_kontener.appendChild(normalny_rozklad_obraz)

    normalny_rozklad_kontener.addEventListener('click', () => {
        szukaj();
    });

    wynik.appendChild(kontener)
}

function pokazKonkretnegoDniaMax(miasto, pogoda, numer_dnia) {
    const wynik = document.getElementById('wynik')
    wynik.innerHTML = ''

    // wybór następnych dni (dodatkowe info)
    const dni_max_kontener = document.createElement('div')
    dni_max_kontener.classList.add('dni_zawartosc')
    for (let i=0; i<8; i++) {
        dni_max_kontener.appendChild(dzienPrzyciskMax(miasto, i))
    }
    wynik.appendChild(dni_max_kontener)
    // 


    const kontener = document.createElement('div')
    kontener.classList.add('miasto_zawartosc')

    kontener.appendChild(card('Temperatura', Temperatura(pogoda.daily.temperature_2m_max[numer_dnia]), pogoda.daily.temperature_2m_max[numer_dnia] + '°C'))
    kontener.appendChild(card('Opis Pogody', opisPogody(pogoda.daily.weather_code[numer_dnia], true)[1], opisPogody(pogoda.daily.weather_code[numer_dnia], true)[0]))

    kontener.appendChild(card('Wiatr', Wiatr(pogoda.daily.wind_speed_10m_max[numer_dnia]), pogoda.daily.wind_speed_10m_max[numer_dnia] + ' km/h'))
    kontener.appendChild(card('Szansa opadów', SzansaOpadow(pogoda.daily.precipitation_probability_max[numer_dnia]), pogoda.daily.precipitation_probability_max[numer_dnia] + ' %'))

    // naglowek miasta
    const header = document.getElementById('header_id')
    header.innerHTML = ''
    const naglowek_miasta = document.createElement('div')
    naglowek_miasta.classList.add('naglowek_miasta')
    const powrot_kontener = document.createElement('h3')
    powrot_kontener.classList.add('powrot')
    const powrot_tekst = document.createElement('p')
    powrot_tekst.innerHTML = 'Wróć na stronę główną'
    powrot_tekst.style.color = "black"
    const powrot_obraz = document.createElement('img')
    powrot_obraz.src = 'misc/arrow-narrow-left.svg'
    naglowek_miasta.appendChild(powrot_kontener)
    powrot_kontener.appendChild(powrot_tekst)
    powrot_kontener.appendChild(powrot_obraz)

    powrot_kontener.addEventListener('click', () => {
        body.innerHTML = ''
        renderUI();
    });

    
    const naglowek_tekst = document.createElement('h1')
    naglowek_tekst.textContent = 'Maksymalne wartości dla: ' + miasto.name
    naglowek_miasta.appendChild(naglowek_tekst)
    header.appendChild(naglowek_miasta)

    const normalny_rozklad_kontener = document.createElement('h3')
    normalny_rozklad_kontener.classList.add('dodatkowy')
    const normalny_rozklad_tekst = document.createElement('p')
    normalny_rozklad_tekst.innerHTML = 'Zwykłe info'
    normalny_rozklad_tekst.style.color = "black"
    const normalny_rozklad_obraz = document.createElement('img')
    normalny_rozklad_obraz.src = 'misc/plus_symbol.svg'
    naglowek_miasta.appendChild(normalny_rozklad_kontener)
    normalny_rozklad_kontener.appendChild(normalny_rozklad_tekst)
    normalny_rozklad_kontener.appendChild(normalny_rozklad_obraz)

    normalny_rozklad_kontener.addEventListener('click', () => {
        szukaj();
    });

    wynik.appendChild(kontener)
}


async function pobierzKilkaDniPogody(query, liczba_dni) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=pl&format=json`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        console.log("Nie znaleziono miasta");
        return;
    }

    const liczba_godzin = 24 * liczba_dni + 1;
    const miasto = geoData.results[0];
    const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${miasto.latitude}&longitude=${miasto.longitude}&hourly=temperature_2m,wind_speed_10m,surface_pressure,weather_code,is_day&forecast_days=${liczba_dni}&forecast_hours=${liczba_godzin}`;

    const weatherRes = await fetch(weatherUrl);
    const pogoda = await weatherRes.json();
    
    pokazWieleDni(miasto, pogoda, liczba_dni);
}

async function pobierzKonkretnegoDniaPogode(query, dzien) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=pl&format=json`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        console.log("Nie znaleziono miasta");
        return;
    }

    const liczba_godzin = 24 * dzien + 1;
    const miasto = geoData.results[0];
    const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${miasto.latitude}&longitude=${miasto.longitude}&hourly=temperature_2m,wind_speed_10m,surface_pressure,weather_code,is_day&forecast_days=${dzien}&forecast_hours=${liczba_godzin}`;

    const weatherRes = await fetch(weatherUrl);
    const pogoda = await weatherRes.json();
    
    pokazKonkretnyDzien(miasto, pogoda, dzien);
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
        `https://api.open-meteo.com/v1/forecast?latitude=${miasto.latitude}&longitude=${miasto.longitude}&current=temperature_2m,wind_speed_10m,surface_pressure,weather_code,is_day`;

    const weatherRes = await fetch(weatherUrl);
    const pogoda = await weatherRes.json();
    
    pokazKonkretnyDzien(miasto, pogoda, 0);
    // pokaz(miasto, pogoda);
}

async function pobierzMaxPogode(miasto) {
    /*const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=pl&format=json`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        console.log("Nie znaleziono miasta");
        return;
    }

    const miasto = geoData.results[0];*/
    const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(miasto.latitude)}&longitude=${encodeURIComponent(miasto.longitude)}&daily=temperature_2m_max,wind_speed_10m_max,precipitation_probability_max,weather_code&timezone=auto`;

    const weatherRes = await fetch(weatherUrl);
    const pogoda = await weatherRes.json();

    pokazMax(miasto, pogoda);
}

async function pobierzKonkretnegoDniaMaxPogode(miasto, numer_dnia) {
    const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(miasto.latitude)}&longitude=${encodeURIComponent(miasto.longitude)}&daily=temperature_2m_max,wind_speed_10m_max,precipitation_probability_max,weather_code&forecast_days=${numer_dnia+1}&timezone=auto`;

    const weatherRes = await fetch(weatherUrl);
    const pogoda = await weatherRes.json();

    pokazKonkretnegoDniaMax(miasto, pogoda, numer_dnia);
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

function dzienPrzycisk(numer_dnia) {
    const dzien_przycisk = document.createElement('article')
    dzien_przycisk.classList.add('dzien_przycisk')

    const dzien_nazwa = document.createElement('h2')
    dzien_nazwa.textContent = numer_dnia

    dzien_przycisk.appendChild(dzien_nazwa)

    dzien_przycisk.addEventListener('click', () => {
        szukajDnia(numer_dnia);
    });

    return dzien_przycisk
}

function dzienPrzyciskMax(miasto, numer_dnia) {
    const dzien_przycisk = document.createElement('article')
    dzien_przycisk.classList.add('dzien_przycisk')

    const dzien_nazwa = document.createElement('h2')
    dzien_nazwa.textContent = numer_dnia

    dzien_przycisk.appendChild(dzien_nazwa)

    dzien_przycisk.addEventListener('click', () => {
        pobierzKonkretnegoDniaMaxPogode(miasto, numer_dnia);
    });

    return dzien_przycisk
}