import type { FormInstance, RadioChangeEvent } from 'antd'
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
} from 'antd'
import { useEffect, useRef, useState } from 'react'

import { fetchSubjects } from '@/utils/findPriceByCode'
import { convertToThaiDate } from '@/utils/thaiDateUtils'
import { TransformedData } from '@/utils/transformJSONSubjects'

type Props = {
  form: FormInstance
  dayString: string
  date: string
  disableCheckbox: boolean
  disable1Day: boolean
  index: number
}

function CModal({
  form,
  dayString,
  date,
  disableCheckbox,
  disable1Day,
  index,
}: Props) {
  const [mainSubjectSelected, setMainSubjectSelected] = useState(undefined)
  const [titleMainSubject, setTitleMainSubject] = useState('')
  const [subSubjectSelected, setSubSubjectSelected] = useState(undefined)
  const [isMainSub, setIsMainSub] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [subjects, setSubjects] = useState<TransformedData>()

  const refSubSubject = useRef<HTMLDivElement>(null)

  async function fetchSubject() {
    setSubjects(await fetchSubjects())
  }

  const showModal = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    isMainSub: number,
  ) => {
    setIsMainSub(isMainSub)
    setIsModalOpen(true)
  }

  const handleOk = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const notEmpty = mainSubjectSelected && subSubjectSelected
    const text = `${titleMainSubject} ${subSubjectSelected}`
    // isMainSub เป็น 1 วิชาหลัก เป็น 2 วิชารอง
    if (isMainSub === 1 && notEmpty) {
      form.setFieldsValue({
        [`${date}`]: {
          subject: {
            mainsubject: notEmpty ? text : 'Error',
          },
        },
      })
    } else if (isMainSub === 2 && notEmpty) {
      form.setFieldsValue({
        [`${date}`]: {
          subject: {
            subsubject: notEmpty ? text : 'Error',
          },
        },
      })
    } else {
      alert('Some thing error')
      resetSubject()
    }

    resetSubject()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    resetSubject()
    setIsModalOpen(false)
  }

  const mainRadioOnchange = (e: RadioChangeEvent) => {
    setTimeout(() => {
      if (refSubSubject.current) {
        refSubSubject.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 200)
    setTitleMainSubject(String(e.target.title))
    setMainSubjectSelected(e.target.value)
  }

  const subRadioOnchange = (e: RadioChangeEvent) => {
    setSubSubjectSelected(e.target.value)
  }

  const resetSubject = () => {
    setMainSubjectSelected(undefined)
    setSubSubjectSelected(undefined)
  }

  useEffect(() => {
    fetchSubject()
    resetSubject()
    form.setFieldsValue({
      [`${date}`]: {
        subject: {
          subsubject: '',
        },
      },
    })
    form.setFieldsValue({
      [`${date}`]: {
        subject: {
          mainsubject: '',
        },
      },
    })
  }, [])

  return (
    <>
      <Divider orientation="left">{convertToThaiDate(dayString)}</Divider>

      <Form.Item
        name={[`${date}`, 'day']}
        label={'วันที่'}
        initialValue={dayString}
        style={{ display: 'none' }}
      >
        <Input bordered={false} />
      </Form.Item>

      <Form.Item
        name={[`${date}`]}
        label="09.00 - 12.00"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 8 }}
        style={{ marginBottom: 0 }}
      >
        <Space direction="horizontal" align="start">
          <Button type="primary" onClick={(e) => showModal(e, 1)}>
            เลือกวิชา
          </Button>
          <Form.Item
            name={[`${date}`, 'subject', 'mainsubject']}
            rules={[{ required: true, message: 'โปรดเลือกวิชา' }]}
          >
            <Input disabled />
          </Form.Item>
        </Space>
      </Form.Item>

      {disableCheckbox && (
        <>
          <Form.Item
            name={[`${date}`]}
            label="13.00 - 16.00"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 }}
            style={{ marginBottom: 0 }}
          >
            <Space direction="horizontal" align="start">
              <Button type="primary" onClick={(e) => showModal(e, 2)}>
                เลือกวิชา
              </Button>
              <Form.Item
                name={[`${date}`, 'subject', 'subsubject']}
                rules={[{ required: true, message: 'โปรดเลือกวิชา' }]}
              >
                <Input disabled />
              </Form.Item>
            </Space>
          </Form.Item>

          {/* disable1Day คือ ถ้าเลือกคอส์ 1 วันจะให้ปิดกิจกรรมช่วงค่ำ */}
          {disable1Day && (
            <Form.Item
              label="กิจกรรมช่วงค่ำ"
              name={[`${date}`, 'activity']}
              valuePropName="checked"
              initialValue={false}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 1 }}
            >
              <Checkbox />
            </Form.Item>
          )}
        </>
      )}

      <Modal
        title="เลือกวิชา"
        open={isModalOpen}
        onOk={(e) => handleOk(e)}
        onCancel={handleCancel}
        width={720}
        key={index}
      >
        <Row>
          <Col span={24} lg={{ span: 12 }}>
            <Divider orientation="left" style={{ fontWeight: 'bold' }}>
              เลือกวิชาหลัก
            </Divider>
            <Radio.Group
              value={mainSubjectSelected}
              onChange={mainRadioOnchange}
            >
              <Space direction="vertical">
                {subjects?.subjects.map((option, i) => (
                  <Radio key={i} title={option.title} value={option.id}>
                    {option.title}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Col>
          <Col span={24} lg={{ span: 12 }}>
            {mainSubjectSelected && (
              <>
                <div ref={refSubSubject}>
                  <Divider orientation="left" style={{ fontWeight: 'bold' }}>
                    เลือกวิชาย่อย
                  </Divider>
                </div>
                <Radio.Group
                  value={subSubjectSelected}
                  onChange={subRadioOnchange}
                >
                  {subjects?.subjects
                    .find((subject) => subject.id === mainSubjectSelected)
                    ?.subsubject.map((item, i) => (
                      <Space direction="vertical" key={i}>
                        <Radio value={item.code} key={`radio${i}`}>
                          {item.name} ({item.level})
                        </Radio>
                      </Space>
                    ))}
                </Radio.Group>
              </>
            )}
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default CModal
