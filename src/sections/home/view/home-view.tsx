"use client";

import { useCallback, useEffect, useState } from "react";

import { Plus } from "lucide-react";

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

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();

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

  const calculateTotal = useCallback(() => {
    const value = expenses.reduce(
      (accumulated, current) => (accumulated += Number(current.amt)),
      0
    );
    setTotal(value);
  }, [expenses]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => calculateTotal(), 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [expenses, calculateTotal]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <Typography.H1 className="text-primary">
        Welcome to Cost Planner
      </Typography.H1>

      <Typography.H2 className="text-primary/60">
        Start Calculating Your Costs.
      </Typography.H2>

      <form
        onSubmit={addExpense}
        className="w-full rounded-xl p-4 flex flex-col gap-2 max-w-[40rem] shadow-xl"
      >
        <div className="flex gap-2">
          <Typography.Large className="w-2/3 text-center">
            Expense
          </Typography.Large>
          <Typography.Large className="w-1/3 text-center">
            Amount
          </Typography.Large>
        </div>

        <div className="h-full flex flex-col gap-2">
          {expenses &&
            expenses.map((ex, index) => (
              <CostRow key={index} expense={ex} updateExpense={updateExpense} />
            ))}
        </div>

        <Button type="submit" className="mt-3 flex gap-1">
          Add New Expense
          <Plus size={18} />
        </Button>
      </form>

      <div className="flex gap-2 w-1/3 items-center">
        <Typography.H3 className="w-2/3 text-end">
          Your Total Expense:
        </Typography.H3>
        <Typography.H3 className="w-1/3 text-start text-primary">
          {total}
        </Typography.H3>
      </div>
    </div>
  );
}
