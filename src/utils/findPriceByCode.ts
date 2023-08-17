import jsonData from "@/app/booking/api/subject.json"

export function findPriceByCode(targetCode: string) {
  const subject = jsonData.find((item) =>
    item.level.some((level) => level.code === targetCode)
  )

  if (subject) {
    const targetLevel = subject.level.find((level) => level.code === targetCode)

    if (targetLevel) {
      const price = targetLevel.price
      return price
    } else {
      console.log(
        `Level with code ${targetCode} not found in subject ${subject.title}`
      )
    }
  } else {
    console.log(`Subject with code ${targetCode} not found`)
  }
}
