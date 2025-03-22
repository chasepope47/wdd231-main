import { getParkVisitorCenterDetails } from './parkService.mjs';
import { listTemplate, vcImageTemplate, vcAmenityTemplate, detailsTemplate } from './templates.mjs';

function getParam(param) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
}

async function renderVisitorCenter(id) {
  const data = await getParkVisitorCenterDetails(id);

  document.querySelector('.vc-name').textContent = data.name;
  document.querySelector('.vc-description').textContent = data.description;
  document.querySelector('.vc-image').src = data.images[0]?.url || '';
  document.querySelector('.vc-image').alt = data.images[0]?.altText || 'Visitor Center Image';

  // Gallery section
  const galleryHTML = listTemplate(data.images, vcImageTemplate);
  document.querySelector('.vc-gallery ul').innerHTML = galleryHTML;

  // Accordions section
  const detailsHTML = `
    ${detailsTemplate('Addresses', 'vc-address', 'heading-icon_map-pin', data.addresses.map(addr => `<p>${addr.line1}, ${addr.city}, ${addr.stateCode}, ${addr.postalCode}</p>`).join(''))}
    ${detailsTemplate('Amenities', 'vc-amenities', 'heading-icon_info', listTemplate(data.amenities, vcAmenityTemplate))}
    ${detailsTemplate('Contact Information', 'vc-contact', 'phone', `<p>Phone: ${data.contacts.phoneNumbers[0]?.phoneNumber || 'N/A'}</p><p>Email: ${data.contacts.emailAddresses[0]?.emailAddress || 'N/A'}</p>`)}
  `;

  document.querySelector('.vc-details').innerHTML = detailsHTML;
}

// Get URL param and render
const visitorCenterId = getParam('id');
renderVisitorCenter(visitorCenterId);
