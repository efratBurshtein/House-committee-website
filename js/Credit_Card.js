const dom = {
  login_up: document.getElementById('login_up'),
  number_card: document.getElementById('number_card'),
  pwdtokef: document.getElementById('pwdtokef'),
  pwdcvc: document.getElementById('pwdcvc'),
  checkbox_card: document.getElementById('checkbox_card')
};

//מעבר לעמוד הבא
dom.login_up.onclick = () => {
  location.href = '../html/system_responses1.html';
};

//בנית אוביקט מסוג -user_card
const user_card = (number_card, pwdtokef, pwdcvc) => {
  return {
    number_card: number_card,
    validity: pwdtokef,
    cvc: pwdcvc
  };
};

//בעת לחיצה על אישור הכנסת נתונים ל-localstorage וולידציה
dom.login_up.onclick = () => {
  const credit_card = user_card(dom.number_card.value, dom.pwdtokef.value, dom.pwdcvc.value);
  localStorage[localStorage['curentuser']+'_card'] = JSON.stringify(credit_card);
  localStorage['curentuser_card'] = localStorage['curentuser'];

  if (!dom.number_card.value || !dom.pwdtokef.value || !dom.pwdcvc.value) {
    alert("נא למלא את כל השדות  ");
    return false;
  }
   
  
  if (parseInt(dom.pwdcvc.value) > 999) {
    alert("גדול משלוש ספרות cvc מספר");
    return false;
  }
  if (parseInt(dom.pwdcvc.value) <= 99) {
    alert("קטן משלוש ספרות cvc מספר");
    return false;
  }

  location.href = './system_responses1.html';
};
