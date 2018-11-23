<template>
  <div class="teacher">
    <div class="header">
      <Row>
          <Col span="12" class-name="mycol1">
            <div class="headerImg">
              <img src="../assets/header_logo.png" alt="图片加载中...">
            </div>
          </Col>
          <Col span="12" class-name="mycol2">
            <h3>当前用户：{{name}}</h3>
            <h3>{{year}} {{month}}{{date}} {{week}}</h3>
          </Col>
      </Row>
    </div>
    <div class="layout">
        <Layout>
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed" class-name="mysider">
                <Menu :active-name="whereitem" theme="light" width="auto" :class="menuitemClasses"  @on-select="toAddPage">
                  <!-- <router-link :to="{ name:'ExamPage' }"> -->
                    <MenuItem name="1-1">
                        <Icon type="ios-create" />
                        <span>预约报名</span>
                    </MenuItem>
                  <!-- </router-link> -->
                    <MenuItem  name="1-2">
                        <Icon type="md-add" />
                        <span>发布考试</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="ios-list-box" />
                        <span>批次信息</span>
                    </MenuItem>
                    <MenuItem name="1-4">
                        <Icon type="md-time" />
                        <span>历史纪录</span>
                    </MenuItem>
                    <MenuItem name="1-5">
                        <Icon type="md-laptop" />
                        <span>成绩管理</span>
                    </MenuItem>
                    <MenuItem name="1-6">
                        <Icon type="md-folder-open" />
                        <span>学生管理</span>
                    </MenuItem>
                    <MenuItem name="1-7">
                        <Icon type="ios-close-circle-outline" />
                        <span>退出系统</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">信息技术与人工智能鉴定考核报名系统</Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <span>您当前的位置：</span>
                        <BreadcrumbItem v-for="(item,key) in breadList" :key="key">{{item}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <!-- <div style="height: 450px;"> -->
                          <router-view></router-view>
                        <!-- </div> -->
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
  </div>
</template>

<script>
import $hutn from './public/index'
import IP from './public/ip'
import {
  Button,
  Table,
  Layout,
  Header,
  Menu,
  MenuItem,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  Content,
  Sider,
  Submenu,
  Footer,
  Row,
  Col,
  Card
} from "iview";

export default {
  name: "Teacher",
  components: {
    Button,
    Table,
    Layout,
    Header,
    Menu,
    MenuItem,
    Icon,
    Breadcrumb,
    BreadcrumbItem,
    Content,
    Sider,
    Submenu,
    Footer,
    Row,
    Col,
    Card
  },
  data() {
    return {
      name: "",
      year:'',
      month:'',
      date:'',
      week:'',
      isCollapsed: true,
      whereitem:'1-1',//默认选中侧边哪一栏
      breadList:[],//设置面包屑数组

    };
  },
  computed:{
    menuitemClasses: function () {
        return [
            'menu-item',
            this.isCollapsed ? 'collapsed-menu' : ''
        ]
    }
  },
  methods:{
    /**
     * 侧边导航路由跳转
     */
    toAddPage(name){
      switch (name) {
        case '1-1':
          this.$router.push({name : 'ExamPage'})
          break;
        case '1-2':
          this.$router.push({name : 'AddPage'})
          break;
        case '1-3':
          this.$router.push({name : 'ExamMessage'})
          break;
        case '1-4':
          this.$router.push({name : 'HistoryExam'})
          break;
        case '1-5':
          this.$router.push({name : 'GradeManage'})
          break;
        case '1-6':
          this.$router.push({name : 'StudentManage'})
          break;
        case '1-7':
          this.exitLogin()
          break;
        default:
          break;
      }
      // this.getRoute()
    },
    exitLogin(){
      this.$Modal.confirm({
          title: '提示',
          content: '<p>你将退出管理系统, 是否继续?</p>',
          onOk: () => {
              this.$cookies.remove("token");
              this.$router.replace({name : 'Login'})
          },
          onCancel: () => {
              
          }
      });
    },
    /**
     * 设置面包屑
     */
    getRoute(){
      this.checkToken()
      var route = this.$route.matched;
      this.breadList = [];
      this.breadList.push(route[0].name,route[1].name)
      if(this.breadList[0] == 'Teacher'){
        this.breadList[0] = '首页'
      }
      if(this.breadList[1] == 'ExamPage'){
        this.whereitem = '1-1'
        this.breadList[1] = '预约报名'
      }else if(this.breadList[1] == 'AddPage'){
        this.whereitem = '1-2'
        this.breadList[1] = '发布考试'
      }else if(this.breadList[1] == 'ExamMessage'){
        this.whereitem = '1-3'
        this.breadList[1] = '批次信息'
      }else if(this.breadList[1] == 'HistoryExam'){
        this.whereitem = '1-4'
        this.breadList[1] = '历史纪录'
      }else if(this.breadList[1] == 'GradeManage'){
        this.whereitem = '1-5'
        this.breadList[1] = '成绩管理'
      }else if(this.breadList[1] == 'StudentManage'){
        this.whereitem = '1-6'
        this.breadList[1] = '学生管理'
      }else if(this.breadList[1] == 'Modification'){
        this.breadList[1] = '修改考试信息'
      }
      
      // route.forEach((item,index) => {
      //   // if(item.name == 'Teacher'){
      //   //   item.name = '首页'
      //   // }
      //   // if(item.name == 'ExamMessage'){
      //   //   item.name = '批次信息'
      //   //   this.whereitem = '1-3'
      //   // }
      //   // switch (item.name) {
      //   //   case 'Teacher':
      //   //     item.name = '首页'
      //   //     break;
      //   //   case 'ExamPage':
      //   //     this.whereitem = '1-1' //选中哪一个侧边栏item
      //   //     item.name = '预约报名'
      //   //     break;
      //   //   case 'AddPage':
      //   //     this.whereitem = '1-2'
      //   //     item.name = '发布考试'
      //   //     break;
      //   //   case 'ExamMessage':
      //   //     this.whereitem = '1-3'
      //   //     item.name = '批次信息'
      //   //     break;
      //   //   case 'HistoryExam':
      //   //     this.whereitem = '1-4'
      //   //     item.name = '历史纪录'
      //   //     break;
      //   //   case 'GradeManage':
      //   //     this.whereitem = '1-5'
      //   //     item.name = '成绩管理'
      //   //     break;
      //   //   case 'StudentManage':
      //   //     this.whereitem = '1-6'
      //   //     item.name = '学生管理'
      //   //   case 'Modification':
      //   //     item.name = '修改考试信息'
      //   //     break;
      //   //   default:
      //   //     break;
      //   // }
      //   this.breadList.push(item.name)
      //   // if(this.breadList[1] == '批次信息'){
      //   //   this.whereitem = '1-3'
      //   // }
      //   // console.log()
      // });
    },
    //登陆成功发送过来的数据
    getUserInfo(){
        this.name = this.$cookies.get('name')
        //获取时间
        let nowtime = new Date()
        this.year = nowtime.getFullYear() + '年'
        this.month = nowtime.getMonth() + 1 + '月'
        this.date = nowtime.getDate() + '日'
        let a = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        let str = nowtime.getDay()
        this.week = a[str]
    },  
    //监听token 是否存在 和 token是否有效
    checkToken(){
      // if(this.$cookies.isKey('token') == false){
      //   this.$router.push({name : 'Login'})
      // }
      let url = IP +'/computercultrue/index.php/teacher/login/valid_token'
        let params = {
            token: this.$cookies.get('token')
        }
      $hutn.httptokenGet(url, params, (data)=>{
        if(data.code !== 1){
          this.$Modal.warning({
              title: '警告',
              content: '<p>用户信息过期，请重新登陆</p>',
              onOk: () => {
                  this.$router.push({name : 'Login'})
              }
          });
        }
      },(error)=>{
        this.$Modal.warning({
            title: '警告',
            content: '<p>用户信息过期，请重新登陆</p>',
            onOk: () => {
              this.$router.push({name : 'Login'})
            }
        });
      })
    }
  },
  /**
   * 监听路由变化
   */
  watch:{
     $route:'getRoute'
  },
  mounted(){  
    this.getRoute();
    this.getUserInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.teacher{
    .header{
      background: #1f61af;
      height: 100px;
      min-width: 100%;
      padding: 10px;
      box-sizing: border-box;
    .mycol1{
      box-sizing: border-box;

    }
    .mycol2{
      text-align: right;
      h3{
        color: #fff;
        padding-right: 50px;
        &:nth-child(1){
          margin-top: 10px;
        } 
        &:nth-child(2){
          margin-top: 10px;
        } 
      }
    }
    .headerImg{
      height: 80px;
      img{
        height: 80px;
      }
    }
  }
  .layout{
    height: 100%;
    a{
      color: #515a6e;
    }
    .ivu-layout-header{
      text-align: center;
      font-size: 20px;
    }
    .ivu-layout-sider{
      background: #fff;
    }
  }
}

.layout-con{
    height: 100%;
    width: 100%;
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}

</style>
