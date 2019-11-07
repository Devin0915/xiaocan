/**
 * 全局混入
 */
function broadcast (componentName, eventName, params) {
    this.$children.forEach(child => {
      var name = child.$options.componentName
      if (name === componentName) {
        child.$emit.apply(child, [eventName].concat(params))
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]))
      }
    })
  }
  
  export default{
    props: {
      size: {
        type: String,
        default: 'default'
      }
    },
    data () {
      return {
        // 要把大部分的动作都记录下来
        event: {
          // 普通搜索
          search: '_patozon_search',
          // 批量
          batch: '_patozon_batch_search',
          // 筛选
          filtrate: '_patozon_filtrate_search',
          // 重置
          reset: '_patozon_reset',
          // 点击行
          clickRow: '_patozon_click_row',
          // 分页
          page: '_patozon_page_search',
          // 调整了列
          resizeLine: '_patozon_resize_table_cloumns',
          // 调整了大小(生成/删除了标签 按住了f12 等行为)
          resize: '_patozon_resize_size',
          // 刷新Table
          refreshTable: '_patozon_table_refresh',
          // 刷新分页参数
          refreshPage: '_patozon_table_refresh_page',
          // 查询
          allQuery: '_patozon_search_all_query',
  
          loading: '_patozon_loading',
  
          resizeSearch: '_patozon_search_resize'
  
        }
      }
    },
    methods: {
      dispatch (componentName, eventName, params) {
        var parent = this.$parent || this.$root
        var name = parent.$options.componentName
  
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent
  
          if (parent) {
            name = parent.$options.componentName
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params))
        }
      },
      broadcast (componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params)
      },
      isEmpty (obj) {
        // 是否为空 空JSON 对象 也算是空对象
        if (this.isJson(obj)) {
          for (var name in obj) {
            return false
          }
          return true
        }
        return (typeof obj === 'undefined' || obj === null || obj === '' || (Array.isArray(obj) && obj.length < 1))
      },
      isJson (obj) {
        // 是否为JSON串
        return typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() == '[object object]' && !obj.length
      },
      isString (obj) {
        // 是否为字符串
        return Object.prototype.toString.call(obj) === '[object String]'
      },
      trim (obj, flag = true) {
        // 去空(字符串,JSON对象,数组)
        if (!this.isEmpty(obj)) {
          if (this.isJson(obj)) {
            for (let i in obj) {
              let item = obj[i]
              if (this.isEmpty(item)) {
                delete obj[i]
                continue
              }
              this.trim(item, false)
            }
          } else if (Array.isArray(obj)) {
            for (let i in obj) {
              let item = obj[i]
              if (this.isEmpty(item)) {
                delete obj[i]
                continue
              }
              this.trim(item, false)
            }
          } else if (this.isString(obj) && flag) {
            obj = obj.replace(/(^\s*)|(\s*$)/g, '')
          }
        }
        return obj
      },
      recursion (arr, key) {
        if (Array.isArray(arr) && arr.length > 0) {
          for (let i in arr) {
            let item = arr[i]
            let {value, children} = item
            if (typeof value !== 'undefined' && value !== null && value !== '') {
              if (value == key) {
                return item
              } else if (Array.isArray(children) && children.length > 0) {
                let arr = this.recursion(children, key)
                if (typeof arr !== 'undefined' && arr !== null) {
                  return arr
                }
              }
            }
          }
        }
      },
      transform (arr, value, unit) {
        if (Array.isArray(arr)) {
          let reception = []
          if (Array.isArray(value)) {
            value.forEach(item => {
              reception.push(this.recursion(arr, item))
            })
          } else {
            reception.push(this.recursion(arr, value))
          }
  
          if (Array.isArray(reception) && reception.length > 0) {
            if (Array.isArray(value)) {
              if (reception.length !== value.length) {
                value.forEach((v, index) => {
                  let isExist = false
                  for (let i in reception) {
                    let {label, value, id} = reception[i]
                    let key1 = value || id
                    if (key1 == v) {
                      isExist = true
                      break
                    }
                  }
                  if (!isExist) {
                    // 插入
                    if (reception.length >= index) {
                      reception.splice(index, 0, {label: v})
                    } else {
                      reception.push({label: v})
                    }
                  }
                })
              }
            }
  
            let result = reception.map((list = {}) => {
              if (!this.isEmpty(unit)) {
                return list.label + ' ' + unit
              }
              return list.label
            }).join(',')
            return result
          }
        }
        if (Array.isArray(value)) {
          if (!this.isEmpty(unit)) {
            return value.map(a => a + ' ' + unit).join(',')
          }
          return value.join(',')
        } else {
          if (!this.isEmpty(unit)) {
            return value + ' ' + unit
          }
          return value
        }
      }
    }
  }
  