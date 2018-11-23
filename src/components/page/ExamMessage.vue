<template>
    <div class="examMessage">
        <div class="title">
            <Row>
                <Col span="12">
                    <span>当前考试批次：{{value1}}</span>
                </Col>
                <Col span="12">
                    <span>考试批次查询：</span>
                    <Input v-model="value1" size="large" placeholder="请输入查询批次" style="width: auto"/>  
                    <Button type="info" size="large" @click="getInfo(value1,0)">查询</Button>  
                    <Button type="success" size="large" @click="downLoadExcel">导出excel表格</Button>
                </Col>
            </Row>
        </div>
        <Table height="400" border :columns="columns1" :data="data1" size="large"></Table>
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
  Tag,
  Col
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
        Tag,
        Col
    },
    data(){
        return{
            value1:'',
            columns1: [
                {
                    title: '编号',
                    key: 'id',
                    align: 'center',
                },
                {
                    title: '考试日期',
                    key: 'date',
                    align: 'center',
                },
                {
                    title: '考试地点',
                    key: 'address',
                    align: 'center',
                },
                {
                    title: '学院',
                    key: 'college',
                    align: 'center',
                },
                {
                    title: '班级',
                    key: 'class',
                    align: 'center',
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                    
                },
                {
                    title: '学号',
                    key: 'number',
                    align: 'center',
                },
            ],
            data1: []
        }
    },
    methods:{
        getExamID(){
            let info = this.$route.params.info
            this.value1 = info
        },
        downLoadExcel(){
            let url = IP +'/computercultrue/index.php/teacher/exam/' + this.value1
            let params = {
                download:1
            }
            $hutn.httpGet(url,params,(data)=>{
                window.location.href = data.msg
                // window.open(data.msg, '__blank')
                // console.log(data)
            })
        },
        getInfo(ID,val){
            let url = IP +'/computercultrue/index.php/teacher/exam/' + ID
            this.data1 = []
            let params = {
                download:val
            }
            $hutn.httpGet(url,params,(data)=>{
                // console.log(data)
                if(data.code == 1){
                    let msg = data.msg
                    let len = msg.length
                    for (let i = 0; i < len; i++) {
                        let A, B, C, D, E, F, G
                        A = i+1                   
                        B = msg[i].date                    
                        C = msg[i].place                    
                        D = msg[i].college                    
                        E = msg[i].class                    
                        F = msg[i].name                   
                        G = msg[i].student_id
                        this.data1.push({
                            id: A,
                            date: B,
                            address: C,
                            college: D,
                            class: E,
                            name: F,
                            number: G,
                        })
                        
                    }
                }
            })
        }
    },
    mounted(){
        // this.token = this.$cookies.get('token')
        // console.log(this.token)
        // this.getExamInfo() 
        this.getExamID() 
        this.getInfo(this.value1,0)
    }
}
</script>

<style lang="scss" scoped>
    .examMessage{
        .title{
            height: 50px;
            line-height: 50px;
            // margin-bottom: 10px;
            padding: 0px 10px;
            span{
                font-size: 18px;
                font-weight: 700;
            }
        }
    }
</style>
