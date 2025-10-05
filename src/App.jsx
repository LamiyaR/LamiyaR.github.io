import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Crown, Stars, Mail, Github, Linkedin, Instagram, Facebook, Twitter,
  Award, PenTool, GraduationCap, Briefcase, Phone, BookText, Newspaper,
  Sparkles, Camera, Layers, Megaphone, MousePointer2,
} from "lucide-react";

// === THEME (keep colors) ===
const CHERRY = "#530113ff";
const INK = "#0a0a0a";
const IVORY = "#ffffff";

// === MICRO COPY ===
const quotes = [
  "Rumors fade. Results don't.",
  "Make it elegant. Make it measurable.",
  "Beautiful UI, disciplined models.",
  "Shipping > grandstanding.",
  "Data tells the story. I write the headline.",
];

const ribbonStyle = { background: IVORY, color: CHERRY, border: `1px solid ${CHERRY}` };

// === REUSABLES ===
const Seal = ({ href, label, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group relative flex items-center gap-2 px-4 py-2 rounded-full border-2 text-white hover:bg-white transition-colors"
    style={{ borderColor: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.08)", color: "white" }}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm font-semibold tracking-wide">{label}</span>
    <span className="absolute inset-0 rounded-full ring-2 ring-white/0 group-hover:ring-white/30 transition" />
  </a>
);

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);
  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px);
    y.set(py);
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`rounded-3xl border bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-[0_40px_80px_rgba(192,0,42,0.35)] transition-shadow ${className}`}
    >
      <div className="p-6 md:p-10" style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
}

function ParallaxLayer({ speed = 0.2, children }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 30 * speed;
      const ny = (e.clientY / window.innerHeight - 0.5) * 30 * speed;
      setOffset({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [speed]);
  return (
    <div style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }} className="pointer-events-none">{children}</div>
  );
}

const Quote = ({ children }) => (
  <div className="text-center italic text-sm md:text-base text-white/90">“{children}”</div>
);

// === NEW: scroll progress bar ===
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setP(scrolled);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60]">
      <div className="h-full" style={{ width: `${p}%`, background: IVORY }} />
    </div>
  );
}

