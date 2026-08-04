import { GARDEN_PACKAGES, GardenPackage, PlantSpecies, SeasonalCare } from "./gardensData";

const ELEGANTE_HELL_PLANTS: PlantSpecies[] = [
  {
    name: "Anemone (White)",
    scientific_name: "Anemone sylvestris",
    role: "accent",
    ratio: 20,
    bloom_months: ["May", "June", "September"],
    height_cm: "30-40",
    description_en: "Delicate white cups that sway gently in late spring breeze, repeat blooming in early autumn.",
    description_de: "Zarte weiße Schalen, die sich im Frühlingswind wiegen und im Frühherbst nachblühen."
  },
  {
    name: "Sandwort",
    scientific_name: "Arenaria montana",
    role: "groundcover",
    ratio: 30,
    bloom_months: ["May", "June"],
    height_cm: "10-15",
    description_en: "Forms a dense green carpet sprinkled with tiny starry white flowers, excellent weed suppressor.",
    description_de: "Bildet einen dichten grünen Teppich mit kleinen weißen Sternenblüten, unterdrückt Unkraut hervorragend."
  },
  {
    name: "Feather Reed Grass",
    scientific_name: "Calamagrostis x acutiflora 'Karl Foerster'",
    role: "structural",
    ratio: 15,
    bloom_months: ["June", "July", "August", "September"],
    height_cm: "120-150",
    description_en: "Strong vertical lines that remain upright all winter, turning a beautiful golden straw color.",
    description_de: "Starke vertikale Halme, die den ganzen Winter aufrecht stehen und sich goldgelb färben."
  },
  {
    name: "White Peony",
    scientific_name: "Paeonia lactiflora 'Duchesse de Nemours'",
    role: "accent",
    ratio: 15,
    bloom_months: ["June"],
    height_cm: "80-90",
    description_en: "Highly fragrant, large double globes of pure white with cream-yellow centers.",
    description_de: "Sehr duftende, große, gefüllte reinweiße Blütenkugeln mit cremegelber Mitte."
  },
  {
    name: "Silver Sage",
    scientific_name: "Salvia argentea",
    role: "accent",
    ratio: 20,
    bloom_months: ["June", "July"],
    height_cm: "60-80",
    description_en: "Spectacular silver woolly leaves forming a soft base contrast against green lawns.",
    description_de: "Spektakuläre silbrig-wollige Blätter, die einen weichen Kontrast zu grünen Rasenflächen bilden."
  }
];

const ELEGANTE_HELL_CARE: SeasonalCare = {
  spring: "Cut back the Calamagrostis grass to ground level in March. Apply a light layer of organic compost to nourish the emerging peony crowns.",
  summer: "Deadhead spent anemone and peony flowers to encourage secondary growth and keep the garden looking neat. Water during prolonged dry spells.",
  autumn: "Clean up fallen foliage. Avoid cutting down the dry Calamagrostis flower stalks as they provide stunning winter structure and wildlife cover.",
  winter: "Leave structure undisturbed. The frost on silver sage foliage and golden reeds creates a magical glittering landscape."
};

const ELEGANT_DUNKEL_PLANTS: PlantSpecies[] = [
  {
    name: "Giant Hyssop",
    scientific_name: "Agastache 'Blackadder'",
    role: "structural",
    ratio: 25,
    bloom_months: ["July", "August", "September", "October"],
    height_cm: "80-100",
    description_en: "Tall, dark violet-blue flower spikes that are absolute magnets for bees and butterflies.",
    description_de: "Hohe, tief violettblaue Blütenähren, die Bienen und Schmetterlinge magisch anziehen."
  },
  {
    name: "Gromwell",
    scientific_name: "Lithodora diffusa 'Heavenly Blue'",
    role: "groundcover",
    ratio: 35,
    bloom_months: ["May", "June", "July"],
    height_cm: "15-20",
    description_en: "Intense, deep royal blue star-shaped flowers over low-lying evergreen mats.",
    description_de: "Intensiv königsblaue, sternförmige Blüten über flachen, immergrünen Polstern."
  },
  {
    name: "Siberian Iris",
    scientific_name: "Iris sibirica 'Silver Edge'",
    role: "accent",
    ratio: 20,
    bloom_months: ["May", "June"],
    height_cm: "60-80",
    description_en: "Deep blue-purple petals edged in silver-white, standing tall above architectural blade-like foliage.",
    description_de: "Tief blauviolette Blütenblätter mit silberweißem Rand über schwertförmigem Laub."
  },
  {
    name: "Black Mondo Grass",
    scientific_name: "Ophiopogon planiscapus 'Nigrescens'",
    role: "groundcover",
    ratio: 20,
    bloom_months: ["July", "August"],
    height_cm: "20-25",
    description_en: "Stunning, ribbon-like leaves of near-pure black. Offers a spectacular dark palette base.",
    description_de: "Nahezu tiefschwarze, bandförmige Blätter. Bietet eine spektakuläre dunkle Basis."
  }
];

