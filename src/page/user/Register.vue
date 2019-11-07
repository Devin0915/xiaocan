<template>
    <Modal
        v-model="filterVisible"
        width="450px"
        title="用户注册"
        :mask-closable="false"
    >
    1212231
    </Modal>
</template>
<script>
export default {
    props:{
        visible: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            filterVisible: this.visible,
        }
    },
    watch: {
        filterVisible(val) {
            if(!val) {
                this.$emit("update:visible", val);
            }
        },
        visible(val) {
            this.filterVisible = val;
        }
    }
}
</script>

