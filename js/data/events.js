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
        status: "Open",
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
];