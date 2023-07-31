export async function getDataCourse() {
  const res = await fetch("http://localhost:3000/api/v1/courses")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}
