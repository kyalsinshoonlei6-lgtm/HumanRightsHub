// State & Data
let currentLang = document.body.classList.contains('lang-my') ? 'my' : 'en';

const regionalData = {
  regions: {
    my: ['ရန်ကုန်', 'ဧရာဝတီ', 'မန္တလေး', 'ပဲခူး', 'မွန်', 'စစ်ကိုင်း', 'ကရင်', 'ရှမ်း', 'မကွေး', 'နေပြည်တော်', 'တနင်္သာရီ', 'ကချင်', 'ရခိုင်', 'ချင်း', 'ကယား'],
    en: ['Yangon', 'Ayeyarwady', 'Mandalay', 'Bago', 'Mon', 'Sagaing', 'Kayin', 'Shan', 'Magway', 'Nay Pyi Taw', 'Tanintharyi', 'Kachin', 'Rakhine', 'Chin', 'Kayah']
  },
  yearlyData: {
    '2025': [23, 9, 7, 5, 4, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0],
    '2024': [102, 48, 36, 23, 15, 10, 7, 7, 5, 4, 3, 2, 2, 0, 0],
    '2023': [116, 52, 38, 25, 18, 12, 8, 8, 7, 5, 4, 2, 3, 0, 0],
    '2022': [120, 50, 42, 28, 16, 14, 9, 7, 6, 4, 3, 2, 2, 0, 0],
    '2021': [165, 68, 55, 38, 22, 18, 14, 12, 8, 6, 4, 2, 0, 0, 0],
    '2020': [420, 180, 145, 98, 62, 54, 38, 32, 25, 18, 12, 5, 3, 0, 0],
    '2019': [780, 290, 240, 185, 115, 92, 75, 62, 48, 32, 18, 8, 3, 0, 0],
    '2018': [765, 285, 238, 180, 110, 90, 72, 60, 45, 30, 20, 10, 2, 6, 5]
  }
};

const categoryData = {
  categories: {
    my: [
      'တရားစီရင်ရေးနှင့် ပတ်သက်သည့် တိုင်ကြားစာများ',
      'မြေယာဆိုင်ရာ တိုင်ကြားစာများ',
      'ရဲတပ်ဖွဲ့နှင့် ပတ်သက်သည့် တိုင်ကြားစာများ',
      'ဝန်ထမ်းရေးရာ / အုပ်ချုပ်ရေး တိုင်ကြားစာများ',
      'ကျန်းမာရေးနှင့် ပညာရေး တိုင်ကြားစာများ',
      'အကျဉ်းထောင် / အကျဉ်းသားဆိုင်ရာ တိုင်ကြားစာများ',
      'အခြား / အထွေထွေ တိုင်ကြားစာများ'
    ],
    en: [
      'Judicial & Legal Complaints',
      'Land Issues & Disputes',
      'Police Force Complaints',
      'Civil Service & Administrative',
      'Health & Education Issues',
      'Prisons & Prisoner Rights',
      'General / Other Complaints'
    ]
  },
  yearlyData: {
    '2025': [12, 10, 5, 7, 3, 2, 21],
    '2024': [44, 45, 18, 29, 12, 8, 108],
    '2023': [55, 52, 23, 34, 15, 11, 108],
    '2022': [58, 58, 24, 38, 18, 12, 95],
    '2021': [82, 88, 33, 52, 24, 18, 115],
    '2020': [245, 280, 65, 145, 62, 45, 250],
    '2019': [460, 520, 120, 260, 110, 88, 390],
    '2018': [436, 510, 134, 255, 105, 85, 403]
  }
};

const yearlyTotals = {
  '2025': 60, '2024': 264, '2023': 298, '2022': 303,
  '2021': 412, '2020': 1092, '2019': 1948, '2018': 1928
};

let trendChart, regionalChart, categoryChart;

document.addEventListener('DOMContentLoaded', () => {

  if (typeof Chart !== 'undefined') {
    Chart.defaults.color = '#526a79';
    Chart.defaults.font.family = '"Inter", "Plus Jakarta Sans", "Pyidaungsu", sans-serif';

    // 1. Trend Line Chart
    const ctxTrend = document.getElementById('yearlyTrendChart');
    if (ctxTrend) {
      trendChart = new Chart(ctxTrend.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [{
            label: 'Complaints',
            data: [1928, 1948, 1092, 412, 303, 298, 264, 60],
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#38bdf8',
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: 'rgba(11,79,114,0.09)' } },
            y: { grid: { color: 'rgba(11,79,114,0.09)' } }
          }
        }
      });
    }

    // 2. Regional Bar Chart
    const ctxRegional = document.getElementById('regionalChart');
    if (ctxRegional) {
      regionalChart = new Chart(ctxRegional.getContext('2d'), {
        type: 'bar',
        data: { labels: [], datasets: [{ label: 'Count', data: [], backgroundColor: 'rgba(56, 189, 248, 0.8)', borderRadius: 6 }] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(11,79,114,0.09)' } } }
        }
      });
    }

    // 3. Category Doughnut Chart
    const ctxCategory = document.getElementById('categoryChart');
    if (ctxCategory) {
      categoryChart = new Chart(ctxCategory.getContext('2d'), {
        type: 'doughnut',
        data: { labels: [], datasets: [{ data: [], backgroundColor: ['#bd7a38', '#0b84b8', '#0f766e', '#d99b2b', '#6d5ca8', '#b65b70', '#718390'], borderWidth: 0 }] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, padding: 12, font: { size: 11 } } } }
        }
      });
    }
  }

  // Year Filter Select Event
  const yearSelect = document.getElementById('year-select');
  if (yearSelect) {
    yearSelect.addEventListener('change', () => {
      updateDashboard();
    });
  }

  switchLanguage(currentLang);
});

