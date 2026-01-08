
// --- TEAM DATA ---
const teamMembers = [
    { name: "Jamal", img: "/assets/tech/fuad.svg" },
    { name: "Janeth", img: "/assets/tech/lugano.svg" },
    { name: "Aisha", img: "/assets/tech/aisha.svg" },
    { name: "Lupyana", img: "/assets/tech/lupyan.svg" },
    { name: "Anna", img: "/assets/tech/maria.svg" }
];
const foundersData = [
  {
    name: "Catherine Rose",
    role: "Co-Founder & CEO",
    img: "/assets/ceo.jpg",
    description: `CR leads Binary Labs in equipping youth with advanced tech skills aligned
with SDG 4. With Noah’s dedicated support, she continues to drive 
meaningful innovation and strengthen the connection between academic
learning and industry demands through inclusive, on-demand, hands-on
training and impactful placement opportunities.`,
    socials: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  // {
  //   name: "Noah",
  //   role: "Co-Founder & CTO",
  //   img: "/assets/c-noah.png",
  //   description: `Noah is leading the technical team to ensure seamless delivery of innovative tech solutions and mentoring cohorts...`,
  //   socials: {
  //     facebook: "#",
  //     linkedin: "#",
  //     twitter: "#",
  //     instagram: "#"
  //   }
  // },
  // {
  //   name: "Miriam",
  //   role: "Co-Founder & COO",
  //   img: "/assets/mirriam.png",
  //   description: `Alice ensures smooth operations of all Binary Labs initiatives and manages the engagement with partners and institutions...`,
  //   socials: {
  //     facebook: "#",
  //     linkedin: "#",
  //     twitter: "#",
  //     instagram: "#"
  //   }
  // }
];


const labsValues=[
    {icon:"/assets/icons/la_tools.svg",
        title:'Hands-On Skills',
        text:`Our cohorts acquire hands-on 
skills & abilities through learning
from experts practicallly in our 
extensive lab enviroment facilitated 
by experienced expert instructors 
and facilitators.`,
        link:"To show you know............"
            },
    {icon:"/assets/icons/teach.svg",
        title:"Expert Mentorship",
        text:`Binary (Labs) has assembled a team of mentors who are veterans with a track record of designing and deploying technology products & services for successful companies across AFRICA.`,
        link:"To teach you how............"
    
      },
    {
        icon:"/assets/icons/people.svg",
        title:"Industry Collaboration",
        text:`Our core value is centered around 
collaboration with Institutions and the Industry in order to collectively develop skilled technical talent with domain-specific hands-on expertise.`,
        link:"  To challenge you further..........."
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
       <span class="small"><a href="#">${values.link}</a></span>
    
        </div>`).join('');
}

// founders slider component

const slider = document.querySelector('.founders-slider');

// Create founder cards dynamically
foundersData.forEach((founder, index) => {
  const card = document.createElement('div');
  card.classList.add('founder-text');
  if(index === 0) card.classList.add('active'); // show first initially

  card.innerHTML = `
  <span class="quote-icon">
    <img src="${founder.img}" alt="${founder.name}" class="founder-img">
  </span>
  <span class="founder-info">
    <h3>${founder.name}</h3>
    <span class="small">${founder.role}</span>
  <p>${founder.description}</p>
    <span class="socials-icons">
      <a href="${founder.socials.facebook}"><i class="fab fa-facebook-f"></i></a>
      <a href="${founder.socials.linkedin}"><i class="fab fa-linkedin-in"></i></a>
      <a href="${founder.socials.twitter}"><i class="fab fa-twitter"></i></a>
      <a href="${founder.socials.instagram}"><i class="fab fa-instagram"></i></a>
    </span>
  </span>
  `;
  slider.appendChild(card);
});

// Auto-slide logic
const cards = document.querySelectorAll('.founders-slider .founder-text');
let current = 0;
const intervalTime = 5000; // 5 seconds

setInterval(() => {
  cards[current].classList.remove('active');
  current = (current + 1) % cards.length;
  cards[current].classList.add('active');
}, intervalTime);
