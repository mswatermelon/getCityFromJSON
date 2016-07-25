/**
 * Created by Вероника on 25.07.2016.
 */
"use strict";

// Создаем "обещание"
let Prom = new Promise(function (resolve, reject) {
    // Ajax запрос и url, куда будет отправлен запрос
    let request = new XMLHttpRequest(),
        url = "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json";

    // Инициируем звпрос с методом GET
    request.open("GET", url);
    // Определяем тип возвращаемых данных
    request.responseType = "json";

    // Если запрос успешен - меняем состояние "обещания" на "выполнено"
    request.addEventListener('load', () => resolve(request.response));
    // Если произошла ошибка - меняем состояние "обещания" на "отклонено"
    request.addEventListener('error', () => reject());

    // Отправляем запрос
    request.send();
});

// Вызываем обработчик для "обещания"
Prom.then(function (response) {
    // Переменная для сохранения названий городов для дальнейшей сортировки
    let names = [];

    for({name} of response){
        names.push(name);
    }
    names.sort();

    // Выводим названия городов на страницу
    for (let i = 0; i < names.length; i++) {
        let p = document.createElement('p');
        p.innerText = names[i];
        document.body.appendChild(p);
    }
});