// The shared site navigation owns the language toggle. The analytics page
// listens for its event and refreshes only its generated labels.
document.addEventListener('hrh:languagechange', (event) => {
  switchLanguage(event.detail?.language || (document.body.classList.contains('lang-my') ? 'my' : 'en'));
});

// Refresh labels that are created dynamically by the charts and tables.
function switchLanguage(lang) {
  currentLang = lang;
  updateSelectLanguage(lang);
  updateDashboard();
}

// Function to update dropdown text dynamically
function updateSelectLanguage(lang) {
  const selectElement = document.getElementById('year-select');
  if (!selectElement) return;

  const options = selectElement.querySelectorAll('option');
  options.forEach(option => {
    const textEn = option.getAttribute('data-en');
    const textMy = option.getAttribute('data-my');

    if (lang === 'my' && textMy) {
      option.textContent = textMy;
    } else if (lang === 'en' && textEn) {
      option.textContent = textEn;
    }
  });
}

// Sum total historical data
function getAggregatedData(datasetObj) {
  const totalLength = datasetObj.categories ? datasetObj.categories[currentLang].length : datasetObj.regions[currentLang].length;
  const totals = new Array(totalLength).fill(0);
  Object.keys(datasetObj.yearlyData).forEach(yr => {
    datasetObj.yearlyData[yr].forEach((val, idx) => { totals[idx] += val; });
  });
  return totals;
}

// Update Charts, KPI, Tables
function updateDashboard() {
  const yearSelect = document.getElementById('year-select');
  const selectedYear = yearSelect ? yearSelect.value : 'all';
  
  let regCounts = [], catCounts = [], totalSum = 0;

  if (selectedYear === 'all') {
    regCounts = getAggregatedData(regionalData);
    catCounts = getAggregatedData(categoryData);
    totalSum = 6307;
  } else {
    regCounts = regionalData.yearlyData[selectedYear] || [];
    catCounts = categoryData.yearlyData[selectedYear] || [];
    totalSum = yearlyTotals[selectedYear] || 0;
  }

  const currentRegions = regionalData.regions[currentLang];
  const currentCategories = categoryData.categories[currentLang];

  if (regionalChart) {
    regionalChart.data.labels = currentRegions;
    regionalChart.data.datasets[0].data = regCounts;
    regionalChart.update();
  }

  if (categoryChart) {
    categoryChart.data.labels = currentCategories;
    categoryChart.data.datasets[0].data = catCounts;
    categoryChart.update();
  }

  const kpiTotal = document.getElementById('kpi-total');
  if (kpiTotal) {
    kpiTotal.innerText = totalSum.toLocaleString();
  }

  const kpiTopRegion = document.getElementById('kpi-top-region');
  if (kpiTopRegion && regCounts.length > 0) {
    const topRegIdx = regCounts.indexOf(Math.max(...regCounts));
    kpiTopRegion.innerText = `${currentRegions[topRegIdx]} (${regCounts[topRegIdx].toLocaleString()})`;
  }

  const kpiTopCategory = document.getElementById('kpi-top-category');
  if (kpiTopCategory && catCounts.length > 0) {
    const topCatIdx = catCounts.indexOf(Math.max(...catCounts));
    kpiTopCategory.innerText = `${currentCategories[topCatIdx]}`;
  }

  renderTable('regional-table-body', currentRegions, regCounts, totalSum);
  renderTable('category-table-body', currentCategories, catCounts, totalSum);
}

// Render Table Function
function renderTable(elementId, labels, dataArr, total) {
  const tbody = document.getElementById(elementId);
  if (!tbody) return;

  tbody.innerHTML = '';
  labels.forEach((label, idx) => {
    const val = dataArr[idx] || 0;
    const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0.0';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${idx + 1}</td>
      <td><strong>${label}</strong></td>
      <td>${val.toLocaleString()}</td>
      <td><span style="color: #0b84b8; font-weight: 600;">${pct}%</span></td>
    `;
    tbody.appendChild(row);
  });
}
