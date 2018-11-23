<template>
    <div class="gradeManage">
        <div class="title">
            <Row>
                <Col span="12">
                    <span>批次查询：</span>
                    <Input v-model="value1" size="large" placeholder="请输入查询批次" style="width: auto"/>  
                    <Button type="info" size="large" @click="getInfo(value1)">查询</Button>
                    <Upload :action="url"
                            :headers="headers"
                            multiple
                            :show-upload-list="false"
                            accept="xlsx"
                            :before-upload="berforeUpload"
                            :on-success="successInfo"
                            :on-error="errorInfo"
                            :on-progress="progressInfo"
                            >
                        <Button type="success" icon="ios-cloud-upload-outline" size="large">导入学生成绩表</Button>
                    </Upload>  
                </Col>
                <Col span="12" class="coldown">
                    <Button size="large" icon="ios-download-outline" type="primary" @click="gradeDownExcel">成绩样表下载</Button>
                </Col>
            </Row>
        </div>
        <Progress :percent="loading" v-show="progressShow" :status="prostatus" />
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
  Col,
  Upload,
  Progress 
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
        Col,
        Upload,
        Progress 
    },
    data(){
        return{
            value1:'',
            progressShow:false,
            prostatus:'active',
            url:IP +'/computercultrue/index.php/teacher/student/score',
            headers:{
                'X-TOKEN': this.$cookies.get('token')
            },
            loading: 0,
            columns1: [
                {
                    title: '考试日期',
                    key: 'date',
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
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '学号',
                    key: 'number',
                    align: 'center',
                },
                {
                    title: '班级',
                    key: 'class',
                    align: 'center',
                    
                },
                {
                    title: '成绩',
                    key: 'grade',
                    align: 'center',
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(Tag, {
                                props: {
                                    color: params.row.statuscolor,
                                }
                            }, params.row.status)
                        ]);
                    }
                },
            ],
            data1: [
                {
                    date: 'John Brown',
                    datetime: 'John Brown',
                    address: 18,
                    college: 'New York No. 1 Lake Park',
                    name: '1',
                    number: '2',
                    class: '3',
                    grade: '4',
                    status: '未通过',
                    statuscolor:'blue'
                },
            ]
        }
    },
    methods:{
        //上传之前执行的函数
        berforeUpload(val){
            this.progressShow = true
            let msg = '文件正在上传中，您不要慌，上传成功后我会自动关闭哦'
            this.NoticeInfo(msg, 'startUpload', 0)
            // console.log(val)
        },
        //上传成功执行的函数
        successInfo(response, file, fileList){
            // console.log(response)
            if(response.code == 1){
                this.progressShow = false
                let msg = '文件上传成功'
                this.Noticesuccess(msg,'successUoload',4)
                this.$Notice.close('startUpload')
                this.$Notice.close('errorUoload')
            }else{
                this.prostatus = 'wrong'
                this.$Notice.close('startUpload')
                let msg = response.msg
                console.log(response)
                this.$Notice.close('errorUoload')
                this.Noticeerror(msg,'errorUoload',0)
            }
        },
        //上传失败执行的函数
        errorInfo(error, file, fileList){
            this.prostatus = 'wrong'
            this.progressShow = false
            this.$Notice.close('startUpload')
            let msg = '文件上传失败，请重试'
            this.Noticeerror(msg,'errorUoload',0)
            // console.log(error)
        },
        //上传的过程中执行的函数
        progressInfo(event, file, fileList){
            // console.log(event)
            this.loading = parseInt(event.percent)
        },
        //成绩样表下载
        gradeDownExcel(){
            let url = IP +'/computercultrue/index.php/teacher/demo/score'
            $hutn.httpGet(url,{},(data)=>{
                // console.log(data)
                window.location.href = data
            })
        },
        getGradeInfo(){
            let info = this.$route.params.info
            this.value1 = info
        },
        //获取成绩信息
        getInfo(ID){
            let url = IP +'/computercultrue/index.php/teacher/exam/' + ID
            this.data1 = []
            $hutn.httpGet(url,{},(data)=>{
                // console.log(data)
                if(data.code == 1){
                    let msg = data.msg
                    let len = msg.length
                    for (let i = 0; i < len; i++) {
                        let A, T, B, C, D, E, F, G
                        let myDate = msg[i].date.split(' ')
                        A = myDate[0]               
                        T = myDate[1]              
                        B = msg[i].place                    
                        C = msg[i].college                    
                        D = msg[i].name                    
                        E = msg[i].student_id                    
                        F = msg[i].class
                        G = msg[i].score
                        this.data1.push({
                            date: A,
                            datetime: T,
                            address: B,
                            college: C,
                            name: D,
                            number: E,
                            class: F,
                            grade: G == null?0:G,
                            status: G<60?'未通过':'通过',
                            statuscolor:'blue'
                        })
                        
                    }
                }
            })
        },
        //设置通知信息提醒
        NoticeInfo(msg, name, time){
            this.$Notice.info({
                title: '温馨提醒',
                desc: '喜刷刷',
                duration: time,
                name:name,
                render: h => {
                    return h('div', [
                        h('span', {
                            style:{
                                lineHeight:'20px',
                                fontSize:'14px'
                            }
                            },msg),
                        
                    ])
                }
            });
        },
        //成功的通知提醒
        Noticesuccess(msg, name, time){
            this.$Notice.success({
                title: '上传成功',
                desc: '喜刷刷',
                duration: time,
                name:name,
                render: h => {
                    return h('div', [
                        h('span', {
                            style:{
                                lineHeight:'20px',
                                fontSize:'14px'
                            }
                            },msg),
                        
                    ])
                }
            });
        },
        //失败的通知提醒
        Noticeerror(msg, name, time){
            this.$Notice.error({
                title: '上传失败',
                desc: '喜刷刷',
                duration: time,
                name:name,
                render: h => {
                    return h('div', [
                        h('span', {
                            style:{
                                lineHeight:'20px',
                                fontSize:'14px'
                            }
                            },msg),
                        
                    ])
                }
            });
        }
    },
    mounted(){
        this.getGradeInfo()
        this.getInfo(this.value1)
    }
}
</script>

<style lang="scss" scoped>
    .gradeManage{
        .ivu-upload{
            display: inline-block;
        }
        .title{
            height: 50px;
            line-height: 50px;
            // margin-bottom: 10px;
            padding: 0 10px;
            span{
                font-size: 18px;
                font-weight: 700;
            }
            .coldown{
                text-align: right;
            }
        }
    }
</style>
