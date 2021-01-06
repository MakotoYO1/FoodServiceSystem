<template>
  <div class="member main">
    <div class="table_search page_line">
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
      <el-date-picker
        v-model="filter.birthday"
        clearable
        value-format="yyyy-MM-dd"
        placeholder="生日"
        class="select middle">
      </el-date-picker>
      <el-select
        v-model="filter.rate"
        placeholder="等级"
        class="select small"
        clearable
      >
        <el-option
          v-for="(item,val) in memberRateDict"
          :key="item"
          :label="item"
          :value="parseInt(val)"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="add" type="primary" icon="el-icon-circle-plus-outline" @click="addMember">新增会员</el-button>
    </div>
    <div class="table_show">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            {{sexDict[scope.row.sex]}}
          </template>
        </el-table-column>
        <el-table-column label="生日" prop="birthday" align="center"></el-table-column>
        <el-table-column label="电话" prop="phone" align="center"></el-table-column>
        <el-table-column label="等级" align="center">
          <template slot-scope="scope">
            {{memberRateDict[scope.row.rate]}}
          </template>
        </el-table-column>
        <el-table-column label="积分" align="center" prop="integral"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="editMember(scope.row)">编辑</el-button>
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            clearable
            value-format="yyyy-MM-dd"
            class="select middle">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" class="input"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="rate">
            <el-select
              v-model="form.rate"
              class="select small"
              clearable
            >
              <el-option
                v-for="(item,val) in memberRateDict"
                :key="item"
                :label="item"
                :value="parseInt(val)"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="积分" prop="integral">
          <el-input v-model.number="form.integral" class="input"></el-input>
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
import {memberRateDict} from '@/common/dict.js'
import member from '@/api/member.js'

export default {
  name:'member',
  data(){
    return {
      filter:{
        name:'',
        phone:'',
        sex:'',
        birthday:'',
        rate:''
      },
      sexDict:{
        'male':'男',
        'female':'女'
      },
      tableData:[],
      memberRateDict,
      loading:true,
      dialogFormVisible:false,
      dialogTitle:'新增会员',
      dialogType:'add',
      form:{
        memberId:'',
        name:'',
        phone:'',
        sex:'',
        birthday:'',
        rate:'',
        integral:0
      },
      rules:{
        name:[
          {required:true,message:'请输入名字',trigger:'blur'}
        ],
        phone:[
          {required:true,message:'请输入电话',trigger:'blur'}
        ],
        sex:[
          {required:true,message:'请选择性别',trigger:'change'}
        ],
        birthday:[
          {required:true,message:'请选择生日',trigger:'change'}
        ],
        rate:[
          {required:true,message:'请选择等级',trigger:'change'}
        ],
        integral:[
          {type:'number',message:'积分必须为数字类型',trigger:'blur'}
        ]
      }
    }
  },
  created(){
    // console.log(this.memberRateDict)
    this.getTableData()
  },
  methods:{
    async getTableData(){
      this.loading=true
      let res=await member.search(this.filter)
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
      let res=await member.remove(row.memberId)
      if(res.code===0){
        this.$message.success('删除成功')
        this.getTableData()
      }
    },
    initForm(){
      for(let k in this.form){
        if(k==='integral'){
          this.form[k]=0
        }else{
          this.form[k]=''
        }
      }
    },
    addMember(){
      this.dialogType='add'
      this.dialogTitle='新增会员'
      this.initForm()
      this.dialogFormVisible=true
    },
    editMember(row){
      this.dialogFormVisible=true
      this.dialogType='edit'
      this.dialogTitle='编辑会员'
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
        let res=await member.add(this.form)
        if(res.code===0){
          this.$message.success('添加成功')
          this.dialogFormVisible=false
          this.getTableData()
        }
      }else{
        let res=await member.update(this.form.memberId,this.form)
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


</style>