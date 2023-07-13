import { cn } from "@/lib/utils";
import { FormSchema, type Form } from "@/models/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Error from "./Error";

const defaultState = {
  day: "--",
  month: "--",
  year: "--",
};

export default function Container() {
  const [result, setResult] = useState<Form>(defaultState);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
  });

  console.log(isValid);

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
      setResult(defaultState);
      return;
    }
    if (today < pastDate) {
      return setError("day", { message: "You choose future date" });
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
        "w-[343px] bg-neutral-white h-auto rounded-2xl rounded-br-[4rem] px-6 py-12",
        "lg:w-[840px] lg:p-14 lg:rounded-br-[12rem]"
      )}
    >
      <form className={cn("h-auto")} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn("flex gap-4", "lg:gap-8")}>
          <div className={cn("flex flex-col gap-2")}>
            <label
              htmlFor="day"
              className={cn(
                "uppercase text-xs tracking-[0.2em] font-bold text-neutral-smokey-grey invalid:text-primary-light-red",
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
                "w-full border rounded-md p-3 font-bold placeholder:text-neutral-smokey-grey invalid:border-primary-light-red text-lg focus:ring-0 focus:outline-none focus:border-primary-purple",
                "lg:w-40 lg:py-4 lg:px-6 lg:text-3xl",
                {
                  "focus:border-primary-light-red border-primary-light-red":
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
                "uppercase text-xs tracking-[0.2em] font-bold text-neutral-smokey-grey invalid:text-primary-light-red",
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
                "w-full border rounded-md p-3 font-bold placeholder:text-neutral-smokey-grey invalid:border-primary-light-red text-lg focus:ring-0 focus:outline-none focus:border-primary-purple",
                "lg:w-40 lg:py-4 lg:px-6 lg:text-3xl",
                {
                  "focus:border-primary-light-red border-primary-light-red":
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
                "uppercase text-xs tracking-[0.2em] font-bold text-neutral-smokey-grey invalid:text-primary-light-red",
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
                "w-full border rounded-md p-3 font-bold placeholder:text-neutral-smokey-grey invalid:border-primary-light-red text-lg focus:ring-0 focus:outline-none focus:border-primary-purple",
                "lg:w-40 lg:py-4 lg:px-6 lg:text-3xl",
                {
                  "focus:border-primary-light-red border-primary-light-red":
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
        <div className={cn("my-16 relative", "lg:my-12")}>
          <hr className="border" />
          <button
            type="submit"
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-16 w-16 bg-primary-purple rounded-full hover:bg-neutral-off-black",
              "lg:-right-12 lg:left-auto lg:h-24 lg:w-24"
            )}
          >
            <Image
              src="/icon-arrow.svg"
              width={0}
              height={0}
              className={cn("w-full h-6", "lg:h-11")}
              alt=""
            />
          </button>
        </div>
      </form>
      <div
        className={cn(
          "italic font-extrabold text-5xl pt-2",
          "lg:text-8xl lg:pt-0"
        )}
      >
        <p className="leading-tight">
          <span className="text-primary-purple">{result.year}</span>{" "}
          {result.year == "1" ? "year" : "years"}
        </p>
        <p className="leading-tight">
          <span className="text-primary-purple">{result.month}</span>{" "}
          {result.month == "1" ? "month" : "months"}
        </p>
        <p className="leading-tight">
          <span className="text-primary-purple">{result.day}</span>{" "}
          {result.day == "1" ? "day" : "days"}
        </p>
      </div>
    </div>
  );
}
