<template>
  <div class="wrap">
    <ul>
      <li>date：{{ tableData[pageId].date }}</li>
      <li>name：{{ tableData[pageId].name }}</li>
      <li>address：{{ tableData[pageId].address }}</li>
    </ul>

    <div class="footer">
      <el-button @click="handleBack">back</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pageId = route.params.id as string

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

const handleBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20px;

  ul {
    margin: 0;
    padding: 20px;
    background-color: #ffffff;

    li {
      margin-bottom: 20px;
    }
  }
}

.footer {
  margin-top: 20px;
  text-align: center;
}
</style>
