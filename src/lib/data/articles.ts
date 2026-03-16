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
      "Hormuz Strait Closure: Full Impact Assessment on India\u2019s Steel Industry \u2014 Costs, Supply Chains & Downstream Risk",
    category: "CRISIS",
    categoryColor: "red",
    date: "2026-03-14",
    readTime: "12 min",
    excerpt:
      "Oil at $92, freight up 38%, propane supply under threat, coated steel lines at risk. A comprehensive breakdown of every cost channel the Hormuz crisis is hitting \u2014 from blast furnace energy bills to galvanizing plant shutdowns.",
    metaTitle:
      "Hormuz Crisis Full Impact on Indian Steel 2026 \u2014 Costs, Freight, Propane, Coated Steel | SteelMath",
    metaDescription:
      "Comprehensive analysis of how the Strait of Hormuz closure impacts Indian steel: crude oil, freight, propane supply, coated steel production, raw materials, and actionable strategy for every stakeholder. March 2026.",
    relatedCalculators: ["freight", "energy-cost", "landed-cost"],
    content: `
<p>The Strait of Hormuz \u2014 the 33-km-wide chokepoint between Iran and Oman through which roughly 20% of global oil and a significant share of LPG and propane transit daily \u2014 has been effectively closed since February 28, 2026. Two weeks in, the disruption has moved well beyond oil prices. It is now reaching into energy supply chains, industrial gas availability, and downstream steel processing in ways that most initial assessments failed to anticipate.</p>

<p>This analysis covers every major cost channel: crude oil, ocean freight, raw material routing, industrial gas supply, and the emerging threat to India\u2019s coated and value-added steel segment.</p>

<h2>Crude Oil: The First-Order Shock</h2>

<p>Brent crude has moved from approximately $70 per barrel in late February to over $92 as of March 14 \u2014 a 31.4% increase in under three weeks. This is the steepest sustained oil rally since the Russia-Ukraine war spike of 2022.</p>

<p>For the Indian steel industry, the oil-to-cost transmission works through multiple parallel channels:</p>

<p><strong>Direct energy consumption:</strong> A typical BF-BOF integrated mill in India consumes 5.5\u20136.5 Gcal of energy per tonne of crude steel. At current prices, we estimate this adds \u20B91,200\u20131,800 per MT to production costs versus pre-crisis levels. EAF and induction furnace (IF) producers, more dependent on electricity, see a somewhat lower but still material \u20B9800\u20131,200 per MT increase.</p>

<p><strong>Electricity tariffs:</strong> States where power generation depends heavily on fossil fuels \u2014 Maharashtra, Tamil Nadu, Gujarat \u2014 are likely to see industrial tariff adjustments within 30\u201360 days if crude stays above $85. Some open-access consumers are already paying 8\u201312% more on power exchanges.</p>

<p><strong>Inland logistics:</strong> Diesel prices directly affect the \u20B9300\u2013500 per MT cost of transporting finished steel from mills to distribution hubs. With diesel up roughly \u20B94\u20135 per litre since February, road freight quotes from Jamshedpur to Delhi have risen approximately 6%.</p>

<p><strong>Petrochemical inputs:</strong> Lubricants, coolants, and coating materials used across steel processing are all petroleum-derived. These costs are slower to move but will compound over the next 30\u201345 days.</p>

<h2>Ocean Freight: Beyond the Headline 38%</h2>

<p>The widely reported 38% spike in freight rates from the Persian Gulf to western India understates the actual cost to importers. Here\u2019s the full picture:</p>

<p><strong>Route economics:</strong> Jebel Ali (UAE) to Mumbai via the Strait of Hormuz is approximately 1,200 nautical miles \u2014 a 3\u20134 day voyage. Rerouting via the Cape of Good Hope extends this to roughly 8,500 nautical miles and 20\u201325 days. That is a 7x increase in sailing distance.</p>

<p><strong>Direct freight cost:</strong> For a 50,000 MT Supramax bulk carrier, the additional fuel consumption and charter days add $8\u201315 per MT, depending on current charter rates and bunker prices (which themselves are elevated due to crude oil).</p>

<p><strong>War risk insurance:</strong> Premiums for vessels transiting anywhere near the Gulf of Oman have jumped from near-zero to 0.3\u20130.5% of cargo value. On a $500/MT steel cargo, that\u2019s $1.50\u2013$2.50 per MT.</p>

<p><strong>Working capital cost:</strong> The often-overlooked financial cost of material sitting at sea for 17\u201321 extra days. At India\u2019s typical trade finance rate of 10\u201312% per annum, 20 additional days on a $500/MT cargo costs approximately $2.75\u20133.30 per MT in interest alone.</p>

<p><strong>Container availability:</strong> The longer voyages are tying up vessel capacity, creating a secondary squeeze on container availability. Container repositioning costs from Indian ports have risen 15\u201320% since late February.</p>

<p>When you sum direct freight, insurance, financing, and container surcharges, the all-in additional landed cost for Gulf-origin imports is closer to $15\u201325 per MT \u2014 or approximately \u20B91,300\u20132,100 at current exchange rates.</p>

<h2>Industrial Gas Supply: The Underestimated Crisis</h2>

<p>This is the dimension most market commentary has missed entirely. The Hormuz closure does not only disrupt crude oil \u2014 it disrupts the flow of <strong>liquefied petroleum gas (LPG) and propane</strong>, industrial gases that are critical to downstream steel processing.</p>

<p>Approximately 30\u201335% of India\u2019s LPG imports and a significant share of industrial-grade propane originate from West Asian suppliers, primarily Qatar, Saudi Arabia, and the UAE. These cargoes transit the Strait of Hormuz. With the strait closed, three problems have emerged simultaneously:</p>

<p><strong>1. Delayed and diverted cargoes:</strong> Propane and LPG tankers that would normally reach Indian ports in 4\u20136 days from Gulf terminals are now either stuck, rerouted via the Cape (adding 18\u201322 days), or not sailing at all due to insurance constraints. This has created an estimated 2\u20133 week supply gap for industrial-grade propane at Indian ports.</p>

<p><strong>2. Global price spike:</strong> Saudi Aramco\u2019s Contract Price (CP) for propane \u2014 the benchmark for Asian markets \u2014 has risen sharply. Spot propane in the Far East has moved from approximately $580/MT in February to over $680/MT, a 17% jump. Indian industrial buyers, who typically purchase on spot or short-term contracts, are bearing the full impact.</p>

<p><strong>3. Allocation competition:</strong> With domestic LPG demand for cooking and heating being a political priority, industrial users face the risk of being deprioritized in allocation decisions. Oil marketing companies (IOCs) may redirect available propane stocks toward household LPG cylinders, further squeezing industrial supply.</p>

<h2>Coated Steel Production: Galvanizing Lines Under Threat</h2>

<p>The propane supply disruption creates a specific and severe risk for India\u2019s coated steel segment \u2014 galvanized steel, galvalume, and colour-coated products.</p>

<p><strong>Why propane matters to galvanizing:</strong> In continuous hot-dip galvanizing (HDG) lines, propane-fired burners maintain the zinc bath at a precise 450\u2013460\u00B0C. Stable, uniform heating is essential because:</p>

<p>\u2014 Temperature fluctuations of even 5\u201310\u00B0C affect zinc coating adhesion and uniformity<br/>
\u2014 Rapid thermal cycling can damage the ceramic pot lining, requiring costly repairs<br/>
\u2014 Inconsistent heating leads to coating defects that compromise corrosion resistance \u2014 the entire value proposition of galvanized steel</p>

<p>India\u2019s installed galvanizing and colour-coating capacity has expanded significantly in recent years. Major producers \u2014 including JSW Steel Coated Products, Tata Steel Colors, ArcelorMittal Nippon Steel India (AM/NS), and Jindal Stainless \u2014 operate large-scale HDG and colour-coating lines. Industry sources indicate that some facilities have already experienced disruptions due to reduced availability of industrial gases.</p>

<p><strong>Scale of the risk:</strong> India\u2019s coated flat steel production is estimated at 12\u201314 million MT per annum, supporting critical sectors:</p>

<p>\u2014 <strong>Construction and roofing:</strong> Galvanized and colour-coated roofing sheets account for a substantial share of India\u2019s roofing market, particularly in tier-2/3 cities and rural housing<br/>
\u2014 <strong>Infrastructure:</strong> Highway guardrails, transmission towers, and solar mounting structures all require galvanized steel<br/>
\u2014 <strong>Renewable energy:</strong> Solar module frames and wind turbine components use galvanized and galvalume substrates<br/>
\u2014 <strong>Automotive:</strong> OEMs use galvannealed steel for body panels requiring corrosion resistance<br/>
\u2014 <strong>Appliances:</strong> Refrigerators, washing machines, and air conditioner housings use pre-painted galvanized steel</p>

<p>A sustained propane shortage that forces galvanizing line slowdowns or shutdowns would create supply shortages in all these downstream sectors within 3\u20134 weeks, given the limited buffer stocks that distributors typically carry.</p>

<h2>Raw Material Routes: A Mixed Picture</h2>

<p>Not all of India\u2019s steel raw material supply chains are equally affected:</p>

<p><strong>Coking coal (Australia \u2192 India):</strong> India imports 55\u201360 million MT of coking coal annually, with 70\u201375% sourced from Australia. This route transits the Indian Ocean and is entirely unaffected by Hormuz. However, general freight market tightness has pushed rates on this route up by 5\u20138%, adding approximately $2\u20134 per MT.</p>

<p><strong>Coking coal (Mozambique \u2192 India):</strong> India\u2019s second-largest source. The Mozambique Channel route is also unaffected. Supplies continue normally.</p>

<p><strong>Coking coal (US East Coast \u2192 India):</strong> US coal shipments transit the Atlantic and Suez Canal or Cape route to reach India. While not directly affected by Hormuz, the general disruption to global shipping capacity has increased transit times by 2\u20133 days and costs by $3\u20135 per MT.</p>

<p><strong>Steel scrap (UAE, Saudi Arabia \u2192 India):</strong> Severely impacted. India imports approximately 6\u20138 million MT of steel scrap annually, with a meaningful share from Gulf ports. Scrap shipments through Hormuz are either halted or being rerouted at substantial additional cost. Domestic scrap prices have already risen \u20B91,500\u20132,000 per MT as EAF and IF producers compete for limited local supply.</p>

<p><strong>Iron ore:</strong> India is largely self-sufficient (production of 260\u2013280 million MT per year) and is a net exporter. Direct impact is minimal. Iran\u2019s roughly 3% share of global seaborne iron ore is now disrupted, which marginally tightens the global market but has negligible effect on Indian producers.</p>

<h2>Mill Response: Price Hikes and Production Adjustments</h2>

<p>Indian steel mills have responded aggressively:</p>

<p>\u2014 <strong>Three consecutive price hike rounds</strong> since March 1, totalling approximately \u20B92,100 per MT on HRC base prices across major producers (JSW, Tata, SAIL, AM/NS)<br/>
\u2014 <strong>TMT bar prices</strong> have been revised upward by \u20B91,000\u20131,500 per MT, with further increases expected as scrap costs feed through<br/>
\u2014 <strong>Galvanized product premiums</strong> are being widened by \u20B9500\u2013800 per MT over base HR/CR prices, reflecting the propane cost pass-through and anticipated supply tightening<br/>
\u2014 Some mills are reportedly <strong>adjusting product mix</strong> away from galvanized products toward non-coated flat and long products to manage the propane constraint</p>

<p>The rupee\u2019s weakening against the dollar (it has depreciated approximately 1.5% since the crisis began) is compounding all dollar-denominated input costs, adding a further \u20B9300\u2013500 per MT across the board.</p>

<h2>Actionable Strategy by Stakeholder</h2>

<p><strong>Steel traders and stockholders:</strong> The price trajectory remains upward across all product segments. With oil above $90, freight elevated, and industrial gas supply constrained, there are multiple simultaneous cost drivers that have not yet fully transmitted into market prices. Inventory holders should evaluate their position carefully \u2014 the full cost pass-through is likely still 2\u20133 weeks away.</p>

<p><strong>Purchase managers and project procurement teams:</strong> Evaluate locking in rates on fixed-price contracts for March\u2013April delivery where available. For coated steel specifically, secure supply commitments now \u2014 if galvanizing line shutdowns materialise, lead times could extend by 3\u20134 weeks and spot premiums could spike. Use SteelMath\u2019s Landed Cost Calculator to compare domestic vs. import economics at current freight and duty levels.</p>

<p><strong>Plant engineers and fabricators:</strong> Revise BOQs and project estimates to reflect a 3\u20137% material cost increase depending on product mix. For projects with significant galvanized steel content (warehouses, PEB structures, solar installations), the increase could be higher. Build in contingency.</p>

<p><strong>Coated steel producers:</strong> Evaluate multi-fuel capability of your galvanizing and colour-coating lines. Lines that can switch between propane, natural gas (PNG via pipeline), and LPG have a significant operational advantage. Companies with city gas distribution (CGD) access via GAIL or other pipeline operators should maximise PNG usage to reduce propane dependence. Investigate pre-procurement of propane stocks for 30\u201345 day buffer.</p>

<h2>What Could Change the Outlook</h2>

<p><strong>Escalation scenario:</strong> Any further military action \u2014 tanker incidents, mine deployment, or expanded naval blockades \u2014 would push crude above $100 and could completely halt Gulf-origin propane supply for an extended period. This would force galvanizing line shutdowns at multiple facilities within 2\u20133 weeks.</p>

<p><strong>Resolution scenario:</strong> Even a diplomatic resolution would take 4\u20138 weeks to normalise freight rates and insurance premiums. Propane supply chains, which operate on tighter inventory cycles than crude oil, could take 6\u201310 weeks to fully recover. Mill price hikes already announced will not be reversed.</p>

<p><strong>Policy intervention:</strong> The Indian government could accelerate relief by temporarily reducing import duties on propane and LPG for industrial use, prioritising industrial gas allocation alongside household needs, and expediting gas pipeline connectivity to large industrial clusters. Industry bodies have already made representations seeking such interventions.</p>

<p>The Hormuz crisis is a stress test for India\u2019s steel value chain \u2014 not just on the primary production side, but across the entire downstream ecosystem. The propane-to-galvanizing vulnerability, in particular, exposes how deeply India\u2019s steel industry depends on imported energy inputs at every stage of the value chain, from blast furnace to finished coated product.</p>

<p>SteelMath will continue tracking all cost channels and updating our calculators with the latest data as the situation evolves.</p>
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

<p>Quick reference for common TMT bar weights per metre: 8mm weighs 0.395 kg/m, 10mm weighs 0.617 kg/m, 12mm weighs 0.889 kg/m, 16mm weighs 1.580 kg/m, 20mm weighs 2.469 kg/m, 25mm weighs 3.853 kg/m, and 32mm weighs 6.313 kg/m.</p>

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

<p>At the current TMT price of approximately \u20B948,500 per MT in Delhi (March 2026), the cost per bar works out to: 12mm \u00D7 12m bar = 10.666 kg = approximately \u20B9517 per bar. For a residential column requiring 8 bars of 12mm \u00D7 3m: total weight = 8 \u00D7 0.889 \u00D7 3 = 21.34 kg, so the steel cost is approximately \u20B91,035.</p>

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

<p>The <strong>total HRC production cost via BF-BOF</strong> at current input prices is approximately <strong>\u20B938,000\u201342,000 per MT</strong> (including overhead, logistics, depreciation, and other unlisted costs beyond the raw material and processing components above). With HRC selling at \u20B952,000\u201354,000 in the domestic market, operating margins are healthy at roughly \u20B910,000\u201314,000 per MT, though they\u2019ve compressed from pre-crisis levels due to input cost inflation.</p>

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
  {
    slug: "propane-shortage-coated-steel-india-2026",
    title:
      "India\u2019s Propane Crisis: How Industrial Gas Shortages Are Threatening Galvanized & Coated Steel Production",
    category: "CRISIS",
    categoryColor: "red",
    date: "2026-03-15",
    readTime: "10 min",
    excerpt:
      "Propane spot prices up 17%, West Asian cargoes delayed by 3 weeks, galvanizing lines facing temperature instability. Inside the industrial gas shortage that could disrupt India\u2019s \u20B960,000 crore coated steel sector.",
    metaTitle:
      "Propane Shortage Impact on Coated Steel India 2026 \u2014 Galvanizing, Colour Coating, Supply Crisis | SteelMath",
    metaDescription:
      "How the propane and LPG shortage from the Hormuz crisis is threatening India\u2019s galvanized and colour-coated steel production. Impact on JSW, Tata, AM/NS, downstream sectors, and what the government can do.",
    relatedCalculators: ["landed-cost"],
    content: `
