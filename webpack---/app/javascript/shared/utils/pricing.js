// Price formatting utils
// Legacy code ported over from assets/javascripts/pricing.js

// round down to two decimal places
export const truncate = (price, decimalPlaces = 2) => {
    const re = new RegExp(`^-?\\d+(?:\.\\d{0,${decimalPlaces || -1}})?`);
    return parseFloat(price.toString().match(re)[0]);
};

export const format = (price) => {
    const prefix = price < 0 ? '- ' : '';
    // Even if a number is negative we want it to display
    // positive since we prefix it anyway
    let formattedPrice = Math.abs(price);
    formattedPrice = truncate(formattedPrice);

    // format as a String with exactly 2 decimal places
    // (useful if `truncate` returns a single decimal place)
    formattedPrice = formattedPrice.toFixed(2);

    // add commas every three digits
    formattedPrice = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // add the $. Remove the decimals if an even dollar amount
    return `${prefix}$${formattedPrice.replace(/\.00$/, '')}`;
};

export default {
    format,
    truncate,
};