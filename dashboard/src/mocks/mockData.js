// src/mocks/data.js
export const mockCommittee = [
  {
    id: "mem_a7e1c3f4",
    name: "Alice Johnson",
    role: "President",
    pastCommittee: false,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    linkedin: "https://linkedin.com/in/alicejohnson",
    github: "https://github.com/alicejohnson",
    years: ["2024-2025"]
  },
  {
    id: "mem_b6f4d2a9",
    name: "Ben Smithyyyyyyyyyyyy",
    role: "Committee",
    pastCommittee: false,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedin: "https://linkedin.com/in/bensmith",
    years: ["2024-2025", "2022-2023"]
  },
  {
    id: "mem_c3a9e8d7",
    name: "Carla Lopez",
    role: "Committee",
    pastCommittee: false,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    instagram: "https://instagram.com/carla.codes",
    years: ["2022-2023"]
  },
  {
    id: "mem_d9e2b7f6",
    name: "David Kim",
    role: "Web Developer",
    pastCommittee: false,
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    github: "https://github.com/davidkdev",
    linkedin: "https://linkedin.com/in/davidkim",
    years: ["2023-2024"]
  },
  {
    id: "mem_e4f1c5b8",
    name: "Emma Patel",
    role: "Design & Marketing",
    pastCommittee: false,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    instagram: "https://instagram.com/emmadesigns",
    yearss: ["2024-2025"]
  }
];


export const mockEvents = {
  upcomingEvents: [
    {
      id: "evt_6f32b9a2",
      title: "HackSussex 20253",
      date: "2025-11-22T09:00:00Z",
      location: "University of Sussex, Falmer",
      description: "Join us for 24 hours of coding, creativity, and collaboration at our annual hackathon.",
      logo: "/images/events/gameJam2025/logo.png",
      image: "/images/events/gameJam2025/background.jpg",
      ticketsLink: "https://tickets.hacksussex.com/GameJam2025/",
      tags: ["Hackathon", "In-Person", "Free"],
      sponsors: [
        "spn_1f3d9b7c",
        "spn_2b8c4a6d",
        "spn_3e7a1d9f",
        "spn_5c7d2a1b",
        "spn_6f9d1e2c",
        "spn_7b3f2a4e"
      ],
      eventType: "Hackathon"
    }
  ],
  pastEvents: [
    {
      id: "evt_9a47c1e5",
      title: "HackSussex 2024",
      date: "2024-11-20T09:00:00Z",
      location: "University of Sussex, Falmer",
      description: "Over 200 hackers came together for a weekend of innovation and teamwork, building impactful projects.",
      logo: "/images/events/gameJam2025/logo.png",
      image: "/images/events/gameJam2025/background.jpg",
      ticketsLink: "https://hacksussex.com/archive/2024",
      tags: ["Hackathon", "In-Person"],
      sponsors: ["spn_2b8c4a6d", "spn_3e7a1d9f"],
      eventType: "Hackathon"
    },
    {
      id: "evt_5b62e3d8",
      title: "Intro to AI Workshop",
      date: "2024-09-12T17:00:00Z",
      location: "Room 3A / Online",
      description: "A beginner-friendly session introducing AI concepts and hands-on exercises using open-source tools.",
      logo: "/images/events/gameJam2025/logo.png",
      image: "/images/events/gameJam2025/background.jpg",
      ticketsLink: "https://hacksussex.com/archive/ai-workshop",
      tags: ["Workshop", "Beginner Friendly"],
      sponsors: ["spn_4a9f8c2e"],
      eventType: "Workshop"
    },
    {
      id: "evt_3c81f2b4",
      title: "Web Dev Bootcamp",
      date: "2024-04-10T17:30:00Z",
      location: "Engineering Lab, University of Sussex",
      description: "Students learned the fundamentals of HTML, CSS, and JavaScript to kickstart their web development journey.",
      logo: "/images/events/gameJam2025/logo.png",
      image: "/images/events/gameJam2025/background.jpg",
      ticketsLink: "https://hacksussex.com/archive/webdev-bootcamp",
      tags: ["Workshop"],
      sponsors: ["spn_3e7a1d9f"],
      eventType: "Workshop"
    }
  ]
};

