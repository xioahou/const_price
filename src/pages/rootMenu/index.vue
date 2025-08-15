<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus"
import { addMenuApi, delMenuApi, getMenuListApi } from "./api/api"

const typeList = ref([{ id: 1, label: "目录" }, { id: 2, label: "页面" }, { id: 3, label: "按钮" }])
const alwaysShowList = ref([{ id: 1, label: "是" }, { id: 2, label: "否" }])
const statusList = ref([{ id: 1, label: "启用" }, { id: 2, label: "禁用" }])
const tableData = ref([])
async function menuList() {
  const res: any = await getMenuListApi()
  if (res.code === 200) {
    tableData.value = res.data.list
  }
}
menuList()
const menuForm = ref({
  id: "",
  parent_id: "",
  path: "",
  type: "",
  component: "",
  redirect: "",
  name: "",
  title: "",
  elIcon: "",
  always_show: "",
  status: "",
  sort: ""
})

const ruleFormRef = ref<FormInstance>()
const dialogVisible = ref(false)
function addMenu() {
  dialogVisible.value = true
}
const rules = reactive<FormRules>({
  component: [{ required: true, message: "组件路径为必填", trigger: "blur" }],
  path: [{ required: true, message: "路由路径为必填", trigger: "blur" }],
  name: [{ required: true, message: "路由名称为必填", trigger: "blur" }],
  title: [{ required: true, message: "菜单标题为必填", trigger: "blur" }]
})
async function submitMenu(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res: any = await addMenuApi(menuForm.value)
      if (res.code === 200) {
        ElMessage({
          message: "新增成功",
          type: "success"
        })

        await menuList()
        dialogVisible.value = false
      }
    } else {
      console.log("error submit!", fields)
    }
  })
}
// 父级新增
function parentAddMenu(scope: any) {
  console.log(scope)

  dialogVisible.value = true
  menuForm.value.parent_id = scope.id
}
async function delMenu(id: string | number) {
  const res: any = await delMenuApi(id)
  if (res.code === 200) {
    ElMessage({
      message: "删除成功",
      type: "success"
    })
    await menuList()
  }
}
function edit(scope: any) {
  console.log(scope)
  menuForm.value.id = scope.id
  menuForm.value.parent_id = scope.parent_id
  menuForm.value.path = scope.path
  menuForm.value.type = scope.type
  menuForm.value.component = scope.component
  menuForm.value.redirect = scope.redirect
  menuForm.value.name = scope.name
  menuForm.value.title = scope.title
  menuForm.value.elIcon = scope.elIcon
  menuForm.value.always_show = scope.always_show
  menuForm.value.status = scope.status
  menuForm.value.sort = scope.sort
  dialogVisible.value = true
}
</script>

<template>
  <div class="root-menu">
    <el-row>
      <el-col>
        <el-button type="primary" @click="addMenu">
          新增菜单
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" row-key="id">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="parent_id" label="父级ID" width="180" />
      <el-table-column prop="path" label="路由/按钮(标识)" />
      <el-table-column prop="type" label="类型(1路由2按钮权限)" />
      <el-table-column prop="component" label="组件路径" />
      <el-table-column prop="name" label="页面名称" />
      <el-table-column prop="title" label="页面标题" />
      <el-table-column prop="icon" label="图标" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="is_del" label="是否删除" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="success" size="small" @click="edit(scope.row)">
            编辑
          </el-button>
          <el-button link type="primary" size="small" @click="parentAddMenu(scope.row)">
            新增
          </el-button>
          <el-button link type="danger" size="small" @click="delMenu(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="新增路由菜单" width="500" :close-on-click-modal="false">
      <el-form label-width="auto" style="max-width: 600px" ref="ruleFormRef" :model="menuForm" :rules="rules">
        <el-form-item label="路由路径" prop="path">
          <el-input v-model="menuForm.path" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select placeholder="请选择类型" v-model="menuForm.type">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="menuForm.component" />
        </el-form-item>
        <el-form-item label="重定向路径">
          <el-input v-model="menuForm.redirect" />
        </el-form-item>
        <el-form-item label="路由名称" prop="name">
          <el-input v-model="menuForm.name" />
        </el-form-item>
        <el-form-item label="菜单标题" prop="title">
          <el-input v-model="menuForm.title" />
        </el-form-item>
        <el-form-item label="菜单Icon图标">
          <el-input v-model="menuForm.elIcon" />
        </el-form-item>
        <el-form-item label="是否有子级菜单">
          <!-- <el-input v-model="menuForm.always_show" /> -->
          <el-select placeholder="请选择类型" v-model="menuForm.always_show">
            <el-option
              v-for="(item, index) in alwaysShowList"
              :key="index"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="menuForm.sort" />
        </el-form-item>
        <el-form-item label="状态">
          <!-- <el-input v-model="menuForm.status" /> -->
          <el-select placeholder="请选择状态" v-model="menuForm.status">
            <el-option
              v-for="(item, index) in statusList"
              :key="index"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button>
            取消
          </el-button>
          <el-button type="primary" @click="submitMenu(ruleFormRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.root-menu {
  padding: 20px;

  .el-table {
    margin-top: 10px;
  }
}
</style>
