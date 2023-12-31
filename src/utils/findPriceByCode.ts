import config from '@/config'
import {
  TransformedData,
  transformJSONSubjects,
} from '@/utils/transformJSONSubjects'
let jsonData: TransformedData

export async function fetchSubjects(): Promise<TransformedData> {
  const response = await fetch(`${config.environments.BASE_API_URL}/subjects`)
  const result = await response.json()
  const resultJSON = transformJSONSubjects(result)
  jsonData = resultJSON
  return resultJSON
}

export function findPriceByCode(targetCode: string) {
  fetchSubjects()
  const subject = jsonData.subjects.find((item) =>
    item.subsubject.some((level) => {
      return level.code === targetCode
    }),
  )

  if (subject) {
    const targetLevel = subject.subsubject.find(
      (level) => level.code === targetCode,
    )

    if (targetLevel) {
      const price = targetLevel.price
      return price
    } else {
      console.log(
        `Level with code ${targetCode} not found in subject ${subject.title}`,
      )
    }
  } else {
    console.log(`Subject with code ${targetCode} not found`)
  }
}

export function findNameSubjectByCode(code: string) {
  for (const subject of jsonData.subjects) {
    for (const subsubject of subject.subsubject) {
      if (subsubject.code === code) {
        return subsubject.name
      }
    }
  }
  return null // Return null if code is not found
}
