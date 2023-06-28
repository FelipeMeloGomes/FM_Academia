/*SHOW MENU */
const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

/*MENU SHOW*/
/* Valida a constante existente */
if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

/*MENU HIDDEN*/
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

/*REMOVE MENU MOBILE*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
    const navMenu = document.getElementById("nav-menu");
    // Remover o menu com o click
    navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*CHANGE BACKGROUND HEADER*/
const scrollHeader = () => {
    const header = document.getElementById("header");
    // Scroll Bakcground
    this.scrollY >= 50
        ? header.classList.add("bg-header")
        : header.classList.remove("bg-header");
};
window.addEventListener("scroll", scrollHeader);

/*SCROLL SECTIONS ACTIVE LINK*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute("id"),
            sectionsClass = document.querySelector(
                ".nav__menu a[href*=" + sectionId + "]"
            );

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add("active-link");
        } else {
            sectionsClass.classList.remove("active-link");
        }
    });
};
window.addEventListener("scroll", scrollActive);

/*SHOW SCROLL UP*/
const scrollUp = () => {
    const scrollUp = document.getElementById("scroll-up");
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350
        ? scrollUp.classList.add("show-scroll")
        : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*SCROLL REVEAL ANIMATION*/
const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 400,
});

sr.reveal(`.home__data, .footer__container, .footer__group`);
sr.reveal(`.home__img`, { delay: 700, origin: "bottom" });
sr.reveal(`.logos__img, .program__card, .pricing__card`, { interval: 100 });
sr.reveal(`.choose__img, .calculate__content`, { origin: "left" });
sr.reveal(`.choose__content, .calculate__img`, { origin: "right" });

/*CALCULATE JS*/
const calculateForm = document.getElementById("calculate-form"),
    calculateCm = document.getElementById("calculate-cm"),
    calculateKg = document.getElementById("calculate-kg"),
    calculateMessage = document.getElementById("calculate-message");

const calculateImc = (e) => {
    e.preventDefault();

    if (calculateCm.value === "" || calculateKg.value === "") {
        calculateMessage.classList.remove("color-green");
        calculateMessage.classList.add("color-red");

        // Exibi a mensagem na tela
        calculateMessage.textContent = "Preencha a altura e o peso 👨‍💻";

        // Remove a mensagem em tres segundos
        setTimeout(() => {
            calculateMessage.textContent = "";
        }, 3000);
    } else {
        // IMC formula
        const cm = calculateCm.value / 100,
            kg = calculateKg.value,
            imc = Math.round(kg / (cm * cm));

        // Exibi o status de saude no site
        if (imc < 18.5) {
            // adiciona uma nova cor ao display
            calculateMessage.classList.add("color-green");
            calculateMessage.textContent = `Seu IMC é ${imc} e você é Magro 🙁`;
        } else if (imc < 25) {
            calculateMessage.classList.add("color-green");
            calculateMessage.textContent = `Seu IMC é ${imc} e você é Saudável 😁`;
        } else if (imc < 30) {
            calculateMessage.classList.add("color-red");
            calculateMessage.textContent = `Seu IMC é ${imc} e você está com Obesidade 😢`;
        } else {
            calculateMessage.classList.add("color-red");
            calculateMessage.textContent = `Seu IMC é ${imc} e você está com Obesidade Extrema 😢`;
        }

        // Limpar os dados do input
        calculateCm.value = "";
        calculateKg.value = "";

        // Remover a mensagem depois de alguns segundos
        setTimeout(() => {
            calculateMessage.textContent = "";
        }, 4000);
    }
};

calculateForm.addEventListener("submit", calculateImc);

/*EMAIL JS*/
const contactForm = document.getElementById("contact-form"),
    contactMessage = document.getElementById("contact-message"),
    contactUser = document.getElementById("contact-user");

const sendEmail = (e) => {
    e.preventDefault();

    if (contactUser.value === "") {
        // add e remove uma nova cor
        contactMessage.classList.remove("color-green");
        contactMessage.classList.add("color-red");

        // Exibe a mensagem
        contactMessage.textContent = "Insira o seu Email ☝";

        // remove a mensagem
        setTimeout(() => {
            contactMessage.textContent = "";
        }, 3000);
    } else {
        // serviceID - templateID - #form - publicKey
        emailjs
            .sendForm(
                "service_ss1i5ze",
                "template_no91oel",
                "#contact-form",
                "67CqkqzBExag3iaZ3"
            )
            .then(
                () => {
                    // Exibi a mensagem com uma nova cor
                    contactMessage.classList.add("color-green");
                    contactMessage.textContent = "Inscrito com Sucesso 💪";

                    // Remove a mensagem
                    setTimeout(() => {
                        contactMessage.textContent = "";
                    }, 3000);
                },
                (error) => {
                    // Email com erro
                    alert("OPA! ALGO FALOU...", error);
                }
            );

        // Limpar os inputs
        contactUser.value = "";
    }
};

contactForm.addEventListener("submit", sendEmail);