<p>While the Strait of Hormuz crisis has dominated headlines for its impact on crude oil prices and ocean freight, a quieter but potentially more disruptive consequence is unfolding in India\u2019s industrial gas supply chain. Propane \u2014 an unglamorous but operationally critical fuel \u2014 is becoming scarce, and the consequences for India\u2019s galvanized and colour-coated steel industry could be severe.</p>

<p>This is not a hypothetical risk. Multiple industry sources confirm that plant-level disruptions have already begun at some facilities. If the shortage persists beyond the next 2\u20133 weeks, India faces potential production losses in a steel segment worth an estimated \u20B960,000\u201370,000 crore annually.</p>

<h2>India\u2019s Propane Import Dependency: The Numbers</h2>

<p>India consumed approximately 5.8 million MT of LPG and propane for industrial purposes in FY2025, separate from the roughly 30 million MT used for household cooking. Of the industrial portion, an estimated 35\u201340% is imported, with the majority originating from West Asian producers:</p>

<p>\u2014 <strong>Saudi Arabia:</strong> Largest single supplier, accounting for roughly 40% of India\u2019s propane imports. Saudi Aramco\u2019s monthly Contract Price (CP) is the benchmark for Asian propane markets.<br/>
\u2014 <strong>Qatar:</strong> Supplies approximately 20\u201325% of India\u2019s imported propane, primarily from the Ras Laffan terminal.<br/>
\u2014 <strong>UAE:</strong> Accounts for 15\u201320% of imports, from the Jebel Ali and Ruwais terminals.<br/>
\u2014 <strong>Kuwait, Bahrain, and others:</strong> Smaller but collectively significant at 10\u201315%.</p>

