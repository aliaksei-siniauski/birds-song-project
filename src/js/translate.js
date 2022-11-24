export { i18Obj, getTranslate, language, langEn, langBy };

const i18Obj = {
    en: {
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contacts: "Contacts",
        download: "Download CV",
        "intro-title-hi": "Hello",
        "intro-title-name": "My name is",
        "intro-title-fullname": "Alexsi Siniauski",
        "intro-subtitle-info":
            "I'm a self-taught frontend web developer. I like to create interactive and accessible websites and web apps.",
        "about-title": "More About me",
        "about-text":
            "I'm a trustworthy, self-motivated frontend web developer. My goal is to be a professional frontend web developer who creates things that make life better for everyone, everywhere. I have experience working with HTML/CSS/JavaScript. Take a look at my pet projects. Every new project develops my skills into a well-rounded frontend web developer. Get in touch with me. I'm always ready to find creative and innovative solutions for new challenges!!!",
        "about-me-importnat": "front-end web developer.",
        "intro-welcome": "Welcome to my portfolio website",
        "skills-title": "My Skills",
        "projects-title": "Some of My projects",
        "tag-all": "All",
        "tag-current": "Current project",
        "tag-website": "Website",
        "tag-app": "Web Application",
        "tag-websit": "WebSite",
        "tag-source": "Project Source",
        "project-1": "Travel project",
        "project-1-details": "Travel planning adaptive and interactive website",
        "project-2": "Personal Website Project",
        "project-2-details": "Personal responsive and interactive website",
        "project-3": "Momentum Project",
        "project-3-details":
            "A simple copy of the Chrome Web Store app of the same name",
        "project-4": " Project of the photographer's portfolio",
        "project-4-details":
            "Photographer portfolio responsive and interactive website",
        "project-5": "Animal Shelter Project",
        "project-5-details": "Animal Shelter responsive and interactive website",
        "project-6": "Online-zoo Pet Project",
        "project-6-details": "Online-zoo responsive and interactive website",
        "project-7": "Plants Project",
        "project-7-details": "Plants responsive and interactive website",
        "project-8": "Color-flipper Project",
        "project-8-details":
            "A mini javascript project in which you will change the background to a random color",
        "project-9": "Movie project",
        "project-9-details": "A simple movie app with Vanilla JavaScript",
        "contacts-title": "Get in touch with me",
        "send-message": "Send Message",
    },
    by: {
        home: "Размінка",
        about: "Вераб'іныя",
        skills: "Лясныя птутшкі",
        projects: "Пявучыя птушкі",
        contacts: "Драпежныя птушкі",
        download: "Марскія птушкі",
        "intro-title-hi": "Witam",
        "intro-title-name": "Nazywam się",
        "intro-title-fullname": "Alexsi Siniauski",
        "intro-subtitle-info":
            "Jestem samoukiem front-end web developerem. Lubię tworzyć interaktywne i przystępne strony oraz aplikacje internetowe.",
        "about-title": "Więcej o mnie",
        "about-text":
            "Jestem godnym zaufania, zmotywowanym front-end programistą. Moim celem jest bycie profesjonalnym front-end web developerem, który tworzy rzeczy tworzenie  rzeczy, które uczynią życie lepszym dla wszystkich i wszędzie. Mam doświadczenie w pracy z HTML/CSS/JavaScript. Zobacz moje projekty. Każdy nowy projekt kompleksowo rozwija moje umiejętności. Bądź ze mną w kontakcie. Zawsze jestem gotowym znaleźć kreatywne i innowacyjne rozwiązania dla nowych wyzwań!!!",
        "intro-welcome": "Witam na mojej stronie internetowej",
        "skills-title": "Moje umiejętności",
        "projects-title": "Niektóre z moich projektów",
        "tag-all": "Wszystko",
        "tag-current": "Bieżący projekt",
        "tag-website": "Strony internetowe",
        "tag-app": "Aplikacja internetowa",
        "tag-source": "Źródło projektu",
        "project-1": "Projekt podróży",
        "project-1-details":
            "Adaptacyjna i interaktywna strona internetowa do planowania podróży",
        "project-2": "Projekt strony osobistej",
        "project-2-details":
            "Adaptacyjna i interaktywna osibista strona internetowa ",
        "project-3": "Momentum Project",
        "project-3-details":
            "Prosta kopia aplikacji Chrome Web Store o tej samej nazwie",
        "project-4": "Projekt portfolio fotografa",
        "project-4-details":
            "Adaptacyjna i interaktywna strona internetowa fotografa",
        "project-5": "Projekt schroniska dla zwierząt",
        "project-5-details":
            "Adaptacyjna i interaktywna strona internetowa schroniska dla zwierząt",
        "project-6": "Projekt Online-zoo",
        "project-6-details":
            "Adaptacyjna i interaktywna strona internetowa Online-zoo",
        "project-7": "Projekt roślin",
        "project-7-details":
            "Adaptacyjna i interaktywna strona internetowa o roślinach",
        "project-8": "Color-flipper Project",
        "project-8-details":
            "Projekt mini javascript, w którym zmienisz tło na losowy kolor",
        "project-9": "Projekt filmowy",
        "project-9-details": "Prosta aplikacja do filmów z Vanilla JavaScript",
        "contacts-title": "Bądź ze mną w kontakcie",
        "send-message": "Wyślij wiadomość",
    },
};

const langEn = document.querySelector(".lang-en");
const langBy = document.querySelector(".lang-by");

let language;

const getTranslate = (language) => {
    const dataTranslate = document.querySelectorAll("[data-i18]");

    dataTranslate.forEach((el) => {
        let key = el.dataset.i18;
        el.textContent = i18Obj[language][key];
    });
};

langEn.addEventListener("click", () => getTranslate((language = "en")));
langBy.addEventListener("click", () => getTranslate((language = "by")));
