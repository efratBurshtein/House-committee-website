const dom = {
  link_menu: document.getElementById('link_menu'),
  page_before: document.getElementById('page_before'),
  con_forum: document.getElementById('con_forum'),
  sms: document.getElementById('sms'),
  to_set: document.getElementById('to_set')
}

//בעת לחיצה על תמונות הלינק חזרה אחורה\העברה ל-menu
dom.link_menu.onclick = () => {
  location.href = "./menu.html";
}

dom.page_before.onclick = () => {
  location.href = './menu.html'
}

//שליפת הבנין הנוכחי
const password_build = localStorage.getItem('currentbuilding');
const build = JSON.parse(localStorage.getItem(password_build));
let arr_forum = build.arr_forms;

//יצירת המסרון על המסך
const to_white_sms = (sms, flag) => {
  const div = document.createElement('div');
  if (flag) {
    div.className = 'smsnow';
  } else {
    div.className = 'sms1';
  }
  dom.con_forum.appendChild(div);
  div.innerHTML = sms;
  const br = document.createElement('br');
  div.appendChild(br);
};

//מעבר על מערך המסרונים של הבנין הנוכחי
let flag1 = false;
arr_forum.forEach(sms => {
  to_white_sms(sms, flag1);
});

//בעת שליחת ההודעה קליטה לתוך ה-callstorageושליחה לפונקציה  והצגשתציגה על המסך 
dom.to_set.onclick = () => {
  arr_forum.push(dom.sms.value);
  build.arr_forms = arr_forum;
  let flag = true;
  localStorage.setItem(password_build, JSON.stringify(build));
  if (dom.sms.value !== '') {
    to_white_sms(dom.sms.value, flag);
    dom.sms.value = '';
  }

};

//יצרית אוביקט מסוג building
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