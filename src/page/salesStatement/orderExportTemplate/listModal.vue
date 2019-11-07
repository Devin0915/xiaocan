<template>
    <Modal
        v-model="filterVisible"
        title="列表下载"
        width="1000px"
        :footer-hide="true"
        :mask-closable="true"
    >       
        <Row>
            <CommonTable
                :tableColumns="columns"
                :tableData="dataTable"
                :pageTotal="total"
                :currentPage="pagination.pageNum"
                tableKey="listModal-table"
                :num="200"
                :tableLoading="tableLoading"
                @handlePageChange="handleGetTableData"
                >
            </CommonTable>
        </Row>
    </Modal>
</template>
<script>
import CommonTable from "@/components/shard/common-table";
import axios from '@/axios/config'
import { jsonToQueryString } from "@/utils";
import { getToken } from "@/utils/auth";
export default {
    components:{
        CommonTable
    },
    props:{
        row: {
            type: Object,
            default: () => {
                return {};
            }
        },
        visible: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            filterVisible:this.visible,
            dataTable: [],
            columns:[
                {title: '创建时间', key: 'created_at',align: 'center'},
                {title: '文件名',key: 'file_name',sortable:true,align: 'center',width: 500 },
                {title: '状态',key: 'status',sortable:true,align: 'center',
                    render:(h, params) => {
                        let value = '';
                        if (params.row.status == 0 ) value = '正在处理';
                        if (params.row.status == 1 ) value = '文件已生成';
                        if (params.row.status == 2 ) value = '导出异常';
                        return h('span',value)
                    }
                },
                {title: '备注',key: 'error_msg',align: 'center',sortable:true},
                {title: '操作',key: 'operation',sortable:true,align: 'center',
                    render: (h, params) => {
                        if(params.row.status == 1){
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                             this.handlefilePath(params.row)
                                        }
                                    }
                                }, '下 载'),
                            ]);
                        }else{
                            return h('span','请稍等')
                        }
                    }
                },
            ],
            total: 0,
            tableLoading: false,
            pagination: {
                pageNum: 1,
                pageSize: 25
            },
        }
    },
    watch: {
        filterVisible(val) {            
            this.$emit("update:visible", val);
        },
        visible(val) {
            this.filterVisible = val;
        },
    },
    created() {
        
    },
    methods:{
        handleGetTableData(){},
    }
    
}
</script>
<style lang="less" scoped>

</style>


