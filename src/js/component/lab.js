
// --- TEAM DATA ---
const teamMembers = [
    { name: "Fuad", img: "/assets/tech/fuad.svg" },
    { name: "Lugano", img: "/assets/tech/lugano.svg" },
    { name: "Aisha", img: "/assets/tech/aisha.svg" },
    { name: "Lupyana", img: "/assets/tech/lupyan.svg" },
    { name: "Maria", img: "/assets/tech/maria.svg" }
];

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