<p>Nearly all of these cargoes transit the Strait of Hormuz. With the strait effectively closed since February 28, Indian importers face a supply bottleneck with no quick workaround.</p>

<h2>What Has Happened to Prices and Availability</h2>

<p>The disruption has manifested across three metrics simultaneously:</p>

<p><strong>Spot prices:</strong> Far East propane spot has moved from approximately $580/MT in late February to $680\u2013700/MT by mid-March \u2014 a 17\u201320% increase. This is the steepest two-week propane rally since 2022. The Mont Belvieu (US Gulf) benchmark has risen more modestly (+8%), creating a widening East-West arbitrage that may eventually attract US cargoes to Asia, but not quickly enough to offset current shortages.</p>

<p><strong>Cargo arrivals:</strong> Of the 12\u201315 propane/LPG tankers that were scheduled to arrive at Indian ports (Kandla, Mumbai, Mangalore, Vizag) during the first two weeks of March, industry sources estimate that 5\u20137 have been delayed, diverted, or cancelled. Rerouted cargoes via the Cape of Good Hope add 18\u201322 days to delivery schedules.</p>

<p><strong>Inventory at terminals:</strong> Indian Oil Corporation (IOCL), Bharat Petroleum (BPCL), and Hindustan Petroleum (HPCL) operate propane/LPG import terminals with combined storage capacity of approximately 1.5\u20131.8 million MT. Current inventory levels are reported to be 15\u201320% below seasonal norms, with drawdown accelerating as imports lag consumption.</p>