export const mockSponsors = [
  {
    id: "spn_1f3d9b7c",
    name: "GitHub",
    logoUrl: "https://logo.svgcdn.com/logos/github.png",
    website: "https://github.com/"
  },
  {
    id: "spn_2b8c4a6d",
    name: "Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    website: "https://google.com/"
  },
  {
    id: "spn_3e7a1d9f",
    name: "DigitalOcean",
    logoUrl: "https://logo.svgcdn.com/devicon-plain/digitalocean-plain-wordmark.png",
    website: "https://digitalocean.com"
  },
  {
    id: "spn_4a9f8c2e",
    name: "AWS",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    website: "https://aws.amazon.com/"
  },
  {
    id: "spn_5c7d2a1b",
    name: "Stripe",
    logoUrl: "https://stripe.com/img/v3/home/twitter.png",
    website: "https://stripe.com/"
  },
  {
    id: "spn_6f9d1e2c",
    name: "Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    website: "https://microsoft.com/"
  },
  {
    id: "spn_7b3f2a4e",
    name: "Slack",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png",
    website: "https://slack.com/"
  }
];

export const mockSiteData = {
  x: "https://x.com/HackSussex",
  instagram: "https://instagram.com/HackSussex",
  linkedin: "https://linkedin.com/company/HackSussex",
  discord: "https://discord.com/invite/Uwsbxy8Bqf",
  tiktok: "https://www.tiktok.com/@hacksussex",
  youtube: "https://www.youtube.com/@HackSussex",
  merch: "https://hacksussex.square.site",
};

export const mockGallery = {
  codeSocials: [
    "https://picsum.photos/seed/codesocial1/400/300",
    "https://picsum.photos/seed/codesocial2/400/300",
    "https://picsum.photos/seed/codesocial3/400/300",
    "https://picsum.photos/seed/codesocial4/400/300",
    "https://picsum.photos/seed/codesocial5/400/300",
    "https://picsum.photos/seed/codesocial6/400/300"
  ],
  codersCup: [
    "https://picsum.photos/seed/coderscup1/400/300",
    "https://picsum.photos/seed/coderscup2/400/300",
    "https://picsum.photos/seed/coderscup3/400/300",
    "https://picsum.photos/seed/coderscup4/400/300",
    "https://picsum.photos/seed/coderscup5/400/300",
    "https://picsum.photos/seed/coderscup6/400/300"
  ],
  gameJam: [
    "https://picsum.photos/seed/gamejam1/400/300",
    "https://picsum.photos/seed/gamejam2/400/300",
    "https://picsum.photos/seed/gamejam3/400/300",
    "https://picsum.photos/seed/gamejam4/400/300",
    "https://picsum.photos/seed/gamejam5/400/300",
    "https://picsum.photos/seed/gamejam6/400/300"
  ],
  hackathon: [
    "https://picsum.photos/seed/hackathon1/400/300",
    "https://picsum.photos/seed/hackathon2/400/300",
    "https://picsum.photos/seed/hackathon3/400/300",
    "https://picsum.photos/seed/hackathon4/400/300",
    "https://picsum.photos/seed/hackathon5/400/300",
    "https://picsum.photos/seed/hackathon6/400/300"
  ],
  leetcoding: [
    "https://picsum.photos/seed/leetcoding1/400/300",
    "https://picsum.photos/seed/leetcoding2/400/300",
    "https://picsum.photos/seed/leetcoding3/400/300",
    "https://picsum.photos/seed/leetcoding4/400/300",
    "https://picsum.photos/seed/leetcoding5/400/300",
    "https://picsum.photos/seed/leetcoding6/400/300"
  ],
  misc: [
    "https://picsum.photos/seed/misc1/400/300",
    "https://picsum.photos/seed/misc2/400/300",
    "https://picsum.photos/seed/misc3/400/300",
    "https://picsum.photos/seed/misc4/400/300",
    "https://picsum.photos/seed/misc5/400/300",
    "https://picsum.photos/seed/misc6/400/300"
  ],
  pawnSussex: [
    "https://picsum.photos/seed/pawnsussex1/400/300",
    "https://picsum.photos/seed/pawnsussex2/400/300",
    "https://picsum.photos/seed/pawnsussex3/400/300",
    "https://picsum.photos/seed/pawnsussex4/400/300",
    "https://picsum.photos/seed/pawnsussex5/400/300",
    "https://picsum.photos/seed/pawnsussex6/400/300"
  ],
  robotics: [
    "https://picsum.photos/seed/robotics1/400/300",
    "https://picsum.photos/seed/robotics2/400/300",
    "https://picsum.photos/seed/robotics3/400/300",
    "https://picsum.photos/seed/robotics4/400/300",
    "https://picsum.photos/seed/robotics5/400/300",
    "https://picsum.photos/seed/robotics6/400/300"
  ]
};
