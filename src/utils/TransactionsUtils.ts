const categories = new Map([
  ["bag", "różne"],
  ["cart", "jedzenie"],
  ["gift", "prezenty"],
  ["cash-coin", "wypłata"],
  ["tags", "ubrania"],
  ["airplane", "transport"],
  ["controller", "elektronika"],
]);

const getTransactionIconByCategory = (category: string) => {
  for (const [icon, cat] of categories.entries()) {
    if (category === cat) return icon;
  }
};
export default { categories, getTransactionIconByCategory };
