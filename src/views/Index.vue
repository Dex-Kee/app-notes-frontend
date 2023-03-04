<template>
  <el-container>
    <el-header>Notes</el-header>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :xs="20" :span="12" >
          <div class="grid-content">
            <el-divider>
              <h1>Data</h1>
            </el-divider>
            <NotesList></NotesList>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>contact `zhk150420@gmail.com` for assistance if any system error is found =)</el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import NotesList from "@/components/NotesList.vue";

export default {
  name: "Index",
  components: {
    NotesList
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.el-footer {
  background-color: #909399;
  display: block;
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>