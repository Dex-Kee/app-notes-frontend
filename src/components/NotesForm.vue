<template>
  <el-dialog title="NotesForm" :visible.sync="dialogShowForm" width="30%">
    <el-form label-position="right" label-width="80px" :model="form">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Close</el-button>
      <el-button type="primary" @click="handleSubmit">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createNotesApi, modifyNotesApi } from "../api/notes.js"
export default {
  props: {
    getNotesList: Function,
    notesFormVisableFlag: Boolean,
    action: String,
    notesForm: Object,
    id: String,
  },
  data() {
    return {}
  },
  computed: {
    dialogShowForm: {
      get() {
        return this.notesFormVisableFlag
      },
      set(val) {
        this.$emit('update:notesFormVisableFlag', val)
      }
    },
    form: {
      get() {
        return this.notesForm
      }
    }
  },
  methods: {
    handleClose() {
      this.dialogShowForm = false
    },
    async handleSubmit() {
      if (this.form.name == "") {
        this.$message({
          showClose: true,
          duration: 1500,
          message: "name cannot be empty",
          type: "warning"
        });
        return;
      }
      if (this.form.description == "") {
        this.$message({
          showClose: true,
          duration: 1500,
          message: "description cannot be empty",
          type: "warning"
        });
        return;
      }

      if (this.action == "create") {
        this.createNotes()
      } else {
        this.modifyNotes()
      }

      this.dialogShowForm = false
    },
    createNotes() {
      createNotesApi(this.form).then(() => {
        this.$message({
          showClose: true,
          duration: 1500,
          message: "create new notes successfully",
          type: "success"
        });
      }).then(() => (this.refreshNotesList()))
        .catch(err => {
          if (err.response !== null) {
            this.showErrorMsg(err.response.data.msg)
          }
        });
    },
    modifyNotes() {
      modifyNotesApi(this.notesForm).then(() => {
        this.$message({
          showClose: true,
          duration: 1500,
          message: "modify notes successfully",
          type: "success"
        })
      }).then(() => (this.refreshNotesList()))
        .catch(err => {
          if (err.response !== null) {
            this.showErrorMsg(err.response.data.msg)
          }
        })
    },
    refreshNotesList() {
      this.getNotesList()
    },
    showForm() {
      console.log(this.notesForm)
      console.log(this.form)
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