// === APP ===
export default function App() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          `radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.06), transparent 25%), linear-gradient(180deg, ${CHERRY}, #660016)`,
      }}
    >
      <ScrollProgress />
      <div className="fixed inset-0 -z-10" style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,0.0), rgba(0,0,0,0.35))" }} />

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(0,0,0,0.2)] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6" />
            <span className="font-black tracking-[0.2em] text-sm md:text-base uppercase">LAM IYA</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm uppercase tracking-widest">
            {[
              ["About", "#about"],
              ["Education", "#education"],
              ["Experience", "#experience"],
              ["Projects", "#projects"],
              ["Publications", "#publications"],
              ["Skills", "#skills"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="hover:text-black hover:bg-white px-3 py-1 rounded-full transition">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO — magazine cover vibe */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="px-3 py-1 text-xs tracking-widest font-semibold uppercase" style={ribbonStyle}>
              SCOOP • AI • DESIGN
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95]">
              Lamiya
              <br />
              <span className="underline decoration-white/70 underline-offset-8">Rampurawala</span>
            </h1>
            <p className="text-white/90 max-w-xl">
              Machine‑learning engineer in training and full‑stack tinkerer. I architect clear interfaces and disciplined models—then glue them together into products people actually use.
            </p>
            <div className="flex flex-wrap gap-3">
              <Seal href="mailto:rampurawallamiya@gmail.com" label="Email" icon={Mail} />
              <Seal href="https://github.com/LamiyaR" label="GitHub" icon={Github} />
              <Seal href="https://www.linkedin.com/in/lamiya-rampurawala/" label="LinkedIn" icon={Linkedin} />
              <Seal href="https://www.instagram.com/lamiya.rampurawala/" label="Instagram" icon={Instagram} />
              <Seal href="https://www.facebook.com/lamiya.rampurawala.1" label="Facebook" icon={Facebook} />
              <Seal href="https://x.com/lamiya2630?s=21&t=Znx5y6bBgcC1sm8WiUZhIg" label="X / Twitter" icon={Twitter} />
            </div>
            <Quote>{quotes[0]}</Quote>
          </div>

          <div className="relative">
            <ParallaxLayer speed={0.1}>
              <div className="absolute -top-10 -right-6 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            </ParallaxLayer>
            <TiltCard>
              <div className="grid grid-cols-3 gap-3">
                <div
                  className="col-span-2 h-64 md:h-80 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-end p-4 bg-cover bg-center"
                  style={{ backgroundImage: "url('public/images/IMG_5694.jpg')" }}
                >
                  <div className="bg-black/40 px-3 py-1 rounded text-xs tracking-widest uppercase">MUMBAI → SACRAMENTO → WORLD</div>
                </div>
                <div className="h-64 md:h-80 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-2 text-center">
                  <Camera />
                  <span className="text-xs uppercase tracking-widest">Behind the Scenes</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Ticker bar */}
        <div className="border-y border-white/10 bg-white/5">
          <div className="max-w-6xl mx-auto px-6 py-2 overflow-hidden">
            <div className="whitespace-nowrap" style={{ animation: "marquee 28s linear infinite" }}>
              <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
              <span className="mr-10 inline-flex items-center gap-2 text-xs tracking-widest uppercase opacity-90">
                <Megaphone className="w-4 h-4"/> Available for ML/AI internships & research • React • TensorFlow • PyTorch • Flask • MongoDB • AWS • GCP
              </span>
              <span className="mr-10 inline-flex items-center gap-2 text-xs tracking-widest uppercase opacity-90">
                <Stars className="w-4 h-4"/> Pancreas/Tumor segmentation paper (IJARSCT) • Real‑time CT inference ~9s/scan • DICOM/NIfTI platform
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 items-stretch">
          <TiltCard>
            <div className="space-y-4 h-full flex flex-col justify-between min-h-[360px]">
              <div className="space-y-4">
                <h2 className="text-3xl font-black flex items-center gap-2">
                  <PenTool /> About Me
                </h2>
                <p className="opacity-90">
                  I’m Lamiya—part pattern‑spotter, part product polisher. My sweet spot is the boundary between model outputs and human intuition: fast experiments, clean data stories, and UIs that don’t fight back.
                </p>
                <p className="opacity-90">
                  Recently I’ve been prototyping healthcare CV, building tiny tools that summarize numbers like headlines, and stress‑testing ideas until they ship.
                </p>
              </div>
              <Quote>{quotes[1]}</Quote>
            </div>
          </TiltCard>

          <TiltCard>
            <div>
              <h3 className="text-2xl font-extrabold flex items-center gap-2">
                <Award /> Fast Facts
              </h3>
              <ul className="space-y-2 mt-3 opacity-90 list-disc list-inside">
                <li>Paper in IJARSCT on early pancreatic tumor detection</li>
                <li>Core/TA for ML & Cloud academies; hackathon organizer</li>
                <li>Fluent in Python/TF/Keras/OpenCV + React/Flask/Mongo</li>
              </ul>
              <div className="mt-4 text-xs opacity-75">Source: résumé details (courses, roles, and tools). fileciteturn1file0</div>
            </div>
          </TiltCard>

          <TiltCard>
            <div className="space-y-4 h-full flex flex-col justify-between min-h-[360px]">
              <div>
                <h3 className="text-2xl font-extrabold flex items-center gap-2"><Layers /> Focus Areas</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Computer Vision", "NLP", "Modeling", "Full‑Stack", "Analytics", "MLOps"].map((t) => (
                    <span key={t} className="px-2 py-1 rounded-full bg-white text-xs font-bold" style={{ color: CHERRY }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Quote>{quotes[2]}</Quote>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-black flex items-center gap-3"><GraduationCap className="w-7 h-7" /> Education</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TiltCard>
              <h3 className="text-2xl font-extrabold">California State University, Sacramento</h3>
              <p className="opacity-90">M.S. Computer Science — AI specialization (in progress)</p>
              <p className="opacity-70 text-sm">Target: May 2027</p>
              <p className="opacity-90 mt-2 text-sm">Selected topics: Data Mining, AI & DS, DBMS, Software Engineering, IoT, Big Data, Blockchain. fileciteturn1file0</p>
            </TiltCard>
            <TiltCard>
              <h3 className="text-2xl font-extrabold">University of Mumbai</h3>
              <p className="opacity-90">B.Tech. in Information Technology</p>
              <p className="opacity-70 text-sm">May 2025</p>
              <p className="opacity-90 mt-2 text-sm">Graduated with first‑class distinction. fileciteturn1file0</p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-black flex items-center gap-3"><Briefcase className="w-7 h-7" /> Experience</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TiltCard>
              <h3 className="text-2xl font-extrabold">AL Hatimi — ML Developer Intern</h3>
              <p className="opacity-90">Dubai, UAE • Apr 2024 – Dec 2024</p>
              <ul className="list-disc list-inside opacity-90 mt-2 space-y-1">
                <li>Built a numbers‑to‑narrative assistant for financials (React, MongoDB, Python)</li>
                <li>Added instant, one‑line briefings—manual reviews dropped dramatically</li>
                <li>Partnered with non‑dev teams to smooth rollout and boost adoption</li>
              </ul>
              <p className="opacity-70 text-xs mt-2">Based on résumé metrics (+60% efficiency, −70% effort, +40% adoption). fileciteturn1file0</p>
            </TiltCard>
            <TiltCard>
              <h3 className="text-2xl font-extrabold">Heuristic Academy — Data Analyst Intern</h3>
              <p className="opacity-90">Mumbai, India • Aug 2023 – Mar 2024</p>
              <ul className="list-disc list-inside opacity-90 mt-2 space-y-1">
                <li>Wrangled, visualized, and debated data until the signals were obvious</li>
                <li>Built dashboards and quick studies in Python, Power BI, and Tableau</li>
                <li>Used ML to trim false alarms and highlight what matters</li>
              </ul>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* PROJECTS — "Case Files" */}
      <section id="projects" className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-black flex items-center gap-3"><Newspaper className="w-7 h-7" /> Case Files (Projects)</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              tag: "FEATURE",
              title: "AI‑Assisted Pancreatic Cancer Detection",
              dek: "3D U‑Net + ViT pipeline with ~9s/scan inference; Dice 94%/91%; secure web app with DICOM/NIfTI + role‑based access.",
              link: "#",
            }, {
              tag: "SURVEILLANCE",
              title: "Spector — Watchful AI",
              dek: "YOLOv8 + Haar Cascade; tracks 50+ people/frame at 30 FPS; 94% detection, 92% gender precision; fairness tweaks cut false positives.",
              link: "#",
            }, {
              tag: "PLATFORM",
              title: "Novella Nest — Book Web App",
              dek: "Django + Channels + TensorFlow recs; live chat and social hooks for readers and authors.",
              link: "#",
            }].map((p, i) => (
              <TiltCard key={i}>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-white text-[10px] font-black tracking-widest uppercase" style={{ color: CHERRY }}>
                    {p.tag}
                  </span>
                  <span className="text-xs opacity-75">Case #{i + 1}</span>
                </div>
                <h3 className="mt-4 text-2xl font-extrabold leading-tight">{p.title}</h3>
                <p className="opacity-90 mt-2">{p.dek}</p>
                <a
                  href={p.link}
                  className="inline-flex items-center gap-2 mt-4 underline decoration-white/60 underline-offset-4 hover:text-black hover:bg-white px-3 py-1 rounded-full transition"
                >
                  Read Notes <MousePointer2 className="w-4 h-4" />
                </a>
              </TiltCard>
            ))}
          </div>
          <br />
          <Quote>{quotes[4]}</Quote>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section id="publications" className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <h2 className="text-4xl font-black flex items-center gap-3">
            <BookText className="w-7 h-7" /> Paper Publications
          </h2>
          <TiltCard>
            <div className="grid md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-3 space-y-2">
                <h3 className="text-2xl font-extrabold">AI‑Assisted Early Detection of Pancreatic Cancer (IJARSCT, Sep 2025)</h3>
                <p className="opacity-90">3D U‑Net + ViT hybrid; Dice 94%/91%; 99.4% accuracy; ~9s per scan; secure web platform with DICOM/NIfTI support.</p>
              </div>
              <div className="md:col-span-2">
                <a
                  href="https://doi.org/10.48175/IJARSCT-28960"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl bg-white text-center font-extrabold transition hover:bg-black hover:text-white"
                  style={{ color: CHERRY }}
                >
                  DOI: 10.48175/IJARSCT-28960
                </a>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <h2 className="text-4xl font-black flex items-center gap-3"><Sparkles className="w-7 h-7" /> Skills</h2>
        
          <TiltCard>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-extrabold mb-2">Languages</h4>
                <p>Python, SQL, Java, C, JavaScript, HTML/CSS</p>
              </div>
              <div>
                <h4 className="font-extrabold mb-2">ML & CV</h4>
                <p>DL, CV, NLP, CNNs, ViTs, YOLOv8, Haar Cascade</p>
              </div>
              <div>
                <h4 className="font-extrabold mb-2">Data & Cloud</h4>
                <p>Pandas, NumPy, Matplotlib, Tableau, Power BI, AWS, GCP</p>
              </div>
              <div>
                <h4 className="font-extrabold mb-2">Frameworks</h4>
                <p>TensorFlow, Keras, PyTorch, Django, Flask, React, Node</p>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <TiltCard>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-black mb-2">Let’s Make Headlines</h2>
                <p className="opacity-90">If it’s ambitious, audacious, or just fabulous — I want to hear it.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Seal href="mailto:rampurawallamiya@gmail.com" label="Email" icon={Mail} />
                  <Seal href="https://github.com/LamiyaR" label="GitHub" icon={Github} />
                  <Seal href="https://www.linkedin.com/in/lamiya-rampurawala/" label="LinkedIn" icon={Linkedin} />
                </div>
              </div>
              <form action="https://formspree.io/f/yourFormID" method="POST" className="space-y-3">
                <input type="text" name="name" required placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none" />
                <input type="email" name="email" required placeholder="Your Email" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none" />
                <textarea name="message" rows={4} required placeholder="Your Message" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none" />
                <button className="px-5 py-3 rounded-xl bg-white font-black uppercase tracking-widest" style={{ color: CHERRY }}>Send Rumor</button>
              </form>
            </div>
          </TiltCard>
          <div className="text-center text-xs opacity-70 mt-6">Designed with scandal, shipped with love. © {new Date().getFullYear()} Lamiya.</div>
        </div>
      </section>
    </div>
  );
}
