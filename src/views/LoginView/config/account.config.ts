export default {
  rules: {
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
    ]
  }
}
