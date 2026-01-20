export function generateMarketAdvisory({ crop, prices }) {
  const advice = [];

  if (!crop || !prices || prices.length === 0) {
    return ["Market price data unavailable."];
  }

  const latestPrice = prices[0].price;
  const avgPrice =
    prices.reduce((sum, p) => sum + p.price, 0) / prices.length;

  if (latestPrice > avgPrice * 1.1) {
    advice.push(
      `Current market price is high (₹${latestPrice}). Consider selling now.`
    );
  } else if (latestPrice < avgPrice * 0.9) {
    advice.push(
      `Market price is low (₹${latestPrice}). Consider delaying sale.`
    );
  } else {
    advice.push(
      `Market price is stable (₹${latestPrice}). Monitor trends closely.`
    );
  }

  return advice;
}
