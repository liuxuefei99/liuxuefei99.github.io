import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import {
  ArrowUpRight,
  CalendarDays,
  Mail,
  MapPin,
  Microscope,
  Radio,
  ScanLine,
} from "lucide-react";
import CellUniverse from "./CellUniverse.jsx";
import {
  awards,
  cellModes,
  education,
  metrics,
  navTabs,
  profile,
  projects,
  publications,
  researchInterests,
  statusItems,
  team,
} from "./data.js";

function QRPanel() {
  const [qrSrc, setQrSrc] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    const url = window.location.href;
    setPageUrl(url);
    QRCode.toDataURL(url, {
      width: 192,
      margin: 1,
      color: {
        dark: "#111827",
        light: "#f8fafc",
      },
    }).then(setQrSrc);
  }, []);

  return (
    <div className="qr-block">
      <div className="qr-heading">
        <ScanLine size={18} />
        <span>主页二维码</span>
      </div>
      <div className="qr-frame">
        {qrSrc ? <img src={qrSrc} alt="个人主页二维码" /> : <span />}
      </div>
      <p>{pageUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</p>
    </div>
  );
}

function StatusStack() {
  return (
    <div className="status-stack">
      {statusItems.map((item) => {
        const Icon = item.icon;
        return (
          <div className="status-row" key={item.label}>
            <Icon size={17} />
            <div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="tab-grid tab-grid-profile">
      <article className="panel feature-panel">
        <div className="panel-kicker">研究方向</div>
        <h2>用细胞状态、空间位置和互作网络理解肿瘤转移。</h2>
        <p>
          我的研究结合单细胞转录组、空间组学和计算建模，关注肿瘤进展中的
          肿瘤-内皮-免疫微环境互作，尤其是转移相关生态位的形成与演化。
        </p>
        <div className="chip-cloud">
          {researchInterests.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
      </article>

      <article className="panel">
        <div className="panel-kicker">教育经历</div>
        <div className="timeline">
          {education.map((item) => (
            <div className="timeline-item" key={item.school}>
              <span />
              <div>
                <h3>{item.school}</h3>
                <p>{item.detail}</p>
                <small>{item.years}</small>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

function PublicationsPanel() {
  return (
    <div className="publication-list">
      {publications.map((paper) => {
        const content = (
          <>
            <div className="paper-meta">
              <span>{paper.journal}</span>
              <span>{paper.year}</span>
              <span>{paper.role}</span>
            </div>
            <h3>{paper.title}</h3>
            <p>{paper.authors}</p>
          </>
        );

        if (paper.href) {
          return (
            <a className="paper-card" href={paper.href} target="_blank" rel="noreferrer" key={paper.title}>
              {content}
              <ArrowUpRight size={18} />
            </a>
          );
        }

        return (
          <article className="paper-card" key={paper.title}>
            {content}
          </article>
        );
      })}
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div className="tab-grid">
      <article className="panel">
        <div className="panel-kicker">项目经历</div>
        <div className="project-list">
          {projects.map((project) => (
            <div className="project-item" key={project.title}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.body}</p>
              </div>
              <div className="project-aside">
                <strong>{project.years}</strong>
                <span>{project.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel">
        <div className="panel-kicker">荣誉奖励</div>
        <div className="award-list">
          {awards.map((award) => (
            <div className="award-item" key={award}>
              <span />
              <p>{award}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

function TeamPanel() {
  return (
    <div className="team-grid">
      {team.map((member) => (
        <article className="team-card" key={member.name}>
          <img src={member.image} alt={`${member.cn}头像`} />
          <div>
            <h3>
              {member.cn}
              <span>{member.name}</span>
            </h3>
            <p>{member.org}</p>
            <strong>{member.role}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}

function TabPanel({ activeTab }) {
  if (activeTab === "publications") return <PublicationsPanel />;
  if (activeTab === "projects") return <ProjectsPanel />;
  if (activeTab === "team") return <TeamPanel />;
  return <ProfilePanel />;
}

const sectionTitles = {
  profile: "个人学术主页",
  publications: "代表性论文",
  projects: "项目与荣誉",
  team: "地下小分队",
};

export default function App() {
  const [activeTab, setActiveTab] = useState("profile");
  const [cellMode, setCellMode] = useState("spatial");

  const activeMode = useMemo(
    () => cellModes.find((mode) => mode.id === cellMode) ?? cellModes[0],
    [cellMode],
  );

  return (
    <div className="site-shell">
      <CellUniverse mode={cellMode} />
      <header className="topbar">
        <button className="brand-mark" type="button" onClick={() => setActiveTab("profile")}>
          <span>XL</span>
          <strong>刘雪飞</strong>
        </button>
        <nav className="nav-tabs" aria-label="主导航">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                className={selected ? "active" : ""}
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={selected}
              >
                <Icon size={17} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="presence-pill">
              <span className="live-dot" />
              <Radio size={16} />
              <strong>正在构建肿瘤转移生态位图谱</strong>
            </div>
            <h1>
              {profile.chineseName}
              <span>{profile.name}</span>
            </h1>
            <p className="hero-lede">{profile.focus}</p>
            <div className="hero-meta">
              <span>
                <Microscope size={18} />
                {profile.title}
              </span>
              <span>
                <MapPin size={18} />
                {profile.location}
              </span>
              <span>
                <CalendarDays size={18} />
                南科大 生物学
              </span>
            </div>
            <div className="hero-actions">
              <a href={`mailto:${profile.emails[0]}`} className="primary-action">
                <Mail size={18} />
                联系我
              </a>
              <button type="button" onClick={() => setActiveTab("publications")}>
                查看论文
                <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="metric-strip">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="identity-panel">
            <div className="portrait-wrap">
              <img src={profile.portrait} alt="Xuefei Liu portrait" />
              <span className="portrait-glow" />
            </div>
            <div className="identity-text">
              <span>博士研究生</span>
              <h2>单细胞空间组学</h2>
              <p>南方科技大学 | 计算生物学</p>
            </div>
            <StatusStack />
            <QRPanel />
          </aside>
        </section>

        <section className="mode-section">
          <div className="mode-switcher" role="tablist" aria-label="细胞状态模式">
            {cellModes.map((mode) => {
              const Icon = mode.icon;
              const selected = cellMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  className={selected ? "selected" : ""}
                  onClick={() => setCellMode(mode.id)}
                  aria-selected={selected}
                  role="tab"
                >
                  <Icon size={18} />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
          <article className="mode-detail">
            <span>{activeMode.kicker}</span>
            <h2>{activeMode.title}</h2>
            <p>{activeMode.copy}</p>
          </article>
        </section>

        <section className="content-tabs">
          <div className="content-heading">
            <span>{navTabs.find((tab) => tab.id === activeTab)?.label}</span>
            <h2>{sectionTitles[activeTab]}</h2>
          </div>
          <TabPanel activeTab={activeTab} />
        </section>
      </main>
    </div>
  );
}
