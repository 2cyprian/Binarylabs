
// --- TEAM DATA ---
const teamMembers = [
    { name: "Fuad", img: "/assets/tech/fuad.svg" },
    { name: "Lugano", img: "/assets/tech/lugano.svg" },
    { name: "Aisha", img: "/assets/tech/aisha.svg" },
    { name: "Lupyana", img: "/assets/tech/lupyan.svg" },
    { name: "Maria", img: "/assets/tech/maria.svg" }
];

const labsValues=[
    {icon:"/assets/icons/mission.svg",
        title:'Our Mission',
        text:"To equip graduates and professionals with hands-on, industry-ready tech skills that bridge the gap between education and career opportunities."
            },
    {icon:"/assets/icons/vision.svg",
        title:"Our Vision",
        text:"To be Africa’s leading tech skills hub, empowering professionals to excel, innovate, and drive digital growth."
    },
    {
        icon:"/assets/icons/values.svg",
        title:"Our Values",
        text:"We value hands-on learning, mentorship, inclusivity, industry relevance, and empowering learners to make a meaningful impact."

    }
]

// --- RENDER TEAM MEMBERS ---

// 1. Render Team
const teamContainer = document.getElementById('team-list');
if (teamContainer) {
    teamContainer.innerHTML = teamMembers.map(member =>`
        <div class="team-member">
            <div class="avatar-circle">
                <img src="${member.img}" alt="${member.name}">
            </div>
            <span class="member-name">${member.name}</span>
        </div>
    `).join('');
}

// 2.Render labValues

const valuesContainer = document.getElementById('values-list');
if (valuesContainer){
    valuesContainer.innerHTML= labsValues.map(values => `
        <div class="values-list">
            <div class="values-icon">
            <img src="${values.icon}" alt="values-icon">
            </div>
        <h3>${values.title}</h3>
        <p>${values.text}</p>
    
        </div>`).join('');
}