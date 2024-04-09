const dom = {
    link_menu: document.getElementById('link_menu'),
    page_before: document.getElementById('page_before'),
    all_payment: document.getElementById('all_payment'),
    naw_m:document.getElementById('naw_m')
}

//בעת לחיצה על תמונות הלינק חזרה אחורה\העברה ל-menu
dom.link_menu.onclick = () => {
    location.href = "./menu.html";
}

dom.page_before.onclick = () => {
    location.href = './menu.html'
}

const date = new Date();
const value_date = date.toLocaleString('he', { month: 'long' });
let day = date.getDate();
let month = date.getMonth();

const months = ["ינואר", "פבואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

const all_months = () => {
    months.forEach(m => {
        droe_pay_month(m);
        if (m !== value_date) {
            naw_month(m);
        }
        else if(m===value_date){
            const link=document.createElement('a');
            link.href='#'+m;
            link.innerHTML=('למעבר לתשלום החודש הנוכחי');
            link.id=('link')
            dom.naw_m.appendChild(link);
        }
    });
}
const naw_month = (x) => {   
    const n_month = document.getElementById(x);
    n_month.style.opacity = '0.5';
    n_month.style.pointerEvents = 'none';
}

const droe_pay_month = (x) => {
    const div = document.createElement('div');
    div.className = 'div_pay1';
    div.id = (x);
    const h1 = document.createElement('h1');
    const pay_basic = document.createElement('p');
    const pay_aa = document.createElement('p');
    const pay_ago = document.createElement('p');
    const btn_pay_naw = document.createElement('button')
    pay_basic.className = 'aaa';
    pay_aa.className = 'aaa';
    pay_ago.className = 'aaa';
    div.appendChild(h1);
    div.appendChild(pay_basic);
    div.appendChild(pay_aa);
    div.appendChild(pay_ago);
    div.appendChild(btn_pay_naw);
    dom.all_payment.appendChild(div);
    h1.innerHTML = (x);
    pay_basic.innerHTML = ('תשלום בסיסי:');
    pay_aa.innerHTML = ('תשלומים נוספים:');
    pay_ago.innerHTML = ('חובות ישנים');
    btn_pay_naw.innerHTML = ('שלם עכשיו:');
    btn_pay_naw.id=x+'B';
    btn_pay_naw.className = 'btn_pay_naw';
    btn_pay_naw.onclick = () => {
        location.href = "./system_responses2.html"
    }

}

all_months();

