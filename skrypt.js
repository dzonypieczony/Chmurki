const body = document.body
//INDEX.HTML
if (body.id === "glowna") {
    const div1 = document.createElement('div')
    div1.classList.add('strona')
    const header = document.createElement('header')
    const h1 = document.createElement('h1')
    h1.textContent = "Pogoda na każdy dzień"
    header.appendChild(h1)
    div1.appendChild(header)

    const div2 = document.createElement('div')
    div2.classList.add('glowna_zawartosc')
    const div3 = document.createElement('div')
    div3.id = 'wyszukiwanie_miasta'
    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'wyszukiwanie_pole'
    div3.appendChild(input)
    const button = document.createElement('button')
    button.type = 'button'
    button.id = 'wyszukiwanie_przycisk'
    button.textContent = 'Wybierz'
    div3.appendChild(button)
    div2.appendChild(div3)

    const div4 = document.createElement('div')
    div4.classList.add('miejscowosci')
    const article1 = document.createElement('article')
    article1.classList.add('miasto')
    const a1 = document.createElement('a')
    a1.href = 'warszawa.html'
    a1.textContent = 'Warszawa'
    article1.appendChild(a1)
    div4.appendChild(article1)

    const article2 = document.createElement('article')
    article2.classList.add('miasto')
    const a2 = document.createElement('a')
    a2.href = 'bialystok.html'
    a2.textContent = 'Białystok'
    article2.appendChild(a2)
    div4.appendChild(article2)

    const article3 = document.createElement('article')
    article3.classList.add('miasto')
    const a3 = document.createElement('a')
    a3.href = 'grajewo.html'
    a3.textContent = 'Grajewo'
    article3.appendChild(a3)
    div4.appendChild(article3)

    const article4 = document.createElement('article')
    article4.classList.add('miasto')
    const a4 = document.createElement('a')
    a4.href = 'gdansk.html'
    a4.textContent = 'Gdańsk'
    article4.appendChild(a4)
    div4.appendChild(article4)
    const article5 = document.createElement('article')
    article5.classList.add('miasto')
    const a5 = document.createElement('a')
    a5.href = 'gdynia.html'
    a5.textContent = 'Gdynia'
    article5.appendChild(a5)
    div4.appendChild(article5)
    const article6 = document.createElement('article')
    article6.classList.add('miasto')
    const a6 = document.createElement('a')
    a6.href = 'sopot.html'
    a6.textContent = 'Sopot'
    article6.appendChild(a6)
    div4.appendChild(article6)
    const article7 = document.createElement('article')
    article7.classList.add('miasto')
    const a7 = document.createElement('a')
    a7.href = 'siemieniakowszczyzna.html'
    a7.textContent = 'Siemieniakowszczyznaaaaaaaaaaaaaaa'
    article7.appendChild(a7)
    div4.appendChild(article7)
    const article8 = document.createElement('article')
    article8.classList.add('miasto')
    const a8 = document.createElement('a')
    a8.href = 'wolka sokolowska kolo wolki niedzwiedzkiej.html'
    a8.textContent = 'Wólka Sokołowska kolo Wólki Niedżwiedzkiej'
    article8.appendChild(a8)
    div4.appendChild(article8)

    const footer = document.createElement('footer')
    footer.textContent = 'Przekaż 1,5% podatku na fundację '
    const b = document.createElement('b')
    b.textContent = 'Pogoda dla każdego'
    footer.appendChild(b)

    div2.appendChild(div4)
    div1.appendChild(div2)
    div1.appendChild(footer)
    body.appendChild(div1)
}
//-------------------------------------------------------------------------------------------------------------------

