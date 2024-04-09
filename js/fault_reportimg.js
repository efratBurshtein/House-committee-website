const dom={
    link_menu:document.getElementById('link_menu'),
    page_before:document.getElementById('page_before'),
    btn_fault:document.getElementById('btn_fault')
  
}

//בעת לחיצה על תמונות הלינק חזרה אחורה\העברה ל-menu
dom.link_menu.onclick=()=>{
    location.href= "./menu.html";
}
dom.btn_fault.onclick=()=>{
    location.href='./system_responses3.html';
}
dom.page_before.onclick=()=>{
    location.href='./menu.html'
}

//העלת תמונה
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