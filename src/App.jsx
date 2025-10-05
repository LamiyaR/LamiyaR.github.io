import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  Crown, Mail, Github, Linkedin, ExternalLink, ArrowRight, BookText, Briefcase, GraduationCap, Sparkles, Info, X,
} from "lucide-react";

/**
 * Lamiya Rampurawala — Royal/Editorial Portfolio (v2)
 * Framework: React + Tailwind + Framer Motion + Lucide
 * Theme: Navy (primary) + Off‑white/White with strict contrast
 * Notes: Replace image/video src, GitHub repo links, and Formspree endpoint before deploy.
 */

// === THEME ===
const NAVY = "#0b1a3a";        // deep navy primary
const PAPER = "#f7f7f2";       // off‑white "paper"
const INK = "#0a0e1a";         // near‑black for text on light
const GOLD = "#d3b25a";        // subtle regal accent

function clsx(...c){return c.filter(Boolean).join(" ");}

// === QUOTES ===
const QUOTES = [
  "I don’t chase trends — I debug them.",
  "Code like couture: tailored, timeless, and a little dangerous.",
  "Some build models. I build rumors with results.",
  "The algorithm isn’t the drama — I am.",
  "Perfection is boring. I prefer version 1.0 with bite.",
  "My commits break ceilings, not builds.",
  "Behind every clean UI is a sleepless night and questionable caffeine choices.",
  "They said it couldn’t scale. I said watch me.",
  "Half scientist, half scandal.",
  "Make it elegant enough to whisper, and smart enough to roar.",
  "I treat bugs like rumors — fix them fast and move on flawless.",
  "Confidence is my favorite runtime.",
  "When they zig, I refactor.",
  "The secret ingredient is an overdeveloped sense of ambition.",
  "I turn chaos into clean commits and gossip into growth metrics.",
  "Don’t just build. Leave architecture that flirts with immortality.",
  "If it’s not breaking the internet, it’s not pushing enough boundaries.",
  "They wanted a prototype; I built a prophecy.",
  "Every line of code deserves a headline.",
  "Innovation with a side of audacity.",
  "Rumors fade. Results don't.",
  "Make it elegant. Make it measurable.",
  "Beautiful UI, disciplined models.",
  "Shipping > grandstanding.",
  "Data tells the story. I write the headline.",
  "Measure twice. A/B thrice.",
  "Latency is UX.",
  "Clarity scales; cleverness doesn’t.",
  "Users don’t read docs—design for that.",
  "First make it work, then make it sing.",
];


function usePrefersReducedMotion(){
  const [prefers,setPrefers]=useState(false);
  useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefers(mq.matches); const h=e=>setPrefers(e.matches);
    mq.addEventListener?mq.addEventListener('change',h):mq.addListener(h);
    return ()=>mq.removeEventListener?mq.removeEventListener('change',h):mq.removeListener(h);
  },[]);return prefers;
}

// === TILT CARD ===
function TiltCard({ children, className = "", padding = "p-6 md:p-8", light=false }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);
  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2; const py = e.clientY - rect.top - rect.height / 2;
    x.set(px); y.set(py);
  }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={()=>{x.set(0);y.set(0);}}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", background: light?PAPER:"rgba(255,255,255,0.06)" }}
      className={clsx("rounded-3xl border shadow-xl", light?"border-black/10":"border-white/15", className)} role="region">
      <div className={padding} style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
}

// === REVEAL HEADLINE ===
function RevealHeadline({ kicker, title, subtitle }){
  return (
    <header className="space-y-3">
      {kicker && (
        <span className="px-3 py-1 text-[10px] tracking-[0.25em] font-extrabold uppercase inline-block rounded-full"
          style={{ color: NAVY, background: "#ffffff" }}>{kicker}</span>
      )}
      <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:"easeOut"}}
        className="text-[clamp(2.4rem,5vw,4.6rem)] font-serif font-black leading-[0.95]">
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p className="text-white/90 max-w-2xl" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}}>
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}

