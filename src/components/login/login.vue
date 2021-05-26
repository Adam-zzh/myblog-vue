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
    data() {
      return {
        //是否可以关闭
        modelShow: true,
        canClose: true,
        //表单数据
        form: {
          account: '',
          password: '',
        }
      }
    },
    mounted: function () {},
    methods: {
      login() {
        this.axios.post("/admin/userController/login", this.form).then((response) => {
            if (response.code === 200) {
              // * 存储token
              localStorage.setItem('token', response.data.tokenHead + " " + response.data.token);
              this.$message({
                showClose: true,
                message: '登陆成功',
                type: 'success'
              });
              this.modelShow = false;
              this.$router.push(this.$route.query.redirect || '/')
            } else {
              localStorage.removeItem('token');
              this.modelShow = true;
              this.$message({
                showClose: true,
                message: response.message,
                type: 'error'
              });
            }
          },
          (error) => {
            this.$message({
              showClose: true,
              message: error.message,
              type: 'error'
            });
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

  #myblog-login .el-dialog__body {
    box-shadow: -3px 1px 2px 1px #333;
  }

  #myblog-login .el-dialog__body::before {
    content: '';
    background-color: aliceblue;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: calc(50% - 30px);
    background: #6686ff0f;
    z-index: -999;
  }

  #myblog-login .el-dialog {
    width: 50%;
    background: url(/static/images/login/login.jpg) no-repeat;
    background-size: calc(50% - 30px) 100%;
    background-position: right;
  }

  #myblog-login .login-dialog {
    background-color: #60626699;
  }


  #myblog-login .el-form-item__label {
    color: black;
  }

  #myblog-login .el-button {
    letter-spacing: 3px;
    margin-left: 30px;
  }

</style>
