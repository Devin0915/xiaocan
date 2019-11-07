
<script>
import { changeStandardTime } from "@/utils";
import { mapGetters } from "vuex";
export default {
  computed:{
    ...mapGetters(['current_time'])
  },
  methods:{
    init(){
      const _self = this;
      this.formValue.date = [`${changeStandardTime(this.current_time[0])}`,`${changeStandardTime(this.current_time[1])}`];
      this.options.shortcuts = [
         {
              text: '昨天',
              value () {
                const end = new Date(_self.current_time[1]);
                const start = new Date(_self.current_time[1]);
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                end.setTime(end.getTime() - 3600 * 1000 * 24);
                return [start, end];
              }
          },
          {
              text: '最近7天',
              value () {
                  const end = new Date(_self.current_time[1]);
                  const start = new Date(_self.current_time[1]);
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  end.setTime(end.getTime() - 3600 * 1000 * 24);
                  return [start, end];
              }
          },
          {
              text: '最近14天',
              value () {
                  const end = new Date(_self.current_time[1]);
                  const start = new Date(_self.current_time[1]);
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
                  end.setTime(end.getTime() - 3600 * 1000 * 24);
                  return [start, end];
              }
          },
          {
              text: '最近30天',
              value () {
                  const end = new Date(_self.current_time[1]);
                  const start = new Date(_self.current_time[1]);
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  end.setTime(end.getTime() - 3600 * 1000 * 24);
                  return [start, end];
              }
          }
      ]
    }
  },
  mounted(){
    this.init();
  }
}
</script>
