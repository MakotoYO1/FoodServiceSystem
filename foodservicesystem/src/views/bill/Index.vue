<template>
  <div class="bill main">
    <div class="table_search page_line">
      <el-input
        placeholder="账单编号"
        v-model="filter.showId"
        class="input"
        clearable
      ></el-input>
      <el-input
        placeholder="桌台编号"
        v-model="filter.showId_t"
        class="input"
        clearable
      ></el-input>
      <el-input
        placeholder="服务人员编号"
        v-model="filter.showId_s"
        class="input"
        clearable
      ></el-input>
      <el-date-picker
        placeholder="请选择立账时间"
        v-model="filter.created_time"
        clearable
        value-format="yyyy-MM-dd"
        class="select middle">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <span style="padding-top:10px;">当前总金额：<span class="price">{{'￥:'+totalPrice}}</span></span>
      <el-button class="add" type="primary" icon="el-icon-circle-plus-outline" @click="addBill">新增账单</el-button>
    </div>
    <div class="table_show">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column label="账单编号" prop="showId" align="center"></el-table-column>
        <el-table-column label="立账时间"  align="center">
          <template slot-scope="scope">
            {{scope.row.created_time}}
          </template>
        </el-table-column>
        <el-table-column label="桌台编号" prop="showId_t" align="center"></el-table-column>
        <el-table-column label="服务人员编号" prop="showId_s" align="center"></el-table-column>
        <el-table-column label="消费总金额" align="center" prop="cost_total"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
          size="mini"
          icon="el-icon-view"
          type="success"
          @click="checkBill(scope.row)">查看账单</el-button>
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="editBill(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- form -->
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" :close-on-click-modal="false" center>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="账单编号" prop="showId">
          <el-input v-model="form.showId" class="input" :disabled="dialogType==='check'"></el-input>
        </el-form-item>
        <el-form-item label="桌台编号" prop="showId_t">
          <el-select
              v-model="form.showId_t"
              class="select"
              :disabled="dialogType==='check'"
              clearable
            >
              <el-option
                v-for="item in seatOptions"
                :key="item.showId"
                :label="item.showId"
                :value="item.showId"
              >
              <span style="float: left">{{ item.showId }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ seatTypeDict[item.type] }}</span>
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="服务人员编号" prop="showId_s">
          <el-select
              v-model="form.showId_s"
              class="select"
              :disabled="dialogType==='check'"
              clearable
            >
              <el-option
                v-for="(item,index) in staffOptions"
                :key="index"
                :label="item.showId"
                :value="item.showId"
              >
              <span style="float: left">{{ item.showId+'-'+item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ staffRoleDict[item.role] }}</span>
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="立账时间" prop="created_time">
          <el-date-picker
            v-model="form.created_time"
            placeholder="请选择"
            clearable
            value-format="yyyy-MM-dd"
            :disabled="dialogType==='check'"
            class="select middle">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="dishinfo" >
        <div v-show="dialogType!=='check'">
        <div class="title">添加菜品：</div>
        <div class="dish_add page_line">
           <el-select
              v-model="currentDish.showId"
              class="select"
              @change="addDishSelectChange"
              clearable
            >
              <el-option
                v-for="item in dishOptions"
                :key="item.showId"
                :label="item.showId+'-'+item.name+'-￥:'+item.price"
                :value="item.showId"
              >
              <span style="float: left">{{ item.showId+'-'+item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ '￥'+item.price }}</span>
              </el-option>
            </el-select>
            <div class="count_input">
              <el-input
                placeholder="份数"
                v-model.number="currentDish.count"
                class="input mini"
                clearable
              ></el-input>
              <div class="count_info">{{'最大份数:'+(dishOptionsDict[currentDish.showId]?dishOptionsDict[currentDish.showId].count:99999)}}</div>
            </div>
            <el-button type="primary" @click="addDishItem" class="add_button">添加</el-button>
        </div>
      </div>
        <div class="title">当前菜品：</div>
        <div class="dish_messages">
          <div class="content" v-for="(item,index) in dishInfo" :key="item.showId">
            <div class="calc"><span class="dish">{{item.name+'✖'+item.count}}</span>-----------------------------------------------<span class="price">{{'￥:'+item.price*item.count}}</span></div>
            <div class="delete"><el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteDishItem(index)" v-show="dialogType!=='check'"></el-button></div>
          </div>
        </div>
        <div class="title cost_total">金额合计：<span class="price">{{'￥:'+calcTotal()}}</span></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')" v-show="dialogType!=='check'">提 交</el-button>
        <el-button @click="dialogFormVisible = false">{{dialogType!=='check'?'取 消':'返 回'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bill from '@/api/bill.js'
import staff from '@/api/staff.js'
import seat from '@/api/seat.js'
import dish from '@/api/dish.js'
import {staffRoleDict,dishDict} from '@/common/dict.js'

export default {
  name:'bill',
  data(){
    return {
      filter:{
        showId:'',
        showId_t:'',
        showId_s:'',
        created_time:''
      },
      seatTypeDict:{
        'small':'小桌',
        'middle':'中桌',
        'big':'大桌'
      },
      staffRoleDict,
      dishDict,
      loading:false,
      tableData:[],
      seatOptions:[],
      staffOptions:[],
      dishOptions:[],
      dishOptionsDict:{},
      dialogFormVisible:false,
      dialogTitle:'新增账单',
      dialogType:'add',
      form:{
        billId:'',
        showId:'',
        showId_t:'',
        showId_s:'',
        cost_total:'',
        created_time:''
      },
      currentDish:{
        showId:'',
        name:'',
        price:'',
        count:''
      },
      dishInfo:[],
      rules:{
        showId:[
          {required:true,message:'请输入账单编号',trigger:'blur'}
        ],
        showId_t:[
          {required:true,message:'请选择桌台编号',trigger:'change'}
        ],
        created_time:[
          {required:true,message:'请选择立账时间',trigger:'change'}
        ],
        showId_s:[
          {required:true,message:'请选择服务人员编号',trigger:'change'}
        ]
      }
    }
  },
  computed:{
    totalPrice(){
      return this.tableData.reduce((pre,cur)=>{
        return pre+Number(cur.cost_total)
      },0)
    }
  },
  created(){
    this.getData()
    this.getTableData()
  },
  methods:{
    calcTotal(){
      this.form.cost_total=this.dishInfo.reduce((pre,cur)=>{
        pre+=Number(cur.price)*Number(cur.count)
        return pre
      },0)
      return this.form.cost_total
    },
    addDishSelectChange(showId){
      if(showId){
        let curDict=this.dishOptionsDict[showId]
        this.currentDish.name=curDict.name
        this.currentDish.price=curDict.price
      }
    },
    async getData(){
      let res_staff=await staff.search()
      if(res_staff.code===0){
        this.staffOptions=res_staff.data
      }
      // console.log(this.staffOptions)
      let res_seat=await seat.search()
      if(res_seat.code===0){
        this.seatOptions=res_seat.data
      }
      let res_dish=await dish.search()
      if(res_dish.code===0){
        this.dishOptions=res_dish.data.filter(item=>{
          // 只有份数大于0的才可以添加菜品
          return item.count>0
        })
        this.dishOptionsDict=this.dishOptions.reduce((dict,cur)=>{
          dict[cur.showId]=cur
          return dict
      },{})
      // console.log(this.dishOptionsDict)
      }
    },
    async getTableData(){
      this.loading=true
      let res=await bill.search(this.filter)
      if(res.code===0){
        this.tableData=res.data
        // console.log(res.data)
      }
      this.loading=false
    },
    search(){
      this.getTableData()
    },
    async handleDelete(row){
      let res=await bill.remove(row.billId)
      if(res.code===0){
        this.$message.success('删除成功')
        this.getTableData()
      }
    },
    initForm(){
      for(let k in this.form){
        if(k==='provided'){
          this.form[k]=false
        }else{
          this.form[k]=''
        }
      }
    },
    addBill(){
      this.dialogType='add'
      this.dialogTitle='新增账单'
      this.dishInfo=[]
      this.initForm()
      this.dialogFormVisible=true
      for(let k in this.currentDish){
        this.currentDish[k]=''
      }
    },
    editBill(row){
      this.dialogFormVisible=true
      this.dialogType='edit'
      this.dialogTitle='编辑账单'
      this.dishInfo=row.dishInfo
      for(let k in this.form){
        this.form[k]=row[k]
      }
      for(let k in this.currentDish){
        this.currentDish[k]=''
      }
    },
    checkBill(row){
      this.dialogFormVisible=true
      this.dialogType='check'
      this.dialogTitle='查看账单'
      this.dishInfo=row.dishInfo
      for(let k in this.form){
        this.form[k]=row[k]
      }
    },
    async submitForm(name){
      let judge=true
      this.$refs[name].validate((valid)=>{
        if(!valid){
          judge=false
        }
      })
      if(!judge){
        return false
      }
      if(!this.dishInfo.length){
        this.$message.error('至少添加一个菜品')
        return false
      }
      console.log(this.form)
      let params=JSON.parse(JSON.stringify(this.form))
      params.dishInfo=this.dishInfo
      if(this.dialogType==='add'){
        let res=await bill.add(params)
        if(res.code===0){
          this.$message.success('添加成功')
          this.dialogFormVisible=false
          this.getTableData()
        }
      }else{
        let res=await bill.update(params.billId,params)
        if(res.code===0){
          this.$message.success('编辑成功')
          this.dialogFormVisible=false
          this.getTableData()
        }
      }
      this.updateDishList()
    },
    async updateDishList(){
      let dishShowIds=this.dishInfo.map(item=>item.showId)
      for(let showId of dishShowIds){
        let info=this.dishOptionsDict[showId]
        await dish.update(info.dishId,info)
      }
    },
    addDishItem(){
      if(!this.currentDish.count){
        this.$message.error('份数必填且不能为0')
        return false
      }
      let curDict=this.dishOptionsDict[this.currentDish.showId]
      if(this.currentDish.count>curDict.count){
        this.$message.error('份数不能大于最大份数')
        return false
      }
      curDict.count-=this.currentDish.count
      let curInfo=JSON.parse(JSON.stringify(this.currentDish))
      this.dishInfo.push(curInfo)
    },
    deleteDishItem(index){
      this.dishInfo.splice(index,1)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__error{
  left: 120px !important;
}
.price{
  font-weight: 550;
  color:red;
}
.dishinfo {
  .title{
    margin-bottom: 10px;
  }
  .dish_add {
    position: relative;
    margin-bottom: 20px;
    .count_input {
      .count_info {
        position: absolute;
        color: red;
      }
    }
  }
  .dish_messages{
    width:100%;
    .content{
      border-bottom: solid 1px wheat;
      box-shadow: 0 1px 1px wheat;
      margin-bottom: 10px;
      padding: 5px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .calc{
        color:#777777;
      }
      .dish{
        font-weight: 550;
      }
    }
    .content:last-child{
      margin-bottom: 20px;
    }
  }
}
</style>