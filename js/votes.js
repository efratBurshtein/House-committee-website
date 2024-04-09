const dom = {
    link_menu: document.getElementById('link_menu'),
    page_before: document.getElementById('page_before'),
    btn_add_votes: document.getElementsByClassName('btn_add_votes')[0],
    subject: document.getElementById('comment'),
    btn_add: document.getElementById('btn_add'),
    allVotes: document.getElementById('all_votos')
}

//בעת לחיצה על תמונות הלינק חזרה אחורה\העברה ל-menu
dom.link_menu.onclick = () => {
    location.href = "./menu.html";
}
dom.page_before.onclick = () => {
    location.href = './menu.html'
}

//בעת לחיצה על הוספת מודעה סגירה של האפשרות
dom.btn_add_votes.onclick = () => {
    dom.subject.classList.remove('none')
    dom.btn_add.classList.remove('noni')
}

//שליפת הנתונים -localStorage  של הבנין הנוכחי
let arr = [];
let flag = false;
const password_build = localStorage['currentbuilding'];
const build = JSON.parse(localStorage[password_build]);
const good_build = build || {};
let arr_votos = good_build.arr_votos || [];

//אם אין נושא להצבעה הצגת טקסט למשתמש
//אם יש הצבעה הצגה של ההצבעות שהמשתמש לא ראה 
//ע"י מעבר על המערך ההצבעות שנראו על ידי המשתמש  ומעבר על מערך ההצבעות של הבנין הנוכחי
if (arr_votos.length === 0) {
    dom.allVotes.innerHTML = 'אין נושא להצבעה כעת! תרצה אולי להוסיף?';
} else {
    const user = localStorage.getItem(localStorage['curentuser']);
    const c_user = JSON.parse(user);
    let seen_votes = [];
    seen_votes = c_user.seen_votes;
    let flag = false;
    const vote = arr_votos[0];
    if (seen_votes != []) {
        arr_votos.forEach(index => {
            seen_votes.forEach(ind => {
                if (index === ind) {
                    flag = true;
                }
            });
            if (flag) {
                flag = false;
            } else {
                flag = true;
                createVoteElement(index);
            }
        })
    } else {
        if (seen_votes === []) {
            createVoteElement(vote);
            seen_votes.push(vote);
            const user1 = new_user(c_user.name, c_user.password, c_user.bulding_code, localStorage['carrenprofil'], c_user.fon, seen_votes,c_user.arr_serves);
            localStorage[c_user.password] = JSON.stringify(user1);
        }
    }
}

//-localStorage  בעת לחיצה על הוספת הצבעה יצירת אוביקט -"הצבעה נוכחית" ושמירה ב-
dom.btn_add.onclick = () => {
    const val = dom.subject.value;
    if (arr_votos !== undefined && dom.subject.value !== undefined) {
        arr_votos.push(val);
        dom.subject.classList.add('none');
        dom.btn_add.classList.add('noni');
        const bbb = building(localStorage['currentbuilding'], good_build.arr_bord, good_build.arr_user, arr_votos, good_build.arr_answere, good_build.arr_forms);
        localStorage[localStorage['currentbuilding']] = JSON.stringify(bbb);
        let v_aginst = 0;
        let v_for = 0;
        const vot = new_vote(val, v_for, v_aginst);
        localStorage[val] = JSON.stringify(vot);
        console.log(localStorage[val]);
        location.href='./menu.html';
    }
}

//ציור ההצבעה וקליטת תגובת המשתמש ע"י לחיצה בעד\נגד 
function createVoteElement(vote){
    const user = localStorage.getItem(localStorage['curentuser']);
    const c_user = JSON.parse(user);
    let seen_votes = [];
    seen_votes = c_user.seen_votes;
    console.log("create element");
    dom.allVotes.innerHTML = '';
    const vot_div = document.createElement('div');
    const subject_vote = document.createElement('button');
    subject_vote.className = 'subject_vote';
    const button_for = document.createElement('img');
    const button_against = document.createElement('img');
    const div_con_for = document.createElement('div');
    const div_con_aginst = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.innerHTML = 'בעד';
    const h22 = document.createElement('h2');
    h22.innerHTML = 'נגד';
    div_con_for.appendChild(button_for);
    div_con_for.appendChild(h2);
    div_con_aginst.appendChild(button_against);
    div_con_aginst.appendChild(h22);
    div_con_aginst.id='div_con';
    div_con_for.id='div_con';
    const div_opinion = document.createElement('div');
    button_for.src = '../picture/איקונים-תפריט/Group.png';
    button_against.src = '../picture/איקונים-תפריט/Frame.png';
    button_for.id = 'button_for';
    button_against.id = 'button_against';
    vot_div.id = 'vot_div';
    div_opinion.id = 'div_opinion';
    div_opinion.appendChild(div_con_for);
    div_opinion.appendChild(div_con_aginst);
    vot_div.appendChild(subject_vote);
    vot_div.appendChild(div_opinion);
    subject_vote.innerHTML = vote;
    dom.allVotes.appendChild(vot_div);

    // "סכימת התגובה  בעת לחיצה על "בעד 
    //וקליטה ל-localStorage את אוביקט ה-new_vote
    button_for.onclick = () => {
        const vot1 = localStorage.getItem(vote);
        const vot = JSON.parse(vot1);
        let v_for = vot.v_for;
        v_for++;
        const v1 = new_vote(vote, v_for, vot.v_aginst);
        localStorage[vote] = JSON.stringify(v1);
        localStorage['curent_votos'] = vote;
        seen_votes.push(vote);
        const user1 = new_user(c_user.name, c_user.password, c_user.bulding_code, localStorage['carrenprofil'], c_user.fon, seen_votes,c_user.arr_serves);
        localStorage[c_user.password] = JSON.stringify(user1);
        location.href = "./system_responses5.html";
    }

    // "סכימת התגובה  בעת לחיצה על "נגד 
    //וקליטה ל-localStorage את אוביקט ה-new_vote
    button_against.onclick = () => {
        const vot1 = localStorage.getItem(vote);
        const vot = JSON.parse(vot1);
        let v_aginst = vot.v_aginst;
        v_aginst++;
        const v1 = new_vote(vote, vot.v_for, v_aginst);
        localStorage[vote] = JSON.stringify(v1);
        localStorage['curent_votos'] = vote;
        seen_votes.push(vote);
        const user1 = new_user(c_user.name, c_user.password, c_user.bulding_code, localStorage['carrenprofil'], c_user.fon, seen_votes,c_user.arr_serves);
        localStorage[c_user.password] = JSON.stringify(user1);
        location.href = "./system_responses5.html";
    }
}

//יצירת אוביקט מסוג-building
const building=(pwd_building, arr_bord, arr_user, arr_votos, arr_answere, arr_forms)=> {
    return {
        code_building: pwd_building,
        arr_bord: arr_bord,
        arr_user: arr_user,
        arr_votos: arr_votos,
        arr_answere: arr_answere,
        arr_forms: arr_forms
    }
};


//יצירת אוביקט new_vote
const new_vote=(vote, v_for, v_aginst)=> {
    return {
        vote: vote,
        v_for: v_for,
        v_aginst: v_aginst
    }
}

//יצירת אוביקט -user
//יצירת אוביקט מסוג-user
const new_user = (name, password, bulding_code, profil, fon, seen_votes, arr_serves) => {
    return {
        name: name,
        password: password,
        bulding_code: bulding_code,
        profil: profil,
        fon: fon,
        seen_votes: seen_votes,
        arr_serves: arr_serves
    }
}

