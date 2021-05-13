<template>
  <div id="myblog-login">
    <el-dialog width="656px" height="400px" :visible="modelShow" :show-close="false" :close-on-click-modal="true"
      :close-on-press-escape="true" :before-close="closeCallback()" class="login-dialog">
      <div class="login-left">
        <h1 style="color: black; letter-spacing: 4px;">登陆</h1>
        <el-form ref="form" :model="form" size="small" label-width="100px">
          <el-row>
            <el-form-item label="用户名：">
              <el-input class="search-input" v-model="form.account" />
            </el-form-item>
            <el-form-item label="密码：">
              <el-input type="password" class="search-input" v-model="form.password" />
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="login('form')">登录</el-button>
          <el-button type="primary" @click="reset('form')">重置</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: ['modelShow'],
    data() {
      return {
        //是否可以关闭
        canClose: true,
        //表单数据
        form: {
          account: '',
          password: '',
        }
      }
    },
    mounted: function () {
      // if (!localStorage.token) {
      //   this.$parent.login_isShow = true;
      // } else {
      //   this.$parent.login_isShow = false;
      // }
    },
    methods: {
      login() {
        this.axios.post("/admin/user/login", this.form).then((response) => {
            if (response === 200) {
              // * 存储token
              localStorage.setItem('token', response.data);
              this.$parent.login_isShow = false;
            }else{
              localStorage.removeItem('token');
              this.$parent.login_isShow = true;
            }
          },
          (error) => {
            console.log(error.data)
          })
      },
      //关闭登录窗口前的回调(如果用户没有登录成功，则再次打开本窗口，以达到强制登录的目的)
      closeCallback() {
        // if (!localStorage.token) {
        //   this.$parent.login_isShow = true;
        // } else {
        //   this.$parent.login_isShow = false;
        // }
      }
    },
  }

</script>
<style>
  .login-left {
    width: 50%;
    height: 100%;
  }

  .login-right {
    width: 50%;
    height: 100%;
  }

  #myblog-login .el-dialog__header {
    padding: 20px 20px 10px;
    padding: 0;
  }

  #myblog-login .el-dialog {
    width: 50%;
    background: url(/static/images/login/login.jpg) no-repeat;
    background-size: calc(50% - 30px) 100%;
    background-position: right;
  }

  #myblog-login .el-form-item__label {
    color: black;
  }

  #myblog-login .el-button {
    letter-spacing: 3px;
    margin-left: 30px;
  }

</style>
