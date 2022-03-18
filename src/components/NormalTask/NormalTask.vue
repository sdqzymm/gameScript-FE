<template>
  <div class="normal-task">
    <el-form
      ref="formRef"
      :model="config"
      label-width="60px"
      label-position="left"
    >
      <el-form-item
        v-for="(task, index) in config.tasks"
        class="task"
        :key="task.id"
        :prop="'tasks[' + index + ']'"
        :rules="rules"
        :label="`任务${index + 1}`"
      >
        <el-cascader
          v-model="task.strs"
          style="width: 250px"
          :options="options"
          @change="handleChange($event, index)"
          placeholder="请选择任务类型"
        ></el-cascader>
        <el-input-number
          v-model="task.count"
          placeholder="循环次数"
          :min="1"
          :max="task.type === '活动' ? 10 : 5"
        />
        <el-input-number
          v-if="task.continuous"
          v-model="task.continuous!.count"
          placeholder="连续次数"
          prop=""
          :min="1"
          :max="10"
        />
        <el-button
          style="margin-left: 20px"
          type="danger"
          @click="handleDelete(index)"
          >删除</el-button
        >
        <el-checkbox-group
          v-model="task.checked"
          @change="handleCheckedChange($event, index)"
        >
          <el-checkbox
            v-for="(value, key, index) in pick(task.continuous!, continuousOptions)"
            :key="index"
            :label="key"
            >{{ mapContinuous[key] }}</el-checkbox
          >
        </el-checkbox-group>
        <template v-if="task.type === '元素禁地' || task.type === '秘境支配者'">
          <el-switch
            v-model="task.continuous!.open"
            class="mb-2"
            active-text="连续战斗"
            inactive-text="单次战斗"
          ></el-switch>
        </template>
      </el-form-item>
      <el-form-item class="continuous">
        <div class="text">
          当开启单次战斗时, 继承用票/用钻的设定,
          战斗总次数自动设置为循环次数与连续次数相乘,
          同时不会因为失败或者发现地下城停止
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useConfig from '../../hooks/useConfig'
import { pick } from 'lodash-es'
import type { ElForm } from 'element-plus'
import { FormItemRule } from 'element-plus/es/components/form/src/form.type'
import { useStore } from '@/store'
import options from './config'

// 获取任务配置
const config = useConfig()

// 获取store
const store = useStore()

// 处理任务类型变化
const handleChange = (strs: string[], index: number) => {
  let [type, property, floor] = strs
  if (type === '冒险') {
    floor = floor + '-' + strs[3]
  }
  const task = config.value.tasks[index]
  if (type !== '活动' && task.count && task.count > 5) {
    task.count = 5
  }
  task.type = type
  task.property = property
  task.floor = floor
}

// 用来转化显示信息
const mapContinuous = {
  ticket: '用票',
  diamond: '用钻',
  fail: '失败继续',
  find: '发现地下城继续'
}

// 处理多选框变化
const continuousOptions = ['ticket', 'diamond', 'fail', 'find']
const handleCheckedChange = (value: string[], index: number) => {
  const continuous = config.value.tasks[index].continuous!
  continuousOptions.forEach((item) => {
    if (value.includes(item)) {
      continuous[item] = true
    } else {
      continuous[item] = false
    }
  })
}

// 处理删除任务
const handleDelete = (index: number) => {
  config.value.tasks.splice(index, 1)
}

// 校验相关, 处理提交
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()
const rules: FormItemRule = {
  type: 'object',
  required: true,
  fields: {
    type: {
      type: 'string',
      required: true,
      message: '任务类型必填'
    },
    count: {
      type: 'number',
      required: true,
      message: '循环次数必填'
    },
    continuous: {
      type: 'object',
      fields: {
        count: {
          type: 'number',
          required: true,
          message: '连续战斗次数必填'
        }
      }
    }
  }
}
const submit = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      store.dispatch('login/updateConfigAction', {
        id: store.state.login.userInfo.id,
        config: config.value
      })
    } else {
      return false
    }
  })
}

// 向外暴露submit方法
defineExpose({
  submit
})
</script>

<style lang="scss" scoped>
.normal-task {
  .task {
    margin-bottom: 30px;
    padding: 20px 10px 0 10px;
    border: 1px solid black;
  }
  :deep(.el-checkbox-group) {
    height: 32px;
    margin-right: 20px;
  }
  :deep(.el-switch__label.is-active) {
    color: red;
  }
  .continuous :deep(.el-form-item__content) {
    flex-direction: column;
    justify-content: center;
    .text {
      color: red;
    }
  }
}
</style>
