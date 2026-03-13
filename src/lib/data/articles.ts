export type Category = "CRISIS" | "ANALYSIS" | "GUIDE";

export interface Article {
  slug: string;
  title: string;
  category: Category;
  categoryColor: string;
  date: string;
  readTime: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  relatedCalculators: string[];
  content: string;
}

export const CATEGORY_STYLES: Record<Category, { bg: string; text: string }> = {
  CRISIS: { bg: "bg-red-500/15", text: "text-red-400" },
  ANALYSIS: { bg: "bg-blue-500/15", text: "text-blue-400" },
  GUIDE: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
};

export const articles: Article[] = [
  {
    slug: "hormuz-crisis-steel-impact-india",
    title:
      "How the Hormuz Crisis Is Changing Steel Costs in India \u2014 A Data-Driven Analysis",
    category: "CRISIS",
    categoryColor: "red",
    date: "2026-03-12",
    readTime: "8 min",
    excerpt:
      "Oil up 30%, freight up 38%, three mill price hikes in 13 days. Here\u2019s exactly how the Hormuz crisis is hitting your cost sheet \u2014 and what to do about it.",
    metaTitle:
      "Hormuz Crisis Steel Impact India 2026 \u2014 Price, Freight & Cost Analysis | SteelMath",
    metaDescription:
      "Data-driven analysis of how the Strait of Hormuz closure is impacting Indian steel prices, freight costs, raw material routes, and production economics. Updated daily.",
    relatedCalculators: ["freight", "energy-cost", "landed-cost"],
    content: `
<p>The Strait of Hormuz has been effectively closed since February 28, 2026. For Indian steel professionals, this isn\u2019t a distant geopolitical headline \u2014 it\u2019s a direct hit to your cost sheet. Here\u2019s exactly what\u2019s changing, what\u2019s coming next, and what you can do about it.</p>

<h2>The Numbers That Matter Right Now</h2>

<p>Since the crisis began 13 days ago, four things have moved simultaneously against the Indian steel industry:</p>

<p>Crude oil has jumped from approximately \u20B970 per barrel to over $92 \u2014 a 30% surge that directly feeds into energy costs at every steel mill in the country. Whether you\u2019re running a blast furnace operation or an EAF shop, your power and fuel bill just went up.</p>

<p>Ocean freight rates have spiked roughly 38% as vessels reroute around the Cape of Good Hope instead of passing through Hormuz. What was a 15-day sailing from the Gulf to Mumbai is now 25\u201330 days via southern Africa. That\u2019s not just a freight cost increase \u2014 it\u2019s a working capital cost increase, because your material is floating at sea for an extra two weeks.</p>

<p>Indian mills have responded with three consecutive rounds of price hikes since March 1. HRC base prices have climbed by approximately \u20B92,100 per MT across major producers. More hikes are widely expected by mid-March as the full energy cost impact hits production economics.</p>

<p>The Indian rupee has weakened against the dollar, making all dollar-denominated imports \u2014 coking coal, scrap, finished steel \u2014 more expensive in rupee terms.</p>

<h2>How Oil Prices Flow Into Your Steel Cost</h2>

<p>Steel production is extraordinarily energy-intensive. A typical integrated steel mill (BF-BOF route) in India consumes energy equivalent to roughly 5.5\u20136.5 Gcal per tonne of crude steel. When oil crosses $90 per barrel, the cascading effect works through multiple channels.</p>

<p>Direct energy costs rise \u2014 coal, coke, and natural gas prices are all correlated with crude. Electricity rates in many Indian states are linked to fuel costs. Transport costs rise across the entire value chain, from moving iron ore to the mill to delivering finished steel to your warehouse. And petrochemical inputs used in processes like galvanising, coating, and lubrication all get more expensive.</p>

<p>Our Energy \u2192 Production Cost calculator on SteelMath models this relationship. At $92 per barrel of Brent crude, we estimate Indian BF-BOF steel production costs have risen by \u20B91,200\u20131,800 per MT compared to pre-crisis levels. For EAF producers, the impact is somewhat lower at \u20B9800\u20131,200 per MT, but still significant.</p>

<h2>The Freight Multiplier Effect</h2>

<p>The headline freight rate increase of 38% doesn\u2019t tell the full story. Here\u2019s what rerouting via the Cape of Good Hope actually means for Indian steel buyers importing material:</p>

<p>Sailing from Jebel Ali (UAE) to Mumbai via Hormuz takes approximately 3\u20134 days. Via the Cape, it\u2019s 20\u201325 days. That\u2019s 17\u201321 additional days at sea.</p>

<p>For a 50,000 MT bulk carrier, the additional fuel and charter cost translates to roughly $8\u201315 per MT of additional freight, depending on vessel size and current charter rates. On top of that, war risk insurance premiums have gone from negligible to as high as 0.5% of cargo value.</p>

<p>But the hidden cost is working capital. If you\u2019re financing your imports, those extra 20 days at sea mean an additional interest cost. At a 12% annual interest rate, 20 extra days on a $500/MT cargo costs you approximately $3.30 per MT in financing alone.</p>

<h2>What\u2019s Happening With Raw Material Routes</h2>

<p>India\u2019s steel industry depends on imported coking coal (primarily from Australia, the US, and Mozambique) and, to some extent, imported scrap. Here\u2019s the current status of key supply routes:</p>

<p><strong>Australia to India via the Indian Ocean</strong> \u2014 largely unaffected. This is India\u2019s most critical coking coal route, and it doesn\u2019t transit the Hormuz strait. Shipments continue normally, though freight rates have risen modestly due to general market tightness.</p>

<p><strong>Mozambique to India</strong> \u2014 similarly unaffected by Hormuz, as these routes go through the Mozambique Channel and across the Indian Ocean.</p>

<p><strong>Middle Eastern scrap (UAE, Saudi Arabia)</strong> \u2014 severely impacted. Scrap shipments from Gulf ports that normally transit Hormuz are now either halted or being rerouted at significant additional cost.</p>

<p><strong>Iron ore imports</strong> \u2014 India is largely self-sufficient in iron ore, so the direct impact is minimal. However, Iran itself supplies about 3% of global iron ore, and that supply is now disrupted.</p>

<h2>What Should You Do Right Now?</h2>

<p><strong>For steel traders and stockholders:</strong> the near-term price trajectory is upward. With oil above $90, freight elevated, and mills announcing successive hikes, prices have further room to rise. If you have inventory, hold. If you need to buy, don\u2019t wait for a correction that may not come for weeks.</p>

<p><strong>For purchase managers:</strong> lock in rates where possible. If your suppliers are offering fixed-price contracts for March-April delivery, evaluate them against the likely scenario of continued price increases. Use our Landed Cost Calculator to compare domestic procurement versus imports at current rerouted freight rates.</p>

<p><strong>For plant engineers and fabricators:</strong> factor in the cost increases when preparing estimates and BOQs. A project estimated at pre-crisis rates could face a 3\u20135% material cost overrun if prices continue trending up.</p>

<h2>How Long Will This Last?</h2>

<p>The honest answer: nobody knows. The crisis depends entirely on the geopolitical situation between the US, Israel, and Iran. What we can say is that even after a diplomatic resolution, freight rates and insurance premiums typically take 4\u20138 weeks to normalise. The price hikes already announced by mills won\u2019t be reversed. And any further escalation \u2014 a tanker sinking, mine deployment, or extended military action \u2014 would push costs significantly higher.</p>

<p>SteelMath will continue publishing daily updates and keeping our crisis calculators updated with the latest rates. Subscribe to our daily brief to stay ahead of the market.</p>
`,
  },
  {
    slug: "steel-price-hike-tracker-march-2026",
    title:
      "Steel Price Hike Tracker: March 2026 \u2014 Every Mill, Every Hike, Every Product",
    category: "ANALYSIS",
    categoryColor: "blue",
    date: "2026-03-11",
    readTime: "5 min",
    excerpt:
      "JSW, Tata Steel, SAIL \u2014 three rounds of hikes and counting. Complete timeline with amounts, dates, and products affected.",
    metaTitle:
      "Steel Price Hike Tracker March 2026 \u2014 JSW, Tata Steel, SAIL Hike History | SteelMath",
    metaDescription:
      "Complete tracker of every steel price hike announcement in March 2026. JSW Steel, Tata Steel, SAIL \u2014 dates, amounts, products affected. Updated daily.",
    relatedCalculators: ["margin"],
    content: `
<p>Indian steel mills have entered an aggressive price hike cycle driven by the Hormuz crisis. This page tracks every confirmed price increase, updated as announcements are made. Bookmark this page \u2014 we update it within hours of each announcement.</p>

<h2>March 2026 Hike Summary</h2>

<p>Total cumulative hike since March 1, 2026:</p>
<ul>
<li><strong>HRC (Hot Rolled Coil):</strong> approximately \u20B92,000\u20132,500/MT across major producers</li>
<li><strong>CRC (Cold Rolled Coil):</strong> approximately \u20B91,500\u20132,000/MT</li>
<li><strong>TMT Bar/Rebar:</strong> approximately \u20B91,000\u20131,500/MT</li>
<li><strong>Plate:</strong> approximately \u20B91,500\u20132,000/MT</li>
</ul>

<h2>The Timeline of Hikes</h2>

<h3>Round 1 \u2014 effective March 1\u20133, 2026</h3>

<p>Within 48 hours of the Hormuz crisis escalating, major producers moved first. SAIL increased HR flat product prices by approximately \u20B9500 per MT for March deliveries. This was viewed as an opening move, testing market response during a period of extreme uncertainty. JSW Steel followed with a roughly \u20B9500 per MT increase on HRC and plates, effective for fresh bookings. Tata Steel aligned with a similar increase across flat products for its distribution channel.</p>

<h3>Round 2 \u2014 effective March 6\u20138, 2026</h3>

<p>As oil crossed $85 per barrel and freight disruptions became clear, a second round came quickly. JSW Steel announced an additional increase of approximately \u20B9750 per MT on HRC, effective for March 15 deliveries. This was the largest single hike, reflecting JSW\u2019s assessment that input costs had structurally shifted. Tata Steel raised CRC prices by approximately \u20B9500 per MT and TMT bar prices by \u20B9500 per MT. SAIL followed with across-the-board hikes on all flat products.</p>

<h3>Round 3 \u2014 effective March 10\u201312, 2026</h3>

<p>The third round confirmed that mills see no near-term cost relief. Hikes of \u20B9500\u2013750 per MT were announced on HRC and CRC by major producers. Long products (TMT, rebar) saw smaller increases of \u20B9300\u2013500 per MT, as domestic demand softened slightly due to price resistance from construction buyers.</p>

<h2>Why Are Mills Hiking So Aggressively?</h2>

<p>Three factors are driving this unprecedented pace of increases:</p>

<p><strong>Energy costs are up 25\u201330% since mid-February.</strong> Steel production is one of the most energy-intensive manufacturing processes in existence. When oil, gas, and coal prices surge simultaneously \u2014 as they are now \u2014 mills have no choice but to pass through the cost increases. The Hormuz crisis pushed crude from $70 to over $90 in under two weeks.</p>

<p><strong>Imported input costs are rising due to freight and currency.</strong> Coking coal, ferro alloys, and certain grades of scrap that Indian mills import have all become more expensive because of higher freight rates and rupee depreciation. Even though the main coking coal route (Australia to India) doesn\u2019t transit Hormuz, the general market tightness has pushed all bulk freight rates higher.</p>

<p><strong>Mills are also reading the global situation and anticipating further escalation.</strong> With Chinese steel exports to the Gulf halted by the crisis, Indian producers see an opportunity to capture redirected demand from the Middle East. This tightens domestic supply, supporting higher prices.</p>

<h2>What\u2019s Coming Next?</h2>

<p>Based on the trajectory of oil prices, freight rates, and the unresolved geopolitical situation, we expect at least one more round of hikes in the second half of March. If oil crosses $100 per barrel \u2014 a scenario many analysts consider possible \u2014 the cumulative increase from pre-crisis levels could reach \u20B93,000\u20134,000 per MT for flat products.</p>

<p>The key variable to watch is demand response. If construction and manufacturing buyers resist the new prices by deferring purchases, mills may pause further hikes. But in a supply-constrained environment with rising input costs, meaningful price corrections are unlikely until the crisis de-escalates.</p>

<h2>How to Use This Information</h2>

<p><strong>If you\u2019re a trader:</strong> track this page daily. Mill announcements typically hit the market 2\u20133 days before official circulars. Our daily email alerts will flag major hike announcements within hours.</p>

<p><strong>If you\u2019re a purchase manager:</strong> use our Margin Calculator to model how each \u20B9500 per MT hike affects your project economics. Build scenarios for \u20B952,000, \u20B954,000, and \u20B956,000 per MT HRC to present your management with range-based procurement recommendations.</p>

<p>We\u2019ll keep this tracker updated through March and beyond. Subscribe to our daily alerts to get hike notifications as they happen.</p>
`,
  },
  {
    slug: "steel-weight-calculator-guide",
    title:
      "Steel Weight Calculator \u2014 The Complete Guide With Formulas for Every Section",
    category: "GUIDE",
    categoryColor: "green",
    date: "2026-03-10",
    readTime: "12 min",
    excerpt:
      "Formulas for TMT bar, plate, pipe, angle, channel, I-beam, and more. With worked examples and a free online calculator.",
    metaTitle:
      "Steel Weight Calculator \u2014 Formulas for TMT Bar, Plate, Pipe, Angle, Beam | SteelMath",
    metaDescription:
      "Complete guide to calculating steel weight for every section type \u2014 TMT bar, plate, pipe, angle, channel, I-beam. Free online calculator with formulas and examples.",
    relatedCalculators: ["weight"],
    content: `
<p>Whether you\u2019re preparing a purchase order, estimating a project, or verifying a supplier\u2019s invoice, knowing how to calculate steel weight accurately is one of the most essential skills in the steel industry. This guide covers every common steel section with formulas, worked examples, and access to our free online calculator that does the maths instantly.</p>

<h2>The Universal Principle</h2>

<p>All steel weight calculations follow one principle: <strong>Weight = Volume \u00D7 Density</strong>. The density of mild steel (carbon steel) is 7,850 kg per cubic metre. For stainless steel 304, it\u2019s 8,000 kg/m\u00B3. For aluminium, 2,700 kg/m\u00B3.</p>

<p>The challenge is calculating the volume correctly for each section shape. That\u2019s what the formulas below solve.</p>

<h2>TMT Bar / Round Bar</h2>

<p>This is the most commonly calculated section in Indian construction and trading.</p>

<p>The simplified formula is: <strong>Weight (kg) = d\u00B2 \u00F7 162.2 \u00D7 Length (m)</strong></p>

<p>Where d is the diameter in millimetres and 162.2 is a constant derived from the density of mild steel and the area formula for a circle.</p>

<p><strong>Example:</strong> A 12mm TMT bar, 12 metres long. Weight = 12\u00B2 \u00F7 162.2 \u00D7 12 = 144 \u00F7 162.2 \u00D7 12 = 10.66 kg per bar.</p>

<p>For 100 such bars: 10.66 \u00D7 100 = 1,066 kg = 1.066 MT.</p>

<p>Quick reference for common TMT bar weights per metre: 8mm weighs 0.395 kg/m, 10mm weighs 0.617 kg/m, 12mm weighs 0.889 kg/m, 16mm weighs 1.580 kg/m, 20mm weighs 2.469 kg/m, 25mm weighs 3.858 kg/m, and 32mm weighs 6.324 kg/m.</p>

<h2>Steel Plate / Sheet</h2>

<p>Formula: <strong>Weight (kg) = Length (mm) \u00D7 Width (mm) \u00D7 Thickness (mm) \u00D7 7.85 \u00F7 1,000,000</strong></p>

<p>The constant 7.85 comes from converting the density of mild steel (7,850 kg/m\u00B3) into a form usable with millimetre dimensions.</p>

<p><strong>Example:</strong> A plate measuring 2,000mm \u00D7 1,000mm \u00D7 10mm thick. Weight = 2000 \u00D7 1000 \u00D7 10 \u00D7 7.85 \u00F7 1,000,000 = 157 kg.</p>

<p>For chequered (checker) plates, add approximately 5% to the calculated weight to account for the raised diamond pattern.</p>

<h2>MS Pipe / Round Tube</h2>

<p>Formula: <strong>Weight (kg/m) = (OD \u2212 Wall Thickness) \u00D7 Wall Thickness \u00D7 0.02466</strong></p>

<p>Where OD is the outer diameter in mm and Wall Thickness is in mm. The constant 0.02466 is derived from \u03C0 \u00D7 density \u00F7 10\u2076.</p>

<p><strong>Example:</strong> A pipe with 60mm OD and 3.6mm wall thickness. Weight per metre = (60 \u2212 3.6) \u00D7 3.6 \u00D7 0.02466 = 56.4 \u00D7 3.6 \u00D7 0.02466 = 5.01 kg/m.</p>

<p>For a 6-metre length: 5.01 \u00D7 6 = 30.06 kg.</p>

<h2>Square Tube</h2>

<p>Formula: <strong>Weight (kg/m) = (Side \u2212 Wall Thickness) \u00D7 Wall Thickness \u00D7 4 \u00D7 0.00785</strong></p>

<p><strong>Example:</strong> A 50mm \u00D7 50mm square tube with 2.5mm wall thickness. Weight per metre = (50 \u2212 2.5) \u00D7 2.5 \u00D7 4 \u00D7 0.00785 = 47.5 \u00D7 2.5 \u00D7 4 \u00D7 0.00785 = 3.73 kg/m.</p>

<h2>Rectangular Tube</h2>

<p>Formula: <strong>Weight (kg/m) = 2 \u00D7 (Width + Height \u2212 2 \u00D7 Wall Thickness) \u00D7 Wall Thickness \u00D7 0.00785</strong></p>

<p><strong>Example:</strong> A 75mm \u00D7 50mm rect tube with 3mm wall. Weight per metre = 2 \u00D7 (75 + 50 \u2212 6) \u00D7 3 \u00D7 0.00785 = 2 \u00D7 119 \u00D7 3 \u00D7 0.00785 = 5.61 kg/m.</p>

<h2>Angle Section</h2>

<p>Formula: <strong>Weight (kg/m) = (Leg A + Leg B \u2212 Thickness) \u00D7 Thickness \u00D7 0.00785</strong></p>

<p><strong>Example:</strong> A 50mm \u00D7 50mm \u00D7 5mm angle. Weight per metre = (50 + 50 \u2212 5) \u00D7 5 \u00D7 0.00785 = 95 \u00D7 5 \u00D7 0.00785 = 3.73 kg/m.</p>

<h2>Flat Bar</h2>

<p>Formula: <strong>Weight (kg/m) = Width (mm) \u00D7 Thickness (mm) \u00D7 0.00785</strong></p>

<p><strong>Example:</strong> A 50mm \u00D7 6mm flat bar. Weight per metre = 50 \u00D7 6 \u00D7 0.00785 = 2.355 kg/m.</p>

<h2>I-Beam and Channel</h2>

<p>For standard I-beams (ISMB) and channels (ISMC), weights are defined by Indian Standard specifications. These sections have complex cross-sectional profiles (flanges, web, fillets) that make direct formula calculation impractical. Instead, use the IS standard lookup tables.</p>

<p>Common ISMB weights per metre: ISMB 100 is 11.5 kg/m, ISMB 150 is 14.9 kg/m, ISMB 200 is 25.4 kg/m, ISMB 250 is 37.3 kg/m, ISMB 300 is 46.1 kg/m, ISMB 350 is 52.4 kg/m, and ISMB 400 is 61.6 kg/m.</p>

<p>Our Steel Weight Calculator has the complete IS standard database built in \u2014 just select the section size and the weight is auto-filled.</p>

<h2>Adjusting for Different Materials</h2>

<p>All formulas above assume mild steel (7,850 kg/m\u00B3). For other materials, multiply the result by a correction factor: Stainless Steel 304 uses factor 1.019, Stainless Steel 316 uses 1.023, Aluminium uses 0.344, Copper uses 1.139, and Brass uses 1.083.</p>

<p>Or simply use our calculator and select the material from the dropdown \u2014 the density is automatically applied.</p>

<h2>Use the Free Calculator</h2>

<p>Rather than calculating manually every time, use SteelMath\u2019s Steel Weight Calculator. It supports all 10 section types, all materials, calculates instantly as you type, and lets you build multi-item BOMs (Bills of Materials) with one-click export to PDF or WhatsApp.</p>

<p>It\u2019s free, requires no signup, and works on mobile. <a href="/">Try it now</a>.</p>
`,
  },
  {
    slug: "freight-cost-rerouting-india",
    title:
      "What Cape of Good Hope Rerouting Actually Costs Indian Steel Buyers",
    category: "CRISIS",
    categoryColor: "red",
    date: "2026-03-11",
    readTime: "7 min",
    excerpt:
      "The real cost breakdown: freight, insurance, working capital, and opportunity cost. It\u2019s more than just +38%.",
    metaTitle:
      "Cape of Good Hope Rerouting Cost for Indian Steel \u2014 Freight, Insurance, Working Capital | SteelMath",
    metaDescription:
      "Detailed breakdown of what Hormuz rerouting via Cape of Good Hope costs Indian steel buyers \u2014 freight, insurance, transit time, and working capital impact.",
    relatedCalculators: ["freight", "landed-cost"],
    content: `
<p>When shipping companies announce they\u2019re \u201Crerouting via the Cape of Good Hope,\u201D it sounds like a minor logistical adjustment. For Indian steel buyers importing material from the Gulf, Europe, or the Americas, it\u2019s anything but minor. Here\u2019s what it actually costs.</p>

<h2>The Route Comparison</h2>

<p>The normal shipping route from the Persian Gulf to India\u2019s western ports (Mumbai, Kandla, Mundra) passes through the Strait of Hormuz and directly across the Arabian Sea. It\u2019s short, efficient, and well-served by established shipping lines.</p>

<p>The rerouted path goes south from the Gulf of Oman, down the east coast of Africa, around the Cape of Good Hope at the southern tip of South Africa, back up the west coast of Africa, and then east across the Indian Ocean to India\u2019s western ports.</p>

<p>Here are the approximate distance and transit time comparisons for common India trade routes:</p>

<p><strong>Gulf ports (Jebel Ali, Dammam) to Mumbai:</strong> Normal route is about 1,200 nautical miles and 3\u20134 days. Rerouted via Cape it\u2019s about 8,500 nautical miles and 22\u201328 days. The additional distance is roughly 7,300 nm, adding 18\u201324 extra days at sea.</p>

<p><strong>European ports (Rotterdam, Antwerp) to Mumbai:</strong> Normal route via Suez and Hormuz is about 6,200 nm and 18\u201322 days. While these don\u2019t technically transit Hormuz, war risk zones in the wider Gulf region have caused some European shipments to also face delays and premium increases.</p>

<h2>The Direct Freight Cost Impact</h2>

<p>For a standard Supramax bulk carrier (approximately 50,000 DWT) carrying steel products, the additional fuel consumption for the extra 7,300 nm distance is substantial. At current bunker fuel prices (which have themselves risen with the oil price surge), the added fuel cost alone is in the range of $6\u201310 per MT of cargo.</p>

<p>Add charter rate premiums (vessel availability is tighter because ships are spending longer at sea on rerouted voyages), and the total freight surcharge is currently running at approximately $12\u201320 per MT above pre-crisis levels for Gulf-to-India routes.</p>

<p>For container shipments (which carry lighter, higher-value steel products), the surcharges are even steeper. Major container lines including MSC, Maersk, and Hapag-Lloyd have suspended Gulf services entirely, forcing cargo onto alternative carriers at significantly elevated rates.</p>

<h2>The War Risk Insurance Premium</h2>

<p>This is the cost that often gets overlooked. Maritime war risk insurance is a specialised coverage that protects against losses from armed conflict. Before the Hormuz crisis, premiums for Gulf transits were modest. They\u2019ve now surged to 0.3\u20130.5% of hull value per transit for the wider war risk zone.</p>

<p>For cargo insurance specifically, buyers are seeing premiums of 0.2\u20130.4% of cargo value. On a shipment of HRC valued at $500 per MT, that\u2019s $1\u20132 per MT just for the additional insurance premium. It sounds small per tonne, but on a 50,000 MT cargo, that\u2019s $50,000\u2013100,000 in additional insurance cost.</p>

<h2>The Hidden Cost: Working Capital</h2>

<p>This is the biggest cost that most people fail to calculate. When your shipment takes 24 extra days to arrive, that\u2019s 24 additional days where your money is tied up in material that\u2019s floating at sea, earning you nothing.</p>

<p>Let\u2019s model it. You\u2019ve purchased 10,000 MT of HRC at $500/MT FOB \u2014 that\u2019s a $5 million cargo. Your financing cost is 10% per annum (a typical rate for trade finance in India).</p>

<p>Pre-crisis transit: 4 days \u2192 financing cost = $5,000,000 \u00D7 10% \u00D7 4/365 = $5,479</p>
<p>Rerouted transit: 26 days \u2192 financing cost = $5,000,000 \u00D7 10% \u00D7 26/365 = $35,616</p>
<p>Additional financing cost = $30,137, or approximately $3.01 per MT.</p>

<p>At Indian rupee financing rates (12\u201314% for many traders), this number is even higher \u2014 potentially \u20B9350\u2013500 per MT.</p>

<h2>Putting It All Together</h2>

<p>For a typical Gulf-to-India steel import rerouted via the Cape of Good Hope, the total additional cost per MT breaks down approximately as follows:</p>

<ul>
<li><strong>Additional freight:</strong> $12\u201320 per MT</li>
<li><strong>War risk insurance:</strong> $1\u20132 per MT</li>
<li><strong>Additional working capital interest:</strong> $3\u20135 per MT</li>
<li><strong>Miscellaneous charges</strong> (demurrage risk, port congestion, documentation): $1\u20133 per MT</li>
</ul>

<p>The total crisis surcharge comes to roughly <strong>$17\u201330 per MT</strong>, which at current exchange rates is approximately <strong>\u20B91,450\u20132,550 per MT</strong>.</p>

<p>This doesn\u2019t include the opportunity cost of delayed delivery (missed sales, project delays) or the risk of price movements during the extended transit period.</p>

<h2>What This Means for Import vs Domestic Decisions</h2>

<p>Before the crisis, importing HRC from China or Korea could be \u20B91,000\u20132,000 per MT cheaper than domestic purchase from JSW or Tata Steel, after all landed costs. With the crisis surcharge of \u20B91,500\u20132,500 per MT added on top, that import advantage has been largely or entirely wiped out.</p>

<p>For many products and routes, domestic procurement is now the clearly better option \u2014 at least until the crisis resolves and freight normalises.</p>

<p>Use our Landed Cost Calculator to run the comparison for your specific product, origin, and destination. It includes the Cape of Good Hope rerouting option so you can see the exact landed cost difference.</p>
`,
  },
  {
    slug: "coking-coal-iron-ore-routes-open",
    title:
      "Raw Material Routes Still Open for Indian Steel Buyers \u2014 March 2026 Update",
    category: "ANALYSIS",
    categoryColor: "blue",
    date: "2026-03-10",
    readTime: "6 min",
    excerpt:
      "Australia coking coal flows normally. Gulf scrap is halted. LNG from Qatar is at risk. Route-by-route assessment for every key input.",
    metaTitle:
      "Coking Coal, Iron Ore, Scrap Supply Routes Open for India \u2014 Hormuz Crisis Update | SteelMath",
    metaDescription:
      "Which raw material supply routes are still open for Indian steel mills? Coking coal from Australia, iron ore availability, scrap alternatives \u2014 March 2026 update.",
    relatedCalculators: ["freight", "energy-cost"],
    content: `
<p>The Hormuz crisis has disrupted global shipping, but not all routes are equally affected. For Indian steel mills and traders, the critical question is: can we still get the raw materials we need? Here\u2019s a route-by-route assessment as of March 2026.</p>

<h2>Coking Coal \u2014 India\u2019s Most Critical Import</h2>

<p>India imports approximately 55\u201360 million tonnes of coking coal annually, primarily from Australia (which supplies roughly 70\u201375% of India\u2019s imported coking coal), the United States (10\u201312%), Mozambique (8\u201310%), and Canada (5\u20137%).</p>

<p><strong>Australia to India:</strong> This is the lifeline, and it\u2019s operating normally. The shipping route from Queensland and New South Wales coal ports (Hay Point, Dalrymple Bay, Gladstone) to Indian east coast ports (Paradip, Visakhapatnam, Haldia) and west coast ports (Goa, Mumbai) runs entirely through the Indian Ocean, nowhere near the Strait of Hormuz. Freight rates have risen modestly (5\u20138%) due to general market tightness, but supply continuity is not at risk.</p>

<p><strong>United States to India:</strong> US coking coal exports from Hampton Roads and Mobile typically route via the Atlantic Ocean, through the Suez Canal, and across the Indian Ocean to India. While the Suez Canal itself is not affected by the Hormuz closure, the broader Middle East risk zone has caused some vessels to take the longer route around Africa. This adds 7\u201310 days and modest cost increases of $3\u20135 per MT, but supply continues.</p>

<p><strong>Mozambique to India:</strong> Mozambican coking coal (from the Moatize basin, exported via Beira and Nacala ports) routes directly across the Indian Ocean to India. Completely unaffected by the Hormuz crisis. This route may actually become more attractive as a shorter and risk-free alternative for Indian buyers looking to diversify.</p>

<p>The overall assessment for coking coal is cautiously positive. India\u2019s primary supply routes are intact. However, prices have risen by $10\u201315 per MT globally due to heightened demand for non-Gulf energy sources, and freight premiums are creeping up even on unaffected routes as global vessel availability tightens.</p>

<h2>Iron Ore \u2014 Largely Domestic, Minimal Import Dependence</h2>

<p>India is the world\u2019s fourth-largest producer of iron ore and is broadly self-sufficient for steelmaking needs. Domestic production runs at approximately 260\u2013280 million tonnes per year, and the steel industry\u2019s consumption is well within this capacity.</p>

<p>The Hormuz crisis has a limited direct impact on India\u2019s iron ore supply. However, there are two indirect effects worth monitoring.</p>

<p>Iran produces roughly 3% of global iron ore. With Iranian exports disrupted, global seaborne iron ore markets are marginally tighter. This may support slightly higher iron ore prices globally, even though India doesn\u2019t import from Iran.</p>

<p>Additionally, India exports iron ore pellets and fines, primarily to China and Japan. If global steel production shifts (e.g., Chinese mills redirect output to replace lost Gulf supply), iron ore demand patterns could shift, affecting Indian domestic pricing.</p>

<p>For now, iron ore supply is not a concern for Indian steel mills. Prices remain range-bound domestically, with NMDC (India\u2019s largest iron ore producer) maintaining stable pricing through the crisis.</p>

<h2>Steel Scrap \u2014 Mixed Picture</h2>

<p>India\u2019s EAF and induction furnace (IF) sector depends heavily on steel scrap, both domestically sourced and imported. India imports approximately 6\u20138 million tonnes of steel scrap annually.</p>

<p><strong>Middle Eastern scrap (UAE, Saudi Arabia, Bahrain)</strong> is significantly disrupted. The Gulf is a major source of HMS (Heavy Melting Scrap) and shredded scrap for Indian buyers. With Hormuz effectively closed, scrap shipments from Gulf ports have halted. Vessels already loaded are either stranded or being rerouted at substantial additional cost.</p>

<p><strong>European scrap (UK, Turkey, continental Europe)</strong> continues to flow, though route adjustments may be needed if vessels were previously transiting the Suez and wider Middle East zone. Turkish scrap, a significant source for Indian buyers, ships via the Mediterranean and Suez Canal \u2014 currently operational but under elevated risk premiums.</p>

<p><strong>US scrap (east coast)</strong> routes via the Atlantic and either Suez or Cape of Good Hope. Supply continues but at higher freight costs.</p>

<p>The scrap market is where Indian buyers may feel the most acute pressure. Domestic scrap prices have already risen by \u20B91,500\u20132,000 per MT since the crisis began, as competition for available domestic supply has intensified.</p>

<h2>LNG and Natural Gas \u2014 High Concern</h2>

<p>While not a \u201Craw material\u201D for steel in the traditional sense, natural gas is increasingly important for India\u2019s DRI (Direct Reduced Iron) producers, which account for a significant share of India\u2019s total steel production. India imports approximately 53% of its LNG from Gulf producers, primarily Qatar.</p>

<p>Qatar\u2019s LNG facilities were hit by Iranian drone strikes early in the crisis, and force majeure has been declared on gas contracts. This is a serious supply risk for Indian DRI producers who rely on piped natural gas derived from imported LNG.</p>

<p>If LNG supply remains disrupted for more than 2\u20133 weeks, DRI-based steel production in Gujarat and other gas-dependent states could face curtailment, further tightening domestic steel supply and supporting higher prices.</p>

<h2>Practical Recommendations</h2>

<p><strong>For mill operators:</strong> your coking coal supply is secure via Australia and Mozambique, but negotiate now and lock in contracts before global prices rise further. Monitor LNG supply closely if you operate DRI facilities.</p>

<p><strong>For scrap-based producers:</strong> diversify sourcing away from the Gulf immediately. Look at European and US origins, and increase domestic scrap procurement. Expect higher scrap costs for the next 4\u20138 weeks minimum.</p>

<p><strong>For traders:</strong> the scrap price increase is a leading indicator for finished steel prices. If scrap costs remain elevated, EAF and IF producers will maintain upward price pressure on TMT bars and other long products.</p>

<p>We\u2019ll continue updating this assessment as the situation evolves. Use SteelMath\u2019s daily brief to stay informed on route changes and supply developments. Subscribe to our free daily email to get updates delivered to your inbox every morning.</p>
`,
  },
  {
    slug: "buy-steel-now-or-wait-hormuz-2026",
    title: "Should You Buy Steel Now or Wait? A Procurement Decision Framework",
    category: "ANALYSIS",
    categoryColor: "blue",
    date: "2026-03-13",
    readTime: "7 min",
    excerpt:
      "The buy-vs-wait decision framework every steel buyer needs right now. When to lock in, when to hold, and what signals to watch.",
    metaTitle:
      "Should You Buy Steel Now or Wait? Hormuz Crisis Procurement Framework | SteelMath",
    metaDescription:
      "Buy steel now or wait? A data-driven procurement decision framework for the Hormuz crisis. Price forecasts, hedging strategies, and key signals to watch.",
    relatedCalculators: ["margin", "landed-cost"],
    content: `
<p>Every steel buyer in India is asking the same question this week: should I stock up before prices climb further, or hold off hoping the Hormuz crisis resolves and prices soften? There is no universal answer, but there is a framework to think through the decision for your specific situation.</p>

<h2>The Case for Buying Now</h2>

<p>Three forces are compounding on the upside simultaneously, which is rare. Oil is above $92 per barrel and still climbing, directly pushing up production costs at every mill. Freight rates have surged 38% with no near-term resolution visible. And mills have already announced three rounds of hikes totalling \u20B92,000\u20132,500 per MT on flat products, with a fourth round expected by mid-March.</p>

<p>When input costs are rising across the board \u2014 energy, freight, and raw materials all at once \u2014 mills have no room to absorb costs. They pass them through. The question isn\u2019t whether the next hike is coming, but how large it will be.</p>

<p>Additionally, the safeguard duty on flat steel imports (12% through April 2026) means you can\u2019t easily escape to cheaper imports. And with the Hormuz rerouting adding \u20B91,500\u20132,500 per MT to landed import costs, the import alternative has effectively closed for most products.</p>

<p>If you have active projects with committed delivery timelines, locking in material at today\u2019s prices reduces your risk of cost overrun. A \u20B91,000 per MT increase on a 500 MT project is \u20B95 lakh \u2014 that\u2019s real money.</p>

<h2>The Case for Waiting</h2>

<p>No crisis lasts forever. Some analysts expect the Strait of Hormuz to partially reopen within two to three weeks as diplomatic pressure mounts. If oil drops back to $75\u201380, the cost-push pressure on mills evaporates and the pace of hikes stops. In past geopolitical disruptions (Red Sea/Houthi crisis of 2024, Russia-Ukraine shock of 2022), steel prices spiked and then corrected within 2\u20133 months.</p>

<p>There\u2019s also the demand side. Indian steel demand has softened slightly at elevated prices \u2014 construction buyers are showing resistance above \u20B950,000 per MT for TMT. If demand pulls back enough, mills may pause hikes regardless of costs.</p>

<p>If your procurement is for projects 3+ months out, waiting could save you money if the crisis de-escalates. The risk is that it doesn\u2019t.</p>

<h2>The Decision Matrix</h2>

<p><strong>For immediate needs (delivery within 30 days):</strong> Buy now. Prices are almost certainly going higher in the next two weeks. Delaying exposes you to the next mill hike without any upside.</p>

<p><strong>For medium-term needs (30\u201390 days):</strong> Buy 50\u201360% of your requirement now, keep 40\u201350% open. This hedges you against further increases while preserving the option to buy cheaper if prices correct.</p>

<p><strong>For longer-term needs (90+ days):</strong> Wait and watch. At this time horizon, the crisis is likely to have progressed towards resolution. Set a price alert on SteelMath so you\u2019re notified the moment prices move to your target level.</p>

<p><strong>For traders and stockholders:</strong> If you have cash and warehouse space, the risk-reward favours stocking. Every mill hike increases the value of your existing inventory. But size your position carefully \u2014 if the crisis resolves faster than expected, you don\u2019t want to be caught holding expensive inventory in a falling market.</p>

<h2>What We\u2019re Watching</h2>

<p>The three signals that would shift our view from \u201Cbuy now\u201D to \u201Cwait\u201D are: a ceasefire or diplomatic de-escalation in the Iran-US conflict, oil dropping below $80 per barrel, and Indian mills delaying or withdrawing announced hikes. Until at least two of these three occur, the bias is towards buying sooner rather than later.</p>

<p>Use our Margin Calculator to model how each price scenario affects your project profitability. Set up free price alerts on SteelMath to get notified the moment market conditions change.</p>
`,
  },
  {
    slug: "safeguard-duty-steel-imports-india-2026",
    title: "Safeguard Duty on Steel Imports 2025\u20132028: Complete Guide",
    category: "GUIDE",
    categoryColor: "green",
    date: "2026-03-09",
    readTime: "10 min",
    excerpt:
      "12% safeguard duty on flat steel imports \u2014 which products, which countries, price thresholds, and how it affects your landed cost.",
    metaTitle:
      "Safeguard Duty on Steel Imports India 2025\u20132028 \u2014 Complete Guide | SteelMath",
    metaDescription:
      "Complete guide to India\u2019s safeguard duty on flat steel imports. Rates, covered products, exemptions, price thresholds, and landed cost calculation.",
    relatedCalculators: ["landed-cost", "gst"],
    content: `
<p>India\u2019s safeguard duty on flat steel imports is one of the most significant trade policy measures affecting the steel market right now. Whether you\u2019re importing steel, competing against imports, or just trying to understand why domestic prices have a floor, you need to understand how this duty works. Here\u2019s the complete guide.</p>

<h2>What Is the Safeguard Duty?</h2>

<p>A safeguard duty is a temporary import tax allowed under WTO rules when a surge in imports causes or threatens serious injury to a domestic industry. India\u2019s Directorate General of Trade Remedies investigated the surge in steel imports and found that it was indeed hurting Indian producers. The government then imposed the duty to provide temporary relief.</p>

<p>This is different from anti-dumping duty (which targets below-cost pricing from specific countries) or countervailing duty (which targets foreign government subsidies). Safeguard duty is broader \u2014 it applies to imports from all countries, with some exemptions.</p>

<h2>The Current Duty Structure</h2>

<p>The duty was first imposed as a provisional 12% levy for 200 days starting April 21, 2025. In December 2025, the government extended it for three years at tapered rates. The first year running from April 2025 to April 2026 carries a 12% rate. The second year drops to 11.5%, and the third year from April 2027 to April 2028 drops further to 11%.</p>

<h2>Which Products Are Covered?</h2>

<p>The duty applies to flat steel products under HS codes 7208, 7209, 7210, 7211, 7212, 7225 and 7226. In practical terms, this covers hot-rolled coils, sheets and plates, hot-rolled plate mill plates, cold-rolled coils and sheets, galvanised and metallic coated steel products, and colour-coated steel coils and sheets.</p>

<h2>What\u2019s Excluded?</h2>

<p>Several important product categories are exempt: stainless steel, electrical steel (CRGO and CRNO), tinplate, aluminium-coated steel, nickel-plated steel, and clad plates. Long products like TMT bars, rebar, wire rods, angles, channels, and beams are also not covered \u2014 the safeguard duty is specifically for flat products.</p>

<h2>The Price Threshold Exemption</h2>

<p>This is a critical detail many buyers miss. Imports priced at or above certain CIF thresholds are exempt from the duty. For HRC, the threshold is $675 per MT CIF. For CRC, it\u2019s higher. This means that if you\u2019re importing premium-grade HRC at $700 per MT CIF, no safeguard duty applies.</p>

<p>This threshold was designed to ensure that high-value speciality imports \u2014 which don\u2019t compete directly with domestic commodity grades \u2014 aren\u2019t penalised. It also means that when global prices are high (as they are during the Hormuz crisis), the duty becomes less relevant because most imports are already above the threshold.</p>

<h2>Country Exemptions</h2>

<p>Imports from certain developing countries are exempt under WTO rules, but China, Vietnam, and Nepal have been specifically excluded from these exemptions for most product categories. Since China is by far the largest source of steel imports into India, this effectively means the duty applies to the bulk of India\u2019s import volume.</p>

<h2>Impact on Domestic Prices</h2>

<p>The safeguard duty has been highly effective. Steel imports into India dropped by approximately 39% year-on-year in the first half of fiscal year 2025\u201326 after the provisional duty was imposed. This reduction in import competition has provided a floor for domestic prices and supported mill profitability.</p>

<p>For buyers, this means domestic prices will remain at a premium to what they would have been without the duty. The protection effectively adds \u20B93,000\u20135,000 per MT to the cost floor for flat steel in India (depending on the product and prevailing global price).</p>

<h2>How to Calculate Your Import Cost With the Duty</h2>

<p>Use SteelMath\u2019s Landed Cost Calculator to model the full import cost including safeguard duty. The calculation is: CIF Price + Basic Custom Duty (7.5% for most steel) + Safeguard Duty (12%) + Social Welfare Surcharge (10% on customs duty) + IGST (18% on the cumulative value).</p>

<p>The compounding of duties means the effective total import tax on steel flat products is currently 40\u201345% above the CIF price \u2014 making imports uncompetitive for most commodity grades.</p>

<h2>What This Means for Your Business</h2>

<p><strong>If you\u2019re an importer:</strong> the safeguard duty combined with Hormuz freight increases makes most flat steel imports unviable at current prices. Focus on domestic sourcing or wait for the duty to taper.</p>

<p><strong>If you\u2019re a domestic mill or trader:</strong> the duty provides a pricing umbrella for at least the next two years. Use this period to strengthen customer relationships and operational efficiency.</p>

<p><strong>If you\u2019re a buyer of speciality grades not covered by the duty</strong> (stainless, electrical steel, tinplate), your import economics are largely unaffected \u2014 though freight and insurance costs are still elevated due to Hormuz.</p>
`,
  },
  {
    slug: "tmt-bar-weight-per-metre-chart",
    title: "TMT Bar Weight Per Metre \u2014 Quick Reference Chart for All Sizes",
    category: "GUIDE",
    categoryColor: "green",
    date: "2026-03-10",
    readTime: "4 min",
    excerpt:
      "Weight per metre for every TMT bar from 6mm to 40mm. Plus bars per tonne, cost per bar, and how to verify deliveries.",
    metaTitle:
      "TMT Bar Weight Per Metre Chart \u2014 All Sizes Fe 500D | SteelMath",
    metaDescription:
      "Complete TMT bar weight chart \u2014 weight per metre for 6mm to 40mm bars. Bars per tonne, cost per bar at current rates, and delivery verification method.",
    relatedCalculators: ["weight"],
    content: `
<p>This is the reference chart every construction engineer and steel trader in India needs. Below you\u2019ll find the weight per metre for every standard TMT bar diameter, along with the formula to calculate it yourself, bars per tonne, and quick cost estimates at current market rates.</p>

<h2>TMT Bar Weight Chart \u2014 All Standard Sizes</h2>

<p>The universal formula for TMT bar weight is: <strong>Weight (kg per metre) = d\u00B2 \u00F7 162.2</strong>, where d is the diameter in millimetres. This assumes mild steel density of 7,850 kg per cubic metre.</p>

<p>Here are the weights for all standard Indian TMT bar sizes:</p>

<p><strong>6mm TMT</strong> weighs 0.222 kg per metre. In a standard 12-metre bar, that\u2019s 2.664 kg. You get approximately 376 bars per tonne.</p>

<p><strong>8mm TMT</strong> weighs 0.395 kg per metre. A 12-metre bar weighs 4.738 kg. Approximately 211 bars per tonne.</p>

<p><strong>10mm TMT</strong> weighs 0.617 kg per metre. A 12-metre bar weighs 7.400 kg. Approximately 135 bars per tonne.</p>

<p><strong>12mm TMT</strong> weighs 0.889 kg per metre. A 12-metre bar weighs 10.666 kg. Approximately 94 bars per tonne. This is the most commonly used size in residential construction in India.</p>

<p><strong>16mm TMT</strong> weighs 1.580 kg per metre. A 12-metre bar weighs 18.960 kg. Approximately 53 bars per tonne.</p>

<p><strong>20mm TMT</strong> weighs 2.469 kg per metre. A 12-metre bar weighs 29.628 kg. Approximately 34 bars per tonne.</p>

<p><strong>25mm TMT</strong> weighs 3.854 kg per metre. A 12-metre bar weighs 46.248 kg. Approximately 22 bars per tonne.</p>

<p><strong>28mm TMT</strong> weighs 4.834 kg per metre. A 12-metre bar weighs 58.008 kg. Approximately 17 bars per tonne.</p>

<p><strong>32mm TMT</strong> weighs 6.313 kg per metre. A 12-metre bar weighs 75.756 kg. Approximately 13 bars per tonne.</p>

<p><strong>36mm TMT</strong> weighs 7.990 kg per metre. A 12-metre bar weighs 95.880 kg. Approximately 10 bars per tonne.</p>

<p><strong>40mm TMT</strong> weighs 9.865 kg per metre. A 12-metre bar weighs 118.380 kg. Approximately 8 bars per tonne.</p>

<h2>How to Verify a Delivery</h2>

<p>When a truck arrives claiming to carry 10 MT of 12mm TMT, you can quickly verify: 10,000 kg \u00F7 10.666 kg per bar = approximately 938 bars. Count the bundles, check bars per bundle, and cross-check. Any shortfall over 2\u20133% should be flagged with your supplier.</p>

<h2>Current Approximate Cost</h2>

<p>At the current TMT price of approximately \u20B948,500 per MT in Delhi (March 2026), the cost per bar works out to: 12mm \u00D7 12m bar = 10.666 kg = approximately \u20B9517 per bar. For a residential column requiring 8 bars of 12mm \u00D7 3m, the steel cost is approximately \u20B9138.</p>

<p>For exact calculations with your specific dimensions and quantities, use SteelMath\u2019s free <a href="/calculator">Steel Weight Calculator</a>. It handles every section type and lets you build full BOMs with automatic weight and cost computation.</p>
`,
  },
  {
    slug: "cbam-indian-steel-exports-2026",
    title: "CBAM and Indian Steel Exports: What Changes in 2026",
    category: "ANALYSIS",
    categoryColor: "blue",
    date: "2026-03-08",
    readTime: "9 min",
    excerpt:
      "EU\u2019s carbon border tax is now live. What it costs Indian exporters, how to comply, and why Hormuz makes it worse.",
    metaTitle:
      "CBAM Impact on Indian Steel Exports 2026 \u2014 Costs, Compliance & Strategy | SteelMath",
    metaDescription:
      "How the EU\u2019s Carbon Border Adjustment Mechanism affects Indian steel exports in 2026. Cost estimates, compliance requirements, and strategic positioning.",
    relatedCalculators: ["energy-cost", "margin"],
    content: `
<p>The European Union\u2019s Carbon Border Adjustment Mechanism entered its definitive phase on January 1, 2026. For Indian steel exporters, this is no longer a future concern \u2014 it\u2019s an operational reality. Here\u2019s what has changed, what the financial impact looks like, and how to prepare.</p>

<h2>What Is CBAM?</h2>

<p>CBAM is essentially a carbon tax on imports into the EU. It requires importers of certain goods \u2014 including iron and steel \u2014 to purchase carbon certificates corresponding to the embedded carbon emissions in those products. The price of these certificates is linked to the EU Emissions Trading System allowance price, which has been trading in the range of \u20AC65\u201380 per tonne of CO2 in early 2026.</p>

<p>The mechanism is designed to prevent \u201Ccarbon leakage\u201D \u2014 the risk that EU manufacturers lose competitiveness to imports from countries with weaker carbon pricing. Steel is one of the first sectors covered because it\u2019s extremely carbon-intensive and heavily traded.</p>

<h2>The Transition and Definitive Phases</h2>

<p>The transition phase ran from October 2023 through December 2025. During this period, EU importers were required to report embedded emissions but did not need to purchase certificates. It was a reporting-only phase. Starting January 1, 2026, the definitive phase began. EU importers must now start purchasing CBAM certificates, though the financial obligation is being phased in gradually as free EU ETS allowances are phased out.</p>

<h2>What This Means for Indian Steel</h2>

<p>Indian steel production is significantly more carbon-intensive than European production, primarily because India relies heavily on the blast furnace route (BF-BOF) using coal-based energy. The average carbon intensity of Indian steel production is estimated at 2.0\u20132.5 tonnes of CO2 per tonne of crude steel, compared to approximately 1.4\u20131.8 tonnes for EU producers.</p>

<p>Industry studies estimate that the CBAM cost for Indian steel exports to the EU could range from $240 to $500 per tonne by the early 2030s when full financial obligations kick in, depending on the EU ETS price and India\u2019s emission reduction progress. In the near term (2026\u20132028), the financial impact is smaller because of the gradual phase-in, but reporting compliance is already mandatory.</p>

<p>India exported approximately 4\u20135 million tonnes of steel to Europe in recent years. While this is a modest share of India\u2019s total production (around 150 million tonnes per year), the EU is a premium market with higher realisations. Losing competitiveness in this market hurts disproportionately.</p>

<h2>Hormuz + CBAM: The Double Pressure</h2>

<p>The timing is difficult. Indian steel exporters are simultaneously facing higher production costs from the Hormuz-driven energy surge, higher freight costs for shipments to Europe (many routed via the Suez Canal, now facing elevated war risk premiums), and the start of CBAM financial obligations.</p>

<p>This triple squeeze makes European exports significantly less profitable in Q1 2026 than they were a year ago. Some exporters may redirect volumes to non-CBAM markets in Southeast Asia, the Middle East (post-crisis), and Africa.</p>

<h2>How to Prepare</h2>

<p><strong>For immediate compliance,</strong> exporters need to ensure their EU importers have the data required for CBAM reporting: specific embedded emissions per tonne, production route (BF-BOF vs EAF), energy sources, and any carbon pricing already paid in India.</p>

<p><strong>For medium-term positioning,</strong> Indian mills investing in green steel technologies \u2014 DRI with natural gas, green hydrogen pathways, renewable energy for EAF operations \u2014 will have a structural cost advantage under CBAM compared to those that don\u2019t.</p>

<p><strong>For strategic planning,</strong> monitor how India\u2019s domestic carbon pricing evolves. If India implements a credible carbon pricing mechanism, Indian exporters can deduct those payments from CBAM obligations \u2014 potentially reducing the financial impact significantly.</p>

<p>SteelMath\u2019s Energy \u2192 Production Cost Calculator now includes an option to model CBAM impact on export realisations. Try it with your production parameters.</p>
`,
  },
  {
    slug: "ms-pipe-weight-calculator-chart",
    title: "MS Pipe Weight Calculator \u2014 Formula, Chart & All Sizes",
    category: "GUIDE",
    categoryColor: "green",
    date: "2026-03-09",
    readTime: "6 min",
    excerpt:
      "Pipe weight formula with complete IS 1239 reference chart. 15mm NB to 200mm NB, light/medium/heavy class.",
    metaTitle:
      "MS Pipe Weight Calculator \u2014 Formula, Chart & Quick Reference | SteelMath",
    metaDescription:
      "MS pipe weight formula and complete chart for all sizes from 15mm NB to 200mm NB. IS 1239 reference, light/medium/heavy class weights.",
    relatedCalculators: ["weight"],
    content: `
<p>MS (Mild Steel) pipe weight is one of the most frequently calculated values in the steel industry. Whether you\u2019re placing a purchase order, checking a delivery, or estimating project materials, you need this number daily. Here\u2019s the formula, a complete reference chart, and access to our free calculator.</p>

<h2>The Formula</h2>

<p><strong>MS Pipe Weight per metre (kg/m) = (OD \u2212 Wall Thickness) \u00D7 Wall Thickness \u00D7 0.02466</strong></p>

<p>Where OD is the outer diameter in millimetres and Wall Thickness is also in millimetres. The constant 0.02466 derives from \u03C0 \u00D7 steel density (7,850) \u00F7 1,000,000.</p>

<p>For those who prefer the alternative form: <strong>Weight (kg/m) = (OD\u00B2 \u2212 ID\u00B2) \u00D7 0.00617</strong>, where ID is the inner diameter.</p>

<h2>Common MS Pipe Weights \u2014 Quick Reference</h2>

<p>Here are the weights for the most commonly traded MS pipes in India, following IS 1239 (ERW) and IS 3589 (SAW) standards:</p>

<p><strong>15mm NB (\u00BD inch)</strong>, OD 21.3mm, thickness 2.6mm: weight 1.21 kg/m.</p>
<p><strong>20mm NB (\u00BE inch)</strong>, OD 26.9mm, thickness 2.6mm: weight 1.56 kg/m.</p>
<p><strong>25mm NB (1 inch)</strong>, OD 33.7mm, thickness 3.2mm: weight 2.41 kg/m.</p>
<p><strong>32mm NB (1\u00BC inch)</strong>, OD 42.4mm, thickness 3.2mm: weight 3.10 kg/m.</p>
<p><strong>40mm NB (1\u00BD inch)</strong>, OD 48.3mm, thickness 3.2mm: weight 3.56 kg/m.</p>
<p><strong>50mm NB (2 inch)</strong>, OD 60.3mm, thickness 3.6mm: weight 5.03 kg/m.</p>
<p><strong>65mm NB (2\u00BD inch)</strong>, OD 76.1mm, thickness 3.6mm: weight 6.42 kg/m.</p>
<p><strong>80mm NB (3 inch)</strong>, OD 88.9mm, thickness 4.0mm: weight 8.38 kg/m.</p>
<p><strong>100mm NB (4 inch)</strong>, OD 114.3mm, thickness 4.5mm: weight 12.18 kg/m.</p>
<p><strong>150mm NB (6 inch)</strong>, OD 168.3mm, thickness 5.0mm: weight 20.11 kg/m.</p>
<p><strong>200mm NB (8 inch)</strong>, OD 219.1mm, thickness 6.3mm: weight 33.05 kg/m.</p>

<p>These are medium (Class B) weights per IS standards. Light (Class A) pipes have thinner walls and weigh less. Heavy (Class C) pipes have thicker walls and weigh more.</p>

<h2>Practical Tips</h2>

<p>When ordering pipes, always specify whether you need light, medium, or heavy class \u2014 the weight difference can be 15\u201325%. A \u201C2-inch pipe\u201D without class specification is ambiguous and can lead to disputes.</p>

<p>For seamless pipes (IS 2062), weights may differ slightly from ERW pipes of the same dimensions due to manufacturing tolerances. Always confirm the pipe standard and wall thickness with your supplier.</p>

<p>Standard pipe lengths in India are 6 metres. When calculating total weight for a PO, multiply weight per metre by 6 to get per-piece weight, then by the number of pieces.</p>

<p>Use SteelMath\u2019s <a href="/calculator">Steel Weight Calculator</a> for instant pipe weight calculations. Select \u201CPipe\u201D from the section types, enter OD and wall thickness, and get your answer with one tap. No formula memorisation required.</p>
`,
  },
  {
    slug: "steel-production-cost-india-bf-bof-eaf-2026",
    title: "India\u2019s Steel Production Cost Breakdown 2026 \u2014 BF-BOF vs EAF",
    category: "ANALYSIS",
    categoryColor: "blue",
    date: "2026-03-11",
    readTime: "8 min",
    excerpt:
      "Full cost breakdown at current input prices. Where your \u20B952,000/MT HRC price comes from \u2014 and why mills are hiking.",
    metaTitle:
      "Steel Production Cost India 2026 \u2014 BF-BOF vs EAF Breakdown | SteelMath",
    metaDescription:
      "Complete steel production cost breakdown for India in 2026. BF-BOF vs EAF/IF route, current input prices, and Hormuz crisis impact on manufacturing costs.",
    relatedCalculators: ["energy-cost"],
    content: `
<p>Understanding steel production costs is essential whether you\u2019re a mill operator optimising margins, a trader anticipating price floors, or a buyer trying to negotiate fair pricing. Here\u2019s how the cost structure looks in India right now \u2014 with the Hormuz crisis adding significant energy and raw material premiums.</p>

<h2>BF-BOF Route (Integrated Mills)</h2>

<p>The Blast Furnace \u2014 Basic Oxygen Furnace route is used by India\u2019s largest producers including Tata Steel, JSW Steel, SAIL, and AMNS India. This route starts with iron ore and coking coal, produces pig iron in the blast furnace, and converts it to steel in the BOF.</p>

<p>At current March 2026 input prices, the approximate cost structure for producing one tonne of HRC via BF-BOF in India is as follows.</p>

<p><strong>Iron ore</strong> accounts for approximately \u20B95,500\u20136,500 per MT. India\u2019s domestic iron ore prices from NMDC have been relatively stable through the Hormuz crisis. Integrated mills with captive mines have an even lower cost here.</p>

<p><strong>Coking coal</strong> is the single largest cost item, running at \u20B912,000\u201314,000 per MT of steel (accounting for approximately 0.6\u20130.7 tonnes of coking coal needed per tonne of steel, at current imported coking coal prices of $220\u2013240 per tonne). This has risen by roughly \u20B91,000\u20131,500 per MT since the crisis began, driven by freight increases on coal shipments and general market tightening.</p>

<p><strong>Energy costs</strong> (including power, steam, and process gas) account for \u20B93,500\u20135,000 per MT. This is where the oil price surge hits directly. With oil above $90, energy costs are up roughly \u20B9800\u20131,200 per MT compared to pre-crisis levels.</p>

<p><strong>Consumables, refractories, and ferro alloys</strong> add \u20B92,500\u20133,500 per MT.</p>

<p><strong>Labour and overhead costs</strong> contribute approximately \u20B92,500\u20133,500 per MT, depending on the mill\u2019s efficiency and age.</p>

<p><strong>Rolling and finishing costs</strong> add another \u20B91,500\u20132,500 per MT to convert crude steel into HRC.</p>

<p>The <strong>total HRC production cost via BF-BOF</strong> at current input prices is approximately <strong>\u20B938,000\u201342,000 per MT</strong>. With HRC selling at \u20B952,000\u201354,000 in the domestic market, operating margins are healthy at roughly \u20B910,000\u201314,000 per MT, though they\u2019ve compressed from pre-crisis levels due to input cost inflation.</p>

<h2>EAF / IF Route (Secondary Producers)</h2>

<p>The Electric Arc Furnace and Induction Furnace route is used by hundreds of smaller producers across India, particularly for long products like TMT bar, rebar, and structural sections. This route melts steel scrap or sponge iron (DRI) using electricity.</p>

<p>The current cost structure for producing TMT bar via EAF/IF is significantly different from the integrated route.</p>

<p><strong>Scrap or sponge iron</strong> is the primary raw material, currently running at \u20B932,000\u201335,000 per MT for HMS scrap and \u20B928,000\u201332,000 per MT for sponge iron. The Hormuz crisis has pushed up scrap prices by approximately \u20B91,500\u20132,000 per MT, mainly because Gulf-origin scrap shipments are disrupted.</p>

<p><strong>Electricity</strong> is the critical cost differentiator, at approximately \u20B95,000\u20138,000 per MT depending on the state and power source. States like Chhattisgarh and Odisha have lower power costs, while Maharashtra and Tamil Nadu are more expensive. The oil price surge indirectly pushes up power costs where generation relies on fossil fuels.</p>

<p><strong>Ferro alloys, refractories, and consumables</strong> add \u20B92,000\u20133,000 per MT.</p>

<p><strong>Rolling and finishing costs</strong> add \u20B91,500\u20132,000 per MT.</p>

<p><strong>Total TMT production cost via EAF/IF</strong> at current prices is approximately <strong>\u20B940,000\u201344,000 per MT</strong>. With TMT selling at \u20B948,000\u201350,000, margins for secondary producers are tighter at \u20B94,000\u20138,000 per MT, explaining why IF mills are the first to face pressure during cost surges.</p>

<h2>The Hormuz Effect on Both Routes</h2>

<p>The crisis has added approximately \u20B91,800\u20132,500 per MT to BF-BOF costs (mainly through coking coal and energy) and \u20B92,000\u20133,000 per MT to EAF/IF costs (mainly through scrap and electricity). This explains why mills have been hiking aggressively \u2014 they\u2019re not profiteering, they\u2019re passing through real cost increases.</p>

<p>Try our Energy \u2192 Production Cost Calculator to model these numbers with your own specific input prices.</p>
`,
  },
  {
    slug: "steel-plate-weight-calculator-thickness-chart",
    title: "Steel Plate Weight Calculator \u2014 Formula & Thickness Chart",
    category: "GUIDE",
    categoryColor: "green",
    date: "2026-03-10",
    readTime: "5 min",
    excerpt:
      "Weight per sqm for every plate thickness from 1mm to 50mm. Standard sizes, chequered plate adjustment, and cost estimation.",
    metaTitle:
      "Steel Plate Weight Calculator \u2014 Formula & Thickness Chart | SteelMath",
    metaDescription:
      "Steel plate weight formula and chart by thickness. Weight per square metre from 1mm to 50mm, standard Indian plate sizes, and chequered plate adjustment.",
    relatedCalculators: ["weight"],
    content: `
<p>Steel plate weight is straightforward to calculate but easy to get wrong if you don\u2019t account for all dimensions correctly. This guide gives you the formula, a quick-reference chart by thickness, and a method for estimating the cost of your plate requirements.</p>

<h2>The Formula</h2>

<p><strong>Steel Plate Weight (kg) = Length (mm) \u00D7 Width (mm) \u00D7 Thickness (mm) \u00D7 7.85 \u00F7 1,000,000</strong></p>

<p>Where 7.85 is the density of mild steel in g/cm\u00B3 (equivalent to 7,850 kg/m\u00B3).</p>

<p>An even simpler version for quick mental maths: <strong>Weight per square metre (kg/m\u00B2) = Thickness (mm) \u00D7 7.85</strong>.</p>

<p>So a 10mm plate weighs 78.5 kg per square metre. A 12mm plate weighs 94.2 kg per square metre. This is the number you should memorise for everyday use.</p>

<h2>Weight Per Square Metre for Common Thicknesses</h2>

<p><strong>1mm plate:</strong> 7.85 kg/m\u00B2. <strong>2mm:</strong> 15.70 kg/m\u00B2. <strong>3mm:</strong> 23.55 kg/m\u00B2. <strong>4mm:</strong> 31.40 kg/m\u00B2. <strong>5mm:</strong> 39.25 kg/m\u00B2. <strong>6mm:</strong> 47.10 kg/m\u00B2. <strong>8mm:</strong> 62.80 kg/m\u00B2. <strong>10mm:</strong> 78.50 kg/m\u00B2. <strong>12mm:</strong> 94.20 kg/m\u00B2. <strong>16mm:</strong> 125.60 kg/m\u00B2. <strong>20mm:</strong> 157.00 kg/m\u00B2. <strong>25mm:</strong> 196.25 kg/m\u00B2. <strong>32mm:</strong> 251.20 kg/m\u00B2. <strong>40mm:</strong> 314.00 kg/m\u00B2. <strong>50mm:</strong> 392.50 kg/m\u00B2.</p>

<h2>Standard Plate Sizes in India</h2>

<p>Indian steel mills typically produce plates in the following standard sizes: 1250mm \u00D7 2500mm, 1500mm \u00D7 3000mm, 1500mm \u00D7 6000mm, 2000mm \u00D7 6000mm, and 2500mm \u00D7 6000mm. Plates can be sheared or flame-cut to custom sizes, but standard sizes are more economical.</p>

<p>For a standard 1500mm \u00D7 6000mm \u00D7 10mm plate: Weight = 1500 \u00D7 6000 \u00D7 10 \u00D7 7.85 \u00F7 1,000,000 = <strong>706.5 kg</strong>.</p>

<p>For chequered (checkered) plates, add approximately 5% to the weight to account for the raised pattern.</p>

<p>Use SteelMath\u2019s <a href="/calculator">calculator</a> for instant results with any custom dimensions.</p>
`,
  },
  {
    slug: "how-to-read-mill-price-circular-steel-india",
    title: "How to Read a Mill Price Circular \u2014 Guide for Steel Buyers",
    category: "GUIDE",
    categoryColor: "green",
    date: "2026-03-12",
    readTime: "6 min",
    excerpt:
      "Base price vs transaction price, grade extras, size extras, effective dates \u2014 decode the circular like a pro.",
    metaTitle:
      "How to Read a Steel Mill Price Circular India \u2014 Buyer\u2019s Guide | SteelMath",
    metaDescription:
      "Guide to reading Indian steel mill price circulars. Base price vs transaction price, grade extras, size extras, effective dates, and negotiation tips.",
    relatedCalculators: ["margin", "landed-cost"],
    content: `
<p>When JSW announces a \u201C\u20B9750 per MT price hike on HRC,\u201D what does that actually mean for the price you pay? Mill price circulars are the foundation of steel pricing in India, but they\u2019re full of jargon that confuses even experienced buyers. Here\u2019s how to decode them.</p>

<h2>Base Price vs Transaction Price</h2>

<p>The number in a mill circular is the <strong>base price</strong> \u2014 the starting point before any additions or deductions. Your actual transaction price is always higher because of extras that get added on top.</p>

<p>A typical mill pricing structure works like this: Base Price (the circular number) + Grade Extra (premium for higher grades like E350 over E250) + Size Extra (premium for non-standard dimensions) + Surface Extra (for specific finish requirements) + Quantity Premium or Discount (based on order size) + Payment Terms Adjustment (premium for credit, discount for advance) = <strong>Net Mill Price</strong> + GST at 18% + Freight (if delivered) = <strong>Your Landed Price</strong>.</p>

<p>The gap between the base price in the circular and your actual landed price can easily be \u20B92,000\u20134,000 per MT. When someone quotes \u201CHRC at \u20B952,800\u201D they might be referring to the base price, the all-inclusive mill price, or the market trading price \u2014 which are all different numbers.</p>

<h2>Understanding \u201CEffective Date\u201D</h2>

<p>Mill circulars specify an effective date \u2014 the date from which the new price applies. This matters enormously for orders already in the pipeline. If you placed an order last week with delivery scheduled for this week, does the new price apply? Typically, the pricing is based on the date of booking (order placement), not the date of dispatch or delivery. But this varies by mill and by your specific contract terms. Always confirm with your sales contact.</p>

<h2>\u201CList Price\u201D vs \u201CMarket Price\u201D</h2>

<p>The mill\u2019s list price is the official circular price. The market price (or \u201Ctrading price\u201D) is what dealers and distributors actually transact at. In a strong market (like now, during the Hormuz crisis), market prices often run \u20B9500\u20131,500 above the mill list price because of scarcity premiums. In a weak market, distributors may sell below mill price to clear inventory, absorbing a loss.</p>

<p>This is why SteelMath tracks market prices (what you actually pay), not just mill circular prices (the official starting point).</p>

<h2>The \u201CWith Immediate Effect\u201D Signal</h2>

<p>When a circular says \u201Ceffective immediately\u201D rather than giving a future date, it signals urgency. It usually means the mill expects further cost increases and doesn\u2019t want to honour the old price for even one more day. During the Hormuz crisis, most hikes have been \u201Cwith immediate effect\u201D \u2014 a sign of how quickly costs are moving.</p>

<h2>How to Use This Knowledge</h2>

<p><strong>Negotiate the extras.</strong> The base price is usually non-negotiable, but grade extras, size extras, and payment term adjustments often have flexibility. Knowing the structure gives you leverage.</p>

<p><strong>Time your orders around circular dates.</strong> If market intelligence suggests a hike is imminent (follow SteelMath\u2019s daily alerts), place your order before the effective date. Even 24 hours of advance warning can save you \u20B9500\u20131,000 per MT.</p>
`,
  },
  {
    slug: "gst-steel-products-india-rates-itc",
    title: "GST on Steel Products in India \u2014 Rates, ITC & How to Calculate",
    category: "GUIDE",
    categoryColor: "green",
    date: "2026-03-08",
    readTime: "7 min",
    excerpt:
      "18% GST on most steel, but ITC rules, e-way bills, reverse charge, and job work GST trip up even experienced traders.",
    metaTitle:
      "GST on Steel Products India \u2014 Rates, ITC Rules & Calculator | SteelMath",
    metaDescription:
      "Complete guide to GST on steel products in India. Rates by HSN code, input tax credit rules, e-way bill requirements, reverse charge, and job work GST.",
    relatedCalculators: ["gst"],
    content: `
<p>GST is applied at 18% on most steel products in India. But the devil is in the details \u2014 different products, different HSN codes, different ITC rules. Here\u2019s everything a steel professional needs to know.</p>

<h2>GST Rates on Steel Products</h2>

<p>The standard GST rate for most finished steel products is <strong>18%</strong>. This applies to TMT bars and rebar (HSN 7213/7214/7215), HRC and HR sheets (HSN 7208), CRC and CR sheets (HSN 7209), GP and GI coils (HSN 7210), colour-coated coils (HSN 7210), steel plates (HSN 7208), MS pipes (HSN 7306), structural steel sections such as angles, channels and beams (HSN 7216), and stainless steel products (HSN 7218\u20137222).</p>

<p>The 18% rate applies uniformly across CGST (9%) + SGST (9%) for intra-state transactions, or IGST (18%) for inter-state transactions.</p>

<h2>Lower Rate Items</h2>

<p>Iron and steel scrap attracts 18% GST (HSN 7204). Sponge iron (DRI) also falls under 18% (HSN 7203). Iron ore (HSN 2601) is taxed at 5%. Coal and coke attract 5% GST. Ferro alloys carry 18% GST.</p>

<h2>Input Tax Credit for Steel Businesses</h2>

<p>ITC is the mechanism that prevents tax cascading. If you buy steel at 18% GST and sell a finished product also at 18% GST, you claim credit for the GST paid on inputs and only remit the net difference.</p>

<p><strong>For steel traders,</strong> this is straightforward: GST collected on sales minus GST paid on purchases equals net GST liability.</p>

<p><strong>For manufacturers and fabricators,</strong> ITC is available on all inputs used in production \u2014 steel raw material, consumables, job work charges, capital goods, and even certain services like transportation and warehousing.</p>

<p>The key rule: ITC can only be claimed if the supplier has actually filed their GST return and the tax is reflected in your GSTR-2B. With the e-invoicing mandate, this reconciliation has become more automated, but mismatches still occur regularly.</p>

<h2>Common GST Issues in Steel Trading</h2>

<p><strong>E-way bills</strong> are mandatory for movement of goods exceeding \u20B950,000 in value. For steel \u2014 which is almost always above this threshold \u2014 every shipment needs an e-way bill. Failure to generate one can result in goods being detained and penalties imposed.</p>

<p><strong>Reverse charge mechanism</strong> applies when purchasing from unregistered dealers. If you buy scrap from an unregistered dealer, you must pay GST under reverse charge and can claim ITC on it.</p>

<p><strong>Job work</strong> (fabrication done by a third party) is taxed at 12% GST if it involves manufacturing, or 18% for other services. The steel sent for job work can be moved without payment of GST under intimation to the department.</p>

<p>Use SteelMath\u2019s GST Calculator to compute GST-inclusive prices, ITC available, and effective cost for any steel transaction.</p>
`,
  },
  {
    slug: "steel-angle-weight-chart-sizes-formula",
    title: "Steel Angle Weight Chart \u2014 All Sizes With Formula",
    category: "GUIDE",
    categoryColor: "green",
    date: "2026-03-09",
    readTime: "5 min",
    excerpt:
      "Complete equal and unequal angle weight chart per IS 808. From 25\u00D725\u00D73mm to 200\u00D7200\u00D716mm, all in one place.",
    metaTitle:
      "Steel Angle Weight Chart \u2014 All Sizes & Formula (IS 808) | SteelMath",
    metaDescription:
      "Complete steel angle weight chart for equal and unequal angles per IS 808. Formula, all standard Indian sizes from 25mm to 200mm, weight per metre.",
    relatedCalculators: ["weight"],
    content: `
<p>Steel angles (also called L-angles or angle iron) are one of the most commonly used structural sections in fabrication, construction, and general engineering. Here\u2019s the weight formula and a complete reference chart for all standard Indian sizes.</p>

<h2>The Formula</h2>

<p><strong>Angle Weight (kg per metre) = (Leg A + Leg B \u2212 Thickness) \u00D7 Thickness \u00D7 0.00785</strong></p>

<p>Where Leg A and Leg B are the leg lengths in mm, and Thickness is in mm. For equal angles, Leg A = Leg B.</p>

<h2>Equal Angle Weight Chart (IS 808)</h2>

<p><strong>25 \u00D7 25 \u00D7 3mm:</strong> 1.11 kg/m. <strong>25 \u00D7 25 \u00D7 5mm:</strong> 1.77 kg/m.</p>
<p><strong>30 \u00D7 30 \u00D7 3mm:</strong> 1.36 kg/m. <strong>30 \u00D7 30 \u00D7 5mm:</strong> 2.18 kg/m.</p>
<p><strong>35 \u00D7 35 \u00D7 3mm:</strong> 1.59 kg/m. <strong>35 \u00D7 35 \u00D7 5mm:</strong> 2.54 kg/m.</p>
<p><strong>40 \u00D7 40 \u00D7 3mm:</strong> 1.83 kg/m. <strong>40 \u00D7 40 \u00D7 5mm:</strong> 2.97 kg/m. <strong>40 \u00D7 40 \u00D7 6mm:</strong> 3.50 kg/m.</p>
<p><strong>45 \u00D7 45 \u00D7 5mm:</strong> 3.38 kg/m. <strong>45 \u00D7 45 \u00D7 6mm:</strong> 3.99 kg/m.</p>
<p><strong>50 \u00D7 50 \u00D7 5mm:</strong> 3.77 kg/m. <strong>50 \u00D7 50 \u00D7 6mm:</strong> 4.47 kg/m.</p>
<p><strong>55 \u00D7 55 \u00D7 5mm:</strong> 4.16 kg/m. <strong>55 \u00D7 55 \u00D7 6mm:</strong> 4.93 kg/m.</p>
<p><strong>60 \u00D7 60 \u00D7 5mm:</strong> 4.56 kg/m. <strong>60 \u00D7 60 \u00D7 6mm:</strong> 5.40 kg/m.</p>
<p><strong>65 \u00D7 65 \u00D7 5mm:</strong> 4.94 kg/m. <strong>65 \u00D7 65 \u00D7 6mm:</strong> 5.87 kg/m.</p>
<p><strong>75 \u00D7 75 \u00D7 6mm:</strong> 6.81 kg/m. <strong>75 \u00D7 75 \u00D7 8mm:</strong> 8.92 kg/m.</p>
<p><strong>80 \u00D7 80 \u00D7 6mm:</strong> 7.26 kg/m. <strong>80 \u00D7 80 \u00D7 8mm:</strong> 9.53 kg/m.</p>
<p><strong>90 \u00D7 90 \u00D7 6mm:</strong> 8.19 kg/m. <strong>90 \u00D7 90 \u00D7 8mm:</strong> 10.75 kg/m.</p>
<p><strong>100 \u00D7 100 \u00D7 6mm:</strong> 9.12 kg/m. <strong>100 \u00D7 100 \u00D7 8mm:</strong> 11.98 kg/m. <strong>100 \u00D7 100 \u00D7 10mm:</strong> 14.73 kg/m.</p>
<p><strong>110 \u00D7 110 \u00D7 8mm:</strong> 13.19 kg/m. <strong>110 \u00D7 110 \u00D7 10mm:</strong> 16.26 kg/m.</p>
<p><strong>130 \u00D7 130 \u00D7 10mm:</strong> 19.39 kg/m. <strong>130 \u00D7 130 \u00D7 12mm:</strong> 22.98 kg/m.</p>
<p><strong>150 \u00D7 150 \u00D7 10mm:</strong> 22.48 kg/m. <strong>150 \u00D7 150 \u00D7 12mm:</strong> 26.72 kg/m.</p>
<p><strong>200 \u00D7 200 \u00D7 12mm:</strong> 35.89 kg/m. <strong>200 \u00D7 200 \u00D7 16mm:</strong> 47.10 kg/m.</p>

<h2>Unequal Angles</h2>

<p>Common unequal angle sizes in India:</p>
<p><strong>75 \u00D7 50 \u00D7 6mm:</strong> 5.65 kg/m. <strong>100 \u00D7 65 \u00D7 8mm:</strong> 10.14 kg/m. <strong>100 \u00D7 75 \u00D7 8mm:</strong> 10.61 kg/m. <strong>125 \u00D7 75 \u00D7 8mm:</strong> 11.82 kg/m. <strong>150 \u00D7 75 \u00D7 10mm:</strong> 16.95 kg/m. <strong>150 \u00D7 115 \u00D7 10mm:</strong> 20.02 kg/m.</p>

<p>Standard length for angles in India is 6 metres, 9 metres, or 12 metres depending on the supplier and mill. For the full calculation with any custom dimensions, use SteelMath\u2019s <a href="/calculator">Weight Calculator</a>.</p>
`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
