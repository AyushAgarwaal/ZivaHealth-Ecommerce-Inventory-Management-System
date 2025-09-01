export const calculateTotals = (subtotal) => {
    const taxRate = parseFloat(process.env.TAX_RATE ?? "0.1");
    const tax = subtotal * taxRate;
    return { subtotal, tax, total: subtotal + tax };
  };
  