const ELEGANT_DUNKEL_CARE: SeasonalCare = {
  spring: "Trim off any winter-damaged leaves of the Iris and Mondo grass. Give Lithodora a light haircut to promote bushy new growth.",
  summer: "Keep soil lightly moist. Agastache thrives with heat but appreciates organic mulching to keep roots cool.",
  autumn: "Cut down spent Iris leaves to a neat fan shape. Let Agastache seed heads stand for wintering finches.",
  winter: "Mondo grass maintains its dark color. Protect young Lithodora mats from freezing winds with dry leaves."
};

const FEURIG_LEBENDIG_PLANTS: PlantSpecies[] = [
  {
    name: "Joe Pye Weed",
    scientific_name: "Eupatorium maculatum 'Atropurpureum'",
    role: "structural",
    ratio: 20,
    bloom_months: ["August", "September", "October"],
    height_cm: "150-180",
    description_en: "Monstrously beautiful wine-red stems carrying massive domed clusters of dusky rose-pink blooms.",
    description_de: "Riesige weinrote Stängel mit gewaltigen, flachen Blütenständen in dunklem Rosarot."
  },
  {
    name: "Red Bistort",
    scientific_name: "Bistorta amplexicaulis 'Firetail'",
    role: "accent",
    ratio: 30,
    bloom_months: ["July", "August", "September", "October"],
    height_cm: "80-100",
    description_en: "Long, vibrant crimson-red bottlebrush spikes that wave dynamically from mid-summer until first frost.",
    description_de: "Lange, kräftig karmesinrote Ähren, die von Hochsommer bis zum Frost dynamisch tanzen."
  },
  {
    name: "Silver Maiden Grass",
    scientific_name: "Miscanthus sinensis 'Kleine Silberspinne'",
    role: "structural",
    ratio: 20,
    bloom_months: ["August", "September", "October"],
    height_cm: "120-140",
    description_en: "Fine-textured grass with arching silver-striped leaves and reddish feathery blooms.",
    description_de: "Feinstrukturiertes Gras mit bogig überhängenden, silbergestreiften Halmen."
  },
  {
    name: "Sneezeweed",
    scientific_name: "Helenium 'Moerheim Beauty'",
    role: "accent",
    ratio: 30,
    bloom_months: ["July", "August", "September"],
    height_cm: "70-90",
    description_en: "Coppery-red daisylike heads with dark brown centers, capturing the essence of late summer warmth.",
    description_de: "Kupferrote, margeritenähnliche Blütenköpfe mit dunkelbrauner Mitte."
  }
];

const FEURIG_LEBENDIG_CARE: SeasonalCare = {
  spring: "Cut all Miscanthus and Eupatorium stalks to ground level. Incorporate plenty of nutrient-rich garden soil or mature compost.",
  summer: "Pinch back Helenium in early June ('Chelsea Chop') to yield sturdier stems that won't require staking.",
  autumn: "Fabulous golden-orange autumn colors emerge. Let the seed heads remain as they look striking in frost.",
  winter: "Leave structure as-is. Cut back in early spring before fresh green growth emerges."
};

