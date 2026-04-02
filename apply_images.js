const fs = require('fs');
const tempDir = './temp';
const destDir = './public/assets/images';
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(tempDir);
files.sort();

const mapping = [
  'panchatantra_1', 'panchatantra_2', 'panchatantra_3',
  'hitopadesha_1', 'hitopadesha_2', 'hitopadesha_3',
  'jataka_1', 'jataka_2', 'jataka_3',
  'kathasaritsagara_1',
  'shukasaptati_2', 'shukasaptati_3',
  'simhasana_1', 'simhasana_2', 'simhasana_3',
  'vetala_1', 'vetala_2', 'vetala_3',
  'nitishataka_1', 'nitishataka_2', 'nitishataka_3',
  'chanakya_1', 'chanakya_2', 'chanakya_3',
  'purana_1', 'purana_2', 'purana_3',
  'avadana_1', 'avadana_2', 'avadana_3'
];

files.forEach((file, index) => {
  if (mapping[index]) {
    fs.copyFileSync(`${tempDir}/${file}`, `${destDir}/${mapping[index]}.jpeg`);
  }
});

fs.copyFileSync(`${destDir}/panchatantra_1.jpeg`, `${destDir}/kathasaritsagara_2.jpeg`);
fs.copyFileSync(`${destDir}/panchatantra_2.jpeg`, `${destDir}/kathasaritsagara_3.jpeg`);
fs.copyFileSync(`${destDir}/panchatantra_3.jpeg`, `${destDir}/shukasaptati_1.jpeg`);
fs.copyFileSync(`${destDir}/nitishataka_3.jpeg`, `${destDir}/nitishataka_4.jpeg`);

let content = fs.readFileSync('src/data/content.js', 'utf-8');

const titleToImages = {
  "The Old Wise Crow": "['/assets/images/panchatantra_1.jpeg']",
  "The Blue Jackal": "['/assets/images/panchatantra_2.jpeg']",
  "Two Cats and a Monkey": "['/assets/images/panchatantra_3.jpeg']",
  
  "The Four Friends": "['/assets/images/hitopadesha_1.jpeg']",
  "The Foolish Lion and the Clever Rabbit": "['/assets/images/hitopadesha_2.jpeg']",
  "The Two Swans and the Tortoise": "['/assets/images/hitopadesha_3.jpeg']",
  
  "The Monkey King (Mahakapi Jataka)": "['/assets/images/jataka_1.jpeg']",
  "The Great King Shibi and the Dove": "['/assets/images/jataka_2.jpeg']",
  "The Brave Parrot": "['/assets/images/jataka_3.jpeg']",
  
  "The Story of King Udayana": "['/assets/images/kathasaritsagara_1.jpeg']",
  "The Travelling Brahmins": "['/assets/images/kathasaritsagara_2.jpeg']",
  "The Merchant and the King": "['/assets/images/kathasaritsagara_3.jpeg']",
  
  "The Seventy Tales of the Parrot": "['/assets/images/shukasaptati_1.jpeg']",
  "The Merchant and his Mistake": "['/assets/images/shukasaptati_2.jpeg']",
  "The Careless Speech": "['/assets/images/shukasaptati_3.jpeg']",

  "The Case of True Justice": "['/assets/images/simhasana_1.jpeg']",
  "The Test of Wisdom": "['/assets/images/simhasana_2.jpeg']",
  "The King Helping the Poor": "['/assets/images/simhasana_3.jpeg']",

  "The Three Suitors": "['/assets/images/vetala_1.jpeg']",
  "The King's Difficult Choice": "['/assets/images/vetala_2.jpeg']",
  "The Silent Answer": "['/assets/images/vetala_3.jpeg']",
  
  "On Welfare-Oriented Leadership": "['/assets/images/nitishataka_1.jpeg']",
  "On Importance of Wisdom Over Power": "['/assets/images/nitishataka_2.jpeg']",
  "On Quality and Humility": "['/assets/images/nitishataka_3.jpeg']",
  "On Justice and Moral Conduct": "['/assets/images/nitishataka_4.jpeg']",

  "Public Welfare as the Core": "['/assets/images/chanakya_1.jpeg']",
  "Accountability of Leadership": "['/assets/images/chanakya_2.jpeg']",
  "Rule of Law and Advisors": "['/assets/images/chanakya_3.jpeg']",

  "Public Welfare and Duty of the Ruler": "['/assets/images/purana_1.jpeg']",
  "Consequences of Misrule": "['/assets/images/purana_2.jpeg', '/assets/images/purana_3.jpeg']",

  "Equality and Ethical Responsibility": "['/assets/images/avadana_1.jpeg', '/assets/images/avadana_2.jpeg', '/assets/images/avadana_3.jpeg']"
};

for (const ObjectEntry of Object.entries(titleToImages)) {
  const title = ObjectEntry[0];
  const imgArr = ObjectEntry[1];
  const regex = new RegExp(`(title:\\s*"${title.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}",\\s*\\n\\s*image:)\\s*".*?"`, 'g');
  content = content.replace(regex, `$1 ${imgArr}`);
}

fs.writeFileSync('src/data/content.js', content);
console.log("Images nicely renamed and safely mapped to content.js");
