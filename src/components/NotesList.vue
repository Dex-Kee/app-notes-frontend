<template>
  <el-card class="box-card">
    <div>
      <NotesForm :id="id" :notesForm="notesForm" :action="action" :notesFormVisableFlag.sync="notesFormVisableFlag"
        :getNotesList="getNotesList">
      </NotesForm>
    </div>
    <div>
      <NotesDetail :notesDescription="notesDescription" :notesDetailVisableFlag.sync="notesDetailVisableFlag">
      </NotesDetail>
    </div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="2">
        <el-input v-model="keyword" size placeholder="Enter keyword to search ..." @keyup.enter.native="getNotesList"/>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search" @click="getNotesList" round>Seach</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-plus" @click="showNotesForm('', '', '', 'create')" round></el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" empty-text="No data">
      <el-table-column type="index" width="100%"></el-table-column>
      <el-table-column align="center" label="name" prop="name"></el-table-column>
      <el-table-column align="center" label="create date" prop="createDate"></el-table-column>
      <el-table-column align="center" label="action">
        <template slot-scope="scope">
          <el-button icon="el-icon-view" @click="showNotesDescription(scope.row.description)" circle>
          </el-button>
          <el-button icon="el-icon-edit-outline"
            @click="showNotesForm(scope.row.id, scope.row.name, scope.row.description, 'update')" circle></el-button>
          <el-button icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row.id)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import NotesForm from './NotesForm.vue';
import NotesDetail from './NotesDetail.vue';
import { listNotesApi, deleteNotesApi } from "../api/notes.js"

export default {
  name: "NotesList",
  data() {
    return {
      tableData: [],
      id: "",
      action: "",
      keyword: "",
      notesFormVisableFlag: false,
      notesDescription: "",
      notesDetailVisableFlag: false,
      notesForm: {
        id: "",
        name: "",
        description: "",
      }
    };
  },
  mounted() {
    listNotesApi("").then(response => {
      this.tableData = response.data
    }).catch(err => {
      if (err.response !== null) {
        this.showErrorMsg(err.response.data.msg)
      }
    })
  },
  components: {
    NotesForm,
    NotesDetail
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.status) {
        return "success-row";
      } else {
        return "";
      }
    },
    showNotesDescription(description) {
      console.log(description)
      this.notesDescription = description
      this.notesDetailVisableFlag = true
    },
    showNotesForm(id, name, description, action) {
      console.log("id" + id)
      this.id = id
      this.action = action
      this.notesForm.id = id
      this.notesForm.name = name
      this.notesForm.description = description
      this.notesFormVisableFlag = true
    },
    getNotesList() {
      listNotesApi(this.keyword).then(response => {
        console.log(response)
        this.tableData = response.data
        if (response.data.length == 0) {
          this.$message({
            showClose: true,
            duration: 1500,
            message: "no data found based on search keyword",
            type: "error"
          });
        }
      }).catch(err => {
        if (err.response !== null) {
          this.showErrorMsg(err.response.data.msg)
        }
      })
    },
    handleDelete(index, id) {
      deleteNotesApi(id).then(() => {
        this.tableData.splice(index, 1);
        this.$message({
          showClose: true,
          duration: 1500,
          message: "delete notes successfully",
          type: "success"
        });
      }).catch(err => {
        if (err.response !== null) {
          this.showErrorMsg(err.response.data.msg)
        }
      })
    },
    showErrorMsg(message) {
      this.$message({
        showClose: true,
        duration: 1500,
        message: message,
        type: "error"
      });
    },
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  text-decoration: line-through;
}
</style>