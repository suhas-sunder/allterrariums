import type { Route } from "./+types/home";
import { useState, useMemo } from "react";
/* ────────────────────────────────────────────────
   SEO Meta
──────────────────────────────────────────────── */
export const meta: Route.MetaFunction = () => [
  {
    title: "AllTerrariums – Build, Grow & Care for Magical Miniature Worlds",
  },
  {
    name: "description",
    content:
      "Create your own living terrarium! Discover step-by-step guides, soil & humidity calculators, and plant care tips for thriving moss gardens, closed jars, and open glass ecosystems. Perfect for beginners and hobbyists alike.",
  },
  {
    name: "keywords",
    content:
      "terrarium, how to make a terrarium, DIY terrarium, closed terrarium, open terrarium, moss terrarium, glass jar garden, mini ecosystem, plant humidity, soil calculator, terrarium plants, tropical moss care, self-sustaining terrarium, beginner guide, step-by-step terrarium, living decor",
  },
  { name: "robots", content: "index,follow" },
  { name: "theme-color", content: "#294532" },
  {
    property: "og:title",
    content: "AllTerrariums – Create Your Own Living Forest in Glass",
  },
  {
    property: "og:description",
    content:
      "Explore guides, calculators, and plant tips to design self-sustaining terrariums filled with moss, ferns, and natural magic.",
  },
  {
    property: "og:url",
    content: "https://allterrariums.com",
  },
  {
    property: "og:type",
    content: "website",
  },
  {
    property: "og:image",
    content: "https://allterrariums.com/preview-image.jpg",
  },
  {
    name: "twitter:card",
    content: "summary_large_image",
  },
  {
    name: "twitter:title",
    content: "AllTerrariums – Build & Care for Your Own Miniature Ecosystem",
  },
  {
    name: "twitter:description",
    content:
      "Learn how to make beautiful moss terrariums and thriving plant worlds. Includes soil calculators, care guides, and eco-design inspiration.",
  },
];

