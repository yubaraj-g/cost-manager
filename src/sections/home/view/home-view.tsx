"use client";

import { useState } from "react";

import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";

import CostRow from "../home-cost-row";

// ----------------------------------------------------------

export type ExpenseType = {
  id: number;
  exp: string;
  amt: number;
};

export default function HomeView() {
  const newExpense: ExpenseType = {
    id: 1,
    exp: "",
    amt: 0,
  };

  const [expenses, setExpenses] = useState<ExpenseType[]>([{ ...newExpense }]);
  const [total, setTotal] = useState<number>(0);

  const addExpense = () => {
    setExpenses([
      ...expenses,
      {
        ...newExpense,
        id: expenses.length + 1,
      },
    ]);
  };

  const updateExpense = (expense: ExpenseType) => {
    // update the object
    const list = [...expenses];
    list.forEach((exp) => {
      if (exp.id === expense.id) {
        exp.exp = expense.exp;
        exp.amt = expense.amt;
      }
    });
    // update the array
    setExpenses(list);
  };

  const calculateTotal = () => {
    const value = expenses.reduce(
      (accumulated, current) => (accumulated += Number(current.amt)),
      total
    );
    setTotal(value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <Typography.H1 className="text-primary">Welcome to Cost Planner</Typography.H1>

      <Typography.H2 className="text-primary/70">Start Calculating Your Costs.</Typography.H2>

      <div className="w-full rounded-xl p-4 flex flex-col gap-2 max-w-[40rem] shadow-lg">
        <div className="flex gap-2">
          <Typography.Large className="w-2/3 text-center">
            Expense
          </Typography.Large>
          <Typography.Large className="w-1/3 text-center">
            Amount
          </Typography.Large>
        </div>

        {expenses &&
          expenses.map((ex, index) => (
            <CostRow key={index} expense={ex} updateExpense={updateExpense} />
          ))}

        <Button onClick={addExpense} className="mt-3">Add New Expense</Button>
      </div>

      <Button onClick={calculateTotal}>Calculate</Button>

      <div className="flex gap-2 w-1/3 items-center">
        <Typography.H3 className="w-2/3 text-end text-primary">
          Your Total Expense:
        </Typography.H3>
        <Typography.H3 className="w-1/3 text-start text-primary">
          {total}
        </Typography.H3>
      </div>
    </div>
  );
}