//BIAŁYSTOK
if (body.id === "bialystok") {
    const div1 = document.createElement('div')
    div1.classList.add('strona')
    const header = document.createElement('header')
    const div2 = document.createElement('div')
    div2.classList.add('naglowek_miasta')
    const h3 = document.createElement('h3')
    h3.classList.add('powrot')
    const a = document.createElement('a')
    a.href = 'index.html'
    const p1 = document.createElement('p')
    p1.innerHTML = 'Wróć na stronę główną'
    const img1 = document.createElement('img')
    img1.src = 'misc/arrow-narrow-left.svg'
    a.appendChild(p1)
    a.appendChild(img1)
    h3.appendChild(a)
    div2.appendChild(h3)
    const h1 = document.createElement('h1')
    h1.textContent = 'Pogoda: Białystok'
    div2.appendChild(h1)
    header.appendChild(div2)
    div1.appendChild(header)

    const div3 = document.createElement('div')
    div3.classList.add('glowna_zawartosc')
    const div4 = document.createElement('div')
    div4.classList.add('miasto_zawartosc')

    const article1 = document.createElement('article')
    article1.classList.add('element_pogody')
    const h2 = document.createElement('h2')
    h2.textContent = 'Temperatura:'
    article1.appendChild(h2)
    const img2 = document.createElement('img')
    img2.src = 'temperatura/thermometer-colder.svg'
    article1.appendChild(img2)
    const p2 = document.createElement('p')
    p2.textContent = '-8°C'
    article1.appendChild(p2)
    div4.appendChild(article1)

    const article2 = document.createElement('article')
    article2.classList.add('element_pogody')
    const h4 = document.createElement('h2')
    h4.textContent = 'Wiatr:'
    article2.appendChild(h4)
    const img3 = document.createElement('img')
    img3.src = 'wiatr/wind.svg'
    article2.appendChild(img3)
    const p3 = document.createElement('p')
    p3.textContent = '32km/h'
    article2.appendChild(p3)
    div4.appendChild(article2)

    const article3 = document.createElement('article')
    article3.classList.add('element_pogody')
    const h5 = document.createElement('h2')
    h5.textContent = 'Zachmurzenie i opady:'
    article3.appendChild(h5)
    const img4 = document.createElement('img')
    img4.src = 'zachmurzenie_opady/rain.svg'
    article3.appendChild(img4)
    const p4 = document.createElement('p')
    p4.textContent = 'Deszcz'
    article3.appendChild(p4)
    div4.appendChild(article3)

    const article4 = document.createElement('article')
    article4.classList.add('element_pogody')
    const h6 = document.createElement('h2')
    h6.textContent = 'Ciśnienie:'
    article4.appendChild(h6)
    const img5 = document.createElement('img')
    img5.src = 'cisnienie/pressure-high.svg'
    article4.appendChild(img5)
    const p5 = document.createElement('p')
    p5.textContent = '1035hPa'
    article4.appendChild(p5)
    div4.appendChild(article4)

    div3.appendChild(div4)
    div1.appendChild(div3)

    const footer = document.createElement('footer')
    footer.textContent = 'Przekaż 1,5% podatku na fundację '
    const b = document.createElement('b')
    b.textContent = 'Pogoda dla każdego'
    footer.appendChild(b)
    div1.appendChild(footer)
    body.appendChild(div1)
}

//GDAŃSK
if (body.id === "gdansk") {
    const div1 = document.createElement('div')
    div1.classList.add('strona')
    const header = document.createElement('header')
    const div2 = document.createElement('div')
    div2.classList.add('naglowek_miasta')
    const h3 = document.createElement('h3')
    h3.classList.add('powrot')
    const a = document.createElement('a')
    a.href = 'index.html'
    const p1 = document.createElement('p')
    p1.innerHTML = 'Wróć na stronę główną'
    const img1 = document.createElement('img')
    img1.src = 'misc/arrow-narrow-left.svg'
    a.appendChild(p1)
    a.appendChild(img1)
    h3.appendChild(a)
    div2.appendChild(h3)
    const h1 = document.createElement('h1')
    h1.textContent = 'Pogoda: Gdańsk'
    div2.appendChild(h1)
    header.appendChild(div2)
    div1.appendChild(header)

    const div3 = document.createElement('div')
    div3.classList.add('glowna_zawartosc')
    const div4 = document.createElement('div')
    div4.classList.add('miasto_zawartosc')

    const article1 = document.createElement('article')
    article1.classList.add('element_pogody')
    const h2 = document.createElement('h2')
    h2.textContent = 'Temperatura:'
    article1.appendChild(h2)
    const img2 = document.createElement('img')
    img2.src = 'temperatura/thermometer.svg'
    article1.appendChild(img2)
    const p2 = document.createElement('p')
    p2.textContent = '7°C'
    article1.appendChild(p2)
    div4.appendChild(article1)

    const article2 = document.createElement('article')
    article2.classList.add('element_pogody')
    const h4 = document.createElement('h2')
    h4.textContent = 'Wiatr:'
    article2.appendChild(h4)
    const img3 = document.createElement('img')
    img3.src = 'wiatr/tornado.svg'
    article2.appendChild(img3)
    const p3 = document.createElement('p')
    p3.textContent = '100km/h'
    article2.appendChild(p3)
    div4.appendChild(article2)

    const article3 = document.createElement('article')
    article3.classList.add('element_pogody')
    const h5 = document.createElement('h2')
    h5.textContent = 'Zachmurzenie i opady:'
    article3.appendChild(h5)
    const img4 = document.createElement('img')
    img4.src = 'zachmurzenie_opady/thunderstorms-snow.svg'
    article3.appendChild(img4)
    const p4 = document.createElement('p')
    p4.textContent = 'Burza z śniegiem'
    article3.appendChild(p4)
    div4.appendChild(article3)

    const article4 = document.createElement('article')
    article4.classList.add('element_pogody')
    const h6 = document.createElement('h2')
    h6.textContent = 'Ciśnienie:'
    article4.appendChild(h6)
    const img5 = document.createElement('img')
    img5.src = 'cisnienie/pressure-high.svg'
    article4.appendChild(img5)
    const p5 = document.createElement('p')
    p5.textContent = '1042hPa'
    article4.appendChild(p5)
    div4.appendChild(article4)

    div3.appendChild(div4)
    div1.appendChild(div3)

    const footer = document.createElement('footer')
    footer.textContent = 'Przekaż 1,5% podatku na fundację '
    const b = document.createElement('b')
    b.textContent = 'Pogoda dla każdego'
    footer.appendChild(b)
    div1.appendChild(footer)
    body.appendChild(div1)
}

