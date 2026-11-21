import { writeFileSync } from 'node:fs';

// Orsava, a landlocked federation whose northern road closes with the snow.
const navy = '#183943', ink = '#252f2e', muted = '#435650', rust = '#913d32';
const parts: string[] = [];
const add = (s: string) => parts.push(s);
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function text(x: number, y: number, s: string, size: number, options = '') {
  add(`<text x="${x}" y="${y}" font-size="${size}" ${options}>${esc(s)}</text>`);
}
const serif = 'font-family="Georgia,serif"';
const bold = 'font-weight="700"';
const center = 'text-anchor="middle"';
const colored = (color: string) => `fill="${color}"`;
function box(x: number, y: number, w: number, h: number, fill: string, stroke = 'none', radius = 0) {
  add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`);
}
function rule(x: number, y: number, end: number, color = navy) {
  add(`<path d="M${x} ${y}H${end}" stroke="${color}"/>`);
}
function field(x: number, y: number, key: string, value: string, size = 19) {
  text(x, y, key, 11, colored(muted));
  text(x, y + 21, value, size, bold);
}
function lines(x: number, y: number, values: string[], size = 14, step = 19) {
  values.forEach((value, index) => text(x, y + index * step, value, size));
}

const portrait = `<g id="holder">
  <rect width="151" height="204" fill="url(#photo)"/>
  <path fill="#45575a" d="M0 204v-24q3-20 22-27l37-14 34 1 42 15q16 7 16 28v21Z"/>
  <path fill="#2c3c40" d="m0 188 21-23 32-13 21 35-18 17H0zm151-6-22-18-32-13-23 36 15 17h62Z"/>
  <path fill="#986f5b" d="M53 115h43v28q-3 20-21 23-19-6-25-19Z"/>
  <path fill="#d5a884" d="M53 126q21 22 40-1l-3 20-15 13-15-13Z"/>
  <path fill="#d9c9a7" d="m50 144 25 17 22-17 12 9-22 28-12-14-12 14-23-28Z"/>
  <path fill="#304044" d="m63 181 12-14 12 14-5 23h-14Z"/>
  <path fill="#413d36" d="M39 85C25 48 39 25 59 17c18-7 41-4 55 12 13 15 14 35 1 67l-14 17-53-1Z"/>
  <path fill="#aa795e" d="M40 77q-11-6-10 9 1 16 13 17l63-1q14-2 15-17 0-14-11-9Z"/>
  <path fill="url(#skin)" stroke="#795744" stroke-width=".7" d="M42 60c5-21 20-28 38-28 19 0 29 15 32 34l-2 35q-4 24-21 36-9 7-18 6-16-3-27-24-6-13-5-30Z"/>
  <path fill="#56473d" d="M37 72c-3-30 8-51 32-55q31-6 45 24 6 11 0 35l-5-10c-5-17-13-25-25-29-13 11-26 12-37 13l-5 31Z"/>
  <g stroke="#b2a08b" fill="none" stroke-width=".8" opacity=".7">
    <path d="M40 65Q40 27 75 21m-33 37q8-30 33-32m-30 26q12-23 36-23m-24 17q19-6 26-14m6-10q23 12 25 44m-19-40q19 13 20 34m-73 6 1 17m66-21 1 14"/>
  </g>
  <path fill="#b68062" opacity=".55" d="M43 81q9 12 13 16l-4 15 11 14q-14-3-19-20Zm65 0q-12 8-14 18l5 17-10 12q14-4 18-20Z"/>
  <path fill="none" stroke="#6b5040" stroke-width="2" stroke-linecap="round" d="M48 73q9-6 19 0m17 0q9-6 20-1"/>
  <path fill="#e6d6c4" stroke="#715647" stroke-width=".8" d="M48 81q9-7 19 0-10 6-19 0Zm36 0q9-7 20-1-10 6-20 1Z"/>
  <g fill="#46574c"><circle cx="58" cy="81" r="3.5"/><circle cx="94" cy="80.5" r="3.5"/></g>
  <g fill="#282c29"><circle cx="58" cy="81" r="1.6"/><circle cx="94" cy="80.5" r="1.6"/></g>
  <path fill="none" stroke="#96654f" stroke-width="1" d="M73 79q-1 14-5 21 1 4 6 4m4 0q5 0 6-4l-3-4m-13 31q7 3 15-1M47 85q8 4 14 2m30 0q8 0 14-3M65 61q11-2 24 0"/>
  <path fill="#b4786a" d="M64 115q6-2 11-2 5 1 14 1-7 7-13 7-6 0-12-6Z"/>
  <path fill="none" stroke="#744e47" d="M64 115q12 2 25-1"/>
  <path fill="#f0c6a3" opacity=".49" d="M53 56q16-1 23-14 14 4 22 15-24-6-45-1Zm-5 42q8-6 15 1l-4 10q-11-3-11-11Zm38 2q9-12 17-4 1 10-12 14Z"/>
  <path d="M72 102q3 2 7 0m-7 24q6 2 12-1M45 89l4 1m52-3 5-2m-9 5 6-1" fill="none" stroke="#805f50" stroke-width=".6" opacity=".65"/>
  <path d="M55.8 80.1h1.4m34-.5h1.4" stroke="#f6e9d8" stroke-width=".85" stroke-linecap="round"/>
  <path fill="none" stroke="#8c6452" opacity=".55" stroke-width=".65" d="M45 88l-1 5m3-4-1 7m3-6-1 7m2-5-1 7m2-5v7m2-6v7m52-13 1 6m-3-5 1 7m-3-5 1 7m-3-5 1 7m-3-5 1 6m-3-3 1 6m-36 17 2 5m1-4 2 5m1-4 2 5m2-4 1 5m2-4v4m3-4v4m3-5v4m3-6v4"/>
  <path d="M17 197q9-14 16-19m102 19q-9-13-18-20m-74 13 12-6m40 0 13 6" fill="none" stroke="#87918a" opacity=".5"/>
  <path d="M113 180l14 1-1 13-14-2Z" fill="#8c9285"/><path d="m114 189 4-4 2 3 3-4 2 6" fill="none" stroke="#303f42"/>
  <rect width="151" height="204" fill="url(#engrave)" opacity=".27"/>
</g>`;

add(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" width="1024" height="1024" font-family="Arial,sans-serif" fill="${ink}">
<defs>
  <linearGradient id="left"><stop stop-color="#eee8d8"/><stop offset=".08" stop-color="#f6f1e3"/><stop offset=".89" stop-color="#efece0"/><stop offset="1" stop-color="#c7bca7"/></linearGradient>
  <linearGradient id="right"><stop stop-color="#b9ae95"/><stop offset=".055" stop-color="#eee7d4"/><stop offset=".31" stop-color="#f5efde"/><stop offset="1" stop-color="#f2ecda"/></linearGradient>
  <linearGradient id="photo" x2="1" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="#b3c5bf"/><stop offset="1" stop-color="#dce2d3"/></linearGradient>
  <radialGradient id="skin" cx=".52" cy=".4" r=".68"><stop stop-color="#e7bd9e"/><stop offset=".6" stop-color="#d2a082"/><stop offset="1" stop-color="#ae7d61"/></radialGradient>
  <pattern id="engrave" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 .5H3" stroke="#273b39" stroke-width=".48" opacity=".4"/></pattern>
  <pattern id="binding" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M-1 1 3 5M1-1l4 4" stroke="#aec0b5" opacity=".18" stroke-width=".45"/></pattern>
  <clipPath id="paper"><rect x="22" y="19" width="980" height="986" rx="13"/></clipPath>
  <clipPath id="left-print"><rect x="28" y="24" width="472" height="974"/></clipPath>
  <clipPath id="right-print"><rect x="529" y="23" width="466" height="974"/></clipPath>
  ${portrait}
</defs>`);
box(0, 0, 1024, 1024, '#252e2c');
box(12, 10, 1000, 1005, '#183b3a', '#102725', 19);
box(12, 10, 1000, 1005, 'url(#binding)', 'none', 19);
add('<g clip-path="url(#paper)">');
box(22, 19, 490, 986, 'url(#left)');
box(512, 19, 490, 986, 'url(#right)');

