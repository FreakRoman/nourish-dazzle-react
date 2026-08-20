import React, { useMemo, useState } from "react";
import {
  ArrowRight, Check, ChevronDown, CircleCheck, Clock3, Leaf,
  Menu, MessageCircle, Play, Plus, Sparkles, Star, X
} from "lucide-react";
import Hero3D from "./components/Hero3D";
import AmbientSparkles from "./components/AmbientSparkles";
import "./styles.css";

const plans = [
  { name: "Reset", price: "₹1,999", accent: "sage", desc: "A focused 14-day nutrition reset.", features: ["Personal nutrition audit", "7-day meal blueprint", "Grocery guide", "Two check-ins"] },
  { name: "Thrive", price: "₹4,999", accent: "lime", popular: true, desc: "Your complete 30-day transformation plan.", features: ["Everything in Reset", "Personalized macros", "Weekly coaching", "Habit dashboard", "WhatsApp support"] },
  { name: "Elevate", price: "₹8,999", accent: "gold", desc: "High-touch coaching for ambitious goals.", features: ["Everything in Thrive", "Bi-weekly 1:1 calls", "Restaurant strategy", "Travel nutrition", "Priority support"] }
];

const faqs = [
  ["Do I need to count calories?", "Not necessarily. We use calorie and macro targets only when they make sense for your goal. The system is designed to make healthy choices easier, not turn every meal into math."],
  ["Can you build Indian meal plans?", "Absolutely. Plans can be built around South Indian, North Indian, vegetarian, non-vegetarian, vegan, and mixed preferences — including meals you already love."],
  ["How quickly will I see results?", "Most clients notice better energy and consistency within the first couple of weeks. Body-composition changes depend on your starting point, goal, habits, sleep, and consistency."],
  ["Is this a crash diet?", "No. Nourish is built around sustainable habits, adequate nutrition, flexibility, and education so your results can continue after the coaching period."]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faq, setFaq] = useState(null);
  const [modal, setModal] = useState(false);
  const [goal, setGoal] = useState("Lose weight");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("Moderate");
  const [toast, setToast] = useState("");

  const bmi = useMemo(() => {
    const h = Number(height) / 100;
    const w = Number(weight);
    return h > 0 && w > 0 ? (w / (h * h)).toFixed(1) : null;
  }, [height, weight]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  };

  const nav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <AmbientSparkles />
      <div className="noise" />
      <header className="nav">
        <button className="brand" onClick={() => nav("home")} aria-label="Nourish home">
          <span className="brand-mark"><Leaf size={18} /></span>
          <span>NOURISH<span className="dot">.</span></span>
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => nav("method")}>Our method</button>
          <button onClick={() => nav("plans")}>Programs</button>
          <button onClick={() => nav("stories")}>Stories</button>
          <button onClick={() => nav("faq")}>FAQ</button>
          <button className="mobile-cta" onClick={() => setModal(true)}>Start my plan <ArrowRight size={16} /></button>
        </nav>
        <button className="nav-cta" onClick={() => setModal(true)}>Start my plan <ArrowRight size={16} /></button>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="home">
        <section className="hero">
          <Hero3D />
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> PERSONAL NUTRITION, REIMAGINED</div>
            <h1>Eat better.<br /><em>Feel electric.</em></h1>
            <p className="hero-sub">A beautifully simple nutrition system built around <strong>your body, your culture, and your real life.</strong></p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => setModal(true)}>Build my nutrition plan <ArrowRight size={18} /></button>
              <button className="play-btn" onClick={() => nav("method")}><span><Play size={15} fill="currentColor" /></span> See how it works</button>
            </div>
            <div className="micro-proof">
              <div className="avatar-stack"><span>AR</span><span>SK</span><span>MJ</span><span>+</span></div>
              <div><div className="stars">★★★★★ <small>4.9/5</small></div><p>Trusted by 2,000+ healthier humans</p></div>
            </div>
          </div>

        </section>

        <section className="ticker">
          <div>HOLISTIC NUTRITION <span>✦</span> REAL FOOD <span>✦</span> BETTER ENERGY <span>✦</span> LASTING HABITS <span>✦</span> HOLISTIC NUTRITION <span>✦</span> REAL FOOD <span>✦</span> BETTER ENERGY <span>✦</span></div>
        </section>

        <section className="section method" id="method">
          <div className="section-heading">
            <div><div className="eyebrow">THE NOURISH METHOD</div><h2>Less restriction.<br /><em>More transformation.</em></h2></div>
            <p>We don't believe in perfect diets. We believe in building a system that fits the life you're already living.</p>
          </div>
          <div className="method-grid">
            {[
              ["01", "Understand", "We map your goals, routine, food preferences, sleep, movement and the tiny habits that shape your day."],
              ["02", "Personalize", "Your nutrition plan is built around you — not a generic PDF, not a one-size-fits-all meal chart."],
              ["03", "Adapt", "Weekly check-ins turn real-world feedback into smarter choices and sustainable progress."]
            ].map(([n,t,d]) => <article className="method-card" key={n}><span className="step">{n}</span><div className="step-icon"><Sparkles size={20}/></div><h3>{t}</h3><p>{d}</p><ArrowRight className="card-arrow" size={20}/></article>)}
          </div>
        </section>

        <section className="section split-section" id="stories">
          <div className="story-photo">
            <div className="photo-overlay"><span>BEFORE</span><span>AFTER 90 DAYS</span></div>
            <div className="abstract-person" />
            <div className="photo-note"><span className="quote-mark">“</span><p>I stopped thinking about food all day. I just know what works for me now.</p><b>— Ananya, 29</b></div>
          </div>
          <div className="story-copy">
            <div className="eyebrow">REAL PEOPLE. REAL CHANGE.</div>
            <h2>Healthy looks<br /><em>different on everyone.</em></h2>
            <p>From better digestion to stronger workouts, calmer evenings to confident food choices — the win is bigger than a number on a scale.</p>
            <div className="metric-row"><div><strong>92%</strong><span>report better energy</span></div><div><strong>4.9★</strong><span>average client rating</span></div><div><strong>2k+</strong><span>plans created</span></div></div>
            <button className="text-btn" onClick={() => showToast("More client stories coming soon.")}>Read client stories <ArrowRight size={18}/></button>
          </div>
        </section>

        <section className="section calculator" id="calculator">
          <div className="calc-intro">
            <div className="eyebrow">A LITTLE SELF-DISCOVERY</div>
            <h2>Know your <em>starting point.</em></h2>
            <p>Use our quick check-in for a simple BMI estimate. It's a starting signal, not a judgment.</p>
            <div className="calc-note"><CircleCheck size={18}/> Your full plan uses more than one metric.</div>
          </div>
          <div className="calc-card">
            <div className="calc-tabs">{["Lose weight","Build strength","Feel better"].map(x => <button className={goal===x ? "active":""} onClick={() => setGoal(x)} key={x}>{x}</button>)}</div>
            <div className="inputs">
              <label>Height <span>cm</span><input value={height} onChange={e=>setHeight(e.target.value)} type="number" placeholder="170"/></label>
              <label>Weight <span>kg</span><input value={weight} onChange={e=>setWeight(e.target.value)} type="number" placeholder="70"/></label>
              <label className="full">Activity level<select value={activity} onChange={e=>setActivity(e.target.value)}><option>Sedentary</option><option>Light</option><option>Moderate</option><option>Very active</option></select></label>
            </div>
            <div className="calc-result">{bmi ? <><div><span>Your estimated BMI</span><strong>{bmi}</strong></div><div className="result-pill">{Number(bmi)<18.5?"Below range":Number(bmi)<25?"Healthy range":Number(bmi)<30?"Above range":"Higher range"}</div></> : <div className="result-empty">Enter your height & weight to see your estimate.</div>}</div>
            <button className="primary-btn wide" onClick={() => setModal(true)}>Get my personalized assessment <ArrowRight size={18}/></button>
          </div>
        </section>

        <section className="section plans" id="plans">
          <div className="section-heading center"><div><div className="eyebrow">CHOOSE YOUR LEVEL</div><h2>A plan that <em>moves with you.</em></h2></div><p>Start small, go all in, or let us tailor the pace. You can upgrade anytime.</p></div>
          <div className="plan-grid">{plans.map(plan => <article className={`plan-card ${plan.popular?"featured":""}`} key={plan.name}>{plan.popular && <div className="popular">MOST POPULAR</div>}<div className={`plan-symbol ${plan.accent}`}><Leaf size={20}/></div><h3>{plan.name}</h3><p>{plan.desc}</p><div className="price">{plan.price}<small>/ program</small></div><ul>{plan.features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul><button className={plan.popular?"primary-btn":"secondary-btn"} onClick={()=>setModal(true)}>Choose {plan.name} <ArrowRight size={17}/></button></article>)}</div>
        </section>

        <section className="section quote-section">
          <div className="quote-decoration">✦</div>
          <blockquote>“The goal isn't to eat perfectly.<br /><em>It's to make feeling good your default.</em>”</blockquote>
          <span>— THE NOURISH PHILOSOPHY</span>
        </section>

        <section className="section faq" id="faq">
          <div className="faq-title"><div className="eyebrow">QUESTIONS, ANSWERED</div><h2>Nothing hidden.<br /><em>Everything clear.</em></h2><p>Still curious? Our coaches are one message away.</p><button className="text-btn" onClick={()=>showToast("We'll connect you with a coach.")}>Chat with a coach <MessageCircle size={17}/></button></div>
          <div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${faq===i?"open":""}`} key={q}><button onClick={()=>setFaq(faq===i?null:i)}><span>{q}</span>{faq===i?<X size={19}/>:<Plus size={19}/>}</button>{faq===i&&<p>{a}</p>}</div>)}</div>
        </section>

        <section className="cta-section">
          <div className="cta-glow" />
          <div className="eyebrow">READY WHEN YOU ARE</div>
          <h2>Your best habits<br /><em>start with one meal.</em></h2>
          <p>Tell us where you want to go. We'll help you build the route.</p>
          <button className="primary-btn light" onClick={()=>setModal(true)}>Start my nutrition journey <ArrowRight size={18}/></button>
        </section>
      </main>

      <footer><div className="footer-brand"><span className="brand-mark"><Leaf size={17}/></span><b>NOURISH.</b><p>Nutrition, made personal.</p></div><div className="footer-links"><button>Instagram</button><button>Privacy</button><button>Terms</button></div><span>© 2026 Nourish</span></footer>

      {modal && <div className="modal-backdrop" onClick={()=>setModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setModal(false)}><X/></button><div className="eyebrow">LET'S GET STARTED</div><h2>Build your <em>better routine.</em></h2><p>Leave your details and a Nourish coach will help you choose the right program.</p><input placeholder="Your name"/><input placeholder="WhatsApp / phone number"/><select><option>{goal}</option><option>Improve digestion</option><option>Build strength</option><option>Better energy</option></select><button className="primary-btn wide" onClick={()=>{setModal(false);showToast("You're on the list — we'll be in touch!");}}>Request my plan <ArrowRight size={18}/></button><small>No spam. Just one helpful conversation.</small></div></div>}
      {toast && <div className="toast"><CircleCheck size={18}/>{toast}</div>}
    </div>
  );
}

export default App;