//GDYNIA
if (body.id === "gdynia") {
    const div1 = document.createElement('div')
    div1.classList.add('strona')
    const header = document.createElement('header')
    const div2 = document.createElement('div')
    div2.classList.add('naglowek_miasta')
    const h3 = document.createElement('h3')
    h3.classList.add('powrot')
    const a = document.createElement('a')
    a.href = 'index.html'
    const p1 = document.createElement('p')
    p1.innerHTML = 'Wróć na stronę główną'
    const img1 = document.createElement('img')
    img1.src = 'misc/arrow-narrow-left.svg'
    a.appendChild(p1)
    a.appendChild(img1)
    h3.appendChild(a)
    div2.appendChild(h3)
    const h1 = document.createElement('h1')
    h1.textContent = 'Pogoda: Gdynia'
    div2.appendChild(h1)
    header.appendChild(div2)
    div1.appendChild(header)

    const div3 = document.createElement('div')
    div3.classList.add('glowna_zawartosc')
    const div4 = document.createElement('div')
    div4.classList.add('miasto_zawartosc')

    const article1 = document.createElement('article')
    article1.classList.add('element_pogody')
    const h2 = document.createElement('h2')
    h2.textContent = 'Temperatura:'
    article1.appendChild(h2)
    const img2 = document.createElement('img')
    img2.src = 'temperatura/thermometer-colder.svg'
    article1.appendChild(img2)
    const p2 = document.createElement('p')
    p2.textContent = '0°C'
    article1.appendChild(p2)
    div4.appendChild(article1)

    const article2 = document.createElement('article')
    article2.classList.add('element_pogody')
    const h4 = document.createElement('h2')
    h4.textContent = 'Wiatr:'
    article2.appendChild(h4)
    const img3 = document.createElement('img')
    img3.src = 'wiatr/wind-alert.svg'
    article2.appendChild(img3)
    const p3 = document.createElement('p')
    p3.textContent = '49km/h'
    article2.appendChild(p3)
    div4.appendChild(article2)

    const article3 = document.createElement('article')
    article3.classList.add('element_pogody')
    const h5 = document.createElement('h2')
    h5.textContent = 'Zachmurzenie i opady:'
    article3.appendChild(h5)
    const img4 = document.createElement('img')
    img4.src = 'zachmurzenie_opady/thunderstorms-hail.svg'
    article3.appendChild(img4)
    const p4 = document.createElement('p')
    p4.textContent = 'Burza z gradem'
    article3.appendChild(p4)
    div4.appendChild(article3)

    const article4 = document.createElement('article')
    article4.classList.add('element_pogody')
    const h6 = document.createElement('h2')
    h6.textContent = 'Ciśnienie:'
    article4.appendChild(h6)
    const img5 = document.createElement('img')
    img5.src = 'cisnienie/pressure-low.svg'
    article4.appendChild(img5)
    const p5 = document.createElement('p')
    p5.textContent = '992hPa'
    article4.appendChild(p5)
    div4.appendChild(article4)

    div3.appendChild(div4)
    div1.appendChild(div3)

    const footer = document.createElement('footer')
    footer.textContent = 'Przekaż 1,5% podatku na fundację '
    const b = document.createElement('b')
    b.textContent = 'Pogoda dla każdego'
    footer.appendChild(b)
    div1.appendChild(footer)
    body.appendChild(div1)
}

