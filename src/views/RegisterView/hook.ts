import { FormRulesMap } from 'element-plus/es/components/form/src/form.type'

export default function useRules(account: any) {
  const validateRePassword = (rule: any, value: any, callback: any) => {
    if (value !== account.password) {
      callback(new Error('两次密码不一致'))
    } else callback()
  }
  const rules: FormRulesMap = {
    name: [
      {
        required: true,
        message: '用户名必须填写',
        trigger: 'blur'
      },
      {
        pattern: /^[a-zA-Z0-9]{6,10}$/,
        message: '用户名必须是6-10个字母或数字'
      }
    ],
    password: [
      {
        required: true,
        message: '密码必须填写',
        trigger: 'blur'
      },
      {
        pattern: /^[a-zA-Z0-9]{6,}$/,
        message: '密码必须是6位以上的字母或数字'
      }
    ],
    rePassword: [
      {
        required: true,
        message: '确认密码必须填写',
        trigger: 'blur'
      },
      {
        validator: validateRePassword,
        trigger: 'blur'
      }
    ]
  }
  return rules
}
