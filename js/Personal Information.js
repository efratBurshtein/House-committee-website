const dom = {
  link_menu: document.getElementById('link_menu'),
  btn_personal_informashion: document.getElementById('btn_personal_informashion'),
  nameperson: document.getElementById('nameperson'),
  password: document.getElementById('pwd'),
  confirmPassword: document.getElementById('pwdconfirm'),
  pwdbulding: document.getElementById('pwdbulding'),
  city: document.getElementById('city'),
  street: document.getElementById('street'),
  numbuilding: document.getElementById('numbuilding'),
  input_personal_informaitiom: document.getElementById('input_personal_informaitiom'),
  page_before: document.getElementById('page_before'),
  fon: document.getElementById('fon')
}

//בעת לחיצה על תמונות הלינק חזרה אחורה\העברה ל-menu
dom.link_menu.onclick = () => {
  location.href = "./menu.html";
};
dom.page_before.onclick = () => {
  location.href = './profile.html'
}

// בעת הקלדה על שם משתמש בדיקה שירשום אותיות בלבד
dom.nameperson.onkeydown = (event) => {
  const keyCode = event.keyCode || event.which;
  if (!(keyCode >= 65 && keyCode <= 90) && !(keyCode >= 97 && keyCode <= 122) && keyCode !== 32 && keyCode !== 3) {
    alert("שם משתמש יכלול שם מלא בלבד ללא ספרות");
    return false;
  }
};

///כשלוחצים על אישור בדיקה האם מלאו את כל השדות
// האם הסיסמא תואמת, וקריאה לגיסון ובדיקת נתונים
dom.btn_personal_informashion.onclick = () => {

  if (!dom.nameperson.value || !dom.password.value || !dom.confirmPassword.value || !dom.pwdbulding.value || !dom.input_personal_informaitiom) {
    alert("נא למלא את כל השדות");
    return false;
  }

  if (dom.password.value !== dom.confirmPassword.value) {
    alert("אימות הסיסמא לא נכון ");
    return false;
  }

  if (!dom.input_personal_informaitiom.checked) {
    alert(" לא אשרת את תנאי השימוש");
    return false;
  }

  pwd_bulding_ajax(dom.pwdbulding.value, dom.city.value, dom.street.value, dom.numbuilding.value)
    .then(isValidbuilding => {
      if (isValidbuilding) {
        alert("ברוך הבא !");
        let seen_votes = [];
        new_building(dom.pwdbulding.value, dom.password.value);
        let arr_serves = [0, 0, 0, 0, 0, 0, 0];
        const user = new_user(dom.nameperson.value, dom.password.value, dom.pwdbulding.value, localStorage['carrenprofil'], dom.fon.value, seen_votes, arr_serves);
        localStorage[dom.password.value] = JSON.stringify(user);
        localStorage['curentuser'] = dom.password.value;
        localStorage['currentbuilding'] = dom.pwdbulding.value;
        localStorage['curent_servery']="";
        localStorage['curent_votos']="";
        location.href = './Credit_Card.html';
      } else {
        alert("שם משתמש או סיסמא אינם נכונים");
      }
    })
    .catch(error => {
      alert("הגיסון לא עלה");
    });
};


//קריאת שרת-שליפת נתונים מהגיסון
const pwd_bulding_ajax = (pwdbulding, city, street, numbuilding) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '../json/building.json',
      success: (allbuilding) => {
        let flag = false;
        allbuilding.forEach(build => {
          if (build.building_code === pwdbulding && build.city === city && build.street === street && build.building_number === numbuilding) {
            flag = true;
          }
        });
        resolve(flag);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

//שימוש בנתונים על הבנין והשמה לאוביקט חדש
const new_building = (pwdbuilding, user) => {
  if (localStorage[pwdbuilding] !== undefined) {
    const build = localStorage.getItem(pwdbuilding);
    const good_build = JSON.parse(build);
    let arr_user = good_build.arr_user;
    arr_user.push(user);
    const bbb = building(good_build.code_building, good_build.arr_bord, arr_user, good_build.arr_votos, good_build.arr_answere, good_build.arr_forms);
    localStorage[pwdbuilding] = JSON.stringify(bbb);
  }
  else {
    let arr_user1 = [];
    arr_user1.push(user);
    let arr_votos = [];
    let arr_bord1 = [];
    let arr_answere = [0, 0, 0];
    let arr_forms = [];
    const bb = building(pwdbuilding, arr_bord1, arr_user1, arr_votos, arr_answere, arr_forms);
    localStorage[pwdbuilding] = JSON.stringify(bb);
  }
};

//בנית אוביקט -building
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

//בנית אוביקט-user
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
};


