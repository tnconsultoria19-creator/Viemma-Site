/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TourPackage, ArtItem, DestinationsDict } from "./types";

// --- Country colors corresponding to tags ---
export const countryColors: { [key: string]: string } = {
  'Cape Town': 'bg-[#4A7c82]',
  'Kruger National Park': 'bg-[#1E8449]',
  'Garden Route': 'bg-[#556B2F]',
  'Johannesburg': 'bg-[#7D4E57]',
  'Zimbabwe': 'bg-[#7D4E57]',
  'Maldives': 'bg-[#C68E17]',
  'Madagascar': 'bg-[#556B2F]',
  'Seychelles': 'bg-[#8B4513]',
  'Mauritius': 'bg-[#8f6a48]',
  'Reunion': 'bg-[#B03A2E]',
  'Zanzibar': 'bg-[#2874A6]',
  'Mozambique': 'bg-[#1E8449]',
  'Victoria Falls': 'bg-[#7D4E57]'
};

// --- Associations Images (updated based on user request) ---
export const associationImages = [
  "https://blogger.googleusercontent.com/img/a/AVvXsEhgctcD50IwVg2La_C3YramwhWHeDShVIrDsRdI-3ZtnY8YoThn9WUxgz7HbziS-hSDuavuPBMPHaV9jRP9Xx3XXVpSF4l4mwf_O-B2iIwcAinfVh1XhWTl-OG1zm9PIZObKeovYOlgA-aHGY-HWoU69Ayqedo6A3VCiHLk4VtrFgCNRNTYI1s_d8u8zK8",
  "https://blogger.googleusercontent.com/img/a/AVvXsEiXCuN5mSC8zl5jeJkH-uk8l6uhrTVTZoPF_NwE4Ltab1d4kWVzhdb6E9QEiD45SvEZiywbSX305wccLet_ILfxO5xqh5eTGwJP6j5C7rTfJMWDPzIzS7KtzKfR706Tm9P65xm7ogf-NP5XkoypBRSwmcmrUDLWJtq_z02j9C5xhny_rzwddfYj4xmEwQ4",
  "https://blogger.googleusercontent.com/img/a/AVvXsEgPwyJfGpwfmU4FzLH1R6qbkBP77-hCEvS-w2NnIlic3ukoAsKCT3Hxp1ZvS9_YmMEy9n0NCc151o2GlPAuyIKImEtNcD8VAOOe4wRmZ22CN1qOXxFP5PEwKo22YzSx3s4uEYI6n_e3VLbeGJvYtRpk4ZG8aGY7G_cAO6OEB1HGbY7iwxnU-ABvWmN3Dl0",
  "https://blogger.googleusercontent.com/img/a/AVvXsEh2rSIMe-dYvqjwhS9wYEcgfKoZdG2MLWzEDnb959VE429sLjF6I55sOC0vs38aENyrgAbZY9v0jtrINynph3a0-YrTsOvUWU45mGzHNcQU_rlGQiUlW8O0eGrMzgk4o8htogKPZx_iif_iTbs6XyHR_8Lgtd3-WMz3QcoXJ6yItshIWP61SSgk5vkgz5s",
  "https://blogger.googleusercontent.com/img/a/AVvXsEh4cQPsHKwQRZmflr281qUlkTzriAqGJohCR0XqjUG8i1Llg3TOuEqMhzcHUtBqxF8hFYfvbKmD1gS81AMs-sTCElncTHCyzc40rys3J0N71srWRbzYCVjMMtqgRpTzbNJtQ4WDWsvgZCmdabhSWCiKXj_6Ag_VWG7-NuPXT0xDifnGzvHt31O6SURUpEQ",
  "https://www.afrogem.co.za/cdn/shop/files/Afrogem_Dark_Blue_a38d7d10-6399-4b98-bf7e-a04e59aad39b.png?v=1754562322&width=196"
];

// --- Tanzanites (replaces African Diamonds & Jewelry) ---
export const tanzaniteProducts = [
  {
    title: "Tanzanite Rings",
    category: "Tanzanite",
    img: "https://blogger.googleusercontent.com/img/a/AVvXsEjk9rHUk24nSR921vobhoS1-qB0LtmLuJvU7UuPf5ItSoxNqMAX1TJD_FLrtL6lLHBJ3VmYecqZDGmD-TEQHEmnf9MuJC0gJdtXwyWefaZMJYO9u-2FqU-oIsLVfj09Q4OgT3DxvYtvggli2Y573D5qHc4z_BRyza-e4BX8mzVLjTmXvzTWHe_IBCDtOOM",
    price: "R 28,500"
  },
  {
    title: "Tanzanite Earrings",
    category: "Tanzanite",
    img: "https://blogger.googleusercontent.com/img/a/AVvXsEg4OY4UDK6PpaZJsZ69T6-N8itDqSK9SYpPjgCy59XER5rDqC8Qe_1_p-qjW-ZYbDzkH5vpiQbqIUY4MHOsDZrdDAs0g38ysPgrxis-aOgBkGS5nPbZBtBMAxfRHOiKqG39OdkXR3bC-05uA_8VdD8carJGugoznL9jA9NoSoofVJFSvM2linibpzrIa1c",
    price: "R 32,000"
  },
  {
    title: "Tanzanite Pendants",
    category: "Tanzanite",
    img: "https://blogger.googleusercontent.com/img/a/AVvXsEjUQWPd06q6_E8wYMtox4Xaha9BQ_hKAhgGakfZIiQeqy2V6JLBbL6WwvNm0iaaKgPxv9Mgb8i1ki6sjioDFvgbnBQClyW8tTQPcVf-2JfSzFqog8Og_ThBSpf0jnSlitP3x7zTmWjpNCNqHZfLwNpNlGtvbx8y9N57FgXoFA1YuLaxfpnwGehCFaqKB9A",
    price: "R 24,500"
  }
];

