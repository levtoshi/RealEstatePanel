const photoUrls = [
  "https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg", // house
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg", // apartment
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", // commercial property
];

const sampleLocations = ["Berlin, Germany", "Madrid, Spain", "Tokyo, Japan", "Sydney, Australia", "Toronto, Canada"];
const sampleNames = ["Sunrise Villa", "City Loft", "Riverside Cottage", "Skyline Flat", "Cozy Bungalow"];
const sampleCategories = ["Apartments", "Houses", "Commercial property"];

export const estates = [];

for (let i = 0; i < 200; i++) {
  estates.push({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: `${sampleNames[i % sampleNames.length]} ${i + 1}`,
    category: sampleCategories[i % sampleCategories.length],
    area: Math.round(40 + Math.random() * 400),
    price: Math.round(50000 + Math.random() * 2000000),
    location: sampleLocations[i % sampleLocations.length],
    photo: photoUrls[i % photoUrls.length],
  });
}