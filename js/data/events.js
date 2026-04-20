const EVENTS_DATA = [
    {
        id: 1, 
        category: "WORKSHOP", 
        title: "Elevator Pitching",
        date: "12", 
        month: "DEC", 
        year: 2025, 
        time: "18:00 - 20:00",
        location: "AUEB TROIAS BUILDING 101-102",
        status: "Completed",
        // Using the image you provided
        image: "assets/thumbnails/uni_students.jpg",
        
        description: `
            <p>How do you sell a startup idea in under 60 seconds? In our third event, SpeakUP joined forces with the UniStudents team to master the art of the Elevator Pitch.</p>
            <p>We moved beyond theory with two practical pitching simulations where participants had to pitch a startup concept under time pressure.</p>
            <p>Under the guidance of <strong>Nikos Sklavounos</strong> (Founder) and <strong>Angelos Kleniatis</strong> (Partnerships Manager), students learned to distill complex business ideas into clear, persuasive hooks.</p>
            <p>The session focused on the "how-to" of professional delivery, providing everyone with personalized feedback and the confidence to present their goals in any high-stakes environment.</p>
        `,
        speakers: [
            { name: "Nikos Sklavounos", role: "Founder, UniStudents" },
            { name: "Angelos Kleniatis", role: "Partnerships Manager" }
        ],
        highlights: [
            "Practical Pitching Simulations",
            "Personalized Feedback",
            "Networking with UniStudents Team"
        ]
    },
    {
        id: 2, 
        category: "CONVERSATION", 
        title: "You vs You",
        date: "11", 
        month: "NOV", 
        year: 2025, 
        time: "18:00 - 20:00",
        location: "47 Evelpidon, Athens 113 62",
        status: "Completed",
        image: "assets/thumbnails/kintzios.jpg",
        
        description: `
            <p>Communication isn't just about how you speak to others; it’s about the internal dialogue you have with yourself.</p>
            <p>For this SpeakUP event, <strong>Konstantinos Kintzios</strong> (Business Mentor) joined us for an honest conversation on personal evolution and discipline. Rather than a traditional lecture, the evening was a deep dive into the habits that bridge the gap between who we are and who we want to become.</p>
            <p>The energy was electric as students shared their own journeys and connected over the shared goal of long-term self-investment.</p>
        `,
        speakers: [
            { name: "Konstantinos Kintzios", role: "Business Mentor" }
        ],
        highlights: [
            "Internal Dialogue Mastery",
            "Interactive Discussion",
            "Community Networking"
        ]
    },
    {
        id: 3,
        category: "WORKSHOP",
        title: "Negotiation Skills & Deal Strategy",
        date: "27",
        month: "FEB",
        year: 2026,
        time: "18:00 - 21:00",
        location: "AUEB TROIAS BUILDING 201-202",
        status: "Completed",
        image: "assets/thumbnails/negotiations.jpg",

        description: `
            <p>Negotiations are not talent — they are a toolkit of skills.</p>
            <p>In this next SpeakUP event, we enter the world of negotiation thinking, deals, and strategy, launching our collaboration with <strong>Mercury Negotiation Academy (MNA)</strong>.</p>
            <p>Join a unique learning experience led by expert speakers with multidimensional professional experience.</p>
            <p>If you want to learn how to develop and apply your negotiation skills to close successful agreements, this session is for you.</p>
        `,
        speakers: [
            { name: "Pantelis Nikolopoulos", role: "Co-founder, MNA" },
            { name: "Maria Andrikopoulou", role: "Head of Education Team, MNA" },
            { name: "Antonis Petris", role: "Member of Education Team, MNA" }
        ],
        highlights: [
            "Negotiation Thinking Frameworks",
            "Deals and Strategy in Practice",
            "Applied Skill Development"
        ],
        registration_link: "https://docs.google.com/forms/d/e/1FAIpQLScSeJ77MbL-g2g-EVp2RHGCDGZxJG2QHGCh8r2rYgcLIJ_RUg/viewform"
    },
    {
        id: 4,
        category: "KEYNOTE",
        title: "Interview Performance & Professional Presence",
        date: "19",
        month: "MAR",
        year: 2026,
        time: "18:00 - 21:00",
        location: "AUEB TROIAS BUILDING 201-202",
        status: "Completed",
        image: "assets/thumbnails/ICCpwc.PNG",
        description: `
            <p>Interviews are not just a conversation — they are a strategic bridge to your career.</p>
            <p>In this next SpeakUP event, we dive deep into the art of interview performance and professional presence, launching our collaboration with PwC Greece.</p>
            <p>Join a unique learning experience led by senior recruiters and career experts with extensive experience in scouting top-tier talent.</p>
            <p>If you want to master the skills needed to communicate your value effectively and navigate the modern recruitment landscape with confidence, this keynote session is for you.</p>
        `,
        speakers: [
            { name: "Sofi Kleitsa", role: "Speaker" },
            { name: "Varvara Mantzouranaki", role: "Speaker" }
        ],
        highlights: [
            "Interview Performance",
            "Professional Presence",
            "Navigating Recruitment"
        ],
        registration_link: "https://docs.google.com/forms/d/e/1FAIpQLSfUUv8NKp_cB1eszdN_Ze9Se8bIROj7NC_rr95fcGumDrjeSw/viewform?usp=sharing&ouid=103392271645623493544"
    },
    {
        id: 5,
        category: "KEYNOTE",
        title: "Stage Presence: Command the Room, Lead the Conversation",
        date: "24",
        month: "APR",
        year: 2026,
        time: "18:00 - 21:00",
        location: "AUEB TROIAS BUILDING 102",
        status: "Upcoming",
        image: "assets/thumbnails/SP.png",
        description: `
            <p>Public speaking and professional standing are not just about what you say; they are about how you inhabit the space and hold your audience's attention.</p>
            <p>In this upcoming SpeakUP event, we explore the art of Stage Presence and the power of impactful communication. We are honored to host a high-level discussion with two of the most influential figures in the Greek maritime and exhibition sectors: <strong>Mr. Theodore Vokos</strong> (Managing Director, Posidonia Exhibitions) and <strong>Ms. Danae Bezantakou</strong> (CEO, Navigator Shipping Consultants &amp; Founder, YES Forum).</p>
            <p>Join us for a unique keynote session where industry leaders share their secrets on how to project confidence, influence stakeholders, and master the "stage" — whether that is a boardroom, a podium, or a global summit.</p>
            <p>If you want to move beyond simple presenting and start truly commanding the room, this session is for you.</p>
        `,
        speakers: [
            { name: "Theodore Vokos", role: "Managing Director, Posidonia Exhibitions" },
            { name: "Danae Bezantakou", role: "CEO, Navigator Shipping Consultants & Founder, YES Forum" }
        ],
        highlights: [
            "The Power of Presence",
            "Body Language & Delivery",
            "Leadership Communication",
            "Confidence Under Pressure"
        ]
    }
];