<template>
  <div class="role_page">
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" :icon="Plus" @click="dialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="权限值" />
      <el-table-column prop="menus" label="枚举值" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="time" label="维护时间" />
      <el-table-column prop="time" label="维护时间" />
      <el-table-column fixed="right" label="操心" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editRole(scope.row)">
            编辑
          </el-button>
          <el-button link type="danger" size="small" @click="delRole(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="新增权限" width="500" @close="handleRole(ruleFormRef)">
      <el-form ref="ruleFormRef" style="max-width: 600px" label-width="auto"  :model="roleForm"
    :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="roleForm.name" placeholder="请输入权限名称"/>
        </el-form-item>
          <el-form-item label="权限名称枚举值" prop="menus">
          <el-input v-model="roleForm.menus" placeholder="请输入权限名称枚举值"/>
        </el-form-item>
          <el-form-item label="权限排序" prop="sort">
          <el-input v-model="roleForm.sort" placeholder="请输入权限排序"/>
        </el-form-item>
      </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="handleRole(ruleFormRef)">取消</el-button>
            <el-button type="primary" @click="addRole(ruleFormRef)" :loading="loadingBtn">
              确定
            </el-button>
          </div>
        </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">


import type { FormInstance, FormRules } from 'element-plus'
import { getRoleListApi,addRoleApi,delRoleApi } from './apis/api'
import { Plus } from '@element-plus/icons-vue'
const tableData = ref([])
const loadingBtn = ref(false)
async function roleList() {
  const res: any = await getRoleListApi()
  if (res.code === 200) {
    tableData.value = res.data.list
  }
}
roleList()
const dialogVisible = ref(false)
const roleForm = ref({
  name: '',
  sort: "",
  menus: "",
  id:''
})
const ruleFormRef = ref<FormInstance>()
const addRole = async (formEl: FormInstance | undefined) => {
   if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loadingBtn.value = true
      const res: any = await addRoleApi(roleForm.value)
      if (res.code === 200) {
        dialogVisible.value = false
        loadingBtn.value = false
        handleRole(formEl)
        roleList()
        ElMessage({
          message: '添加成功',
          type: 'success',
        })
    }
    } else {
      ElMessage({
        message: '请输入完整信息',
        type: 'error',
      })
    }
  })
}
function handleRole(formEl: FormInstance | undefined) {
  dialogVisible.value = false
   if (!formEl) return
  formEl.resetFields()
  roleForm.value.name = ''
  roleForm.value.sort = ''
  roleForm.value.menus = ''
  roleForm.value.id = ''

}
function editRole(scope: any) {
  dialogVisible.value = true
  roleForm.value.id = scope.id
  roleForm.value.name = scope.name
  roleForm.value.sort = scope.sort
  roleForm.value.menus = scope.menus
}
async function delRole(id:number) {
  const res: any = await delRoleApi(id)
ElMessageBox.confirm(
    '确定删除?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(async () => {
    const res: any = await delRoleApi(id)
    if (res.code === 200) {
                  ElMessage({
        type: 'success',
        message: '删除成功',
                  })
                  roleList()
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败',
      })
        }

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      })
    })
}
const rules = reactive<FormRules>({
 name: [
    { required: true, message: '请输入权限名称', trigger: 'blur' },
  ],
  menus: [
    { required: true, message: '请输入权限名称枚举值', trigger: 'blur' },
  ],
  sort: [
    { required: true, message: '请输入权限排序', trigger: 'blur' }]
})
</script>

<style scoped lang="scss">
.role_page {
  padding: 10px;
  box-sizing: border-box;

  .el-card {
    margin-bottom: 10px;
  }
}
</style>
