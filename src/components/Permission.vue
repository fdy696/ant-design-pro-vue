<script>
import { checkAccess } from "../utils/permission";

export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    return checkAccess(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