//GRAJEWO
if (body.id === "grajewo") {
    const div1 = document.createElement('div')
    div1.classList.add('strona')
    const header = document.createElement('header')
    const div2 = document.createElement('div')
    div2.classList.add('naglowek_miasta')
    const h3 = document.createElement('h3')
    h3.classList.add('powrot')
    const a = document.createElement('a')
    a.href = 'index.html'
    const p1 = document.createElement('p')
    p1.innerHTML = 'Wróć na stronę główną'
    const img1 = document.createElement('img')
    img1.src = 'misc/arrow-narrow-left.svg'
    a.appendChild(p1)
    a.appendChild(img1)
    h3.appendChild(a)
    div2.appendChild(h3)
    const h1 = document.createElement('h1')
    h1.textContent = 'Pogoda: Grajewo'
    div2.appendChild(h1)
    header.appendChild(div2)
    div1.appendChild(header)

    const div3 = document.createElement('div')
    div3.classList.add('glowna_zawartosc')
    const div4 = document.createElement('div')
    div4.classList.add('miasto_zawartosc')

    const article1 = document.createElement('article')
    article1.classList.add('element_pogody')
    const h2 = document.createElement('h2')
    h2.textContent = 'Temperatura:'
    article1.appendChild(h2)
    const img2 = document.createElement('img')
    img2.src = 'temperatura/thermometer.svg'
    article1.appendChild(img2)
    const p2 = document.createElement('p')
    p2.textContent = '15°C'
    article1.appendChild(p2)
    div4.appendChild(article1)

    const article2 = document.createElement('article')
    article2.classList.add('element_pogody')
    const h4 = document.createElement('h2')
    h4.textContent = 'Wiatr:'
    article2.appendChild(h4)
    const img3 = document.createElement('img')
    img3.src = 'wiatr/wind-alert.svg'
    article2.appendChild(img3)
    const p3 = document.createElement('p')
    p3.textContent = '56km/h'
    article2.appendChild(p3)
    div4.appendChild(article2)

    const article3 = document.createElement('article')
    article3.classList.add('element_pogody')
    const h5 = document.createElement('h2')
    h5.textContent = 'Zachmurzenie i opady:'
    article3.appendChild(h5)
    const img4 = document.createElement('img')
    img4.src = 'zachmurzenie_opady/cloudy.svg'
    article3.appendChild(img4)
    const p4 = document.createElement('p')
    p4.textContent = 'Pochmurnie'
    article3.appendChild(p4)
    div4.appendChild(article3)

    const article4 = document.createElement('article')
    article4.classList.add('element_pogody')
    const h6 = document.createElement('h2')
    h6.textContent = 'Ciśnienie:'
    article4.appendChild(h6)
    const img5 = document.createElement('img')
    img5.src = 'cisnienie/pressure-low.svg'
    article4.appendChild(img5)
    const p5 = document.createElement('p')
    p5.textContent = '1009hPa'
    article4.appendChild(p5)
    div4.appendChild(article4)

    div3.appendChild(div4)
    div1.appendChild(div3)

    const footer = document.createElement('footer')
    footer.textContent = 'Przekaż 1,5% podatku na fundację '
    const b = document.createElement('b')
    b.textContent = 'Pogoda dla każdego'
    footer.appendChild(b)
    div1.appendChild(footer)
    body.appendChild(div1)
}

