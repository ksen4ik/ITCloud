// Подстраивание отступов у main и nav под высоту шапки

window.addEventListener('load', (e) => {
    const header = document.getElementById('header');
    const main = document.getElementById('main');
    const menuList = document.querySelector('.header__menu-list');

    function resizeHeaderHeight() {
        var headerHeight = header.offsetHeight;
        main.style.marginTop = headerHeight + 'px';
        menuList.style.top = headerHeight + 'px';
        menuList.style.paddingTop = (100 - headerHeight) + 'px';
    }
    window.addEventListener('resize', resizeHeaderHeight);
    resizeHeaderHeight();
});



// Появление текста в секции home

const textElement = document.querySelector('.home__welcome-text');
const words = textElement.innerText.split(' ');
textElement.innerText = '';

words.forEach((word, index) => {
    const span = document.createElement('span');
    span.innerHTML = word + ' ';
    span.style.opacity = 0;
    span.style.transition = 'opacity 0.5s ease ' + (index * 0.2) + 's';
    span.style.display = 'inline-block';
    textElement.appendChild(span);

    setTimeout(() => {
        span.style.opacity = 1;
    }, (index * 200));
});



// Открытие и закрытие всех попапов

const popupLinks = document.querySelectorAll('.app-link-popup-open');
const popupCloseIcons = document.querySelectorAll('.application__close');
const body = document.querySelector('body');

let unlock = true;

const timeout = 300;

if(popupLinks.length > 0) {
    for(let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function(e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}
if(popupCloseIcons.length > 0) {
    for(let index = 0; index < popupCloseIcons.length; index++) {
        const popupCloseIcon = popupCloseIcons[index];
        popupCloseIcon.addEventListener("click", function(e) {
            popupClose(popupCloseIcon.closest('.application__overlay'))
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if(currentPopup && unlock) {
        const popupActive = document.querySelector('.application__overlay.popup-open');
        if(popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('popup-open');
        currentPopup.addEventListener("click", function(e) {
            if(!e.target.closest('.application__popup')) {
                popupClose(e.target.closest('.application__overlay'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if(unlock) {
        popupActive.classList.remove('popup-open');
        if(doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    body.classList.add('body-lock');
    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function() {
        body.classList.remove('body-lock');
    }, timeout);
    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}



// Подстраивание размера текста в секции home под ширину экрана (при ширине менее 1440px)

window.addEventListener('resize', function() {
    var windowWidth = window.innerWidth;
    var fontSize;
    if (windowWidth >= 1440) {
        fontSize = 120;
    } else {
        var containerWidth = document.querySelector('.home__welcome-text').offsetWidth;
        fontSize = containerWidth / 10;
    }
    var welcomeTextSpans = document.querySelectorAll('p.home__welcome-text span');
    welcomeTextSpans.forEach(welcomeTextSpan => {
        welcomeTextSpan.style.fontSize = fontSize + 'px';
    })
});

var initialFontSize = window.innerWidth >= 1440 ? 120 : document.querySelector('.home__welcome-text').offsetWidth / 10;
var welcomeTextSpans = document.querySelectorAll('p.home__welcome-text span');
welcomeTextSpans.forEach(welcomeTextSpan => {
    welcomeTextSpan.style.fontSize = initialFontSize + 'px';
})