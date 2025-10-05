import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  Crown, Mail, Github, Linkedin, ExternalLink, ArrowRight, BookText, Briefcase, GraduationCap, Sparkles,
} from "lucide-react";

/**
 * Lamiya Rampurawala — Royal/Journalistic Portfolio
 * Framework: React + Tailwind + Framer Motion + Lucide
 * Design goals: bold editorial layout, navy & white palette, high contrast, subtle micro‑interactions.
 * Accessibility: semantic elements, aria labels, reduced‑motion guardrails, alt text, focus states.
 * Notes: Replace image src paths and Formspree ID before deploying.
 */

// === THEME ===
const NAVY = "#0b1a3a";        // deep navy primary
const NAVY_SOFT = "#0d214f";   // section bg blocks
const WHITE = "#ffffff";       // base text on dark
const OFFWHITE = "#f7f7f2";    // paper tint for cards
const GOLD = "#d3b25a";        // subtle regal accent (sparingly)

// === UTILS ===
function classNames(...c) { return c.filter(Boolean).join(" "); }

// Reduced motion preference
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);
    const handler = (e) => setPrefers(e.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => (mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler));
  }, []);
  return prefers;
}

// === MICRO COMPONENTS ===
const Seal = ({ href, label, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80"
    style={{ borderColor: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)", color: WHITE }}
    aria-label={label}
  >
    <Icon className="w-4 h-4" aria-hidden="true" />
    <span className="text-sm font-semibold tracking-wide">{label}</span>
    <span className="absolute inset-0 rounded-full ring-2 ring-white/0 group-hover:ring-white/30 transition" aria-hidden="true" />
  </a>
);

function TiltCard({ children, className = "", padding = "p-6 md:p-8" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);
  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px); y.set(py);
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", background: OFFWHITE }}
      className={classNames("rounded-3xl border shadow-xl border-white/20", className)}
      role="region"
    >
      <div className={padding} style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
}

function RevealHeadline({ kicker, title, subtitle }) {
  return (
    <header className="space-y-3">
      {kicker && (
        <span className="px-3 py-1 text-[10px] tracking-[0.25em] font-extrabold uppercase inline-block rounded-full" style={{ color: NAVY, background: WHITE }}>
          {kicker}
        </span>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[clamp(2.4rem,5vw,4.8rem)] font-serif font-black leading-[0.95]"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p className="text-white/90 max-w-2xl font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}

function ProjectCard({ tag, title, repo, demo, img, alt, stack, highlights, story }) {
  const [open, setOpen] = useState(false);
  return (
    <TiltCard className="bg-white text-[rgba(0,0,0,0.85)]">
      <div className="flex items-start justify-between gap-4">
        <span className="px-2 py-1 bg-[rgba(11,26,58,0.08)] text-[10px] font-black tracking-widest uppercase rounded" style={{ color: NAVY }}>{tag}</span>
        <span className="text-xs text-[rgba(0,0,0,0.55)]">Case • {stack.join(" · ")}</span>
      </div>
      <h3 className="mt-3 text-2xl font-extrabold leading-snug font-serif" style={{ color: NAVY }}>{title}</h3>

      {img && (
        <img src={img} alt={alt} loading="lazy" className="mt-4 w-full h-52 object-cover rounded-xl border border-black/5" />
      )}

      <ul className="list-disc list-inside mt-4 space-y-1 text-sm">
        {highlights.map((h, i) => <li key={i}>{h}</li>)}
      </ul>

      <div className="flex flex-wrap gap-3 mt-4">
        {repo && (
          <a href={repo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 underline decoration-[rgba(11,26,58,0.3)] underline-offset-4 hover:no-underline">
            <Github className="w-4 h-4" aria-hidden="true" /> Repo <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 underline decoration-[rgba(11,26,58,0.3)] underline-offset-4 hover:no-underline">
            Live Demo <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
        <button
          onClick={() => setOpen((s) => !s)}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(11,26,58,0.08)] hover:bg-[rgba(11,26,58,0.14)] focus-visible:ring-2 focus-visible:ring-[rgba(11,26,58,0.35)]"
          aria-expanded={open}
          aria-controls={`story-${title}`}
        >
          Behind the scenes <ArrowRight className={classNames("w-4 h-4 transition-transform", open && "rotate-90")} aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`story-${title}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-4 border-t pt-4 text-[0.95rem]"
          >
            {story}
          </motion.div>
        )}
      </AnimatePresence>
    </TiltCard>
  );
}

function Divider() {
  return <hr className="border-white/15" aria-hidden="true" />;
}

// === APP ===
export default function App() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{
        background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_SOFT} 100%)`,
      }}
    >
      {/* Skip link for accessibility */}
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-black px-3 py-2 rounded">Skip to content</a>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/20 bg-black/10 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6" aria-hidden="true" />
            <span className="font-serif font-black tracking-[0.18em] text-sm md:text-base uppercase">LAMIYA RAMPURAWALA</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm uppercase tracking-widest" aria-label="Primary">
            {[
              ["Projects", "#projects"],
              ["Experience", "#experience"],
              ["Education", "#education"],
              ["Skills", "#skills"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="hover:text-black hover:bg-white px-3 py-1 rounded-full transition focus-visible:ring-2 focus-visible:ring-white/70">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="content" className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <section className="grid md:grid-cols-[1.2fr,0.8fr] gap-8 items-center pt-12 pb-12">
          <RevealHeadline
            kicker="AI • ENGINEERING • PRODUCT"
            title={<>
              Crafting <span className="underline decoration-white/70 underline-offset-[10px]">Digital Empires</span>
              <br /> with measured ambition.
            </>}
            subtitle={<>
              I’m a machine‑learning engineer in training and full‑stack tinkerer. I build disciplined models, wrap them in elegant interfaces, and ship tools that help teams decide faster.
            </>}
          />
          <TiltCard className="bg-[rgba(255,255,255,0.06)] border-white/10" padding="p-6">
            <div className="space-y-4">
              <p className="text-sm text-white/85">
                Recently: an AI‑driven financial briefing assistant, a 3D U‑Net/ViT pipeline for early pancreatic‑tumor detection, and a real‑time surveillance system that hits 30 FPS on commodity hardware.
              </p>
              <div className="flex flex-wrap gap-3">
                <Seal href="mailto:rampurawallamiya@gmail.com" label="Email" icon={Mail} />
                <Seal href="https://github.com/LamiyaR" label="GitHub" icon={Github} />
                <Seal href="https://www.linkedin.com/in/lamiya-rampurawala/" label="LinkedIn" icon={Linkedin} />
              </div>
              <p className="text-[11px] text-white/60">
                Based in Sacramento • Open to ML/AI internships & research collaborations
              </p>
            </div>
          </TiltCard>
        </section>

        {/* Projects */}
        <section id="projects" className="py-8">
          <div className="flex items-center gap-3 mb-6">
            <BookText className="w-6 h-6" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-serif font-black">Case Files</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ProjectCard
              tag="FEATURE"
              title="AI‑Assisted Pancreatic Cancer Detection"
              repo="https://github.com/LamiyaR/pancreatic-cancer-early-detection"
              demo="#"
              img="/images/pancreas_ui.png"
              alt="Screenshot of the medical imaging web app showing CT scan slices and segmentation overlays"
              stack={["3D U‑Net", "ViT", "TensorFlow", "Flask", "React", "MongoDB", "DICOM/NIfTI"]}
              highlights={[
                "Dice 94% (pancreas), 91% (tumor); ~9 s/scan on A100.",
                "SSL/TLS, role‑based clinician access, and audit trails.",
              ]}
              story={
                <p>
                  This began as a question from a clinician mentor: <em>Could we surface subtle T1b tumors without contrast?</em> The first iterations
                  over‑segmented around vessels. A simple fix failed, so I added vessel‑aware augmentations and a ViT block to stabilize context.
                  False positives dropped, and with a tiling strategy + mixed precision, inference fell under 10 seconds per scan.
                </p>
              }
            />
            <ProjectCard
              tag="SURVEILLANCE"
              title="Spector — Watchful AI"
              repo="https://github.com/LamiyaR/spector-watchful-ai"
              demo="#"
              img="/images/spector.png"
              alt="Dashboard screenshot with multiple tracked individuals and FPS counter"
              stack={["YOLOv8", "Haar", "OpenCV", "TensorFlow‑Keras"]}
              highlights={[
                "Tracks 50+ people/frame at 30 FPS on CPU.",
                "94% detection, 92% gender precision after fairness tweaks.",
              ]}
              story={
                <p>
                  Started as a campus safety hackathon idea. The hard part wasn’t the model—it was <em>trust</em>. Misclassifications created noise, so I
                  introduced demographic‑balanced sampling and threshold calibration sessions with users. The result: 28% fewer false positives and
                  a UI that flags uncertainty rather than pretending it’s certain.
                </p>
              }
            />
            <ProjectCard
              tag="PLATFORM"
              title="Novella Nest — Book Web App"
              repo="https://github.com/LamiyaR/novella-nest"
              demo="#"
              img="/images/novella.png"
              alt="Novel platform interface with chat panel and recommendation carousel"
              stack={["Django", "Channels", "TensorFlow", "SQLite", "Bootstrap"]}
              highlights={[
                "24/7 live community chat with Channels.",
                "Personalized recs via TF embeddings and clickstream signals.",
              ]}
              story={
                <p>
                  I wanted a place where readers and authors could meet without friction. The first recommender pushed popular titles; it felt boring.
                  After instrumenting lightweight events and training embeddings on user–book interactions, session depth rose and chat rooms felt
                  alive. A fun touch: bot‑curated weekly reading clubs seeded by trending themes.
                </p>
              }
            />
          </div>
        </section>

        <Divider />

        {/* Experience + Education */}
        <section id="experience" className="py-8 grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4"><Briefcase className="w-6 h-6" aria-hidden="true" /><h2 className="text-3xl font-serif font-black">Experience</h2></div>
            <TiltCard className="bg-[rgba(255,255,255,0.06)] border-white/10">
              <h3 className="text-xl font-serif font-extrabold">ML Developer Intern — AL Hatimi</h3>
              <p className="text-white/80 text-sm">Dubai, UAE • Apr 2024 – Dec 2024</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>AI‑driven financial analysis assistant (React, MongoDB, Python) that increased throughput by ~60%.</li>
                <li>“One‑line briefing” feature cut manual triage by ~70% and nudged 40% greater adoption across teams.</li>
                <li>Worked with finance stakeholders to tune prompts + thresholds so outputs aligned with human judgment.</li>
              </ul>
            </TiltCard>
            <div className="mt-4">
              <TiltCard className="bg-[rgba(255,255,255,0.06)] border-white/10">
                <h3 className="text-xl font-serif font-extrabold">Data Analyst Intern — Heuristic Academy</h3>
                <p className="text-white/80 text-sm">Mumbai, India • Aug 2023 – Mar 2024</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Wrangled messy datasets; built dashboards in Python/Power BI/Tableau to surface signals.</li>
                  <li>Applied ML to trim false alarms and spotlight high‑leverage variables for decision makers.</li>
                </ul>
              </TiltCard>
            </div>
          </div>
          <div id="education">
            <div className="flex items-center gap-3 mb-4"><GraduationCap className="w-6 h-6" aria-hidden="true" /><h2 className="text-3xl font-serif font-black">Education</h2></div>
            <TiltCard className="bg-white text-[rgba(0,0,0,0.85)]">
              <h3 className="text-xl font-serif font-extrabold">California State University, Sacramento</h3>
              <p className="text-[13px]">M.S. Computer Science — AI specialization (in progress) • Target: May 2027</p>
              <p className="text-[12px] opacity-70 mt-1">Selected topics: Data Mining, AI & DS, DBMS, Software Engineering, IoT, Big Data, Blockchain.</p>
            </TiltCard>
            <div className="mt-4">
              <TiltCard className="bg-white text-[rgba(0,0,0,0.85)]">
                <h3 className="text-xl font-serif font-extrabold">University of Mumbai</h3>
                <p className="text-[13px]">B.Tech. in Information Technology • May 2025</p>
                <p className="text-[12px] opacity-70 mt-1">Graduated with first‑class distinction.</p>
              </TiltCard>
            </div>
          </div>
        </section>

        <Divider />

        {/* Skills */}
        <section id="skills" className="py-8">
          <div className="flex items-center gap-3 mb-6"><Sparkles className="w-6 h-6" aria-hidden="true" /><h2 className="text-3xl md:text-4xl font-serif font-black">Skills at a Glance</h2></div>
          <div className="grid md:grid-cols-4 gap-4">
            {[{
              h: "Languages",
              t: "Python, SQL, Java, C, JavaScript, HTML/CSS",
            },{
              h: "ML & CV",
              t: "Supervised/Unsupervised, CV, NLP, CNNs, ViTs, YOLOv8, Haar",
            },{
              h: "Data & Cloud",
              t: "Pandas, NumPy, Matplotlib, Tableau, Power BI, AWS, GCP",
            },{
              h: "Frameworks",
              t: "TensorFlow, Keras, PyTorch, Django, Flask, React, Node",
            }].map((s, i) => (
              <TiltCard key={i} className="bg-[rgba(255,255,255,0.06)] border-white/10" padding="p-5">
                <h4 className="font-extrabold mb-2 font-serif" style={{ color: WHITE }}>{s.h}</h4>
                <p className="text-white/90 text-sm">{s.t}</p>
              </TiltCard>
            ))}
          </div>
        </section>

        <Divider />

        {/* Contact */}
        <section id="contact" className="py-10">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-black">Let’s Collaborate</h2>
              <p className="opacity-90 mt-2 max-w-prose">
                If it’s ambitious, audacious, or simply delightful—I’d love to help build it. I reply quickly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Seal href="mailto:rampurawallamiya@gmail.com" label="Email" icon={Mail} />
                <Seal href="https://github.com/LamiyaR" label="GitHub" icon={Github} />
                <Seal href="https://www.linkedin.com/in/lamiya-rampurawala/" label="LinkedIn" icon={Linkedin} />
              </div>
            </div>
            <TiltCard className="bg-white text-[rgba(0,0,0,0.85)]" padding="p-6">
              {/* Replace with your Formspree form ID */}
              <form action="https://formspree.io/f/yourFormID" method="POST" className="space-y-3" aria-label="Contact form">
                <label className="block text-sm font-medium" htmlFor="name">Your Name</label>
                <input id="name" name="name" required placeholder="Ada Lovelace" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 outline-none focus:ring-2 focus:ring-[rgba(11,26,58,0.35)]" />

                <label className="block text-sm font-medium" htmlFor="email">Your Email</label>
                <input id="email" type="email" name="email" required placeholder="ada@example.com" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 outline-none focus:ring-2 focus:ring-[rgba(11,26,58,0.35)]" />

                <label className="block text-sm font-medium" htmlFor="message">Your Message</label>
                <textarea id="message" name="message" rows={4} required placeholder="What would you like to build?" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 outline-none focus:ring-2 focus:ring-[rgba(11,26,58,0.35)]" />

                <button className="px-5 py-3 rounded-xl bg-[${NAVY}] text-white font-black uppercase tracking-widest hover:opacity-90">
                  Send
                </button>
                <p className="text-[12px] opacity-70">Powered by Formspree. You’ll get a confirmation email if configured correctly.</p>
              </form>
            </TiltCard>
          </div>
          <p className="text-center text-xs opacity-70 mt-6">© {new Date().getFullYear()} Lamiya Rampurawala • Built with React & Tailwind</p>
        </section>
      </main>

      {/* Decorative background dots—subtle, disabled for reduced motion */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1.2 }}
          className="fixed -z-10 inset-0" style={{ pointerEvents: "none", backgroundImage: "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 85% 10%, rgba(255,255,255,0.06), transparent 25%)" }}
        />
      )}
    </div>
  );
}