//SIEMIENIAKOWSZCZYZNA
if (body.id === "siemieniakowszczyzna") {
    const div1 = document.createElement('div')
    div1.classList.add('strona')
    const header = document.createElement('header')
    const div2 = document.createElement('div')
    div2.classList.add('naglowek_miasta')
    const h3 = document.createElement('h3')
    h3.classList.add('powrot')
    const a = document.createElement('a')
    a.href = 'index.html'
    const p1 = document.createElement('p')
    p1.innerHTML = 'Wróć na stronę główną'
    const img1 = document.createElement('img')
    img1.src = 'misc/arrow-narrow-left.svg'
    a.appendChild(p1)
    a.appendChild(img1)
    h3.appendChild(a)
    div2.appendChild(h3)
    const h1 = document.createElement('h1')
    h1.textContent = 'Pogoda: Siemieniakowszczyzna'
    div2.appendChild(h1)
    header.appendChild(div2)
    div1.appendChild(header)

    const div3 = document.createElement('div')
    div3.classList.add('glowna_zawartosc')
    const div4 = document.createElement('div')
    div4.classList.add('miasto_zawartosc')

    const article1 = document.createElement('article')
    article1.classList.add('element_pogody')
    const h2 = document.createElement('h2')
    h2.textContent = 'Temperatura:'
    article1.appendChild(h2)
    const img2 = document.createElement('img')
    img2.src = 'temperatura/thermometer-warmer.svg'
    article1.appendChild(img2)
    const p2 = document.createElement('p')
    p2.textContent = '25°C'
    article1.appendChild(p2)
    div4.appendChild(article1)

    const article2 = document.createElement('article')
    article2.classList.add('element_pogody')
    const h4 = document.createElement('h2')
    h4.textContent = 'Wiatr:'
    article2.appendChild(h4)
    const img3 = document.createElement('img')
    img3.src = 'wiatr/wind.svg'
    article2.appendChild(img3)
    const p3 = document.createElement('p')
    p3.textContent = '15km/h'
    article2.appendChild(p3)
    div4.appendChild(article2)

    const article3 = document.createElement('article')
    article3.classList.add('element_pogody')
    const h5 = document.createElement('h2')
    h5.textContent = 'Zachmurzenie i opady:'
    article3.appendChild(h5)
    const img4 = document.createElement('img')
    img4.src = 'zachmurzenie_opady/clear-night.svg'
    article3.appendChild(img4)
    const p4 = document.createElement('p')
    p4.textContent = 'Pogodnie'
    article3.appendChild(p4)
    div4.appendChild(article3)

    const article4 = document.createElement('article')
    article4.classList.add('element_pogody')
    const h6 = document.createElement('h2')
    h6.textContent = 'Ciśnienie:'
    article4.appendChild(h6)
    const img5 = document.createElement('img')
    img5.src = 'cisnienie/pressure-high.svg'
    article4.appendChild(img5)
    const p5 = document.createElement('p')
    p5.textContent = '1020hPa'
    article4.appendChild(p5)
    div4.appendChild(article4)

    div3.appendChild(div4)
    div1.appendChild(div3)

    const footer = document.createElement('footer')
    footer.textContent = 'Przekaż 1,5% podatku na fundację '
    const b = document.createElement('b')
    b.textContent = 'Pogoda dla każdego'
    footer.appendChild(b)
    div1.appendChild(footer)
    body.appendChild(div1)
}

