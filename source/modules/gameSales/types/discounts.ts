interface DiscountsTitle {
  en: string
  ru: string
}

interface DiscountsDescription {
  en: string
  ru: string
}

export interface DiscountsDate {
  start: string
  end: string
}

export default interface Discounts {
  id: string
  title: DiscountsTitle
  description: DiscountsDescription
  date: DiscountsDate
  rate: number
}