<h2>Why Propane Cannot Be Easily Substituted</h2>

<p>A common question from those outside the steel coating industry: can\u2019t facilities simply switch to natural gas or electricity? The answer is nuanced:</p>

<p><strong>Natural gas (PNG via pipeline):</strong> Technically feasible for many galvanizing lines, and some large producers (particularly in Gujarat, where city gas distribution networks are well-developed) already use PNG as a primary or backup fuel. However, switching requires compatible burner systems, and not all facilities are connected to gas pipelines. Expanding pipeline connectivity to industrial clusters in states like Maharashtra, Karnataka, or Tamil Nadu is a multi-year infrastructure project, not a crisis response.</p>

<p><strong>LPG (butane-propane mix):</strong> Already used interchangeably with propane in some applications, but LPG faces the same import disruption since it originates from the same West Asian sources and transits the same strait. Domestic LPG production from refineries is largely allocated to household cylinders \u2014 a politically non-negotiable priority.</p>

<p><strong>Electricity (induction or resistance heating):</strong> Electric heating systems for zinc baths do exist but are uncommon in India\u2019s installed base. Retrofitting a propane-fired galvanizing line to electric heating is a capital-intensive project (\u20B95\u201310 crore per line, depending on capacity) with a 6\u201312 month implementation timeline. It is a strategic long-term option, not a solution for the current crisis.</p>

