const dom={
    Payments:document.getElementById('op1'),
    neighbors:document.getElementById('op2'),
    statistica:document.getElementById('op3'),
    bulletin_board:document.getElementById('op4'),
    fault_reporting:document.getElementById('op5'),
    votes:document.getElementById('op6'),
    forum:document.getElementById('op7'),
    Surveys:document.getElementById('op8'),
    link_menu: document.getElementById('link_menu'),
    page_before:document.getElementById('page_before')
}

//בעת לחיצה על כפתורי הבית ניתוב לעמוד המבוקש
dom.Payments.onclick=()=>{
    location.href="./Payments.html";
}
dom.neighbors.onclick=()=>{
    location.href="./my neighbors.html";
}
dom.statistica.onclick=()=>{
    location.href="./statistica.html";
}
dom.bulletin_board.onclick=()=>{
    location.href="./Bulletin_Board.html"
}
dom.fault_reporting.onclick=()=>{
    location.href="./Fault reporting.html"
}
dom.votes.onclick=()=>{
    location.href="./votes.html"
}
dom.forum.onclick=()=>{
    location.href="./forum.html"
}
dom.Surveys.onclick =()=>{
    location.href= "./Surveys.html";
}
dom.page_before.onclick=()=>{
    location.href='./personal_information.html'
}