export function SoilVolumeCalculator() {
  const [shape, setShape] = useState("rectangular");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [soilDepth, setSoilDepth] = useState("");
  const [unit, setUnit] = useState("cm");
  const [costPerLiter, setCostPerLiter] = useState("");

  const factor = unit === "in" ? 2.54 : 1;

  const result = useMemo(() => {
    const l = parseFloat(length) * factor;
    const w = parseFloat(width) * factor;
    const h = parseFloat(height) * factor;
    const sd = parseFloat(soilDepth) * factor;
    if (isNaN(sd) || sd <= 0) return null;

    let volumeCm3 = 0;
    if (shape === "rectangular" && l > 0 && w > 0) {
      volumeCm3 = l * w * sd;
    } else if (shape === "cylindrical" && w > 0) {
      const r = w / 2;
      volumeCm3 = Math.PI * r * r * sd;
    } else {
      return null;
    }

    const liters = volumeCm3 / 1000;
    const cups = liters * 4.22675;
    const bags = liters / 2.5;

    const cost =
      !isNaN(parseFloat(costPerLiter)) && parseFloat(costPerLiter) > 0
        ? liters * parseFloat(costPerLiter)
        : null;

    return { liters, cups, bags, cost };
  }, [shape, length, width, height, soilDepth, factor, costPerLiter]);

  const fillPercent = useMemo(() => {
    const h = parseFloat(height);
    const sd = parseFloat(soilDepth);
    if (isNaN(h) || isNaN(sd) || h <= 0) return 0;
    return Math.min((sd / h) * 100, 100);
  }, [height, soilDepth]);

  const aspect = useMemo(() => {
    const l = parseFloat(length) || parseFloat(width) || 1;
    const w = parseFloat(width) || parseFloat(length) || 1;
    const h = parseFloat(height) || 1;
    const max = Math.max(l, w, h);
    return {
      width: `${(w / max) * 180}px`,
      height: `${(h / max) * 180}px`,
    };
  }, [length, width, height]);

  return (
    <section
      id="soil-calculator"
      className="max-w-5xl mx-auto px-6 py-12 border-b border-[#cfded0]"
    >
      <h2 className="text-3xl font-bold font-[Poppins] text-[#294532] mb-6 text-center">
        🪴 Soil & Substrate Volume Calculator
      </h2>

      <p className="text-[#3e5644] leading-relaxed mb-10 text-center max-w-2xl mx-auto">
        Calculate exactly how much soil or substrate you need for your
        terrarium. Enter the dimensions of your container and the desired soil
        depth to see the estimated volume, along with a live visual preview
        below.
      </p>

      <div className="bg-white border border-[#d8e3d9] rounded-xl shadow-md p-8 space-y-8">
        {/* Result */}
        <div className="bg-[#f9fbf9] border border-[#d8e3d9] rounded-md p-6 text-center ">
          {result ? (
            <>
              <h3 className="font-bold text-lg text-[#294532] mb-2">
                Estimated Soil Needed:
              </h3>
              <p className="text-[#3e5644] text-base">
                🌱 <strong>{result.liters.toFixed(2)}</strong> liters ≈{" "}
                <strong>{result.cups.toFixed(1)}</strong> cups ≈{" "}
                <strong>{result.bags.toFixed(2)}</strong> soil bags (2.5 L each)
              </p>
              {result.cost && (
                <p className="text-[#3e5644] mt-3 text-base">
                  💰 Estimated Soil Cost:{" "}
                  <strong>${result.cost.toFixed(2)}</strong>
                </p>
              )}
              <p className="text-[#527557] text-sm mt-2 italic">
                Tip: Add 10–15% extra for decoration and settling.
              </p>
            </>
          ) : (
            <p className="text-[#3e5644]">
              Enter your container dimensions to calculate soil volume.
            </p>
          )}
        </div>

        {/* Shape Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {["rectangular", "cylindrical"].map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`px-5 py-2 rounded-full cursor-pointer font-semibold text-sm transition-all active:scale-95 ${
                shape === s
                  ? "bg-[#294532] text-pink-100"
                  : "bg-gray-100 hover:bg-gray-200 text-[#294532]"
              }`}
            >
              {s === "rectangular"
                ? "🧱 Rectangular Tank"
                : "🪞 Cylindrical Jar"}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {shape === "rectangular" && (
            <>
              <div>
                <label className="block font-semibold text-[#294532] mb-1">
                  Length ({unit})
                </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#6e9372]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#294532] mb-1">
                  Width ({unit})
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#6e9372]"
                />
              </div>
            </>
          )}
          {shape === "cylindrical" && (
            <div>
              <label className="block font-semibold text-[#294532] mb-1">
                Diameter ({unit})
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#6e9372]"
              />
            </div>
          )}
          <div>
            <label className="block font-semibold text-[#294532] mb-1">
              Height ({unit})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#6e9372]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#294532] mb-1">
              Soil Depth ({unit})
            </label>
            <input
              type="number"
              value={soilDepth}
              onChange={(e) => setSoilDepth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#6e9372]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#294532] mb-1">
              Units
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#6e9372]"
            >
              <option value="cm">Centimeters</option>
              <option value="in">Inches</option>
            </select>
          </div>
        </div>

        {/* Visual Preview */}
        <div className="flex flex-col items-center justify-center mt-8">
          <h4 className="font-semibold text-[#294532] mb-3 text-sm">
            Container Preview
          </h4>
          <div
            className="relative border-2 border-[#294532] rounded-md overflow-hidden bg-[#f3f6f3] transition-all duration-500 flex justify-center items-end"
            style={{
              ...aspect,
              borderRadius: shape === "cylindrical" ? "50% / 8%" : "8px",
            }}
          >
            <div
              className="absolute bottom-0 left-0 w-full transition-all duration-500"
              style={{
                height: `${fillPercent}%`,
                background:
                  "linear-gradient(to top, #7b5230, #a67849, #d3b488)",
              }}
            ></div>
          </div>
          <p className="text-[#527557] text-xs mt-2 italic">
            Estimated substrate fill level ({fillPercent.toFixed(0)}%)
          </p>
        </div>

        {/* Optional Cost Input */}
        <div className="max-w-sm mx-auto mt-6">
          <label className="block font-semibold text-[#294532] mb-1 text-center">
            Optional: Soil Cost per Liter ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={costPerLiter}
            onChange={(e) => setCostPerLiter(e.target.value)}
            placeholder="e.g., 3.50"
            className="w-full p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:border-[#6e9372]"
          />
        </div>

        {/* How the Calculation Works */}
        <div className="bg-[#f9fbf9] border border-[#d8e3d9] rounded-md p-4 text-[#294532] text-sm leading-relaxed mt-8">
          🧮 <strong>How the calculation works:</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              Volume is calculated based on your chosen container shape.
              <ul className="list-disc pl-6">
                <li>
                  Rectangular: <code>length × width × soil depth</code>
                </li>
                <li>
                  Cylindrical: <code>π × (radius²) × soil depth</code>
                </li>
              </ul>
            </li>
            <li>
              The result gives total volume in cubic centimeters, converted into
              liters (1,000 cm³ = 1 L).
            </li>
            <li>
              Conversions to cups and 2.5L soil bags are included for easy
              estimation.
            </li>
            <li>
              If you add a cost per liter, the calculator multiplies it by the
              total liters to give an estimated soil cost.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   Page Component
──────────────────────────────────────────────── */
export default function Index() {
  return (
    <main className="min-h-screen font-sans bg-[#f7faf7] text-[#2b3f2f]">
      {/* HERO */}
      <section className="text-center py-8 px-6 border-b border-[#cfded0] bg-[#eef3ef]">
        <h1 className="text-5xl font-extrabold font-[Poppins] text-[#294532] tracking-tight">
          AllTerrariums
        </h1>
        <p className="text-lg max-w-2xl mx-auto mt-4 text-[#3e5644]">
          Create a living world in glass. Explore guides on moss jars, closed
          ecosystems, and plant care designed to help you grow calm, thriving
          terrariums indoors.
        </p>
        <a
          href="#faq"
          className="inline-block mt-5 px-8 py-3 bg-[#294532] text-pink-100 rounded-full hover:bg-[#3a6047] active:scale-95 transition font-semibold"
        >
          Explore the Basics
        </a>
      </section>

      <SoilVolumeCalculator />

      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-[#cfded0]">
        <h2 className="text-3xl font-bold font-[Poppins] text-[#294532] mb-10 text-center">
          🧮 Terrarium Calculators & Tools
        </h2>
        <p className="text-[#3e5644] leading-relaxed mb-10 text-center max-w-3xl mx-auto">
          Understanding your terrarium’s balance between soil, water, humidity,
          and light makes the difference between a healthy micro-forest and a
          fogged-up jar. These upcoming tools are designed to help you plan,
          measure, and care for your living ecosystem with precision and ease.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Soil Volume */}
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">🪴</div>
            <h3 className="font-semibold text-lg text-[#294532] mb-1">
              Soil & Substrate Volume Calculator
            </h3>
            <p className="text-[#3e5644] text-sm leading-relaxed">
              Enter your container’s size to find out how much soil or moss mix
              you’ll need. Perfect for planning your layers before starting a
              new build or buying materials.
            </p>
          </div>

          {/* Humidity */}
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">💧</div>
            <h3 className="font-semibold text-lg text-[#294532] mb-1">
              Humidity & Condensation Calculator
            </h3>
            <p className="text-[#3e5644] text-sm leading-relaxed">
              Estimate internal humidity based on temperature and container
              type. Learn when your terrarium will naturally fog and how to keep
              moisture balanced.
            </p>
          </div>

          {/* Light */}
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">☀️</div>
            <h3 className="font-semibold text-lg text-[#294532] mb-1">
              Light Exposure Estimator
            </h3>
            <p className="text-[#3e5644] text-sm leading-relaxed">
              Measure sunlight direction or lux values to determine if your
              terrarium receives enough light for mosses or succulents. Great
              for deciding placement on desks and shelves.
            </p>
          </div>

          {/* Watering */}
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">🌦️</div>
            <h3 className="font-semibold text-lg text-[#294532] mb-1">
              Misting & Watering Schedule Tool
            </h3>
            <p className="text-[#3e5644] text-sm leading-relaxed">
              Suggests how often to mist your terrarium based on humidity, plant
              type, and jar size. Avoid overwatering while keeping your plants
              happy.
            </p>
          </div>

          {/* Layer Depth */}
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">🪨</div>
            <h3 className="font-semibold text-lg text-[#294532] mb-1">
              Layer Depth Planner
            </h3>
            <p className="text-[#3e5644] text-sm leading-relaxed">
              Calculates the recommended thickness for drainage, charcoal, soil,
              and moss layers based on total container height. Helps design a
              visually balanced and functional terrarium.
            </p>
          </div>

          {/* Plant Match */}
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">🌿</div>
            <h3 className="font-semibold text-lg text-[#294532] mb-1">
              Plant Compatibility Finder
            </h3>
            <p className="text-[#3e5644] text-sm leading-relaxed">
              Input your light level and humidity preferences to get plant
              combinations that thrive together. Ideal for building
              low-maintenance, long-lasting ecosystems.
            </p>
          </div>
        </div>

        {/* Coming Soon Note */}
        <div className="bg-[#f9fbf9] border border-[#d8e3d9] rounded-xl p-6 mt-12 text-center">
          <h3 className="font-semibold text-lg text-[#294532] mb-2">
            🌱 Coming Soon
          </h3>
          <p className="text-[#3e5644] leading-relaxed max-w-3xl mx-auto">
            These interactive calculators and guides will launch in the next
            AllTerrariums update. Each tool is designed to help you plan and
            maintain your terrarium with scientific precision while keeping the
            process fun, educational, and beginner-friendly.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="explore"
        className="max-w-4xl mx-auto px-6 py-16 text-center border-b border-[#cfded0]"
      >
        <h2 className="text-3xl font-bold font-[Poppins] text-[#294532] mb-6">
          Why Terrariums Are So Special, and What Are They?
        </h2>
        <p className="text-[#3e5644] leading-relaxed">
          A terrarium is a miniature garden that grows inside a transparent
          container, creating its own natural cycle of light, air, and water.
          Moisture rises, condenses, and falls again, keeping the plants alive
          with little effort. The result is a calm, sustainable world you can
          watch thrive right on your desk or windowsill.
        </p>
        <p className="text-[#3e5644] leading-relaxed mt-4">
          Building one doesn’t require expert gardening skills. With a glass
          jar, a handful of moss, soil layers, and imagination, you can grow a
          small forest that keeps itself alive for years.
        </p>
      </section>

      {/* FEATURES */}
      <section className="bg-[#f0f5f0] py-14 px-6 border-b border-[#cfded0]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: "🌱",
              title: "Build Your Own Ecosystem",
              desc: "Learn each layer,  drainage stones, charcoal, soil, and moss,  to balance moisture and airflow naturally.",
            },
            {
              icon: "💧",
              title: "Self-Watering Wonders",
              desc: "Closed terrariums recycle their humidity through evaporation and condensation, needing water only a few times per year.",
            },
            {
              icon: "🌸",
              title: "Decorate with Life",
              desc: "Add crystals, driftwood, or tiny blossoms for personality. A single pink flower can transform a jar into art.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-xl p-8 border border-[#d8e3d9] shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="font-semibold text-lg text-[#294532] mb-2">
                {b.title}
              </h3>
              <p className="text-[#3e5644] text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center border-b border-[#cfded0]">
        <h2 className="text-3xl font-bold font-[Poppins] mb-6 text-[#294532]">
          A World of Calm and Growth
        </h2>
        <p className="text-[#3e5644] leading-relaxed">
          Terrariums remind us that nature thrives in balance. They teach
          patience and reward observation. By tending a living ecosystem, you
          connect daily life with slow, mindful growth, something modern spaces
          often miss.
        </p>
      </section>

      {/* HOW TO MAKE A TERRARIUM SECTION (Enhanced Layout) */}
      <section
        id="guide"
        className="max-w-5xl mx-auto px-6 py-20 border-b border-[#cfded0]"
      >
        <h2 className="text-3xl font-bold font-[Poppins] text-[#294532] mb-10 text-center">
          🌿 How to Make a Terrarium at Home
        </h2>

        {/* Intro */}
        <p className="text-[#3e5644] leading-relaxed mb-10 text-center max-w-3xl mx-auto">
          Creating your own terrarium is like capturing a small forest under
          glass. Whether you dream of a misty moss garden, a bright succulent
          dome, or a magical miniature jungle, these simple steps and tips will
          help you design a thriving, self-sustaining ecosystem indoors. All you
          need are the right layers, a clear container, and a touch of
          imagination.
        </p>

        {/* Step Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: "🪞",
              title: "1. Choose the Right Container",
              text: "Pick a transparent jar, vase, or aquarium. Closed containers create humidity and suit ferns and moss. Open containers allow airflow and are ideal for succulents. Wash glass before starting so plants get plenty of light.",
            },
            {
              icon: "🪨",
              title: "2. Add Drainage Layer",
              text: "Pour one inch of small pebbles or gravel at the bottom to prevent soggy roots. Sprinkle a thin layer of activated charcoal to absorb odors and keep the water cycle clean.",
            },
            {
              icon: "🌱",
              title: "3. Add Soil and Substrate",
              text: "Use lightweight, nutrient-rich soil. Moss terrariums do well with peat and perlite mixes. Succulent terrariums need sandy cactus soil for airflow. Add one or two inches of soil above the stones.",
            },
            {
              icon: "🌿",
              title: "4. Plant Your Greenery",
              text: "Use tweezers or long spoons to place plants. Start with taller species in the back and smaller ones in front. Press soil around roots gently and fill gaps with moss to retain moisture.",
            },
            {
              icon: "🎨",
              title: "5. Decorate with Natural Elements",
              text: "Add stones, bark, crystals, or miniature figurines. A single pink flower, tiny mushroom, or bit of driftwood makes the terrarium feel alive. Keep decor minimal so plants stay visible.",
            },
            {
              icon: "💧",
              title: "6. Water Sparingly",
              text: "Use a misting bottle instead of pouring water. Closed terrariums need just a few sprays to start condensation. Open ones need misting once or twice a week. Watch soil moisture and glass fog as your guide.",
            },
            {
              icon: "☀️",
              title: "7. Provide Light and Placement",
              text: "Keep your terrarium near bright but indirect light. Avoid harsh midday sun. LED grow lights work perfectly for desks. Too much light dries moss; too little causes weak, pale growth.",
            },
            {
              icon: "🧤",
              title: "8. Maintain and Enjoy",
              text: "Trim overgrowth monthly, remove fallen leaves, and clean glass with a soft cloth. Add springtails or isopods if you want a bioactive setup that prevents mold naturally.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="bg-white rounded-xl border border-[#d8e3d9] p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="font-semibold text-lg text-[#294532] mb-2">
                {step.title}
              </h3>
              <p className="text-[#3e5644] leading-relaxed text-sm">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-14 border-t border-[#d8e3d9]"></div>

        {/* Terrarium Types */}
        <h3 className="text-2xl font-bold text-[#294532] mb-8 text-center">
          🌼 Popular Types of Terrariums
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: "🌧️",
              title: "Closed Terrariums",
              text: "Sealed glass worlds that recycle water naturally. Best for ferns, mosses, and humidity-loving plants. Once established, they need watering only every few months.",
            },
            {
              icon: "☀️",
              title: "Open Terrariums",
              text: "Perfect for succulents and cacti. The open top allows ventilation and prevents moisture buildup. Mist lightly every week or when soil feels dry.",
            },
            {
              icon: "🍃",
              title: "Moss Jars",
              text: "Simple, low-maintenance jars filled with moist moss and soft light. Great for small desks and natural decor. Mist occasionally to keep moss bright green.",
            },
            {
              icon: "🐜",
              title: "Bioactive Terrariums",
              text: "Include springtails and isopods as natural cleaners. These micro-creatures eat decaying leaves and control mold, creating a balanced living ecosystem.",
            },
          ].map((type) => (
            <div
              key={type.title}
              className="bg-[#fdfdfd] border border-[#d8e3d9] rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{type.icon}</div>
              <h4 className="font-semibold text-lg text-[#294532] mb-2">
                {type.title}
              </h4>
              <p className="text-[#3e5644] text-sm leading-relaxed">
                {type.text}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-14 border-t border-[#d8e3d9]"></div>

        {/* Plant Tips */}
        <h3 className="text-2xl font-bold text-[#294532] mb-4 text-center">
          🌺 Choosing Plants and Common Mistakes
        </h3>
        <p className="text-[#3e5644] leading-relaxed mb-6 text-center max-w-3xl mx-auto">
          The right combination of plants ensures your terrarium stays healthy
          for years. Always group species that share similar humidity and light
          needs.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6">
            <h4 className="font-semibold text-lg text-[#294532] mb-2">
              Best Plants for Closed Terrariums 🌿
            </h4>
            <ul className="list-disc list-inside text-[#3e5644] text-sm leading-relaxed">
              <li>Mosses such as sphagnum or cushion moss</li>
              <li>Miniature ferns and nerve plants (Fittonia)</li>
              <li>Peperomia, polka dot plants, or baby tears</li>
            </ul>
          </div>
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6">
            <h4 className="font-semibold text-lg text-[#294532] mb-2">
              Best Plants for Open Terrariums 🌵
            </h4>
            <ul className="list-disc list-inside text-[#3e5644] text-sm leading-relaxed">
              <li>Succulents like echeveria, jade, and haworthia</li>
              <li>Air plants (Tillandsia) for no-soil displays</li>
              <li>Mini cacti for sunny windowsills</li>
            </ul>
          </div>
        </div>

        {/* Mistakes */}
        <div className="bg-[#f9fbf9] border border-[#d8e3d9] rounded-xl p-6 mt-10">
          <h4 className="font-semibold text-lg text-[#294532] mb-3">
            ⚠️ Common Mistakes to Avoid
          </h4>
          <ul className="list-disc list-inside text-[#3e5644] text-sm leading-relaxed">
            <li>Overwatering or sealing a jar before moisture balance forms</li>
            <li>
              Placing terrariums in direct sunlight, which can overheat plants
            </li>
            <li>Using soil that is too dense or holds excess water</li>
            <li>Combining plants with conflicting humidity needs</li>
            <li>
              Ignoring condensation buildup without airing out occasionally
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="my-14 border-t border-[#d8e3d9]"></div>

        {/* Closing Thoughts */}
        <h3 className="text-2xl font-bold text-[#294532] mb-4 text-center">
          🌸 Why Terrariums Belong in Every Home
        </h3>
        <p className="text-[#3e5644] leading-relaxed max-w-3xl mx-auto text-center">
          Terrariums are living art pieces that blend biology and creativity.
          They improve air quality, introduce calm energy, and remind us that
          growth happens quietly. Even the smallest moss jar captures the magic
          of a forest floor, where water cycles, roots spread, and new life
          appears in balance. Whether you build one for relaxation, learning, or
          decoration, each glass garden connects you to nature’s patience and
          resilience.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-[#cfded0]">
        <h2 className="text-3xl font-bold font-[Poppins] text-[#294532] mb-10 text-center">
          🪴 Terrarium Materials & Tools
        </h2>
        <p className="text-[#3e5644] leading-relaxed mb-10 text-center max-w-3xl mx-auto">
          Gather the right materials before you start. Each layer plays an
          important role in building a self-sustaining ecosystem that stays
          healthy for years.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: "🪞",
              name: "Glass Container",
              desc: "Choose clear glass jars, vases, or aquariums to let light reach every plant.",
            },
            {
              icon: "🪨",
              name: "Pebbles & Gravel",
              desc: "Used for drainage, preventing excess water from soaking roots.",
            },
            {
              icon: "⚫",
              name: "Activated Charcoal",
              desc: "Filters water and stops mold or algae buildup.",
            },
            {
              icon: "🌱",
              name: "Potting Soil",
              desc: "The foundation layer. Use moss mix for closed jars or cactus mix for open terrariums.",
            },
            {
              icon: "🌿",
              name: "Plants & Moss",
              desc: "Select small species suited to your humidity and light level.",
            },
            {
              icon: "🎨",
              name: "Decorative Touches",
              desc: "Add crystals, bark, driftwood, or figurines to personalize your glass garden.",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white border border-[#d8e3d9] rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg text-[#294532] mb-1">
                {item.name}
              </h3>
              <p className="text-[#3e5644] text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-[#cfded0]">
        <h2 className="text-3xl font-bold font-[Poppins] text-[#294532] mb-10 text-center">
          🌼 Terrarium Layer Anatomy
        </h2>
        <p className="text-[#3e5644] leading-relaxed mb-10 text-center max-w-3xl mx-auto">
          Each layer in your terrarium has a purpose. When stacked correctly,
          they work together to recycle moisture, nutrients, and air just like
          in a natural forest floor.
        </p>
        <div className="space-y-6">
          {[
            {
              num: "1️⃣",
              title: "Drainage Base",
              desc: "Pebbles or stones collect excess water so roots stay healthy.",
            },
            {
              num: "2️⃣",
              title: "Charcoal Layer",
              desc: "Keeps the terrarium clean by filtering impurities and odors.",
            },
            {
              num: "3️⃣",
              title: "Soil Layer",
              desc: "Anchors plant roots and supplies nutrients.",
            },
            {
              num: "4️⃣",
              title: "Plant Layer",
              desc: "Choose greenery that matches your humidity needs.",
            },
            {
              num: "5️⃣",
              title: "Moss & Decorative Layer",
              desc: "Seals moisture and adds texture, color, and design.",
            },
          ].map((layer) => (
            <div
              key={layer.title}
              className="flex items-start gap-4 bg-[#f9fbf9] border border-[#d8e3d9] rounded-xl p-4"
            >
              <div className="text-3xl">{layer.num}</div>
              <div>
                <h3 className="font-semibold text-lg text-[#294532]">
                  {layer.title}
                </h3>
                <p className="text-[#3e5644] text-sm leading-relaxed">
                  {layer.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-[#cfded0]">
        <h2 className="text-3xl font-bold font-[Poppins] text-[#294532] mb-10 text-center">
          🌿 Terrarium Ideas & Design Styles
        </h2>
        <p className="text-[#3e5644] leading-relaxed mb-10 text-center max-w-3xl mx-auto">
          Your terrarium can reflect any mood or setting. Here are some creative
          styles to inspire your next build, from lush rainforests to crystal
          landscapes.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🌧️",
              title: "Rainforest Jar",
              desc: "Dense moss, ferns, and misty humidity for a tropical look.",
            },
            {
              icon: "🌵",
              title: "Desert Globe",
              desc: "Sand, pebbles, and succulents for a warm, dry design.",
            },
            {
              icon: "🌸",
              title: "Fairy Garden",
              desc: "Tiny decor, flowers, and pink accents for a whimsical vibe.",
            },
            {
              icon: "💎",
              title: "Crystal Terrarium",
              desc: "Combine plants with clear quartz or amethyst for sparkle.",
            },
            {
              icon: "🍄",
              title: "Woodland Scene",
              desc: "Add bark, moss, and small mushrooms for a forest-floor effect.",
            },
            {
              icon: "🦋",
              title: "Zen Terrarium",
              desc: "Minimalist stones, clean lines, and calm green tones.",
            },
          ].map((style) => (
            <div
              key={style.title}
              className="bg-white border border-[#d8e3d9] rounded-xl p-6 shadow-sm hover:shadow-md transition text-center"
            >
              <div className="text-3xl mb-3">{style.icon}</div>
              <h3 className="font-semibold text-lg text-[#294532] mb-1">
                {style.title}
              </h3>
              <p className="text-[#3e5644] text-sm leading-relaxed">
                {style.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-[#cfded0]">
        <h2 className="text-3xl font-bold font-[Poppins] text-[#294532] mb-10 text-center">
          🌸 Terrarium Care Calendar
        </h2>
        <p className="text-[#3e5644] leading-relaxed mb-10 text-center max-w-3xl mx-auto">
          Terrariums are low maintenance, but a regular routine keeps them
          looking their best. Use this guide to care for your glass garden
          year-round.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6">
            <h3 className="font-semibold text-lg text-[#294532] mb-2">
              Weekly 🌿
            </h3>
            <ul className="list-disc list-inside text-[#3e5644] text-sm leading-relaxed">
              <li>Check soil moisture and condensation</li>
              <li>Rotate your terrarium for even light exposure</li>
              <li>Remove any fallen leaves</li>
            </ul>
          </div>
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6">
            <h3 className="font-semibold text-lg text-[#294532] mb-2">
              Monthly 🌸
            </h3>
            <ul className="list-disc list-inside text-[#3e5644] text-sm leading-relaxed">
              <li>Trim overgrown plants</li>
              <li>Clean inside glass walls</li>
              <li>Add a few drops of water if soil feels dry</li>
            </ul>
          </div>
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6">
            <h3 className="font-semibold text-lg text-[#294532] mb-2">
              Seasonally 🌞
            </h3>
            <ul className="list-disc list-inside text-[#3e5644] text-sm leading-relaxed">
              <li>Replant or refresh soil layers if compacted</li>
              <li>Inspect for mold or pests</li>
              <li>Add new decorative accents or moss patches</li>
            </ul>
          </div>
          <div className="bg-white border border-[#d8e3d9] rounded-xl p-6">
            <h3 className="font-semibold text-lg text-[#294532] mb-2">
              Yearly 🌻
            </h3>
            <ul className="list-disc list-inside text-[#3e5644] text-sm leading-relaxed">
              <li>Redesign or rebuild your terrarium completely</li>
              <li>Clean all components thoroughly</li>
              <li>Experiment with new plants or themes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold font-[Poppins] text-[#294532] mb-8 text-center">
          Frequently Asked Questions About Terrariums
        </h2>

        <div className="space-y-8 text-[#364b38] leading-relaxed">
          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              🌿 What is a terrarium?
            </h3>
            <p>
              A terrarium is a sealed or open glass container that holds soil,
              plants, and decorative materials, forming a miniature ecosystem.
              It’s like having a small slice of forest that can live on your
              shelf or desk.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              🌱 What’s the difference between open and closed terrariums?
            </h3>
            <p>
              A <strong>closed terrarium</strong> has a lid or airtight seal,
              allowing moisture to circulate continuously. It’s ideal for moss,
              ferns, and humidity-loving plants. An{" "}
              <strong>open terrarium</strong> has no lid, allowing more airflow
              and is perfect for succulents and air plants that prefer drier
              conditions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              💧 How often should I water a terrarium?
            </h3>
            <p>
              Closed terrariums rarely need watering, once every few months at
              most. Open terrariums may require light misting once a week,
              depending on humidity and sunlight. Always check the soil: if it’s
              damp, hold off on watering.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              🌸 What plants work best?
            </h3>
            <p>
              For closed terrariums: mosses, ferns, fittonia (nerve plants), and
              small begonias. For open terrariums: succulents, cacti, echeveria,
              haworthia, and air plants. Avoid mixing plants that prefer
              drastically different humidity levels.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              ☀️ Where should I keep my terrarium?
            </h3>
            <p>
              Place it near a bright window with indirect sunlight. Direct sun
              can overheat the glass and harm the plants. LED grow lights with a
              daylight spectrum also work well for consistent growth.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              🪴 What materials do I need to start?
            </h3>
            <p>
              A glass jar or bowl, small pebbles for drainage, activated
              charcoal to keep water clean, soil mix, moss or plants, and
              optional decor such as crystals, bark, or figurines. Most of these
              can be found in garden stores or repurposed from household items.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              🔁 Why does my terrarium fog up?
            </h3>
            <p>
              Condensation is normal. If it’s constantly foggy, remove the lid
              for a few hours to balance humidity. Too much moisture can promote
              mold, while too little can dry out moss and plants.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              🧪 How long do terrariums last?
            </h3>
            <p>
              With minimal care and stable light conditions, a terrarium can
              live for years. Some closed terrariums have survived for decades
              without being opened. Healthy soil layers and clean water cycles
              are key to longevity.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              🐜 Can I add insects or microfauna?
            </h3>
            <p>
              Yes, some hobbyists add springtails or isopods to act as natural
              cleaners. They eat decaying matter and prevent mold buildup. Avoid
              larger insects that might damage delicate plants.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              🌾 How can I decorate creatively?
            </h3>
            <p>
              Try layering colored sand, adding stones, or placing a single pink
              flower for contrast. Miniature figurines, tiny mushrooms, and
              natural wood pieces can turn your terrarium into a storytelling
              scene.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              🧤 How do I clean and maintain it?
            </h3>
            <p>
              Wipe glass gently with a damp cloth to remove condensation marks.
              Trim overgrown plants using tweezers. Replace dead leaves quickly
              to avoid rot. Never use harsh cleaners inside the container.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#294532]">
              💡 How can I make my terrarium thrive?
            </h3>
            <p>
              Maintain balance: bright indirect light, stable humidity, and good
              airflow. Avoid overwatering and temperature extremes. Observe your
              plants, they’ll tell you when they’re happy by growing evenly and
              staying vibrant.
            </p>
          </div>
        </div>
      </section>

      {/* JSON-LD FAQ Schema */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is a terrarium?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A terrarium is a small enclosed or open glass container that holds soil and plants, forming a miniature ecosystem that recycles water naturally.",
              },
            },
            {
              "@type": "Question",
              name: "How often should I water a terrarium?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Closed terrariums may need watering only every few months, while open terrariums might need a light mist once per week depending on conditions.",
              },
            },
            {
              "@type": "Question",
              name: "What plants are best for terrariums?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Closed terrariums suit mosses, ferns, and fittonia. Open terrariums suit succulents, cacti, and air plants that prefer dry environments.",
              },
            },
            {
              "@type": "Question",
              name: "Why does my terrarium fog up?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Fogging is caused by condensation. Remove the lid for a few hours to lower humidity if the glass stays foggy for long periods.",
              },
            },
          ],
        })}
      </script>

      {/* FOOTER */}
      <footer className="text-center py-10 text-sm text-[#3e5644] bg-[#eef3ef] border-t border-[#cfded0]">
        © {new Date().getFullYear()} AllTerrariums.com, Growing calm, one jar
        at a time.
      </footer>
    </main>
  );
}