// Fine engraved slopes bend around each page rather than drawing across its fold.
for (const side of [0, 1]) {
  const offset = side * 509;
  add(`<g clip-path="url(#${side ? 'right' : 'left'}-print)" fill="none" stroke="${side ? '#967649' : '#497c78'}" opacity=".16">`);
  for (let i = 0; i < 103; i++) {
    const y = 17 + i * 9.6;
    const drift = Math.sin(i * .155) * 10;
    add(`<path d="M${offset + 10} ${y}c98 ${drift - 9} 129 ${drift + 17} 220 0s172 ${drift - 14} 280 0" stroke-width="${i % 5 ? '.49' : '.68'}"/>`);
  }
  add('</g>');
}
function rosette(x: number, y: number, radius: number, color: string, opacity: number) {
  add(`<g fill="none" stroke="${color}" opacity="${opacity}" stroke-width=".58">`);
  for (let i = 0; i < 18; i++) {
    const points = Array.from({ length: 181 }, (_, j) => {
      const a = j * Math.PI / 90;
      const r = radius * (.79 + .14 * Math.cos(8 * a + i * .23) + .07 * Math.sin(16 * a + i * .12));
      return `${(x + Math.cos(a) * r).toFixed(1)},${(y + Math.sin(a) * r).toFixed(1)}`;
    });
    add(`<polygon points="${points.join(' ')}"/>`);
  }
  add('</g>');
}
rosette(351, 667, 132, '#557e77', .2);
rosette(765, 687, 182, '#846b45', .10);
box(510, 19, 3, 986, '#81735f');
for (let y = 45; y < 995; y += 77) box(509.5, y, 3, 2, '#d1bc93', 'none', .6);
add('</g>');

