export default {
  rules: {
    phone: [
      {
        required: true,
        message: '手机号必须填写',
        trigger: 'blur'
      },
      {
        pattern:
          /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
        message: '请输入正确的手机号格式'
      }
    ],
    captcha: [
      {
        required: true,
        message: '验证码必须填写',
        trigger: 'blur'
      },
      {
        pattern: /^[0-9]{6}$/,
        message: '验证码必须是6位数字'
      }
    ]
  }
}
