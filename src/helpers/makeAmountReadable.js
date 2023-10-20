export function makeAmountReadable(amount) {
  const amountDecimalNumbers = String(amount).split(".")[1] ?? "00";
  const amountWholeNumbers = String(amount).split(".")[0] ?? amount;
  const arrayWithDetailedNumbers = [];

  for (let i = amountWholeNumbers.length - 1; i >= 0; i -= 3) {
    let chunk = amountWholeNumbers.substring(Math.max(0, i - 2), i + 1);
    arrayWithDetailedNumbers.push(chunk);
  }

  return (
    arrayWithDetailedNumbers.reverse().join(",") + "." + amountDecimalNumbers
  );
}