// Coat of arms: the two avalanche galleries flanking the national pass.
add(`<g transform="translate(267 65)" fill="none" stroke="${navy}">
<circle r="27" stroke-width="1.4"/><circle r="23" stroke-width=".55"/>
<path d="M-18 6-6-9 0-3l8-12 10 21M-11 0l5-4 4 3m6-6 4-4 4 5" stroke-width="1.5"/>
<path d="M-20 9h40M-16 13h32m-27 4h22M-6 9V6a6 6 0 0 1 12 0v3" stroke-width="1.05"/>
</g>`);
text(267, 126, 'FEDERATION OF ORSAVA', 29, `${serif} ${center} ${bold} ${colored(navy)}`);
text(267, 150, 'ORSAVEN VEZNA', 12, `${center} letter-spacing="3.5" ${colored(rust)}`);
text(267, 173, 'PASEN / PASSPORT', 13, `${center} letter-spacing="2.3" ${colored(navy)}`);
rule(42, 188, 490);
box(45, 209, 153, 206, 'none', navy, 1);
add('<use xlink:href="#holder" x="46" y="210"/>');
field(216, 220, 'Tip / Type', 'P');
field(269, 220, 'Kod / Code', 'QOS');
field(335, 220, 'Pasen nr. / Passport no.', 'OS 481 706', 20);
rule(216, 252, 488, '#81918a');
field(216, 274, 'Domar / Surname', 'VELEN', 24);
field(216, 326, 'Namen / Given names', 'NEDA IVRA', 22);
field(216, 378, 'Zemna / Nationality', 'ORSAVAN');
add(`<path d="M51 447c30-40 18 11 9 13-6 3 17-23 28-25 7 0-6 19-3 13 8-12 13-12 10-6-6 14 17 2 27-6 13-10 8 8 5 11 13-4 16-14 17-9 3 8-10 13 4 9l33-7" fill="none" stroke="#235468" stroke-width="1.75" stroke-linecap="round"/>`);
rule(45, 464, 197, '#81918a');
text(45, 478, 'Ruken / Holder’s signature', 10.5, colored(muted));
field(216, 440, 'Bornat / Date of birth', '12 SEP 1984');
field(413, 440, 'Sek / Sex', 'F');
rule(43, 501, 489, '#81918a');
field(45, 523, 'Bornara / Place of birth', 'TREVA RIDGE');
field(276, 523, 'Os. nr. / Personal no.', '840912 1706');
field(45, 578, 'Vedat / Date of issue', '08 JAN 2024');
field(276, 578, 'Valid do / Date of expiry', '07 JAN 2034');
field(45, 633, 'Urad / Authority', 'TREVA CIVIL REGISTRY');
rule(43, 673, 489, '#81918a');
text(45, 700, 'ZAPIS / OBSERVATIONS', 11, `${bold} letter-spacing="1" ${colored(navy)}`);
lines(45, 725, ['Avalanche observer, Treva Snow Station.', 'North Notch duty travel: see endorsement', 'on adjacent page.']);
add('<use xlink:href="#holder" transform="translate(403 691) scale(.53)" opacity=".25"/>');

