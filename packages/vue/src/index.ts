import { onMounted, onBeforeUnmount, ref, h, defineComponent } from "vue";
import { enhanceButton } from "@chamfer/behavior";

export interface ChamferButtonProps {
  ripple?: boolean;
}

export const ChamferButton = defineComponent<ChamferButtonProps>({
  name: "ChamferButton",
  props: {
    ripple: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots, attrs }) {
    const element = ref<HTMLButtonElement>();
    let enhancement: ReturnType<typeof enhanceButton> | undefined;

    onMounted(() => {
      if (element.value && props.ripple) {
        enhancement = enhanceButton(element.value, { ripple: props.ripple });
      }
    });

    onBeforeUnmount(() => {
      enhancement?.destroy();
    });

    return () =>
      h(
        "button",
        {
          ref: element,
          "data-chamfer-component": "button",
          ...attrs
        },
        slots.default?.()
      );
  }
});

export default {
  ChamferButton
};