//SOPOT
if (body.id === "sopot") {
    const div1 = document.createElement('div')
    div1.classList.add('strona')
    const header = document.createElement('header')
    const div2 = document.createElement('div')
    div2.classList.add('naglowek_miasta')
    const h3 = document.createElement('h3')
    h3.classList.add('powrot')
    const a = document.createElement('a')
    a.href = 'index.html'
    const p1 = document.createElement('p')
    p1.innerHTML = 'Wróć na stronę główną'
    const img1 = document.createElement('img')
    img1.src = 'misc/arrow-narrow-left.svg'
    a.appendChild(p1)
    a.appendChild(img1)
    h3.appendChild(a)
    div2.appendChild(h3)
    const h1 = document.createElement('h1')
    h1.textContent = 'Pogoda: Sopot'
    div2.appendChild(h1)
    header.appendChild(div2)
    div1.appendChild(header)

    const div3 = document.createElement('div')
    div3.classList.add('glowna_zawartosc')
    const div4 = document.createElement('div')
    div4.classList.add('miasto_zawartosc')

    const article1 = document.createElement('article')
    article1.classList.add('element_pogody')
    const h2 = document.createElement('h2')
    h2.textContent = 'Temperatura:'
    article1.appendChild(h2)
    const img2 = document.createElement('img')
    img2.src = 'temperatura/thermometer.svg'
    article1.appendChild(img2)
    const p2 = document.createElement('p')
    p2.textContent = '8°C'
    article1.appendChild(p2)
    div4.appendChild(article1)

    const article2 = document.createElement('article')
    article2.classList.add('element_pogody')
    const h4 = document.createElement('h2')
    h4.textContent = 'Wiatr:'
    article2.appendChild(h4)
    const img3 = document.createElement('img')
    img3.src = 'wiatr/wind-alert.svg'
    article2.appendChild(img3)
    const p3 = document.createElement('p')
    p3.textContent = '54km/h'
    article2.appendChild(p3)
    div4.appendChild(article2)

    const article3 = document.createElement('article')
    article3.classList.add('element_pogody')
    const h5 = document.createElement('h2')
    h5.textContent = 'Zachmurzenie i opady:'
    article3.appendChild(h5)
    const img4 = document.createElement('img')
    img4.src = 'zachmurzenie_opady/thunderstorms-rain.svg'
    article3.appendChild(img4)
    const p4 = document.createElement('p')
    p4.textContent = 'Burza z deszczem'
    article3.appendChild(p4)
    div4.appendChild(article3)

    const article4 = document.createElement('article')
    article4.classList.add('element_pogody')
    const h6 = document.createElement('h2')
    h6.textContent = 'Ciśnienie:'
    article4.appendChild(h6)
    const img5 = document.createElement('img')
    img5.src = 'cisnienie/pressure-high.svg'
    article4.appendChild(img5)
    const p5 = document.createElement('p')
    p5.textContent = '1041hPa'
    article4.appendChild(p5)
    div4.appendChild(article4)

    div3.appendChild(div4)
    div1.appendChild(div3)

    const footer = document.createElement('footer')
    footer.textContent = 'Przekaż 1,5% podatku na fundację '
    const b = document.createElement('b')
    b.textContent = 'Pogoda dla każdego'
    footer.appendChild(b)
    div1.appendChild(footer)
    body.appendChild(div1)
}

//warszawa
if (body.id === "warszawa") {
    const div1 = document.createElement('div')
    div1.classList.add('strona')
    const header = document.createElement('header')
    const div2 = document.createElement('div')
    div2.classList.add('naglowek_miasta')
    const h3 = document.createElement('h3')
    h3.classList.add('powrot')
    const a = document.createElement('a')
    a.href = 'index.html'
    const p1 = document.createElement('p')
    p1.innerHTML = 'Wróć na stronę główną'
    const img1 = document.createElement('img')
    img1.src = 'misc/arrow-narrow-left.svg'
    a.appendChild(p1)
    a.appendChild(img1)
    h3.appendChild(a)
    div2.appendChild(h3)
    const h1 = document.createElement('h1')
    h1.textContent = 'Pogoda: Warszawa'
    div2.appendChild(h1)
    header.appendChild(div2)
    div1.appendChild(header)

    const div3 = document.createElement('div')
    div3.classList.add('glowna_zawartosc')
    const div4 = document.createElement('div')
    div4.classList.add('miasto_zawartosc')

    const article1 = document.createElement('article')
    article1.classList.add('element_pogody')
    const h2 = document.createElement('h2')
    h2.textContent = 'Temperatura:'
    article1.appendChild(h2)
    const img2 = document.createElement('img')
    img2.src = 'temperatura/thermometer-warmer.svg'
    article1.appendChild(img2)
    const p2 = document.createElement('p')
    p2.textContent = '30°C'
    article1.appendChild(p2)
    div4.appendChild(article1)

    const article2 = document.createElement('article')
    article2.classList.add('element_pogody')
    const h4 = document.createElement('h2')
    h4.textContent = 'Wiatr:'
    article2.appendChild(h4)
    const img3 = document.createElement('img')
    img3.src = 'wiatr/wind.svg'
    article2.appendChild(img3)
    const p3 = document.createElement('p')
    p3.textContent = '20km/h'
    article2.appendChild(p3)
    div4.appendChild(article2)

    const article3 = document.createElement('article')
    article3.classList.add('element_pogody')
    const h5 = document.createElement('h2')
    h5.textContent = 'Zachmurzenie i opady:'
    article3.appendChild(h5)
    const img4 = document.createElement('img')
    img4.src = 'zachmurzenie_opady/clear-day.svg'
    article3.appendChild(img4)
    const p4 = document.createElement('p')
    p4.textContent = 'Pogodnie'
    article3.appendChild(p4)
    div4.appendChild(article3)

    const article4 = document.createElement('article')
    article4.classList.add('element_pogody')
    const h6 = document.createElement('h2')
    h6.textContent = 'Ciśnienie:'
    article4.appendChild(h6)
    const img5 = document.createElement('img')
    img5.src = 'cisnienie/pressure-low.svg'
    article4.appendChild(img5)
    const p5 = document.createElement('p')
    p5.textContent = '1012hPa'
    article4.appendChild(p5)
    div4.appendChild(article4)

    div3.appendChild(div4)
    div1.appendChild(div3)

    const footer = document.createElement('footer')
    footer.textContent = 'Przekaż 1,5% podatku na fundację '
    const b = document.createElement('b')
    b.textContent = 'Pogoda dla każdego'
    footer.appendChild(b)
    div1.appendChild(footer)
    body.appendChild(div1)
}