// Fictional state code QOS is in a user-assigned code range.
const check = (s: string) => [...s].reduce((sum, c, i) => {
  const value = c === '<' ? 0 : c >= 'A' ? c.charCodeAt(0) - 55 : Number(c);
  return sum + value * [7, 3, 1][i % 3];
}, 0) % 10;
const first = 'P<QOSVELEN<<NEDA<IVRA'.padEnd(44, '<');
const withCheck = (s: string) => s + check(s);
const doc = withCheck('OS481706<'), birth = withCheck('840912'), expiry = withCheck('340107');
const optional = withCheck('8409121706<<<<');
const second = doc + 'QOS' + birth + 'F' + expiry + optional + check(doc + birth + expiry + optional);
if (first.length !== 44 || second.length !== 44) throw new Error('Invalid machine-readable line widths');
box(39, 840, 456, 100, '#f8f2e4', '#c9c7b8', 2);
const mono = 'font-family="Consolas,monospace" letter-spacing=".25"';
text(49, 879, first, 15.9, mono);
text(49, 910, second, 15.9, mono);
text(45, 978, '2', 12, colored(muted));
text(488, 978, 'OS481706', 10, 'text-anchor="end" fill="#52615c"');

text(541, 63, 'VEDNE / VISAS', 28, `${serif} ${bold} ${colored(navy)}`);
text(973, 61, '3', 12, 'text-anchor="end" fill="#52615c"');
rule(542, 78, 974);
box(542, 94, 432, 161, '#eee7cf', '#8e702e', 4);
text(557, 116, 'NORTH NOTCH • DUTY ENDORSEMENT', 14, `${bold} ${colored(navy)}`);
text(959, 116, 'NN-42', 12, 'text-anchor="end" font-weight="700" fill="#913d32"');
rule(557, 128, 957, '#a2874f');
lines(557, 151, ['Holder may cross before the public convoy,', 'once the two-tone opening siren has sounded.', 'Report the first snow depth at the foreign post.'], 14.5, 22);
text(557, 225, 'VALID 08 JAN 2024 – 30 APR 2026', 11, bold);
text(557, 243, 'TREVA ROAD SERVICE · 08 JAN 2024', 10, colored(muted));
add(`<g transform="translate(921 178)" fill="none" stroke="#967536" opacity=".73"><circle r="26"/><circle r="22"/><path d="M-12 3h5l9-6v14l-9-6h-5zm16-8q13 7 0 18m4-21q18 10 0 24" transform="translate(0 -3)"/></g>`);

