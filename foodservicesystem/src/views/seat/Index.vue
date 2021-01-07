<template>
  <div class="seat main">
    <div class="table_search page_line">
      <el-input
        placeholder="编号"
        v-model="filter.showId"
        class="input"
        clearable
      ></el-input>
      <el-select
        v-model="filter.type"
        placeholder="类型"
        class="select small"
        clearable
      >
        <el-option
          v-for="(item,val) in typeDict"
          :key="item"
          :label="item"
          :value="val"
        ></el-option>
      </el-select>
      <el-select
        v-model="filter.reserved"
        placeholder="预约状态"
        class="select middle"
        clearable
      >
        <el-option
          v-for="(item,val) in reservedDict"
          :key="item"
          :label="item"
          :value="!!parseInt(val)"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="add" type="primary" icon="el-icon-circle-plus-outline" @click="addSeat">新增桌台</el-button>
    </div>
    <div class="table_show">
      <div class="table_seat" v-loading="loading">
        <template v-for="(item,index) in tableData">
          <seat-item :datas="item" :key="index" @edit="editSeat" @delete="deleteSeat"></seat-item>
        </template>
        
      </div>
    </div>
        <!-- form -->
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" :close-on-click-modal="false" center>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="编号" prop="showId">
          <el-input v-model="form.showId" class="input"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
            <el-select
              v-model="form.type"
              class="select small"
              clearable
            >
              <el-option
                v-for="(item,val) in typeDict"
                :key="item"
                :label="item"
                :value="val"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否已预约">
          <el-switch v-model="form.reserved"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import seatItem from './components/seatItem.vue'
import seat from '@/api/seat.js'

export default {
  name:'seat',
  components:{
    seatItem
  },
  data(){
    return {
      filter:{
        showId:'',
        type:'',
        reserved:''
      },
      reservedDict:{
        1:'已预约',
        0:'未预约'
      },
      typeDict:{
        'small':'小',
        'middle':'中',
        'big':'大'
      },
      tableData:[],
      loading:false,
      dialogFormVisible:false,
      dialogTitle:'新增桌台',
      dialogType:'add',
      form:{
        seatId:'',
        showId:'',
        type:'',
        reserved:false
      },
      rules:{
        showId:[
          {required:true,message:'请输入编号',trigger:'blur'}
        ],
        type:[
          {required:true,message:'请选择类型',trigger:'change'}
        ]
      }
    }
  },
  created(){
    this.getTableData()
  },
  methods:{
    async getTableData(){
      this.loading=true
      let res=await seat.search(this.filter)
      if(res.code===0){
        this.tableData=res.data
        // console.log(res.data)
      }
      this.loading=false
    },
    search(){
      this.getTableData()
    },
    async deleteSeat(seatId){
      let res=await seat.remove(seatId)
      if(res.code===0){
        this.$message.success('删除成功')
        this.getTableData()
      }
    },
    initForm(){
      for(let k in this.form){
        if(k==='reserved'){
          this.form[k]=false
        }else{
          this.form[k]=''
        }
      }
    },
    addSeat(){
      this.dialogType='add'
      this.dialogTitle='新增桌台'
      this.initForm()
      this.dialogFormVisible=true
    },
    editSeat(row){
      this.dialogFormVisible=true
      this.dialogType='edit'
      this.dialogTitle='编辑桌台'
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
      if(this.dialogType==='add'){
        let res=await seat.add(this.form)
        if(res.code===0){
          this.$message.success('添加成功')
          this.dialogFormVisible=false
          this.getTableData()
        }
      }else{
        let res=await seat.update(this.form.seatId,this.form)
        if(res.code===0){
          this.$message.success('编辑成功')
          this.dialogFormVisible=false
          this.getTableData()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table_seat{
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>