You are an expert Frontend Developer and UI/UX Designer specializing in clean, modern, high-end e-commerce architectures. 

Act as a lead developer to build a responsive, production-ready frontend for an ornamental plant and garden e-commerce brand named "EleDesigns". 

### 1. Brand Concept & Aesthetic Guidelines
- Brand Name: EleDesigns
- Industry: Ornamental Plants, Pre-designed Gardens, and Custom Landscaping E-commerce.
- Target Audience: B2C retail customers (homeowners) and B2B bulk buyers (project teams, landscape architects).
- Visual Identity: "Apple-esque" high-fidelity minimalist layout mixed with natural, premium organic elements. Crisp borders, subtle drop shadows, and purposeful micro-interactions.
- Typography: Use "Inter" as the primary font family. Font sizes must adhere strictly to modern readability standards (Base 16px, headings scaled proportionally, no extra small/unreadable text).
- Color Palette: 
  * Primary/Backgrounds: Pure Whites (#FFFFFF) and Deep Charcoal/Off-Blacks (#111111) to establish high-end contrast.
  * Accents: Deep Forest Greens, Sage Greens, and Earthy tones to reflect the botanical nature of the business. Use smooth transitions for dark/light hover states.

### 2. Website Architecture & Required Pages
Generate the structure, UI layouts, and components for a complete e-commerce setup, which includes:
1. Home Page (Detailed layout below)
2. Product Catalog / Collection Page (With filters for Readymade Gardens, Individual Plants, and a "B2B Bulk Order" toggle)
3. Product Detail Page (Displaying plant specifications, B2B quantity tier pricing, and an explicit disclaimer: "Ships with a step-by-step DIY Planting Guide. Supplier installation NOT provided.")
4. AI Garden Canvas Page (The interactive platform where users upload their space photos, drop in plants, and let the AI model render the final augmented preview)
5. Shopping Cart & Checkout Flow (Optimized for both quick retail checkout and bulk project billing address inputs)

### 3. Home Page Component Specification
Construct the Home Page using the following 10 structured sections:

---

#### Section 1: Navigation Menu Bar
- Left: Premium minimalist text/vector logo ("EleDesigns").
- Center: Links to Shop, Readymade Gardens, AI Custom Canvas, Individual Plants, B2B Bulk Portals.
- Right: Search icon, User Account profile dropdown, and a Shopping Cart icon with a dynamic badge counter.

#### Section 2: Hero Slideshow Banner
- Auto-rotating, high-fidelity hero banner showcasing lush, minimalist interior/exterior gardens.
- Text overlays with bold, readable typography introducing the 8 signature Readymade Gardens. Clear Call to Action (CTA) buttons: "Explore Readymade Gardens" and "Design with AI".

#### Section 3: Trust Banner
- A clean, horizontal 3-column bar highlighting core business values:
  * "8 Readymade Sizes"
  * "Nationwide Delivery with Detailed DIY Planting Guides"
  * "B2B & Bulk Ordering Available"

#### Section 4: Interactive Before & After Slider
- A side-by-side or drag-to-reveal visual section showing a bare, uninspiring space transforming into a lush, premium curated EleDesigns garden.

#### Section 5: Featured Readymade Gardens (Cards List)
- A grid of highly polished cards showcasing the 8 readymade configurations. 
- Each card displays garden dimensions/sizing options, brief descriptions, price, and an "Add to Cart" or "View Layout" button.

#### Section 6: AI Custom Design Canvas (Asymmetric Bento Grid Layout)
- A modern, high-fidelity Bento Grid design demonstrating the interactive, AI-driven custom layout tool.
- Layout individual grid cells to visually simulate a multi-step workflow:
  * **Cell 1 (Feature Statement):** Bold typography introducing the "EleDesigns AI Canvas"—explaining how users can see their future garden instantly.
  * **Cell 2 (Step 1 - Upload):** An interactive card showing a drag-and-drop file upload placeholder containing an empty backyard or balcony image ("Upload your space photo").
  * **Cell 3 (Step 2 - Select Plants):** A sleek sidebar ui snippet listing individual ornamental plants (e.g., Ficus Lyrata, Peace Lily) with simple checkbox/add states.
  * **Cell 4 (Step 3 - AI Generation Preview):** A large, prominent display card simulating a live canvas window. It shows the uploaded photo with green architectural laser/mesh overlays mapping out the environment, with smart outlines of the selected plants being rendered realistically into the scene. Status text: "AI Generating Preview... Analyzing Light & Dimensions."
  * **Cell 5 (Call to Action):** A clean summary cell with a prominent CTA button: "Launch EleDesigns AI Canvas Now".

#### Section 7: Featured Individual Plants
- A clean 4-column product carousel or grid showcasing trending standalone ornamental plants.
- Includes quick-add-to-cart buttons and tags indicating light/water requirements.

#### Section 8: Frequently Asked Questions (FAQ Accordion)
- Accessible, interactive accordion dropdowns covering crucial customer touchpoints:
  * "Is installation included?" (Answer: No, we supply the premium plants and a foolproof, detailed planting guide so you can easily install it yourself or with local hands).
  * "Do you support bulk ordering for commercial projects?" (Answer: Yes, toggle our B2B interface for volume pricing).
  * Shipping, returns, and plant health guarantees.

#### Section 9: Customer Reviews & Social Proof
- A clean grid of verified customer testimonials, including star ratings, text blurbs, and project tags (e.g., "Balcony Garden - Size M", or "Tech Park Project - Bulk Order").

#### Section 10: Footer
- 4-column organized layout containing: Brand story/social icons, Quick Navigation links, Customer Service / Shipping policies, and a Newsletter subscription form ("Join the Green List").

---

### 4. Technical Deliverables Request
Please output clean, well-commented code for this setup. Ensure semantic tags (`<nav>`, `<main>`, `<section>`, `<footer_>`) are utilized correctly. Ensure the layout handles responsive scaling naturally across desktop, tablet, and mobile dimensions without losing readability.

[Optional: Specify your preferred tech stack here, e.g., "Provide the output using Tailwind CSS and Next.js / React components" OR "Provide pure semantic HTML5 and vanilla CSS3 code"].