box(542, 274, 432, 153, '#e2eadf', '#577769', 4);
text(557, 299, 'CANTON OF RUDEL', 19, `${serif} ${bold} ${colored(navy)}`);
text(958, 299, 'VISA D2', 14, 'text-anchor="end" font-weight="700" fill="#183943"');
rule(558, 310, 959, '#577769');
field(557, 328, 'Valid from / Until', '01 FEB 2024 – 30 APR 2026', 14);
field(793, 328, 'Entries / Stay per visit', 'MULTIPLE / 7 DAYS', 14);
field(557, 372, 'Holder / Passport no.', 'N. IVRA VELEN · OS481706', 14);
field(793, 372, 'Issued at / Date', 'TREVA · 26 JAN 2024', 14);
text(557, 416, 'SOUTH POST ONLY · SNOW OBSERVATION DUTY', 10, `${bold} ${colored(navy)}`);
text(958, 416, 'RD 2401 0417', 10, 'text-anchor="end" fill="#52615c"');

text(543, 458, 'KORDEN / BORDER RECORD', 11, `${bold} letter-spacing="1" ${colored(navy)}`);
rule(543, 470, 973, '#81918a');
function stamp(x: number, y: number, rotation: number, color: string, country: string, event: string, date: string, post: string, round = false) {
  add(`<g transform="translate(${x} ${y}) rotate(${rotation})" fill="${color}" opacity=".97">`);
  if (round) {
    add(`<ellipse rx="84" ry="49" fill="none" stroke="${color}" stroke-width="2.4"/><ellipse rx="79.5" ry="45" fill="none" stroke="${color}" stroke-width=".8" stroke-dasharray="2.2 .5"/>`);
  } else {
    box(-88, -46, 176, 92, 'none', color, 8);
    add(`<rect x="-84" y="-42" width="168" height="84" rx="6" fill="none" stroke="${color}" stroke-width="1.3" stroke-dasharray="17 1 29 .8 4 .7"/>`);
  }
  text(0, -24, country, 10, `${center} ${bold} letter-spacing=".8" ${colored(color)}`);
  text(0, -6, event, 12, `${center} ${bold} ${colored(color)}`);
  text(0, 15, date, 15, `${center} ${bold} ${colored(color)}`);
  text(0, 35, post, 8.5, `${center} ${colored(color)}`);
  add('</g>');
}
stamp(646, 535, -4, '#28576b', 'ORSAVA', 'EXIT', '06 FEB 2024', 'NORTH NOTCH · 06:12');
stamp(871, 537, 4, '#49583b', 'RUDEL', 'ADMITTED', '06 FEB 2024', 'SOUTH POST · 06:36', true);
stamp(644, 655, 5, '#49583b', 'RUDEL', 'DEPARTED', '09 FEB 2024', 'SOUTH POST · 11:08', true);
stamp(873, 658, -4, '#28576b', 'ORSAVA', 'ENTRY', '09 FEB 2024', 'NORTH NOTCH · 11:31');
stamp(645, 781, -5, '#28576b', 'ORSAVA', 'EXIT', '17 JAN 2025', 'NORTH NOTCH · 07:08');
stamp(877, 780, 4, '#49583b', 'RUDEL', 'ADMITTED', '17 JAN 2025', 'SOUTH POST · 07:34', true);
stamp(647, 903, 3, '#49583b', 'RUDEL', 'DEPARTED', '20 JAN 2025', 'SOUTH POST · 12:14', true);
stamp(871, 904, -5, '#28576b', 'ORSAVA', 'ENTRY', '20 JAN 2025', 'NORTH NOTCH · 12:37');
text(973, 978, 'OS481706', 10, 'text-anchor="end" fill="#52615c"');
add('</svg>');

writeFileSync(process.argv[2] ?? 'orsava.svg', parts.join('\n'));
