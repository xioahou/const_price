<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus"
import { getAdminListApi } from "./apis/api"

const loadingBtn = ref(false)
const typeList = ref([{ id: 1, label: "超级管理员" }, { id: 2, label: "普通管理员" }])
const statsList = ref([{ id: 1, label: "正常" }, { id: 2, label: "停用" }])
const paramsForm = ref({
  page: "1",
  limit: "10",
  username: "",
  type: "",
  name: ""
})
const dialogVisible = ref(false)
const title = ref("新增管理员")
const ruleFormRef = ref<FormInstance>()
const tableData = ref([])
async function getAdminList() {
  const res: any = await getAdminListApi(paramsForm.value)
  console.log(res)
  if (res.code === 200) {
    tableData.value = res.data.list
  }
}
getAdminList()
const adminForm = ref({
  username: "",
  password: "",
  name: "",
  type: "",
  role_id: [],
  status: "",
  id: ""
})
function addAdmin() {
  dialogVisible.value = true
}
const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入登录账户", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  type: [{ required: true, message: "请选择身份类型", trigger: "change" }],

  status: [{ required: true, message: "请选择状态", trigger: "change" }]
})
</script>

<template>
  <div class="admin-page">
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addAdmin">
            新增
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="type" label="身份类型" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="role_id" label="角色ID" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="time" label="维护时间" />
      <el-table-column prop="update_time" label="修改时间" />
      <el-table-column prop="role_name" label="角色名称" />
    </el-table>
    <el-dialog v-model="dialogVisible" :title="title" width="500">
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="adminForm" :rules="rules" label-width="auto">
        <el-form-item label="登录账户" prop="username">
          <el-input v-model="adminForm.username" placeholder="请输入登录账户" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="adminForm.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="adminForm.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="身份类型" prop="type">
          <el-select placeholder="身份类型" v-model="adminForm.type">
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色分配" prop="role_id">
          <el-select placeholder="选择角色" v-model="adminForm.role_id">
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="状态" v-model="adminForm.status">
            <el-option v-for="(item, index) in statsList" :key="index" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button>
            取消
          </el-button>
          <el-button type="primary">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.admin-page {
  padding: 20px;
}
</style>