// --- Authentic Art Items (replaces original images) ---
export const artItems: ArtItem[] = [
  {
    title: "Elegant Lines - Limited Edition Photograph",
    category: "Woodwork with Photography",
    price: "R 12,500",
    img: "https://blogger.googleusercontent.com/img/a/AVvXsEhbbTsJ6MIAEgS1HAIkBTTm0pM8AUMY9C5TM8XNQRH4k2se3Mc1pqoGTx1B3MjRQfWxCzq44IunKrU294VaNryWv1kgQ2TCbhBRUqOy7hCwe9ojjAJ-86Vg_h24S20dliB4nGC6eXPN097qWl2A6u9jK-Ky1ogUHyvdpgNocdtIDsPqAfJhIKblufPk0GI"
  },
  {
    title: "Baby Rhino - Limited Edition Photograph",
    category: "Painting with Photography",
    price: "R 18,900",
    img: "https://rabinowitz-photography.com/cdn/shop/products/Baby-Rhino.jpg?v=1594631281&width=540"
  },
  {
    title: "The King - Limited Edition Photograph",
    category: "Sculpture with Photography",
    price: "R 14,000",
    img: "https://blogger.googleusercontent.com/img/a/AVvXsEhzJe8E4TVXQBhQKDG42-F7Wh0XsRdiPrF5FHgBuw8p9WbGOIVqF6QlmvXDKbWS46Ixgpq0u9scQ6EP4xLQKm4hl7B8pAfHOFdEItBqtCVMRI3DlTKB9o540NgAwH0TLePgXvZTz7yq7Inq-kR5SQr8vN08LT_sfEjifHvBCuzu0NYa4O8P9DQmrJEQERI"
  }
];

// --- South Africa Resort/Tours data (10 items total, Cape Town, Kruger, George, Joburg tags) ---
export const southAfricanTours: TourPackage[] = [
  {
    title: "Table Mountain Escapade",
    desc: "Ascend the iconic Table Mountain via guided hiking trails or cable car, culminating in panoramic vistas of the glittering city and vast ocean.",
    img: "https://images.pexels.com/photos/5800233/pexels-photo-5800233.jpeg",
    country: "Cape Town",
    region: "Cape Town",
    duration: "1 Day",
    destId: "south-africa",
    rating: 5
  },
  {
    title: "Cape Peninsula & Penguins",
    desc: "Experience the dramatic tip of Africa. Navigate the sweeping curves of Chapman's Peak to the historic Cape of Good Hope, meeting the endearing Boulders Beach penguins.",
    img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeIrmHQ5l8Jw7XPpivrAZrKQVw4QoY81J6T-WhuvCLWxeF42xfY4KXdhSmTwOsE79gInwmT1ucW0xvLfS4T_96pNnJzu1_BcSH2ldqbT9ajkDGczFE1C7brjosTd6bBqn5d9S-Jow?key=dnLDELZEuuL9-DEOEYjapg",
    country: "Cape Town",
    region: "Cape Town",
    duration: "1 Day",
    destId: "south-africa",
    rating: 5
  },
  {
    title: "Robben Island Heritage",
    desc: "A profoundly moving journey to the island where Nelson Mandela was imprisoned, guided by those who lived the history.",
    img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXf00p1c4kw_QUfsm7_rQT--x2F358pQ9KbD9uBHTFkJSBtst-hx6YXGjXG7uOl2aitEBQu6cOIP8ruHx4LBcEeGFPmMxV2yNY6tBWoEarXsxzSh4GHUJjF8LycQ6YuDDGkl2Hd-hA?key=dnLDELZEuuL9-DEOEYjapg",
    country: "Cape Town",
    region: "Cape Town",
    duration: "Half Day",
    destId: "south-africa",
    rating: 4
  },
  {
    title: "Stellenbosch Cellar Experience",
    desc: "Sip world-class vintages while exploring the lush, manicured valleys and historic estates of the Cape Winelands.",
    img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800",
    country: "Cape Town",
    region: "Cape Town",
    duration: "1 Day",
    destId: "south-africa",
    rating: 5
  },
  {
    title: "Township Cultural Tour",
    desc: "Discover the heartbeat of Cape Town. Experience the vibrant culture, rich history, and profound resilience of local townships. Explore stories and meet vibrant artisans.",
    img: "https://blogger.googleusercontent.com/img/a/AVvXsEhaiaMY8V5QfDg3Oa-VztDsf_jxRunLrrh4-m7SBV9YDojDYZSUJHh7sLJEPWSUYNf6RUHJCBjheQGL-yQ9TGdphMRifaNPXfcswS5Eob2PfJJRfdrEwgowQwL6EAvw63KeYov1ZWItZc-iiK9-yGfP8m3Hi2cpNgCGedkv0GD1KxiOEoG-uPHY3VnaT_o",
    country: "Cape Town",
    region: "Cape Town",
    duration: "Half Day",
    destId: "south-africa",
    rating: 5
  },
  {
    title: "Kirstenbosch National Botanical Garden",
    desc: "Stroll along the spectacular Boomslang Walkway through the treetops, enjoying breathtaking views of Devil's Peak and Cape Town's natural flora.",
    img: "https://www.oystercollection.co.za/wp-content/uploads/2025/05/boomslang-walkway.png",
    country: "Cape Town",
    region: "Cape Town",
    duration: "Half Day",
    destId: "south-africa",
    rating: 5
  },
  {
    title: "Kruger Big Five Safari",
    desc: "The ultimate luxury safari. Traverse South Africa's premier wildlife reserve in open vehicles, encountering lions, leopards, and elephants.",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800",
    country: "Kruger National Park",
    region: "Kruger National Park",
    duration: "4 Days",
    destId: "south-africa",
    rating: 5
  },
  {
    title: "Sabi Sands Private Reserve",
    desc: "Exclusive luxury lodges in a private concession famous for unparalleled leopard sightings and off-road tracking.",
    img: "https://www.sabi-sands.com/assets/img/singita-sabi-sands.jpg",
    country: "Kruger National Park",
    region: "Kruger National Park",
    duration: "3 Days",
    destId: "south-africa",
    rating: 5
  },
  {
    title: "Garden Route Coastal Drive",
    desc: "A scenic coastal journey exploring ancient forests, serene lagoons, and the charming elegance of George and Knysna.",
    img: "https://www.go2africa.com/wp-content/uploads/2018/11/Fancourt-Clubhouse-from-Montagu-Golf-Course.jpg",
    country: "Garden Route",
    region: "George",
    duration: "4 Days",
    destId: "south-africa",
    rating: 4
  },
  {
    title: "Johannesburg Urban Roots",
    desc: "Dive into the heartbeat of SA. Visit the vibrant streets of Soweto, the Apartheid Museum, and burgeoning cultural art hubs.",
    img: "https://www.jarattours.co.za/wp-content/uploads/elementor/thumbs/Jarat-Tours-0466-e1639736676617-pk77rm6blqkryzw6hlj75oxoqvc4zaqgfvjp01omfc.jpg",
    country: "Johannesburg",
    region: "Johannesburg",
    duration: "2 Days",
    destId: "south-africa",
    rating: 4
  }
];

