export interface Level {
  code: string
  name: string
  level: string
  price: number
}

export interface Subject {
  id: number
  title: string
  disable: boolean
  quotaHours: number
  level: Level[]
}
