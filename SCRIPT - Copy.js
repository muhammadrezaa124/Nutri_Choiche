const tipsList = [
  "Minum air putih minimal 8 gelas sehari.",
  "Konsumsi buah dan sayur berwarna-warni untuk nutrisi seimbang.",
  "Batasi makanan cepat saji dan minuman manis.",
  "Perbanyak protein tanpa lemak untuk menjaga massa otot.",
  "Tidur cukup 7-9 jam per hari untuk metabolisme optimal.",
  "Jangan lewatkan sarapan agar energi tetap stabil sepanjang hari.",
  "Olahraga ringan 30 menit setiap hari membantu jaga kesehatan jantung."
];

function hitungBMI(berat, tinggi) {
  let tinggiMeter = tinggi / 100;
  return (berat / (tinggiMeter * tinggiMeter)).toFixed(1);
}

function kategoriBMI(bmi) {
  if (bmi < 18.5) return "Kurus (Underweight)";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obesitas";
}

function rekomKaloriMenu(bmi, umur) {
  let kalori;
  let menu;

  if (bmi < 18.5) {
    kalori = "2500-2800 kcal";
    menu = {
      sarapan: "Roti gandum + selai kacang + susu",
      siang: "Nasi merah + ayam/daging + sayuran",
      malam: "Ikan + kentang + salad",
      camilan: "Kacang, alpukat, smoothie"
    };
  } else if (bmi < 25) {
    kalori = "2000-2400 kcal";
    menu = {
      sarapan: "Oatmeal + buah + susu rendah lemak",
      siang: "Nasi merah + ayam/ikan + sayur kukus",
      malam: "Pasta gandum + daging tanpa lemak + salad",
      camilan: "Buah segar / yoghurt"
    };
  } else if (bmi < 30) {
    kalori = "1800-2000 kcal";
    menu = {
      sarapan: "Telur rebus + roti gandum",
      siang: "Nasi merah + dada ayam + tumis sayuran",
      malam: "Sup sayuran + ikan panggang",
      camilan: "Buah potong rendah gula"
    };
  } else {
    kalori = "1500-1700 kcal";
    menu = {
      sarapan: "Oatmeal + buah",
      siang: "Nasi merah + tahu/tempe + sayuran rebus",
      malam: "Sup bening + dada ayam/ikan kukus",
      camilan: "Yoghurt rendah lemak"
    };
  }

  if (umur > 50) {
    kalori = kalori.replace(/\d+/g, n => Math.max(parseInt(n) - 200, 1200));
  }

  return { kalori, menu };
}

function tampilkanTips() {
  const tipsSection = document.getElementById("tipsSection");
  const tipsText = document.getElementById("tipsText");
  const randomTips = tipsList[Math.floor(Math.random() * tipsList.length)];
  tipsText.textContent = randomTips;
  tipsSection.style.display = "block";
}

function getRecommendation() {
  const umur = parseInt(document.getElementById("age").value);
  const berat = parseInt(document.getElementById("weight").value);
  const tinggi = parseInt(document.getElementById("height").value);
  const resultDiv = document.getElementById("result");
  const chartBox = document.getElementById("chartBox");
  const wrapper = document.querySelector(".result-wrapper");
  const bmiImg = document.getElementById("bmiImage");

  if (isNaN(umur) || isNaN(berat) || isNaN(tinggi)) {
    wrapper.style.display = "flex";
    resultDiv.innerHTML = `<p>⚠ Harap masukkan umur, berat, dan tinggi badan dengan benar.</p>`;
    chartBox.style.display = "none";
    return;
  }

  const bmi = hitungBMI(berat, tinggi);
  const status = kategoriBMI(bmi);
  const { kalori, menu } = rekomKaloriMenu(bmi, umur);

  let imgSrc = "";
  if (status.includes("Kurus")) imgSrc = "kurus (1).png";
  else if (status.includes("Normal")) imgSrc = "normal.png";
  else if (status.includes("Overweight")) imgSrc = "overweight.png";
  else if (status.includes("Obesitas")) imgSrc = "obesitas.png";

  wrapper.style.display = "flex";
  chartBox.style.display = "flex";

  resultDiv.innerHTML = `
    <h2>Rekomendasi</h2>
    <p><strong>Umur ${umur} tahun, Berat ${berat} kg, Tinggi ${tinggi} cm</strong></p>
    <p>BMI: <span class="highlight">${bmi}</span> (${status})</p>
    <p>Kebutuhan Kalori: <span class="highlight">${kalori}</span></p>
    <table class="menu-table">
      <tr>
        <th>Waktu Makan</th>
        <th>Menu Rekomendasi</th>
      </tr>
      <tr>
        <td><strong>Sarapan</strong></td>
        <td>${menu.sarapan}</td>
      </tr>
      <tr>
        <td><strong>Makan Siang</strong></td>
        <td>${menu.siang}</td>
      </tr>
      <tr>
        <td><strong>Makan Malam</strong></td>
        <td>${menu.malam}</td>
      </tr>
      <tr>
        <td><strong>Camilan</strong></td>
        <td>${menu.camilan}</td>
      </tr>
    </table>
  `;

  bmiImg.src = imgSrc;
  bmiImg.style.display = "block";

  tampilkanTips();
}
