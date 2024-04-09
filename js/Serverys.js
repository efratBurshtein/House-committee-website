const dom = {
    link_menu: document.getElementById('link_menu'),
    title: document.getElementById('title'),
    respons: document.getElementById('respons'),
    one_survrys: document.getElementById('one_survrys'),
    myChart: document.getElementById('myChart'),
    page_before: document.getElementById('page_before')

}

//בעת לחיצה על תמונות הלינק חזרה אחורה\העברה ל-menu
dom.link_menu.onclick = () => {
    location.href = "./menu.html";
}

dom.page_before.onclick = () => {
    location.href = "./menu.html";
}

//שליפת נתונים ממשתמש ה-user הנוכחי uv-building הנוכחי
const hh7 = document.createElement('h2');
dom.respons.appendChild(hh7);
const user1 = localStorage['curentuser'];
const nuser = JSON.parse(localStorage[user1]);
localStorage.getItem(nuser)
let arr_servery = nuser.arr_serves || [];
const bui = localStorage['currentbuilding'];
const nbui = JSON.parse(localStorage[bui]);
localStorage.getItem(nbui)
let arr_answers = nbui.arr_answere ;
let ind = 0
let indi = 0
const delay = 100000;
let num = 0;

//קריאה לקובץ גיסון של הסקרים
const t_ajax = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../json/servery.json',
            success: (serverys) => {
                let flag = false;
                serverys.forEach((servery, index) => {
                    flag = true;
                    //בדיקה האם התשובה התקבלה במערכת ועדכון מערך הצפיה של המשתמש בתוך זמן מוגדר
                    setTimeout(() => {
                        if (arr_servery[ind] == 1) {
                            hh7.innerHTML = "תשובתך התקבלה במערכת מחכים לתשובתך בשבוע הבא";
                        }
                        else {
                            dom.respons.innerHTML = " "
                            dreweservrys(servery.question, servery.ans1, servery.ans2, servery.ans3)
                            localStorage['curent_servery'] = servery.question;
                            const newb = building(nbui.code_building, nbui.arr_bord, nbui.arr_user, nbui.arr_votos, arr_answers, nbui.arr_forms);
                            localStorage[bui] = JSON.stringify(newb);
                            num = 0;
                        }
                        if (indi == ind-1) {
                            arr_answers[0] = 0;
                            arr_answers[1] = 0;
                            arr_answers[2] = 0;
                            const newb = building(nbui.code_building, nbui.arr_bord, nbui.arr_user, nbui.arr_votos, arr_answers, nbui.arr_forms);
                            localStorage[bui] = JSON.stringify(newb);
                        }
                        ind++;
                    }, delay * index);
                });
                resolve(flag);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};

//בדיקת פעולה אסינכרונית
t_ajax()
    .then(yes => {
        if (yes) {
        } else {
        }
    })
    .catch(error => {
        alert("הגיסון לא עלה");
    });

let flag1 = false

//פונקציה המציירת את שאלות הסקרים
const dreweservrys = (ask, ans1, ans2, ans3) => {
    one_survrys.innerHTML = " ";
    const question = document.createElement('h1');
    const answer1 = document.createElement('button');
    const answer2 = document.createElement('button');
    const answer3 = document.createElement('button');
    const title = document.createElement('div');
    const respons = document.createElement('div');
    const buttony = document.createElement('button');
    const button1 = document.createElement('div');
    const button2 = document.createElement('div');
    const button3 = document.createElement('div');
    question.innerHTML = ask;
    answer1.innerHTML = ans1;
    answer2.innerHTML = ans2;
    answer3.innerHTML = ans3;
    buttony.type = 'submit';
    buttony.innerHTML = 'זאת התשובה שלי';
    buttony.classList.add('send');
    question.id = 'question';
    respons.id = 'respons';
    button1.appendChild(answer1);
    button2.appendChild(answer2);
    button3.appendChild(answer3);
    title.appendChild(question);
    respons.appendChild(button1);
    respons.appendChild(button2);
    respons.appendChild(button3);
    respons.appendChild(buttony);
    one_survrys.appendChild(title);
    one_survrys.appendChild(respons);
    //בעת לחיצה על תשובה
    button1.onclick = () => {
        if (flag1 !== true) {
            flag1 = true;
            button1.classList.add('cho')
            num = 0;
        }
        else {
            alert('ניתן לבחור תשובה אחת בלבד')
        }
    }
    button2.onclick = () => {
        if (flag1 !== true) {
            flag1 = true;
            button2.classList.add('cho')
            num = 1;
        }
        else {
            alert('ניתן לבחור תשובה אחת בלבד')
        }
    }
    button3.onclick = () => {
        if (flag1 !== true) {
            flag1 = true;
            button3.classList.add('cho')
            num = 2;
        }
        else {
            alert('ניתן לבחור תשובה אחת בלבד')
        }
    }

    //בעת הגשת התשובה בדיקה האם נבחרה תשובה והשמה במערך הצפיה
    buttony.onclick = () => {
        if (flag1 == false) {
            alert('לא נבחרה תשובה')
        }
        else {
            flag1 = false
            const build = localStorage['currentbuilding'];
            const nbuild = JSON.parse(localStorage[build]);
            let arr_answers = nbuild.arr_answere || [];
            arr_answers[num]++;
            const newbb = building(nbuild.code_building, nbuild.arr_bord, nbuild.arr_user, nbuild.arr_votos, arr_answers, nbuild.arr_forms);
            localStorage[build] = JSON.stringify(newbb);
            if (ind<7){
                arr_servery[ind-1]++;
                const nnuser = new_user(nuser.name, nuser.password, nuser.bilding_code, nuser.profil, nuser.fon, nuser.seen_votes, arr_servery);
                localStorage[user1] = JSON.stringify(nnuser);
            }
            alert(ind)
            location.href = './system_responses4.html'
        }
    }
};

//יצירת אוביקט מסוג-building
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