const domi = {
    profil_user: document.getElementById('profil_user')
};

//שליפה של תמונת הפרופיל לכל העמודים
const img_profil = document.createElement('img');
img_profil.src = localStorage['carrenprofil'];
domi.profil_user.appendChild(img_profil);
img_profil.classList='img-circle';







