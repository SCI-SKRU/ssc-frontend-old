import { CascaderOption } from "@/types/cascader"
import api_province from "./api_province_with_amphure_tambon.json"

export async function getDataCourse() {
  const endpoint = `${process.env.NEXT_PUBLIC_BASE_API_URL}/courses` || 'http://localhost:3000/api/v1/courses'
  const res = await fetch(endpoint)
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export async function getProvince(): Promise<CascaderOption[]> {
  const array: CascaderOption[] = api_province.map((data: any, index: any) => ({
    label: data.name_th,
    value: data.name_en,
    children: data.amphure.map((item: any) => {
      return {
        label: item.name_th,
        value: item.name_en,
        children: item.tambon.map((item2: any) => {
          return {
            label: item2.name_th,
            value: item2.name_en,
          }
        }),
      }
    }),
  }))

  return array
}
