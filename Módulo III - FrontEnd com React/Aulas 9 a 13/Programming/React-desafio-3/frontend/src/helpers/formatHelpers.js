const formatter = Intl.NumberFormat('pt-BR');

function formatNumber(value) {
  return formatter.format(value);
}

function formatPercentage(value) {
  const stringValue = value.toFixed(2); // become just two decimal places

  return stringValue.replace('.', ',') + '%'; // where there's "." transform to "," + "%"
}

export { formatNumber, formatPercentage };