// --- Victoria Falls Tours (exactly 5 in a row) ---
export const victoriaFallsTours: TourPackage[] = [
  {
    title: "Chobe Day Trip",
    desc: "Experience unparalleled wildlife viewing on a day trip to Chobe National Park.",
    img: "https://wildhorizons.co.za/wp-content/uploads/2024/05/Hero-Banner-1920-x-1080-px-33.jpg",
    country: "Zimbabwe",
    region: "Victoria Falls",
    duration: "1 Day",
    destId: "victoria-falls",
    rating: 5
  },
  {
    title: "Helicopter Flights",
    desc: "Take to the skies for a breathtaking 'Flight of Angels' over the majestic Victoria Falls.",
    img: "https://wildhorizons.co.za/wp-content/uploads/2024/04/Hero-Banner-1920-x-1080-px-9-1.png",
    country: "Zimbabwe",
    region: "Victoria Falls",
    duration: "Short Tour",
    destId: "victoria-falls",
    rating: 5
  },
  {
    title: "Zipline in Victoria Falls",
    desc: "Experience the ultimate adrenaline rush zipping across the spectacular Batoka Gorge.",
    img: "https://wildhorizons.co.za/wp-content/uploads/2024/04/Zipline-hero-banner-1-2048x1362.jpg",
    country: "Zimbabwe",
    region: "Victoria Falls",
    duration: "Short Tour",
    destId: "victoria-falls",
    rating: 5
  },
  {
    title: "Zambezi Sundowner Cruise",
    desc: "Relax on a luxury cruise along the Zambezi River while enjoying a spectacular African sunset.",
    img: "https://wildhorizons.co.za/wp-content/uploads/2024/03/Hero-Banner-1920-x-1080-px-22.jpg",
    country: "Zimbabwe",
    region: "Victoria Falls",
    duration: "Half Day",
    destId: "victoria-falls",
    rating: 5
  },
  {
    title: "Victoria Falls Day Trip",
    desc: "Explore the rainforest and viewpoints of the magnificent Victoria Falls on a comprehensive guided tour.",
    img: "https://wildhorizons.co.za/wp-content/uploads/2024/05/Hero-Banner-1920-x-1080-px-34.jpg",
    country: "Zimbabwe",
    region: "Victoria Falls",
    duration: "1 Day",
    destId: "victoria-falls",
    rating: 5
  }
];

