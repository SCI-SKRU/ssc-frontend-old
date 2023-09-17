export interface Course {
  name: string
  description: string
  timeSlot: number
}

export interface GetCourses {
  status: string
  courses: Course[]
}
