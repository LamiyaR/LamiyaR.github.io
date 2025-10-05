import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Crown, Stars, Mail, Github, Linkedin, Instagram, Facebook, Twitter, Award, PenTool, GraduationCap, Briefcase, Phone, BookText, Newspaper, Sparkles } from "lucide-react";

const CHERRY = "#530113ff";
const INK = "#0a0a0a";
const IVORY = "#ffffff";

const quotes = [
  "Whoever says money can't buy happiness doesn't know where to shop.",
  "You're nobody until you're talked about.",
  "The only thing more expensive than diamonds is missed opportunities.",
  "Power is a good outfit and perfect lighting.",
  "Elegance is refusal—of boring portfolios, obviously."

];

const ribbonStyle = {
  background: IVORY,
  color: CHERRY,
  border: `1px solid ${CHERRY}`
};

const Seal = ({ href, label, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group relative flex items-center gap-2 p-3 rounded-full border-2 text-white hover:bg-white transition-colors"
    style={{ borderColor: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.08)", color: "white" }}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-semibold tracking-wide">{label}</span>
    <span className="absolute inset-0 rounded-full ring-2 ring-white/0 group-hover:ring-white/30 transition" />
  </a>
);

function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [ -50, 50 ], [ 10, -10 ]);
  const rotateY = useTransform(x, [ -50, 50 ], [ -10, 10 ]);

  function onMove(e){
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width/2;
    const py = e.clientY - rect.top - rect.height/2;
    x.set(px); y.set(py);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={()=>{ x.set(0); y.set(0);} }
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="rounded-3xl border bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-[0_40px_80px_rgba(192,0,42,0.35)] transition-shadow"
    >
      <div className="p-6 md:p-10" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

function ParallaxLayer({ speed = 0.2, children }){
  const [offset, setOffset] = useState({ x:0, y:0 });
  useEffect(()=>{
    const onMove = (e)=>{
      const nx = (e.clientX / window.innerWidth - 0.5) * 30 * speed;
      const ny = (e.clientY / window.innerHeight - 0.5) * 30 * speed;
      setOffset({ x: nx, y: ny });
    };
    window.addEventListener('mousemove', onMove);
    return ()=>window.removeEventListener('mousemove', onMove);
  },[speed]);
  return (
    <div style={{ transform:`translate3d(${offset.x}px, ${offset.y}px, 0)` }} className="pointer-events-none">
      {children}
    </div>
  );
}

const Stat = ({ k, v }) => (
  <div className="flex flex-col">
    <span className="text-3xl md:text-4xl font-black tracking-tight">{k}</span>
    <span className="uppercase text-xs tracking-widest opacity-80">{v}</span>
  </div>
);

const Quote = ({ children }) => (
  <div className="text-center italic text-sm md:text-base text-white/90">
    “{children}” — <span className="not-italic font-semibold">XOXO</span>
  </div>
);

export default function App(){
  return (
    <div className="min-h-screen text-white" style={{
      background: `radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.06), transparent 25%), linear-gradient(180deg, ${CHERRY}, #660016)`
    }}>
      <div className="fixed inset-0 -z-10" style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,0.0), rgba(0,0,0,0.35))" }} />
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(0,0,0,0.2)] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6"/>
            <span className="font-black tracking-[0.2em] text-sm md:text-base uppercase">LAM IYA</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm uppercase tracking-widest">
            {[
              ["About", "#about"],
              ["Achievements", "#achievements"],
              ["Publications", "#publications"],
              ["Internships", "#internships"],
              ["Skills", "#skills"],
              ["Projects", "#projects"],
              ["Contact", "#contact"],
            ].map(([label, href])=> (
              <a key={label} href={href} className="hover:text-black hover:bg-white px-3 py-1 rounded-full transition">{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="px-3 py-1 text-xs tracking-widest font-semibold uppercase" style={ribbonStyle}>POWER • GLAMOUR • CODE</span>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95]">
              Lamiya<br/>
              <span className="underline decoration-white/70 underline-offset-8">Rampurawala</span>
            </h1>
            <p className="text-white/90 max-w-xl">
              ML developer & data alchemist turning messy data into velvet insights. I build elegant interfaces that whisper luxury
              and ship AI that bites. Cherry‑red confidence, white‑glove execution.
            </p>
            <div className="flex flex-wrap gap-3">
              <Seal href="mailto:rampurawallamiya@gmail.com" label="Rumor Hotline" icon={Phone} />
              <Seal href="https://github.com/LamiyaR" label="Secret Code" icon={Github} />
              <Seal href="https://www.linkedin.com/in/lamiya-rampurawala/" label="Power Network" icon={Linkedin} />
              <Seal href="https://www.instagram.com/lamiya.rampurawala/" label="After Hours" icon={Instagram} />
              <Seal href="https://www.facebook.com/lamiya.rampurawala.1" label="Society Pages" icon={Facebook} />
              <Seal href="https://x.com/lamiya2630?s=21&t=Znx5y6bBgcC1sm8WiUZhIg" label="Breaking News" icon={Twitter} />
            </div>
            <Quote>{quotes[0]}</Quote>
          </div>

          <div className="relative">
            <ParallaxLayer speed={0.1}>
              <div className="absolute -top-10 -right-6 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            </ParallaxLayer>
            <TiltCard>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 h-64 md:h-80 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-end p-4" style={{backgroundImage:"url('public/images/IMG_5694.jpg')", backgroundSize:'cover', backgroundPosition:'center'}}>
                  <div className="bg-black/40 px-3 py-1 rounded text-xs tracking-widest uppercase">MUMBAI → SACRAMENTO → WORLD</div>
                </div>
                <div className="h-64 md:h-80 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-2">
                  <Stars />
                  <span className="text-xs uppercase tracking-widest">Elite Edition</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

<section id="about" className="relative py-16">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 items-stretch">
    <TiltCard>
      <div className="space-y-4 h-full flex flex-col justify-between min-h-[380px]">
        <div className="space-y-4">
          <h2 className="text-3xl font-black flex items-center gap-2">
            <GraduationCap /> About Me
          </h2>
          <ul className="space-y-2 mt-2">
            <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-white/60">
               CS grad student with AI specialization (California State University, Sacramento)
            </li>
            <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-white/60">
              First-Class B.Tech in IT (University of Mumbai)
            </li>
            <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-white/60">
               Fluent in Python, TensorFlow, ReactJS, MongoDB, Flask — and a flair for the dramatic reveal
            </li>
          </ul>
        </div>
        <Quote>{quotes[2]}</Quote>
      </div>
    </TiltCard>

    <TiltCard>
      <div>
        <h3 className="text-2xl font-extrabold flex items-center gap-2">
          <Award /> Achievements
        </h3>
        <ul className="space-y-2 mt-2">
          <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-white/60">
            Chapter Secretary, ACM MHSSCOE — organized state-level hackathon.
          </li>
          <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-white/60">
            Core committee, AWS Academy - TA for ML Foundations & Advanced.
          </li>
          <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-white/60">
            IEEE & Oracle Academy contributor — talks, websites, and drives.
          </li>
        </ul>
        <div>
        <Quote>{quotes[1]}</Quote>
        </div> 
      </div>
    </TiltCard>



    <TiltCard>
      <div className="space-y-4 h-full flex flex-col justify-between min-h-[380px]">
        <div>
          <h3 className="text-2xl font-extrabold flex items-center gap-2"><PenTool/> Signature Stack</h3>
          <p className="opacity-90">
            Python • TensorFlow • Keras • OpenCV • PyTorch • ReactJS • Django • Flask • MongoDB • MySQL • AWS • GCP • YOLOv8
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {["ML","CV","NLP","Full-Stack","Viz","Cloud"].map(t=> (
              <span key={t} className="px-2 py-1 rounded-full bg-white text-xs font-bold" style={{color: CHERRY}}>{t}</span>
            ))}
          </div>
        </div>
        <Quote>{quotes[3]}</Quote>
      </div>
    </TiltCard>
  </div>
</section>


      <section id="achievements" className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-black flex items-center gap-3"><Award className="w-7 h-7"/> Achievements</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "State Hackathon—Lead Organizer",
                body: "Headlined the internal rounds of Smart India Hackathon; logistics, juries, and tech ops all in silk gloves.",
              },
              {
                title: "AWS Academy Core + TA",
                body: "Taught ML Foundations & Advanced—because power shared is power multiplied.",
              },
              {
                title: "IEEE & Oracle Academy",
                body: "Built sites, ran seminars, mentored students. Leadership, but make it couture.",
              },
            ].map((a,i)=> (
              <TiltCard key={i}>
                <h3 className="text-2xl font-extrabold">{a.title}</h3>
                <p className="mt-2 opacity-90">{a.body}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <h2 className="text-4xl font-black flex items-center gap-3">
            <BookText className="w-7 h-7" /> Paper Publications
          </h2>

          <TiltCard>
            <div className="grid md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-3 space-y-2">
                <h3 className="text-2xl font-extrabold">
                  AI-Assisted Early Detection of Pancreatic Cancer (IJARSCT, Sep 2025)
                </h3>
                <p className="opacity-90">
                  3D U-Net + ViT hybrid; 94%/91% Dice (pancreas/tumor), 99.4% classification accuracy; 
                  ~9s per scan; secure web platform with DICOM/NIfTI support.
                </p>
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


      <section id="internships" className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-black flex items-center gap-3"><Briefcase className="w-7 h-7"/> Internships</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TiltCard>
              <h3 className="text-2xl font-extrabold">AL Hatimi — ML Developer Intern</h3>
              <p className="opacity-90">Built an AI interface that auto‑analyzes Excel financials; ChatGPT‑style 1–2 line reports on profit & loans; ReactJS, MongoDB, Python, Pandas, NLP.</p>
            </TiltCard>
            <TiltCard>
              <h3 className="text-2xl font-extrabold">Heuristic Academy — Data Analyst Intern</h3>
              <p className="opacity-90">Data collection → viz → advanced analytics using Python, Power BI, Tableau. Teamwork, strategy, and impeccable charts.</p>
            </TiltCard>
          </div>
        </div>
      </section>





      <section id="skills" className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <h2 className="text-4xl font-black flex items-center gap-3"><Sparkles className="w-7 h-7"/> Skills</h2>
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





      <section id="projects" className="py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-black flex items-center gap-3"><Newspaper className="w-7 h-7"/> Recent Exclusives (Projects)</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tag: "EXPOSED",
                title: "AI Assisted Pancreatic Cancer Detection",
                dek: "3D U‑Net + ViT unmask early tumors in ~9s/scan. Dice 94%/91%. Web platform with DICOM/NIfTI.",
                link: "#",
              },
              {
                tag: "SPOTTED",
                title: "Spector — Watchful AI",
                dek: "YOLOv8 + Haar Cascade track 50 people/frame at 30 FPS; 94% detection, 92% gender precision.",
                link: "#",
              },
              {
                tag: "HOT READ",
                title: "Novella Nest — Book Web App",
                dek: "Django + Channels + Recsys + 24/7 community chat. Social integrations and APIs galore.",
                link: "#",
              },
            ].map((p, i)=> (
              <TiltCard key={i}>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-white text-[10px] font-black tracking-widest uppercase" style={{color: CHERRY}}> {p.tag} </span>
                  <span className="text-xs opacity-75">Tabloid Issue #{i+1}</span>
                </div>
                <h3 className="mt-4 text-2xl font-extrabold leading-tight">{p.title}</h3>
                <p className="opacity-90 mt-2">{p.dek}</p>
                <a href={p.link} className="inline-block mt-4 underline decoration-white/60 underline-offset-4 hover:text-black hover:bg-white px-3 py-1 rounded-full transition">Case Study</a>
              </TiltCard>
            ))}
          </div>
          <br />
          <Quote>{quotes[4]}</Quote>
        </div>
      </section>




      <section id="contact" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <TiltCard>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-black mb-2">Let’s Make Headlines</h2>
                <p className="opacity-90">If it’s ambitious, audacious, or just fabulous — I want to hear it..</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Seal href="mailto:rampurawallamiya@gmail.com" label="Email" icon={Mail} />
                  <Seal href="https://github.com/LamiyaR" label="GitHub" icon={Github} />
                  <Seal href="https://www.linkedin.com/in/lamiya-rampurawala/" label="LinkedIn" icon={Linkedin} />
                </div>
              </div>
                <form action="https://formspree.io/f/yourFormID" method="POST" className="space-y-3">
                <input type="text" name="name" required placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none"/>
                <input type="email" name="email" required placeholder="Your Email" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none"/>
                <textarea name="message" rows={4} required placeholder="Your Message" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none"/>
                <button className="px-5 py-3 rounded-xl bg-white font-black uppercase tracking-widest" style={{color: CHERRY}}>Send Rumor</button>
                </form>

            </div>
          </TiltCard>
          <div className="text-center text-xs opacity-70 mt-6">Designed with scandal, shipped with love. © {new Date().getFullYear()} Lamiya.</div>
        </div>
      </section>
    </div>
  );
}
