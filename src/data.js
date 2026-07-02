import {
  Activity,
  Award,
  BookOpenText,
  BrainCircuit,
  FlaskConical,
  GitBranch,
  Layers3,
  MapPinned,
  Orbit,
  Sparkles,
  Users,
} from "lucide-react";

const assetPath = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;

export const profile = {
  name: "Xuefei Liu",
  chineseName: "刘雪飞",
  title: "南方科技大学博士研究生",
  focus: "计算生物学 | 单细胞与空间组学 | 肿瘤转移机制",
  location: "广东深圳",
  emails: ["12231372@mail.sustech.edu.cn", "liter_frye@163.com"],
  portrait: assetPath("xuefei-liu.png"),
};

export const navTabs = [
  { id: "profile", label: "个人主页", icon: BrainCircuit },
  { id: "publications", label: "论文成果", icon: BookOpenText },
  { id: "projects", label: "项目荣誉", icon: FlaskConical },
  { id: "team", label: "DX Team", icon: Users },
];

export const cellModes = [
  {
    id: "cluster",
    label: "细胞分群",
    icon: Layers3,
    kicker: "注释视角",
    title: "细胞类型分离成漂浮的转录组岛屿。",
    copy: "从类似 UMAP 的抽象视角出发，恶性细胞、内皮细胞、T 细胞、巨噬细胞和基质细胞形成不同但彼此通讯的邻域。",
  },
  {
    id: "spatial",
    label: "空间定位",
    icon: MapPinned,
    kicker: "组织地图",
    title: "细胞分群重新折叠到组织空间场中。",
    copy: "同一批细胞被映射回分层的微环境，展示转录组身份与空间位置如何被共同解读。",
  },
  {
    id: "trajectory",
    label: "状态轨迹",
    icon: GitBranch,
    kicker: "状态切换",
    title: "细胞沿分支轨迹进入转移相关状态。",
    copy: "分支路线突出细胞状态转换、可塑性，以及肿瘤程序与免疫压力之间不断变化的关系。",
  },
  {
    id: "niche",
    label: "生态位互作",
    icon: Orbit,
    kicker: "互作网络",
    title: "肿瘤-内皮-免疫生态位在三维空间中浮现。",
    copy: "互作视角将内皮细胞和免疫细胞拉入围绕恶性细胞的共享轨道，对应本站的研究重心。",
  },
];

export const metrics = [
  { value: "256", label: "累计影响因子" },
  { value: "10+", label: "代表性论文与合作成果" },
  { value: "3", label: "单细胞 / 空间 / 转移方向" },
];

export const education = [
  {
    school: "南方科技大学",
    detail: "生物学博士 | 医学院 / 深圳市儿童医院",
    years: "2022.09 - 至今",
  },
  {
    school: "中山大学",
    detail: "基础医学硕士 | 肿瘤防治中心",
    years: "2019.09 - 2022.06",
  },
  {
    school: "西南交通大学",
    detail: "生物工程本科 | 生命科学与工程学院",
    years: "2015.09 - 2019.06",
  },
];

export const researchInterests = [
  "单细胞与空间组学",
  "肿瘤转移机制",
  "肿瘤-内皮-免疫互作",
  "循环肿瘤细胞",
  "肿瘤免疫治疗响应",
];

