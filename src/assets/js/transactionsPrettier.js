export const makeTransactionsPrettied = function (rawTransactions) {
  let prettiedTransactions = [];

  rawTransactions.forEach((rawTransaction) => {
    prettiedTransactions.push(this.transactionPrettier(rawTransaction));
  });

  return prettiedTransactions;
};

const transactionPrettier = function (rawTransaction) {
  let successful = String(rawTransaction["successful"]);
  let block_signed_at = new Date(rawTransaction["block_signed_at"]);
  block_signed_at = dateFormat(block_signed_at, "yyyy-mm-dd HH:MM:ss");
  let block_height = String(rawTransaction["block_height"]);
  let tx_hash = rawTransaction["tx_hash"];
  let from_address = rawTransaction["from_address"];
  let to_address = rawTransaction["to_address"];
  let pretty_gas_quote = rawTransaction["pretty_gas_quote"];
  let pretty_value_quote = rawTransaction["pretty_value_quote"];

  const prettiedTransaction = {
    successful: {
      text: successful,
    },
    block_signed_at: {
      text: block_signed_at,
    },
    block_height: {
      text: block_height,
      routerLinkUrl: "/block/" + block_height,
    },
    tx_hash: {
      text: this.sliceTransaction(tx_hash),
      routerLinkUrl: "/transaction/" + tx_hash,
    },
    from_address: {
      text: this.sliceTransaction(from_address),
      routerLinkUrl:
        this.walletAddress !== from_address ? "/address/" + from_address : "",
    },
    to_address: {
      text: this.sliceTransaction(to_address),
      routerLinkUrl:
        this.walletAddress !== to_address ? "/address/" + to_address : "",
    },
    pretty_gas_quote: {
      text: pretty_gas_quote,
    },
    pretty_value_quote: {
      text: pretty_value_quote,
    },
  };

  return prettiedTransaction;
};

const sliceTransaction = function (transaction) {
  return !transaction || transaction.length < 8
    ? transaction
    : transaction.slice(0, 4) + "..." + transaction.slice(-4);
};
