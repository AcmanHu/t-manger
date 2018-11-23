<template>
    <div class="AddPage">
        <div class="title">
            考试时间：<DatePicker type="date" placeholder="选择日期" format="yyyy-MM-dd" @on-change="selectDate" style="width: 200px"></DatePicker> -
                    <TimePicker type="time" placeholder="选择时间" @on-change="selectTime" style="width: 168px"></TimePicker>
            地点：<Input v-model="value1" placeholder="开始地点" style="width: 150px" />
            人数：<InputNumber :max="500" :min="0" :step="10" v-model="value2"></InputNumber>
            批次：<InputNumber :max="100" :min="0" :step="1" v-model="value3"></InputNumber>
            <Button class="issueBtn" type="primary" @click="sendExam">立即发布</Button>
        </div>
        <!-- <Button type="primary" @click="info">Display info prompt</Button> -->
        <!-- <Table border :columns="columns7" :data="data6"></Table> -->
        <Table height="400" :columns="columns1" :data="data1" size="large" ref="table"></Table>
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
            value1:'',
            value2:0,
            value3:0,
            date:'',
            time:'',
            token:'',
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
                                },
                                style: {
                                    color: '10px',
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
                            h(Button, {
                                props: {
                                    // type: 'primary',
                                    // size: 'small'
                                },
                                style: {
                                    marginRight: '10px',
                                },
                                on: {
                                    click: () => {
                                        this.compile(params)
                                    }
                                }
                            }, '编辑'),
                            h(Button, {
                                props: {
                                    // type: 'primary',
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
                                        this.instance(params)
                                    }
                                }
                            }, '停止报名')
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
                //     tag: '报名中',
                //     tagstatus:'blue'
                // }
            ]
        }
    },
    methods:{
        //弹出对话框
        instance (params){
            this.$Modal.confirm({
                title: '警告',
                content: '<p>此操作将无法再次开启报名, 是否继续?</p>',
                onOk: () => {
                    this.stopExam(params)
                },
                onCancel: () => {
                    this.$Message.info('已取消操作')
                }
            });
        },
        //停止报名
        stopExam (val) {
            // console.log(params)
            let params = {
                status: 1
            }
            let url = IP +'/computercultrue/index.php/teacher/exam/'+ val.row.batch
            $hutn.httpPut(url, params, (data)=>{
                if(data.code == 1){
                    this.$Message.success('操作成功');
                    this.getExamInfo()
                }else{
                    this.$Message.info(data.msg);
                }
            })
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
        //删除表中的一行数据
        remove (index) {
            this.data1.splice(index, 1);
        },
        //发布成功的全局提示
        info (msg) {
            this.$Message.success(msg);
        },
        //获取选择的日期
        selectDate(date){
            this.date = date
        },
        //获取选择时间
        selectTime(time){
            this.time = time
            // console.log(this.time)
        },
        sendExam() {    
            let params = {
                id: this.value3,
                date: this.date+' '+this.time,
                place: this.value1,
                total_mount:this.value2
            }
            let url = IP +'/computercultrue/index.php/teacher/exam/create';
            $hutn.httpGet(url, params, (data)=>{
                // console.log(data)
                this.info(data.msg)
                if(data.code === 1){
                    this.getExamInfo()
                }
            })
        },
        //获取考试内容
        getExamInfo() {
            let params = {
                status:0
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
                    G = msg[i].status == 0?'报名中':'结束'

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
                        tagstatus:'blue'
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
    .AddPage{
        .title{
            height: 50px;
            line-height: 50px;
            // margin-bottom: 10px;
            padding: 0px 10px;
            .issueBtn{
                margin-left: 20px;
            }
        }
    }
</style>
