<template>
    <div class="examPage">
        <Table height="400" :columns="columns1" :data="data1" size="large" ref="table"></Table>
        <br>
        <!-- <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon>导出原始数据</Button>
        <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon>导出排序和过滤后的数据</Button>
        <Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon>导出自定义数据</Button> -->
    </div>
</template>

<script>
import $hutn from '../public/index'
import IP from '../public/ip'
import {
  Button,
  Table,
  Icon,
  Tag 
} from "iview";
export default {
    components:{
        Button,
        Table,
        Icon,
        Tag
    },
    data(){
        return{ 
            name:'',
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
                    title: "剩余名额",
                    key: "surplus",
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(Tag, {
                                props: {
                                    color: params.row.surplusstatus,
                                }
                            },  params.row.surplus)
                        ]);
                    }
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
                    width: 300,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'default',
                                    size: 'default',
                                    // shape:"circle"
                                },
                                style: {
                                    marginRight: '10px',
                                    // fontSize: '14px'
                                },
                                on: {
                                    click: () => {
                                        this.compile(params)
                                    }
                                }
                            }, '编辑'),
                            h(Button, {
                                props: {
                                    type: 'default',
                                    // size: 'small'
                                },
                                style: {
                                    marginRight: '10px'
                                },      
                                on: {
                                    click: () => {
                                        this.showLook(params)
                                    }
                                }
                            }, '查看'),
                            h(Button, {
                                props: {
                                    type: 'error',
                                    // size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.exportData(1)
                                    }
                                }
                            }, '报名报下载')
                        ]);
                    }
                },
            ],
            data1: [
                // {
                //     batch: "1",
                //     date: '2018-10-25',
                //     datetime:'12:30:00',
                //     site: '10312机房',
                //     refnumber: '100',
                //     surplus: '8',
                //     surplusstatus:'blue',
                //     applynum: '92',
                //     tag: '报名已停止',
                //     tagstatus:'volcano'
                    
                // }
            ]
        }
    },
    methods:{
        exportData (type) {
            if (type === 1) {
                this.$refs.table.exportCsv({
                    filename: 'The original data'
                });
            } else if (type === 2) {
                this.$refs.table.exportCsv({
                    filename: 'Sorting and filtering data',
                    original: false
                });
            } else if (type === 3) {
                this.$refs.table.exportCsv({
                    filename: 'Custom data',
                    columns: this.columns8.filter((col, index) => index < 4),
                    data: this.data7.filter((data, index) => index < 4)
                });
            }
        },
        //查看
        showLook (index) {
            // console.log(index.row.batch)
            this.$router.push({name:'ExamMessage',params:{info:index.row.batch}
            })
        },
        //编辑
        compile(index){
            // console.log(index.row)
            this.$router.push({name:'Modification',params:{
                info:{
                        batch:index.row.batch,
                        date:index.row.date,
                        site:index.row.site,
                        datetime:index.row.datetime,
                        refnumber:index.row.refnumber,
                    }
            }})
        },
        remove (index) {
            this.data1.splice(index, 1);
        },
         //获取考试内容
        getExamInfo() {
            let params = {
                // status:0
            }
            let url = IP +'/computercultrue/index.php/teacher/exam/'
            this.data1 = []
            $hutn.httpGet(url, params, (data)=>{
                let msg = data.msg
                // console.log(msg)
                let len = msg.length
                for (let i = 0; i < len; i++) {
                    if(msg[i].status == '2') continue
                    let A, B, C, D, E, F, G
                    let myDate = msg[i].date.split(' ') 
                    A = msg[i].id                    
                    B = myDate[0]                    
                    C = myDate[1]                    
                    D = msg[i].place                    
                    E = msg[i].total_mount                    
                    F = msg[i].current_mount                   
                    G = msg[i].status == 0?'报名进行中':'报名已结束'

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
                        tagstatus:G == '报名进行中'?'blue':'green'
                    })
                }
            })
        }
    },
    mounted(){
        this.getExamInfo()
    }
}
</script>

<style>

</style>