const ROMANTISCH_ZART_PLANTS: PlantSpecies[] = [
  {
    name: "Ornamental Onion",
    scientific_name: "Allium 'Globemaster'",
    role: "accent",
    ratio: 25,
    bloom_months: ["May", "June"],
    height_cm: "80-100",
    description_en: "Giant purple spherical blooms that create whimsical floating globes in late spring.",
    description_de: "Riesige violette Blütenbälle, die im späten Frühjahr magisch über dem Beet schweben."
  },
  {
    name: "Russian Sage",
    scientific_name: "Perovskia atriplicifolia 'Blue Spire'",
    role: "structural",
    ratio: 25,
    bloom_months: ["July", "August", "September", "October"],
    height_cm: "90-120",
    description_en: "Clouds of airy lavender-blue flowers above highly aromatic silvery-green leaves.",
    description_de: "Luftige lavendelblaue Blütenwolken über aromatisch duftendem, silbergrauem Laub."
  },
  {
    name: "Feather Grass",
    scientific_name: "Stipa tenuissima",
    role: "groundcover",
    ratio: 30,
    bloom_months: ["June", "July", "August", "September"],
    height_cm: "40-60",
    description_en: "Whisper-light blonde tresses that respond to the gentlest breeze, adding endless motion.",
    description_de: "Federleichte, hellblonde Halme, die sich bei jedem Lufthauch elegant bewegen."
  },
  {
    name: "Pincushion Flower",
    scientific_name: "Scabiosa columbaria 'Pink Mist'",
    role: "accent",
    ratio: 20,
    bloom_months: ["June", "July", "August", "September"],
    height_cm: "30-40",
    description_en: "Delicate soft-pink button blooms that keep flowering tirelessly on short stems.",
    description_de: "Zarte, rosafarbene Knopflochblüten, die unermüdlich auf kurzen Stielen nachwachsen."
  }
];

const ROMANTISCH_ZART_CARE: SeasonalCare = {
  spring: "Cut Perovskia back hard (to 10-15cm) in mid-spring. Comb through Stipa grass with fingers to remove dead thatch.",
  summer: "Keep watering to a minimum. Allium globes dry out on the stalk and maintain a beautiful architectural shell.",
  autumn: "Prune Scabiosa to clean up the base. Stipa takes on a gorgeous straw color.",
  winter: "Very low maintenance. Keep dry to prevent winter root rot in cold, waterlogged soil."
};

const WILD_HOCH_PLANTS: PlantSpecies[] = [
  {
    name: "Mullein",
    scientific_name: "Verbascum olympicum",
    role: "structural",
    ratio: 20,
    bloom_months: ["June", "July", "August"],
    height_cm: "160-200",
    description_en: "Impressive branched candelabras of bright yellow flowers rising from giant woolly rosettes.",
    description_de: "Beeindruckende verzweigte Kandelaber mit gelben Blüten über riesigen Wollrosetten."
  },
  {
    name: "Switch Grass",
    scientific_name: "Panicum virgatum 'Shenandoah'",
    role: "grass",
    ratio: 30,
    bloom_months: ["August", "September", "October"],
    height_cm: "100-120",
    description_en: "Upright green foliage that tips with rich burgundy-red in summer, turning fiery copper in autumn.",
    description_de: "Aufrechtes grünes Gras mit weinroten Spitzen im Sommer und feurigem Kupferton im Herbst."
  },
  {
    name: "Musk Mallow",
    scientific_name: "Malva moschata",
    role: "accent",
    ratio: 25,
    bloom_months: ["June", "July", "August", "September"],
    height_cm: "60-80",
    description_en: "Charming satiny pink flowers that emit a faint musky fragrance, loved by hoverflies.",
    description_de: "Seidig-rosa Blüten mit zartem Moschusduft, ein Paradies für Schwebfliegen."
  },
  {
    name: "Purple Coneflower",
    scientific_name: "Echinacea purpurea",
    role: "accent",
    ratio: 25,
    bloom_months: ["July", "August", "September"],
    height_cm: "80-100",
    description_en: "Sturdy daisylike heads with coppery-orange cones. Excellent seed source for local birds.",
    description_de: "Robuste, purpurrosa Blütenköpfe mit kupfernen Kegeln. Tolle Futterquelle für Vögel."
  }
];

