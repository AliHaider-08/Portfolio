// src/Componets/Skills.jsx
import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaGitAlt,
  FaNetworkWired,
  FaLaptopCode,
  FaServer,
  FaStar,
  FaTrophy,
  FaRocket,
  FaLightbulb,
  FaCode,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiNextdotjs,
  SiPostman,
  SiFirebase,
  SiVercel,
  SiCisco,
  SiWireshark,
} from "react-icons/si";

/**
 * Advanced Skills.jsx
 * - Includes Programming and Networking categories (plus Frontend/Backend/Database/Tools)
 * - Search, filter by category, sort by level/name/experience
 * - Skill detail modal (projects + description)
 * - Keyboard shortcuts: "/" focuses search, "Esc" closes modal
 * - Framer Motion animations use `animate` (no whileInView) to avoid disappearing
 * - Tailwind CSS for styling, dark-mode friendly
 */

/* ------------------------
   Dataset (Programming + Networking + others)
   You can extend or move to API/JSON.
-------------------------*/
const ALL_SKILLS = {
  Programming: [
    {
      id: "algorithms",
      name: " Data Structures Algorithms &",
      icon: <FaLaptopCode />,
      level: 88,
      years: 1.5,
      color: "#f97316",
      description:
        "Core algorithmic thinking: arrays, trees, graphs, sorting, searching, and complexity analysis.",
      projects: ["Problem Solving Challenges", "Algorithm Visualizer"],
    },
    {
      id: "oop",
      name: "Programming Languages",
      icon: <FaLaptopCode />,
      level: 82,
      years: 2.0,
      color: "#60a5fa",
      description:
        "Solid understanding of OOP principles and common design patterns (Singleton, Factory, Observer, Strategy).",
      projects: ["Inventory System", "Design Patterns Demo"],
    },
    {
      id: "python",
      name: "Python Programming",
      icon: <FaPython />,
      level: 84,
      years: 2.8,
      color: "#3776AB",
      description:
        "Scripting, automation, data processing, and building small web services with Python.",
      projects: ["Automation Scripts", "Data ETL Pipelines"],
    },
    {
      id: "c_programming",
      name: "C / Systems Programming",
      icon: <FaLaptopCode />,
      level: 70,
      years: 1.2,
      color: "#06b6d4",
      description:
        "Low-level programming basics, memory management, pointers, and simple systems tasks.",
      projects: ["Socket Examples", "Memory Manager Demo"],
    },
  ],
  Networking: [
    {
      id: "tcpip",
      name: "Cisco Certified Network Associate",
      icon: <FaNetworkWired />,
      level: 86,
      years: 2.0,
      color: "#10b981",
      description:
        "In-depth knowledge of TCP/IP stack, packet flow, ports, and how applications interact with the network layer.",
      projects: ["Packet Tracer Labs", "Network Simulation"],
    },
    {
      id: "subnetting",
      name: "Subnetting & IP Addressing",
      icon: <FaNetworkWired />,
      level: 90,
      years: 2.1,
      color: "#34d399",
      description:
        "Subnet calculations, CIDR notation, VLSM, planning subnets for networks of various sizes.",
      projects: ["Subnet Planner", "Lab Exercises"],
    },
    {
      id: "routing",
      name: "Routing & Switching (CCNA topics)",
      icon: <SiCisco />,
      level: 78,
      years: 1.6,
      color: "#0ea5e9",
      description:
        "Basic routing protocols, switching concepts, VLANs, trunking, and inter-VLAN routing.",
      projects: ["VLAN Setup", "Basic OSPF Labs"],
    },
    {
      id: "wireshark",
      name: "Wireshark & Packet Analysis",
      icon: <SiWireshark />,
      level: 80,
      years: 1.4,
      color: "#6366f1",
      description:
        "Packet capture analysis, filtering, interpreting packet headers, troubleshooting network issues.",
      projects: ["Capture Analysis", "Protocol Debugging"],
    },
    {
      id: "network_tools",
      name: "Network Tools (Cisco Packet Tracer)",
      icon: <FaServer />,
      level: 75,
      years: 1.1,
      color: "#f43f5e",
      description:
        "Using common networking tools for discovery, scanning and debugging (nmap, traceroute, netstat).",
      projects: ["Scanning Labs"],
    },
  ],
  Frontend: [
    {
      id: "react",
      name: "React.js",
      icon: <FaReact />,
      level: 92,
      years: 2.0,
      color: "#61DBFB",
      description:
        "Component-driven UI, hooks, context, performance tuning, and large-scale React app patterns.",
      projects: ["Portfolio", "E-commerce UI"],
    },
    {
      id: "JavaScript",
      name: "JavaScript",
      icon: <SiExpress />,
      level: 88,
      years: 2.0,
      color: "#000000",
      description:
        "SSR/SSG, API routes, routing, image optimization, and hybrid rendering strategies.",
      projects: ["Blog (SSG)", "Landing Page"],
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
      level: 90,
      years: 2.0,
      color: "#38BDF8",
      description: "Utility-first CSS for fast UIs and consistent design systems.",
      projects: ["Landing Page"],
    },
  ],
  Backend: [
    {
      id: "node",
      name: "Node.js",
      icon: <FaNodeJs />,
      level: 90,
      years: 1.5,
      color: "#3C873A",
      description: "Server-side JS, streams, and building RESTful services with Express.",
      projects: ["API Server"],
    },
    {
      id: "express",
      name: "Express.js",
      icon: <SiExpress />,
      level: 84,
      years: 1.5,
      color: "#828282",
      description: "Routing, middleware, and app structure for Node.js backends.",
      projects: ["Auth API"],
    },
  ],
  Database: [
    {
      id: "mysql",
      name: "MySQL",
      icon: <SiMysql />,
      level: 86,
      years: 1.5,
      color: "#00758F",
      description: "Relational design, joins, indexing, and query optimization.",
      projects: ["Student Management"],
    },
    {
      id: "mongodb",
      name: "MongoDB",
      icon: <SiMongodb />,
      level: 78,
      years: 1.0,
      color: "#47A248",
      description: "Document DB modeling and aggregation queries.",
      projects: ["MERN Blog"],
    },

    {
      id: "PostgreSQL",
      name: "PostgreSQL",
      icon: <SiMongodb />,
      level: 78,
      years: 1.0,
      color: "#47A248",
      description: "Document DB modeling and aggregation queries.",
      projects: ["MERN Blog"],
    },
  ],
  Tools: [
    {
      id: "git",
      name: "Git & GitHub",
      icon: <FaGithub />,
      level: 90,
      years: 1.0,
      color: "#171515",
      description: "Version control workflows, PRs, and CI basics.",
      projects: ["Open Source"],
    },
    {
      id: "postman",
      name: "Postman",
      icon: <SiPostman />,
      level: 88,
      years: 1.5,
      color: "#FF6C37",
      description: "API testing, collections, and automated tests.",
      projects: ["API Test Suites"],
    },

    {
      id: "VsCode",
      name: "VSCode",
      icon: <SiVercel />,
      level: 86,
      years: 4.0,
      color: "#000000",
      description: "Deployment and preview environments for apps.",
      projects: ["Portfolio Deployment"],
    },
    {
      id: "vercel",
      name: "Vercel",
      icon: <SiVercel />,
      level: 86,
      years: 1.0,
      color: "#000000",
      description: "Deployment and preview environments for frontend apps.",
      projects: ["Portfolio Deployment"],
    },
  ],
};

