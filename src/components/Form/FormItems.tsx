/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { type JSX } from 'react'
import {
  type FormItemProps,
  Input,
  Form,
  type InputProps,
  Select,
  type SelectProps,
  type DatePickerProps,
  DatePicker,
  InputNumber,
  type InputNumberProps
} from 'antd'
import { type RangePickerProps } from 'antd/es/date-picker'
import { type TextAreaProps } from 'antd/es/input'
import { type PickerProps } from 'antd/es/date-picker/generatePicker'

const WithFormItem = <T,>(
  Component: React.ComponentType<T>
): React.MemoExoticComponent<(props: FormItemProps<any> & T) => JSX.Element> => {
  const FormItem = (props: FormItemProps & T): JSX.Element => {
    const {
      colon,
      dependencies,
      extra,
      getValueFromEvent,
      getValueProps,
      hasFeedback,
      help,
      hidden,
      htmlFor,
      label,
      labelAlign,
      labelCol,
      messageVariables,
      name,
      normalize,
      noStyle,
      preserve,
      required,
      rules,
      shouldUpdate,
      tooltip,
      trigger,
      validateFirst,
      validateStatus,
      validateTrigger,
      valuePropName,
      wrapperCol,
      initialValue,
      ...otherProps
    } = props

    const formItemProps: FormItemProps = {
      colon,
      dependencies,
      extra,
      getValueFromEvent,
      getValueProps,
      hasFeedback,
      help,
      hidden,
      htmlFor,
      initialValue,
      label,
      labelAlign,
      labelCol,
      messageVariables,
      name,
      normalize,
      noStyle,
      preserve,
      required,
      rules,
      shouldUpdate,
      tooltip,
      trigger,
      validateFirst,
      validateStatus,
      validateTrigger,
      valuePropName,
      wrapperCol
    }

    return (
      <Form.Item {...formItemProps}>
        <Component {...(otherProps as T & FormItemProps)} />
      </Form.Item>
    )
  }
  return React.memo(FormItem)
}

export const FormItem = {
  Input: WithFormItem<InputProps>(Input),
  Select: WithFormItem<SelectProps>(Select),
  DatePicker: WithFormItem<DatePickerProps>(DatePicker),
  TextArea: WithFormItem<TextAreaProps>(Input.TextArea),
  InputNumber: WithFormItem<InputNumberProps>(InputNumber),
  RangePicker: WithFormItem<RangePickerProps>(DatePicker.RangePicker),
  PasswordInput: WithFormItem<InputProps>(Input.Password)
}

export const FormInput = (props: FormItemProps & InputProps): JSX.Element => {
  return <FormItem.Input allowClear placeholder={`请输入${props.label}`} {...props} />
}

export const FromPasswordInput = (props: FormItemProps & InputProps): JSX.Element => {
  return <FormItem.PasswordInput allowClear placeholder={`请输入${props.label}`} {...props} />
}

export const FormSelect = (props: FormItemProps & SelectProps): JSX.Element => {
  return (
    <FormItem.Select
      allowClear
      placeholder={`请选择${props.label}`}
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      {...props}
    />
  )
}

export const FormDatePicker = (props: FormItemProps & PickerProps): JSX.Element => {
  return <FormItem.DatePicker allowClear placeholder={`请选择${props.label}`} {...props} />
}

export const FormRangePicker = (props: FormItemProps & RangePickerProps): JSX.Element => {
  return (
    <FormItem.RangePicker
      allowClear
      placeholder={['开始时间', '结束时间']}
      allowEmpty={[true, true]}
      {...props}
    />
  )
}

export const FormInputNumber = (props: FormItemProps & InputNumberProps): JSX.Element => {
  return <FormItem.InputNumber placeholder={`请输入${props?.label}`} {...props} />
}

export const FormTextArea = (props: FormItemProps & TextAreaProps): JSX.Element => {
  return (
    <FormItem.TextArea
      allowClear
      rows={4}
      placeholder={`请输入${props?.label}`}
      style={{ resize: 'none' }}
      {...props}
    />
  )
}