const WILD_HOCH_CARE: SeasonalCare = {
  spring: "Cut down Panicum and Echinacea stalks. Mullein is biennial or short-lived perennial, allow young seedlings to develop.",
  summer: "Provide support stakes if Verbascum spikes bend in high winds. Water deeply but infrequently.",
  autumn: "Echinacea coneheads will dry. Do not prune them so goldfinches can feast on the seeds all winter.",
  winter: "The tall silhouette of Panicum stands strong against snow. Cut back completely in late winter."
};

const HEISS_STEINIG_PLANTS: PlantSpecies[] = [
  {
    name: "Purple Rock Cress",
    scientific_name: "Aubrieta deltoidea",
    role: "groundcover",
    ratio: 40,
    bloom_months: ["April", "May"],
    height_cm: "10-15",
    description_en: "Drapes rock edges and gravel in cascading waterfalls of rich violet-purple flowers.",
    description_de: "Hängt über Steinkanten und Kieswege wie ein Kaskadenwasserfall aus violetten Blüten."
  },
  {
    name: "Sea Thrift",
    scientific_name: "Armeria maritima",
    role: "accent",
    ratio: 30,
    bloom_months: ["May", "June", "July"],
    height_cm: "15-20",
    description_en: "Tight, grass-like evergreen cushions topped by globe-shaped pink flower clusters.",
    description_de: "Dichte, grasartige Polster mit kugeligen, rosafarbenen Blütenköpfchen."
  },
  {
    name: "Blue Fescue",
    scientific_name: "Festuca glauca 'Elijah Blue'",
    role: "grass",
    ratio: 30,
    bloom_months: ["June", "July"],
    height_cm: "20-30",
    description_en: "Ultra-cool icy blue needle-like foliage tufts that provide year-round spherical shape.",
    description_de: "Eisblaue, nadelartige Gräserkugeln, die das ganze Jahr über Form und Farbe geben."
  }
];

const HEISS_STEINIG_CARE: SeasonalCare = {
  spring: "Comb out dead leaves from the Festuca tufts. Trim Aubrieta immediately after spring flowering to maintain tight cushion shape.",
  summer: "Extremely drought-hardy. Only water newly planted specimens; established gravel beds need zero summer watering.",
  autumn: "Clean gravel margins of leaf debris to prevent rot in low creeping evergreen mats.",
  winter: "Ensure gravel substrate drains perfectly. Blue fescue and sea thrift cushions remain evergreen and bright."
};

const GRUEN_PFLEGELEICHT_PLANTS: PlantSpecies[] = [
  {
    name: "Wood Sedge",
    scientific_name: "Carex sylvatica",
    role: "groundcover",
    ratio: 40,
    bloom_months: ["May", "June"],
    height_cm: "30-40",
    description_en: "Dense clumps of bright green arching blades. Supresses weed germination completely.",
    description_de: "Dichte Horste aus hellgrünen, überhängenden Halmen. Unterdrückt Unkraut wuchsfrei."
  },
  {
    name: "Cranesbill",
    scientific_name: "Geranium 'Rozanne'",
    role: "groundcover",
    ratio: 35,
    bloom_months: ["June", "July", "August", "September", "October"],
    height_cm: "40-50",
    description_en: "Voted plant of the century. Endless blue-violet flowers with white centers from summer until frost.",
    description_de: "Jahrhundertpflanze. Endlose blauviolette Blüten mit weißer Mitte von Sommer bis Frost."
  },
  {
    name: "Red Hot Poker",
    scientific_name: "Kniphofia 'Alcazar'",
    role: "structural",
    ratio: 25,
    bloom_months: ["July", "August", "September"],
    height_cm: "90-100",
    description_en: "Spectacular glowing orange-red torches that add vertical fire elements to the green base.",
    description_de: "Spektakuläre, glühend orangerote Blütenfackeln, die vertikale Akzente setzen."
  }
];

const GRUEN_PFLEGELEICHT_CARE: SeasonalCare = {
  spring: "Cut back Geranium foliage to the base. Clear Carex leaves only if damaged. Apply basic slow-release fertilizer.",
  summer: "Keep Carex roots reasonably moist. Geranium Rozanne will scramble over everything, guide it as needed.",
  autumn: "Cut down spent Kniphofia flower stalks. Leave grass foliage intact to protect crowns from cold wetness.",
  winter: "Carex remains green through mild winters. Clear away dead geranium twigs in late winter."
};

