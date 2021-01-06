<template>
  <div class="dish main">
    <div class="table_search page_line">
      <el-input
        placeholder="编号"
        v-model="filter.showId"
        class="input"
        clearable
      ></el-input>
      <el-input
        placeholder="菜名"
        v-model="filter.name"
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
          v-for="(item,val) in dishDict"
          :key="item"
          :label="item"
          :value="parseInt(val)"
        ></el-option>
      </el-select>
      <el-input
        placeholder="数量"
        v-model.number="filter.count"
        class="input small"
        clearable
      ></el-input>
      <el-select
        v-model="filter.provided"
        placeholder="是否供应"
        class="select middle"
        clearable
      >
        <el-option
          v-for="(item,val) in providedDict"
          :key="item"
          :label="item"
          :value="!!parseInt(val)"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="add" type="primary" icon="el-icon-circle-plus-outline" @click="addDish">新增菜品</el-button>
    </div>
    <div class="table_show">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column label="编号" prop="showId" align="center"></el-table-column>
        <el-table-column label="菜名" align="center" prop="name">
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            {{dishDict[scope.row.type]}}
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="count" align="center"></el-table-column>
        <el-table-column label="供应情况" align="center">
          <template slot-scope="scope">
            {{scope.row.provided?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center" prop="price"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="editDish(scope.row)">编辑</el-button>
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
        <el-form-item label="编号" prop="showId">
          <el-input v-model="form.showId" class="input"></el-input>
        </el-form-item>
        <el-form-item label="菜名" prop="name">
          <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
            <el-select
              v-model="form.type"
              class="select small"
              clearable
            >
              <el-option
                v-for="(item,val) in dishDict"
                :key="item"
                :label="item"
                :value="parseInt(val)"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input v-model.number="form.count" class="input" @change="countChange"></el-input>
        </el-form-item>
        <el-form-item label="是否供应">
          <el-switch v-model="form.provided" :disabled='providedDisabled'></el-switch>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" class="input"></el-input>
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
import {dishDict} from '@/common/dict.js'
import dish from '@/api/dish.js'

export default {
  name:'dish',
  data(){
    return {
      filter:{
        showId:'',
        name:'',
        type:'',
        count:'',
        provided:''
      },
      dishDict,
      providedDict:{
        1:'是',
        0:'否'
      },
      loading:false,
      tableData:[],
      dialogFormVisible:false,
      dialogTitle:'新增菜品',
      dialogType:'add',
      form:{
        dishId:'',
        showId:'',
        name:'',
        type:'',
        count:'',
        provided:false,
        price:''
      },
      rules:{
        showId:[
          {required:true,message:'请输入编号',trigger:'blur'}
        ],
        name:[
          {required:true,message:'请输入名字',trigger:'blur'}
        ],
        type:[
          {required:true,message:'请选择类型',trigger:'change'}
        ],
        count:[
          {type:'integer',required:true,message:'数量必须为整数',trigger:'blur'}
        ],
        price:[
          {required:true,message:'请输入价格',trigger:'blur'}
        ]
      },
      providedDisabled:false
    }
  },
  created(){
    this.getTableData()
  },
  methods:{
    async getTableData(){
      this.loading=true
      let res=await dish.search(this.filter)
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
      let res=await dish.remove(row.dishId)
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
    addDish(){
      this.dialogType='add'
      this.dialogTitle='新增菜品'
      this.initForm()
      this.dialogFormVisible=true
    },
    editDish(row){
      this.dialogFormVisible=true
      this.dialogType='edit'
      this.dialogTitle='编辑菜品'
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
        let res=await dish.add(this.form)
        if(res.code===0){
          this.$message.success('添加成功')
          this.dialogFormVisible=false
          this.getTableData()
        }
      }else{
        let res=await dish.update(this.form.dishId,this.form)
        if(res.code===0){
          this.$message.success('编辑成功')
          this.dialogFormVisible=false
          this.getTableData()
        }
      }
    },
    countChange(val){
      if(Number(val)===0){
        this.form.provided=false
        this.providedDisabled=true
      }else{
        this.providedDisabled=false
      }
    }
  }
}
</script>

<style>

</style>