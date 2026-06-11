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
    glowna_zawartosc.id = 'glowna_zawartosc'

    // domyślny nagłówek
    const header = document.createElement('header')
    header.id = 'header_id'

    const naglowek_miasta = document.createElement('div')
    naglowek_miasta.classList.add('naglowek_miasta')

    const puste_lewe = document.createElement('div')
    naglowek_miasta.appendChild(puste_lewe)

    const naglowek_tekst = document.createElement('h1')
    naglowek_tekst.textContent = 'Pogoda na każdy dzień'
    naglowek_miasta.appendChild(naglowek_tekst)

    const prawe_przyciski = document.createElement('div')
    prawe_przyciski.classList.add('prawe_przyciski')
    stworzPrzyciskKontakt(prawe_przyciski)

    naglowek_miasta.appendChild(prawe_przyciski)
    header.appendChild(naglowek_miasta)
    //
    //

    // wyszukiwanie miasta
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
    szukajDnia(0);
}

async function szukajDnia(numer_dnia) {
    const query = document.getElementById("wyszukiwanie_pole").value;
    await pobierzPogodeDoKonkretnegoDnia(query, numer_dnia);
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

function pokazKonkretnyDzien(miasto, pogoda, dzien, czy_max) {
    const wynik = document.getElementById('wynik')
    wynik.innerHTML = ''

    wynik.appendChild(pokazDniPrzycisk(miasto, czy_max))

    const kontener = document.createElement('div')
    kontener.classList.add('miasto_zawartosc')

    if (czy_max) {
        kontener.appendChild(stworzElementPogody('Temperatura', Temperatura(pogoda.daily.temperature_2m_max[dzien]), pogoda.daily.temperature_2m_max[dzien] + '°C'))
        kontener.appendChild(stworzElementPogody('Opis Pogody', opisPogody(pogoda.daily.weather_code[dzien], true)[1], opisPogody(pogoda.daily.weather_code[dzien], true)[0]))
        kontener.appendChild(stworzElementPogody('Wiatr', Wiatr(pogoda.daily.wind_speed_10m_max[dzien]), pogoda.daily.wind_speed_10m_max[dzien] + ' km/h'))
        kontener.appendChild(stworzElementPogody('Szansa opadów', SzansaOpadow(pogoda.daily.precipitation_probability_max[dzien]), pogoda.daily.precipitation_probability_max[dzien] + ' %'))
        wynik.appendChild(kontener)
    }
    else {
        kontener.appendChild(stworzElementPogody('Temperatura', Temperatura(pogoda.hourly.temperature_2m[dzien*24]), pogoda.hourly.temperature_2m[dzien*24] + '°C'))
        kontener.appendChild(stworzElementPogody('Opis Pogody', opisPogody(pogoda.hourly.weather_code[dzien*24], pogoda.hourly.is_day[dzien*24])[1], opisPogody(pogoda.hourly.weather_code[dzien*24], pogoda.hourly.is_day[dzien*24])[0]))
        kontener.appendChild(stworzElementPogody('Wiatr', Wiatr(pogoda.hourly.wind_speed_10m[dzien*24]), pogoda.hourly.wind_speed_10m[dzien*24] + ' km/h'))
        kontener.appendChild(stworzElementPogody('Ciśnienie', Cisnienie(pogoda.hourly.surface_pressure[dzien*24]), pogoda.hourly.surface_pressure[dzien*24] + ' hPa'))
        wynik.appendChild(kontener)
    }
    zmienNaNaglowekMiasta(miasto, czy_max)
}

async function pobierzPogodeDoKonkretnegoDnia(query, dzien) {
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
    
    pokazKonkretnyDzien(miasto, pogoda, dzien, false);
}

async function pobierzPogodeDoKonkretnegoDniaMax(miasto, dzien) {
    const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(miasto.latitude)}&longitude=${encodeURIComponent(miasto.longitude)}&daily=temperature_2m_max,wind_speed_10m_max,precipitation_probability_max,weather_code&forecast_days=${dzien+1}&timezone=auto`;

    const weatherRes = await fetch(weatherUrl);
    const pogoda = await weatherRes.json();

    pokazKonkretnyDzien(miasto, pogoda, dzien, true);
}


function stworzElementPogody(title, img, value) {
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

function pokazDniPrzycisk(miasto, czy_max) {
    const pokaz_dni_przycisk = document.createElement('article')
    pokaz_dni_przycisk.classList.add('ladny_kontener')
    pokaz_dni_przycisk.classList.add('klikalne')

    const pokaz_dni_nazwa = document.createElement('h2')
    pokaz_dni_nazwa.textContent = 'Informacje w następnych dniach'
    pokaz_dni_przycisk.appendChild(pokaz_dni_nazwa)

    pokaz_dni_przycisk.addEventListener('click', () => {
        const wynik = document.getElementById('wynik')
        wynik.innerHTML = ''

        // wybór następnych dni 
        const dni_przycisk = document.createElement('article')
        dni_przycisk.classList.add('ladny_kontener')  

        const dni_napis = document.createElement('h2')
        dni_napis.textContent = 'O ile dni do przodu chcesz zobaczyć pogodę?'
        dni_przycisk.appendChild(dni_napis)
        wynik.appendChild(dni_przycisk)

        const dni_kontener = document.createElement('div')
        dni_kontener.id = 'dni_kontener'
        dni_kontener.classList.add('dni_zawartosc')
        for (let i=0; i<8; i++) {
            dni_kontener.appendChild(dzienPrzycisk(miasto, i, czy_max))
        }
        wynik.appendChild(dni_kontener)
        // 
        
        // przycisk do ładowania większej liczby dni
        const laduj_wiecej_przycisk = document.createElement('article')
        laduj_wiecej_przycisk.classList.add('ladny_kontener') 
        laduj_wiecej_przycisk.classList.add('klikalne')  

        const laduj_wiecej_napis = document.createElement('h2')
        laduj_wiecej_napis.textContent = 'Załaduj więcej'
        laduj_wiecej_przycisk.appendChild(laduj_wiecej_napis)
        wynik.appendChild(laduj_wiecej_przycisk)

        laduj_wiecej_przycisk.addEventListener('click', () => {
            zaladujWiecejDni(miasto, czy_max)
        });
        // 
    });
    return pokaz_dni_przycisk
}

function zaladujWiecejDni(miasto, czy_max) {
    const wynik = document.getElementById('wynik')
    const dni_kontener = document.getElementById('dni_kontener')
    const ile_dni_juz_jest = dni_kontener.querySelectorAll("article").length
    // api niekomercyjnie daje dostęp do max 16 dni prognozy
    if (ile_dni_juz_jest < 16) {
        for (let i=ile_dni_juz_jest; i<ile_dni_juz_jest+9; i++) {
            if (i < 16) {
                dni_kontener.appendChild(dzienPrzycisk(miasto, i, czy_max))
            }
        }
    }
    else {
        console.log('Wymagana zbyt duża liczba dni')
    }
}


function dzienPrzycisk(miasto, numer_dnia, czy_max) {
    const dzien_przycisk = document.createElement('article')
    dzien_przycisk.classList.add('dzien_przycisk')
    dzien_przycisk.classList.add('klikalne')

    const dzien_nazwa = document.createElement('h2')
    dzien_nazwa.textContent = numer_dnia

    dzien_przycisk.appendChild(dzien_nazwa)

    dzien_przycisk.addEventListener('click', () => {
        if (czy_max) {
            pobierzPogodeDoKonkretnegoDniaMax(miasto, numer_dnia);
        }
        else {
            szukajDnia(numer_dnia);
        }
    });

    return dzien_przycisk
}

// funkcje do nagłówka
function stworzPrzyciskPowrotu(naglowek_miasta) {
    const powrot_kontener = document.createElement('h3')
    powrot_kontener.classList.add('powrot')
    powrot_kontener.classList.add('klikalne') 
    const powrot_tekst = document.createElement('p')
    powrot_tekst.innerHTML = 'Wróć na stronę główną'
    const powrot_obraz = document.createElement('img')
    powrot_obraz.src = 'misc/arrow-narrow-left.svg'
    naglowek_miasta.appendChild(powrot_kontener)
    powrot_kontener.appendChild(powrot_tekst)
    powrot_kontener.appendChild(powrot_obraz)

    powrot_kontener.addEventListener('click', () => {
        body.innerHTML = ''
        renderUI();
    });
}

function stworzPrzyciskZwyklegoInfo(naglowek_miasta) {
    const normalny_rozklad_kontener = document.createElement('h3')
    normalny_rozklad_kontener.classList.add('dodatkowy')
    normalny_rozklad_kontener.classList.add('klikalne') 
    const normalny_rozklad_tekst = document.createElement('p')
    normalny_rozklad_tekst.textContent = 'Zwykłe info'
    const normalny_rozklad_obraz = document.createElement('img')
    normalny_rozklad_obraz.src = 'misc/plus_symbol.svg'
    naglowek_miasta.appendChild(normalny_rozklad_kontener)
    normalny_rozklad_kontener.appendChild(normalny_rozklad_tekst)
    normalny_rozklad_kontener.appendChild(normalny_rozklad_obraz)

    normalny_rozklad_kontener.addEventListener('click', () => {
        szukaj();
    });
}

function stworzPrzyciskDodatkowegoInfo(miasto, naglowek_miasta) {
    const dodatkowy_kontener = document.createElement('h3')
    dodatkowy_kontener.classList.add('dodatkowy')
    dodatkowy_kontener.classList.add('klikalne') 
    const dodatkowy_tekst = document.createElement('p')
    dodatkowy_tekst.textContent = 'Dodatkowe info'
    const dodatkowy_obraz = document.createElement('img')
    dodatkowy_obraz.src = 'misc/plus_symbol.svg'
    naglowek_miasta.appendChild(dodatkowy_kontener)
    dodatkowy_kontener.appendChild(dodatkowy_tekst)
    dodatkowy_kontener.appendChild(dodatkowy_obraz)

    dodatkowy_kontener.addEventListener('click', () => {
        pobierzPogodeDoKonkretnegoDniaMax(miasto, 0)
    });
}

function stworzPrzyciskKontakt(rodzic) {
    const kontakt_kontener = document.createElement('h3')
    kontakt_kontener.classList.add('dodatkowy')
    kontakt_kontener.classList.add('klikalne')

    const kontakt_tekst = document.createElement('p')
    kontakt_tekst.textContent = 'Kontakt'

    const kontakt_obraz = document.createElement('img')
    kontakt_obraz.src = 'misc/email-1-svgrepo-com.svg'

    kontakt_kontener.appendChild(kontakt_tekst)
    kontakt_kontener.appendChild(kontakt_obraz)

    kontakt_kontener.addEventListener('click', () => {
        pokazFormularzKontaktowy();
    });

    rodzic.appendChild(kontakt_kontener)
}

function zmienNaNaglowekMiasta(miasto, czy_max) {
    const header = document.getElementById('header_id')
    header.innerHTML = ''

    const naglowek_miasta = document.createElement('div')
    naglowek_miasta.classList.add('naglowek_miasta')

    stworzPrzyciskPowrotu(naglowek_miasta)

    const naglowek_tekst = document.createElement('h1')
    naglowek_miasta.appendChild(naglowek_tekst)

    const prawe_przyciski = document.createElement('div')
    prawe_przyciski.classList.add('prawe_przyciski')

    stworzPrzyciskKontakt(prawe_przyciski)

    if (czy_max) {
        naglowek_tekst.textContent = 'Maksymalne wartości dla: ' + miasto.name
        stworzPrzyciskZwyklegoInfo(prawe_przyciski)
    }
    else {
        naglowek_tekst.textContent = 'Pogoda: ' + miasto.name
        stworzPrzyciskDodatkowegoInfo(miasto, prawe_przyciski)
    }

    naglowek_miasta.appendChild(prawe_przyciski)
    header.appendChild(naglowek_miasta)
}
function pokazFormularzKontaktowy() {
    const header = document.getElementById('header_id') // zmiana naglowka
    header.innerHTML = ''

    const naglowek_miasta = document.createElement('div')
    naglowek_miasta.classList.add('naglowek_miasta')

    stworzPrzyciskPowrotu(naglowek_miasta)

    const naglowek_tekst = document.createElement('h1')
    naglowek_tekst.textContent = 'Skontaktuj się z nami'
    naglowek_miasta.appendChild(naglowek_tekst)

    const puste_prawe = document.createElement('div')
    naglowek_miasta.appendChild(puste_prawe)

    header.appendChild(naglowek_miasta)

    const glowna_zawartosc = document.getElementById('glowna_zawartosc') // czyszczenie zawartosci glownej
    glowna_zawartosc.innerHTML = ''


    const form_kontener = document.createElement('article') // budowa kontenera z formularzem
    form_kontener.classList.add('ladny_kontener')
    form_kontener.classList.add('formularz_kontener')

    const form = document.createElement('form') // stworzenie formularza

    const kontener_imie = stworzPoleFormularza('Imię i nazwisko:', 'text', 'Podaj swoje dane', true)
    const input_imie = kontener_imie.querySelector('input')
    form.appendChild(kontener_imie)

    form.appendChild(stworzPoleFormularza('Adres e-mail:', 'email', 'twoj@email.pl', true))
    form.appendChild(stworzPoleFormularza('Twoje miasto:', 'text', 'Z jakiego miasta jesteś?', false))

    const label_rodzaj = document.createElement('label')
    label_rodzaj.textContent = 'Czego dotyczy wiadomość?'
    const select_rodzaj = document.createElement('select')

    const opcje = ['Błąd w prognozie', 'Propozycja współpracy', 'Zgłoszenie usterki', 'Inne']
    opcje.forEach(opcja_tekst => {
        const opcja = document.createElement('option')
        opcja.value = opcja_tekst
        opcja.textContent = opcja_tekst
        select_rodzaj.appendChild(opcja)
    })
    label_rodzaj.appendChild(select_rodzaj)
    form.appendChild(label_rodzaj)

    const label_wiadomosc = document.createElement('label')
    label_wiadomosc.textContent = 'Treść wiadomości:'
    const textarea = document.createElement('textarea')
    textarea.placeholder = 'Napisz do nas...'
    textarea.rows = 6
    textarea.required = true
    label_wiadomosc.appendChild(textarea)
    form.appendChild(label_wiadomosc)

    const label_zgoda = document.createElement('label')
    label_zgoda.classList.add('checkbox_etykieta')
    const checkbox_zgoda = document.createElement('input')
    checkbox_zgoda.type = 'checkbox'
    checkbox_zgoda.required = true
    const tekst_zgody = document.createElement('span')
    tekst_zgody.textContent = 'Akceptuję regulamin i wyrażam zgodę na przetwarzanie danych osobowych.'

    label_zgoda.appendChild(checkbox_zgoda)
    label_zgoda.appendChild(tekst_zgody)
    form.appendChild(label_zgoda)

    const submit_btn = document.createElement('button')
    submit_btn.type = 'submit'
    submit_btn.textContent = 'Wyślij wiadomość'
    submit_btn.classList.add('dzien_przycisk')
    submit_btn.classList.add('klikalne')
    submit_btn.classList.add('przycisk_wyslij')

    form.addEventListener('submit', (e) => {
        e.preventDefault() // pierwszo sprawdza pola, stopuje

        const wartosc_imie = input_imie.value.trim()
        const wartosc_wiadomosc = textarea.value.trim()

        if (wartosc_imie.length < 3) { // walidacja dlugosci
            alert('Imię i nazwisko jest za krótkie. Podaj co najmniej 3 znaki.') // walidacja
            return
        }
        if (wartosc_wiadomosc.length < 10) {
            alert('Twoja wiadomość jest za krótka. Prosimy o wpisanie co najmniej 10 znaków.') // walidacja
            return
        }
        alert('Wiadomość została wysłana!')

        body.innerHTML = ''
        renderUI()
    })

    form.appendChild(submit_btn)
    form_kontener.appendChild(form)
    glowna_zawartosc.appendChild(form_kontener)
}

function stworzPoleFormularza(etykieta, typ, placeholder, czy_wymagane) {
    const label = document.createElement('label')
    label.textContent = etykieta

    const input = document.createElement('input')
    input.type = typ
    input.placeholder = placeholder
    if (czy_wymagane) {
        input.required = true
    }

    label.appendChild(input)
    return label
}
