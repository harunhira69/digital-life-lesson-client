import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// ── DATA ─────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    tag: "Wisdom · Community · Growth",
    headline: "Life taught you.",
    headline2: "Now teach the world.",
    sub: "Share the lessons that shaped you. Inspire millions walking the same path.",
    cta: "Start Writing",
    ctaSecondary: "Explore Lessons",
    to: "/dashboard/add-lesson",
    toSecondary: "/public-lessons",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90",
    accentColor: "#C9A84C",
    overlayFrom: "rgba(8,6,20,0.55)",
    overlayTo: "rgba(8,6,20,0.82)",
  },
  {
    tag: "Raw · Real · Human",
    headline: "Every scar holds",
    headline2: "a lesson worth sharing.",
    sub: "Browse thousands of authentic life lessons — unfiltered, deeply human, genuinely transformative.",
    cta: "Browse Lessons",
    ctaSecondary: "Join Free",
    to: "/public-lessons",
    toSecondary: "/auth/register",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=90",
    accentColor: "#5B9BD5",
    overlayFrom: "rgba(4,12,28,0.50)",
    overlayTo: "rgba(4,12,28,0.85)",
  },
  {
    tag: "Premium · Exclusive · Deep",
    headline: "Unlock the wisdom",
    headline2: "you can't find elsewhere.",
    sub: "Premium lessons cover career pivots, relationship truths, and hard-won mindset shifts from those who've lived it.",
    cta: "Go Premium",
    ctaSecondary: "Preview Free",
    to: "/pricing",
    toSecondary: "/public-lessons",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=90",
    accentColor: "#A07BD4",
    overlayFrom: "rgba(12,4,24,0.52)",
    overlayTo: "rgba(12,4,24,0.86)",
  },
];

const WHY_CARDS = [
  {
    num: "01",
    icon: "◈",
    title: "Preserve Your Wisdom",
    body: "Life's best lessons fade without a record. Writing them down turns fleeting insight into lasting clarity that compounds over time.",
    accent: "#C9A84C",
    glow: "rgba(201,168,76,0.12)",
  },
  {
    num: "02",
    icon: "◉",
    title: "Grow Through Reflection",
    body: "Articulating what you've learned deepens the lesson itself — turning raw experience into genuine, transferable wisdom.",
    accent: "#5B9BD5",
    glow: "rgba(91,155,213,0.12)",
  },
  {
    num: "03",
    icon: "◆",
    title: "Connect Across Lives",
    body: "Your hardest moment might be someone else's breakthrough. Shared struggles build unexpected bridges between strangers.",
    accent: "#A07BD4",
    glow: "rgba(160,123,212,0.12)",
  },
  {
    num: "04",
    icon: "◇",
    title: "Build a Living Legacy",
    body: "Long after the moment passes, your lessons remain — teaching, comforting, and quietly guiding people you'll never meet.",
    accent: "#5DBD8A",
    glow: "rgba(93,189,138,0.12)",
  },
];

const TONE_STYLES = {
  Motivational: { bg: "rgba(93,189,138,0.12)", text: "#5DBD8A", border: "rgba(93,189,138,0.25)" },
  Gratitude: { bg: "rgba(201,168,76,0.12)", text: "#C9A84C", border: "rgba(201,168,76,0.25)" },
  Realization: { bg: "rgba(160,123,212,0.12)", text: "#A07BD4", border: "rgba(160,123,212,0.25)" },
  Sad: { bg: "rgba(91,155,213,0.12)", text: "#5B9BD5", border: "rgba(91,155,213,0.25)" },
  Hopeful: { bg: "rgba(91,198,213,0.12)", text: "#5BC6D5", border: "rgba(91,198,213,0.25)" },
};

