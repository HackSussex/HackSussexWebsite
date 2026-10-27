import { FaCode, FaGamepad, FaTrophy, FaLaptopCode } from "react-icons/fa";

import Hackathons from "../../../assets/gallery/IMG_1398.jpg";
import GameJams from "../../../assets/gallery/IMG_1399.jpg";
import Workshops from "../../../assets/gallery/IMG_1394.jpg";
import CodersCup from "../../../assets/gallery/codersCup_kf3z4x.jpg";

const messages = {
  pageTitle: "Our most popular events",
  description: "Check out some of our most popular events",
  ctaButton: "Give Feedback",
  eventTypes: [
    {
      id: "hackathons",
      icon: FaLaptopCode,
      image: Hackathons,
      title: "Hackathons",
      description:
        "High-energy weekend events where teams build innovative projects from scratch.",
    },
    {
      id: "gamejams",
      icon: FaGamepad,
      image: GameJams,
      title: "Game Jams",
      description:
        "Create games under time pressure with unique themes and challenges.",
    },
    {
      id: "pwnsussex",
      icon: FaCode,
      image: Workshops,
      title: "PwnSussex",
      description:
        "Hands-on learning events led by industry professionals and experienced mentors.",
    },
    {
      id: "coderscup",
      icon: FaTrophy,
      image: CodersCup,
      title: "Coder’s Cup",
      description:
        "Competitive programming challenges designed to test problem-solving skills.",
    },
  ],
};

export default messages;
