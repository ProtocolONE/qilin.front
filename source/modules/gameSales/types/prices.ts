interface PricesCommon {
  currency: string
  notifyRateJumps: boolean
}

interface PricesPreOrder {
  date: Date
  enabled: boolean
}

interface PricesList {
  currency: string
  vat: number
  price: number
}

export default interface Prices {
  common?: PricesCommon,
  preOrder?: PricesPreOrder,
  prices?: PricesList[]
}
