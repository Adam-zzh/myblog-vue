<template>
  <div id="login">
    <el-dialog width="656px" height="400px" :visible="dialog.visible" :show-close="false" :close-on-click-modal="true"
               :close-on-press-escape="true" :before-close="closeCallback()" class="login-dialog">
      <div class="login-left">
        <h1 style="color: black; letter-spacing: 4px;">登陆</h1>
        <el-form ref="form" :model="formData" size="small" label-width="100px">
          <el-row>
            <el-form-item label="用户名：">
              <el-input class="search-input" v-model="formData.account"/>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input type="password" class="search-input" v-model="formData.password"/>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    import {login} from "@/api/base";

    export default {
        data() {
            return {
                //是否可以关闭
                dialog: {visible: true, title: ''},
                //表单数据
                formData: {account: '', password: '',}
            }
        },
        mounted: function () {
        },
        methods: {
            login() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        let that = this;
                        let param = {...that.formData}
                        login(param)
                            .then(res => {
                                that.$store.commit("setToken", res.data.token);
                                that.$store.commit("setUserInfo", res.data.account);

                                this.$notify({
                                    title: "登录成功",
                                    type: "success",
                                    showClose: false,
                                    duration: 1000
                                });
                                setTimeout(() => {
                                    // 此时要判断/login后面的参数redirect，若无参数，进入主页；
                                    this.$router.push("/index");
                                    // 若有参数则参数为未有权限的那个路由，跳转到那个路由
                                    // this.$router.push(***); -- 具体要自己在这实现
                                }, 1000);
                            })
                            .catch(error => {
                                // 错误分为 status-请求错误 和 code-账号密码错误
                                this.$message.error(error);
                                console.log(error);
                            });
                    } else {
                        // 不符合前端校验
                        this.$message.error('format error：' + error);
                        console.log('format error：', error);
                        return false;
                    }
                });
            },
            //关闭登录窗口前的回调(如果用户没有登录成功，则再次打开本窗口，以达到强制登录的目的)
            closeCallback() {
                this.resetForm();
            },
            resetForm() {
                this.formData = {account: '', password: '',}
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

  #login .el-dialog__header {
    padding: 20px 20px 10px;
    padding: 0;
  }

  #login .el-dialog__body {
    box-shadow: -3px 1px 2px 1px #333;
  }

  #login .el-dialog__body::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: calc(50% - 30px);
    background: #6686ff0f;
    z-index: -999;
  }

  #login .el-dialog {
    width: 50%;
    background: url(/static/images/login/login.jpg) no-repeat;
    background-size: calc(50% - 30px) 100%;
    background-position: right;
  }

  #login .login-dialog {
    background-color: #60626699;
  }


  #login .el-form-item__label {
    color: black;
  }

  #login .el-button {
    letter-spacing: 3px;
    margin-left: 30px;
  }

</style>