const MEDITERRAN_DUFTEND_PLANTS: PlantSpecies[] = [
  {
    name: "Creeping Thyme",
    scientific_name: "Thymus praecox 'Coccineus'",
    role: "groundcover",
    ratio: 40,
    bloom_months: ["June", "July"],
    height_cm: "5-10",
    description_en: "Fragrant carpet of tiny crimson flowers that releases sweet herbal scents when stepped on.",
    description_de: "Duftender Teppich mit winzigen purpurroten Blüten, der beim Betreten Kräuteraroma verströmt."
  },
  {
    name: "Lesser Calamint",
    scientific_name: "Clinopodium nepeta",
    role: "accent",
    ratio: 30,
    bloom_months: ["July", "August", "September", "October"],
    height_cm: "30-45",
    description_en: "Clouds of tiny lilac flowers smelling intensely of minty oregano when brushed against.",
    description_de: "Lavendelblaue Blütenwolken mit intensivem Minze-Oregano-Duft beim Vorübergehen."
  },
  {
    name: "Blue Moor Grass",
    scientific_name: "Sesleria caerulea",
    role: "grass",
    ratio: 30,
    bloom_months: ["March", "April", "May"],
    height_cm: "20-30",
    description_en: "Tough evergreen grass with leaf blades that are green on one side and silver-blue on the other.",
    description_de: "Robustes immergrünes Gras mit Blättern, die oben grün und unten silberblau schimmern."
  }
];

const MEDITERRAN_DUFTEND_CARE: SeasonalCare = {
  spring: "Prune Calamint stems back close to the base. Check thyme margins and clear weeds that managed to creep through.",
  summer: "Thrives in dry heat. Perfect for sensory paths or gravel seating edges. Requires minimal watering.",
  autumn: "Harvest remaining herbs. Prune Calamint if you want to prevent self-seeding.",
  winter: "Requires good drainage. Sesleria grass provides stunning silver-green cushions all winter long."
};

export function getGardenPackageWithDetails(id: string): GardenPackage | undefined {
  const basePackage = GARDEN_PACKAGES.find(g => g.id === id);
  if (!basePackage) return undefined;

  let plants_detail: PlantSpecies[] = [];
  let seasonal_care: SeasonalCare = { spring: "", summer: "", autumn: "", winter: "" };
  let planting_density_per_sqm = 7;

  switch (id) {
    case "elegant-hell":
      plants_detail = ELEGANTE_HELL_PLANTS;
      seasonal_care = ELEGANTE_HELL_CARE;
      planting_density_per_sqm = 6;
      break;
    case "elegant-dunkel":
      plants_detail = ELEGANT_DUNKEL_PLANTS;
      seasonal_care = ELEGANT_DUNKEL_CARE;
      planting_density_per_sqm = 7;
      break;
    case "feurig-lebendig":
      plants_detail = FEURIG_LEBENDIG_PLANTS;
      seasonal_care = FEURIG_LEBENDIG_CARE;
      planting_density_per_sqm = 5;
      break;
    case "romantisch-zart":
      plants_detail = ROMANTISCH_ZART_PLANTS;
      seasonal_care = ROMANTISCH_ZART_CARE;
      planting_density_per_sqm = 8;
      break;
    case "wild-hoch":
      plants_detail = WILD_HOCH_PLANTS;
      seasonal_care = WILD_HOCH_CARE;
      planting_density_per_sqm = 4;
      break;
    case "heiss-steinig":
      plants_detail = HEISS_STEINIG_PLANTS;
      seasonal_care = HEISS_STEINIG_CARE;
      planting_density_per_sqm = 9;
      break;
    case "gruen-pflegeleicht":
      plants_detail = GRUEN_PFLEGELEICHT_PLANTS;
      seasonal_care = GRUEN_PFLEGELEICHT_CARE;
      planting_density_per_sqm = 6;
      break;
    case "mediterran-duftend":
      plants_detail = MEDITERRAN_DUFTEND_PLANTS;
      seasonal_care = MEDITERRAN_DUFTEND_CARE;
      planting_density_per_sqm = 8;
      break;
    default:
      break;
  }

  return {
    ...basePackage,
    plants_detail,
    seasonal_care,
    planting_density_per_sqm
  };
}