//WÓLKA SOKOŁOWSKA
if (body.id === "wolka") {
    const div1 = document.createElement('div')
    div1.classList.add('strona')
    const header = document.createElement('header')
    const div2 = document.createElement('div')
    div2.classList.add('naglowek_miasta')
    const h3 = document.createElement('h3')
    h3.classList.add('powrot')
    const a = document.createElement('a')
    a.href = 'index.html'
    const p1 = document.createElement('p')
    p1.innerHTML = 'Wróć na stronę główną'
    const img1 = document.createElement('img')
    img1.src = 'misc/arrow-narrow-left.svg'
    a.appendChild(p1)
    a.appendChild(img1)
    h3.appendChild(a)
    div2.appendChild(h3)
    const h1 = document.createElement('h1')
    h1.textContent = 'Pogoda: Wólka Sokołowska koło Wólki Niedźwiedzkiej'
    div2.appendChild(h1)
    header.appendChild(div2)
    div1.appendChild(header)

    const div3 = document.createElement('div')
    div3.classList.add('glowna_zawartosc')
    const div4 = document.createElement('div')
    div4.classList.add('miasto_zawartosc')

    const article1 = document.createElement('article')
    article1.classList.add('element_pogody')
    const h2 = document.createElement('h2')
    h2.textContent = 'Temperatura:'
    article1.appendChild(h2)
    const img2 = document.createElement('img')
    img2.src = 'temperatura/thermometer-colder.svg'
    article1.appendChild(img2)
    const p2 = document.createElement('p')
    p2.textContent = '-12°C'
    article1.appendChild(p2)
    div4.appendChild(article1)

    const article2 = document.createElement('article')
    article2.classList.add('element_pogody')
    const h4 = document.createElement('h2')
    h4.textContent = 'Wiatr:'
    article2.appendChild(h4)
    const img3 = document.createElement('img')
    img3.src = 'wiatr/tornado.svg'
    article2.appendChild(img3)
    const p3 = document.createElement('p')
    p3.textContent = '110km/h'
    article2.appendChild(p3)
    div4.appendChild(article2)

    const article3 = document.createElement('article')
    article3.classList.add('element_pogody')
    const h5 = document.createElement('h2')
    h5.textContent = 'Zachmurzenie i opady:'
    article3.appendChild(h5)
    const img4 = document.createElement('img')
    img4.src = 'zachmurzenie_opady/snow.svg'
    article3.appendChild(img4)
    const p4 = document.createElement('p')
    p4.textContent = 'Śnieg'
    article3.appendChild(p4)
    div4.appendChild(article3)

    const article4 = document.createElement('article')
    article4.classList.add('element_pogody')
    const h6 = document.createElement('h2')
    h6.textContent = 'Ciśnienie:'
    article4.appendChild(h6)
    const img5 = document.createElement('img')
    img5.src = 'cisnienie/pressure-high.svg'
    article4.appendChild(img5)
    const p5 = document.createElement('p')
    p5.textContent = '1048hPa'
    article4.appendChild(p5)
    div4.appendChild(article4)

    div3.appendChild(div4)
    div1.appendChild(div3)

    const footer = document.createElement('footer')
    footer.textContent = 'Przekaż 1,5% podatku na fundację '
    const b = document.createElement('b')
    b.textContent = 'Pogoda dla każdego'
    footer.appendChild(b)
    div1.appendChild(footer)
    body.appendChild(div1)
}