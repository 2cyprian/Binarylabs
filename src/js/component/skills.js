
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
        desc: "Obtaining hands-on knowledge around Open Source Operating Systems Internals contribute significantly to skills needed for employability.",
        link: "Become A Linux Guru" // <--- Add your link here
    },
    {
        title: "System Engineering",
        icon: "/assets/icons/system.svg",
        desc: "Take a journey into the world of Internet systems designs, development, testing, deployments, maintenance and scaling.",
        link: "Design and Engineer System"
    },
    {
        title: "Network Engineering",
        icon: "/assets/icons/networking.svg",
        desc: "Gaining the latest Network Administration hands-on knowledge contributes significantly to the skills needed for employability.",
        link: "Administrator and Enterprise Network"
    },
    {
        title: "DevOps Engineering",
        icon: "/assets/icons/code.svg",
        desc: "The Python has become one of the most sough high-level programming languages in the world and learning to write code.",
        link: "Design and Engineer System"
    }
];

// --- 2. TEMPLATE (Matches your existing CSS classes) ---
const OverviewCardTemplate = (item, index) => `
    <!-- Changed div to 'a' to make it clickable, added inline style to reset link colors -->
        <div class="overview-item"  id="card-template">
        <!-- Decorative Back Card -->
      
        
   
        <div class="card  ${index % 2 === 0 ? 'border-bottom' : 'border-top'}">
            <span class="card-icon">
            <img src="${item.icon}" alt="${item.title} icon">

            </span>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
    <a href="" class="overview-link">${item.link}</a>

        </div>
        </div>
        
    
`;

// --- 3. INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    RenderEngine.load('overview-grid-container', overviewData, OverviewCardTemplate);
});