<p><strong>Hydrogen blending:</strong> Pilot-stage technology. Some European galvanizing facilities are experimenting with hydrogen-natural gas blends, but this is years away from commercial deployment in India.</p>

<p>The reality is that for the majority of India\u2019s installed galvanizing and colour-coating capacity, propane (or LPG) is the only operationally available fuel in the near term.</p>

<h2>What Happens Inside a Galvanizing Line When Propane Runs Short</h2>

<p>For those unfamiliar with the process, here is why even a partial propane shortage creates operational problems far beyond a simple cost increase:</p>

<p><strong>The zinc bath:</strong> In a continuous hot-dip galvanizing (HDG) line, steel strip passes through a bath of molten zinc maintained at 450\u2013460\u00B0C. The bath typically contains 150\u2013300 tonnes of molten zinc (depending on line capacity), heated by propane-fired burners positioned around the ceramic-lined pot.</p>

<p><strong>Temperature precision is non-negotiable:</strong> The zinc bath temperature must be controlled within a \u00B15\u00B0C window. If temperature drops below 445\u00B0C, the zinc becomes too viscous for uniform coating. If it rises above 465\u00B0C, excessive zinc-iron alloy formation occurs at the steel surface, producing a dull, brittle coating that fails quality specifications.</p>

<p><strong>Burner performance degrades with inconsistent supply:</strong> When propane supply pressure fluctuates (as it does when terminal operators ration deliveries), burner output becomes uneven. This creates thermal gradients across the zinc bath \u2014 one end may be at 455\u00B0C while the other drops to 440\u00B0C. The result is inconsistent coating thickness across the strip width, leading to edge defects and customer rejections.</p>

