const cheeseDetails = {
  brie: {
    origin: "法國・塞納馬恩省",
    name: "布里起司",
    english: "Brie",
    description: "白色外皮包裹柔軟乳心，入口像奶油般滑順，帶有蘑菇與熟成堅果的溫柔香氣。適合初次踏入起司世界的你。",
    intensity: "38%"
  },
  blue: {
    origin: "法國・奧克西塔尼",
    name: "藍紋起司",
    english: "Bleu",
    description: "大理石般的藍綠紋理，帶來鮮明鹹香與乳脂的圓潤。搭配蜂蜜、梨子或一小杯甜酒，濃郁得恰到好處。",
    intensity: "82%"
  },
  comte: {
    origin: "法國・侏羅山區",
    name: "康堤起司",
    english: "Comté",
    description: "在山間熟成的硬質起司，質地細緻而帶有晶粒，散發烤堅果、焦糖與溫暖奶香。單吃或搭配麵包都很迷人。",
    intensity: "64%"
  },
  goat: {
    origin: "法國・羅亞爾河谷",
    name: "山羊起司",
    english: "Chèvre",
    description: "清爽微酸的乳香，像初夏微風一樣輕盈。配上新鮮香草、蜂蜜與脆口沙拉，最能襯出它明亮細緻的個性。",
    intensity: "47%"
  }
};

const tabs = document.querySelectorAll(".cheese-tab");
const panel = document.querySelector("#cheese-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const detail = cheeseDetails[tab.dataset.cheese];
    if (!detail) return;

    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });

    panel.setAttribute("aria-labelledby", tab.id);
    document.querySelector("#cheese-origin").textContent = detail.origin;
    document.querySelector("#cheese-name").innerHTML = `${detail.name} <em>${detail.english}</em>`;
    document.querySelector("#cheese-description").textContent = detail.description;
    document.querySelector("#flavor-meter").style.setProperty("--flavor", detail.intensity);
  });

  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const index = Array.from(tabs).indexOf(tab);
    const nextTab = tabs[(index + direction + tabs.length) % tabs.length];
    nextTab.focus();
    nextTab.click();
  });
});

const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const active = link.hash === `#${entry.target.id}`;
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
      link.classList.toggle("is-current", active);
    });
  });
}, { rootMargin: "-30% 0px -60% 0px" });

sections.forEach((section) => sectionObserver.observe(section));