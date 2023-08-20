interface OriginalSubject {
  category: string
  id: number
  code: string
  name: string
  price: number
  status: string
  level: string
}

interface TransformedSubsubject {
  id: number
  code: string
  name: string
  price: number
  status: string
  level: string
}

interface TransformedCategory {
  id: number
  title: string
  subsubject: TransformedSubsubject[]
}

export interface TransformedData {
  status: string
  subjects: TransformedCategory[]
}

export function transformJSONSubjects(originalJSON: {
  status: string
  subjects: OriginalSubject[]
}): TransformedData {
  const transformedData: TransformedData = {
    status: originalJSON.status,
    subjects: [],
  }

  const categoryMap: Record<string, TransformedCategory> = {}

  originalJSON.subjects.forEach((subject) => {
    if (!categoryMap[subject.category]) {
      categoryMap[subject.category] = {
        id: subject.id,
        title: subject.category,
        subsubject: [],
      }
    }

    categoryMap[subject.category].subsubject.push({
      id: subject.id,
      code: subject.code,
      name: subject.name,
      price: subject.price,
      status: subject.status,
      level: subject.level,
    })
  })

  for (const category in categoryMap) {
    transformedData.subjects.push(categoryMap[category])
  }

  return transformedData
}
