import { z } from "zod";

const DAY_ERROR = "Must be a valid day";
const MONTH_ERROR = "Must be a valid month";
const YEAR_ERROR = "Must be a valid year";
const PAST_YEAR_ERROR = "Must be in the past";
const REQUIRED_ERROR = "This field is required";
const DIGITS_ERROR = "Only digits are allowed";
// const INVALID_DATE_ERROR = "Must be a valid date";

export const FormSchema = z.object({
  day: z
    .string()
    .trim()
    .min(1, { message: REQUIRED_ERROR })
    .regex(/^[0-9]+$/, { message: DIGITS_ERROR })
    .refine(
      (day) => {
        return parseInt(day, 10) >= 1 && parseInt(day, 10) <= 31;
      },
      { message: DAY_ERROR }
    ),
  month: z
    .string()
    .trim()
    .min(1, { message: REQUIRED_ERROR })
    .regex(/^[0-9]+$/, { message: DIGITS_ERROR })
    .refine(
      (month) => {
        return parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12;
      },
      { message: MONTH_ERROR }
    ),
  year: z
    .string()
    .trim()
    .min(1, { message: REQUIRED_ERROR })
    .min(4, { message: YEAR_ERROR })
    .regex(/^[0-9]+$/, { message: DIGITS_ERROR })
    .refine(
      (year) => {
        return parseInt(year, 10) <= new Date().getFullYear();
      },
      { message: PAST_YEAR_ERROR }
    ),
});

export type Form = z.infer<typeof FormSchema>;