export const publications = [
  {
    title:
      "GPNMB Drives Brain Metastasis by Sculpting a Pathological Endothelial-Immune Interactome.",
    authors: "Liu X.#, Tan J.#, Wu C.#, et al.",
    journal: "Cancer Discovery",
    year: "2026, 修回",
    role: "共同第一作者",
  },
  {
    title:
      "Abnormal Cellular Populations Shape Thymic Epithelial Tumor Heterogeneity and Anti-Tumor by Blocking Metabolic Interactions in Organoids.",
    authors: "Liu X.#, Wang C.#, Huang Y.#, et al.",
    journal: "Advanced Science",
    year: "2024",
    role: "共同第一作者",
    href: "https://pubmed.ncbi.nlm.nih.gov/39258580/",
  },
  {
    title:
      "Single-cell transcriptomic analysis deciphers heterogeneous cancer stem-like cells in colorectal cancer and their organ-specific metastasis.",
    authors: "Li R.#, Liu X.#, Huang X.#, et al.",
    journal: "Gut",
    year: "2024",
    role: "共同第一作者",
    href: "https://pubmed.ncbi.nlm.nih.gov/38050068/",
  },
  {
    title:
      "The Tumor-to-endothelial Transfer of FTO Promotes Vascular Remodeling and Metastasis in Nasopharyngeal Carcinoma.",
    authors: "Wu C.#, Liu X.#, Gu L.#, et al.",
    journal: "Advanced Science",
    year: "2025",
    role: "共同第一 / 共同通讯作者",
    href: "https://pubmed.ncbi.nlm.nih.gov/41311280/",
  },
  {
    title:
      "NMB+ CXCL13+ CD4+ T cell-derived neuromedin-B promotes senescence and stemness of NPSR1+ malignant cells.",
    authors: "Yu M.#, Duan L.#, Huang Y.#, et al.",
    journal: "Cancer Immunology Research",
    year: "2026, 修回",
    role: "最后通讯作者",
  },
  {
    title: "CBX3 confers ferroptosis resistance during blood-borne metastasis.",
    authors: "Wu C.#, Liu X.#, Gu L.#, et al.",
    journal: "Journal of Hematology & Oncology",
    year: "2026, 修回",
    role: "共同第一作者",
  },
  {
    title:
      "Cannabinoid CB2 receptor controls chronic itch by regulating spinal microglial activation and synaptic transmission.",
    authors: "Xu K#, Liu X#, Zeng Q#, Liu Y, Shan L, et al.",
    journal: "Cell Reports",
    year: "2025",
    role: "共同第一作者",
    href: "https://pubmed.ncbi.nlm.nih.gov/40222011/",
  },
  {
    title:
      "Fusion of Tumor Cells with Lipid-Associated Macrophages Drives Metastatic Progression of Breast Cancer.",
    authors: "Cheng Y#, Huang G#, Liu X#, Wu C#, Lian J#, et al.",
    journal: "Cancer Research",
    year: "2025",
    role: "共同第一作者",
    href: "https://pubmed.ncbi.nlm.nih.gov/41342370/",
  },
];

export const projects = [
  {
    title:
      "神经母细胞瘤与内皮互作促进血管内侵袭的机制研究",
    years: "2025 - 2027",
    body: "国家自然科学基金青年学生基础研究项目（博士研究生），主持，在研。",
    tag: "在研",
  },
  {
    title:
      "红景天复合功能饮料的研制及其活性物质提取优化",
    years: "2018",
    body: "国家级大学生创新创业训练计划，主持，结题优秀。",
    tag: "已结题",
  },
  {
    title:
      "天然产物多糖壳聚糖介导纳米颗粒及细胞寿命调控",
    years: "2017",
    body: "国家级大学生创新创业训练计划，主持，结题合格。",
    tag: "已结题",
  },
];

export const awards = [
  "2025 年 比亚迪奖学金",
  "2022 年 泰和诚企业奖学金",
  "2018 年 唐立新奖学金",
  "2018 年 国家奖学金",
  "2022 年 中山大学优秀硕士学位论文",
  "2025 年 南方科技大学未来之星研究生学术论坛二等奖",
];

export const team = [
  {
    name: "Xuefei Liu",
    cn: "刘雪飞",
    role: "课题负责人",
    org: "南方科技大学",
    image: assetPath("xuefei-liu.png"),
  },
  {
    name: "Chun Wu",
    cn: "吴纯",
    role: "基础实验",
    org: "中山大学肿瘤防治中心",
    image: assetPath("wuchun.jpg"),
  },
  {
    name: "Yixin Cheng",
    cn: "程一昕",
    role: "基础实验",
    org: "中山大学肿瘤防治中心",
    image: assetPath("chengyx.jpg"),
  },
  {
    name: "Guanyin Huang",
    cn: "黄官银",
    role: "生信分析",
    org: "南方科技大学",
    image: assetPath("huanggy.jpg"),
  },
  {
    name: "Lianhui Duan",
    cn: "段连慧",
    role: "生信分析",
    org: "清华大学",
    image: assetPath("duanlh.jpg"),
  },
];

export const statusItems = [
  { icon: Activity, label: "当前方向", value: "单细胞空间组学" },
  { icon: Sparkles, label: "研究主题", value: "肿瘤转移生态位图谱" },
  { icon: Award, label: "学术身份", value: "计算生物学博士研究生" },
];
