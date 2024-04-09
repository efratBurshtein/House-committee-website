const dom = {
    link_menu: document.getElementById('link_menu'),
    page_before: document.getElementById('page_before'),
    con_neighbors: document.getElementsByClassName('con_neighbors')[0],
    tedaile_of_build: document.getElementById('tedaile_of_build'),
    btn_n: document.getElementById('btn_n'),
    information_build: document.getElementsByClassName('information_build')[0]
}

//בעת לחיצה על תמונות הלינק חזרה אחורה\העברה ל-menu
dom.link_menu.onclick = () => {
    location.href = "./menu.html";
}

dom.page_before.onclick = () => {
    location.href = './menu.html'
}

//קריאת שרת לבדיקת הבנין הנוכחי והצגת שכניו
const items_build = (code_building) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../json/building.json',
            success: (allbuilding) => {
                let flag = false;
                allbuilding.forEach(b => {
                    if (b.building_code === code_building) {
                        const city = b.city;
                        const street = b.street;
                        const num_build = b.building_number;
                        const divi = document.createElement('h2');
                        divi.className = 'buildin_rec';
                        dom.information_build.appendChild(divi);
                        divi.innerHTML = city + '    ' + street + '  ' + num_build;
                        flag = true
                    }
                });
                resolve(flag);
            },
            error: (error) => {
                reject(error);
                alert('הגייסון לא עלה');
            }
        });
    });
};

//ציור השכנים 
const drow_neighbor = (n) => {
    const div_neighbor1 = document.createElement('li');
    const fhone = document.createElement('div');
    const prof_n = document.createElement('div');
    const img_profil_n = document.createElement('img');
    img_profil_n.className = 'img_prifil';
    prof_n.className = 'prof_n';
    const name_n = document.createElement('div');
    fhone.className = 'name_n';
    name_n.className = 'name_n';
    const user = localStorage.getItem(n);
    const neighbor2 = JSON.parse(user);
    console.log(neighbor2);
    img_profil_n.src = neighbor2.profil;
    fhone.innerHTML = neighbor2.fon;
    div_neighbor1.appendChild(img_profil_n);
    div_neighbor1.appendChild(name_n);
    div_neighbor1.appendChild(fhone);
    div_neighbor1.className = 'div_user';
    dom.con_neighbors.appendChild(div_neighbor1);
    console.log(neighbor2.name);
    name_n.innerHTML += '     ' + neighbor2.name;
}

//קריאה לפונקצית קריאת שרת ושליחת נתונים והשמה
const drow_neighbors = () => {
    const a = localStorage['currentbuilding'];
    const code_b = localStorage.getItem(a);
    const bb = JSON.parse(code_b);
    items_build(bb.code_building)
        .then(isValidbuilding => {
            if (isValidbuilding) {

            } else {

            }
        })
        .catch(error => {
            alert("הגיסון לא עלה");
        });
    const arr_n = bb.arr_user;
    arr_n.forEach(n => {
        console.log("ghgjhjbgh");
        drow_neighbor(n);
    });
}

//חיפוש שכן לפי מספר או שם
$(document).ready(function () {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myList li").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

//קריאת לפונקציה שתפעיל את העמוד הנוכחי ואת שכניו
drow_neighbors();