/* ---------------------------
   Utility helpers
---------------------------*/
const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));

const LS_FAV = "skills:fav:v1";
const loadFavs = () => {
  try {
    const raw = localStorage.getItem(LS_FAV);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
const saveFavs = (arr) => {
  try {
    localStorage.setItem(LS_FAV, JSON.stringify(arr));
  } catch {}
};

/* ---------------------------
   Progress Ring (SVG)
---------------------------*/
const ProgressRing = ({ percentage = 0, size = 80, stroke = 8 }) => {
  const pct = clamp(percentage);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <svg width={size} height={size} role="img" aria-label={`${pct}%`}>
      <defs>
        <linearGradient id="g2" x1="0" x2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={radius} stroke="currentColor" strokeOpacity="0.06" strokeWidth={stroke} fill="transparent" />
        <circle
          r={radius}
          stroke="url(#g2)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90)"
        />
        <text x="0" y="5" textAnchor="middle" fill="currentColor" style={{ fontWeight: 700, fontSize: 12 }}>
          {pct}%
        </text>
      </g>
    </svg>
  );
};

/* ---------------------------
   Skill Card
---------------------------*/
const SkillCard = React.memo(function SkillCard({ skill, onOpen, isFav, onToggleFav }) {
  return (
    <motion.article
      layout
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      onClick={() => onOpen(skill)}
      className="cursor-pointer relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
      aria-labelledby={`skill-${skill.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-white/30 dark:bg-black/20 text-3xl" style={{ color: skill.color }}>
            {skill.icon}
          </div>
          <div>
            <h3 id={`skill-${skill.id}`} className="text-lg font-semibold text-gray-900 dark:text-white">
              {skill.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {skill.category || ""} • {skill.years} yr{skill.years > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="w-20 h-20">
            <ProgressRing percentage={skill.level} size={72} stroke={8} />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav(skill.id);
            }}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-pressed={!!isFav}
            title={isFav ? "Remove favorite" : "Add favorite"}
          >
            {isFav ? "★" : "☆"}
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{skill.description}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1 }}
              aria-hidden
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{skill.level}% proficiency</p>
        </div>

        <div>
          <button className="px-3 py-1 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">View</button>
        </div>
      </div>

      {/* subtle hover overlay */}
      <motion.div className="absolute inset-0 pointer-events-none rounded-2xl" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} animate={{ opacity: 0 }} style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.02), rgba(124,58,237,0.02))" }} />
    </motion.article>
  );
});

/* ---------------------------
   Modal
---------------------------*/
function SkillModal({ skill, onClose, notes, setNotes, isFav, onToggleFav }) {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => ref.current?.focus?.(), 80);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!skill) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="fixed inset-0 bg-black/40" onClick={onClose} />

        <motion.div className="relative z-50 max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6" initial={{ y: 30, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.98 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-white/30 dark:bg-black/20 text-4xl" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold dark:text-white">{skill.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{skill.level}% • {skill.years} yrs</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => onToggleFav(skill.id)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-pressed={!!isFav}>
                {isFav ? "★" : "☆"}
              </button>
              <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 flex flex-col items-center gap-4">
              <div className="w-40 h-40">
                <ProgressRing percentage={skill.level} size={140} stroke={10} />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-300">Proficiency</p>
                <p className="text-2xl font-semibold dark:text-white">{skill.level}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-300">Experience</p>
                <p className="text-lg font-medium dark:text-gray-100">{skill.years} yrs</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">About</h4>
              <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{skill.description}</p>

              {skill.projects && skill.projects.length > 0 && (
                <>
                  <h4 className="mt-4 font-semibold text-gray-800 dark:text-gray-100">Projects</h4>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                    {skill.projects.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </>
              )}

              <h4 className="mt-4 font-semibold text-gray-800 dark:text-gray-100">Notes</h4>
              <textarea
                ref={ref}
                value={notes[skill.id] || ""}
                onChange={(e) => setNotes((s) => ({ ...s, [skill.id]: e.target.value }))}
                placeholder="Write study notes or ideas..."
                className="w-full min-h-[120px] p-3 mt-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------------------------
   Main Skills component
---------------------------*/
export default function Skills() {
  const categories = useMemo(() => Object.keys(ALL_SKILLS), []);
  const [category, setCategory] = useState("Programming");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("level-desc"); // level-desc, level-asc, name-asc, name-desc, years-desc
  const [selected, setSelected] = useState(null);
  const [favs, setFavs] = useState(() => loadFavs());
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem("skills:notes:v1");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // filtered list
  const filtered = useMemo(() => {
    const list = (ALL_SKILLS[category] || []).filter((s) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q) ||
        (s.projects || []).some((p) => p.toLowerCase().includes(q))
      );
    });
    switch (sort) {
      case "level-desc":
        list.sort((a, b) => b.level - a.level);
        break;
      case "level-asc":
        list.sort((a, b) => a.level - b.level);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "years-desc":
        list.sort((a, b) => (b.years || 0) - (a.years || 0));
        break;
      default:
        break;
    }
    return list;
  }, [category, query, sort]);

  // persist favs & notes
  useEffect(() => saveFavs(favs), [favs]);
  useEffect(() => {
    try {
      localStorage.setItem("skills:notes:v1", JSON.stringify(notes));
    } catch {}
  }, [notes]);

  // keyboard shortcuts
  const searchRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape") {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleFav = (id) => {
    setFavs((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((x) => x !== id) : [...prev, id];
      return next;
    });
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Skills & Knowledge</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-3xl mx-auto">Programming, networking, frontend & backend skills I use to build reliable, scalable systems. Press <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">/</kbd> to focus search.</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex gap-3 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-full text-sm font-medium ${category === c ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search skills, projects or descriptions..." className="w-full pl-10 pr-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
            </div>

            <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
              <option value="level-desc">Level (High → Low)</option>
              <option value="level-asc">Level (Low → High)</option>
              <option value="years-desc">Experience (High → Low)</option>
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <AnimatePresence>
            {filtered.map((skill) => (
              <motion.div key={skill.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="h-full">
                <SkillCard skill={{ ...skill, category }} onOpen={(s) => setSelected(s)} isFav={favs.includes(skill.id)} onToggleFav={toggleFav} />
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <motion.div className="col-span-full p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-300">No skills found. Try another search or category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer note */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center text-gray-500 dark:text-gray-400 mt-12 text-sm">
          *Levels are approximate — based on project experience and study.
        </motion.p>
      </div>

      {/* Skill Modal */}
      <AnimatePresence>
        {selected && <SkillModal skill={selected} onClose={() => setSelected(null)} notes={notes} setNotes={setNotes} isFav={favs.includes(selected.id)} onToggleFav={toggleFav} />}
      </AnimatePresence>
    </section>
  );
}
