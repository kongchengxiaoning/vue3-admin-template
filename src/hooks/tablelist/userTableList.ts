import { ref, reactive, nextTick, toRefs } from 'vue'
import type { ElTable } from 'element-plus'

export default function () {
  const tableMap = reactive({
    paging: {
      pageNum: 1,
      pageSize: 20, // 每页条数
      totalCount: 0 // 总条数
    },
    parameter: {
      totalCount: 0
    },
    selectCodes: [],
    originalData: [],
    mixinsLoading: false,
    ajaxRequest: null,
    resetDateVariable: [],
    tableData: [],
    multipleTableKey: '',
    isMultipleTable: false,
    //初始化数据
    reload(param, apiData) {
      tableMap.paging.pageNum = 1
      tableMap.ajaxRequest = apiData.ajaxRequest
      tableMap.parameter = param || {}
      tableMap.filterFrom()
    },
    /* 集中处理筛选数据 */
    filterFrom() {
      const parameter = tableMap.parameter
      for (const key in parameter) {
        // 如果属性为空 删除掉
        if (parameter[key] === '' || parameter[key] === null) {
          delete parameter[key]
        }
      }
      tableMap.getList()
    },
    // 获取列表数据
    async getList() {
      const parameter = tableMap.parameter
      const paging = tableMap.paging
      tableMap.mixinsLoading = true
      Object.assign(parameter, paging)
      delete tableMap.parameter.totalCount
      try {
        const { body } = await tableMap.ajaxRequest(tableMap.handleQueryData(parameter))
        tableMap.originalData = body
        tableMap.tableData = body?.items || []
        tableMap.paging.totalCount = body?.totalCount || 0
        if (tableMap.isMultipleTable) {
          tableMap.tableSelect()
        } else {
          tableMap.mixinsLoading = false
        }
      } catch (error) {
        console.log('err:', error)
        tableMap.tableData = []
        tableMap.mixinsLoading = false
      }
    },
    // 控制表格默认选中
    tableSelect() {
      if (!tableMap.tableData && !tableMap.tableData.length) {
        tableMap.mixinsLoading = false
        return
      }
      tableMap.tableData.forEach((element) => {
        if (tableMap.selectCodes.join().includes(element[tableMap.multipleTableKey])) {
          const multipleTableRef = ref<InstanceType<typeof ElTable>>()
          nextTick(() => {
            multipleTableRef.value!.toggleRowSelection(element, true)
          })
        }
      })
      tableMap.mixinsLoading = false
    },
    handleQueryData(parameter) {
      console.log(parameter, 'mixins查询参数')
      return parameter
    },
    // 重置表单
    reset(param = {}) {
      // 时间日期处理
      if (tableMap.resetDateVariable && tableMap.resetDateVariable.length) {
        tableMap.resetDateVariable.forEach((element) => {
          tableMap.paging[element] = []
        })
      }
      for (const item in tableMap.parameter) {
        tableMap.parameter[item] = ''
      }
      Object.assign(tableMap.parameter, param)
      tableMap.filterFrom()
      tableMap.selectCodes = []
    },
    //分页 change事件
    handleCurrentChange(pagingParam) {
      Object.assign(tableMap.paging, pagingParam)
      tableMap.getList()
    }
  })

  return {
    ...toRefs(tableMap)
  }
}
