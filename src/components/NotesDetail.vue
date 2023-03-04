<template>
  <el-dialog title="Description" :visible.sync="notesDetailBoxVisable" width="30%">
    <span>{{notesDescription}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Close</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    notesDetailVisableFlag: Boolean,
    notesDescription: String,
  },
  computed: {
    notesDetailBoxVisable: {
      get() {
        return this.notesDetailVisableFlag
      },
      set(val) {
        this.$emit('update:notesDetailVisableFlag', val)
      }
    }
  },
  methods: {
    handleClose() {
      this.notesDetailBoxVisable = false
    },
  }
};
</script>