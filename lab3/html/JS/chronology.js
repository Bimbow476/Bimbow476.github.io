const timelineData = [
    {
        year: "1492",
        title: "Відкриття Америки",
        description: "Христофор Колумб відкрив Новий Світ.",
        details: "12 жовтня 1492 року Христофор Колумб та його екіпаж досягли берегів Нового Світу, відкривши Багамські острови. Вони вважали, що потрапили в Азію, проте насправді це був початок європейської колонізації Америки. Відкриття змінило хід історії, започаткувавши взаємодію між Старим і Новим світом."
    },
    {
        year: "1789",
        title: "Французька революція",
        description: "Початок великої революції у Франції.",
        details: "Французька революція розпочалася 14 липня 1789 року зі штурму Бастилії. Основними її причинами були соціальна нерівність, фінансова криза та незадоволення владою. Революція призвела до падіння монархії, страти короля Людовіка XVI та проголошення Франції республікою. Вона заклала основи сучасної демократії та прав людини."
    },
    {
        year: "1969",
        title: "Політ на Місяць",
        description: "Перша висадка людини на Місяць - Ніл Армстронг.",
        details: "20 липня 1969 року астронавти місії Apollo 11 Ніл Армстронг і Базз Олдрін здійснили першу висадку людини на Місяць. Армстронг вимовив знамениті слова: 'Це маленький крок для людини, але гігантський стрибок для людства'. Ця подія стала тріумфом космічної гонки між США та СРСР."
    },
    {
        year: "1989",
        title: "Падіння Берлінської стіни",
        description: "Символічне завершення Холодної війни і возз'єднання Німеччини.",
        details: "9 листопада 1989 року тисячі людей зібралися біля Берлінської стіни після помилкового оголошення про відкриття кордонів. У результаті стіна, яка розділяла Східний і Західний Берлін з 1961 року, була зруйнована, що стало важливим кроком до возз'єднання Німеччини і завершення Холодної війни."
    },
    {
        year: "1991",
        title: "Розпад СРСР",
        description: "Кінець Радянського Союзу і утворення незалежної України та інших держав.",
        details: "Розпад СРСР відбувся у грудні 1991 року після підписання Біловезької угоди між Україною, Росією та Білоруссю. Це призвело до утворення 15 незалежних держав і кардинальної зміни світового порядку. Україна проголосила незалежність 24 серпня 1991 року, що було підтверджено всенародним референдумом 1 грудня."
    },
    {
        year: "2004",
        title: "Вступ України до СОТ",
        description: "Україна приєдналася до Світової організації торгівлі.",
        details: "Україна стала членом СОТ 16 травня 2008 року після тривалого процесу переговорів. Це відкрило нові можливості для міжнародної торгівлі та економічного розвитку країни, але також зобов’язало Україну виконувати певні умови та стандарти у міжнародних відносинах."
    }
];

const timelineContainer = document.getElementById("timeline");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.querySelector(".close");

timelineData.forEach(item => {
    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item";

    const dateDiv = document.createElement("div");
    dateDiv.className = "timeline-date";
    dateDiv.textContent = item.year;

    const contentDiv = document.createElement("div");
    contentDiv.className = "timeline-content";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const desc = document.createElement("p");
    desc.textContent = item.description;

    const moreInfoBtn = document.createElement("button");
    moreInfoBtn.className = "more-info";
    moreInfoBtn.textContent = "Дізнатися більше";
    moreInfoBtn.onclick = () => {
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.details;
        modal.style.display = "block";
    };

    contentDiv.appendChild(title);
    contentDiv.appendChild(desc);
    contentDiv.appendChild(moreInfoBtn);
    timelineItem.appendChild(dateDiv);
    timelineItem.appendChild(contentDiv);
    timelineContainer.appendChild(timelineItem);
});

closeModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
