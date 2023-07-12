import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Container() {
  return (
    <div
      className={cn(
        "w-[343px] bg-neutral-white h-auto rounded-2xl rounded-br-[4rem] px-6 py-12",
        "lg:w-[840px] lg:p-14 lg:rounded-br-[12rem]"
      )}
    >
      <form className={cn("h-auto")}>
        <div className={cn("flex gap-4", "lg:gap-8")}>
          <div className={cn("flex flex-col gap-2")}>
            <label
              htmlFor="day"
              className={cn(
                "uppercase text-xs tracking-[0.2em] font-bold text-neutral-smokey-grey invalid:text-primary-light-red",
                "lg:text-sm lg:tracking-[0.3em]"
              )}
            >
              Day
            </label>
            <input
              id="day"
              type="text"
              className={cn(
                "w-full border rounded-md p-3 font-bold placeholder:text-neutral-smokey-grey invalid:border-primary-light-red text-lg focus:ring-0 focus:outline-none focus:border-primary-purple",
                "lg:w-40 lg:py-4 lg:px-6 lg:text-3xl "
              )}
              inputMode="numeric"
              placeholder="DD"
              name="day"
            />
          </div>
          <div className={cn("flex flex-col gap-2")}>
            <label
              htmlFor="month"
              className={cn(
                "uppercase text-xs tracking-[0.2em] font-bold text-neutral-smokey-grey invalid:text-primary-light-red",
                "lg:text-sm lg:tracking-[0.3em]"
              )}
            >
              Month
            </label>
            <input
              id="month"
              type="text"
              className={cn(
                "w-full border rounded-md p-3 font-bold placeholder:text-neutral-smokey-grey invalid:border-primary-light-red text-lg focus:ring-0 focus:outline-none focus:border-primary-purple",
                "lg:w-40 lg:py-4 lg:px-6 lg:text-3xl "
              )}
              inputMode="numeric"
              placeholder="MM"
              name="month"
            />
          </div>
          <div className={cn("flex flex-col gap-2")}>
            <label
              htmlFor="year"
              className={cn(
                "uppercase text-xs tracking-[0.2em] font-bold text-neutral-smokey-grey invalid:text-primary-light-red",
                "lg:text-sm lg:tracking-[0.3em]"
              )}
            >
              Year
            </label>
            <input
              id="year"
              type="text"
              className={cn(
                "w-full border rounded-md p-3 font-bold placeholder:text-neutral-smokey-grey invalid:border-primary-light-red text-lg focus:ring-0 focus:outline-none focus:border-primary-purple",
                "lg:w-40 lg:py-4 lg:px-6 lg:text-3xl "
              )}
              inputMode="numeric"
              placeholder="YYYY"
              name="year"
            />
          </div>
        </div>
        <div className={cn("my-16 relative", "lg:my-12")}>
          <hr className="border" />
          <button
            onClick={(e) => e.preventDefault()}
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
          <span className="text-primary-purple">{`--`}</span> years
        </p>
        <p className="leading-tight">
          <span className="text-primary-purple">{`--`}</span> months
        </p>
        <p className="leading-tight">
          <span className="text-primary-purple">{`--`}</span> days
        </p>
      </div>
    </div>
  );
}
