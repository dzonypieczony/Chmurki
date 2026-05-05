//INDEX.HTML
const body = document.body
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
//------------------------------------------------------------------------------------------------------------------