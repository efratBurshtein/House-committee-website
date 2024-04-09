const dom = {
    btn_profil: document.getElementById('btn_profil'),
    profil1: document.getElementById('profil1'),
    profil2: document.getElementById('profil2'),
    profil3: document.getElementById('profil3'),
    profil4: document.getElementById('profil4'),
    profil5:document.getElementById('previewImage'),
    profil6: document.getElementById('profil6'),
    profil7: document.getElementById('profil7'),
    profil8: document.getElementById('profil8'),
    profil8: document.getElementById('profil8'),
    profil9: document.getElementById('profil9'),
  
}

//העברה לעמוד הבא
dom.btn_profil.onclick = () => {
    location.href = './Personal_Information.html';
};

//ציור התמונה שהועלתה ע"י המשתמש
const inputImage = document.getElementById('imageUpload');
const previewImage = document.getElementById('previewImage');
inputImage.addEventListener('change', (event) => {
    previewImage.classList.add('decoratePicture');
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        previewImage.src = event.target.result;
    });
    if (file) {
        reader.readAsDataURL(file);
    }
});

// בעת לחיצה על פרופיל מסוים הוספת מסגרת ושליחה לפונקציה שתכניס את הנתון ל-localstorage
dom.profil1.onclick = () => {
    imgprofilechoose(dom.profil1);
    art_choose(dom.profil1);
}

dom.profil2.onclick = () => {
    imgprofilechoose(dom.profil2);
    art_choose(dom.profil2);
}

dom.profil3.onclick = () => {
    imgprofilechoose(dom.profil3);
    art_choose(dom.profil3);
}

dom.profil4.onclick = () => {
    imgprofilechoose(dom.profil4);
    art_choose(dom.profil4);
}

dom.profil5.onclick = () => {
    imgprofilechoose(dom.profil5);
    art_choose(dom.profil5);
}

dom.profil6.onclick = () => {
    imgprofilechoose(dom.profil6);
    art_choose(dom.profil6);
}

dom.profil7.onclick = () => {
    imgprofilechoose(dom.profil7);
    art_choose(dom.profil7);
}

dom.profil8.onclick = () => {
    imgprofilechoose(dom.profil8);
    art_choose(dom.profil8);
}

//פונקציה המקבלת src ומכניסה ל-localstorage
const imgprofilechoose = (p) => {
    localStorage['carrenprofil'] = p.src;
}

//שליחה לפונקציה שתוריד את המסגרת מהפרופיל הקודם
let choose;
const art_choose = (id2) => {
    if (choose === undefined) {
        id2.classList.add('choose');
        choose = id2;
    } else {
        choose.classList.remove('choose');
        id2.classList.add('choose');
        choose = id2;
    }
}

