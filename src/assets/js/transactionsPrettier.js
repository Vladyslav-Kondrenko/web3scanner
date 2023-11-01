import dateFormat from "dateformat";
import { sliceTransaction } from "@/helpers/sliceTransaction.js";

export const makeTransactionsPrettied = function (
  rawTransactions,
  currentAddress
) {
  let prettiedTransactions = [];

  rawTransactions.forEach((rawTransaction) => {
    prettiedTransactions.push(
      transactionPrettier(rawTransaction, currentAddress)
    );
  });

  return prettiedTransactions;
};

const transactionPrettier = function (rawTransaction, currentAddress) {
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
      text: successful ? 'Success' : 'Failed',
    },
    block_signed_at: {
      text: block_signed_at,
    },
    block_height: {
      text: block_height,
      routerLinkUrl:
        currentAddress !== block_height ? "/block/" + block_height : "",
      contentForCopy: block_height,
    },
    tx_hash: {
      text: sliceTransaction(tx_hash),
      routerLinkUrl: "/transaction/" + tx_hash,
      contentForCopy: tx_hash,
    },
    from_address: {
      text: sliceTransaction(from_address),
      routerLinkUrl:
        currentAddress !== from_address ? "/address/" + from_address : "",
      contentForCopy: from_address,
    },
    to_address: {
      text: sliceTransaction(to_address),
      routerLinkUrl:
        currentAddress !== to_address ? "/address/" + to_address : "",
      contentForCopy: to_address,
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
