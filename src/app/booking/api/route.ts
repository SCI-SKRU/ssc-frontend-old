import { CascaderOption } from "@/types/cascader"
import api_province from "./api_province_with_amphure_tambon.json"

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
