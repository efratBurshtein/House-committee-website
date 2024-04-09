const dom = {
    link_menu: document.getElementById('link_menu'),
    page_before: document.getElementById('page_before'),
    neged: document.getElementsByClassName('neged')[0],
    bead: document.getElementsByClassName('bead')[0],
    curent_votos: document.getElementById('curent_votos'),
    answer1: document.getElementById('answer1'),
    answer2: document.getElementById('answer2'),
    answer3: document.getElementById('answer3'),
    curent_servery: document.getElementById('curent_servery'),
    winer_ans: document.getElementById('winer_ans')
}

//בעת לחיצה על תמונות הלינק חזרה אחורה\העברה ל-menu
dom.link_menu.onclick = () => {
    location.href = "./menu.html";
}
dom.page_before.onclick = () => {
    location.href = './menu.html'
}

//שליפת נתונים מה-localStorage כדי להציג את הנתונים על הסקרים ווהצבעות
dom.curent_servery.innerHTML = localStorage['curent_servery'];
const password_build = localStorage['currentbuilding'];
const build = JSON.parse(localStorage[password_build]);
const good_build = build || [];
const servery = build.arr_answere || [];

//ציור מדד כמות ההצבעות לכל שאלה
dom.answer1.style.height = servery[0] * 80 + 40 + 'px';
dom.answer2.style.height = servery[1] * 80 + 40 + 'px';
dom.answer3.style.height = servery[2] * 80 + 40 + 'px';

const maximom = Math.max(parseInt(dom.answer1.style.height), parseInt(dom.answer2.style.height), parseInt(dom.answer3.style.height));

//שליפת נתונים מה-localStorage כדי להציג את הנתונים על הסקרים ווהצבעות
const vot = localStorage['curent_votos'];
const good_votos = localStorage.getItem(vot);
const votos = JSON.parse(good_votos);
const v_for = votos.v_for
const v_aginst = votos.v_aginst;
dom.curent_votos.innerHTML = votos.vote;

// //הצגה של מספר ההצבעות במהירות
if (v_aginst === 0) {
    dom.neged.innerHTML = '0';
} else {
    Array.from({ length: v_aginst + 1 }, (_, i) => i).forEach((i) => {
        setTimeout(function () {
            if (!isNaN(i)) {
                dom.neged.innerHTML = i;
            }
        }, i * 200);
    });
}

//כדי להציג את מספר ההצבעות במהירות:
if (v_for === null) {
    dom.bead.innerHTML = '0';
} else {
    Array.from({ length: v_for + 1 }, (_, i) => i).forEach((i) => {
        setTimeout(function () {
            if (!isNaN(i)) {
                dom.bead.innerHTML = i;
            }
        }, i * 200);
    });
}

//בנית אוביקט מסוג-building
const building = (pwd_building, arr_bord, arr_user, arr_votos, arr_answere, arr_forms) => {
    return {
        code_building: pwd_building,
        arr_bord: arr_bord,
        arr_user: arr_user,
        arr_votos: arr_votos,
        arr_answere: arr_answere,
        arr_forms: arr_forms
    }
};