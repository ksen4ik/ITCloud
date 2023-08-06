$(document).ready(function() {
    $('.header__burger').click(function() {
        $('.header__burger').toggleClass('burger-active');
        $('.header__menu-list').toggleClass('mobile-menu-active');
        $('body').toggleClass('body-lock');
    });
});