// === QUOTE TICKER ===
function QuoteTicker(){
  const reduced=usePrefersReducedMotion();
  const [i,setI]=useState(()=>Math.floor(Math.random()*QUOTES.length));
  useEffect(()=>{ if(reduced) return; const t=setInterval(()=>setI(p=> (p+1)%QUOTES.length), 5000); return ()=>clearInterval(t); },[reduced]);
  return (
    <div aria-live="polite" className="text-xs md:text-sm italic text-white/85 select-none">
      “{QUOTES[i]}”
    </div>
  );
}

// === MODAL ===
function Modal({open,onClose,title,children}){
  useEffect(()=>{function onKey(e){if(e.key==='Escape') onClose?.()} if(open){document.addEventListener('keydown',onKey);}
    return ()=>document.removeEventListener('keydown',onKey);},[open,onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label={typeof title==='string'?title:undefined}
          className="fixed inset-0 z-50 grid place-items-center p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div initial={{scale:0.96,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.98,opacity:0}}
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden" style={{background:PAPER,color:INK}}>
            <div className="flex items-center justify-between p-4 border-b border-black/10">
              <h3 className="font-serif text-2xl font-bold">{title}</h3>
              <button onClick={onClose} className="p-1 rounded hover:bg-black/5" aria-label="Close modal"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-4 md:p-6 text-[15px] leading-relaxed">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// === BADGE LINK ===
const Seal = ({ href, label, icon: Icon }) => (
  <a href={href} target="_blank" rel="noreferrer noopener"
    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80"
    style={{ borderColor: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.08)", color: "#ffffff" }} aria-label={label}>
    <Icon className="w-4 h-4" aria-hidden="true" />
    <span className="text-sm font-semibold tracking-wide">{label}</span>
  </a>
);

// === PROJECT CARD ===
function ProjectCard({ tag, title, repo, demo, img, alt, stack, highlights, story, onOpenModal }) {
  return (
    <TiltCard light className="text-[rgba(0,0,0,0.9)]">
      <div className="flex items-start justify-between gap-4">
        <span className="px-2 py-1 bg-[rgba(11,26,58,0.08)] text-[10px] font-black tracking-widest uppercase rounded" style={{ color: NAVY }}>{tag}</span>
        <span className="text-xs text-[rgba(0,0,0,0.6)]">{stack.join(" · ")}</span>
      </div>
      <h3 className="mt-3 text-2xl font-extrabold leading-snug font-serif" style={{ color: NAVY }}>{title}</h3>

      <button onClick={onOpenModal} className="group mt-4 w-full relative rounded-xl overflow-hidden border border-black/10 focus:outline-none focus:ring-2 focus:ring-[rgba(11,26,58,0.35)]" aria-label={`Open details for ${title}`}>
        <img src={img} alt={alt} loading="lazy" className="w-full h-52 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-2 right-2 text-white text-xs bg-black/40 px-2 py-1 rounded-full flex items-center gap-1">
          Quick look <ArrowRight className="w-4 h-4"/>
        </div>
      </button>

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
      </div>

      <div className="mt-4 text-[0.95rem] text-[rgba(0,0,0,0.85)]">
        {story}
      </div>
    </TiltCard>
  );
}

// === SKILL TILE ===
function SkillTile({title,examples}){
  const [show,setShow]=useState(false);
  return (
    <div className="relative">
      <button onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)} onFocus={()=>setShow(true)} onBlur={()=>setShow(false)}
        className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/60">
        <span className="font-semibold">{title}</span>
      </button>
      <AnimatePresence>
        {show && (
          <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:4}}
            className="absolute z-10 mt-2 w-72 p-3 rounded-xl shadow-xl" style={{background:PAPER,color:INK,border:'1px solid rgba(0,0,0,0.08)'}}>
            <div className="text-sm leading-relaxed">{examples}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// === APP ===
export default function App(){
  const prefersReduced = usePrefersReducedMotion();

  // Easter egg modal (click crown)
  const [eggOpen,setEggOpen]=useState(false);

  // Project modals
  const [openProject,setOpenProject]=useState(null);

  // Random quote for confirmations
  const randomQuote = useMemo(()=> QUOTES[Math.floor(Math.random()*QUOTES.length)], []);

  // Contact form state (Formspree AJAX pattern)
  async function onSubmit(e){
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Replace with your Formspree endpoint
    const endpoint = form.action || "https://formspree.io/f/yourFormID";
    try{
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      if(res.ok){
        setEggOpen(true); // reuse modal for fun confirmation popup
        form.reset();
      }else{
        alert('Something went wrong. Please email me directly: rampurawallamiya@gmail.com');
      }
    }catch(err){
      alert('Network error. Please try again or email me directly.');
    }
  }

  return (
    <div className="min-h-screen text-white" style={{background:`linear-gradient(180deg, ${NAVY} 0%, #0e254f 100%)`}}>
      {/* Skip link */}
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-black px-3 py-2 rounded">Skip to content</a>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/20 bg-black/10 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <button onClick={()=>setEggOpen(true)} className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-white/70 rounded px-1" aria-label="Open fun facts">
            <Crown className="w-6 h-6" aria-hidden="true" />
            <span className="font-serif font-black tracking-[0.18em] text-sm md:text-base uppercase">LAMIYA RAMPURAWALA</span>
          </button>
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
        <section className="grid md:grid-cols-[1.2fr,0.8fr] gap-8 items-center pt-10 pb-10 relative overflow-hidden">
          {/* Parallax dots */}
          {!prefersReduced && (
            <motion.div aria-hidden="true" initial={{opacity:0}} animate={{opacity:0.12}} transition={{duration:1}}
              className="absolute -z-10 inset-0" style={{pointerEvents:'none',backgroundImage:"radial-gradient(circle at 15% 20%, rgba(255,255,255,0.12), transparent 30%), radial-gradient(circle at 85% 10%, rgba(255,255,255,0.1), transparent 25%)"}} />
          )}

          <div>
          <RevealHeadline
            kicker="AI • SCOOP • DESIGN"
            title={
              <>
                This is what ambition looks like - compiled.
              </>
            }
            subtitle={
              <>
                Discipline in the code. Emotion in the outcome.
              </>
            }
          />

            <div className="mt-4"><QuoteTicker/></div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Seal href="mailto:rampurawallamiya@gmail.com" label="Email" icon={Mail} />
              <Seal href="https://github.com/LamiyaR" label="GitHub" icon={Github} />
              <Seal href="https://www.linkedin.com/in/lamiya-rampurawala/" label="LinkedIn" icon={Linkedin} />
            </div>
            <p className="mt-3 text-[12px] text-white/70">Sacramento • Open to ML/AI internships & research</p>
          </div>

          {/* Editorial card */}
          <TiltCard light className="text-[rgba(0,0,0,0.9)]">
            <h3 className="font-serif text-2xl font-extrabold" style={{ color: NAVY }}>
              Cover Story
            </h3>
            <p className="mt-2 text-[15px] text-justify">
              I’m part pattern-spotter, part product polisher. My sweet spot is where model outputs meet human intuition:
              fast experiments, clear data stories, and UIs that don’t fight back.
            </p>
            <p className="mt-2 text-[15px] text-justify">
              Recently: an AI-driven financial briefing assistant, a 3D U-Net/ViT pipeline for early pancreatic-tumor detection,
              and a real-time surveillance system that hits 30 FPS on modest hardware.
            </p>
          </TiltCard>

        </section>

        {/* Projects */}
        <section id="projects" className="py-6">
          <div className="flex items-center gap-3 mb-6">
            <BookText className="w-6 h-6" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-serif font-black">Case Files</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Project 1 */}
            <ProjectCard
              tag="FEATURE"
              title="AI-Assisted Pancreatic Cancer Detection"
              repo="https://github.com/LamiyaR/AI_Assisted_Pancreatic_Cancer_Using_Non_Contrast_CT_Scan"
              demo="#"
              img="/images/pancreas_ui.png"
              alt="CT segmentation UI with overlays"
              stack={["3D U-Net", "ViT", "TensorFlow", "Flask", "React", "MongoDB", "DICOM/NIfTI"]}
              highlights={[
                "Dice 94% (pancreas), 91% (tumor); ~9 s/scan.",
                "SSL/TLS, role-based clinician access, audit trails.",
              ]}
              story={
                <p className="text-justify leading-relaxed tracking-[0.01em]">
                  Started as a mentor’s question: <em>could we surface subtle T1b tumors without contrast?</em> Early models
                  over-segmented around vessels. I added vessel-aware augmentations and a ViT block for context; false positives
                  fell and mixed-precision + tiling pushed inference under 10 seconds.
                </p>
              }
              onOpenModal={() => setOpenProject("pancreas")}
            />

            {/* Project 2 */}
            <ProjectCard
              tag="SURVEILLANCE"
              title="Spector — Watchful AI"
              repo="https://github.com/LamiyaR/Spector_Watchful_AI"
              demo="#"
              img="/images/spector.png"
              alt="Surveillance dashboard with tracked individuals"
              stack={["YOLOv8", "Haar", "OpenCV", "Keras"]}
              highlights={[
                "Tracks 50+ people/frame at 30 FPS.",
                "94% detection, 92% gender precision after fairness tweaks.",
              ]}
              story={
                <p className="text-justify leading-relaxed tracking-[0.01em]">
                  Born at a campus safety hackathon. Trust—not accuracy—was the bottleneck. I introduced demographic-balanced
                  sampling and threshold calibration sessions with users. The result: 28% fewer false positives and a UI that
                  highlights uncertainty instead of hiding it.
                </p>
              }
              onOpenModal={() => setOpenProject("spector")}
            />

            {/* Project 3 */}
            <ProjectCard
              tag="PLATFORM"
              title="Novella Nest — Book Web App"
              repo="https://github.com/LamiyaR/Ecommerce_Book_Selling_Website_Novella_Nest"
              demo="#"
              img="/images/novella.png"
              alt="Book platform interface with chat and recs"
              stack={["Django", "Channels", "TensorFlow", "SQLite", "Bootstrap"]}
              highlights={[
                "24/7 live community chat.",
                "TF embeddings + clickstream recs raised session depth.",
              ]}
              story={
                <p className="text-justify leading-relaxed tracking-[0.01em]">
                  Wanted a place where readers and authors meet without friction. Popularity-only recs felt stale, so I
                  instrumented clickstream events and trained embeddings on user–book interactions. Chats grew livelier and
                  weekly bot-curated reading clubs emerged from trending themes.
                </p>
              }
              onOpenModal={() => setOpenProject("novella")}
            />
          </div>
        </section>


        {/* Experience & Education */}
        <section id="experience" className="py-6 grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6" aria-hidden="true" />
              <h2 className="text-3xl font-serif font-black">Experience</h2>
            </div>

            <TiltCard className="border-white/10">
              <h3 className="text-xl font-serif font-extrabold">ML Developer Intern — AL Hatimi</h3>
              <p className="text-white/80 text-sm text-justify leading-relaxed tracking-[0.01em]">
                Dubai, UAE • Apr 2024 – Dec 2024
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-justify leading-relaxed tracking-[0.01em]">
                <li>
                  AI-driven financial analysis assistant (React, MongoDB, Python) increased throughput by ~60%.
                </li>
                <li>
                  One-line briefings cut manual triage by ~70%; cross-functional rollout led to ~40% higher adoption.
                </li>
                <li>
                  Partnered with analysts to tune thresholds so outputs matched human judgment.
                </li>
              </ul>
            </TiltCard>

            <div className="mt-4">
              <TiltCard className="border-white/10">
                <h3 className="text-xl font-serif font-extrabold">Data Analyst Intern — Heuristic Academy</h3>
                <p className="text-white/80 text-sm text-justify leading-relaxed tracking-[0.01em]">
                  Mumbai, India • Aug 2023 – Mar 2024
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-justify leading-relaxed tracking-[0.01em]">
                  <li>
                    Wrangled messy datasets and built dashboards (Python/Power BI/Tableau) to surface signals.
                  </li>
                  <li>
                    Applied ML to trim false alarms and spotlight high-leverage variables for decision makers.
                  </li>
                </ul>
              </TiltCard>
            </div>
          </div>
          <div id="education">
            <div className="flex items-center gap-3 mb-4"><GraduationCap className="w-6 h-6" aria-hidden="true" /><h2 className="text-3xl font-serif font-black">Education</h2></div>
            <TiltCard light className="text-[rgba(0,0,0,0.9)]">
              <h3 className="text-xl font-serif font-extrabold">California State University, Sacramento</h3>
              <p className="text-[13px]">M.S. Computer Science — AI specialization (in progress) • Target: May 2027</p>
            </TiltCard>
            <div className="mt-4">
              <TiltCard light className="text-[rgba(0,0,0,0.9)]">
                <h3 className="text-xl font-serif font-extrabold">University of Mumbai</h3>
                <p className="text-[13px]">B.Tech. in Information Technology • May 2025</p>
                <p className="text-[12px] opacity-80 mt-1">Graduated with first‑class distinction.</p>
                <p className="text-[12px] opacity-80 mt-1">Course Work: Data Mining, AI & DS, DBMS, Software Engineering, IoT, Big Data, Blockchain.</p>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-6">
          <div className="flex items-center gap-3 mb-6"><Sparkles className="w-6 h-6" aria-hidden="true" /><h2 className="text-3xl md:text-4xl font-serif font-black">Toolkit</h2></div>
          <div className="grid md:grid-cols-4 gap-4">
            <SkillTile title="Languages" examples={<p>Python, SQL, Java, C, JavaScript, HTML/CSS. Example: built data pipelines in Python + SQL and delivered REST backends with Node.</p>} />
            <SkillTile title="ML & CV" examples={<p>Supervised/Unsupervised, CV, NLP, CNNs, ViTs, YOLOv8, Haar. Example: 3D U‑Net/ViT pipeline with Dice 94/91 for pancreas/tumor.</p>} />
            <SkillTile title="Data & Cloud" examples={<p>Pandas, NumPy, Matplotlib, Tableau, Power BI; AWS (EC2/S3/SageMaker); GCP (Colab A100).</p>} />
            <SkillTile title="Frameworks" examples={<p>TensorFlow, Keras, PyTorch, Django, Flask, React, Node. Example: Flask+React for secure DICOM viewer with RBAC.</p>} />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-8">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-black">Let’s Collaborate</h2>
              <p className="opacity-90 mt-2 max-w-prose">Drop the brief, keep the drama — I’ll bring the data..</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Seal href="mailto:rampurawallamiya@gmail.com" label="Email" icon={Mail} />
                <Seal href="https://github.com/LamiyaR" label="GitHub" icon={Github} />
                <Seal href="https://www.linkedin.com/in/lamiya-rampurawala/" label="LinkedIn" icon={Linkedin} />
              </div>
            </div>
            <TiltCard light className="text-[rgba(0,0,0,0.9)]" padding="p-6">
              <form action="https://formspree.io/f/mjkaowyq" method="POST" className="space-y-3" aria-label="Contact form" onSubmit={onSubmit}>
                <label className="block text-sm font-medium" htmlFor="name" style={{color:INK}}>Your Name</label>
                <input id="name" name="name" required placeholder="Charles Leclerec" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 outline-none focus:ring-2 focus:ring-[rgba(11,26,58,0.35)]" />

                <label className="block text-sm font-medium" htmlFor="email" style={{color:INK}}>Your Email</label>
                <input id="email" type="email" name="email" required placeholder="charles.leclerc@gmail.com" className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 outline-none focus:ring-2 focus:ring-[rgba(11,26,58,0.35)]" />

                <label className="block text-sm font-medium" htmlFor="message" style={{color:INK}}>Your Message</label>
                <textarea id="message" name="message" rows={4} required placeholder="If Charles can chase podiums, you can send an email." className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 outline-none focus:ring-2 focus:ring-[rgba(11,26,58,0.35)]" />

                <button className="px-5 py-3 rounded-xl" style={{ background:NAVY, color:'#fff' }}>
                  Send
                </button>
                <p className="text-[12px] opacity-70">You’ll see a confirmation popup on success.</p>
              </form>
            </TiltCard>
          </div>
          <p className="text-center text-xs opacity-70 mt-6">© {new Date().getFullYear()} Lamiya Rampurawala • Powered by React, caffeine, and pure audacity.</p>
        </section>
      </main>

      {/* Project MODALS */}
      <Modal open={openProject==='pancreas'} onClose={()=>setOpenProject(null)} title={<span>Pancreatic Cancer Detection — <em>Quick Look</em></span>}>
        <div className="space-y-4" style={{color:INK}}>
          <p><strong>Hook:</strong> A clinician asked if non‑contrast scans could still surface T1b tumors. Early models latched onto vessels; I added vessel‑aware augs + ViT for context.</p>
          <ul className="list-disc list-inside">
            <li>Metrics: Dice 94% (pancreas), 91% (tumor); ~9 s/scan</li>
            <li>Stack: TensorFlow, Flask, React, MongoDB, DICOM/NIfTI</li>
            <li>Security: SSL/TLS, RBAC, audit trail</li>
          </ul>
          <div className="rounded-lg overflow-hidden border border-black/10">
            <video src="/videos/pancreas_demo.mp4" controls aria-label="Pancreas demo video"/>
          </div>
        </div>
      </Modal>

      <Modal open={openProject==='spector'} onClose={()=>setOpenProject(null)} title={<span>Spector — Watchful AI — <em>Quick Look</em></span>}>
        <div className="space-y-4" style={{color:INK}}>
          <p><strong>Hook:</strong> Built for a campus safety hackathon; trust was as important as detection. Balanced sampling + calibrated thresholds reduced false positives by 28%.</p>
          <ul className="list-disc list-inside">
            <li>30 FPS; tracks 50+ people/frame</li>
            <li>YOLOv8 + Haar; uncertainty‑aware UI</li>
          </ul>
          <div className="rounded-lg overflow-hidden border border-black/10">
            <video src="/videos/spector_demo.mp4" controls aria-label="Spector demo video"/>
          </div>
        </div>
      </Modal>

      <Modal open={openProject==='novella'} onClose={()=>setOpenProject(null)} title={<span>Novella Nest — <em>Quick Look</em></span>}>
        <div className="space-y-4" style={{color:INK}}>
          <p><strong>Hook:</strong> Recs felt stale until I trained TF embeddings on user–book interactions and instrumented clickstream signals—sessions deepened and weekly themed clubs emerged.</p>
          <ul className="list-disc list-inside">
            <li>Django + Channels; TensorFlow recs</li>
            <li>Live community chat; social hooks</li>
          </ul>
          <div className="rounded-lg overflow-hidden border border-black/10">
            <video src="/videos/novella_demo.mp4" controls aria-label="Novella demo video"/>
          </div>
        </div>
      </Modal>

      {/* Confirmation / Easter‑egg modal */}
      <Modal open={eggOpen} onClose={()=>setEggOpen(false)} title={<span className="inline-flex items-center gap-2"><Info className="w-5 h-5"/> A Note from Lamiya</span>}>
        <div className="space-y-3" style={{color:INK}}>
          <p>Thanks for reaching out! I’ll get back to you shortly. Meanwhile, here’s a thought I love:</p>
          <blockquote className="italic p-3 rounded-lg" style={{background:'#fff',border:'1px solid rgba(0,0,0,0.08)'}}>
            “{randomQuote}”
          </blockquote>
          <p className="text-sm opacity-80">P.S. Click the crown in the header anytime for more fun facts.</p>
        </div>
      </Modal>

      {/* Decorative background dots—subtle, disabled for reduced motion */}
      {!prefersReduced && (
        <motion.div aria-hidden="true" initial={{opacity:0}} animate={{opacity:0.13}} transition={{duration:1.2}}
          className="fixed -z-10 inset-0" style={{pointerEvents:'none',backgroundImage:"radial-gradient(24rem 24rem at 10% 20%, rgba(255,255,255,0.1), transparent), radial-gradient(20rem 20rem at 80% 10%, rgba(255,255,255,0.08), transparent)"}}/>
      )}
    </div>
  );
}