// --- Mauritius Resort Data (10 default cards, Sugar Beach and Radisson upfront; other loaded via Arrow indicator) ---
export const mauritiusResortsAll: { name: string, img: string }[] = [
  { name: "Sugar Beach Mauritius", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfZCupGIhfaNykT8h8shnLbYw9ULDlGqPO1xSEb7LlOiLQ00bWEsK9jJEoi1ClpuylElpAEJWoe3uRZUDLUpOBGVyeU6LWWukx6JVg47SJAsRifz1GXqWsrwJi9NyAnpDb5bTUtaQ?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Radisson Blu Azuri Resort and Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdAMWd2nKaNYF3XrxpvAHYmohIkNEeQFQL7qG7KgI70UeQcdSFmpuFhRbND8JKaEwVcR2RXbkrI9R7yC1ld-ON_9aeVmGefgBiSe4bI3lp0UEX67jk4BiNCaNbqnNWzaSRl1EwbRw?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Radisson Blu Poste Lafayette", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfWXMgQDTOtJMeYrNxScTubN5zVG4mwsdu-xaXTc3CKAbOSPjLo-P_DUY68r1b_9Ca0bkHHfhzmplMqjatn6efHwnxQwoIEFKfu04ThiOf45joFjo8_dxKzEe8zmQhXfFmV6ihEXQ?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Veranda Tamarin Hotel and Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcW2Oohh2CmTdPxt2djquF36KwrmfW_llhTcNZquCocrQ9ojIzeHnoG09AxRWXYZS-BbC5SrRjssfscOYicM3xRGX1uo8XbGaGKS3-gWxxj_Q61zp84wKkPq6Lqockm2qD_dTAQvQ?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Preskil Island Resort", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXd0JorbFj2Mb7SSgzVVStFyX_o8DGFz_98empUJexgVlAzSKEpN54BpRpTJp6jpUApgeoq1wq7qgu3i9vsXRSYZOfgafrv8_nFt30K7wl3oBgBb-W-uVB7Vl1ci3thr178HTXxYUg?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Riu Turquoise Mauritius", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdNJPaNF4kCI9FfhcEWSYPjmfqsbDcr4KYKVa5Li-ipqDCTBvIPrX5UZgR3FeMIsQYeJCA7wEWCqD6eWzG4aLg1q9s8doprjozvvmOE5d_vxxxKqQYnG4MBmLMREPjeQ5DETy_efQ?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Veranda Palmar Beach", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXe4qFnLCUbvc5fuBvu0hfC6r6Zt0Al_CYLFGxmUHzevXdXb8tEya93yVMJEiCDs8O9R3TibCfbk-ZA_ERm-3B9NBhQcnX_NZpyCNxUwjdgmtyHFoRohvZe9pLy07u5kBWAfrK50?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "La Pirogue Mauritius", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXf5vLG4a72MyLR08NZzlMaMJyqZDQx-hJkBuf9PP2pB_Ecwjr_3uX8TOVUZbX1UN_A4H6TmLPP0jJ62W4RdcT9sBc3zppj61WQPP3mOZs7vshIKmRu25N8VuS-uKy16es3kLpQA?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Veranda Grand Baie Hotel and Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXd70Z6PpFBACZH2yJv1O3z9tZTYiVBDUbnawFXpEerH0Z3HpVBrMwjraHyVwVmfM93eZp8urUdFWDhx3MgFdmqxGVXZcD6saXCoDaUmJS0KNBIhRuLQAibMQB7NU6CWqSb4WupCiw?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Hilton Mauritius Resort & Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXf3tlEAMmbFaYC2AqvPzUousA8eGc2zB7SGqzaGUFolEFO5d2EpmKRJNGnNA3FNtviRZMNaJ1mECu18mtnSqHCV_6nh-ibwDtva1SBILLjoB5uYDT-IwveyN9vZjTpHxBUxuW8h?key=dnLDELZEuuL9-DEOEYjapg" },
  
  // extra items to display on "Show More"
  { name: "Veranda Paul et Virginie Hotel & Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcuplfYLT54s2mGTz_6bdJGaLuKK8PMdJccHAmXO-WcVjALYAOjofFMDxUgyCpZYwvVSO3GNojmRmMJ4mHc6U1_M_uEgwH1bjDB6FiXs5UcytM3rQka1qeRKCXL0JTQ4ZC6R9BU-A?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Pearle Beach Resort and Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcpP2NVHoNs7yY7jyLn_GPqoY57irNQUDPRVxyNozJ4Sv9P-IQ_796a9Qbo_axabkNyycBKOckjKDouJN2zY21_3S7ouvN8myN7g4eOuqW6Q1O2awSR39F1uoNIjNe4yHGLQ4vyWQ?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Crystals Beach Resort Belle Mare", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfii9ZUjV6F9vMGoQgYwkbeiP05SjONuEheEWeGQXFTRIkuvURrJSygHLIlehzYzp914LEL4hawR_C9KXbWeJR6yAmsd1sp6ikiZvTZfNPHLBeRKSjdrVRnrJRLdynZPK6_NsFXtA?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Solana Beach Mauritius", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcSVu44SR-9lDp-GD0ap1PY5fWSxh_kf5fnfUc9O8kj74d7gvjXytzo8CEc4sJEv6Fl4-HDm7bgYDipUNAyU6dmHskkwmjHTwUxi6sbnFHc7iZyUY4f2jJLchBeIbSw0-vWUocPpw?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Ambre Mauritius", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfGc6lQq4S_Ix_GIbhoqZuC-2HmuP8Bhziju20CR68PD80DxlyMVaglyFSiyRh6Br8Ja_R4JbtCdCzm8h466_buwKdZWOm1y9vhRDwOdUN5gP7y2sPeaqKNzHp_ZeTRsHXZUzTq2Q?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Veranda Pointe Aux Biches", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdS3a8S8-nvApvyH467PGsZFZ63qL9nVU-kCDBSy1Bvv9TtbAW_VXAMjB3J6qT4GdC9BuhWcXYkh0JmWPpGg7R6k-ZAwoKtEuaproFch87DP359kCkCkzuhYLJjAs4UuEcxluEulg?key=dnLDELZEuuL9-DEOEYjapg" }
];

// --- Zanzibar Resort Data (10 default cards, 5 in a row; other loaded via Arrow indicator) ---
export const zanzibarResortsAll: { name: string, img: string }[] = [
  { name: "Aldiana Club Zanzibar Kwanza", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdoqm_HzJtL1pJLX3X4937J9t2Ns8hjdNuzOdS_5UZyu4fgAdsH3GJ5ihv5yJFJYtLkEr2G-qBMmP6fkibfopie8-GiDfcJfg6chhANiqaSIdT5BLtpcNMZetn7oVetK9ZeeviSxbS9yB7-_6v3aXoqzuGV5Q?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Riu Palace Swahili Zanzibar", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcR0Xu43y4nQ79fsuk_wmWtFqRF5ngn9Ec4S8BURzVgNOLLYgnzriMCI6YEV0AMdkXwqaBaQiRAp5XAndx_Ek2tsoQYl1NdbGd52uAJ1oKdMjxjRLYIdG-HeURHpaPpTipvIqYqVdcWnduSRsS5brSngbh8Q5A?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "The Mora Zanzibar", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXepD9FGeMxSweJ-dCZefw34hbNjssEI6nzQ6VzPk2XCCwf-QEGEZZXZHpsytTxcwWdKUIJuqIbgMWLR5GMT9cn3b6Z3elhKejqhwovtQeRJ_m3c6yr3EioZks_D_TZRNM8vOOJLqScVss25xGM48yn2XlYsdH0?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Toa Hotel & Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcl-mrRNkpDsuZ1tqbGGyPM78oU6vB_PG_T7Y-xgc39s8yGTnyNng9lmr8dN6k0_1eb9R0gxQ2bOtAJgCOJMGqy-mPTL6HvXccpjrJJB6KSgW3VZ3vwNxUXMT2pAxMzCSw2KDXFf0oVeT20kgnQ6s4GciOvGfM?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "The Residence Zanzibar", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXclPfM2o013M9oQGhWUomxy7K7Th-cMcCWl1YUqQaaD02JYLRhD9W2eigT_MHvl1PpXxAfaXuwdOPXCEyu0T6O69b6buPDtsPqTWAvlUXQw6i2raS6r35xO8J9QC_9g5PrQZsOrTclRduxSEXPhtPYhqrDikWI?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Hotel Riu Palace Zanzibar", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXePZz6NrF4K1cyNsxeqXYg7rz5DxclXv7mCm5JVsYTWWFwrt-3kqIz6wJpU10rbZjklA1JuKJ5Ym9C1aUtmzsZ8QY1MdpGsDXgqc4ISlYSv2BUsJoqx1AEahNshNLvvT2MPOZDjqgMu8oxL8xBfnmq4sufBiVk?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Melia Zanzibar", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdRvA38B0aP0T5KLiakSxT7-OcdjbFW-nMf8y_kNfDWxN-9QiU_gj40neZjf_XYfy_y-dTJO73I8jjlt5AcGsgO18WgneQIZPvOsc9x4Y5I6D1D-n_-HJc12e4S9mn1RRWMzC79Fw4rGN1pwTq1Uoe1bB6gvuA?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Riu Jambo Zanzibar", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeJ5ZOQBuYcvmMOIUbbpJaJ_Z_DkWRiwtYcWv57e7jtWZoyZ91e8PjtodOoZXKvNH7tQAOd1PYPNwj8WOMKV9AqTrWVDhGnAZFFqbVz6_cFpcG2UVq9bazbzjBaKAHmzGpsmqEabYLaA_MacETN86rOoOShJlI?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Ocean Paradise Resort & Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcA2tC_-B7ry3qsr8KMSGMe3nT7FjBpor7Q6pHn8ODl8UbvBGHAtp3CXKm71P1gaOGdXyjRpGrVae82zk15dVNmil3DqU1gI8A3uBdltoIBdli2rIw_BIyhANr8TXHungvA407Xnnqg2DjvxLGHeVpzjCsAsgQ?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Neptune Pwani Beach Resort & Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdWHdkV76CQDbLq8dh4uFj9EB-AHkprfMhekBfevd2JOEXf84cWIbVBry0uidL6Ph7YusSUWrW8mGoyzfxobKbOJLn892BInoq5s_1pVY7cgGWknvi3gHNysxt_b_bguJ6raFmL7CZKOgMXOsjY2lcWRNVmCAQ?key=6kAtpWuOkRMcYwiQ32FevA" },
  
  // extra items
  { name: "My Blue Hotel Zanzibar", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXci3scXG8WpI7ls3Rflh5-_rVPT1KDXOn_ALX_9PU-bvimF-CIMAX0c2SFkxnEWxIrOnk6asGWVrX2FBsg3wNQ4GDDNpvTdptEgpok_NqZWDcdwiIHhASllnVofv-D4MEX6YDa9Zk-AR0rC3k21C2ySWSIRAU8?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Zuri Zanzibar", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfFguO6qEaJKYE7IBCbOXcpGMOBMnr5Bd48FPVif6uZccx68iIrggQ9dxo3185iWtW4renBEdBK5VAo3kby1ALCBbDUthINBzzQQ7YCfMDV5idYOgDv-KEGWYpFIhT-BXs1OHQqtgPVLz9UEsHsK67kVLGyGxY?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Sea Cliff Resort & Spa Zanzibar", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXccpmKV8ROwKz5X2nRm94NV4-bbV-tZutAQK-fQNcyqiqT6NmphiYbXj8fUkBLYSOD11NF_6CDkASv4FmnrK2_dhJb6FbBNPxWV7aaDLWhD94uQUCj03z8oBDO_E6gm9VBdBjVjmtgPxg8JsyjdiwlORY3v1TI?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Karafuu Beach Resort", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeftCIQW6ozRIZDpPklxyXxbhe03uhse91e5sEX7hXkGS-xA938N_dE_nsUv62JwlKuE8zXDbcE3u8v-DLlA-4RYjw_kUrVm0GZ5lRjqiEpV06kCOJAiZXtaRTWM67E4RFVRH8yoXhudNKKHSHemNXdzrRwgQ?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Gold Zanzibar Beach House & Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXepwF91y7yWHCrBmPT1TKc8nq5G9Asr-9ukCdxr6NFHL_pdGoMy784gTL4SYXO_cHdRPwPdR5A6RlTu06Zn71rMRYYpNXBOFk0LBd-8hjPnDoKYMir9AHcRtPAcTtnwxi3lkh2e2uVPrZzL4B5M6kRe6JgvZgw?key=6kAtpWuOkRMcYwiQ32FevA" },
  { name: "Tulia Zanzibar Unique Beach Resort", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdW3DLVEHgQTPTlXld2Y-G-upnEgK3JoDjCBVIXUsB7qY2QMvuiG6TpK1lECPZZoJjSQvBcgb4IyijJ1nWZ4f3_z1_R6TDd5tO8LPeVY7_vGAokxdzZWcoze-g54xGKKSHSDQQzyXHMLPwAGQt_nDaEXtBD5GM?key=6kAtpWuOkRMcYwiQ32FevA" }
];

// --- Other Destination package builders ---
const helperBuildResorts = (list: {name: string, img: string}[], country: string, destId: string, defaultImg: string): TourPackage[] => {
  return list.map(item => {
    const rating = item.name.toLowerCase().includes('3-star') ? 3 : (item.name.toLowerCase().includes('4-star') ? 4 : 5);
    return {
      title: item.name,
      desc: `Experience unparalleled luxury and breathtaking coastal views at this exquisite ${rating}-star destination.`,
      img: item.img || defaultImg,
      country: country,
      duration: "7 Days",
      destId: destId,
      rating: rating
    };
  });
};

export const seychellesResortsAll: { name: string, img: string }[] = [
  { name: "Kempinski Seychelles Resort", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXd4xaH98fElxkXCruN9AEAYWs8vxuhvjhz6Ow-rLQFeCQe6VILTz-KbxTpflNVUu8TpiSgWt5Tt5IwjDlmXJd6qCRIpDd4__GAFcDybxzXzbgt8eOM9PPf96wW2xgdcIGstq_NmUVRIvy6ZWZ1g3sb7vJ6juA?key=rXEmYkBYBFDf7qUdpvXYAw" },
  { name: "Coral Strand Smart Choice Hotel", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXc3sfmGTGWE8O3QXVKmg8o_tt76McT07dVyRtv3sDgeiUMdMxMV_H9oDOT8U_PwZdY7o7u7svZiqBMZwe1JhoJIAv0FSgqvIPDcG-lL0YIWHxDf703DR25tSXA6i3doahz9MDWpfo3E0OxnlcUkzeas5cyF7Q?key=rXEmYkBYBFDf7qUdpvXYAw" },
  { name: "Carana Beach Hotel", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXchSFfhK4EqJpB2Dkra8L8aS00f39q2dMuCT-1FJ1mh1MJiyEzBrSsGXxUSat-ua52fyxkUUigWJAyTuonAiCzGUOCvsP6jBhZnUPjBSILjQ0YN3zmFQTlFjK8wo2WM1w0qwrVPh3LwXNXIeqv8D9zJ2NQh9g?key=rXEmYkBYBFDf7qUdpvXYAw" },
  { name: "Berjaya Beau Vallon Bay Resort & Casino", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcw78_iMDtwn0eGJZI6IS3ICFniuFhz2nNYhh2_SWJSUzuNXly7-pD0dARlMQeAwrk6-0xhW8UZXSBWr4gssHu1tCxcuyRP6HN27PS1mDslx9lrjcp7zk7p5rBjZt6KN2rdnqJ89ekT3_R42n2_3uUWGhuTWuY?key=rXEmYkBYBFDf7qUdpvXYAw" },
  { name: "Paradise Sun Hotel", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcWnEYb-djLXKXFMGm7HAFboAhUBxCeKSYEp7cthf5ETvoc1jD3wLFqZf3sAFyKfh8hQs7oUDfFSVI587fzz7sQSJWAwXxLtYxNFXcmfxvOeMnli-xOL_K2byx1_RjDtSTsCaeJ7R5TQP3sjlQNi1IaeZDO1YQ?key=rXEmYkBYBFDf7qUdpvXYAw" }
];

export const reunionResortsAll: { name: string, img: string }[] = [
  { name: "Le Dina Morgabine Saint Gilles – Reunion", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdlxfoIBU1_3NMYKamkx5LLOMEzxk7dYFPf_kVKAg0hIr1v9J2nQwDPMYm59jaDcUYoUWK2RDGFKPoNViSCFL9exKg9f54butsbJC0L0P_pzglI9ZwZbVa-FAk8zxkvOd7GXLIb_I1AeW5fyu9jMh1R04Skbg?key=RIH37gHge56axv5zwYVJzQ" },
  { name: "Le Saint Pierre", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeS1bJa2sUpGEbrB-yPGBdw6QbO0ScapXmU19h79CX2wrHBhkwKHfJiZNopKLie7-iwMAT_uXyQLIuGZWsdHCPhuTSgieRhtEtWGEZFZLWczkyTUrw6uUqSmAFQjWGUCDnOXQJ5N6w32nFc8cLLPYN4C4yUnA?key=RIH37gHge56axv5zwYVJzQ" },
  { name: "La Villa Delsile", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXeq2LxZMMwBKi8tOX726zId0DTvoBmxAGUZuZBDJ9ojB3Z_8MY1qDe6uwcKyCABaBFjVPGrFA3NE8nWomMl0ZQWi8phKF9FGVyQiaZWJJWvGCCGvPRE6WiP0sUmyuC9DkGYt9Rc3FGHm0ku51z_vVOgOGs-tNY?key=RIH37gHge56axv5zwYVJzQ" }
];

export const maldivesResortsAll: { name: string, img: string }[] = [
  { name: "Komandoo Maldives Island Resort & Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfJiGxd0bsKDBoKyUHCsPPM5MqBi6vdJ54p-8RF_Fn8trnAjFcHoiqXH_zjZ9BIuA4MWVY3wP6uWXRwbiamVb2fM0yLkJh5_smR-BU8i0v5QcebWcYhdF5hA3W93pcSeJg5P3UR?key=EbxwEktmvzgK7QhF3tiu_Q" },
  { name: "Veligandu Maldives Island Resort", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfujaFmYlRGgKxp9DreJZq4GsdOuEndETOR6-AWChkHVUxeiS6hoh-X1Iu4Wj-l1NieRDOHPq-DeQzKXIbw0WONvYtHI0e9PBVi5M-hSjGHAqUmJAlFLCNwBfdxcNLsuLUZU9TMHQ?key=EbxwEktmvzgK7QhF3tiu_Q" }
];

export const mozambiqueResortsAll: { name: string, img: string }[] = [
  { name: "Azura Marlin Mozambique", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXf_TVVv6wcfZaSXLdX8XXb0jaoRHeR0P6aStbiNkMbnihVys5nKpEhbdefphMIi4oo4xt0FCe9aVadf90jajyu4hSSS9skKgtMStoGSLyRTlqyPAWHnwFNAAl3F4rX3p4i4Bq5zNtuVmEQwNZC-xAb018ufJyY?key=WdxWCa_QhM0jS4V6GQa-dw" },
  { name: "Machangulo Beach Lodge – Mozambique", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfTJsGL2JmxSt7mOWimgsOOAsyJ7HaDA3Z6S6Ldd8LWdw_n5UVyZK1Go5skLDwMM0v5GTk8Fl2IqFMcYuTjBOK0Dyv0Fc4DIMzK-Hx084eYJHmHjc3Law6RIvxEoJ_nOoel7yTE0YJqzHyid69ZYnz8TlkqRyM?key=WdxWCa_QhM0jS4V6GQa-dw" }
];

export const madagascarResortsAll: { name: string, img: string }[] = [
  { name: "Royal Andilana Resort and Spa", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfuQFyi8eHiYmkSN_-O7AX1b8iIi9xbgb1s2MJsIhaRy1xDJJJEWM9hUtG37xB6QFkMxRRP84p7MZZrf0udMtM3nF2yb01dIX_6vX3Gq_e3bwHEh632RIK3WGNXu8TvH-NHt0IA?key=dnLDELZEuuL9-DEOEYjapg" },
  { name: "Constance Tsarabanjina", img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfq9R64fjY9gauyX62Ry9Drw4r9EjfEkF8QINQiifdWsJF2zYk2HI2p7PsgWORHh54rJHJf1Pol6sBdmZaosrh_eXjvgMBfk-2ciREqcuPjsQebIzbhFX8XCRehAcWJNjkuY_K4Bg?key=dnLDELZEuuL9-DEOEYjapg" }
];

// --- Consolidated tour package database ---
export const allTourPackages: TourPackage[] = [
  ...southAfricanTours,
  ...victoriaFallsTours,
  ...helperBuildResorts(mauritiusResortsAll, "Mauritius", "mauritius", "https://images.pexels.com/photos/14802795/pexels-photo-14802795.jpeg"),
  ...helperBuildResorts(seychellesResortsAll, "Seychelles", "seychelles", "https://images.pexels.com/photos/6726419/pexels-photo-6726419.jpeg"),
  ...helperBuildResorts(zanzibarResortsAll, "Zanzibar", "zanzibar", "https://images.pexels.com/photos/7101641/pexels-photo-7101641.jpeg"),
  ...helperBuildResorts(reunionResortsAll, "Reunion", "reunion", "https://images.pexels.com/photos/50594/sea-bay-waterfront-beach-50594.jpeg"),
  ...helperBuildResorts(maldivesResortsAll, "Maldives", "maldives", "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=800"),
  ...helperBuildResorts(mozambiqueResortsAll, "Mozambique", "mozambique", "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=800"),
  ...helperBuildResorts(madagascarResortsAll, "Madagascar", "madagascar", "https://images.pexels.com/photos/7506100/pexels-photo-7506100.jpeg")
];

// --- Destinations details (Botswana completely removed) ---
export const destinationsData: DestinationsDict = {
  "south-africa": {
    title: "South Africa",
    desc: "A world in one country. From the iconic Table Mountain in Cape Town and the lush botanical walkways of Kirstenbosch, to the raw African wilderness of Kruger National Park, experience unparalleled beauty.",
    img: "https://images.pexels.com/photos/9097069/pexels-photo-9097069.jpeg?auto=compress&cs=tinysrgb&w=1600",
    faqs: [
      { q: "Do I need a visa for South Africa?", a: "Visa requirements depend on your nationality. Many tourists receive a 90-day tourist visa upon arrival. Please consult your local embassy." },
      { q: "Is it safe to drink tap water?", a: "Yes, tap water in South Africa's major cities and luxury lodges is generally safe to drink and of high quality." },
      { q: "What is the best time for a safari?", a: "The dry winter months (May to October) are considered the ultimate time for game viewing as vegetation is lower and animals gather around water sources." }
    ]
  },
  "victoria-falls": {
    title: "Victoria Falls",
    desc: "One of the Seven Natural Wonders of the World. Experience the majestic 'Smoke that Thunders' on the mighty Zambezi River with exciting aerial and coastal options.",
    img: "https://wildhorizons.co.za/wp-content/uploads/2024/05/Hero-Banner-1920-x-1080-px-26.jpg",
    faqs: [
      { q: "Which side of the falls is better?", a: "Both sides are spectacular. The Zimbabwe side has more viewpoints and year-round water flow, while the Zambia side allows you to get closer to the water and visit Devil's Pool during the dry season." }
    ]
  },
  "mauritius": {
    title: "Mauritius",
    desc: "A tropical island paradise known for its pristine beaches, turquoise lagoons, and the finest collection of luxury resorts in the Indian Ocean.",
    img: "https://images.pexels.com/photos/14802795/pexels-photo-14802795.jpeg?auto=compress&cs=tinysrgb&w=1600",
    faqs: [
      { q: "What board bases are available at the resorts?", a: "We offer tailored Bed & Breakfast, Half Board (Breakfast & Dinner), Full Board, and highly comprehensive Premium All-Inclusive packages across our resort collection." },
      { q: "What defines a 5-star resort experience in Mauritius?", a: "5-star resorts provide the ultimate luxury with private butlers, expansive villa accommodations, world-class extensive spa facilities, and premium fine-dining options." },
      { q: "Are water sports included?", a: "The vast majority of our 4 and 5-star resort partners include an array of non-motorized water sports (kayaking, snorkeling, paddleboarding) on a complimentary basis." }
    ]
  },
  "reunion": {
    title: "Reunion Islands",
    desc: "A spectacular French department in the Indian Ocean, revered for its incredible volcanic landscapes, lush rainforest cirques, and coastal elegance.",
    img: "https://images.pexels.com/photos/50594/sea-bay-waterfront-beach-50594.jpeg",
    faqs: [
      { q: "Is Reunion suitable for a beach holiday?", a: "While Reunion boasts beautiful lagoon beaches (especially on the west coast), it is primarily renowned for its dramatic landscapes, active volcano, and world-class luxury hiking experiences." },
      { q: "Should I rent a car?", a: "Yes, hiring a vehicle is highly recommended to fully explore the island's majestic cirques, volcanoes, and coastal roads at your own curated pace." },
      { q: "What language is spoken?", a: "French is the official language, intertwined with Reunion Creole. English is accommodated in most of our 4 and 5-star resort selections." }
    ]
  },
  "zanzibar": {
    title: "Zanzibar",
    desc: "The exotic Spice Island off the coast of Tanzania. Discover the rich history of Stone Town and unwind on pristine, palm-fringed white sand beaches.",
    img: "https://images.pexels.com/photos/7101641/pexels-photo-7101641.jpeg",
    faqs: [
      { q: "What is the best time to visit Zanzibar?", a: "The optimal times to visit are during the dry seasons: from July to October and from December to February." },
      { q: "Do I need a Yellow Fever vaccination?", a: "If you are traveling from a country with a risk of yellow fever transmission, a certificate is strictly required. Please consult your travel healthcare provider." }
    ]
  },
  "mozambique": {
    title: "Mozambique",
    desc: "An unspoiled coastal sanctuary known for the Bazaruto and Quirimbas Archipelagos, offering world-class diving and opulent private beach retreats.",
    img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1600",
    faqs: [
      { q: "Do I need to take Malaria precautions?", a: "Yes, Mozambique is a malaria area. We highly advise taking necessary prophylactic medication and utilizing the provided mosquito repellents." }
    ]
  },
  "maldives": {
    title: "Maldives",
    desc: "An archipelagic paradise situated in the Indian Ocean, universally celebrated for its ultra-luxurious overwater villas and vibrant coral reefs.",
    img: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=1600",
    faqs: [
      { q: "How do transfers to the resorts work?", a: "Depending on your selected island's distance from Male International Airport, you will be seamlessly transferred via a scenic seaplane flight or a luxury speedboat." }
    ]
  },
  "seychelles": {
    title: "Seychelles",
    desc: "An exclusive archipelago of 115 islands, famed for its surreal boulder-strewn beaches, vibrant coral reefs, and untouched nature reserves.",
    img: "https://images.pexels.com/photos/6726419/pexels-photo-6726419.jpeg?auto=compress&cs=tinysrgb&w=1600",
    faqs: [
      { q: "Is island hopping easy?", a: "Yes, highly efficient fast ferries and short, scenic domestic flights make transferring between the main islands (Mahé, Praslin, La Digue) effortless." }
    ]
  },
  "madagascar": {
    title: "Madagascar",
    desc: "A massive island nation off the southeast coast of Africa. A sanctuary for thousands of unique animal species found nowhere else on the planet.",
    img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfuQFyi8eHiYmkSN_-O7AX1b8iIi9xbgb1s2MJsIhaRy1xDJJJEWM9hUtG37xB6QFkMxRRP84p7MZZrf0udMtM3nF2yb01dIX_6vX3Gq_e3bwHEh632RIK3WGNXu8TvH-NHt0IA?key=dnLDELZEuuL9-DEOEYjapg",
    faqs: [
      { q: "Are guided tours required?", a: "Due to the wild infrastructure, traveling with our experienced local luxury guides is highly recommended to ensure comfort, safety, and exclusive access to the national parks." }
    ]
  }
};

// --- Immersive Escapes Slide URLs ---
export const immersiveEscapesImgs = [
  "https://images.pexels.com/photos/36168135/pexels-photo-36168135.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2677849/pexels-photo-2677849.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/35672988/pexels-photo-35672988.jpeg?auto=compress&cs=tinysrgb&w=1200"
];

export const immersiveEscapesReels = [
  "https://www.instagram.com/viemmatours/reel/DTFxQCNAjld/",
  "https://www.instagram.com/viemmatours/reel/DRpWnL8Ao5x/",
  "https://www.instagram.com/viemmatours/reel/DRmM5z9Ap5Y/"
];

export const sarsLogoBase64 = "data:image/jpeg;base64,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";

