<template>
  <div class="staff main">
    <div class="table_search page_line">
      <el-input
        placeholder="编号"
        v-model="filter.showId"
        class="input"
        clearable
      ></el-input>
      <el-input
        placeholder="姓名"
        v-model="filter.name"
        class="input"
        clearable
      ></el-input>
      <el-input
        placeholder="手机号"
        v-model="filter.phone"
        class="input"
        clearable
      ></el-input>
      <el-select
        v-model="filter.sex"
        placeholder="性别"
        class="select small"
        clearable
      >
        <el-option
          v-for="(item,val) in sexDict"
          :key="item"
          :label="item"
          :value="val"
        ></el-option>
      </el-select>
      <el-select
        v-model="filter.role"
        placeholder="角色"
        class="select small"
        clearable
      >
        <el-option
          v-for="(item,val) in staffRoleDict"
          :key="item"
          :label="item"
          :value="parseInt(val)"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="add" type="primary" icon="el-icon-circle-plus-outline" @click="addStaff">新增员工</el-button>
    </div>
    <div class="table_show">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column label="编号" prop="showId" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            {{sexDict[scope.row.sex]}}
          </template>
        </el-table-column>
        <el-table-column label="年龄" prop="age" align="center"></el-table-column>
        <el-table-column label="电话" prop="phone" align="center"></el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">
            {{staffRoleDict[scope.row.role]}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="editStaff(scope.row)">编辑</el-button>
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="form.age" class="input"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" class="input"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
            <el-select
              v-model="form.role"
              class="select middle"
              clearable
            >
              <el-option
                v-for="(item,val) in staffRoleDict"
                :key="item"
                :label="item"
                :value="parseInt(val)"
              ></el-option>
            </el-select>
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
import {staffRoleDict} from '@/common/dict.js'
import staff from '@/api/staff.js'

export default {
  name:'staff',
  data(){
    return {
      filter:{
        showId:'',
        name:'',
        sex:'',
        phone:'',
        role:''
      },
      sexDict:{
        'male':'男',
        'female':'女'
      },
      staffRoleDict,
      tableData:[],
      loading:true,
      dialogFormVisible:false,
      dialogTitle:'新增员工',
      dialogType:'add',
      form:{
        staffId:'',
        showId:'',
        name:'',
        sex:'',
        age:'',
        phone:'',
        role:''
      },
      rules:{
        showId:[
          {required:true,message:'请输入编号',trigger:'blur'}
        ],
        name:[
          {required:true,message:'请输入名字',trigger:'blur'}
        ],
        sex:[
          {required:true,message:'请选择性别',trigger:'change'}
        ],
        phone:[
          {required:true,message:'请输入电话',trigger:'blur'}
        ],
        age:[
          {required:true,message:'请输入年龄',trigger:'blur'}
        ],
        role:[
          {required:true,message:'请选择角色',trigger:'change'}
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
      let res=await staff.search(this.filter)
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
      let res=await staff.remove(row.staffId)
      if(res.code===0){
        this.$message.success('删除成功')
        this.getTableData()
      }
    },
    initForm(){
      for(let k in this.form){
          this.form[k]=''
      }
    },
    addStaff(){
      this.dialogType='add'
      this.dialogTitle='新增员工'
      this.initForm()
      this.dialogFormVisible=true
    },
    editStaff(row){
      this.dialogFormVisible=true
      this.dialogType='edit'
      this.dialogTitle='编辑员工'
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
        let res=await staff.add(this.form)
        if(res.code===0){
          this.$message.success('添加成功')
          this.dialogFormVisible=false
          this.getTableData()
        }
      }else{
        let res=await staff.update(this.form.staffId,this.form)
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

<style>

</style>