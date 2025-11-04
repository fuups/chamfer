import {
  onMounted,
  onBeforeUnmount,
  ref,
  h,
  defineComponent,
  type PropType
} from "vue";

import { enhanceButton } from "@chamfer/behavior";

export interface ChamferButtonProps {
  ripple?: boolean;
}

export const ChamferButton = defineComponent<ChamferButtonProps>({
  name: "ChamferButton",
  props: {
    ripple: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props, { slots, attrs }) {
    const element = ref<HTMLButtonElement>();
    let enhancement: ReturnType<typeof enhanceButton> | undefined;

    onMounted(() => {
      if (element.value && props.ripple !== false) {
        enhancement = enhanceButton(element.value);
      }
    });

    onBeforeUnmount(() => {
      enhancement?.destroy();
    });

    return () => {
      const mergedAttrs = {
        ...attrs,
        class: ["ch-button", attrs.class],
        "data-ch-component": "button"
      };

      return h(
        "button",
        {
          ref: element,
          ...mergedAttrs
        },
        slots.default?.()
      );
    };
  }
});

export default {
  ChamferButton
};
