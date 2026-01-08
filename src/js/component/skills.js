
const RenderEngine = {
    load: function(containerId, data, template) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = data.map((item, index) => template(item, index)).join('');
        } else {
            console.error(`Error: Container #${containerId} not found in HTML.`);
        }
    }
};

// --- 1. DATA SOURCE (With Links) ---
const overviewData = [
    {
        title: "LinuxOS Externals",
        icon: "/assets/icons/linux.svg",
        desc: `Obtaining hands-on knowledge around Open Source Operating Systems 
        Internals contribute significantly to skills needed for employability and innovative mindset since all Internet technology companies today, 
        depend of LinuxOS variants to deliver digital products and services.`,
        link: "Become A Linux Guru" // <--- Add your link here
    },
    {
        title: "System Engineering",
        icon: "/assets/icons/system.svg",
        desc: `Take a journey into the world of Internet systems designs, development,testing,deployments, maintenance and scaling and while at it, gain advanced curated technical hands-on skills in systems engineering while working on real world 
               open-source server Operating systems and multi-vendor hardware.`,
        link: "Design and Engineer System"
    },
    {
        title: "Network Engineering",
        icon: "/assets/icons/networking.svg",
        desc: `Gaining the latest Network Administration hands-on 
knowledge contributes significantly to the skills needed 
for employability and operating IP network with single ISP provider connectivity. The skills are fundamental in the establishment and operation of Local Area Networks`,
        link: "Administrator and Enterprise Network"
    },
    {
        title: "AI & Automation ",
        icon: "/assets/icons/code.svg",
        desc: `Python is one of the world’s most widely used high-level programming languages. Mastering Python strengthens problem-solving skills, boosts employability, and enables developers to build intelligent and automated systems`,
        link: "Design and Engineer System"
    }
];

// --- 2. TEMPLATE (Matches your existing CSS classes) ---
const OverviewCardTemplate = (item, index) => `
    <div class="overview-item" id="card-template">
        <div class="card border-bottom">
            <span class="card-icon">
                <img src="${item.icon}" alt="${item.title} icon">
            <h3>${item.title}</h3>

            </span>
            <p>${item.desc}</p>
            <a href="" class="overview-link">${item.link}</a>
        </div>
    </div>
`;

// --- 3. INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    RenderEngine.load('overview-grid-container', overviewData, OverviewCardTemplate);
});