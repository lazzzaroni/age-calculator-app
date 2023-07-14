import { useState } from "react";
import Image from "next/image";
import { FormSchema, type Form } from "@/models/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { cn } from "@/lib/utils";

import Error from "./Error";

const initialState = {
  day: "--",
  month: "--",
  year: "--",
};

export default function Container() {
  const [result, setResult] = useState<Form>(initialState);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<Form> = (data: Form) => {
    const today = new Date();
    const pastDate = new Date(`${data.year}-${data.month}-${data.day}`);

    function isValidDate(date: Date) {
      return (
        date.getFullYear() === +data.year &&
        date.getMonth() === +data.month - 1 &&
        date.getDate() === +data.day
      );
    }

    if (!isValidDate(pastDate)) {
      setError("day", { message: "Must be a valid date" });
      setError("month", { message: "" });
      setError("year", { message: "" });
      setResult(initialState);
      return;
    }
    if (today < pastDate) {
      setError("day", { message: "You choose future date" });
      setError("month", { message: "" });
      setResult(initialState);
      return;
    }

    let year = today.getFullYear() - pastDate.getFullYear();
    let month = today.getMonth() - pastDate.getMonth();
    let day = today.getDate() - pastDate.getDate();

    if (month < 0) {
      year--;
      month += 12;
    }

    if (day < 0) {
      month--;
      const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
      day += lastMonthDate.getDate();
    }

    setResult({ day: String(day), month: String(month), year: String(year) });
  };

  return (
    <div
      className={cn(
        "h-auto w-[343px] rounded-2xl rounded-br-[4rem] bg-neutral-white px-6 py-12",
        "lg:w-[840px] lg:rounded-br-[12rem] lg:p-14"
      )}
    >
      <form className={cn("h-auto")} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn("flex gap-4", "lg:gap-8")}>
          <div className={cn("flex flex-col gap-2")}>
            <label
              htmlFor="day"
              className={cn(
                "text-xs font-bold uppercase tracking-[0.2em] text-neutral-smokey-grey invalid:text-primary-light-red",
                "lg:text-sm lg:tracking-[0.3em]",
                { "text-primary-light-red": errors.day }
              )}
            >
              Day
            </label>
            <input
              id="day"
              maxLength={2}
              type="text"
              className={cn(
                "w-full rounded-md border p-3 text-lg font-bold placeholder:text-neutral-smokey-grey invalid:border-primary-light-red focus:border-primary-purple focus:outline-none focus:ring-0",
                "lg:w-40 lg:px-6 lg:py-4 lg:text-3xl",
                {
                  "border-primary-light-red focus:border-primary-light-red":
                    errors.day,
                }
              )}
              inputMode="numeric"
              placeholder="DD"
              {...register("day")}
            />
            {errors.day && <Error message={errors.day?.message as string} />}
          </div>
          <div className={cn("flex flex-col gap-2")}>
            <label
              htmlFor="month"
              className={cn(
                "text-xs font-bold uppercase tracking-[0.2em] text-neutral-smokey-grey invalid:text-primary-light-red",
                "lg:text-sm lg:tracking-[0.3em]",
                { "text-primary-light-red": errors.month }
              )}
            >
              Month
            </label>
            <input
              id="month"
              maxLength={2}
              type="text"
              className={cn(
                "w-full rounded-md border p-3 text-lg font-bold placeholder:text-neutral-smokey-grey invalid:border-primary-light-red focus:border-primary-purple focus:outline-none focus:ring-0",
                "lg:w-40 lg:px-6 lg:py-4 lg:text-3xl",
                {
                  "border-primary-light-red focus:border-primary-light-red":
                    errors.month,
                }
              )}
              inputMode="numeric"
              placeholder="MM"
              {...register("month")}
            />
            {errors.month && (
              <Error message={errors.month?.message as string} />
            )}
          </div>
          <div className={cn("flex flex-col gap-2")}>
            <label
              htmlFor="year"
              className={cn(
                "text-xs font-bold uppercase tracking-[0.2em] text-neutral-smokey-grey invalid:text-primary-light-red",
                "lg:text-sm lg:tracking-[0.3em]",
                { "text-primary-light-red": errors.year }
              )}
            >
              Year
            </label>
            <input
              id="year"
              maxLength={4}
              type="text"
              className={cn(
                "w-full rounded-md border p-3 text-lg font-bold placeholder:text-neutral-smokey-grey invalid:border-primary-light-red focus:border-primary-purple focus:outline-none focus:ring-0",
                "lg:w-40 lg:px-6 lg:py-4 lg:text-3xl",
                {
                  "border-primary-light-red focus:border-primary-light-red":
                    errors.year,
                }
              )}
              inputMode="numeric"
              placeholder="YYYY"
              {...register("year")}
            />
            {errors.year && <Error message={errors.year?.message as string} />}
          </div>
        </div>
        <div className={cn("relative my-16", "lg:my-12")}>
          <hr className="border" />
          <button
            type="submit"
            className={cn(
              "absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-purple hover:bg-neutral-off-black active:bg-neutral-off-black/80",
              "lg:-right-12 lg:left-auto lg:h-24 lg:w-24"
            )}
          >
            <Image
              src="/age-calculator-app/icon-arrow.svg"
              width={0}
              height={0}
              className={cn("h-6 w-full", "lg:h-11")}
              alt=""
            />
          </button>
        </div>
      </form>
      <div
        className={cn(
          "pt-2 text-5xl font-extrabold italic",
          "lg:pt-0 lg:text-8xl"
        )}
      >
        <p className="leading-tight">
          <span className="text-primary-purple">{`${result.year} `}</span>
          {result.year == "1" ? "year" : "years"}
        </p>
        <p className="leading-tight">
          <span className="text-primary-purple">{`${result.month} `}</span>
          {result.month == "1" ? "month" : "months"}
        </p>
        <p className="leading-tight">
          <span className="text-primary-purple">{`${result.day} `}</span>
          {result.day == "1" ? "day" : "days"}
        </p>
      </div>
    </div>
  );
}
