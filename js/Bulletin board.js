const dom = {
    note1: document.getElementById('note1'),
    note2: document.getElementById('note2'),
    note3: document.getElementById('note3'),
    boardy: document.getElementById('boardy'),
    link_menu: document.getElementById('link_menu'),
    page_before: document.getElementById('page_before'),
    comment: document.getElementById('comment'),
    comment2: document.getElementById('comment2'),
    comment3: document.getElementById('comment3'),
    but: document.getElementById('but'),

}
//בעת לחיצה על תמונות הלינק חזרה אחורה\העברה ל-menu
dom.link_menu.onclick = () => {
    location.href = "./menu.html";
}
dom.page_before.onclick = () => {
    location.href = './menu.html'
}

//שליפה מה-localstorage את הבנין הנוכחי
const build = localStorage['currentbuilding'];
const nbuild = JSON.parse(localStorage.getItem(build));
let arr_board1 = nbuild.arr_bord || [];
let img;
let flag_chose_bacground = false;
//בעת לחיצה על סוג פתק ,הפתק יועצב
dom.note1.onclick = () => {
    img = 'ad1';
    dom.note1.classList.add('shadow');
    dom.note2.classList.remove('shadow');
    flag_chose_bacground = true;
}

dom.note2.onclick = () => {
    img = 'ad2';
    dom.note2.classList.add('shadow');
    dom.note1.classList.remove('shadow');
    flag_chose_bacground = true;
}

//בעת לחיצה על כפתור הוספה:יצירת אוביקט מסוג-note
// והוספת המודעה למערך וקליטת המערך באוביקט
dom.but.onclick = () => {
    if (flag_chose_bacground === false) {
        alert('אנא בחר סג פתק')
    } else {
        if (arr_board1.length === 6) {
            arr_board1 = [];
        }
        const n_note = note(dom.comment.value, dom.comment2.value, dom.comment3.value, img);
        arr_board1.push(n_note);
        const newbb = building(nbuild.code_building, arr_board1, nbuild.arr_user, nbuild.arr_votos, nbuild.arr_answere, nbuild.arr_forms);
        localStorage[build] = JSON.stringify(newbb)
        drow_notes();
        dom.comment2.value = ""
        dom.comment3.value = ""
        dom.comment.value = ""

    }

}

//מעבר על מערך המודעות של הבנין ויצירת כל הפתקים
const drow_notes = () => {
    dom.boardy.innerHTML = " "
    arr_board1.forEach(n => {
        create_note(n);
    });
}

//יצירת פתק על לוח המודעות
const create_note = (x) => {
    const new_note = document.createElement('div');
    new_note.classList.add('note_1');
    new_note.classList.add(x.backgruondy);
    new_note.classList.add('new_note');
    const titel = document.createElement('h1');
    const content = document.createElement('h2');
    const mark = document.createElement('h3');
    titel.className = 'titel';
    new_note.appendChild(titel);
    new_note.appendChild(content);
    new_note.appendChild(mark);
    dom.boardy.appendChild(new_note);
    content.innerHTML = x.h2;
    titel.innerHTML = x.h1;
    mark.innerHTML = x.h3;
}

//יצירת אוביקט -note
const note = (h1, h2, h3, backgruondy) => {
    return {
        h1: h1,
        h2: h2,
        h3: h3,
        backgruondy: backgruondy
    }
}

//יצירת אוביקט-building
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

//הפעלת פונקצית ציור מערך המודעות
drow_notes();