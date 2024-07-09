const msg = [
  `Je suis Mohamed EL-IDRISSI le développeur de ce jeu !
  Je suis développeur Full Stack vorace de s’améliorer et prêt toujours pour le challenge.<br>
  Je vais vous accompagner durant toutes les étapes dans votre aventure, amusez-vous et je vous souhaite bonne chance
  `,
  `Je pense que ces lignes rendront notre rencontre inévitable et très bientôt.<br>
  Je suis capable de développer un site web statique (Front-end) et de créer d’un site web et mobile - Front end JS.<br>
  Je maîtrise également le développement d’un site web dynamique (back-end) et la Création d’application d’un réseau social en projet pédagogique.<br>
  En bref, le domaine de mes compétences couvrent :
  Html / CSS / JavaScript/ Nodejs / MongoDB / React /Angular Blockchains/smart contract/solidity.
  `,
  `Gardez à l’esprit que j’étais un Développeur Web entre  2018 et 2019 dans le sein de | DIVERS MARKET SRL (AFUMATI – ROUMANIE) comme j’ai fait le développement d'applications web et de sites internet sur mesure pour une clientèle variée. En sus, j’utilise de technologies front-end telles que HTML, CSS, JavaScript/jQuery Gestion des déploiements et des mises à jour.`,
  `Il est à constater également que j’étais Technicien spécialisé entre  2005 et 2012 en tant que | FREELANCER - (BUCAREST, ROUMANIE). Alors qu’entre 2004 et 2005 au sein de la société| FEATURE NET SRL (MEKNES – MAROC) j’étais chargé de la Maintenance des systèmes et les Systèmes informatiques et d’administrer le système dédié à l’Installation de la Comité de pilotage Prêt de poste en cas de panne avec collaboration étroite avec les clients pour comprendre leurs besoins et fournir des solutions sur mesure.`,
  `Je communique couramment en français, anglais et roumaine.
  Je suis également un bon peintre, et fan de la musique douce et sacrée et j’aime voyager.
  `,
];
const isMail = (data) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return data.match(pattern) !== null;
};
const name = $("#name");
const email = $("#email");
const loginBtn = $("#loginBtn");
const enterBtn = $('#enterBtn');
const nameError = $("#nameError");
const emailError = $("#emailError");
const loginSection = $("#loginSection");
const isLogin = $("#isLogin");
const profilPup = $("#profilPup");
const nameSpan = $('#nameSpan');
const profile_p = $('#profile_p')
let user = JSON.parse(localStorage.getItem("user"));  
let msgIndex = parseInt(localStorage.getItem("msgIndex") || 0);
isLogin.hide();
loginSection.hide();
profilPup.hide();
const showProfile = () => {
    isLogin.hide();
    nameSpan.text(user.name)
    profile_p.html(msg[msgIndex]);
    let index = msgIndex + 1;
    if (index > msg.length - 1) index = 0;
    localStorage.setItem("msgIndex", index);
    profilPup.show();
}
const hideProfil = ()=>{
    profilPup.hide();
    isLogin.show();
}
if (user === null) {
   loginSection.show();
  } else {
   showProfile()
  }

const loginHandler = function(e){
    e.preventDefault;
    nameError.hide()
    emailError.hide()
    if(name.val().length> 3 && isMail(email.val())){
        user = {
            name: name.val(),
            email: email.val()
        }
        localStorage.setItem('user',JSON.stringify(user));
        loginSection.hide();
        showProfile();
}else {
    if(name.val().length< 3) nameError.show();
    if(!isMail(email.val())) emailError.show();
};
}

loginBtn.click(loginHandler);
enterBtn.click(hideProfil)

const navigationHandlerClick = function () {
 

    var isOpen = true;
    var button = document.querySelector("#expand-navigation");
    var wrapper = document.querySelector("#nav .wrapper");
    var overlay = document.querySelector("#nav .overlay");
  
    button.addEventListener("click", navigationHandler);
    document.addEventListener("click", closeNavigation);
  
    function navigationHandler(event) {
      if (event == null) {
        event = window.event;
      }
  
      event.stopPropagation();
  
      !isOpen ? openNavigation() : closeNavigation();
    }
  
    function openNavigation() {
      isOpen = true;
  
      button.innerHTML = "-";
      wrapper.className = "wrapper opened";
      overlay.className = "overlay on-overlay";
    }
  
    function closeNavigation() {
      isOpen = false;
  
      button.innerHTML = "+";
      wrapper.className = "wrapper";
      overlay.className = "overlay";
    }
  }
navigationHandlerClick();
