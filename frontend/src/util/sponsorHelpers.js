// utility helpers for working with sponsor data attached to events

/**
 * Normalises an event's sponsor information and returns an object keyed by
 * tier name (gold, silver, bronze, partner, other). The incoming
 * `event.sponsors` used to be an array of sponsor IDs; it's now an
 * object with tiers. This function handles both formats for backward
 * compatibility.
 *
 * @param {Object} event - the event object from site data
 * @param {Array} allSponsors - list of sponsor objects from site data
 * @returns {Object} tiers -> array of sponsor objects
 */
export function getSponsorsByTier(event, allSponsors = []) {
  const tiers = { gold: [], silver: [], bronze: [], partner: [], other: [] };
  if (!event || !event.sponsors) return tiers;

  if (Array.isArray(event.sponsors)) {
    // legacy format: treat them as "other"
    tiers.other = allSponsors.filter((s) => event.sponsors.includes(s.id));
  } else {
    Object.keys(tiers).forEach((tier) => {
      if (tier === "other") return;
      const ids = event.sponsors[tier] || [];
      tiers[tier] = allSponsors.filter((s) => ids.includes(s.id));
    });
  }

  return tiers;
}

/**
 * Flatten the values of a sponsors-by-tier map into a single array.
 *
 * @param {Object} sponsorsByTier
 * @returns {Array}
 */
export function flattenSponsors(tiers) {
  return Object.values(tiers).flat();
}