<p><strong>Shutdown and restart costs are enormous:</strong> If a galvanizing line must shut down due to fuel unavailability, the zinc bath must either be kept molten (consuming fuel even while non-productive) or allowed to solidify. Resolidifying and remelting 200+ tonnes of zinc takes 3\u20135 days and risks cracking the ceramic pot lining \u2014 a repair that can cost \u20B91\u20132 crore and take 2\u20133 weeks. Most operators will choose to keep the bath molten at reduced temperature rather than risk a full shutdown, but this still consumes propane without producing saleable output.</p>

<h2>Which Producers Are Most Exposed</h2>

<p>India\u2019s coated flat steel capacity is concentrated among a handful of major producers:</p>

<p><strong>JSW Steel Coated Products:</strong> Operates galvanizing and colour-coating lines at Vasind (Maharashtra), Tarapur (Maharashtra), Kalmeshwar (Maharashtra), and Salem (Tamil Nadu). Maharashtra facilities are particularly exposed due to limited PNG pipeline access for industrial users.</p>

<p><strong>Tata Steel (including Tata Steel BSL):</strong> Operates HDG and colour-coating at Jamshedpur (Jharkhand), Sahibabad (UP), and through the erstwhile Bhushan Steel facilities. Jharkhand has moderate city gas coverage but not at industrial scale in the steel cluster.</p>

<p><strong>ArcelorMittal Nippon Steel India (AM/NS):</strong> Operates large-scale HDG at Hazira (Gujarat). Gujarat\u2019s relatively well-developed gas grid provides some buffer, making AM/NS potentially less vulnerable than Maharashtra-based producers.</p>

<p><strong>Jindal Stainless and other secondary producers:</strong> Multiple induction-furnace-based producers in Raipur (Chhattisgarh), Mandi Gobindgarh (Punjab), and other clusters operate smaller galvanizing units. These facilities typically have minimal fuel storage and rely on just-in-time propane delivery \u2014 making them the most immediately vulnerable to supply disruptions. Industry sources indicate some of these units have already experienced interruptions.</p>

<h2>Downstream Impact: Who Gets Hurt</h2>

<p>India\u2019s galvanized and colour-coated steel production (estimated at 12\u201314 million MT per annum) feeds into sectors where supply disruption has immediate, visible consequences:</p>

<p><strong>Construction and roofing (\u223C40% of coated steel consumption):</strong> Galvanized corrugated sheets and colour-coated roofing panels are the dominant roofing material for residential construction in tier-2/3 cities and rural India. The ongoing spring construction season (March\u2013June) is peak demand period. Supply shortages would directly delay housing completion and push up costs for builders already operating on thin margins.</p>

<p><strong>Infrastructure (\u223C20%):</strong> Highway guardrails (mandated to be galvanized under NHAI specifications), transmission tower components, solar mounting structures, and bridge components all require hot-dip galvanized steel. Government infrastructure timelines under Bharatmala, Sagarmala, and the National Infrastructure Pipeline could face material-driven delays.</p>

