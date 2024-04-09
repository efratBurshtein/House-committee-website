const dom = {
  submit_login1: document.getElementById('loginconect'),
  name: document.getElementById('nameuser'),
  password: document.getElementById('pwd'),
  btn_i_wont_start: document.getElementById('btn_i_wont_start'),
  password_building: document.getElementById('password_building')
};

//בעת לחיצה על כפתור המשך ניתוב לעמוד המבוקש
dom.btn_i_wont_start.onclick = () => {
  location.href = './Profile.html';
};

//ולידציה על השדות ובדיקה האם המשתמש כבר קיים
dom.submit_login1.onclick = () => {
  const p = localStorage.getItem(dom.password.value);
  const storedUser = JSON.parse(p);
  console.log(p);
  const namy = storedUser.name;
  const pasbuild = storedUser.bulding_code;
  const profily = storedUser.profil;
  if (!dom.name.value || !dom.password.value || !dom.password_building.value) {
    alert("נא אשלם את כל השדות");
    return false;
  }
  if (namy === dom.name.value && pasbuild === dom.password_building.value) {
    localStorage['curentuser'] = dom.password.value;
    localStorage['carrenprofil'] = profily;
    localStorage['currentbuilding'] = dom.password_building.value;
    localStorage['curent_servery']="";
    localStorage['curent_votos']="";
    alert('ברוך הבא');
    location.href = './menu.html';
  }
  else {
    alert('אחד מהפרטים שהוקשו שגויים');
  }
};

// בעת הקלדה על שם משתמש בדיקה שירשום אותיות בלבד
dom.name.onkeydown = (event) => {
  const keyCode = event.keyCode || event.which;
  if (!(keyCode >= 65 && keyCode <= 90) && !(keyCode >= 97 && keyCode <= 122) && keyCode !== 32 && keyCode !== 3) {
    alert("שם משתמש יכלול שם מלא בלבד ללא ספרות");
    return false;
  }
};

