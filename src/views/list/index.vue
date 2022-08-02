<template>
  <div class="wrap">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="date" label="Date" width="200" sortable />
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="address" label="Address" />
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleClick(scope.$index)">
            Detail
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const handleClick = (index) => {
  router.push({
    path: `/list/details/${index}`
  })
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20px;
}
</style>
