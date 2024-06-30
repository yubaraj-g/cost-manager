"use client";

import { useCallback, useEffect, useState } from "react";

import { Plus, ThumbsUp, Minus } from "lucide-react";

import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [remaining, setRemaining] = useState<number>(0);
  const [isSalary, setIsSalary] = useState<boolean>(false);
  const [salaryAmount, setSalaryAmount] = useState<number>(0);

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
    setRemaining(salaryAmount - value);
  }, [expenses, salaryAmount]);

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

  const addSalary = () => {
    setIsSalary(!isSalary);
    setSalaryAmount(0);
  };

  const inputSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = String(e.target.value).split("");

    if (e.target.value === "") {
      setSalaryAmount(0);
    } else if (value[0] === "0") {
      value.shift();
      const v = Number(value.join(""));
      // console.log(Number(v));
      setSalaryAmount(v);
    } else {
      setSalaryAmount(Number(e.target.value));
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
        <Typography.Muted className="text-center">
          Calculate based on your salary or total amount.
        </Typography.Muted>
        <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full items-center p-4 border rounded-lg">
          <Typography.Large className="w-2/3 text-sm xl:text-nowrap">
            Add your salary or total amount cap:
          </Typography.Large>
          {isSalary ? (
            <div className="sm:w-1/2 w-full flex gap-1 justify-between items-center">
              <Input
                type="number"
                className="xl:w-2/3 flex flex-1 text-end"
                onChange={inputSalary}
                value={String(salaryAmount)}
              />
              <Button type="button" onClick={addSalary}>
                <Minus size={18} />
              </Button>
            </div>
          ) : (
            <Button onClick={addSalary} className="ml-auto">
              <Plus />
            </Button>
          )}
        </div>

        <Typography.Muted className="text-center my-2">
          Add your costs below.
        </Typography.Muted>

        <div className="flex gap-2">
          <Typography.Large className="w-2/3 text-start text-primary/70">
            Expense
          </Typography.Large>
          <Typography.Large className="w-1/3 text-end text-primary/70">
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

      {isSalary && (
        <div className="flex gap-2 w-full xl:w-1/3 items-center justify-center">
          <Typography.Large className="w-fit text-end text-nowrap">
            Remaining Amount:
          </Typography.Large>
          <Typography.Large className="w-fit text-start text-primary">
            {remaining}
          </Typography.Large>
        </div>
      )}

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
