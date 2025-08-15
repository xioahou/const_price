<template>
  <div class="file_page">
    <el-card>
      <el-button type="primary" >上传</el-button>
    </el-card>
    <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="url" label="地址" width="180" />
    <el-table-column prop="ext" label="类型" />
    <el-table-column prop="admin_id" label="管理员Id" />
    <el-table-column prop="admin_name" label="管理员" />
    <el-table-column prop="time" label="维护时间" />
  </el-table>
  </div>
</template>

<script setup lang="ts">
import { getFileListApi } from './apis/apis'
const tableData = ref([])
const paramsForm = ref({
  page: 1,
  limit: 10,
  admin_id: '',
  user_id:1
})
const getList = async () => {
  const res:any = await getFileListApi(paramsForm.value)
  tableData.value = res.data
}
getList()
</script>

<style scoped>
.file_page{
  padding:10px;
}
</style>
