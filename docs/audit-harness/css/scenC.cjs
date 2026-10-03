const at = (f, lines) => lines.map(l => ['dropRuleAt', f, l]);
module.exports = {
  'C3 Bärgning hero -> .bb-hero/__content/__copy + <TrustStrip> (övre gräns)': at('BargningPage.css', [33, 61, 69, 73, 79, 86, 94, 98, 102, 112, 115, 124, 131, 865, 869, 907, 911, 912]),
  'C3 Om oss hero -> .bb-hero/__content/__copy/__bottom (övre gräns)': at('AboutPage.css', [33, 84, 89, 93, 99, 106, 126, 608, 609, 613, 636]),
  'C4 Om oss/Bärgning foto-CTA + processrubrik -> ett delat mönster (övre gräns, exkl. tillägg i shared)': [...at('AboutPage.css', [486, 492, 516, 538, 550, 559]), ...at('BargningPage.css', [486, 492, 782, 806, 811, 817, 824, 885])],
  'C5 Bärgning bilbanner -> .bb-promo-card-variant (övre gräns)': at('BargningPage.css', [720, 732, 738, 747, 755]),
};
