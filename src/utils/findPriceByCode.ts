import { AppState } from '@/types/booking'
import {
TransformedData,
transformJSONSubjects,
} from '@/utils/transformJSONSubjects'
let jsonData: TransformedData

export async function fetchSubjectsByDate(state: AppState) {
  try {
    let startDate = ''
    let endDate = ''
    if (state.dateSelect.length === 1) {
      startDate = state.dateSelect[0]
      endDate = state.dateSelect[0]
    } else {
      startDate = state.dateSelect[0]
      endDate = state.dateSelect[state.dateSelect.length - 1]
    }
    const response = await fetch(
      `https://4dc0-159-223-93-76.ngrok-free.app/api/v1/subjects?startDate=${startDate}&endDate=${endDate}`,
    )
    const data = await response.json()
    const resultJSON = transformJSONSubjects(data)
    jsonData = resultJSON
    return data.subjects
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

export function findPriceByCode(targetCode: string) {
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
  let name = null;
  
  jsonData.subjects.map(subject => {
    subject.subsubject.map(subsubject => {
      if (subsubject.code === code) {
        name = subsubject.name;
      }
    });
  });

  return name;
}

