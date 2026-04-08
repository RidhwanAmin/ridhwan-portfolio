export const SITE = {
  website: "https://ridhwan.dev",
  author: "Ridhwan Amin",
  profile: "https://ridhwan.dev",
  desc: "AI/ML researcher at UTP. I build seismic inpainting models, anomaly detection systems, and hybrid RAG pipelines.",
  title: "Ridhwan Amin — AI/ML Researcher",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/RidhwanAmin/ridhwan-portfolio/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "Asia/Kuala_Lumpur",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/RidhwanAmin",
  linkedin: "https://linkedin.com/in/ridhwanamin",
  email: "mailto:ridhwan@ridhwan.dev",
  substack: "https://ridhwanamin.substack.com",
} as const;

export const NAV_LINKS = [
  { label: "Projects", href: "#projects", section: true },
  { label: "About", href: "#about", section: true },
  { label: "Blog", href: "/blog", section: false },
  { label: "Services", href: "/services", section: false },
  { label: "Contact", href: "#contact", section: true },
] as const;
