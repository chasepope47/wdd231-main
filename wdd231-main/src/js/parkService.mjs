export const park = {
  id: "F58C6D24-8D10-4573-9826-65D42B8B83AD",
  url: "https://www.nps.gov/yell/index.htm",
  fullName: "Yellowstone National Park",
  parkCode: "yell",
  description:
    "On March 1, 1872, Yellowstone became the first national park for all to enjoy the unique hydrothermal wonders. Today, millions of people come here each year to camp, hike, and enjoy the majesty of the park.",
  latitude: "44.59824417",
  longitude: "-110.5471695",
  latLong: "lat:44.59824417, long:-110.5471695",
  states: "ID,MT,WY",
  contacts: { /* contacts object as provided... */ },
  addresses: [ /* addresses array as provided... */ ],
  directionsInfo: "Yellowstone National Park covers nearly 3,500 square miles...",
  directionsUrl: "http://www.nps.gov/yell/planyourvisit/directions.htm",
  images: [ /* images array as provided... */ ],
  weatherInfo: "Yellowstone's weather can vary quite a bit...",
  name: "Yellowstone",
  designation: "National Park"
};

export const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: park.images[2].url,
    description: "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: park.images[3].url,
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: park.images[9].url,
    description: "Learn about the visitor centers in the park."
  }
];

const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  const response = await fetch(baseUrl + url, options);
  if (!response.ok) throw new Error("response not ok");
  const data = await response.json();
  return data;
}

export function getInfoLinks(data) {
  const withUpdatedImages = parkInfoLinks.map((item, index) => {
    item.image = data[index + 2].url;
    return item;
  });
  return withUpdatedImages;
}

export async function getParkData() {
  const parkData = await getJson("parks?parkCode=yell");
  return parkData.data[0];
}

export async function getParkVisitorCenterDetails(id) {
  const data = await getJson(`visitorcenters?id=${id}`);
  return data.data[0];
}
