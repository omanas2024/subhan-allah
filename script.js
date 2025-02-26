document.addEventListener("DOMContentLoaded", function () {
  let counters = JSON.parse(localStorage.getItem("counters")) || [];
  let darkMode = localStorage.getItem("darkMode") === "enabled";

  const adkarList = [
    "اختر الذكر",
    "سبحان الله",
    "الحمد لله",
    "لا إله إلا الله",
    "الله أكبر",
    "لا حول ولا قوة إلا بالله",
    "أستغفر الله",
    "اللهم صلِّ على محمد",
    "ذكر جديد"
  ];

  function renderCounters() {
    const container = document.getElementById("counterContainer");
    container.innerHTML = "";

    counters.forEach((counter, index) => {
      const counterElement = document.createElement("div");
      counterElement.className = "counter";
      counterElement.innerHTML = `
                <select onchange="handleAdkarSelection(${index}, this.value)">
                    ${adkarList
                      .map(
                        (dhikr) =>
                          `<option value="${dhikr}" ${
                            counter.name === dhikr ? "selected" : ""
                          }>${dhikr}</option>`
                      )
                      .join("")}
                </select>
                <input type="text" id="custom-dhikr-${index}" placeholder="اكتب الذكر هنا..." value="${
        counter.customName || ""
      }" oninput="updateCustomDhikr(${index}, this.value)" style="display: ${
        counter.name === "ذكر جديد" ? "block" : "none"
      };">
                <div class="button-group">
                    <button onclick="increase(${index})">➕</button>
                    <span id="counter-value-${index}">${counter.value}</span>
                    <button onclick="decrease(${index})">➖</button>
                </div>
                <div class="button-group">
                    <button onclick="resetCounter(${index})">🔄</button>
                    <button onclick="deleteCounter(${index})">🗑</button>
                </div>
            `;
      container.appendChild(counterElement);
    });
    saveCounters();
  }

  window.addCounter = function () {
    counters.push({ name: "اختر الذكر", customName: "", value: 0 });
    renderCounters();
  };

  window.handleAdkarSelection = function (index, value) {
    counters[index].name = value;
    renderCounters();
  };

  window.updateCustomDhikr = function (index, value) {
    counters[index].customName = value;
    saveCounters();
  };

  window.increase = function (index) {
    counters[index].value++;
    renderCounters();
  };

  window.decrease = function (index) {
    if (counters[index].value > 0) {
      counters[index].value--;
      renderCounters();
    }
  };

  window.resetCounter = function (index) {
    counters[index].value = 0;
    renderCounters();
  };

  window.deleteCounter = function (index) {
    counters.splice(index, 1);
    renderCounters();
  };

  window.toggleDarkMode = function () {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  };

  window.resetAllCounters = function () {
    counters = [];
    renderCounters();
  };

  function saveCounters() {
    localStorage.setItem("counters", JSON.stringify(counters));
  }

  renderCounters();
});