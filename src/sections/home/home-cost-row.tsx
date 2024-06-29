import { Input } from "@/components/ui/input";

import { ExpenseType } from "./view/home-view";

// ----------------------------------------------------------

export default function CostRow({
  expense,
  updateExpense,
}: {
  expense: ExpenseType;
  updateExpense: Function;
}) {
  const updateAmount = (value: string | number) => {
    const updated = {
      ...expense,
      amt: value,
    };

    updateExpense(updated);
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        onChange={(e) => {
          const updated = {
            ...expense,
            exp: e.target.value,
          };
          updateExpense(updated);
        }}
        value={expense.exp}
        className="w-2/3"
      />
      <Input
        type="number"
        onChange={(e) => {
          // check if there's any zero
          const value = String(e.target.value).split("");
          let finalValue;
          if (e.target.value === "") {
            updateAmount(0);
          } else if (value[0] === "0") {
            // remove the zero from the start if starts with zero
            value.shift();
            finalValue = value.join("");

            updateAmount(finalValue);
          } else {
            // keep it normal
            finalValue = value.join("");

            updateAmount(finalValue);
          }
        }}
        value={expense.amt}
        className="w-1/3 text-end"
      />
    </div>
  );
}
