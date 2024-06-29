"use client";

import { useCallback, useEffect, useState } from "react";

import { Plus, ThumbsUp } from "lucide-react";

import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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

  const { toast } = useToast();

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

  const emailFunction = async () => {
    const name = "Anonymous";
    const message = "Liked the app!";

    toast({
      description: "Thank you very much!",
    });

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ name, message }),
      });

      const json = await res.json();

      console.log(json);

      // toast({
      //   description: "Thank you very much!",
      // });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full mt-12 xl:mt-0">
      <Typography.H1 className="text-primary text-center xl:text-start">
        Welcome to Cost Planner
      </Typography.H1>

      <Typography.H2 className="text-primary/60 text-center xl:text-start">
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

      <div className="flex gap-2 w-full xl:w-1/3 items-center justify-center">
        <Typography.H3 className="w-fit text-end text-nowrap">
          Your Total Expense:
        </Typography.H3>
        <Typography.H3 className="w-fit text-start text-primary">
          {total}
        </Typography.H3>
      </div>

      <div className="fixed top-0 xl:top-14 right-0 xl:right-14 w-full xl:w-fit flex xl:flex-col items-center justify-center backdrop-blur-md p-3 xl:p-0">
        <Typography.Muted>
          If its helping you, please hit the like button. Thanks.
        </Typography.Muted>
        <Button
          variant="ghost"
          className="w-fit py-6 rounded-full"
          onClick={emailFunction}
        >
          <ThumbsUp className="text-primary" />
        </Button>
      </div>
    </div>
  );
}