<p><strong>Renewable energy (\u223C10%):</strong> India\u2019s solar installation target of 50 GW per year requires approximately 60,000\u201380,000 MT of galvanized mounting structures per GW. A coated steel shortage during Q1 FY2027 could delay solar commissioning targets and affect power purchase agreement (PPA) timelines.</p>

<p><strong>Automotive and appliances (\u223C15%):</strong> OEMs use galvannealed and electrogalvanized steel for body panels, while appliance manufacturers use pre-painted galvanized steel (PPGI) for exterior panels. Automotive supply chains operate on 2\u20134 week inventory buffers; a sustained coated steel shortage would trigger production line stoppages at OEM plants.</p>

<p><strong>Pre-engineered buildings (PEB) (\u223C10%):</strong> The PEB sector, growing at 15\u201320% annually in India, uses galvanized purlins, sheeting, and structural members. PEB contractors typically procure coated steel 4\u20136 weeks ahead of erection \u2014 those who have not yet secured April\u2013May material could face significant cost escalation or delivery delays.</p>

<h2>What the Government Should Consider</h2>

<p>The propane shortage is an industrial policy problem, not just an energy market event. Several measures could mitigate the damage:</p>

<p><strong>1. Temporary import duty relief:</strong> India currently levies a 2.5% basic customs duty on propane imports (HS 2711.12). Temporarily suspending this duty for industrial-grade propane would reduce landed costs by $15\u201318 per MT and signal policy support for manufacturing continuity.</p>

<p><strong>2. Industrial allocation guarantee:</strong> The Petroleum and Natural Gas Regulatory Board (PNGRB) could issue a directive ensuring that a minimum percentage of available propane/LPG stocks are reserved for critical industrial users, preventing complete diversion to the household segment. A 70:30 household-to-industrial split (vs. the current effective 85:15 during shortages) would meaningfully improve industrial availability.</p>

<p><strong>3. Emergency procurement from non-Gulf sources:</strong> Government-facilitated term contracts for propane from the US Gulf Coast (Enterprise, Targa terminals), West Africa (Nigeria LPG), or Australia could begin delivering within 30\u201340 days. The price premium over Gulf propane would be $30\u201350/MT due to longer shipping, but this is far less costly than production shutdowns.</p>

<p><strong>4. Accelerated PNG pipeline connectivity:</strong> GAIL operates approximately 22,000 km of gas pipeline across India, but many industrial clusters with galvanizing capacity are not connected. Expediting last-mile connectivity to major steel coating hubs \u2014 Vasind/Tarapur (Maharashtra), Raipur cluster (Chhattisgarh), Mandi Gobindgarh (Punjab) \u2014 would create structural resilience for future disruptions.</p>

<p><strong>5. Strategic propane reserve:</strong> India maintains strategic petroleum reserves at Visakhapatnam, Mangalore, and Padur for crude oil. A similar concept for industrial LPG/propane \u2014 even a modest 15\u201320 day buffer stock at key import terminals \u2014 would prevent a logistics disruption from becoming an industrial crisis. The estimated cost of building such a reserve is \u20B9800\u20131,200 crore, modest relative to the \u20B960,000+ crore annual output of the coated steel sector it would protect.</p>

<h2>The Bigger Picture: India\u2019s Industrial Energy Security</h2>

<p>The propane-to-galvanizing vulnerability is a microcosm of a broader issue: India\u2019s steel industry, the world\u2019s second-largest, remains deeply dependent on imported energy inputs at every stage of the value chain. From coking coal for blast furnaces to propane for coating lines, critical industrial fuels are sourced from a small number of geographically concentrated suppliers and transported through a handful of maritime chokepoints.</p>

<p>As India pursues its target of 300 million MT of annual steel capacity by 2030 (up from approximately 160 MT today), the volume of imported energy inputs will only grow. The Hormuz crisis has exposed the fragility of a supply chain that was optimised for cost and convenience but not for resilience.</p>

<p>The steel industry\u2019s long-term answer lies in fuel diversification (electrification of heating, green hydrogen, domestic gas expansion), supply route diversification (reducing West Asian concentration), and strategic buffering (reserves for critical industrial inputs). These are multi-year investments. The immediate priority is ensuring that the current disruption does not shut down galvanizing lines that supply steel for India\u2019s housing, infrastructure, and energy transition.</p>

<p>SteelMath will continue tracking propane availability, coated steel pricing, and downstream supply chain impacts as the situation develops.</p>
`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
