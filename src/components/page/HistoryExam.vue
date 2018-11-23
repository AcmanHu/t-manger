<template>
    <div class="historyExam">
        <Table height="450" :columns="columns1" :data="data1" size="large" ref="table" stripe></Table>
    </div>
</template>

<script>
import $hutn from '../public/index'
import IP from '../public/ip'
import {
  Button,
  Table,
  Icon,
  Row,
  DatePicker,
  TimePicker,
  Input,
  InputNumber,
  Tag
} from "iview";
export default {
    components:{
        Table,
        Button,
        Icon,
        Row,
        DatePicker,
        TimePicker,
        Input,
        InputNumber,
        Tag
    },
    data(){
        return{
            columns1: [
                {
                    title: "批次",
                    key: "batch",
                    sortable: true,
                    align: 'center',
                },  
                {
                    title: "日期",
                    key: "data",
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('p', {
                                
                            },  params.row.date),
                            h('p', {
                                
                            },  params.row.datetime)
                        ]);
                    }
                },
                {
                    title: "地点",
                    key: "site",
                    align: 'center',
                },
                {
                    title: "参考总人数",
                    key: "refnumber",
                    align: 'center',
                },
                {
                    title: "报名人数",
                    key: "applynum",
                    align: 'center',
                },
                {
                    title: "标签",
                    key: "tag",
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(Tag, {
                                props: {
                                    color: params.row.tagstatus,
                                }
                            }, params.row.tag)
                        ]);
                    }
                },
                {
                    title: "操作",
                    key: "operate",
                    align: 'center',
                    width: 250,
                    render: (h, params) => {
                        return h('div', [
                            h(Button, {
                                props: {
                                    // type: 'primary',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '10px',
                                },
                                on: {
                                    click: () => {
                                        this.showLook(params)
                                    }
                                }
                            }, '查看'),
                            h(Button, {
                                props: {
                                    // type: 'primary',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '10px'
                                },      
                                on: {
                                    click: () => {
                                        this.instance(params)
                                    }
                                }
                            }, '删除'),
                            h(Button, {
                                props: {
                                    type: 'error',
                                    size: 'default'
                                },
                                on: {
                                    click: () => {
                                        this.exportData(1)
                                    }
                                }
                            }, '下载')
                        ]);
                    }
                },
            ],
            data1: [
                {
                    // batch: "1",
                    // date: '2018-10-25',
                    // datetime:'12:30:00',
                    // site: '10312机房',
                    // refnumber: '100',
                    // applynum: '92',
                    // tag: '报名中',
                    // tagstatus:'blue'
                }
            ]
        }
    },
    methods:{
        //对话框提示
        instance (params){
            this.$Modal.confirm({
                title: '警告',
                content: '<p>删除后将无法恢复, 是否继续?</p>',
                onOk: () => {
                    this.deleteInfo(params)
                },
                onCancel: () => {
                    this.$Message.info('已取消删除')
                }
            });
        },
        //删除考试
        deleteInfo(params){
            let url = IP +'/computercultrue/index.php/teacher/exam/' + params.row.batch
            $hutn.httpDelete(url,(data)=>{
                if(data.code == 1){
                    this.$Message.success(data.msg);
                    this.getExamInfo()
                }else{
                    this.$Message.info(data.msg);
                }
            })
        },
         //查看
        showLook (index) {
            // console.log(index.row.batch)
            this.$router.push({name:'GradeManage',params:{info:index.row.batch}
            })
        },
        //获取考试内容
        getExamInfo() {
            let params = {
                status:2
            }
            let url = IP +'/computercultrue/index.php/teacher/exam/'
            this.data1 = []
            $hutn.httpGet(url, params, (data)=>{
                let msg = data.msg
                let len = msg.length
                for (let i = 0; i < len; i++) {
                    let A, B, C, D, E, F, G
                    let myDate = msg[i].date.split(' ')
                    A = msg[i].id                    
                    B = myDate[0]                    
                    C = myDate[1]                    
                    D = msg[i].place                    
                    E = msg[i].total_mount                    
                    F = msg[i].current_mount                   
                    G = msg[i].status == 0?'报名中':'已结束'

                    this.data1.push({
                        batch: A,
                        date: B,
                        datetime:C,
                        site: D,
                        refnumber: E,
                        surplus: E-F,
                        surplusstatus:'orange',
                        applynum: F,
                        tag: G,
                        tagstatus:'green'
                    })
                    
                }

                
            })
        }
    },
    mounted(){
        // this.token = this.$cookies.get('token')
        // console.log(this.token)
        this.getExamInfo()  
    }
}
</script>

<style lang="scss" scoped>
</style>
