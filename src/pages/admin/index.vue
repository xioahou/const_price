<script setup lang="ts">
import { SCOPE, type FormInstance, type FormRules } from "element-plus"
import { getRoleListApi } from "@/pages/role/apis/api"
import { addAdminApi, getAdminListApi, editStatusApi, delAdminApi } from "./apis/api"
import {Search,Plus} from '@element-plus/icons-vue'
const loadingBtn = ref(false)
const typeList = ref([{ id: "1", label: "超级管理员" }, { id: "2", label: "普通管理员" }])
const statsList = ref([{ id: 1, label: "正常" }, { id: 2, label: "停用" }])
const roleList: any = ref([])
const paramsForm = ref({
  page: 1,
  limit: 10,
  username: "",
  type: "",
  name: "",
  status: ""
})
const total = ref(0)
async function getRoleList() {
  const res: any = await getRoleListApi()
  console.log("res", res)
  if (res.code === 200) {
    roleList.value = res.data.list
    console.log(res.data.total)
  } else {
    ElMessage.error(res.msg)
  }
}
getRoleList()

const dialogVisible = ref(false)
const title = ref("新增管理员")
const ruleFormRef = ref<FormInstance>()
const tableData = ref([])
async function getAdminList() {
  const res: any = await getAdminListApi(paramsForm.value)
  console.log(res)
  if (res.code === 200) {
    tableData.value = res.data.list
    total.value = res.data.total
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
async function submitAdmin(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {

    if (valid) {
      loadingBtn.value = true
      const data = {
        id: adminForm.value.id,
        username: adminForm.value.username,
        password: adminForm.value.password,
        name: adminForm.value.name,
        type: adminForm.value.type,
        role_id: adminForm.value.role_id.join(","),
        status: adminForm.value.status
      }
      const res: any = await addAdminApi(data)
      if (res.code === 200) {
        loadingBtn.value = false
        cancelAddAdmin(formEl)
        await getAdminList()
        ElMessage.success("新增成功")
      }
    } else {
      ElMessage.error("请完善信息")
    }
  })
}
function cancelAddAdmin(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
  adminForm.value.role_id = []
  adminForm.value.id = ""
  adminForm.value.status = ""
  adminForm.value.type = ""
  adminForm.value.name = ""
  adminForm.value.password = ""
  adminForm.value.username = ""
  title.value = "新增管理员"
  dialogVisible.value = false
}
async function handleSizeChange(val: number) {
  paramsForm.value.limit = val
  await getAdminList()
}
async function handleCurrentChange(val: number) {
  paramsForm.value.page = val
  await getAdminList()
}
async function changeStatus(val: any, id: any) {
  const res: any = await editStatusApi({ id: id, status: val })
  if (res.code === 200) {
    ElMessage.success("状态修改成功")
    await getAdminList()
  } else {
    ElMessage.error('修改失败')
  }
}
function handleEdit(scope: any) {
  console.log('scope', scope);

  dialogVisible.value = true
  title.value = "编辑管理员"
  adminForm.value.username = scope.username
  adminForm.value.password = scope.password
  adminForm.value.name = scope.name
  adminForm.value.type = String(scope.type)
  adminForm.value.role_id = scope.role_id.split(",").map((item: string) => Number(item))
  adminForm.value.status = scope.status
  adminForm.value.id = scope.id

}
async function handleDel(id: number) {


  ElMessageBox.confirm(
    '确定删除此管理员?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {

      const res: any = await delAdminApi(id)
      if (res.code === 200) {
        ElMessage.success("删除成功")
        await getAdminList()
      } else {
        ElMessage.error("删除失败")
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      })
    })
}
function searchAdmin() {
  getAdminList()
}
</script>

<template>
  <div class="admin-page">
    <el-card>
      <el-row :gutter="4">
        <el-col :span="3">
          <el-input placeholder="登录名" v-model="paramsForm.username" clearable @clear="getAdminList"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="姓名" v-model="paramsForm.name" clearable @clear="getAdminList"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="身份类型" v-model="paramsForm.type" clearable @clear="getAdminList">
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.label" :value="item.id" />
          </el-select>
        </el-col >
        <el-col :span="3" >
            <el-select placeholder="状态" v-model="paramsForm.status" clearable @clear="getAdminList">
            <el-option v-for="(item, index) in statsList" :key="index" :label="item.label" :value="item.id" />
          </el-select>
        </el-col>
 <el-col :span="1">
          <el-button type="success" @click="searchAdmin" :icon="Search">
            搜索
          </el-button>
        </el-col>
        <el-col :span="1" :offset="9">
          <el-button type="primary" @click="addAdmin" :icon="Plus">
            新增
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="type" label="身份类型">
        <template #default="scope">
          <span v-if="scope.row.type === 1">超级管理员</span>
          <span v-else>普通管理员</span>
        </template>

      </el-table-column>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="role_id" label="角色ID"/>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-switch @change="(val) => changeStatus(val, scope.row.id)" v-model="scope.row.status"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" :active-value="1"
            :inactive-value="2" />
        </template>
      </el-table-column>
      <el-table-column prop="time" label="维护时间" />
      <el-table-column prop="update_time" label="修改时间" />
      <el-table-column prop="role_name" label="角色名称"/>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button link type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="title" width="500" @close="cancelAddAdmin(ruleFormRef)"
      :close-on-click-modal="false">
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
        <el-form-item label="角色分配" prop="role_id" v-if="adminForm.type === '2'">
          <el-select placeholder="选择角色" v-model="adminForm.role_id" multiple>
            <el-option v-for="(item, index) in roleList" :key="index" :label="item.name" :value="item.id" />
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
          <el-button @click="cancelAddAdmin(ruleFormRef)">
            取消
          </el-button>
          <el-button type="primary" :loading="loadingBtn" @click="submitAdmin(ruleFormRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-pagination v-model:current-page="paramsForm.page" v-model:page-size="paramsForm.limit"
      :page-sizes="[10, 20, 30, 40, 50]" layout="sizes,prev, pager, next" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<style scoped lang="scss">
.admin-page {
  padding: 20px;

  .el-table {
    margin-top: 10px;
  }

  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>