const getToneStyle = (tone) => TONE_STYLES[tone] || { bg: "rgba(255,255,255,0.06)", text: "rgba(255,255,255,0.55)", border: "rgba(255,255,255,0.12)" };

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
      <span style={{ width: "32px", height: "1px", background: "#C9A84C", display: "block" }} />
      <span style={{
        fontSize: "10px", fontWeight: "700", letterSpacing: "0.22em",
        textTransform: "uppercase", color: "#C9A84C", fontFamily: "'DM Mono', monospace",
      }}>{children}</span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub, align = "center" }) {
  return (
    <div style={{ textAlign: align, marginBottom: "60px" }}>
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 style={{
        fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: "800", color: "#FFFFFF",
        lineHeight: "1.1", marginBottom: "16px", fontFamily: "'Playfair Display', Georgia, serif",
        letterSpacing: "-0.02em",
      }}>{title}</h2>
      {sub && <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.05rem", maxWidth: "520px", margin: align === "center" ? "0 auto" : "0", lineHeight: "1.7" }}>{sub}</p>}
    </div>
  );
}

function ToneBadge({ tone }) {
  const s = getToneStyle(tone);
  return (
    <span style={{
      display: "inline-block", fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em",
      textTransform: "uppercase", padding: "3px 10px", borderRadius: "100px",
      background: s.bg, color: s.text, border: `1px solid ${s.border}`,
      fontFamily: "'DM Mono', monospace",
    }}>{tone}</span>
  );
}

function LessonCard({ lesson, locked, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: "16px", overflow: "hidden", cursor: "pointer",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.15)" : "none",
      }}
    >
      {/* Image */}
      <div style={{ height: "188px", overflow: "hidden", position: "relative" }}>
        {lesson.imageUrl ? (
          <img
            src={lesson.imageUrl} alt={lesson.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.5s ease" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a1520 0%, #0d0d14 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "48px", opacity: 0.18 }}>◈</span>
          </div>
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,6,20,0.7) 0%, transparent 60%)" }} />
        {lesson.accessLevel === "Premium" && (
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)",
            color: "#C9A84C", fontSize: "9px", fontWeight: "700", letterSpacing: "0.15em",
            padding: "3px 8px", borderRadius: "100px", textTransform: "uppercase", backdropFilter: "blur(8px)",
            fontFamily: "'DM Mono', monospace",
          }}>PREMIUM</div>
        )}
      </div>

      {/* Locked overlay */}
      {locked && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(8,6,20,0.78)",
          backdropFilter: "blur(6px)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", zIndex: 10, gap: "10px",
        }}>
          <span style={{ fontSize: "28px", opacity: 0.9 }}>🔒</span>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: "600", textAlign: "center", maxWidth: "140px" }}>
            Premium lesson — Upgrade to unlock
          </p>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <ToneBadge tone={lesson.emotionalTone} />
        </div>
        <h3 style={{
          color: hovered ? "#C9A84C" : "#FFFFFF", fontSize: "0.95rem", fontWeight: "700",
          lineHeight: "1.45", marginBottom: "8px", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          transition: "color 0.2s", fontFamily: "'Playfair Display', Georgia, serif",
        }}>{lesson.title}</h3>
        <p style={{
          color: "rgba(255,255,255,0.38)", fontSize: "0.82rem", lineHeight: "1.6",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          marginBottom: "16px",
        }}>{lesson.description}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={lesson.creatorPhotoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${lesson.creatorName}`}
              alt={lesson.creatorName}
              style={{ width: "26px", height: "26px", borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: "500" }}>{lesson.creatorName}</span>
          </div>
          <div style={{ display: "flex", gap: "12px", color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>
            <span>❤ {lesson.likesCount || 0}</span>
            <span>🔖 {lesson.savesCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ height: "188px", background: "rgba(255,255,255,0.04)", animation: "pulse 1.8s ease-in-out infinite" }} />
      <div style={{ padding: "18px 20px" }}>
        <div style={{ height: "14px", width: "60px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", marginBottom: "12px" }} />
        <div style={{ height: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "6px", marginBottom: "8px" }} />
        <div style={{ height: "14px", width: "75%", background: "rgba(255,255,255,0.04)", borderRadius: "6px" }} />
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function Home() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const { data: featured = [], isLoading: featuredLoading } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => (await axiosSecure.get("/featured-lessons")).data,
  });

  const { data: contributors = [], isLoading: contribLoading } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => (await axiosSecure.get("/top-contributors")).data,
  });

  const { data: mostSaved = [], isLoading: savedLoading } = useQuery({
    queryKey: ["most-saved-lessons"],
    queryFn: async () => (await axiosSecure.get("/most-saved-lessons")).data,
  });

  const handleLessonClick = (lesson) => {
    const locked = lesson.accessLevel === "Premium" && user?.role !== "Premium" && user?.role !== "admin";
    if (locked) navigate("/pricing");
    else navigate(`/life-lesson/${lesson._id}`);
  };

  const rankMedal = ["#C9A84C", "#A8A8B3", "#A0674A"];

  return (
    <div style={{ minHeight: "100vh", background: "#07060F", color: "#FFFFFF", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .hero-content { animation: fadeSlideUp 0.9s cubic-bezier(0.4,0,0.2,1) forwards; }
        .hero-content-delayed { animation: fadeSlideUp 0.9s 0.15s cubic-bezier(0.4,0,0.2,1) both; }
        .hero-content-more-delayed { animation: fadeSlideUp 0.9s 0.3s cubic-bezier(0.4,0,0.2,1) both; }
        .swiper-pagination-bullet { background: rgba(255,255,255,0.3) !important; width:5px !important; height:5px !important; transition:all 0.3s !important; }
        .swiper-pagination-bullet-active { background:#C9A84C !important; width:28px !important; border-radius:3px !important; }
        .lesson-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:20px; }
        .contributor-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:16px; }
        .saved-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:14px; }
        .why-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:20px; }
        @media(max-width:640px){
          .lesson-grid,.saved-grid{grid-template-columns:1fr}
          .contributor-grid{grid-template-columns:repeat(2,1fr)}
          .why-grid{grid-template-columns:1fr}
        }
      `}</style>

      {/* ── HERO SLIDER ──────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "100svh", minHeight: "620px", overflow: "hidden" }}>
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          onSlideChange={(s) => setActiveSlide(s.realIndex)}
          style={{ height: "100%", width: "100%" }}
        >
          {HERO_SLIDES.map((slide, i) => (
            <SwiperSlide key={i} style={{ position: "relative", height: "100%" }}>
              {/* BG Image */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover", backgroundPosition: "center",
              }} />
              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(105deg, ${slide.overlayTo} 0%, ${slide.overlayFrom} 55%, rgba(8,6,20,0.3) 100%)`,
              }} />
              {/* Decorative glow */}
              <div style={{
                position: "absolute", top: "15%", right: "8%",
                width: "480px", height: "480px", borderRadius: "50%",
                background: slide.accentColor, opacity: 0.07,
                filter: "blur(100px)", pointerEvents: "none",
              }} />
              {/* Vertical label (right side) */}
              <div style={{
                position: "absolute", right: "32px", top: "50%",
                transform: "translateY(-50%) rotate(90deg)",
                fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace",
                display: window.innerWidth > 768 ? "block" : "none",
              }}>Digital Life Lessons · {String(i + 1).padStart(2, "0")}</div>

              {/* Content */}
              <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", alignItems: "center" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px)", width: "100%" }}>
                  <div style={{ maxWidth: "680px" }}>
                    {/* Tag */}
                    <div className="hero-content" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                      <span style={{ width: "40px", height: "1px", background: slide.accentColor }} />
                      <span style={{
                        fontSize: "10px", fontWeight: "700", letterSpacing: "0.24em",
                        textTransform: "uppercase", color: slide.accentColor,
                        fontFamily: "'DM Mono', monospace",
                      }}>{slide.tag}</span>
                    </div>

                    {/* Headline */}
                    <div className="hero-content-delayed">
                      <h1 style={{
                        fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: "900",
                        lineHeight: "1.02", marginBottom: "6px", color: "#FFFFFF",
                        fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.025em",
                      }}>{slide.headline}</h1>
                      <h1 style={{
                        fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: "900",
                        lineHeight: "1.02", marginBottom: "28px",
                        fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.025em",
                        background: `linear-gradient(135deg, ${slide.accentColor} 0%, #FFFFFF 100%)`,
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      }}>{slide.headline2}</h1>
                    </div>

                    {/* Sub */}
                    <p className="hero-content-more-delayed" style={{
                      color: "rgba(255,255,255,0.58)", fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                      lineHeight: "1.75", maxWidth: "520px", marginBottom: "44px",
                    }}>{slide.sub}</p>

                    {/* CTAs */}
                    <div className="hero-content-more-delayed" style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", marginBottom: "52px" }}>
                      <Link
                        to={slide.to}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "8px",
                          padding: "14px 32px", borderRadius: "100px", fontWeight: "700",
                          fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
                          background: slide.accentColor, color: "#07060F",
                          boxShadow: `0 0 40px ${slide.accentColor}50`,
                          transition: "all 0.25s", textDecoration: "none",
                        }}
                        onMouseOver={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 0 60px ${slide.accentColor}70`; }}
                        onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 0 40px ${slide.accentColor}50`; }}
                      >
                        {slide.cta} <span style={{ fontSize: "16px" }}>→</span>
                      </Link>
                      <Link
                        to={slide.toSecondary}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "8px",
                          padding: "14px 32px", borderRadius: "100px", fontWeight: "600",
                          fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
                          background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)",
                          border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                          transition: "all 0.25s", textDecoration: "none",
                        }}
                        onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                      >
                        {slide.ctaSecondary}
                      </Link>
                    </div>

                    {/* Stats bar */}
                    <div className="hero-content-more-delayed" style={{
                      display: "flex", gap: "40px", paddingTop: "28px",
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                    }}>
                      {[{ val: "12K+", label: "Life lessons" }, { val: "4.8K", label: "Contributors" }, { val: "98%", label: "Found value" }].map(({ val, label }) => (
                        <div key={label}>
                          <div style={{ fontSize: "1.6rem", fontWeight: "900", color: slide.accentColor, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{val}</div>
                          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", marginTop: "4px", letterSpacing: "0.05em" }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
          opacity: 0.35, animation: "float 2.5s ease-in-out infinite",
        }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "white", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>scroll</span>
          <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, white, transparent)" }} />
        </div>
      </section>

      {/* ── FEATURED LESSONS ─────────────────────────────────────────────────── */}
      <section style={{ padding: "110px clamp(20px,5vw,80px)", maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Editor's Picks"
          title="Featured Life Lessons"
          sub="Hand-selected for depth, authenticity, and the kind of insight that shifts perspectives."
        />

        {featuredLoading ? (
          <div className="lesson-grid">{[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : featured.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.3)" }}>
            <p style={{ fontSize: "2rem", marginBottom: "12px", opacity: 0.5 }}>◈</p>
            <p style={{ fontSize: "1rem" }}>No featured lessons yet. Admins can feature lessons from the dashboard.</p>
          </div>
        ) : (
          <div className="lesson-grid">
            {featured.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                locked={lesson.accessLevel === "Premium" && user?.role !== "Premium" && user?.role !== "admin"}
                onClick={() => handleLessonClick(lesson)}
              />
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            to="/public-lessons"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 28px", borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)",
              fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.25s",
            }}
            onMouseOver={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "rgba(201,168,76,0.07)"; }}
            onMouseOut={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "transparent"; }}
          >
            View all lessons <span>→</span>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)", margin: "0 clamp(20px,5vw,80px)" }} />

      {/* ── WHY LEARNING MATTERS ─────────────────────────────────────────────── */}
      <section style={{ padding: "110px clamp(20px,5vw,80px)", position: "relative", overflow: "hidden" }}>
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <SectionHeader
            eyebrow="Our Philosophy"
            title="Why learning from life matters"
            sub="Books teach theory. Life teaches truth. We exist at the intersection."
          />
          <div className="why-grid">
            {WHY_CARDS.map((card, i) => (
              <div
                key={i}
                style={{
                  position: "relative", padding: "36px 30px", borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: `radial-gradient(circle at 0% 0%, ${card.glow} 0%, rgba(255,255,255,0.015) 70%)`,
                  transition: "all 0.35s",
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = `${card.accent}40`; e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.35)`; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: "22px", right: "22px", fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.1)", fontWeight: "700" }}>{card.num}</div>
                <div style={{ fontSize: "28px", color: card.accent, marginBottom: "18px", fontFamily: "monospace" }}>{card.icon}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: card.accent, marginBottom: "12px", fontFamily: "'Playfair Display', Georgia, serif" }}>{card.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.875rem", lineHeight: "1.75" }}>{card.body}</p>
              </div>
            ))}
          </div>

          {/* Inner CTA banner */}
          <div style={{
            marginTop: "64px", borderRadius: "20px", padding: "64px clamp(30px,6vw,80px)",
            background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(160,123,212,0.06) 100%)",
            border: "1px solid rgba(201,168,76,0.15)", textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(201,168,76,0.06)", filter: "blur(60px)" }} />
            <h3 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: "800", color: "#FFFFFF", marginBottom: "14px", fontFamily: "'Playfair Display', Georgia, serif" }}>
              Your story deserves to be heard.
            </h3>
            <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "34px", maxWidth: "400px", margin: "0 auto 34px", fontSize: "1rem", lineHeight: "1.7" }}>
              Start with one lesson. One moment. One truth. That's enough to begin.
            </p>
            <Link
              to={user ? "/dashboard/add-lesson" : "/auth/register"}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "15px 36px", borderRadius: "100px",
                background: "#C9A84C", color: "#07060F", fontWeight: "800",
                fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", boxShadow: "0 0 40px rgba(201,168,76,0.35)",
                transition: "all 0.25s",
              }}
              onMouseOver={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(201,168,76,0.55)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(201,168,76,0.35)"; }}
            >
              {user ? "Write your first lesson" : "Join for free"} →
            </Link>
          </div>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)", margin: "0 clamp(20px,5vw,80px)" }} />

      {/* ── TOP CONTRIBUTORS ─────────────────────────────────────────────────── */}
      <section style={{ padding: "110px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="Community Spotlight"
            title="Top contributors this week"
            sub="The voices behind our most-loved lessons — prolific, thoughtful, and relentlessly real."
          />
          {contribLoading ? (
            <div className="contributor-grid">{[...Array(6)].map((_, i) => <div key={i} style={{ height: "160px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", animation: "pulse 1.8s infinite" }} />)}</div>
          ) : contributors.length === 0 ? (
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "60px 0" }}>No contributors yet.</p>
          ) : (
            <div className="contributor-grid">
              {contributors.map((c, i) => (
                <div
                  key={c._id}
                  style={{
                    position: "relative", display: "flex", flexDirection: "column",
                    alignItems: "center", textAlign: "center",
                    padding: "28px 16px 24px",
                    borderRadius: "16px",
                    border: `1px solid ${i < 3 ? `${rankMedal[i]}30` : "rgba(255,255,255,0.06)"}`,
                    background: i < 3 ? `radial-gradient(circle at 50% 0%, ${rankMedal[i]}10 0%, rgba(255,255,255,0.02) 70%)` : "rgba(255,255,255,0.02)",
                    transition: "all 0.3s", cursor: "pointer",
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = i < 3 ? `${rankMedal[i]}30` : "rgba(255,255,255,0.06)"; }}
                >
                  {i < 3 && (
                    <div style={{
                      position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)",
                      width: "22px", height: "22px", borderRadius: "50%",
                      background: rankMedal[i], display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "9px", fontWeight: "900", color: "#07060F",
                      fontFamily: "'DM Mono', monospace",
                    }}>{i + 1}</div>
                  )}
                  <img
                    src={c.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}`}
                    alt={c.name}
                    style={{
                      width: "62px", height: "62px", borderRadius: "50%", objectFit: "cover",
                      border: `2px solid ${i < 3 ? rankMedal[i] + "60" : "rgba(255,255,255,0.1)"}`,
                      marginBottom: "12px",
                    }}
                  />
                  <p style={{
                    color: "#FFFFFF", fontSize: "13px", fontWeight: "700",
                    lineHeight: "1.4", marginBottom: "6px",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{c.name}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ color: "#C9A84C", fontWeight: "800", fontSize: "13px", fontFamily: "'DM Mono', monospace" }}>{c.lessonCount}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>lessons</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)", margin: "0 clamp(20px,5vw,80px)" }} />

      {/* ── MOST SAVED LESSONS ───────────────────────────────────────────────── */}
      <section style={{ padding: "110px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="Community Favorites"
            title="Most saved lessons"
            sub="These are the lessons people return to again and again — saved, shared, and treasured."
          />
          {savedLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[...Array(6)].map((_, i) => <div key={i} style={{ height: "76px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", animation: "pulse 1.8s infinite" }} />)}
            </div>
          ) : mostSaved.length === 0 ? (
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "60px 0" }}>No saved lessons yet.</p>
          ) : (
            <div className="saved-grid">
              {mostSaved.map((lesson, i) => {
                const medal = i < 3 ? rankMedal[i] : null;
                return (
                  <div
                    key={lesson._id}
                    onClick={() => handleLessonClick(lesson)}
                    style={{
                      display: "flex", alignItems: "center", gap: "16px",
                      padding: "16px 18px", borderRadius: "14px", cursor: "pointer",
                      border: `1px solid ${medal ? `${medal}22` : "rgba(255,255,255,0.06)"}`,
                      background: medal ? `linear-gradient(135deg, ${medal}08, rgba(255,255,255,0.02))` : "rgba(255,255,255,0.02)",
                      transition: "all 0.3s",
                    }}
                    onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; e.currentTarget.style.background = "rgba(201,168,76,0.05)"; }}
                    onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = medal ? `${medal}22` : "rgba(255,255,255,0.06)"; e.currentTarget.style.background = medal ? `linear-gradient(135deg, ${medal}08, rgba(255,255,255,0.02))` : "rgba(255,255,255,0.02)"; }}
                  >
                    {/* Rank badge */}
                    <div style={{
                      flexShrink: 0, width: "36px", height: "36px", borderRadius: "10px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: "900", fontFamily: "'DM Mono', monospace",
                      background: medal ? `${medal}18` : "rgba(255,255,255,0.04)",
                      color: medal || "rgba(255,255,255,0.25)",
                      border: `1px solid ${medal ? `${medal}35` : "rgba(255,255,255,0.07)"}`,
                    }}>#{i + 1}</div>

                    {/* Thumb */}
                    {lesson.imageUrl ? (
                      <img src={lesson.imageUrl} alt="" style={{ width: "52px", height: "52px", borderRadius: "10px", objectFit: "cover", flexShrink: 0, opacity: 0.85 }} />
                    ) : (
                      <div style={{ width: "52px", height: "52px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "20px", opacity: 0.4 }}>◈</span>
                      </div>
                    )}

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        color: "#FFFFFF", fontSize: "13px", fontWeight: "700",
                        lineHeight: "1.4", marginBottom: "5px",
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}>{lesson.title}</h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>{lesson.creatorName}</span>
                        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px" }}>·</span>
                        <ToneBadge tone={lesson.emotionalTone} />
                      </div>
                    </div>

                    {/* Saves count */}
                    <div style={{ flexShrink: 0, textAlign: "right" }}>
                      <div style={{ color: "#5DBD8A", fontSize: "14px", fontWeight: "800", fontFamily: "'DM Mono', monospace" }}>{lesson.savesCount || 0}</div>
                      <div style={{ color: "rgba(255,255,255,0.28)", fontSize: "10px" }}>saves</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link
              to="/public-lessons"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 28px", borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)",
                fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase",
                textDecoration: "none", transition: "all 0.25s",
              }}
              onMouseOver={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "rgba(201,168,76,0.07)"; }}
              onMouseOut={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "transparent"; }}
            >
              Explore all lessons →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "110px clamp(20px,5vw,80px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(91,155,213,0.04), transparent)", pointerEvents: "none" }} />
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)", marginBottom: "0", position: "absolute", top: 0, left: 0, right: 0 }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <SectionLabel>Start Your Journey</SectionLabel>
          <h2 style={{
            fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: "900", color: "#FFFFFF",
            lineHeight: "1.08", marginBottom: "20px",
            fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em",
          }}>
            Your lesson is waiting<br />
            <span style={{ background: "linear-gradient(135deg, #C9A84C, #A07BD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              to be written.
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "1.05rem", lineHeight: "1.75", marginBottom: "44px", maxWidth: "480px", margin: "0 auto 44px" }}>
            Every extraordinary story begins with one ordinary person deciding to share it. Your wisdom has value.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
            <Link
              to={user ? "/dashboard/add-lesson" : "/auth/register"}
              style={{
                padding: "15px 38px", borderRadius: "100px",
                background: "#FFFFFF", color: "#07060F",
                fontWeight: "800", fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", boxShadow: "0 0 40px rgba(255,255,255,0.12)",
                transition: "all 0.25s", display: "inline-flex", alignItems: "center", gap: "8px",
              }}
              onMouseOver={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.background = "#F5F0E8"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "#FFFFFF"; }}
            >
              {user ? "Add a lesson" : "Create free account"} →
            </Link>
            <Link
              to="/public-lessons"
              style={{
                padding: "15px 38px", borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)",
                fontWeight: "600", fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", transition: "all 0.25s", display: "inline-flex", alignItems: "center", gap: "8px",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
            >
              Browse first
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}